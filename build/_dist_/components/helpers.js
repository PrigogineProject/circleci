/* eslint-disable */
import BigNumber from '../../web_modules/bignumberjs.js';

import { ethers } from '../../web_modules/ethers.js';
import { get } from '../../web_modules/svelte/store.js';
import { isBigNumber, isNumber, validateIsAddress, validateIsBigNumber } from '../../web_modules/@pie-dao/utils.js';
import { pieSmartPool } from '../../web_modules/@pie-dao/abis.js';

import find from '../../web_modules/lodash/find.js';
import images from '../config/images.json.proxy.js';
import poolsConfig from '../config/pools.json.proxy.js';
import recipeAbi from '../config/recipeABI.json.proxy.js';
import unipoolAbi from '../config/unipoolABI.json.proxy.js';
import geyserABI from '../config/geyser.json.proxy.js';
import uniswapPair from '../config/uniswapPair.json.proxy.js';
import BALANCER_POOL_ABI from '../config/balancerPoolABI.json.proxy.js';

import {
  allowances,
  balanceKey,
  balances,
  bumpLifecycle,
  contract,
  eth,
  functionKey,
  pools,
  trackBalance,
} from '../stores/eth.js';

import { farming } from '../stores/eth/writables.js';

import { piesMarketDataStore } from '../stores/coingecko.js';

const poolUpdatePids = {};

const allowanceSubscriptions = new Set();
const balanceSubscriptions = new Set();

export const getTokenImage = (tokenAddress) =>
  images.logos[tokenAddress]
    ? images.logos[tokenAddress]
    : `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`;

const enqueueWeightUpdate = (poolAddress) => {
  clearTimeout(poolUpdatePids[poolAddress]);
  setTimeout(() => {
    poolUpdatePids[poolAddress] = updatePoolWeight(poolAddress);
  }, 500);
};

const rawAmountVsBalance = (address, amount, pooledToken) => {
  let balance = BigNumber(0);

  if (address) {
    const key = balanceKey(pooledToken.address, address);
    const rawBalance = get(balances)[key];
    if (rawBalance) {
      balance = BigNumber(rawBalance);
    }
  }

  if (isBigNumber(balance)) {
    const amountRequired = pooledTokenAmountRequired(amount, pooledToken, true);
    return balance.minus(amountRequired);
  }

  return BigNumber(0);
};

const updatePoolWeight = async (poolAddress) => {
  const { composition } = poolsConfig[poolAddress];

  const poolContract = await contract({ address: poolAddress });
  const bPoolAddress = await poolContract.getBPool();

  await Promise.all(composition.map(({ address }) => subscribeToBalance(address, bPoolAddress)));

  const allCurrentBalances = get(balances);
  const poolCurrentBalances = {};
  const poolCurrentUSD = {};

  const marketData = get(piesMarketDataStore);

  composition.forEach(({ address }) => {
    const key = balanceKey(address, bPoolAddress);
    poolCurrentBalances[address] = allCurrentBalances[key];
  });

  const total = Object.values(poolCurrentBalances).reduce(
    (sum, value) => sum.plus(value),
    BigNumber(0),
  );

  const totalUSD = Object.keys(poolCurrentBalances).reduce((sum, token) => {
    let price;
    try {
      if (marketData[token]) {
        price = marketData[token].market_data.current_price;
      } else {
        price = 0;
      }
    } catch (e) {
      console.error(e);
    }
    const balance = BigNumber(poolCurrentBalances[token]);
    poolCurrentUSD[token] = balance.multipliedBy(price);
    return sum.plus(poolCurrentUSD[token]);
  }, BigNumber(0));

  const updates = {};
  updates[`${poolAddress}-usd`] = totalUSD;
  updates[poolAddress] = composition.map((definition) => {
    const percentage = BigNumber(poolCurrentBalances[definition.address])
      .dividedBy(total)
      .multipliedBy(100)
      .toNumber();
    const percentageUSD = BigNumber(poolCurrentUSD[definition.address])
      .dividedBy(totalUSD)
      .multipliedBy(100)
      .toNumber();

    return { ...definition, percentage, percentageUSD };
  });

  pools.set({ ...get(pools), ...updates });
};

export const formatFiat = (value, separator = ',', decimal = '.', fiat = '$') => {
  if (!value) return 'n/a';
  try {
    const values = value.toString().replace(/^-/, '').split('.');
    const dollars = values[0];
    const cents = values[1];
    const groups = /(\d)(?=(\d{3})+\b)/g;
    return `${fiat} ${'#'.replace(
      '#',
      `${dollars.replace(groups, `$1${separator}`)}${cents ? decimal + cents : ''}`,
    )}`;
  } catch (e) {
    console.error(e);
    return value === undefined ? '-' : value;
  }
};

export const amountFormatter = ({
  amount,
  approximatePrefix = '~',
  displayDecimals = 3,
  lessThanPrefix = '< ',
  rounding = BigNumber.ROUND_DOWN,
  maxDigits,
}) => {
  if (!amount) {
    return '';
  }

  let decimals = displayDecimals;
  const prefix = '@pie-dao/utils - amountFormatter';
  const value = BigNumber(amount);

  validateIsBigNumber(value, { prefix });

  if (isNumber(maxDigits)) {
    let left = 0;
    while (BigNumber(10 ** left).isLessThan(value)) {
      left += 1;
    }
    const maxDecimals = maxDigits - left;
    if (maxDecimals < 0) {
      decimals = 0;
    } else if (maxDecimals < decimals) {
      decimals = maxDecimals;
    }
  }

  if (value.isZero()) {
    return value.toFixed(decimals);
  }

  const smallest = BigNumber(1)
    .dividedBy(10 ** decimals)
    .toString();

  if (value.isLessThan(smallest)) {
    return `${lessThanPrefix}${smallest}`;
  }

  const base = value.toFixed(decimals, rounding);

  if (value.isGreaterThan(base)) {
    return `${approximatePrefix}${base}`;
  }

  return base;
};

export const amountVsBalance = (amt, pooledToken, raw = false) => {
  const { address } = get(eth);
  const amount = BigNumber(amt);
  let amountDifference = BigNumber(0);

  if (address && isBigNumber(amount)) {
    amountDifference = rawAmountVsBalance(address, amount, pooledToken);
  } else if (isBigNumber(amount)) {
    amountDifference = rawAmountVsBalance(undefined, amount, pooledToken);
  }

  if (raw) {
    return amountDifference;
  }

  if (amountDifference.isLessThan(0)) {
    return BigNumber(0).minus(amountDifference).toFixed(8);
  }

  return amountDifference.toFixed(8);
};

export const amountVsBalanceClass = (amt, pooledToken) => {
  const amountDifference = amountVsBalance(amt, pooledToken, true);

  if (amountDifference.isLessThan(0)) {
    return 'negative';
  }

  if (amountDifference.isGreaterThan(0)) {
    return 'positive';
  }

  return 'neutral';
};

export const pooledTokenAmountRequired = (amt, { percentage }, raw = false) => {
  const amount = BigNumber(amt);
  let requiredAmount = BigNumber(0);

  if (isBigNumber(amount)) {
    requiredAmount = amount.multipliedBy(BigNumber(percentage).dividedBy(100));
  }

  if (raw) {
    return requiredAmount;
  }

  return amountFormatter({ amount: requiredAmount, displayDecimals: 8 });
};

export const fetchPieTokens = (balancesData) =>
  poolsConfig.selectable.map((address) => {
    const ethData = get(eth);
    const icon = getTokenImage(address);
    const { symbol } = poolsConfig[address];
    let balance = BigNumber(0);

    if (ethData.address) {
      subscribeToBalance(address, ethData.address);

      const balKey = balanceKey(address, ethData.address);
      balance = balancesData[balKey];
    }

    balance = amountFormatter({
      amount: balance,
      approximatePrefix: '',
      displayDecimals: 8,
      maxDigits: 10,
    });

    return {
      address,
      balance,
      icon,
      symbol,
    };
  });

export const fetchEthBalance = (address) => {
  subscribeToBalance(null, address);
};

export const fetchCalcTokensForAmounts = async (pieAddress, poolAmount) => {
  validateIsAddress(pieAddress);

  const tokenContract = await contract({ abi: pieSmartPool, address: pieAddress });
  const amount = ethers.BigNumber.from(
    BigNumber(poolAmount)
      .multipliedBy(10 ** 18)
      .toFixed(0),
  );

  const res = await tokenContract.calcTokensForAmount(amount);
  const data = {};

  res.tokens.forEach((token, index) => {
    const tokenInfo = find(poolsConfig[pieAddress.toLowerCase()].composition, { address: token });
    let d = tokenInfo && tokenInfo.decimals ? tokenInfo.decimals : 18;

    if (d < 18) {
      let adjustedAmount = BigNumber(res.amounts[index].toString()).multipliedBy(10 ** (18 - d));
      let bnAdjustedAmount = ethers.BigNumber.from(adjustedAmount.toString());

      data[token.toLowerCase()] = {
        amount: bnAdjustedAmount,
        label: ethers.utils.formatEther(bnAdjustedAmount),
      };
    } else {
      data[token.toLowerCase()] = {
        amount: res.amounts[index],
        label: ethers.utils.formatEther(res.amounts[index]),
      };
    }
  });

  return data;
};

export const fetchCalcToPie = async (pieAddress, poolAmount) => {
  validateIsAddress(pieAddress);
  const recipe = await contract({
    address: '0xca9af520706a57cecde6f596852eabb5a0e6bb0e',
    abi: recipeAbi,
  });

  const amount = ethers.BigNumber.from(
    BigNumber(poolAmount)
      .multipliedBy(10 ** 18)
      .toFixed(0),
  );
  const amountEthNecessary = await recipe.calcToPie(pieAddress, amount);
  return {
    val: amountEthNecessary,
    label: ethers.utils.formatEther(amountEthNecessary),
  };
};

export const fetchPooledTokens = (token, amount, current, allowancesData, balancesData) => {
  const composition = current || poolsConfig[token];

  return composition.map((pooledToken) => {
    const amountRequired = pooledTokenAmountRequired(amount, pooledToken, true);
    const amtVsBalance = amountVsBalance(amount, pooledToken);
    const amtVsBalanceClass = amountVsBalanceClass(amount, pooledToken);
    const ethData = get(eth);
    const icon = getTokenImage(pooledToken.address); // images.logos[pooledToken.symbol];
    const { address } = pooledToken;

    let actionBtnClass = 'hidden';
    let actionBtnLabel = '';

    const buyLink =
      pooledToken.buyLink ||
      'https://1inch.exchange/#/r/0x3bFdA5285416eB06Ebc8bc0aBf7d105813af06d0';

    if (ethData.address) {
      subscribeToAllowance(address, ethData.address, token);
      subscribeToBalance(address, ethData.address);

      const allowanceKey = functionKey(address, 'allowance', [ethData.address, token]);
      const allowance = allowancesData[allowanceKey];
      const balKey = balanceKey(address, ethData.address);

      if (
        balancesData[balKey] &&
        balancesData[balKey].isGreaterThan(amountRequired) &&
        (!isBigNumber(allowance) || allowance.isLessThan(amountRequired))
      ) {
        actionBtnClass =
          'btn-unlock cursor rounded-20px h-26px bg-white border border-black w-60px m-auto text-center text-xs font-thin leading-26px';
        actionBtnLabel = 'Unlock';
      } else if (balancesData[balKey] && balancesData[balKey].isLessThan(amountRequired)) {
        actionBtnClass =
          'btn-buy cursor rounded-20px h-26px bg-black text-white w-60px m-auto text-center text-xs font-thin leading-26px';
        actionBtnLabel = 'BUY';
      } else {
        actionBtnClass =
          'btn-buy rounded-20px h-26px bg-white text-grey w-60px m-auto text-center text-xs font-thin leading-26px';
        actionBtnLabel = 'ready';
      }
    }

    const originalWeights = find(poolsConfig[token].composition, { address: pooledToken.address });

    return {
      ...pooledToken,
      originalWeight: originalWeights.percentage,
      actionBtnClass,
      actionBtnLabel,
      amountRequired: amountFormatter({
        amount: amountRequired,
        approximatePrefix: '',
        displayDecimals: 8,
        maxDigits: 10,
      }),
      amountVsBalance: amountFormatter({
        amount: amtVsBalance,
        approximatePrefix: '',
        displayDecimals: 8,
        maxDigits: 10,
      }),
      amountVsBalanceClass: amtVsBalanceClass,
      buyLink,
      icon,
    };
  });
};

export const maxAmount = (token, current, multiplier = 0.99) => {
  validateIsAddress(token);

  const balancesData = get(balances);
  const composition = current || poolsConfig[token];
  const ethData = get(eth);

  if (!ethData.address) {
    return BigNumber(0);
  }

  return composition
    .reduce((acc, { address, percentage }) => {
      const balKey = balanceKey(address, ethData.address);
      const balance = balancesData[balKey];
      const amountPerUnit = BigNumber(percentage).dividedBy(100);
      const localMax = balance.dividedBy(amountPerUnit);
      return localMax.isLessThan(acc) ? localMax : acc;
    }, BigNumber(100000000000000))
    .multipliedBy(multiplier);
};

export const subscribeToAllowance = async (token, address, spender) => {
  validateIsAddress(token);
  validateIsAddress(address);
  validateIsAddress(spender);

  const args = [address, spender];
  const key = functionKey(token, 'allowance', args);

  if (allowanceSubscriptions.has(key)) {
    return;
  }

  allowanceSubscriptions.add(key);

  const tokenContract = await contract({ address: token });
  const trackable = tokenContract.functions.allowance(...args);
  const observable = await trackable.track();
  const decimals = await tokenContract.decimals();

  observable.subscribe({
    next: async (updatedAllowance) => {
      const updates = {};
      updates[key] = BigNumber(updatedAllowance).dividedBy(10 ** decimals);
      const existingAllowance = get(allowances)[key];
      if (!updates[key].isEqualTo(existingAllowance)) {
        allowances.set({ ...get(allowances), ...updates });
      }
    },
  });

  bumpLifecycle();
};

export const subscribeToStakingEarnings = async (contractAddress, address, shouldBump = true) => {
  const token = contractAddress;

  validateIsAddress(token);
  validateIsAddress(address);

  const keyEarned = balanceKey(token, address, '.earned');

  if (balanceSubscriptions.has(keyEarned)) {
    return;
  }
  balanceSubscriptions.add(keyEarned);

  const unipool = await contract({ address: contractAddress, abi: unipoolAbi });

  const observableEarned = await unipool.trackEarnedBalance(address);
  const decimals = 18;

  observableEarned.subscribe({
    next: async (updatedBalance) => {
      const updates = {};
      updates[keyEarned] = BigNumber(updatedBalance).dividedBy(10 ** decimals);
      balances.set({ ...get(balances), ...updates });
    },
  });

  if (shouldBump) {
    bumpLifecycle();
  }
};

export const subscribeToStakingEarningsGeyser = async (contractAddress, address, shouldBump = true) => {
  const token = contractAddress;

  validateIsAddress(token);
  validateIsAddress(address);

  const keyEarned = balanceKey(token, address, '.geyserEarned');

  if (balanceSubscriptions.has(keyEarned)) {
    return;
  }
  balanceSubscriptions.add(keyEarned);

  const unipool = await contract({ address: contractAddress, abi: geyserABI });

  const observableEarned = await unipool.trackEarnedBalance(address);
  const decimals = 18;

  observableEarned.subscribe({
    next: async (updatedBalance) => {
      const updates = {};
      updates[keyEarned] = BigNumber(updatedBalance).dividedBy(10 ** decimals);
      balances.set({ ...get(balances), ...updates });
    },
  });

  if (shouldBump) {
    bumpLifecycle();
  }
};

export const subscribeToStaking = async (contractAddress, address, shouldBump = true) => {
  const token = contractAddress;

  validateIsAddress(token);
  validateIsAddress(address);

  const key = balanceKey(token, address);

  if (balanceSubscriptions.has(key)) {
    return;
  }

  balanceSubscriptions.add(key);

  const unipool = await contract({ address: contractAddress, abi: unipoolAbi });

  const observable = await unipool.trackStakedBalance(address);
  const decimals = 18;

  observable.subscribe({
    next: async (updatedBalance) => {
      const updates = {};
      updates[key] = BigNumber(updatedBalance).dividedBy(10 ** decimals);
      balances.set({ ...get(balances), ...updates });
    },
  });

  if (shouldBump) {
    bumpLifecycle();
  }
};

export const subscribeToBalance = async (tokenAddress, address, shouldBump = true) => {
  let token = tokenAddress;

  if (!token) {
    token = ethers.constants.AddressZero;
  }

  validateIsAddress(token);
  validateIsAddress(address);

  const key = balanceKey(token, address);

  if (balanceSubscriptions.has(key)) {
    return;
  }

  balanceSubscriptions.add(key);

  const observable = await trackBalance(address, tokenAddress);
  let decimals = 18;

  if (token !== ethers.constants.AddressZero) {
    const tokenContract = await contract({ address: token });
    decimals = await tokenContract.decimals();
  }

  observable.subscribe({
    next: async (updatedBalance) => {
      const updates = {};
      updates[key] = BigNumber(updatedBalance).dividedBy(10 ** decimals);
      balances.set({ ...get(balances), ...updates });
    },
  });

  if (shouldBump) {
    bumpLifecycle();
  }
};

export const subscribeToPoolWeights = async (poolAddress) => {
  validateIsAddress(poolAddress);

  // if (get(pools)[poolAddress]) {
  //   return;
  // }

  const { composition } = poolsConfig[poolAddress];
  const updates = {};
  updates[poolAddress] = composition;

  // pools.set({ ...get(pools), ...updates });

  const poolContract = await contract({ address: poolAddress });
  const bPoolAddress = await poolContract.getBPool();

  await Promise.all(
    composition.map(({ address }) => subscribeToBalance(address, bPoolAddress, false)),
  );

  composition.forEach(async ({ address }) => {
    const tokenContract = await contract({ address });
    const observable = await tokenContract.trackBalance(bPoolAddress);
    observable.subscribe({
      next: () => {
        enqueueWeightUpdate(poolAddress);
      },
    });
  });

  bumpLifecycle();
};

export const toFixed = function (num=0, fixed) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  const arr = num.toString().match(re);
  if (arr && arr.length > 0) {
    return arr[0];
  } else {
    return '0';
  }
};

const isRewardPeriodOver = async function (reward_contract_instance) {
  const now = Date.now() / 1000;
  const periodFinish = await getPeriodFinishForReward(reward_contract_instance);
  return periodFinish < now;
};

const getPeriodFinishForReward = async function (reward_contract_instance) {
  return await reward_contract_instance.periodFinish();
};

const getPoolWeeklyReward = async (instance) => {
  if (await isRewardPeriodOver(instance)) {
    return 0;
  }

  const rewardRate = await instance.rewardRate();
  return Math.round((rewardRate / 1e18) * 604800);
};

const getLatestTotalBALAmount = async function (addr) {
  const bal_earnings = await getBALEarnings(addr, BAL_DISTRIBUTION_WEEK - 1);
  return bal_earnings[0];
};

export const calculateAPRUniswap = async (
  addressStakingPool,
  tokenToStake,
  stakedBPTAmount = null,
  earnedDOUGH = null,
  assetOne,
  assetTwo,
) => {
  const marketData = get(piesMarketDataStore);
  const DOUGH = assetOne;
  const WETH = assetTwo;
  const StakingPOOL = await contract({ address: addressStakingPool, abi: unipoolAbi });
  const BALANCER_POOL = await contract({ address: tokenToStake, abi: uniswapPair });

  const totalBPTAmount = (await BALANCER_POOL.totalSupply()) / 1e18;
  const totalStakedBPTAmount = (await StakingPOOL.totalSupply()) / 1e18;

  const WETH_TOKEN = await contract({ address: WETH });
  const DOUGH_TOKEN = await contract({ address: DOUGH });

  const totalDOUGHAmount = (await DOUGH_TOKEN.balanceOf(tokenToStake)) / 1e18;
  const totalWETHAmount = (await WETH_TOKEN.balanceOf(tokenToStake)) / 1e18;

  const DOUGHperBPT = totalDOUGHAmount / totalBPTAmount;
  const WETHperBPT = totalWETHAmount / totalBPTAmount;

  // Find out reward rate
  const weekly_reward = await getPoolWeeklyReward(StakingPOOL);
  const rewardPerToken = weekly_reward / totalStakedBPTAmount;

  //console.log('Uniswap Finished reading smart contracts... Looking up prices... \n');

  // Look up prices
  const DOUGHPrice = marketData[DOUGH].market_data.current_price;
  const ETHPrice = marketData[WETH].market_data.current_price;
  const BPTPrice = DOUGHperBPT * DOUGHPrice + WETHperBPT * ETHPrice;
  const totalLiquidity = BPTPrice * totalBPTAmount;
  // Finished. Start printing
  const DOUGHWeeklyROI = (rewardPerToken * DOUGHPrice * 100) / BPTPrice;

  if (false) {
    console.log('========== STAKING =========');
    console.log(`There are total   : ${totalBPTAmount} BPT in the Balancer Contract.`);
    console.log(`There are total   : ${totalStakedBPTAmount} BPT staked in Staking pool. \n`);
    if (stakedBPTAmount) {
      console.log(
        `You are staking   : ${stakedBPTAmount} BPT (${toFixed(
          (stakedBPTAmount * 100) / totalStakedBPTAmount,
          3,
        )}% of the pool)`,
      );
      console.log(
        `                  = [${DOUGHperBPT * stakedBPTAmount} SNX, ${
          WETHperBPT * stakedBPTAmount
        } USDC]`,
      );
      console.log(
        `                  = $${toFixed(
          DOUGHperBPT * stakedBPTAmount * DOUGHPrice + WETHperBPT * stakedBPTAmount * ETHPrice,
          2,
        )}\n`,
      );
    }

    // DOUGH REWARDS
    console.log('======== DOUGH REWARDS ========');
    if (stakedBPTAmount && earnedDOUGH) {
      console.log(
        `Claimable Rewards : ${toFixed(earnedDOUGH, 2)} DOUGH = $${toFixed(
          earnedDOUGH * DOUGHPrice,
          2,
        )}`,
      );
      console.log(
        `Weekly estimate   : ${toFixed(rewardPerToken * stakedBPTAmount, 2)} DOUGH = $${toFixed(
          rewardPerToken * stakedBPTAmount * DOUGHPrice,
          2,
        )} (out of total ${weekly_reward} DOUGH)`,
      );
    }
    console.log(`Weekly ROI in USD : ${toFixed(DOUGHWeeklyROI, 4)}%`);
    console.log(`APR (unstable)    : ${toFixed(DOUGHWeeklyROI * 52, 4)}% \n`);
  }

  const res = {
    roi: DOUGHWeeklyROI,
    weekly: `${toFixed(DOUGHWeeklyROI, 4)}%`,
    apr: `${toFixed(DOUGHWeeklyROI * 52, 4)}%`,
    totalBPTAmount,
    totalStakedBPTAmount,
    BPTPrice,
    weekly_reward,
    rewardPerToken,
    DOUGHperBPT,
    WETHperBPT,
    DOUGHPrice,
    ETHPrice,
    doughStaked: totalDOUGHAmount,
    ethStaked: totalWETHAmount,
    totalLiquidity,
  };

  const updates = {};
  updates[addressStakingPool] = res;
  farming.set({ ...get(farming), ...updates });
};

export const calculateAPRBalancer = async (
  addressStakingPool,
  tokenToStake,
  stakedBPTAmount = null,
  earnedDOUGH = null,
  assetOne,
  assetTwo,
) => {
  const marketData = get(piesMarketDataStore);
  const DOUGH = assetOne;
  const WETH = assetTwo;

  if( addressStakingPool === '' || tokenToStake === '') return;
  
  const StakingPOOL = await contract({ address: addressStakingPool, abi: unipoolAbi });
  const BALANCER_POOL = await contract({ address: tokenToStake, abi: BALANCER_POOL_ABI });

  const totalBPTAmount = (await BALANCER_POOL.totalSupply()) / 1e18;
  const totalStakedBPTAmount = (await StakingPOOL.totalSupply()) / 1e18;

  const totalDOUGHAmount = (await BALANCER_POOL.getBalance(DOUGH)) / 1e18;
  const totalWETHAmount = (await BALANCER_POOL.getBalance(WETH)) / 1e18;

  const DOUGHperBPT = totalDOUGHAmount / totalBPTAmount;
  const WETHperBPT = totalWETHAmount / totalBPTAmount;

  // Look up prices
  const DOUGHPrice = marketData[DOUGH].market_data.current_price;
  const ETHPrice = marketData[WETH].market_data.current_price;
  const BPTPrice = DOUGHperBPT * DOUGHPrice + WETHperBPT * ETHPrice;
  const totalLiquidity = BPTPrice * totalBPTAmount;

  let res;

  try {
    
    // Find out reward rate
    const weekly_reward = await getPoolWeeklyReward(StakingPOOL);
    const rewardPerToken = weekly_reward / totalStakedBPTAmount;
  
    // console.log('Finished reading smart contracts... Looking up prices... \n', marketData[DOUGH]);
    // Finished. Start printing
    const DOUGHWeeklyROI = (rewardPerToken * DOUGHPrice * 100) / BPTPrice;
    
  
    if (null) {
      console.log('========== STAKING =========');
      console.log(`There are total   : ${totalBPTAmount} BPT in the Balancer Contract.`);
      console.log(`There are total   : ${totalStakedBPTAmount} BPT staked in Staking pool. \n`);
      if (stakedBPTAmount) {
        console.log(
          `You are staking   : ${stakedBPTAmount} BPT (${toFixed(
            (stakedBPTAmount * 100) / totalStakedBPTAmount,
            3,
          )}% of the pool)`,
        );
        console.log(
          `                  = [${DOUGHperBPT * stakedBPTAmount} SNX, ${
            WETHperBPT * stakedBPTAmount
          } USDC]`,
        );
        console.log(
          `                  = $${toFixed(
            DOUGHperBPT * stakedBPTAmount * DOUGHPrice + WETHperBPT * stakedBPTAmount * ETHPrice,
            2,
          )}\n`,
        );
      }
  
      // DOUGH REWARDS
      console.log('======== DOUGH REWARDS ========');
      if (stakedBPTAmount && earnedDOUGH) {
        console.log(
          `Claimable Rewards : ${toFixed(earnedDOUGH, 2)} DOUGH = $${toFixed(
            earnedDOUGH * DOUGHPrice,
            2,
          )}`,
        );
        console.log(
          `Weekly estimate   : ${toFixed(rewardPerToken * stakedBPTAmount, 2)} DOUGH = $${toFixed(
            rewardPerToken * stakedBPTAmount * DOUGHPrice,
            2,
          )} (out of total ${weekly_reward} DOUGH)`,
        );
      }
      console.log(`Weekly ROI in USD : ${toFixed(DOUGHWeeklyROI, 4)}%`);
      console.log(`APR (unstable)    : ${toFixed(DOUGHWeeklyROI * 52, 4)}% \n`);
    }
  
    res = {
      roi: DOUGHWeeklyROI,
      weekly: `${toFixed(DOUGHWeeklyROI, 4)}%`,
      apr: `${toFixed(DOUGHWeeklyROI * 52, 4)}%`,
      totalBPTAmount,
      totalStakedBPTAmount,
      BPTPrice,
      weekly_reward,
      rewardPerToken,
      DOUGHperBPT,
      WETHperBPT,
      DOUGHPrice,
      BPTPrice,
      ETHPrice,
      doughStaked: totalDOUGHAmount,
      ethStaked: totalWETHAmount,
      totalLiquidity,
    };
  
    const updates = {};
    updates[addressStakingPool] = res;
    farming.set({ ...get(farming), ...updates });
  } catch(e) {
    res = {
      totalBPTAmount,
      totalStakedBPTAmount,
      BPTPrice,
      DOUGHperBPT,
      WETHperBPT,
      BPTPrice,
      DOUGHPrice,
      ETHPrice,
      doughStaked: totalDOUGHAmount,
      ethStaked: totalWETHAmount,
      totalLiquidity,
    };
    
  }

  const updates = {};
    updates[addressStakingPool] = res;
    farming.set({ ...get(farming), ...updates });
  
};