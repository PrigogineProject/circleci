/* src/components/Quantstamp.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../web_modules/svelte/internal.js";

import { _ } from "../../web_modules/svelte-i18n.js";
import images from "../config/images.json.proxy.js";
import links from "../config/links.json.proxy.js";
import pools from "../config/pools.json.proxy.js";

function create_fragment(ctx) {
	let div;
	let a;
	let span;
	let t0_value = /*$_*/ ctx[1]("piedao.audit.result") + "";
	let t0;
	let t1;
	let img;
	let img_src_value;
	let img_alt_value;
	let a_href_value;

	return {
		c() {
			div = element("div");
			a = element("a");
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			img = element("img");
			if (img.src !== (img_src_value = images.logos.quantstamp)) attr(img, "src", img_src_value);
			attr(img, "alt", img_alt_value = /*$_*/ ctx[1]("brands.quantstamp"));
			attr(a, "href", a_href_value = links.audit);
			attr(a, "alt", /*token*/ ctx[0]);
			attr(a, "target", "_blank");
			attr(div, "class", "quantstamp-container");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, a);
			append(a, span);
			append(span, t0);
			append(a, t1);
			append(a, img);
		},
		p(ctx, [dirty]) {
			if (dirty & /*$_*/ 2 && t0_value !== (t0_value = /*$_*/ ctx[1]("piedao.audit.result") + "")) set_data(t0, t0_value);

			if (dirty & /*$_*/ 2 && img_alt_value !== (img_alt_value = /*$_*/ ctx[1]("brands.quantstamp"))) {
				attr(img, "alt", img_alt_value);
			}

			if (dirty & /*token*/ 1) {
				attr(a, "alt", /*token*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_;
	component_subscribe($$self, _, $$value => $$invalidate(1, $_ = $$value));
	let { token } = $$props;

	$$self.$$set = $$props => {
		if ("token" in $$props) $$invalidate(0, token = $$props.token);
	};

	return [token, $_];
}

class Quantstamp extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { token: 0 });
	}
}

export default Quantstamp;