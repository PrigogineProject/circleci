import './Header.css.proxy.js';
/* src/components/Header.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	listen,
	mount_component,
	null_to_empty,
	run_all,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { _ } from "../../web_modules/svelte-i18n.js";
import images from "../config/images.json.proxy.js";
import links from "../config/links.json.proxy.js";
import Web3Button from "./Web3Button.js";
import Language from "./Language.js";
import { onMount } from "../../web_modules/svelte.js";

function create_if_block(ctx) {
	let div;
	let button;
	let t0_value = /*$_*/ ctx[2]("general.close") + "";
	let t0;
	let t1;
	let nav;
	let ul;
	let li0;
	let a0;
	let t2_value = /*$_*/ ctx[2]("general.home") + "";
	let t2;
	let a0_href_value;
	let t3;
	let li1;
	let a1;
	let t4_value = /*$_*/ ctx[2]("general.docs") + "";
	let t4;
	let a1_href_value;
	let t5;
	let li2;
	let t7;
	let li3;
	let t9;
	let li4;
	let t11;
	let li5;
	let t13;
	let li6;
	let t15;
	let li7;
	let a7;
	let t16_value = /*$_*/ ctx[2]("general.vision") + "";
	let t16;
	let a7_href_value;
	let t17;
	let li8;
	let a8;
	let t18_value = /*$_*/ ctx[2]("piedao.aragonLink") + "";
	let t18;
	let a8_href_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button = element("button");
			t0 = text(t0_value);
			t1 = space();
			nav = element("nav");
			ul = element("ul");
			li0 = element("li");
			a0 = element("a");
			t2 = text(t2_value);
			t3 = space();
			li1 = element("li");
			a1 = element("a");
			t4 = text(t4_value);
			t5 = space();
			li2 = element("li");
			li2.innerHTML = `<a class="navbar-item" href="#/ceptoken">\$CEPToken</a>`;
			t7 = space();
			li3 = element("li");
			li3.innerHTML = `<a class="navbar-item" href="#/pie/0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c">DEFI+S</a>`;
			t9 = space();
			li4 = element("li");
			li4.innerHTML = `<a class="navbar-item" href="#/pie/0x9a48bd0ec040ea4f1d3147c025cd4076a2e71e3e">USD++</a>`;
			t11 = space();
			li5 = element("li");
			li5.innerHTML = `<a class="navbar-item" href="#/pie/0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd">BTC++</a>`;
			t13 = space();
			li6 = element("li");
			li6.innerHTML = `<a class="navbar-item" href="#/stake">Stake</a>`;
			t15 = space();
			li7 = element("li");
			a7 = element("a");
			t16 = text(t16_value);
			t17 = space();
			li8 = element("li");
			a8 = element("a");
			t18 = text(t18_value);
			attr(button, "type", "button");
			attr(button, "class", "close svelte-9w0bg2");
			attr(a0, "href", a0_href_value = links.root);
			attr(a1, "class", "navbar-item");
			attr(a1, "href", a1_href_value = links.docs);
			attr(a1, "rel", "noopener noreferrer");
			attr(a1, "target", "_blank");
			attr(a7, "class", "navbar-item");
			attr(a7, "href", a7_href_value = links.vision);
			attr(a7, "target", "_blank");
			attr(a7, "rel", "noopener noreferrer");
			attr(a8, "class", "navbar-item");
			attr(a8, "href", a8_href_value = links.dao);
			attr(a8, "target", "_blank");
			attr(a8, "rel", "noopener noreferrer");
			attr(div, "class", "overlay");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button);
			append(button, t0);
			append(div, t1);
			append(div, nav);
			append(nav, ul);
			append(ul, li0);
			append(li0, a0);
			append(a0, t2);
			append(ul, t3);
			append(ul, li1);
			append(li1, a1);
			append(a1, t4);
			append(ul, t5);
			append(ul, li2);
			append(ul, t7);
			append(ul, li3);
			append(ul, t9);
			append(ul, li4);
			append(ul, t11);
			append(ul, li5);
			append(ul, t13);
			append(ul, li6);
			append(ul, t15);
			append(ul, li7);
			append(li7, a7);
			append(a7, t16);
			append(ul, t17);
			append(ul, li8);
			append(li8, a8);
			append(a8, t18);

			if (!mounted) {
				dispose = [
					listen(button, "click", /*toggleMobileMenu*/ ctx[3]),
					listen(a0, "click", /*toggleMobileMenu*/ ctx[3]),
					listen(a1, "click", /*toggleMobileMenu*/ ctx[3])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$_*/ 4 && t0_value !== (t0_value = /*$_*/ ctx[2]("general.close") + "")) set_data(t0, t0_value);
			if (dirty & /*$_*/ 4 && t2_value !== (t2_value = /*$_*/ ctx[2]("general.home") + "")) set_data(t2, t2_value);
			if (dirty & /*$_*/ 4 && t4_value !== (t4_value = /*$_*/ ctx[2]("general.docs") + "")) set_data(t4, t4_value);
			if (dirty & /*$_*/ 4 && t16_value !== (t16_value = /*$_*/ ctx[2]("general.vision") + "")) set_data(t16, t16_value);
			if (dirty & /*$_*/ 4 && t18_value !== (t18_value = /*$_*/ ctx[2]("piedao.aragonLink") + "")) set_data(t18, t18_value);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment(ctx) {
	let div3;
	let div0;
	let a0;
	let t1;
	let div2;
	let a1;
	let button0;
	let t2_value = /*$_*/ ctx[2]("header.buyceptoken") + "";
	let t2;
	let button0_class_value;
	let t3;
	let span0;
	let t5;
	let a2;
	let button1;
	let t6_value = /*$_*/ ctx[2]("general.stake") + "";
	let t6;
	let button1_class_value;
	let t7;
	let span1;
	let t9;
	let a3;
	let button2;
	let t10_value = /*$_*/ ctx[2]("header.ceptoken") + "";
	let t10;
	let button2_class_value;
	let t11;
	let a4;
	let button3;
	let t12_value = /*$_*/ ctx[2]("header.earlybird") + "";
	let t12;
	let button3_class_value;
	let t13;
	let a5;
	let t14_value = /*$_*/ ctx[2]("general.vision") + "";
	let t14;
	let a5_href_value;
	let t15;
	let a6;
	let t16_value = /*$_*/ ctx[2]("piedao.aragonLink") + "";
	let t16;
	let a6_href_value;
	let t17;
	let a7;
	let t18_value = /*$_*/ ctx[2]("general.docs") + "";
	let t18;
	let a7_href_value;
	let t19;
	let web3button;
	let t20;
	let language;
	let t21;
	let div1;
	let t22;
	let button4;
	let img;
	let img_src_value;
	let t23;
	let current;
	let mounted;
	let dispose;
	web3button = new Web3Button({});
	language = new Language({});
	let if_block = /*mobileMenuVisible*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			a0 = element("a");
			a0.textContent = "aabbcc";
			t1 = space();
			div2 = element("div");
			a1 = element("a");
			button0 = element("button");
			t2 = text(t2_value);
			t3 = space();
			span0 = element("span");
			span0.textContent = "🥧";
			t5 = space();
			a2 = element("a");
			button1 = element("button");
			t6 = text(t6_value);
			t7 = space();
			span1 = element("span");
			span1.textContent = "🥧";
			t9 = space();
			a3 = element("a");
			button2 = element("button");
			t10 = text(t10_value);
			t11 = space();
			a4 = element("a");
			button3 = element("button");
			t12 = text(t12_value);
			t13 = space();
			a5 = element("a");
			t14 = text(t14_value);
			t15 = space();
			a6 = element("a");
			t16 = text(t16_value);
			t17 = space();
			a7 = element("a");
			t18 = text(t18_value);
			t19 = space();
			create_component(web3button.$$.fragment);
			t20 = space();
			create_component(language.$$.fragment);
			t21 = space();
			div1 = element("div");
			t22 = space();
			button4 = element("button");
			img = element("img");
			t23 = space();
			if (if_block) if_block.c();
			attr(a0, "href", "#/");
			attr(div0, "class", "left");

			attr(button0, "class", button0_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] != "stake" && /*currentRoute*/ ctx[1] != "ceptoken" && /*currentRoute*/ ctx[1] != "earlybird"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"));

			attr(a1, "class", "link svelte-9w0bg2");
			attr(a1, "href", "https://balancer.exchange/#/swap/ether/0xad32A8e6220741182940c5aBF610bDE99E737b2D");
			attr(a1, "target", "_blank");
			attr(span0, "class", "link svelte-9w0bg2");

			attr(button1, "class", button1_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] == "stake"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"));

			attr(a2, "class", "link svelte-9w0bg2");
			attr(a2, "href", "#/stake");
			attr(span1, "class", "link svelte-9w0bg2");

			attr(button2, "class", button2_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] == "ceptoken"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"));

			attr(a3, "class", "link svelte-9w0bg2");
			attr(a3, "href", "#/ceptoken");
			attr(a3, "rel", "noopener noreferrer");

			attr(button3, "class", button3_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] == "earlybird"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"));

			attr(a4, "class", "link svelte-9w0bg2");
			attr(a4, "href", "#/earlybird");
			attr(a5, "class", "link svelte-9w0bg2");
			attr(a5, "href", a5_href_value = links.vision);
			attr(a5, "target", "_blank");
			attr(a5, "rel", "noopener noreferrer");
			attr(a6, "class", "link svelte-9w0bg2");
			attr(a6, "href", a6_href_value = links.dao);
			attr(a6, "target", "_blank");
			attr(a6, "rel", "noopener noreferrer");
			attr(a7, "class", "link svelte-9w0bg2");
			attr(a7, "href", a7_href_value = links.docs);
			attr(a7, "target", "_blank");
			attr(a7, "rel", "noopener noreferrer");
			attr(div1, "class", "mobile-placeholder");
			if (img.src !== (img_src_value = images.icons.hamburger)) attr(img, "src", img_src_value);
			attr(img, "alt", "hamburger icon");
			attr(img, "class", "w-min-20px svelte-9w0bg2");
			attr(button4, "class", "hamburger svelte-9w0bg2");
			attr(button4, "type", "button");
			attr(div2, "class", "right");
			attr(div3, "class", "header-container svelte-9w0bg2");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div0, a0);
			append(div3, t1);
			append(div3, div2);
			append(div2, a1);
			append(a1, button0);
			append(button0, t2);
			append(div2, t3);
			append(div2, span0);
			append(div2, t5);
			append(div2, a2);
			append(a2, button1);
			append(button1, t6);
			append(div2, t7);
			append(div2, span1);
			append(div2, t9);
			append(div2, a3);
			append(a3, button2);
			append(button2, t10);
			append(div2, t11);
			append(div2, a4);
			append(a4, button3);
			append(button3, t12);
			append(div2, t13);
			append(div2, a5);
			append(a5, t14);
			append(div2, t15);
			append(div2, a6);
			append(a6, t16);
			append(div2, t17);
			append(div2, a7);
			append(a7, t18);
			append(div2, t19);
			mount_component(web3button, div2, null);
			append(div2, t20);
			mount_component(language, div2, null);
			append(div2, t21);
			append(div2, div1);
			append(div2, t22);
			append(div2, button4);
			append(button4, img);
			append(div2, t23);
			if (if_block) if_block.m(div2, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(a0, "click", /*deriveRoute*/ ctx[4]),
					listen(button4, "click", /*toggleMobileMenu*/ ctx[3])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*$_*/ 4) && t2_value !== (t2_value = /*$_*/ ctx[2]("header.buyceptoken") + "")) set_data(t2, t2_value);

			if (!current || dirty & /*currentRoute*/ 2 && button0_class_value !== (button0_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] != "stake" && /*currentRoute*/ ctx[1] != "ceptoken" && /*currentRoute*/ ctx[1] != "earlybird"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"))) {
				attr(button0, "class", button0_class_value);
			}

			if ((!current || dirty & /*$_*/ 4) && t6_value !== (t6_value = /*$_*/ ctx[2]("general.stake") + "")) set_data(t6, t6_value);

			if (!current || dirty & /*currentRoute*/ 2 && button1_class_value !== (button1_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] == "stake"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"))) {
				attr(button1, "class", button1_class_value);
			}

			if ((!current || dirty & /*$_*/ 4) && t10_value !== (t10_value = /*$_*/ ctx[2]("header.ceptoken") + "")) set_data(t10, t10_value);

			if (!current || dirty & /*currentRoute*/ 2 && button2_class_value !== (button2_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] == "ceptoken"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"))) {
				attr(button2, "class", button2_class_value);
			}

			if ((!current || dirty & /*$_*/ 4) && t12_value !== (t12_value = /*$_*/ ctx[2]("header.earlybird") + "")) set_data(t12, t12_value);

			if (!current || dirty & /*currentRoute*/ 2 && button3_class_value !== (button3_class_value = "" + (null_to_empty(/*currentRoute*/ ctx[1] == "earlybird"
			? "table-btn highlight-box"
			: "") + " svelte-9w0bg2"))) {
				attr(button3, "class", button3_class_value);
			}

			if ((!current || dirty & /*$_*/ 4) && t14_value !== (t14_value = /*$_*/ ctx[2]("general.vision") + "")) set_data(t14, t14_value);
			if ((!current || dirty & /*$_*/ 4) && t16_value !== (t16_value = /*$_*/ ctx[2]("piedao.aragonLink") + "")) set_data(t16, t16_value);
			if ((!current || dirty & /*$_*/ 4) && t18_value !== (t18_value = /*$_*/ ctx[2]("general.docs") + "")) set_data(t18, t18_value);

			if (/*mobileMenuVisible*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div2, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(web3button.$$.fragment, local);
			transition_in(language.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(web3button.$$.fragment, local);
			transition_out(language.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			destroy_component(web3button);
			destroy_component(language);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

let logo = "images/logo.png";

function instance($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, $$value => $$invalidate(2, $_ = $$value));
	let mobileMenuVisible = false;

	const toggleMobileMenu = () => {
		$$invalidate(0, mobileMenuVisible = !mobileMenuVisible);
	};

	let currentRoute = "";

	const deriveRoute = () => {
		try {
			const core = window.location.href.split("#")[1];

			if (!core) {
				return [];
			}

			const parts = core.split("/").filter(part => part && part.length > 0);
			return parts;
		} catch(e) {
			return [];
		}
	};

	onMount(() => {
		const newRoute = deriveRoute();
		$$invalidate(1, currentRoute = newRoute[0]);
	});

	window.addEventListener("hashchange", () => {
		const newRoute = deriveRoute();
		$$invalidate(1, currentRoute = newRoute[0]);
	});

	return [mobileMenuVisible, currentRoute, $_, toggleMobileMenu, deriveRoute];
}

class Header extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Header;