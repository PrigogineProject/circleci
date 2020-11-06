/* src/pages/CepIndexLanding.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	set_style,
	space,
	text,
	toggle_class,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { _ } from "../../web_modules/svelte-i18n.js";
import BigNumber from "../../web_modules/bignumberjs.js";
import get from "../../web_modules/lodash/get.js";
import first from "../../web_modules/lodash/first.js";
import flattenDeep from "../../web_modules/lodash/flattenDeep.js";
import { onMount } from "../../web_modules/svelte.js";
import { currentRoute } from "../stores/routes.js";
import TradingViewWidget from "../components/TradingViewWidget.js";
import Etherscan from "../components/Etherscan.js";
import Farming from "../components/Farming.js";
import Quantstamp from "../components/Quantstamp.js";
import PoolDescription from "../components/PoolDescription.js";
import images from "../config/images.json.proxy.js";
import poolsConfig from "../config/pools.json.proxy.js";
import { CoinGecko, piesMarketDataStore } from "../stores/coingecko.js";

import {
	fetchPooledTokens,
	pooledTokenAmountRequired
} from "../components/helpers.js";

import {
	amountFormatter,
	getTokenImage,
	formatFiat,
	fetchPieTokens
} from "../components/helpers.js";

import { pools } from "../stores/eth.js";
import { balanceKey, contract, balances } from "../stores/eth.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[20] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[23] = list[i];
	return child_ctx;
}

// (137:12) {#if change24H}
function create_if_block_3(ctx) {
	let h5;
	let t0;
	let t1;

	return {
		c() {
			h5 = element("h5");
			t0 = text(/*change24H*/ ctx[7]);
			t1 = text("%");
			attr(h5, "class", "text-sm leading-none font-thin");
			toggle_class(h5, "green", /*change24H*/ ctx[7] > 0);
			toggle_class(h5, "red", /*change24H*/ ctx[7] < 0);
		},
		m(target, anchor) {
			insert(target, h5, anchor);
			append(h5, t0);
			append(h5, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*change24H*/ 128) set_data(t0, /*change24H*/ ctx[7]);

			if (dirty & /*change24H*/ 128) {
				toggle_class(h5, "green", /*change24H*/ ctx[7] > 0);
			}

			if (dirty & /*change24H*/ 128) {
				toggle_class(h5, "red", /*change24H*/ ctx[7] < 0);
			}
		},
		d(detaching) {
			if (detaching) detach(h5);
		}
	};
}

// (145:12) {#if tokenPrice}
function create_if_block_2(ctx) {
	let h5;
	let t_value = formatFiat(/*tokenPrice*/ ctx[9]) + "";
	let t;

	return {
		c() {
			h5 = element("h5");
			t = text(t_value);
			attr(h5, "class", "text-xl leading-none font-thin");
		},
		m(target, anchor) {
			insert(target, h5, anchor);
			append(h5, t);
		},
		p(ctx, dirty) {
			if (dirty & /*tokenPrice*/ 512 && t_value !== (t_value = formatFiat(/*tokenPrice*/ ctx[9]) + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(h5);
		}
	};
}

// (165:6) {#if get($piesMarketDataStore, `${token.toLowerCase()}.market_data.market_cap`, '-') != '-'}
function create_if_block_1(ctx) {
	let div2;
	let div0;
	let t0_value = /*$_*/ ctx[11]("cep.marketCap") + "";
	let t0;
	let t1;
	let div1;
	let t2_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*token*/ ctx[2]}.market_data.market_cap`, "-")) + "";
	let t2;

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			t2 = text(t2_value);
			attr(div0, "class", "text-center font-thin text-xs md:text-base");
			attr(div1, "class", "text-center text-2xl md:text-xl font-black");
			attr(div2, "class", "p-0 self-start md:w-1/4");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, t0);
			append(div2, t1);
			append(div2, div1);
			append(div1, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 2048 && t0_value !== (t0_value = /*$_*/ ctx[11]("cep.marketCap") + "")) set_data(t0, t0_value);
			if (dirty & /*$piesMarketDataStore, token*/ 260 && t2_value !== (t2_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*token*/ ctx[2]}.market_data.market_cap`, "-")) + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

// (208:4) {#if pieOfPies }
function create_if_block(ctx) {
	let h4;
	let t1;
	let ul;
	let each_value_1 = /*pieOfPies*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	return {
		c() {
			h4 = element("h4");
			h4.textContent = "*This allocation is composed of multiple pies, find below the exploded allocation.";
			t1 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
		},
		m(target, anchor) {
			insert(target, h4, anchor);
			insert(target, t1, anchor);
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*pieOfPies*/ 1) {
				each_value_1 = /*pieOfPies*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			if (detaching) detach(h4);
			if (detaching) detach(t1);
			if (detaching) detach(ul);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (211:8) {#each pieOfPies as subPie}
function create_each_block_1(ctx) {
	let li;
	let a;
	let t_value = /*subPie*/ ctx[23].symbol + "";
	let t;
	let a_href_value;

	return {
		c() {
			li = element("li");
			a = element("a");
			t = text(t_value);
			attr(a, "href", a_href_value = "#/cep/" + /*subPie*/ ctx[23].address);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, a);
			append(a, t);
		},
		p(ctx, dirty) {
			if (dirty & /*pieOfPies*/ 1 && t_value !== (t_value = /*subPie*/ ctx[23].symbol + "")) set_data(t, t_value);

			if (dirty & /*pieOfPies*/ 1 && a_href_value !== (a_href_value = "#/cep/" + /*subPie*/ ctx[23].address)) {
				attr(a, "href", a_href_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

// (230:10) {#each composition as pooledToken}
function create_each_block(ctx) {
	let tr;
	let td0;
	let img0;
	let img0_src_value;
	let img0_alt_value;
	let t0;
	let t1_value = /*pooledToken*/ ctx[20].symbol + "";
	let t1;
	let t2;
	let td1;
	let t3_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*pooledToken*/ ctx[20].address}.market_data.current_price`, "-")) + "";
	let t3;
	let t4;
	let td2;

	let t5_value = amountFormatter({
		amount: /*pooledToken*/ ctx[20].percentageUSD,
		displayDecimals: 2
	}) + "";

	let t5;
	let t6;
	let t7;
	let td3;
	let t8_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*pooledToken*/ ctx[20].address}.market_data.market_cap`, "-")) + "";
	let t8;
	let t9;
	let td4;
	let t10_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*pooledToken*/ ctx[20].address}.market_data.total_volume`, "-")) + "";
	let t10;
	let t11;
	let td5;
	let img1;
	let img1_src_value;
	let t12;

	return {
		c() {
			tr = element("tr");
			td0 = element("td");
			img0 = element("img");
			t0 = space();
			t1 = text(t1_value);
			t2 = space();
			td1 = element("td");
			t3 = text(t3_value);
			t4 = space();
			td2 = element("td");
			t5 = text(t5_value);
			t6 = text("%");
			t7 = space();
			td3 = element("td");
			t8 = text(t8_value);
			t9 = space();
			td4 = element("td");
			t10 = text(t10_value);
			t11 = space();
			td5 = element("td");
			img1 = element("img");
			t12 = space();
			attr(img0, "class", "inline icon ml-2 mr-2");
			if (img0.src !== (img0_src_value = getTokenImage(/*pooledToken*/ ctx[20].address))) attr(img0, "src", img0_src_value);
			attr(img0, "alt", img0_alt_value = /*pooledToken*/ ctx[20].symbol);
			attr(td0, "class", "border border-gray-800 px-2 py-2 text-left");
			attr(td1, "class", "border text-center px-4 py-2");
			attr(td2, "class", "border text-center px-4 py-2");
			attr(td3, "class", "border text-center px-4 py-2");
			attr(td4, "class", "border text-center px-4 py-2");
			attr(img1, "class", "w-30 spark mx-0");
			attr(img1, "alt", "Sparkline");
			if (img1.src !== (img1_src_value = "https://www.coingecko.com/coins/" + /*pooledToken*/ ctx[20].coingeckoImageId + "/sparkline")) attr(img1, "src", img1_src_value);
			set_style(img1, "margin", "auto");
			attr(td5, "class", "border text-center py-2");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, td0);
			append(td0, img0);
			append(td0, t0);
			append(td0, t1);
			append(tr, t2);
			append(tr, td1);
			append(td1, t3);
			append(tr, t4);
			append(tr, td2);
			append(td2, t5);
			append(td2, t6);
			append(tr, t7);
			append(tr, td3);
			append(td3, t8);
			append(tr, t9);
			append(tr, td4);
			append(td4, t10);
			append(tr, t11);
			append(tr, td5);
			append(td5, img1);
			append(tr, t12);
		},
		p(ctx, dirty) {
			if (dirty & /*composition*/ 1024 && img0.src !== (img0_src_value = getTokenImage(/*pooledToken*/ ctx[20].address))) {
				attr(img0, "src", img0_src_value);
			}

			if (dirty & /*composition*/ 1024 && img0_alt_value !== (img0_alt_value = /*pooledToken*/ ctx[20].symbol)) {
				attr(img0, "alt", img0_alt_value);
			}

			if (dirty & /*composition*/ 1024 && t1_value !== (t1_value = /*pooledToken*/ ctx[20].symbol + "")) set_data(t1, t1_value);
			if (dirty & /*$piesMarketDataStore, composition*/ 1280 && t3_value !== (t3_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*pooledToken*/ ctx[20].address}.market_data.current_price`, "-")) + "")) set_data(t3, t3_value);

			if (dirty & /*composition*/ 1024 && t5_value !== (t5_value = amountFormatter({
				amount: /*pooledToken*/ ctx[20].percentageUSD,
				displayDecimals: 2
			}) + "")) set_data(t5, t5_value);

			if (dirty & /*$piesMarketDataStore, composition*/ 1280 && t8_value !== (t8_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*pooledToken*/ ctx[20].address}.market_data.market_cap`, "-")) + "")) set_data(t8, t8_value);
			if (dirty & /*$piesMarketDataStore, composition*/ 1280 && t10_value !== (t10_value = formatFiat(get(/*$piesMarketDataStore*/ ctx[8], `${/*pooledToken*/ ctx[20].address}.market_data.total_volume`, "-")) + "")) set_data(t10, t10_value);

			if (dirty & /*composition*/ 1024 && img1.src !== (img1_src_value = "https://www.coingecko.com/coins/" + /*pooledToken*/ ctx[20].coingeckoImageId + "/sparkline")) {
				attr(img1, "src", img1_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(tr);
		}
	};
}

function create_fragment(ctx) {
	let div21;
	let div4;
	let div3;
	let div1;
	let a0;
	let img;
	let img_src_value;
	let a0_href_value;
	let t0;
	let div0;
	let a1;
	let h10;
	let t1;
	let a1_href_value;
	let t2;
	let t3;
	let t4;
	let div2;
	let a2;
	let button0;
	let t5_value = /*$_*/ ctx[11]("cep.redeem") + "";
	let t5;
	let a2_href_value;
	let t6;
	let a3;
	let button1;
	let t7_value = /*$_*/ ctx[11]("cep.mint") + "";
	let t7;
	let a3_href_value;
	let t8;
	let div14;
	let show_if = get(/*$piesMarketDataStore*/ ctx[8], `${/*token*/ ctx[2].toLowerCase()}.market_data.market_cap`, "-") != "-";
	let t9;
	let div7;
	let div5;
	let t10_value = /*$_*/ ctx[11]("cep.swap.fee") + "";
	let t10;
	let t11;
	let div6;
	let t12;
	let t13;
	let t14;
	let div10;
	let div8;
	let t15_value = /*$_*/ ctx[11]("cep.streaming.fee") + "";
	let t15;
	let t16;
	let div9;
	let t18;
	let div13;
	let div11;
	let t19_value = /*$_*/ ctx[11]("cep.days.change") + "";
	let t19;
	let t20;
	let div12;
	let t21_value = get(/*$piesMarketDataStore*/ ctx[8], `${/*token*/ ctx[2]}.market_data.price_change_percentage_7d_in_currency`, "-") + "";
	let t21;
	let t22;
	let div15;
	let tradingviewwidget;
	let div15_class_value;
	let t23;
	let div19;
	let div16;
	let farming;
	let t24;
	let div17;
	let etherscan;
	let t25;
	let div18;
	let quantstamp;
	let t26;
	let h11;
	let t27_value = /*$_*/ ctx[11]("cep.allocation.breakdown") + "";
	let t27;
	let t28;
	let t29;
	let div20;
	let table;
	let thead;
	let tr;
	let th0;
	let t30_value = /*$_*/ ctx[11]("cep.asset.name") + "";
	let t30;
	let t31;
	let th1;
	let t32_value = /*$_*/ ctx[11]("cep.price") + "";
	let t32;
	let t33;
	let th2;
	let t34_value = /*$_*/ ctx[11]("cep.current.allocation") + "";
	let t34;
	let t35;
	let th3;
	let t36_value = /*$_*/ ctx[11]("cep.marketCap") + "";
	let t36;
	let t37;
	let th4;
	let t38_value = /*$_*/ ctx[11]("cep.volume") + "";
	let t38;
	let t39;
	let th5;
	let t40_value = /*$_*/ ctx[11]("cep.change") + "";
	let t40;
	let t41;
	let tbody;
	let current;
	let if_block0 = /*change24H*/ ctx[7] && create_if_block_3(ctx);
	let if_block1 = /*tokenPrice*/ ctx[9] && create_if_block_2(ctx);
	let if_block2 = show_if && create_if_block_1(ctx);
	let tradingviewwidget_props = { options: /*options*/ ctx[3] };
	tradingviewwidget = new TradingViewWidget({ props: tradingviewwidget_props });
	/*tradingviewwidget_binding*/ ctx[14](tradingviewwidget);

	farming = new Farming({
			props: {
				token: /*$currentRoute*/ ctx[12].params.address
			}
		});

	etherscan = new Etherscan({
			props: {
				token: /*$currentRoute*/ ctx[12].params.address
			}
		});

	quantstamp = new Quantstamp({
			props: {
				class: "w-1/2",
				token: /*$currentRoute*/ ctx[12].params.address
			}
		});

	let if_block3 = /*pieOfPies*/ ctx[0] && create_if_block(ctx);
	let each_value = /*composition*/ ctx[10];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div21 = element("div");
			div4 = element("div");
			div3 = element("div");
			div1 = element("div");
			a0 = element("a");
			img = element("img");
			t0 = space();
			div0 = element("div");
			a1 = element("a");
			h10 = element("h1");
			t1 = text(/*symbol*/ ctx[4]);
			t2 = space();
			if (if_block0) if_block0.c();
			t3 = space();
			if (if_block1) if_block1.c();
			t4 = space();
			div2 = element("div");
			a2 = element("a");
			button0 = element("button");
			t5 = text(t5_value);
			t6 = space();
			a3 = element("a");
			button1 = element("button");
			t7 = text(t7_value);
			t8 = space();
			div14 = element("div");
			if (if_block2) if_block2.c();
			t9 = space();
			div7 = element("div");
			div5 = element("div");
			t10 = text(t10_value);
			t11 = space();
			div6 = element("div");
			t12 = text(/*swapFees*/ ctx[5]);
			t13 = text("%");
			t14 = space();
			div10 = element("div");
			div8 = element("div");
			t15 = text(t15_value);
			t16 = space();
			div9 = element("div");
			div9.textContent = "0%";
			t18 = space();
			div13 = element("div");
			div11 = element("div");
			t19 = text(t19_value);
			t20 = space();
			div12 = element("div");
			t21 = text(t21_value);
			t22 = space();
			div15 = element("div");
			create_component(tradingviewwidget.$$.fragment);
			t23 = space();
			div19 = element("div");
			div16 = element("div");
			create_component(farming.$$.fragment);
			t24 = space();
			div17 = element("div");
			create_component(etherscan.$$.fragment);
			t25 = space();
			div18 = element("div");
			create_component(quantstamp.$$.fragment);
			t26 = space();
			h11 = element("h1");
			t27 = text(t27_value);
			t28 = space();
			if (if_block3) if_block3.c();
			t29 = space();
			div20 = element("div");
			table = element("table");
			thead = element("thead");
			tr = element("tr");
			th0 = element("th");
			t30 = text(t30_value);
			t31 = space();
			th1 = element("th");
			t32 = text(t32_value);
			t33 = space();
			th2 = element("th");
			t34 = text(t34_value);
			t35 = space();
			th3 = element("th");
			t36 = text(t36_value);
			t37 = space();
			th4 = element("th");
			t38 = text(t38_value);
			t39 = space();
			th5 = element("th");
			t40 = text(t40_value);
			t41 = space();
			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(img, "class", "h-80px inline");
			if (img.src !== (img_src_value = /*tokenLogo*/ ctx[6])) attr(img, "src", img_src_value);
			attr(img, "alt", /*symbol*/ ctx[4]);
			attr(a0, "href", a0_href_value = `#/pools/${/*token*/ ctx[2]}`);
			attr(h10, "class", "text-xl leading-none font-black");
			attr(a1, "href", a1_href_value = `#/pools/${/*token*/ ctx[2]}`);
			attr(div0, "class", "mx-3 flex flex-col justify-center");
			attr(div1, "class", "flex flex-row sm:w-full md:w-1/3");
			attr(button0, "class", "btn text-white font-bold ml-0 mr-1 rounded md:ml-4 py-2 px-4");
			attr(a2, "href", a2_href_value = `#/pools/${/*token*/ ctx[2]}/withdraw/multi`);
			attr(button1, "class", "btn text-white font-bold ml-0 mr-1 rounded md:ml-4 py-2 px-4");
			attr(a3, "href", a3_href_value = `#/pools/${/*token*/ ctx[2]}`);
			attr(div2, "class", "sm:w-full md:w-2/3 flex flex-row-reverse");
			attr(div3, "class", "flex flex-row content-between justify-between flex-wrap w-full");
			attr(div4, "class", "flex flex-wrap w-full");
			attr(div5, "class", "text-center font-thin text-xs md:text-base");
			attr(div6, "class", "text-center text-2xl md:text-xl font-black");
			attr(div7, "class", "p-0 md:w-1/4");
			attr(div8, "class", "text-center font-thin text-xs md:text-base");
			attr(div9, "class", "text-center text-2xl md:text-xl font-black");
			attr(div10, "class", "p-0 md:w-1/4");
			attr(div11, "class", "text-center font-thin text-xs md:text-base");
			attr(div12, "class", "text-center text-2xl md:text-xl font-black");
			attr(div13, "class", "p-0 md:w-1/4");
			attr(div14, "class", "flex justify-between flex-wrap w-full mt-2 md:mt-8");

			attr(div15, "class", div15_class_value = "flex flex-row w-100pc mt-2 spl-chart-container md:mt-8 " + (poolsConfig[/*token*/ ctx[2]].mapDynamicTradingViewFormula
			? ""
			: "hidden"));

			attr(div16, "class", "p-0 mt-2 md:half");
			attr(div17, "class", "p-0 mt-2 md:w-1/4");
			attr(div18, "class", "p-0 mt-2 md:w-1/4");
			attr(div19, "class", "flex flex-col w-full mt-2 md:mt-8 md:justify-between md:flex-row");
			attr(h11, "class", "mt-8 mb-4 text-base md:text-3xl");
			attr(th0, "class", "font-thin border-b-2 px-4 py-2 text-left");
			attr(th1, "class", "font-thin border-b-2 px-4 py-2");
			attr(th2, "class", "font-thin border-b-2 px-4 py-2");
			attr(th3, "class", "font-thin border-b-2 px-4 py-2");
			attr(th4, "class", "font-thin border-b-2 px-4 py-2");
			attr(th5, "class", "font-thin border-b-2 px-4 py-2");
			attr(table, "class", "breakdown-table table-auto w-full");
			attr(div20, "class", "w-99pc m-4");
			attr(div21, "class", "content flex flex-col spl");
		},
		m(target, anchor) {
			insert(target, div21, anchor);
			append(div21, div4);
			append(div4, div3);
			append(div3, div1);
			append(div1, a0);
			append(a0, img);
			append(div1, t0);
			append(div1, div0);
			append(div0, a1);
			append(a1, h10);
			append(h10, t1);
			append(div0, t2);
			if (if_block0) if_block0.m(div0, null);
			append(div0, t3);
			if (if_block1) if_block1.m(div0, null);
			append(div3, t4);
			append(div3, div2);
			append(div2, a2);
			append(a2, button0);
			append(button0, t5);
			append(div2, t6);
			append(div2, a3);
			append(a3, button1);
			append(button1, t7);
			append(div21, t8);
			append(div21, div14);
			if (if_block2) if_block2.m(div14, null);
			append(div14, t9);
			append(div14, div7);
			append(div7, div5);
			append(div5, t10);
			append(div7, t11);
			append(div7, div6);
			append(div6, t12);
			append(div6, t13);
			append(div14, t14);
			append(div14, div10);
			append(div10, div8);
			append(div8, t15);
			append(div10, t16);
			append(div10, div9);
			append(div14, t18);
			append(div14, div13);
			append(div13, div11);
			append(div11, t19);
			append(div13, t20);
			append(div13, div12);
			append(div12, t21);
			append(div21, t22);
			append(div21, div15);
			mount_component(tradingviewwidget, div15, null);
			append(div21, t23);
			append(div21, div19);
			append(div19, div16);
			mount_component(farming, div16, null);
			append(div19, t24);
			append(div19, div17);
			mount_component(etherscan, div17, null);
			append(div19, t25);
			append(div19, div18);
			mount_component(quantstamp, div18, null);
			append(div21, t26);
			append(div21, h11);
			append(h11, t27);
			append(div21, t28);
			if (if_block3) if_block3.m(div21, null);
			append(div21, t29);
			append(div21, div20);
			append(div20, table);
			append(table, thead);
			append(thead, tr);
			append(tr, th0);
			append(th0, t30);
			append(tr, t31);
			append(tr, th1);
			append(th1, t32);
			append(tr, t33);
			append(tr, th2);
			append(th2, t34);
			append(tr, t35);
			append(tr, th3);
			append(th3, t36);
			append(tr, t37);
			append(tr, th4);
			append(th4, t38);
			append(tr, t39);
			append(tr, th5);
			append(th5, t40);
			append(table, t41);
			append(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tbody, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*tokenLogo*/ 64 && img.src !== (img_src_value = /*tokenLogo*/ ctx[6])) {
				attr(img, "src", img_src_value);
			}

			if (!current || dirty & /*symbol*/ 16) {
				attr(img, "alt", /*symbol*/ ctx[4]);
			}

			if (!current || dirty & /*token*/ 4 && a0_href_value !== (a0_href_value = `#/pools/${/*token*/ ctx[2]}`)) {
				attr(a0, "href", a0_href_value);
			}

			if (!current || dirty & /*symbol*/ 16) set_data(t1, /*symbol*/ ctx[4]);

			if (!current || dirty & /*token*/ 4 && a1_href_value !== (a1_href_value = `#/pools/${/*token*/ ctx[2]}`)) {
				attr(a1, "href", a1_href_value);
			}

			if (/*change24H*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(div0, t3);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*tokenPrice*/ ctx[9]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if ((!current || dirty & /*$_*/ 2048) && t5_value !== (t5_value = /*$_*/ ctx[11]("cep.redeem") + "")) set_data(t5, t5_value);

			if (!current || dirty & /*token*/ 4 && a2_href_value !== (a2_href_value = `#/pools/${/*token*/ ctx[2]}/withdraw/multi`)) {
				attr(a2, "href", a2_href_value);
			}

			if ((!current || dirty & /*$_*/ 2048) && t7_value !== (t7_value = /*$_*/ ctx[11]("cep.mint") + "")) set_data(t7, t7_value);

			if (!current || dirty & /*token*/ 4 && a3_href_value !== (a3_href_value = `#/pools/${/*token*/ ctx[2]}`)) {
				attr(a3, "href", a3_href_value);
			}

			if (dirty & /*$piesMarketDataStore, token*/ 260) show_if = get(/*$piesMarketDataStore*/ ctx[8], `${/*token*/ ctx[2].toLowerCase()}.market_data.market_cap`, "-") != "-";

			if (show_if) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					if_block2.m(div14, t9);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if ((!current || dirty & /*$_*/ 2048) && t10_value !== (t10_value = /*$_*/ ctx[11]("cep.swap.fee") + "")) set_data(t10, t10_value);
			if (!current || dirty & /*swapFees*/ 32) set_data(t12, /*swapFees*/ ctx[5]);
			if ((!current || dirty & /*$_*/ 2048) && t15_value !== (t15_value = /*$_*/ ctx[11]("cep.streaming.fee") + "")) set_data(t15, t15_value);
			if ((!current || dirty & /*$_*/ 2048) && t19_value !== (t19_value = /*$_*/ ctx[11]("cep.days.change") + "")) set_data(t19, t19_value);
			if ((!current || dirty & /*$piesMarketDataStore, token*/ 260) && t21_value !== (t21_value = get(/*$piesMarketDataStore*/ ctx[8], `${/*token*/ ctx[2]}.market_data.price_change_percentage_7d_in_currency`, "-") + "")) set_data(t21, t21_value);
			const tradingviewwidget_changes = {};
			if (dirty & /*options*/ 8) tradingviewwidget_changes.options = /*options*/ ctx[3];
			tradingviewwidget.$set(tradingviewwidget_changes);

			if (!current || dirty & /*token*/ 4 && div15_class_value !== (div15_class_value = "flex flex-row w-100pc mt-2 spl-chart-container md:mt-8 " + (poolsConfig[/*token*/ ctx[2]].mapDynamicTradingViewFormula
			? ""
			: "hidden"))) {
				attr(div15, "class", div15_class_value);
			}

			const farming_changes = {};
			if (dirty & /*$currentRoute*/ 4096) farming_changes.token = /*$currentRoute*/ ctx[12].params.address;
			farming.$set(farming_changes);
			const etherscan_changes = {};
			if (dirty & /*$currentRoute*/ 4096) etherscan_changes.token = /*$currentRoute*/ ctx[12].params.address;
			etherscan.$set(etherscan_changes);
			const quantstamp_changes = {};
			if (dirty & /*$currentRoute*/ 4096) quantstamp_changes.token = /*$currentRoute*/ ctx[12].params.address;
			quantstamp.$set(quantstamp_changes);
			if ((!current || dirty & /*$_*/ 2048) && t27_value !== (t27_value = /*$_*/ ctx[11]("cep.allocation.breakdown") + "")) set_data(t27, t27_value);

			if (/*pieOfPies*/ ctx[0]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block(ctx);
					if_block3.c();
					if_block3.m(div21, t29);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if ((!current || dirty & /*$_*/ 2048) && t30_value !== (t30_value = /*$_*/ ctx[11]("cep.asset.name") + "")) set_data(t30, t30_value);
			if ((!current || dirty & /*$_*/ 2048) && t32_value !== (t32_value = /*$_*/ ctx[11]("cep.price") + "")) set_data(t32, t32_value);
			if ((!current || dirty & /*$_*/ 2048) && t34_value !== (t34_value = /*$_*/ ctx[11]("cep.current.allocation") + "")) set_data(t34, t34_value);
			if ((!current || dirty & /*$_*/ 2048) && t36_value !== (t36_value = /*$_*/ ctx[11]("cep.marketCap") + "")) set_data(t36, t36_value);
			if ((!current || dirty & /*$_*/ 2048) && t38_value !== (t38_value = /*$_*/ ctx[11]("cep.volume") + "")) set_data(t38, t38_value);
			if ((!current || dirty & /*$_*/ 2048) && t40_value !== (t40_value = /*$_*/ ctx[11]("cep.change") + "")) set_data(t40, t40_value);

			if (dirty & /*composition, formatFiat, get, $piesMarketDataStore, amountFormatter, getTokenImage*/ 1280) {
				each_value = /*composition*/ ctx[10];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i(local) {
			if (current) return;
			transition_in(tradingviewwidget.$$.fragment, local);
			transition_in(farming.$$.fragment, local);
			transition_in(etherscan.$$.fragment, local);
			transition_in(quantstamp.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(tradingviewwidget.$$.fragment, local);
			transition_out(farming.$$.fragment, local);
			transition_out(etherscan.$$.fragment, local);
			transition_out(quantstamp.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div21);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			/*tradingviewwidget_binding*/ ctx[14](null);
			destroy_component(tradingviewwidget);
			destroy_component(farming);
			destroy_component(etherscan);
			destroy_component(quantstamp);
			if (if_block3) if_block3.d();
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $piesMarketDataStore;
	let $pools;
	let $balances;
	let $_;
	let $currentRoute;
	component_subscribe($$self, piesMarketDataStore, $$value => $$invalidate(8, $piesMarketDataStore = $$value));
	component_subscribe($$self, pools, $$value => $$invalidate(17, $pools = $$value));
	component_subscribe($$self, balances, $$value => $$invalidate(19, $balances = $$value));
	component_subscribe($$self, _, $$value => $$invalidate(11, $_ = $$value));
	component_subscribe($$self, currentRoute, $$value => $$invalidate(12, $currentRoute = $$value));
	let { params } = $$props;
	let pieOfPies = false;
	let tradingViewWidgetComponent;
	let initialized = false;

	function tradingviewwidget_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			tradingViewWidgetComponent = $$value;
			$$invalidate(1, tradingViewWidgetComponent);
		});
	}

	$$self.$$set = $$props => {
		if ("params" in $$props) $$invalidate(13, params = $$props.params);
	};

	let token;
	let options;
	let links;
	let symbol;
	let swapFees;
	let tokenLogo;
	let change24H;
	let tokenPrice;
	let composition;
	let pieTokens;

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*params*/ 8192) {
			$: $$invalidate(2, token = params.address);
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: console.log(token, poolsConfig);
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: $$invalidate(3, options = {
				symbol: poolsConfig[token]
				? poolsConfig[token].tradingViewFormula
				: "",
				container_id: `single-pie-chart-${token}`,
				theme: "light",
				autosize: true,
				interval: "60",
				locale: "en",
				style: 3,
				hide_top_toolbar: true,
				hide_legend: true,
				allow_symbol_change: false
			});
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: links = (poolsConfig[token] || {}).landingLinks || [];
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: $$invalidate(4, symbol = (poolsConfig[token] || {}).symbol);
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: $$invalidate(5, swapFees = (poolsConfig[token] || {}).swapFees);
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: $$invalidate(6, tokenLogo = images.logos[token]);
		}

		if ($$self.$$.dirty & /*$piesMarketDataStore, token*/ 260) {
			$: $$invalidate(7, change24H = get($piesMarketDataStore, `${token}.market_data.price_change_percentage_24h`, null));
		}

		if ($$self.$$.dirty & /*$piesMarketDataStore, token*/ 260) {
			$: $$invalidate(9, tokenPrice = get($piesMarketDataStore, `${token.toLowerCase()}.market_data.current_price`, null));
		}

		if ($$self.$$.dirty & /*token*/ 4) {
			$: (() => {
				$$invalidate(0, pieOfPies = false);
			})(token);
		}

		if ($$self.$$.dirty & /*$pools, token, pieOfPies*/ 131077) {
			$: $$invalidate(10, composition = flattenDeep($pools[token].map(component => {
				if (component.isPie) {
					if (!pieOfPies) $$invalidate(0, pieOfPies = []);
					pieOfPies.push(component);

					return $pools[component.address].map(internal => {
						return {
							...internal,
							percentage: (component.percentage / 100 * (internal.percentage / 100) * 100).toFixed(2)
						};
					});
				}

				return component;
			})));
		}

		if ($$self.$$.dirty & /*$balances*/ 524288) {
			$: pieTokens = fetchPieTokens($balances);
		}

		if ($$self.$$.dirty & /*initialized, token, $pools, $balances, tradingViewWidgetComponent, options*/ 688142) {
			$: (async () => {
				if (initialized) return;
				let mapDynamicTradingViewFormula = poolsConfig[token].mapDynamicTradingViewFormula;
				let formula = "";
				const poolContract = await contract({ address: token });
				const bPoolAddress = await poolContract.getBPool();
				let totalSupply = await poolContract.totalSupply();
				totalSupply = BigNumber(totalSupply.toString()).dividedBy(10 ** 18);

				$pools[token].map(component => {
					let key = `${component.address.toLowerCase()}.${bPoolAddress.toLowerCase()}`;
					const bal = $balances[key] || 0;

					if (bal !== 0) {
						formula += `${bal / totalSupply.toNumber()}*${mapDynamicTradingViewFormula[component.address]}+`;
					}
				});

				if (formula !== "") {
					const finalFormula = `${formula.slice(0, -1)}`;
					console.log(`formula`, finalFormula);
					$$invalidate(3, options.symbol = finalFormula, options);

					if (tradingViewWidgetComponent) {
						$$invalidate(15, initialized = true);
						tradingViewWidgetComponent.initWidget(options);
					}
				}
			})();
		}
	};

	return [
		pieOfPies,
		tradingViewWidgetComponent,
		token,
		options,
		symbol,
		swapFees,
		tokenLogo,
		change24H,
		$piesMarketDataStore,
		tokenPrice,
		composition,
		$_,
		$currentRoute,
		params,
		tradingviewwidget_binding
	];
}

class CepIndexLanding extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { params: 13 });
	}
}

export default CepIndexLanding;