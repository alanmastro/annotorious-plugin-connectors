var lt = Object.defineProperty;
var ft = (e, t, n) => t in e ? lt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ce = (e, t, n) => ft(e, typeof t != "symbol" ? t + "" : t, n);
import { W3CImageFormat as ut, ShapeType as re, getSVGPoint as dt, isImageAnnotation as gt } from "@annotorious/annotorious";
import { UserSelectAction as we } from "@annotorious/openseadragon";
import Ge from "openseadragon";
const qe = (e) => e.motivation !== void 0 && e.motivation === "linking" && e.body !== void 0 && e.target !== void 0 && typeof e.body == "string" && typeof e.target == "string", xe = (e) => (e.motivation === void 0 || e.motivation === "tagging") && typeof e.target == "string", pt = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
function ht(e) {
  return typeof e == "string" && pt.test(e);
}
function Ee(e) {
  if (!ht(e))
    throw TypeError("Invalid UUID");
  let t;
  return Uint8Array.of((t = parseInt(e.slice(0, 8), 16)) >>> 24, t >>> 16 & 255, t >>> 8 & 255, t & 255, (t = parseInt(e.slice(9, 13), 16)) >>> 8, t & 255, (t = parseInt(e.slice(14, 18), 16)) >>> 8, t & 255, (t = parseInt(e.slice(19, 23), 16)) >>> 8, t & 255, (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, t / 4294967296 & 255, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, t & 255);
}
const C = [];
for (let e = 0; e < 256; ++e)
  C.push((e + 256).toString(16).slice(1));
function Qe(e, t = 0) {
  return (C[e[t + 0]] + C[e[t + 1]] + C[e[t + 2]] + C[e[t + 3]] + "-" + C[e[t + 4]] + C[e[t + 5]] + "-" + C[e[t + 6]] + C[e[t + 7]] + "-" + C[e[t + 8]] + C[e[t + 9]] + "-" + C[e[t + 10]] + C[e[t + 11]] + C[e[t + 12]] + C[e[t + 13]] + C[e[t + 14]] + C[e[t + 15]]).toLowerCase();
}
let le;
const mt = new Uint8Array(16);
function yt() {
  if (!le) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    le = crypto.getRandomValues.bind(crypto);
  }
  return le(mt);
}
function _t(e) {
  e = unescape(encodeURIComponent(e));
  const t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; ++n)
    t[n] = e.charCodeAt(n);
  return t;
}
const bt = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", vt = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function kt(e, t, n, o, r, s) {
  const c = typeof n == "string" ? _t(n) : n, i = typeof o == "string" ? Ee(o) : o;
  if (typeof o == "string" && (o = Ee(o)), (o == null ? void 0 : o.length) !== 16)
    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
  let a = new Uint8Array(16 + c.length);
  if (a.set(i), a.set(c, i.length), a = t(a), a[6] = a[6] & 15 | e, a[8] = a[8] & 63 | 128, r) {
    s = s || 0;
    for (let l = 0; l < 16; ++l)
      r[s + l] = a[l];
    return r;
  }
  return Qe(a);
}
const wt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Se = { randomUUID: wt };
function xt(e, t, n) {
  var r;
  if (Se.randomUUID && !e)
    return Se.randomUUID();
  e = e || {};
  const o = e.random ?? ((r = e.rng) == null ? void 0 : r.call(e)) ?? yt();
  if (o.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, Qe(o);
}
function Et(e, t, n, o) {
  switch (e) {
    case 0:
      return t & n ^ ~t & o;
    case 1:
      return t ^ n ^ o;
    case 2:
      return t & n ^ t & o ^ n & o;
    case 3:
      return t ^ n ^ o;
  }
}
function fe(e, t) {
  return e << t | e >>> 32 - t;
}
function St(e) {
  const t = [1518500249, 1859775393, 2400959708, 3395469782], n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], o = new Uint8Array(e.length + 1);
  o.set(e), o[e.length] = 128, e = o;
  const r = e.length / 4 + 2, s = Math.ceil(r / 16), c = new Array(s);
  for (let i = 0; i < s; ++i) {
    const a = new Uint32Array(16);
    for (let l = 0; l < 16; ++l)
      a[l] = e[i * 64 + l * 4] << 24 | e[i * 64 + l * 4 + 1] << 16 | e[i * 64 + l * 4 + 2] << 8 | e[i * 64 + l * 4 + 3];
    c[i] = a;
  }
  c[s - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), c[s - 1][14] = Math.floor(c[s - 1][14]), c[s - 1][15] = (e.length - 1) * 8 & 4294967295;
  for (let i = 0; i < s; ++i) {
    const a = new Uint32Array(80);
    for (let p = 0; p < 16; ++p)
      a[p] = c[i][p];
    for (let p = 16; p < 80; ++p)
      a[p] = fe(a[p - 3] ^ a[p - 8] ^ a[p - 14] ^ a[p - 16], 1);
    let l = n[0], d = n[1], g = n[2], u = n[3], _ = n[4];
    for (let p = 0; p < 80; ++p) {
      const x = Math.floor(p / 20), m = fe(l, 5) + Et(x, d, g, u) + _ + t[x] + a[p] >>> 0;
      _ = u, u = g, g = fe(d, 30) >>> 0, d = l, l = m;
    }
    n[0] = n[0] + l >>> 0, n[1] = n[1] + d >>> 0, n[2] = n[2] + g >>> 0, n[3] = n[3] + u >>> 0, n[4] = n[4] + _ >>> 0;
  }
  return Uint8Array.of(n[0] >> 24, n[0] >> 16, n[0] >> 8, n[0], n[1] >> 24, n[1] >> 16, n[1] >> 8, n[1], n[2] >> 24, n[2] >> 16, n[2] >> 8, n[2], n[3] >> 24, n[3] >> 16, n[3] >> 8, n[3], n[4] >> 24, n[4] >> 16, n[4] >> 8, n[4]);
}
function be(e, t, n, o) {
  return kt(80, St, e, t, n, o);
}
be.DNS = bt;
be.URL = vt;
const J = (e) => e.motivation !== void 0 && e.motivation === "linking", Vn = (e, t = { strict: !0, invertY: !1 }) => {
  const n = ut(e, { ...t, strict: !1 }), o = (c) => Mt(c, n);
  return { parse: o, parseAll: (c) => {
    const i = c.filter((d) => xe(d)), a = c.filter((d) => !xe(d)), l = (d) => {
      const g = i.find((u) => u.target === d.id);
      return g ? [d, g] : d;
    };
    return a.reduce((d, g) => {
      const { parsed: u, error: _ } = qe(g) ? o(l(g)) : o(g);
      return _ ? {
        parsed: d.parsed,
        failed: [...d.failed, g]
      } : u ? {
        parsed: [...d.parsed, u],
        failed: d.failed
      } : {
        ...d
      };
    }, { parsed: [], failed: [] });
  }, serialize: (c) => At(c, n) };
}, Mt = (e, t) => {
  const n = (o, r) => {
    const { id: s, body: c, target: i } = o;
    return {
      id: s,
      motivation: "linking",
      bodies: r ? Array.isArray(r.body) ? r.body : [r.body] : [],
      target: {
        annotation: s,
        selector: {
          from: i,
          to: c
        }
      }
    };
  };
  if (Array.isArray(e)) {
    const [o, r] = e;
    return { parsed: n(o, r) };
  } else return qe(e) ? { parsed: n(e) } : t.parse(e);
}, At = (e, t) => {
  if (J(e)) {
    const { id: n, bodies: o, target: { selector: { from: r, to: s } } } = e, c = {
      id: n,
      motivation: "linking",
      body: s,
      target: r
    };
    if (o.length > 0) {
      const i = {
        id: be("@annotorious/plugin-connectors", n),
        motivation: "tagging",
        body: o.map((a) => ({
          purpose: a.purpose,
          value: a.value
        })),
        target: n
      };
      return [c, i];
    } else
      return c;
  } else
    return t.serialize(e);
};
function U() {
}
function Lt(e, t) {
  for (const n in t) e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function Ke(e) {
  return e();
}
function Me() {
  return /* @__PURE__ */ Object.create(null);
}
function q(e) {
  e.forEach(Ke);
}
function Je(e) {
  return typeof e == "function";
}
function O(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function Ct(e) {
  return Object.keys(e).length === 0;
}
function Nt(e, ...t) {
  if (e == null) {
    for (const o of t)
      o(void 0);
    return U;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Tt(e, t, n) {
  e.$$.on_destroy.push(Nt(t, n));
}
function Ut(e, t, n, o) {
  if (e) {
    const r = $e(e, t, n, o);
    return e[0](r);
  }
}
function $e(e, t, n, o) {
  return e[1] && o ? Lt(n.ctx.slice(), e[1](o(t))) : n.ctx;
}
function Pt(e, t, n, o) {
  if (e[2] && o) {
    const r = e[2](o(n));
    if (t.dirty === void 0)
      return r;
    if (typeof r == "object") {
      const s = [], c = Math.max(t.dirty.length, r.length);
      for (let i = 0; i < c; i += 1)
        s[i] = t.dirty[i] | r[i];
      return s;
    }
    return t.dirty | r;
  }
  return t.dirty;
}
function Wt(e, t, n, o, r, s) {
  if (r) {
    const c = $e(t, n, o, s);
    e.p(c, r);
  }
}
function Ft(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let o = 0; o < n; o++)
      t[o] = -1;
    return t;
  }
  return -1;
}
function j(e, t) {
  e.appendChild(t);
}
function L(e, t, n) {
  e.insertBefore(t, n || null);
}
function A(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function It(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function S(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function Ot(e) {
  return document.createTextNode(e);
}
function ie() {
  return Ot("");
}
function pe(e, t, n, o) {
  return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
}
function f(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function Rt(e) {
  return Array.from(e.childNodes);
}
function X(e, t, n) {
  e.classList.toggle(t, !!n);
}
function Dt(e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: n, cancelable: o });
}
let $;
function K(e) {
  $ = e;
}
function et() {
  if (!$) throw new Error("Function called outside component initialization");
  return $;
}
function ve(e) {
  et().$$.on_mount.push(e);
}
function jt() {
  const e = et();
  return (t, n, { cancelable: o = !1 } = {}) => {
    const r = e.$$.callbacks[t];
    if (r) {
      const s = Dt(
        /** @type {string} */
        t,
        n,
        { cancelable: o }
      );
      return r.slice().forEach((c) => {
        c.call(e, s);
      }), !s.defaultPrevented;
    }
    return !0;
  };
}
function Ht(e, t) {
  const n = e.$$.callbacks[t.type];
  n && n.slice().forEach((o) => o.call(this, t));
}
const z = [], G = [];
let B = [];
const Ae = [], Vt = /* @__PURE__ */ Promise.resolve();
let he = !1;
function Yt() {
  he || (he = !0, Vt.then(tt));
}
function me(e) {
  B.push(e);
}
const ue = /* @__PURE__ */ new Set();
let Z = 0;
function tt() {
  if (Z !== 0)
    return;
  const e = $;
  do {
    try {
      for (; Z < z.length; ) {
        const t = z[Z];
        Z++, K(t), Zt(t.$$);
      }
    } catch (t) {
      throw z.length = 0, Z = 0, t;
    }
    for (K(null), z.length = 0, Z = 0; G.length; ) G.pop()();
    for (let t = 0; t < B.length; t += 1) {
      const n = B[t];
      ue.has(n) || (ue.add(n), n());
    }
    B.length = 0;
  } while (z.length);
  for (; Ae.length; )
    Ae.pop()();
  he = !1, ue.clear(), K(e);
}
function Zt(e) {
  if (e.fragment !== null) {
    e.update(), q(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(me);
  }
}
function zt(e) {
  const t = [], n = [];
  B.forEach((o) => e.indexOf(o) === -1 ? t.push(o) : n.push(o)), n.forEach((o) => o()), B = t;
}
const se = /* @__PURE__ */ new Set();
let H;
function V() {
  H = {
    r: 0,
    c: [],
    p: H
    // parent group
  };
}
function Y() {
  H.r || q(H.c), H = H.p;
}
function w(e, t) {
  e && e.i && (se.delete(e), e.i(t));
}
function M(e, t, n, o) {
  if (e && e.o) {
    if (se.has(e)) return;
    se.add(e), H.c.push(() => {
      se.delete(e), o && (n && e.d(1), o());
    }), e.o(t);
  } else o && o();
}
function Le(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function F(e) {
  e && e.c();
}
function P(e, t, n) {
  const { fragment: o, after_update: r } = e.$$;
  o && o.m(t, n), me(() => {
    const s = e.$$.on_mount.map(Ke).filter(Je);
    e.$$.on_destroy ? e.$$.on_destroy.push(...s) : q(s), e.$$.on_mount = [];
  }), r.forEach(me);
}
function W(e, t) {
  const n = e.$$;
  n.fragment !== null && (zt(n.after_update), q(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Xt(e, t) {
  e.$$.dirty[0] === -1 && (z.push(e), Yt(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function R(e, t, n, o, r, s, c = null, i = [-1]) {
  const a = $;
  K(e);
  const l = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: s,
    update: U,
    not_equal: r,
    bound: Me(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: Me(),
    dirty: i,
    skip_bound: !1,
    root: t.target || a.$$.root
  };
  c && c(l.root);
  let d = !1;
  if (l.ctx = n ? n(e, t.props || {}, (g, u, ..._) => {
    const p = _.length ? _[0] : u;
    return l.ctx && r(l.ctx[g], l.ctx[g] = p) && (!l.skip_bound && l.bound[g] && l.bound[g](p), d && Xt(e, g)), u;
  }) : [], l.update(), d = !0, q(l.before_update), l.fragment = o ? o(l.ctx) : !1, t.target) {
    if (t.hydrate) {
      const g = Rt(t.target);
      l.fragment && l.fragment.l(g), g.forEach(A);
    } else
      l.fragment && l.fragment.c();
    t.intro && w(e.$$.fragment), P(e, t.target, t.anchor), tt();
  }
  K(a);
}
class D {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    ce(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    ce(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    W(this, 1), this.$destroy = U;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!Je(n))
      return U;
    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return o.push(n), () => {
      const r = o.indexOf(n);
      r !== -1 && o.splice(r, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !Ct(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const Bt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Bt);
function nt(e, t, n) {
  const o = t - 1, r = n[rt(o, n.length)];
  return r.marker !== "Z" ? r : nt(e, o, n);
}
function ot(e, t, n) {
  const o = t + 1, r = n[rt(o, n.length)];
  return r.marker === "Z" ? ot(e, o, n) : r;
}
function Gt(e, t, n) {
  let o = n[t - 1] || { values: { x: 0, y: 0 } };
  if (e.marker === e.marker.toLowerCase())
    switch (e.marker = e.marker.toUpperCase(), e.marker) {
      case "M":
        e.values.x += o.values.x, e.values.y += o.values.y;
        break;
      case "L":
      case "A":
        e.values.x += o.values.x, e.values.y += o.values.y;
        break;
      case "H":
        e.marker = "L", e.values.x += o.values.x, e.values.y = o.values.y;
        break;
      case "V":
        e.marker = "L", e.values.x = o.values.x, e.values.y += o.values.y;
        break;
      case "C":
        e.values.x += o.values.x, e.values.y += o.values.y, e.values.x1 += o.values.x, e.values.y1 += o.values.y, e.values.x2 += o.values.x, e.values.y2 += o.values.y;
        break;
      case "S":
        e.values.x += o.values.x, e.values.y += o.values.y, e.values.x2 += o.values.x, e.values.y2 += o.values.y;
        break;
      case "Q":
        e.values.x += o.values.x, e.values.y += o.values.y, e.values.x1 += o.values.x, e.values.y1 += o.values.y;
        break;
      case "T":
        e.values.x += o.values.x, e.values.y += o.values.y;
        break;
    }
  else if (e.marker === e.marker.toUpperCase())
    switch (e.marker) {
      case "H":
        e.marker = "L", e.values.y = o.values.y;
        break;
      case "V":
        e.marker = "L", e.values.x = o.values.x;
        break;
    }
  if (e.marker === "Z") {
    let r = function(c, i) {
      return c[i].marker === "M" ? c[i] : r(c, i - 1);
    }, s = r(n, t);
    e.values.x = s.values.x, e.values.y = s.values.y;
  }
  return e;
}
function qt(e, t) {
  const n = [];
  switch (e.toUpperCase()) {
    case "M":
      for (let o = 0; o < t.length; o += 2) {
        let r;
        e === e.toUpperCase() ? r = o === 0 ? "M" : "L" : r = o === 0 ? "m" : "l", n.push({
          marker: r,
          values: {
            x: t[o],
            y: t[o + 1]
          }
        });
      }
      break;
    case "L":
      for (let o = 0; o < t.length; o += 2)
        n.push({
          marker: e,
          values: {
            x: t[o],
            y: t[o + 1]
          }
        });
      break;
    case "H":
      for (let o = 0; o < t.length; o++)
        n.push({
          marker: e,
          values: {
            x: t[o],
            y: 0
          }
        });
      break;
    case "V":
      for (let o = 0; o < t.length; o++)
        n.push({
          marker: e,
          values: {
            x: 0,
            y: t[o]
          }
        });
      break;
    case "C":
      for (let o = 0; o < t.length; o += 6)
        n.push({
          marker: e,
          values: {
            x1: t[o],
            y1: t[o + 1],
            x2: t[o + 2],
            y2: t[o + 3],
            x: t[o + 4],
            y: t[o + 5]
          }
        });
      break;
    case "S":
      for (let o = 0; o < t.length; o += 4)
        n.push({
          marker: e,
          values: {
            x2: t[o],
            y2: t[o + 1],
            x: t[o + 2],
            y: t[o + 3]
          }
        });
      break;
    case "Q":
      for (let o = 0; o < t.length; o += 4)
        n.push({
          marker: e,
          values: {
            x1: t[o],
            y1: t[o + 1],
            x: t[o + 2],
            y: t[o + 3]
          }
        });
      break;
    case "T":
      for (let o = 0; o < t.length; o += 2)
        n.push({
          marker: e,
          values: {
            x: t[o],
            y: t[o + 1]
          }
        });
      break;
    case "A":
      for (let o = 0; o < t.length; o += 7)
        n.push({
          marker: e,
          values: {
            radiusX: t[o],
            radiusY: t[o + 1],
            rotation: t[o + 2],
            largeArc: t[o + 3],
            sweep: t[o + 4],
            x: t[o + 5],
            y: t[o + 6]
          }
        });
      break;
    case "Z":
      n.push({
        marker: e,
        values: {
          // values will be overriden later by convertToAbsolute()
          x: 0,
          y: 0
        }
      });
      break;
  }
  return n;
}
function rt(e, t) {
  return (e % t + t) % t;
}
function Qt(e, t, n) {
  if (t !== 0 && e.marker === "L") {
    let o = n[t - 1];
    ["x", "y"].every((s) => Math.round(Math.abs(o.values[s] - e.values[s])) === 0) && (e.overlap = !0);
  }
  return e;
}
function ye(e, t) {
  const n = ["x", "y"].every((o) => Math.round(Math.abs(e[t].values[o] - e[0].values[o])) === 0);
  e[t].marker === "L" && n && (e[t].overlap = !0, ye(e, t - 1)), e[t].marker === "Z" && ye(e, t - 1);
}
function Kt(e, t, n) {
  const o = Ne(e.values, n.values), r = Ne(t.values, e.values);
  return Math.min(r, o);
}
function Ce(e, t) {
  return Math.atan2(t.x - e.x, t.y - e.y);
}
function Ne(e, t) {
  const n = e.x - t.x, o = e.y - t.y;
  return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));
}
function Te(e, t) {
  return Math.sin(e) * t;
}
function Ue(e, t) {
  return Math.cos(e) * t;
}
function Pe(e, t) {
  const n = t / Math.tan(e);
  return n === 1 / 0 || n === -1 / 0 || isNaN(n) ? t : n;
}
function Jt(e, t) {
  return t * Math.tan(e);
}
function $t(e, t) {
  let n, o = 0, r = e * (180 / Math.PI);
  return r < 0 && r >= -180 || r > 180 && r < 360 ? n = Pe(e / 2, -t) : (n = Pe(e / 2, t), o = 1, n === 1 / 0 && (n = t)), {
    offset: n,
    sweepFlag: o
  };
}
function en(e) {
  const t = [
    "radiusX",
    "radiusY",
    "rotation",
    "largeArc",
    "sweep",
    "x1",
    "y1",
    "x2",
    "y2",
    "x",
    "y"
  ];
  return e.map((n) => {
    let o = "";
    if (n.marker !== "Z") {
      const r = Object.keys(n.values);
      o = t.filter((s) => r.indexOf(s) !== -1).map((s) => n.values[s]).join();
    }
    return `${n.marker}${o}`;
  }).join("").trim();
}
function tn(e) {
  const t = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g, n = /-?[0-9]*\.?\d+/g;
  return [...e.matchAll(t)].map((o) => ({ marker: o[0], index: o.index })).reduceRight((o, r) => {
    const s = e.substring(
      r.index,
      o.length ? o[o.length - 1].index : e.length
    );
    return o.concat([
      {
        marker: r.marker,
        index: r.index,
        chunk: s.length > 0 ? s.substr(1, s.length - 1) : s
      }
    ]);
  }, []).reverse().flatMap((o) => {
    const r = o.chunk.match(n), s = r ? r.map(parseFloat) : [];
    return qt(o.marker, s);
  }).map(Gt);
}
function nn(e, t, n) {
  let o = [], r = [];
  return e.forEach((s) => {
    s.marker === "M" && o.push([]), o[o.length - 1].push(s);
  }), o.forEach((s) => {
    s.map(Qt), ye(s, s.length - 1);
    const c = s[s.length - 1].marker == "Z";
    s.filter((i) => !i.overlap).map((i, a, l) => {
      const g = nt(i, a, l), u = ot(i, a, l), _ = Ce(i.values, g.values), p = Ce(i.values, u.values), x = p - _, m = x * (180 / Math.PI), y = Kt(i, g, u), h = Math.abs(Jt(x / 2, y / 2)), v = Math.min(t, h), N = $t(x, v), k = N.offset, E = N.sweepFlag, ee = (a == 0 || a == l.length - 1) && !c;
      switch (i.marker) {
        case "M":
        case "L":
          const te = [
            i.values.x + Te(_, k),
            i.values.y + Ue(_, k)
          ], ne = [
            i.values.x + Te(p, k),
            i.values.y + Ue(p, k)
          ];
          ee ? r.push({
            marker: i.marker,
            values: i.values
          }) : r.push({
            marker: i.marker,
            values: {
              x: parseFloat(te[0].toFixed(3)),
              y: parseFloat(te[1].toFixed(3))
            }
          }), !ee && (u.marker === "L" || u.marker === "M") && r.push({
            marker: "A",
            radius: v,
            values: {
              radiusX: parseFloat(v.toFixed(3)),
              radiusY: parseFloat(v.toFixed(3)),
              rotation: m,
              largeArc: 0,
              sweep: E,
              x: parseFloat(ne[0].toFixed(3)),
              y: parseFloat(ne[1].toFixed(3))
            }
          });
          break;
        case "C":
        case "S":
        case "Q":
        case "T":
        case "A":
        case "Z":
          r.push({ marker: i.marker, values: i.values });
          break;
      }
    });
  }), {
    path: en(r),
    commands: r
  };
}
function on(e, t, n) {
  return nn([...tn(e)], t);
}
const rn = (e) => e.point !== void 0 && typeof e.point.x == "number" && typeof e.point.y == "number", de = (e) => e === "E" ? "W" : e === "W" ? "E" : e === "S" ? "N" : "S", We = (e) => {
  if (e.target.selector.type === re.POLYGON) {
    const { minX: t, minY: n, maxX: o, maxY: r } = e.target.selector.geometry.bounds, s = o - t, c = r - n, { points: i } = e.target.selector.geometry, a = (l) => {
      const d = (u) => {
        const _ = l.x - u[0], p = l.y - u[1];
        return _ * _ + p * p;
      }, g = [...i].sort((u, _) => d(u) - d(_));
      return { x: g[0][0], y: g[0][1] };
    };
    return [
      { point: a({ x: t + s / 2, y: r }), annotation: e, direction: "N" },
      // top
      { point: a({ x: o, y: n + c / 2 }), annotation: e, direction: "E" },
      // right
      { point: a({ x: t + s / 2, y: n }), annotation: e, direction: "S" },
      // bottom
      { point: a({ x: t, y: n + c / 2 }), annotation: e, direction: "W" }
      // left
    ];
  } else {
    const { minX: t, minY: n, maxX: o, maxY: r } = e.target.selector.geometry.bounds, s = o - t, c = r - n;
    return [
      { point: { x: t + s / 2, y: r }, annotation: e, direction: "N" },
      // top
      { point: { x: o, y: n + c / 2 }, annotation: e, direction: "E" },
      // right
      { point: { x: t + s / 2, y: n }, annotation: e, direction: "S" },
      // bottom
      { point: { x: t, y: n + c / 2 }, annotation: e, direction: "W" }
      // left
    ];
  }
}, sn = (e, t) => {
  const n = t.point.x - e.point.x, o = t.point.y - e.point.y, r = e.direction, s = "direction" in t ? de(t.direction) : void 0;
  return [
    { dx: (a) => a < 0, dy: (a) => a > 0, layouts: ["W-N", "N-W", "W-N-W", "N-W-N"] },
    { dx: (a) => a < 0, dy: (a) => a === 0, layouts: ["W"] },
    { dx: (a) => a < 0, dy: (a) => a < 0, layouts: ["W-S", "S-W", "W-S-W", "S-W-S"] },
    { dx: (a) => a === 0, dy: (a) => a > 0, layouts: ["N"] },
    { dx: (a) => a === 0, dy: (a) => a < 0, layouts: ["S"] },
    { dx: (a) => a > 0, dy: (a) => a > 0, layouts: ["E-N", "N-E", "E-N-E", "N-E-N"] },
    { dx: (a) => a > 0, dy: (a) => a === 0, layouts: ["E"] },
    { dx: (a) => a > 0, dy: (a) => a < 0, layouts: ["E-S", "S-E", "E-S-E", "S-E-S"] }
  ].filter((a) => a.dx(n) && a.dy(o)).reduce((a, l) => {
    const d = l.layouts.filter((g) => g.startsWith(r) && (!s || g.endsWith(s)) || // A half-sensible workaround to support intersecting shapes
    g.startsWith(de(r)) && (!s || g.endsWith(de(s))));
    return [...a, ...d];
  }, []);
}, an = (e, t) => {
  const n = We(e), o = rn(t) ? [t] : We(t), r = [];
  return n.forEach((s) => {
    o.forEach((c) => {
      const i = sn(s, c);
      r.push(...i.map((a) => ({ start: s, layout: a, end: c })));
    });
  }), r;
}, _e = (e, t) => {
  const n = an(e, t);
  return n.sort((o, r) => {
    const s = Ie(o), c = Ie(r);
    return s !== c ? s - c : Fe(o) - Fe(r);
  }), n[0];
}, Fe = (e) => e.layout.split("-").length - 1, Ie = (e) => {
  const t = e.end.point.x - e.start.point.x, n = e.end.point.y - e.start.point.y;
  return Math.abs(t) + Math.abs(n);
}, st = (e, t) => {
  const n = e.layout.split("-"), o = n.length === 3, r = e.end.point.x - e.start.point.x, s = e.end.point.y - e.start.point.y, c = n.reduce((a, l, d) => {
    let g;
    switch (l) {
      case "N":
      case "S":
        return g = !o || d === 1 ? s : s / 2, `${a} v ${g}`;
      case "E":
      case "W":
        return g = !o || d === 1 ? r : r / 2, `${a} h ${g}`;
    }
  }, `M ${e.start.point.x} ${e.start.point.y}`), i = t !== void 0 && t > 0 ? on(c, t).path : c;
  return { start: e.start.point, end: e.end.point, d: i };
};
function cn(e) {
  let t, n, o;
  return {
    c() {
      t = S("g"), n = S("ellipse"), f(
        n,
        "cx",
        /*cx*/
        e[4]
      ), f(
        n,
        "cy",
        /*cy*/
        e[3]
      ), f(
        n,
        "rx",
        /*rx*/
        e[2]
      ), f(
        n,
        "ry",
        /*ry*/
        e[1]
      ), f(t, "class", "a9s-annotation-emphasis"), f(t, "data-id", o = /*annotation*/
      e[0].id);
    },
    m(r, s) {
      L(r, t, s), j(t, n);
    },
    p(r, [s]) {
      s & /*cx*/
      16 && f(
        n,
        "cx",
        /*cx*/
        r[4]
      ), s & /*cy*/
      8 && f(
        n,
        "cy",
        /*cy*/
        r[3]
      ), s & /*rx*/
      4 && f(
        n,
        "rx",
        /*rx*/
        r[2]
      ), s & /*ry*/
      2 && f(
        n,
        "ry",
        /*ry*/
        r[1]
      ), s & /*annotation*/
      1 && o !== (o = /*annotation*/
      r[0].id) && f(t, "data-id", o);
    },
    i: U,
    o: U,
    d(r) {
      r && A(t);
    }
  };
}
function ln(e, t, n) {
  let o, r, s, c, { annotation: i } = t;
  return e.$$set = (a) => {
    "annotation" in a && n(0, i = a.annotation);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation*/
    1 && n(4, { cx: o, cy: r, rx: s, ry: c } = i.target.selector.geometry, o, (n(3, r), n(0, i)), (n(2, s), n(0, i)), (n(1, c), n(0, i)));
  }, [i, c, s, r, o];
}
class fn extends D {
  constructor(t) {
    super(), R(this, t, ln, cn, O, { annotation: 0 });
  }
}
function un(e) {
  let t, n, o, r;
  return {
    c() {
      t = S("g"), n = S("polygon"), f(n, "points", o = /*points*/
      e[1].map(Oe).join(" ")), f(t, "class", "a9s-annotation-emphasis"), f(t, "data-id", r = /*annotation*/
      e[0].id);
    },
    m(s, c) {
      L(s, t, c), j(t, n);
    },
    p(s, [c]) {
      c & /*points*/
      2 && o !== (o = /*points*/
      s[1].map(Oe).join(" ")) && f(n, "points", o), c & /*annotation*/
      1 && r !== (r = /*annotation*/
      s[0].id) && f(t, "data-id", r);
    },
    i: U,
    o: U,
    d(s) {
      s && A(t);
    }
  };
}
const Oe = (e) => e.join(",");
function dn(e, t, n) {
  let o, { annotation: r } = t;
  return e.$$set = (s) => {
    "annotation" in s && n(0, r = s.annotation);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation*/
    1 && n(1, { points: o } = r.target.selector.geometry, o);
  }, [r, o];
}
class gn extends D {
  constructor(t) {
    super(), R(this, t, dn, un, O, { annotation: 0 });
  }
}
function pn(e) {
  let t, n, o;
  return {
    c() {
      t = S("g"), n = S("rect"), f(
        n,
        "x",
        /*x*/
        e[4]
      ), f(
        n,
        "y",
        /*y*/
        e[3]
      ), f(
        n,
        "width",
        /*w*/
        e[2]
      ), f(
        n,
        "height",
        /*h*/
        e[1]
      ), f(t, "class", "a9s-annotation-emphasis"), f(t, "data-id", o = /*annotation*/
      e[0].id);
    },
    m(r, s) {
      L(r, t, s), j(t, n);
    },
    p(r, [s]) {
      s & /*x*/
      16 && f(
        n,
        "x",
        /*x*/
        r[4]
      ), s & /*y*/
      8 && f(
        n,
        "y",
        /*y*/
        r[3]
      ), s & /*w*/
      4 && f(
        n,
        "width",
        /*w*/
        r[2]
      ), s & /*h*/
      2 && f(
        n,
        "height",
        /*h*/
        r[1]
      ), s & /*annotation*/
      1 && o !== (o = /*annotation*/
      r[0].id) && f(t, "data-id", o);
    },
    i: U,
    o: U,
    d(r) {
      r && A(t);
    }
  };
}
function hn(e, t, n) {
  let o, r, s, c, { annotation: i } = t;
  return e.$$set = (a) => {
    "annotation" in a && n(0, i = a.annotation);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation*/
    1 && n(4, { x: o, y: r, w: s, h: c } = i.target.selector.geometry, o, (n(3, r), n(0, i)), (n(2, s), n(0, i)), (n(1, c), n(0, i)));
  }, [i, c, s, r, o];
}
class mn extends D {
  constructor(t) {
    super(), R(this, t, hn, pn, O, { annotation: 0 });
  }
}
function yn(e) {
  let t, n;
  return t = new gn({
    props: { annotation: (
      /*annotation*/
      e[0]
    ) }
  }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, r) {
      const s = {};
      r & /*annotation*/
      1 && (s.annotation = /*annotation*/
      o[0]), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function _n(e) {
  let t, n;
  return t = new mn({
    props: { annotation: (
      /*annotation*/
      e[0]
    ) }
  }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, r) {
      const s = {};
      r & /*annotation*/
      1 && (s.annotation = /*annotation*/
      o[0]), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function bn(e) {
  let t, n;
  return t = new fn({
    props: { annotation: (
      /*annotation*/
      e[0]
    ) }
  }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, r) {
      const s = {};
      r & /*annotation*/
      1 && (s.annotation = /*annotation*/
      o[0]), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function vn(e) {
  let t, n, o, r;
  const s = [bn, _n, yn], c = [];
  function i(a, l) {
    return (
      /*annotation*/
      a[0].target.selector.type === re.ELLIPSE ? 0 : (
        /*annotation*/
        a[0].target.selector.type === re.RECTANGLE ? 1 : (
          /*annotation*/
          a[0].target.selector.type === re.POLYGON ? 2 : -1
        )
      )
    );
  }
  return ~(t = i(e)) && (n = c[t] = s[t](e)), {
    c() {
      n && n.c(), o = ie();
    },
    m(a, l) {
      ~t && c[t].m(a, l), L(a, o, l), r = !0;
    },
    p(a, [l]) {
      let d = t;
      t = i(a), t === d ? ~t && c[t].p(a, l) : (n && (V(), M(c[d], 1, 1, () => {
        c[d] = null;
      }), Y()), ~t ? (n = c[t], n ? n.p(a, l) : (n = c[t] = s[t](a), n.c()), w(n, 1), n.m(o.parentNode, o)) : n = null);
    },
    i(a) {
      r || (w(n), r = !0);
    },
    o(a) {
      M(n), r = !1;
    },
    d(a) {
      a && A(o), ~t && c[t].d(a);
    }
  };
}
function kn(e, t, n) {
  let { annotation: o } = t;
  return e.$$set = (r) => {
    "annotation" in r && n(0, o = r.annotation);
  }, [o];
}
class ke extends D {
  constructor(t) {
    super(), R(this, t, kn, vn, O, { annotation: 0 });
  }
}
function ge(e) {
  const t = e.slice(), n = st(
    /*connection*/
    t[2],
    10
  );
  return t[15] = n, t;
}
function Re(e) {
  let t, n, o, r, s, c, i, a, l, d, g, u, _, p, x, m, y, h, v, N;
  return {
    c() {
      t = S("path"), o = S("path"), s = S("path"), i = S("circle"), d = S("circle"), _ = S("circle"), m = S("circle"), f(t, "class", "a9s-connector-path-buffer svelte-1ukdls4"), f(t, "d", n = /*path*/
      e[15].d), f(o, "class", "a9s-connector-path-outer svelte-1ukdls4"), f(o, "d", r = /*path*/
      e[15].d), f(s, "class", "a9s-connector-path-inner svelte-1ukdls4"), f(s, "d", c = /*path*/
      e[15].d), f(i, "class", "a9s-connector-handle-outer svelte-1ukdls4"), f(i, "cx", a = /*path*/
      e[15].start.x), f(i, "cy", l = /*path*/
      e[15].start.y), f(
        i,
        "r",
        /*r*/
        e[3]
      ), f(d, "class", "a9s-connector-handle-inner svelte-1ukdls4"), f(d, "cx", g = /*path*/
      e[15].start.x), f(d, "cy", u = /*path*/
      e[15].start.y), f(
        d,
        "r",
        /*r*/
        e[3]
      ), f(_, "class", "a9s-connector-handle-outer svelte-1ukdls4"), f(_, "cx", p = /*path*/
      e[15].end.x), f(_, "cy", x = /*path*/
      e[15].end.y), f(
        _,
        "r",
        /*r*/
        e[3]
      ), f(m, "class", "a9s-connector-handle-inner svelte-1ukdls4"), f(m, "cx", y = /*path*/
      e[15].end.x), f(m, "cy", h = /*path*/
      e[15].end.y), f(
        m,
        "r",
        /*r*/
        e[3]
      );
    },
    m(k, E) {
      L(k, t, E), e[9](t), L(k, o, E), L(k, s, E), L(k, i, E), L(k, d, E), L(k, _, E), L(k, m, E), v || (N = pe(
        t,
        "pointerdown",
        /*onPointerDown*/
        e[4]
      ), v = !0);
    },
    p(k, E) {
      E & /*connection*/
      4 && n !== (n = /*path*/
      k[15].d) && f(t, "d", n), E & /*connection*/
      4 && r !== (r = /*path*/
      k[15].d) && f(o, "d", r), E & /*connection*/
      4 && c !== (c = /*path*/
      k[15].d) && f(s, "d", c), E & /*connection*/
      4 && a !== (a = /*path*/
      k[15].start.x) && f(i, "cx", a), E & /*connection*/
      4 && l !== (l = /*path*/
      k[15].start.y) && f(i, "cy", l), E & /*r*/
      8 && f(
        i,
        "r",
        /*r*/
        k[3]
      ), E & /*connection*/
      4 && g !== (g = /*path*/
      k[15].start.x) && f(d, "cx", g), E & /*connection*/
      4 && u !== (u = /*path*/
      k[15].start.y) && f(d, "cy", u), E & /*r*/
      8 && f(
        d,
        "r",
        /*r*/
        k[3]
      ), E & /*connection*/
      4 && p !== (p = /*path*/
      k[15].end.x) && f(_, "cx", p), E & /*connection*/
      4 && x !== (x = /*path*/
      k[15].end.y) && f(_, "cy", x), E & /*r*/
      8 && f(
        _,
        "r",
        /*r*/
        k[3]
      ), E & /*connection*/
      4 && y !== (y = /*path*/
      k[15].end.x) && f(m, "cx", y), E & /*connection*/
      4 && h !== (h = /*path*/
      k[15].end.y) && f(m, "cy", h), E & /*r*/
      8 && f(
        m,
        "r",
        /*r*/
        k[3]
      );
    },
    d(k) {
      k && (A(t), A(o), A(s), A(i), A(d), A(_), A(m)), e[9](null), v = !1, N();
    }
  };
}
function wn(e) {
  let t, n = (
    /*connection*/
    e[2] && Re(ge(e))
  );
  return {
    c() {
      t = S("g"), n && n.c(), f(t, "class", "a9s-connector svelte-1ukdls4"), X(
        t,
        "selected",
        /*isSelected*/
        e[0]
      );
    },
    m(o, r) {
      L(o, t, r), n && n.m(t, null);
    },
    p(o, [r]) {
      /*connection*/
      o[2] ? n ? n.p(ge(o), r) : (n = Re(ge(o)), n.c(), n.m(t, null)) : n && (n.d(1), n = null), r & /*isSelected*/
      1 && X(
        t,
        "selected",
        /*isSelected*/
        o[0]
      );
    },
    i: U,
    o: U,
    d(o) {
      o && A(t), n && n.d();
    }
  };
}
function xn(e, t, n) {
  let o, r, s, { annotation: c } = t, { state: i } = t, { isSelected: a } = t, { scale: l } = t;
  const d = () => s ? { x: s.x, y: s.y } : void 0;
  let g;
  const { selection: u, store: _ } = i, p = (h) => {
    const v = _.getAnnotation(h.target.selector.from), N = _.getAnnotation(h.target.selector.to);
    if (v && N) return _e(_.getAnnotation(h.target.selector.from), _.getAnnotation(h.target.selector.to));
  }, x = (h, v) => {
    if (h && v) {
      const N = h.getTotalLength();
      return h.getPointAtLength(N / 2);
    }
  }, m = (h) => {
    h.stopImmediatePropagation(), h.preventDefault(), u.userSelect(c.id, h);
  };
  ve(() => {
    const h = () => n(2, r = p(c)), { from: v, to: N } = c.target.selector;
    return _.observe(h, { annotations: [v, N] }), () => {
      _.unobserve(h);
    };
  });
  function y(h) {
    G[h ? "unshift" : "push"](() => {
      g = h, n(1, g);
    });
  }
  return e.$$set = (h) => {
    "annotation" in h && n(5, c = h.annotation), "state" in h && n(6, i = h.state), "isSelected" in h && n(0, a = h.isSelected), "scale" in h && n(7, l = h.scale);
  }, e.$$.update = () => {
    e.$$.dirty & /*scale*/
    128 && n(3, o = 5 / l), e.$$.dirty & /*annotation*/
    32 && n(2, r = p(c)), e.$$.dirty & /*connection, pathElement*/
    6 && (s = r && x(g, r));
  }, [
    a,
    g,
    r,
    o,
    m,
    c,
    i,
    l,
    d,
    y
  ];
}
class En extends D {
  constructor(t) {
    super(), R(this, t, xn, wn, O, {
      annotation: 5,
      state: 6,
      isSelected: 0,
      scale: 7,
      getMidpoint: 8
    });
  }
  get getMidpoint() {
    return this.$$.ctx[8];
  }
}
function De(e) {
  let t, n, o, r, s, c, i, a, l, d, g, u, _, p, x, m;
  return {
    c() {
      t = S("path"), o = S("path"), s = S("circle"), a = S("circle"), g = S("circle"), p = S("circle"), f(t, "class", "a9s-connector-path-outer svelte-rze64f"), f(t, "d", n = /*path*/
      e[0].d), f(o, "class", "a9s-connector-path-inner svelte-rze64f"), f(o, "d", r = /*path*/
      e[0].d), f(s, "class", "a9s-connector-handle-outer svelte-rze64f"), f(s, "cx", c = /*path*/
      e[0].start.x), f(s, "cy", i = /*path*/
      e[0].start.y), f(
        s,
        "r",
        /*r*/
        e[1]
      ), f(a, "class", "a9s-connector-handle-inner svelte-rze64f"), f(a, "cx", l = /*path*/
      e[0].start.x), f(a, "cy", d = /*path*/
      e[0].start.y), f(
        a,
        "r",
        /*r*/
        e[1]
      ), f(g, "class", "a9s-connector-handle-outer svelte-rze64f"), f(g, "cx", u = /*path*/
      e[0].end.x), f(g, "cy", _ = /*path*/
      e[0].end.y), f(
        g,
        "r",
        /*r*/
        e[1]
      ), f(p, "class", "a9s-connector-handle-inner svelte-rze64f"), f(p, "cx", x = /*path*/
      e[0].end.x), f(p, "cy", m = /*path*/
      e[0].end.y), f(
        p,
        "r",
        /*r*/
        e[1]
      );
    },
    m(y, h) {
      L(y, t, h), L(y, o, h), L(y, s, h), L(y, a, h), L(y, g, h), L(y, p, h);
    },
    p(y, h) {
      h & /*path*/
      1 && n !== (n = /*path*/
      y[0].d) && f(t, "d", n), h & /*path*/
      1 && r !== (r = /*path*/
      y[0].d) && f(o, "d", r), h & /*path*/
      1 && c !== (c = /*path*/
      y[0].start.x) && f(s, "cx", c), h & /*path*/
      1 && i !== (i = /*path*/
      y[0].start.y) && f(s, "cy", i), h & /*r*/
      2 && f(
        s,
        "r",
        /*r*/
        y[1]
      ), h & /*path*/
      1 && l !== (l = /*path*/
      y[0].start.x) && f(a, "cx", l), h & /*path*/
      1 && d !== (d = /*path*/
      y[0].start.y) && f(a, "cy", d), h & /*r*/
      2 && f(
        a,
        "r",
        /*r*/
        y[1]
      ), h & /*path*/
      1 && u !== (u = /*path*/
      y[0].end.x) && f(g, "cx", u), h & /*path*/
      1 && _ !== (_ = /*path*/
      y[0].end.y) && f(g, "cy", _), h & /*r*/
      2 && f(
        g,
        "r",
        /*r*/
        y[1]
      ), h & /*path*/
      1 && x !== (x = /*path*/
      y[0].end.x) && f(p, "cx", x), h & /*path*/
      1 && m !== (m = /*path*/
      y[0].end.y) && f(p, "cy", m), h & /*r*/
      2 && f(
        p,
        "r",
        /*r*/
        y[1]
      );
    },
    d(y) {
      y && (A(t), A(o), A(s), A(a), A(g), A(p));
    }
  };
}
function Sn(e) {
  let t, n = (
    /*path*/
    e[0] && De(e)
  );
  return {
    c() {
      t = S("g"), n && n.c(), f(t, "class", "a9s-connector svelte-rze64f");
    },
    m(o, r) {
      L(o, t, r), n && n.m(t, null);
    },
    p(o, [r]) {
      /*path*/
      o[0] ? n ? n.p(o, r) : (n = De(o), n.c(), n.m(t, null)) : n && (n.d(1), n = null);
    },
    i: U,
    o: U,
    d(o) {
      o && A(t), n && n.d();
    }
  };
}
function Mn(e, t, n) {
  let o, r, { connection: s } = t, { scale: c = 1 } = t;
  return e.$$set = (i) => {
    "connection" in i && n(2, s = i.connection), "scale" in i && n(3, c = i.scale);
  }, e.$$.update = () => {
    e.$$.dirty & /*scale*/
    8 && n(1, o = 5 / c), e.$$.dirty & /*connection*/
    4 && n(0, r = st(s, 10));
  }, [r, o, s, c];
}
class An extends D {
  constructor(t) {
    super(), R(this, t, Mn, Sn, O, { connection: 2, scale: 3 });
  }
}
function je(e, t, n) {
  const o = e.slice();
  return o[23] = t[n], o[24] = t, o[25] = n, o;
}
function He(e) {
  let t, n, o, r = (
    /*source*/
    e[4] && Ve(e)
  ), s = (
    /*hovered*/
    e[5] && /*hovered*/
    e[5] !== /*source*/
    e[4] && Ye(e)
  );
  return {
    c() {
      r && r.c(), t = ie(), s && s.c(), n = ie();
    },
    m(c, i) {
      r && r.m(c, i), L(c, t, i), s && s.m(c, i), L(c, n, i), o = !0;
    },
    p(c, i) {
      /*source*/
      c[4] ? r ? (r.p(c, i), i & /*source*/
      16 && w(r, 1)) : (r = Ve(c), r.c(), w(r, 1), r.m(t.parentNode, t)) : r && (V(), M(r, 1, 1, () => {
        r = null;
      }), Y()), /*hovered*/
      c[5] && /*hovered*/
      c[5] !== /*source*/
      c[4] ? s ? (s.p(c, i), i & /*hovered, source*/
      48 && w(s, 1)) : (s = Ye(c), s.c(), w(s, 1), s.m(n.parentNode, n)) : s && (V(), M(s, 1, 1, () => {
        s = null;
      }), Y());
    },
    i(c) {
      o || (w(r), w(s), o = !0);
    },
    o(c) {
      M(r), M(s), o = !1;
    },
    d(c) {
      c && (A(t), A(n)), r && r.d(c), s && s.d(c);
    }
  };
}
function Ve(e) {
  let t, n;
  return t = new ke({ props: { annotation: (
    /*source*/
    e[4]
  ) } }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, r) {
      const s = {};
      r & /*source*/
      16 && (s.annotation = /*source*/
      o[4]), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function Ye(e) {
  let t, n;
  return t = new ke({
    props: { annotation: (
      /*hovered*/
      e[5]
    ) }
  }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, r) {
      const s = {};
      r & /*hovered*/
      32 && (s.annotation = /*hovered*/
      o[5]), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function Ze(e) {
  let t, n;
  return t = new ke({
    props: {
      annotation: (
        /*floatingConnection*/
        e[8].end.annotation
      )
    }
  }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, r) {
      const s = {};
      r & /*floatingConnection*/
      256 && (s.annotation = /*floatingConnection*/
      o[8].end.annotation), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function ze(e) {
  let t, n = (
    /*connection*/
    e[23]
  ), o;
  const r = () => (
    /*connector_binding*/
    e[18](t, n)
  ), s = () => (
    /*connector_binding*/
    e[18](null, n)
  );
  let c = {
    annotation: (
      /*connection*/
      e[23]
    ),
    scale: (
      /*scale*/
      e[2]
    ),
    state: (
      /*state*/
      e[3]
    ),
    isSelected: (
      /*isSelected*/
      e[10](
        /*connection*/
        e[23].id
      )
    )
  };
  return t = new En({ props: c }), r(), {
    c() {
      F(t.$$.fragment);
    },
    m(i, a) {
      P(t, i, a), o = !0;
    },
    p(i, a) {
      n !== /*connection*/
      i[23] && (s(), n = /*connection*/
      i[23], r());
      const l = {};
      a & /*connections*/
      64 && (l.annotation = /*connection*/
      i[23]), a & /*scale*/
      4 && (l.scale = /*scale*/
      i[2]), a & /*state*/
      8 && (l.state = /*state*/
      i[3]), a & /*isSelected, connections*/
      1088 && (l.isSelected = /*isSelected*/
      i[10](
        /*connection*/
        i[23].id
      )), t.$set(l);
    },
    i(i) {
      o || (w(t.$$.fragment, i), o = !0);
    },
    o(i) {
      M(t.$$.fragment, i), o = !1;
    },
    d(i) {
      s(), W(t, i);
    }
  };
}
function Xe(e) {
  let t, n, o;
  return n = new An({
    props: {
      connection: (
        /*floatingConnection*/
        e[8]
      ),
      scale: (
        /*scale*/
        e[2]
      )
    }
  }), {
    c() {
      t = S("g"), F(n.$$.fragment), f(t, "class", "a9s-floating");
    },
    m(r, s) {
      L(r, t, s), P(n, t, null), o = !0;
    },
    p(r, s) {
      const c = {};
      s & /*floatingConnection*/
      256 && (c.connection = /*floatingConnection*/
      r[8]), s & /*scale*/
      4 && (c.scale = /*scale*/
      r[2]), n.$set(c);
    },
    i(r) {
      o || (w(n.$$.fragment, r), o = !0);
    },
    o(r) {
      M(n.$$.fragment, r), o = !1;
    },
    d(r) {
      r && A(t), W(n);
    }
  };
}
function Ln(e) {
  var x;
  let t, n, o, r, s, c, i, a, l = (
    /*enabled*/
    e[0] && He(e)
  ), d = (
    /*floatingConnection*/
    ((x = e[8]) == null ? void 0 : x.end) && "annotation" in /*floatingConnection*/
    e[8].end && Ze(e)
  ), g = Le(
    /*connections*/
    e[6]
  ), u = [];
  for (let m = 0; m < g.length; m += 1)
    u[m] = ze(je(e, g, m));
  const _ = (m) => M(u[m], 1, 1, () => {
    u[m] = null;
  });
  let p = (
    /*floatingConnection*/
    e[8] && Xe(e)
  );
  return {
    c() {
      t = S("svg"), n = S("g"), o = S("g"), l && l.c(), r = ie(), d && d.c(), s = S("g");
      for (let m = 0; m < u.length; m += 1)
        u[m].c();
      p && p.c(), f(o, "class", "a9s-connectors-shape-emphasis"), f(s, "class", "a9s-connectors"), f(n, "class", "a9s-connectors-layer"), f(
        n,
        "transform",
        /*layerTransform*/
        e[1]
      ), f(t, "class", "a9s-connector-layer svelte-n98jdz"), X(
        t,
        "enabled",
        /*enabled*/
        e[0]
      ), X(
        t,
        "hover",
        /*hovered*/
        e[5]
      );
    },
    m(m, y) {
      L(m, t, y), j(t, n), j(n, o), l && l.m(o, null), j(o, r), d && d.m(o, null), j(n, s);
      for (let h = 0; h < u.length; h += 1)
        u[h] && u[h].m(s, null);
      p && p.m(n, null), e[19](t), c = !0, i || (a = [
        pe(
          t,
          "pointermove",
          /*onPointerMove*/
          e[13]
        ),
        pe(
          t,
          "pointerdown",
          /*onPointerDown*/
          e[12]
        )
      ], i = !0);
    },
    p(m, [y]) {
      var h;
      if (/*enabled*/
      m[0] ? l ? (l.p(m, y), y & /*enabled*/
      1 && w(l, 1)) : (l = He(m), l.c(), w(l, 1), l.m(o, r)) : l && (V(), M(l, 1, 1, () => {
        l = null;
      }), Y()), /*floatingConnection*/
      (h = m[8]) != null && h.end && "annotation" in /*floatingConnection*/
      m[8].end ? d ? (d.p(m, y), y & /*floatingConnection*/
      256 && w(d, 1)) : (d = Ze(m), d.c(), w(d, 1), d.m(o, null)) : d && (V(), M(d, 1, 1, () => {
        d = null;
      }), Y()), y & /*connections, scale, state, isSelected, connectionRefs*/
      1228) {
        g = Le(
          /*connections*/
          m[6]
        );
        let v;
        for (v = 0; v < g.length; v += 1) {
          const N = je(m, g, v);
          u[v] ? (u[v].p(N, y), w(u[v], 1)) : (u[v] = ze(N), u[v].c(), w(u[v], 1), u[v].m(s, null));
        }
        for (V(), v = g.length; v < u.length; v += 1)
          _(v);
        Y();
      }
      /*floatingConnection*/
      m[8] ? p ? (p.p(m, y), y & /*floatingConnection*/
      256 && w(p, 1)) : (p = Xe(m), p.c(), w(p, 1), p.m(n, null)) : p && (V(), M(p, 1, 1, () => {
        p = null;
      }), Y()), (!c || y & /*layerTransform*/
      2) && f(
        n,
        "transform",
        /*layerTransform*/
        m[1]
      ), (!c || y & /*enabled*/
      1) && X(
        t,
        "enabled",
        /*enabled*/
        m[0]
      ), (!c || y & /*hovered*/
      32) && X(
        t,
        "hover",
        /*hovered*/
        m[5]
      );
    },
    i(m) {
      if (!c) {
        w(l), w(d);
        for (let y = 0; y < g.length; y += 1)
          w(u[y]);
        w(p), c = !0;
      }
    },
    o(m) {
      M(l), M(d), u = u.filter(Boolean);
      for (let y = 0; y < u.length; y += 1)
        M(u[y]);
      M(p), c = !1;
    },
    d(m) {
      m && A(t), l && l.d(), d && d.d(), It(u, m), p && p.d(), e[19](null), i = !1, q(a);
    }
  };
}
function Cn(e, t, n) {
  let o, r;
  const s = jt();
  let { enabled: c } = t, { graph: i } = t, { layerTransform: a = void 0 } = t, { pointerTransform: l = void 0 } = t, { scale: d = 1 } = t, { state: g } = t, u, _, p = [], x = {}, m, y;
  const { selection: h, store: v } = g;
  Tt(e, h, (b) => n(17, r = b));
  const N = (b) => {
    const T = x[b];
    if (T) return T.getMidpoint();
  }, k = (b) => b !== void 0 && "direction" in b, E = (b) => {
    if (h.clear(), !u && _)
      n(4, u = _);
    else if (k(m == null ? void 0 : m.end)) {
      b.preventDefault(), b.stopPropagation();
      const T = m.start.annotation.id, I = m.end.annotation.id, oe = xt(), Q = {
        id: oe,
        motivation: "linking",
        bodies: [],
        target: { annotation: oe, selector: { from: T, to: I } }
      };
      v.addAnnotation(Q), n(4, u = void 0), s("create", Q), h.setSelected(Q.id);
    } else u && n(4, u = void 0);
  }, ee = (b) => {
    const T = l ? l({ x: b.offsetX, y: b.offsetY }) : dt(b, y), I = v.getAt(T.x, T.y);
    u ? I && !i.isConnected(u.id, I.id) ? (n(8, m = _e(u, I)), n(5, _ = I)) : (n(8, m = _e(u, { point: T })), n(5, _ = void 0)) : n(5, _ = I);
  };
  ve(() => {
    const b = (T) => {
      const { created: I, deleted: oe } = T.changes, Q = (I || []).filter(J), ct = new Set((oe || []).filter(J).map((ae) => ae.id));
      n(6, p = [...p, ...Q].filter((ae) => !ct.has(ae.id)));
    };
    return v.observe(b), () => {
      v.unobserve(b);
    };
  });
  function te(b, T) {
    G[b ? "unshift" : "push"](() => {
      x[T.id] = b, n(7, x);
    });
  }
  function ne(b) {
    G[b ? "unshift" : "push"](() => {
      y = b, n(9, y);
    });
  }
  return e.$$set = (b) => {
    "enabled" in b && n(0, c = b.enabled), "graph" in b && n(14, i = b.graph), "layerTransform" in b && n(1, a = b.layerTransform), "pointerTransform" in b && n(15, l = b.pointerTransform), "scale" in b && n(2, d = b.scale), "state" in b && n(3, g = b.state);
  }, e.$$.update = () => {
    e.$$.dirty & /*enabled*/
    1 && (c || n(4, u = void 0)), e.$$.dirty & /*source*/
    16 && (u || n(8, m = void 0)), e.$$.dirty & /*$selection*/
    131072 && n(10, o = (b) => r.selected.some((T) => T.id === b));
  }, [
    c,
    a,
    d,
    g,
    u,
    _,
    p,
    x,
    m,
    y,
    o,
    h,
    E,
    ee,
    i,
    l,
    N,
    r,
    te,
    ne
  ];
}
class it extends D {
  constructor(t) {
    super(), R(this, t, Cn, Ln, O, {
      enabled: 0,
      graph: 14,
      layerTransform: 1,
      pointerTransform: 15,
      scale: 2,
      state: 3,
      getMidpoint: 16
    });
  }
  get getMidpoint() {
    return this.$$.ctx[16];
  }
}
const at = (e) => {
  let t = [];
  const n = (i) => {
    if (J(i)) {
      const { from: a, to: l } = i.target.selector;
      t = [...t, { id: i.id, from: a, to: l }];
    }
  }, o = (i) => {
    if (J(i)) {
      const { from: a, to: l } = i.target.selector;
      t = t.filter((d) => d.from !== a && d.to !== l);
    } else if (gt(i)) {
      const a = t.filter((l) => l.from === i.id || l.to === i.id);
      a.length > 0 && e.bulkDeleteAnnotation(a.map((l) => l.id));
    }
  }, r = (i, a) => t.some((l) => l.from === i && l.to === a || l.from === a && l.to === i), s = (i) => {
    const { created: a, deleted: l } = i.changes;
    (a || []).map(n), (l || []).map(o);
  };
  return e.observe(s), {
    destroy: () => {
      e.unobserve(s);
    },
    isConnected: r
  };
}, Yn = (e) => {
  let t = !1;
  const n = at(e.state.store), o = new it({
    target: e.element,
    props: {
      enabled: t,
      graph: n,
      state: e.state
    }
  });
  return {
    getMidpoint: (i) => o.getMidpoint(i),
    setEnabled: (i) => {
      t = i, o.$set({ enabled: t });
    },
    unmount: () => {
      n.destroy();
    }
  };
}, Nn = (e) => ({
  transform: e & /*layerTransform*/
  2,
  scale: e & /*scale*/
  1
}), Be = (e) => ({
  transform: (
    /*layerTransform*/
    e[1]
  ),
  scale: (
    /*scale*/
    e[0]
  )
});
function Tn(e) {
  let t;
  const n = (
    /*#slots*/
    e[4].default
  ), o = Ut(
    n,
    e,
    /*$$scope*/
    e[3],
    Be
  );
  return {
    c() {
      o && o.c();
    },
    m(r, s) {
      o && o.m(r, s), t = !0;
    },
    p(r, [s]) {
      o && o.p && (!t || s & /*$$scope, layerTransform, scale*/
      11) && Wt(
        o,
        n,
        r,
        /*$$scope*/
        r[3],
        t ? Pt(
          n,
          /*$$scope*/
          r[3],
          s,
          Nn
        ) : Ft(
          /*$$scope*/
          r[3]
        ),
        Be
      );
    },
    i(r) {
      t || (w(o, r), t = !0);
    },
    o(r) {
      M(o, r), t = !1;
    },
    d(r) {
      o && o.d(r);
    }
  };
}
function Un(e, t, n) {
  let { $$slots: o = {}, $$scope: r } = t, { viewer: s } = t, c = 1, i;
  const a = () => {
    const l = s.viewport.getContainerSize().x, d = s.viewport.getZoom(!0), g = s.viewport.getFlip(), u = s.viewport.pixelFromPoint(new Ge.Point(0, 0), !0);
    g && (u.x = l - u.x);
    const _ = d * l / s.world.getContentFactor(), p = g ? -_ : _, x = s.viewport.getRotation(!0);
    n(1, i = `translate(${u.x}, ${u.y}) scale(${p}, ${_}) rotate(${x})`), n(0, c = d * l / s.world.getContentFactor());
  };
  return ve(() => (s.addHandler("update-viewport", a), () => {
    s.removeHandler("update-viewport", a);
  })), e.$$set = (l) => {
    "viewer" in l && n(2, s = l.viewer), "$$scope" in l && n(3, r = l.$$scope);
  }, [c, i, s, r, o];
}
class Pn extends D {
  constructor(t) {
    super(), R(this, t, Un, Tn, O, { viewer: 2 });
  }
}
function Wn(e) {
  let t, n, o = {
    enabled: (
      /*enabled*/
      e[0]
    ),
    graph: (
      /*graph*/
      e[1]
    ),
    scale: (
      /*scale*/
      e[10]
    ),
    state: (
      /*state*/
      e[2]
    ),
    layerTransform: (
      /*transform*/
      e[9]
    ),
    pointerTransform: (
      /*pointerTransform*/
      e[5]
    )
  };
  return t = new it({ props: o }), e[7](t), t.$on(
    "create",
    /*create_handler*/
    e[8]
  ), {
    c() {
      F(t.$$.fragment);
    },
    m(r, s) {
      P(t, r, s), n = !0;
    },
    p(r, s) {
      const c = {};
      s & /*enabled*/
      1 && (c.enabled = /*enabled*/
      r[0]), s & /*graph*/
      2 && (c.graph = /*graph*/
      r[1]), s & /*scale*/
      1024 && (c.scale = /*scale*/
      r[10]), s & /*state*/
      4 && (c.state = /*state*/
      r[2]), s & /*transform*/
      512 && (c.layerTransform = /*transform*/
      r[9]), t.$set(c);
    },
    i(r) {
      n || (w(t.$$.fragment, r), n = !0);
    },
    o(r) {
      M(t.$$.fragment, r), n = !1;
    },
    d(r) {
      e[7](null), W(t, r);
    }
  };
}
function Fn(e) {
  let t, n;
  return t = new Pn({
    props: {
      viewer: (
        /*viewer*/
        e[3]
      ),
      $$slots: {
        default: [
          Wn,
          ({ transform: o, scale: r }) => ({ 9: o, 10: r }),
          ({ transform: o, scale: r }) => (o ? 512 : 0) | (r ? 1024 : 0)
        ]
      },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      F(t.$$.fragment);
    },
    m(o, r) {
      P(t, o, r), n = !0;
    },
    p(o, [r]) {
      const s = {};
      r & /*viewer*/
      8 && (s.viewer = /*viewer*/
      o[3]), r & /*$$scope, enabled, graph, scale, state, transform, connectorLayer*/
      3607 && (s.$$scope = { dirty: r, ctx: o }), t.$set(s);
    },
    i(o) {
      n || (w(t.$$.fragment, o), n = !0);
    },
    o(o) {
      M(t.$$.fragment, o), n = !1;
    },
    d(o) {
      W(t, o);
    }
  };
}
function In(e, t, n) {
  let { enabled: o } = t, { graph: r } = t, { state: s } = t, { viewer: c } = t, i;
  const a = (u) => i.getMidpoint(u), l = (u) => {
    const { x: _, y: p } = c.viewport.viewerElementToImageCoordinates(new Ge.Point(u.x, u.y));
    return { x: _, y: p };
  };
  function d(u) {
    G[u ? "unshift" : "push"](() => {
      i = u, n(4, i);
    });
  }
  function g(u) {
    Ht.call(this, e, u);
  }
  return e.$$set = (u) => {
    "enabled" in u && n(0, o = u.enabled), "graph" in u && n(1, r = u.graph), "state" in u && n(2, s = u.state), "viewer" in u && n(3, c = u.viewer);
  }, [
    o,
    r,
    s,
    c,
    i,
    l,
    a,
    d,
    g
  ];
}
class On extends D {
  constructor(t) {
    super(), R(this, t, In, Fn, O, {
      enabled: 0,
      graph: 1,
      state: 2,
      viewer: 3,
      getMidpoint: 6
    });
  }
  get getMidpoint() {
    return this.$$.ctx[6];
  }
}
const Zn = (e, t) => {
  const n = at(e.state.store);
  let o = !1;
  const r = new On({
    target: t.element.querySelector(".openseadragon-canvas"),
    props: {
      enabled: o,
      graph: n,
      state: e.state,
      viewer: t
    }
  });
  return {
    getMidpoint: (a) => r.getMidpoint(a),
    setEnabled: (a) => {
      o = a, r.$set({ enabled: o }), a ? e.setUserSelectAction(we.SELECT) : e.setUserSelectAction(we.EDIT);
    },
    unmount: () => {
      n.destroy();
    }
  };
};
export {
  Vn as W3CImageRelationFormat,
  J as isConnectionAnnotation,
  qe as isW3CRelationLinkAnnotation,
  xe as isW3CRelationMetaAnnotation,
  Zn as mountOSDPlugin,
  Yn as mountPlugin,
  Mt as parseW3C,
  At as serializeW3C
};
//# sourceMappingURL=annotorious-connectors.es.js.map
