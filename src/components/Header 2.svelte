<script>
  import { _ } from "svelte-i18n";

  import images from "../config/images.json";
  import links from "../config/links.json";

  import Language from "./Language.svelte";
  import Web3Button from "./Web3Button.svelte";

  let mobileMenuVisible = false;

  const toggleMobileMenu = () => {
    mobileMenuVisible = !mobileMenuVisible;
  };
</script>
<div class="header-container">
  <div class="left">
    <a href="#/">
      <img src={images.logos.piedao} alt={$_('general.logo')} />
    </a>
  </div>
  <div class="right">
    <a class="link" href="https://balancer.exchange/#/swap/ether/0xad32A8e6220741182940c5aBF610bDE99E737b2D" target="_blank">
      <button class="table-btn highlight-box">
        {$_('header.buydough')}
      </button>
    </a>
    <span class="link">🥧</span>
    <a class="link" href="#/stake">
      {$_('header.stake')}
    </a>
    <span class="link">🥧</span>

    <a class="link" href="#/dough" rel="noopener noreferrer">
      {$_('header.dough')}
    </a>

    <a class="link" href={links.vision} target="_blank" rel="noopener noreferrer">
      {$_('general.vision')}
    </a>

    <a class="link" href={links.dao} target="_blank" rel="noopener noreferrer">
      {$_('piedao.aragonLink')}
    </a>
    <a class="link" href={links.docs} target="_blank" rel="noopener noreferrer">
      {$_('general.docs')}
    </a>
    
    <Web3Button />
    <Language />
    <div class="mobile-placeholder" />

    <button class="hamburger" type="button" on:click={toggleMobileMenu}>
      <img src={images.icons.hamburger} alt="hamburger icon" class="w-min-20px" />
    </button>

    {#if mobileMenuVisible}
      <div class="overlay">
        <button type="button" class="close" on:click={toggleMobileMenu}>
          {$_('general.close')}
        </button>
        <nav>
          <ul>
            <li>
              <a href={links.root} on:click={toggleMobileMenu}>{$_('general.home')}</a>
            </li>
            <li>
              <a
                class="navbar-item"
                href={links.docs}
                on:click={toggleMobileMenu}
                rel="noopener noreferrer"
                target="_blank">
                {$_('general.docs')}
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/dough">
                {$_('header.dough')}
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/pie/0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c">
                DEFI+S
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/pie/0x9a48bd0ec040ea4f1d3147c025cd4076a2e71e3e">
                USD++
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/pie/0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd">
                BTC++
              </a>
            </li>
            <li>
              <a class="navbar-item" href="#/stake">
                {$_('header.stake')}
              </a>
            </li>
            <li>
              <a class="navbar-item" href={links.vision} target="_blank" rel="noopener noreferrer">
                {$_('general.vision')}
              </a>
            </li>
            <li>
              <a class="navbar-item" href={links.dao} target="_blank" rel="noopener noreferrer">
                {$_('piedao.aragonLink')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    {/if}
  </div>
</div>
