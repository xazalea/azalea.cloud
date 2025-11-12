var Rs;
import {R as Lt, j as s, c as re, I as le, a as Fo, r as zo} from "./Icon-709cfd25.js";
import {R as Ms, K as Ft, T as Ns, t as J, V as Qn, w as zt, W as Os, X as Bo, Y as Ds, Z as As, _ as Jn, $ as Bt, z as Ce, a0 as Ls, v as Ho, a1 as Fs, a2 as zs, a3 as Bs, a4 as Hs, x as De, s as ce, a5 as $s, a6 as Us, a7 as Vs, a8 as qs, a9 as Gs, aa as Ws, ab as Xs, E as me, U as $o, ac as Uo, ad as Ys, ae as xe, af as Vo, ag as qo, ah as Go, ai as hn, aj as Ks, L as Zs, ak as Qs, al as Js, am as el, an as tl, N as nl, m as gn, ao as rl, ap as ol, D as Wo, aq as il, ar as al, as as sl, at as ll, au as cl, av as ul, y as dl} from "./store-09c6166c.js";
import {p as pl} from "./App.styles-4a40b4ee.js";
import {R as G, r as d} from "./index-8b3efc3f.js";
import {a as Xo, u as X, P as fl} from "./react-redux-52a3bd12.js";
import {s as ml} from "./options-7a3fe88d.js";
import {m as Ht} from "./index-7bc06dca.js";
import {a as hl, B as oe, g as gl, h as bl, i as er, j as vl, k as xl, l as yl, c as Yo, m as wl, n as _l, o as kl, p as El, q as Cl, r as jl, s as Sl, t as Tl, u as Pl} from "./Button-28102c4e.js";
import {T as qe, a as de, b as pe, c as se} from "./Tooltip-902b3a9d.js";
import {B as Ko, g as Il, a as Rl, c as Ml, L as Nl, P as Ol, b as Zo, O as Qo, d as Dl, D as Al, e as Ll, f as Fl, h as Jo, A as ei, i as zl, j as ti, k as ni, W as tr, l as Bl, m as Hl, n as $l, o as Ul, p as Vl, q as ql, M as Gl, r as ri, t as Wl, u as Xl, C as Yl, v as Kl, w as Zl, x as Ql, y as Jl, z as oi, F as ec, G as ii, H as Ge, I as tc, J as ai, K as nr, N as nc, Q as rc, R as oc, S as ic, T as ac, s as sc, U as lc, E as cc} from "./ExtensionDropdown-2dc74b89.js";
import {u as uc} from "./useBackgroundReduxState-a039e2db.js";
import {u as dc, a as pc} from "./useDomainAllowlistListener-dc049a39.js";
import {C as fc, D as si, a as li, b as ci, d as ui, f as mc, c as hc, T as gc, g as bc, h as vc, t as xc, i as yc, j as bn, u as wc} from "./useExtensionMessagesListener-47f2b437.js";
import {m as _c, n as kc, e as di, o as Ec, g as Cc, p as jc, q as Sc, r as Tc, l as Pc, s as Ic, t as Rc, u as Mc, v as rr, w as Nc, x as Oc, y as Dc, z as Ac, A as Lc, B as Fc, C as zc, D as Bc, i as Hc, E as $c, F as Uc, G as Vc} from "./index-7ec85ebb.js";
import {w as pi} from "./waitForPageSettled-5dce853c.js";
import {f as or, I as qc, i as Gc, a as Wc, g as ir, b as vn, p as fi, t as mi, c as ar, d as hi, e as Xc, h as Yc, j as Kc} from "./util-1d7a9308.js";
import {B as gi} from "./Badge-efc00514.js";
import {C as Zc, A as Qc} from "./Chip-fcb36839.js";
import {B as Jc} from "./Banner-ea20b168.js";
import {c as bi, b as sr, M as mt, P as lr, a as vi} from "./index-961cf08f.js";
import {S as eu} from "./ScrollArea-64a9fc3d.js";
import {S as Ae} from "./DocumentIcon-a843a224.js";
import {T as xi} from "./TextInput-531917ab.js";
import {c as ht} from "./index-e131923d.js";
import {g as cr, c as ae} from "./_commonjsHelpers-de833af9.js";
import {g as tu} from "./getExtensionStatus-1ed3356e.js";
import {f as yi, g as nu} from "./index.esm-e3d6f8ec.js";
import {g as wi, F as _i, B as ru} from "./AudioSwitch-261c4a80.js";
import {S as We} from "./Switch-83e32ab0.js";
import {S as ou, a as ur} from "./redactionManager-d80ce84d.js";
import {v as ki} from "./v4-c70744d4.js";
import {s as tt} from "./scribeLiveUtils-2439b7f4.js";
import {a as Ei} from "./domCopyAnnotate-a2b92afc.js";
import {g as Ci, s as iu, a as au} from "./utils-9daa9855.js";
import {C as su} from "./Checkbox-9f05bf9c.js";
import {T as lu} from "./Toaster-fd453bc3.js";
import "./appTagUtils-c74c75cd.js";
import "./Label-7e7b0c43.js";
import "./index-dec57878.js";
import "./index-e309a1d1.js";
import "./allowedDomainsDB-47151ce3.js";
import "./scribeSuggestions-59cbe47c.js";
import "./Toolbar-76b5973a.js";
import "./FAIcon-237a55d1.js";
import "./index-c412bae6.js";
import "./index-84d1a71c.js";
import "./getGuideMeOptimizedElement-ced88426.js";
import "./getTargetElementAttributes-3f1109f1.js";
import "./browserContext-fabb883d.js";
import "./dwResultsDB-40675cfa.js";
import "./index-a72790c3.js";
import "./index-cbd90b1e.js";
var $t = (e => (e.NotFoundScreenshot = "Refer to the screenshot, then click \u201CNext\u201D to continue.",
e.NotFoundStep = "Refer to the step, then click \u201CNext\u201D to continue.",
e.UrlMismatch = "Looks like you\u2019re on a different page.",
e))($t || {});
const cu = async () => {
    var t, r;
    const e = Ms();
    return e === Ft.Chrome || e === Ft.Unknown ? Ns() ? Ft.Arc : (r = await ((t = chrome == null ? void 0 : chrome.windows) == null ? void 0 : t.getCurrent())) != null && r.vivExtData ? Ft.Vivaldi : e : e
}
  , Ut = "crxjs-ext"
  , uu = e => e.length === 0 ? null : e.length >= 2 && e[0] === document.getElementById(Ut) ? e[1] : e[0]
  , dr = () => {
    const e = document.getElementById(Ut);
    if (!e)
        return null;
    const {shadowRoot: t} = e;
    return t ? t.getElementById("root-scribe-elem") : null
}
;
function pr() {
    return pr = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
                ({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    }
    ,
    pr.apply(null, arguments)
}
function ji(e, t) {
    if (e == null)
        return {};
    var r = {};
    for (var n in e)
        if ({}.hasOwnProperty.call(e, n)) {
            if (t.indexOf(n) !== -1)
                continue;
            r[n] = e[n]
        }
    return r
}
function fr(e, t) {
    return fr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
        return r.__proto__ = n,
        r
    }
    ,
    fr(e, t)
}
function Si(e, t) {
    e.prototype = Object.create(t.prototype),
    e.prototype.constructor = e,
    fr(e, t)
}
function du(e, t) {
    return e.classList ? !!t && e.classList.contains(t) : (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + t + " ") !== -1
}
function pu(e, t) {
    e.classList ? e.classList.add(t) : du(e, t) || (typeof e.className == "string" ? e.className = e.className + " " + t : e.setAttribute("class", (e.className && e.className.baseVal || "") + " " + t))
}
function Ti(e, t) {
    return e.replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)","g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "")
}
function fu(e, t) {
    e.classList ? e.classList.remove(t) : typeof e.className == "string" ? e.className = Ti(e.className, t) : e.setAttribute("class", Ti(e.className && e.className.baseVal || "", t))
}
const Pi = {
    disabled: !1
}
  , Ii = G.createContext(null);
var Ri = function(e) {
    return e.scrollTop
}
  , Vt = "unmounted"
  , nt = "exited"
  , rt = "entering"
  , gt = "entered"
  , mr = "exiting"
  , He = function(e) {
    Si(t, e);
    function t(n, i) {
        var a;
        a = e.call(this, n, i) || this;
        var c = i, l = c && !c.isMounting ? n.enter : n.appear, u;
        return a.appearStatus = null,
        n.in ? l ? (u = nt,
        a.appearStatus = rt) : u = gt : n.unmountOnExit || n.mountOnEnter ? u = Vt : u = nt,
        a.state = {
            status: u
        },
        a.nextCallback = null,
        a
    }
    t.getDerivedStateFromProps = function(n, i) {
        var a = n.in;
        return a && i.status === Vt ? {
            status: nt
        } : null
    }
    ;
    var r = t.prototype;
    return r.componentDidMount = function() {
        this.updateStatus(!0, this.appearStatus)
    }
    ,
    r.componentDidUpdate = function(n) {
        var i = null;
        if (n !== this.props) {
            var a = this.state.status;
            this.props.in ? a !== rt && a !== gt && (i = rt) : (a === rt || a === gt) && (i = mr)
        }
        this.updateStatus(!1, i)
    }
    ,
    r.componentWillUnmount = function() {
        this.cancelNextCallback()
    }
    ,
    r.getTimeouts = function() {
        var n = this.props.timeout, i, a, c;
        return i = a = c = n,
        n != null && typeof n != "number" && (i = n.exit,
        a = n.enter,
        c = n.appear !== void 0 ? n.appear : a),
        {
            exit: i,
            enter: a,
            appear: c
        }
    }
    ,
    r.updateStatus = function(n, i) {
        if (n === void 0 && (n = !1),
        i !== null)
            if (this.cancelNextCallback(),
            i === rt) {
                if (this.props.unmountOnExit || this.props.mountOnEnter) {
                    var a = this.props.nodeRef ? this.props.nodeRef.current : Lt.findDOMNode(this);
                    a && Ri(a)
                }
                this.performEnter(n)
            } else
                this.performExit();
        else
            this.props.unmountOnExit && this.state.status === nt && this.setState({
                status: Vt
            })
    }
    ,
    r.performEnter = function(n) {
        var i = this
          , a = this.props.enter
          , c = this.context ? this.context.isMounting : n
          , l = this.props.nodeRef ? [c] : [Lt.findDOMNode(this), c]
          , u = l[0]
          , m = l[1]
          , h = this.getTimeouts()
          , v = c ? h.appear : h.enter;
        if (!n && !a || Pi.disabled) {
            this.safeSetState({
                status: gt
            }, function() {
                i.props.onEntered(u)
            });
            return
        }
        this.props.onEnter(u, m),
        this.safeSetState({
            status: rt
        }, function() {
            i.props.onEntering(u, m),
            i.onTransitionEnd(v, function() {
                i.safeSetState({
                    status: gt
                }, function() {
                    i.props.onEntered(u, m)
                })
            })
        })
    }
    ,
    r.performExit = function() {
        var n = this
          , i = this.props.exit
          , a = this.getTimeouts()
          , c = this.props.nodeRef ? void 0 : Lt.findDOMNode(this);
        if (!i || Pi.disabled) {
            this.safeSetState({
                status: nt
            }, function() {
                n.props.onExited(c)
            });
            return
        }
        this.props.onExit(c),
        this.safeSetState({
            status: mr
        }, function() {
            n.props.onExiting(c),
            n.onTransitionEnd(a.exit, function() {
                n.safeSetState({
                    status: nt
                }, function() {
                    n.props.onExited(c)
                })
            })
        })
    }
    ,
    r.cancelNextCallback = function() {
        this.nextCallback !== null && (this.nextCallback.cancel(),
        this.nextCallback = null)
    }
    ,
    r.safeSetState = function(n, i) {
        i = this.setNextCallback(i),
        this.setState(n, i)
    }
    ,
    r.setNextCallback = function(n) {
        var i = this
          , a = !0;
        return this.nextCallback = function(c) {
            a && (a = !1,
            i.nextCallback = null,
            n(c))
        }
        ,
        this.nextCallback.cancel = function() {
            a = !1
        }
        ,
        this.nextCallback
    }
    ,
    r.onTransitionEnd = function(n, i) {
        this.setNextCallback(i);
        var a = this.props.nodeRef ? this.props.nodeRef.current : Lt.findDOMNode(this)
          , c = n == null && !this.props.addEndListener;
        if (!a || c) {
            setTimeout(this.nextCallback, 0);
            return
        }
        if (this.props.addEndListener) {
            var l = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback]
              , u = l[0]
              , m = l[1];
            this.props.addEndListener(u, m)
        }
        n != null && setTimeout(this.nextCallback, n)
    }
    ,
    r.render = function() {
        var n = this.state.status;
        if (n === Vt)
            return null;
        var i = this.props
          , a = i.children;
        i.in,
        i.mountOnEnter,
        i.unmountOnExit,
        i.appear,
        i.enter,
        i.exit,
        i.timeout,
        i.addEndListener,
        i.onEnter,
        i.onEntering,
        i.onEntered,
        i.onExit,
        i.onExiting,
        i.onExited,
        i.nodeRef;
        var c = ji(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
        return G.createElement(Ii.Provider, {
            value: null
        }, typeof a == "function" ? a(n, c) : G.cloneElement(G.Children.only(a), c))
    }
    ,
    t
}(G.Component);
He.contextType = Ii,
He.propTypes = {};
function bt() {}
He.defaultProps = {
    in: !1,
    mountOnEnter: !1,
    unmountOnExit: !1,
    appear: !1,
    enter: !0,
    exit: !0,
    onEnter: bt,
    onEntering: bt,
    onEntered: bt,
    onExit: bt,
    onExiting: bt,
    onExited: bt
},
He.UNMOUNTED = Vt,
He.EXITED = nt,
He.ENTERING = rt,
He.ENTERED = gt,
He.EXITING = mr;
const mu = He;
var hu = function(e, t) {
    return e && t && t.split(" ").forEach(function(r) {
        return pu(e, r)
    })
}
  , hr = function(e, t) {
    return e && t && t.split(" ").forEach(function(r) {
        return fu(e, r)
    })
}
  , gr = function(e) {
    Si(t, e);
    function t() {
        for (var n, i = arguments.length, a = new Array(i), c = 0; c < i; c++)
            a[c] = arguments[c];
        return n = e.call.apply(e, [this].concat(a)) || this,
        n.appliedClasses = {
            appear: {},
            enter: {},
            exit: {}
        },
        n.onEnter = function(l, u) {
            var m = n.resolveArguments(l, u)
              , h = m[0]
              , v = m[1];
            n.removeClasses(h, "exit"),
            n.addClass(h, v ? "appear" : "enter", "base"),
            n.props.onEnter && n.props.onEnter(l, u)
        }
        ,
        n.onEntering = function(l, u) {
            var m = n.resolveArguments(l, u)
              , h = m[0]
              , v = m[1]
              , w = v ? "appear" : "enter";
            n.addClass(h, w, "active"),
            n.props.onEntering && n.props.onEntering(l, u)
        }
        ,
        n.onEntered = function(l, u) {
            var m = n.resolveArguments(l, u)
              , h = m[0]
              , v = m[1]
              , w = v ? "appear" : "enter";
            n.removeClasses(h, w),
            n.addClass(h, w, "done"),
            n.props.onEntered && n.props.onEntered(l, u)
        }
        ,
        n.onExit = function(l) {
            var u = n.resolveArguments(l)
              , m = u[0];
            n.removeClasses(m, "appear"),
            n.removeClasses(m, "enter"),
            n.addClass(m, "exit", "base"),
            n.props.onExit && n.props.onExit(l)
        }
        ,
        n.onExiting = function(l) {
            var u = n.resolveArguments(l)
              , m = u[0];
            n.addClass(m, "exit", "active"),
            n.props.onExiting && n.props.onExiting(l)
        }
        ,
        n.onExited = function(l) {
            var u = n.resolveArguments(l)
              , m = u[0];
            n.removeClasses(m, "exit"),
            n.addClass(m, "exit", "done"),
            n.props.onExited && n.props.onExited(l)
        }
        ,
        n.resolveArguments = function(l, u) {
            return n.props.nodeRef ? [n.props.nodeRef.current, l] : [l, u]
        }
        ,
        n.getClassNames = function(l) {
            var u = n.props.classNames
              , m = typeof u == "string"
              , h = m && u ? u + "-" : ""
              , v = m ? "" + h + l : u[l]
              , w = m ? v + "-active" : u[l + "Active"]
              , k = m ? v + "-done" : u[l + "Done"];
            return {
                baseClassName: v,
                activeClassName: w,
                doneClassName: k
            }
        }
        ,
        n
    }
    var r = t.prototype;
    return r.addClass = function(n, i, a) {
        var c = this.getClassNames(i)[a + "ClassName"]
          , l = this.getClassNames("enter")
          , u = l.doneClassName;
        i === "appear" && a === "done" && u && (c += " " + u),
        a === "active" && n && Ri(n),
        c && (this.appliedClasses[i][a] = c,
        hu(n, c))
    }
    ,
    r.removeClasses = function(n, i) {
        var a = this.appliedClasses[i]
          , c = a.base
          , l = a.active
          , u = a.done;
        this.appliedClasses[i] = {},
        c && hr(n, c),
        l && hr(n, l),
        u && hr(n, u)
    }
    ,
    r.render = function() {
        var n = this.props;
        n.classNames;
        var i = ji(n, ["classNames"]);
        return G.createElement(mu, pr({}, i, {
            onEnter: this.onEnter,
            onEntered: this.onEntered,
            onEntering: this.onEntering,
            onExit: this.onExit,
            onExiting: this.onExiting,
            onExited: this.onExited
        }))
    }
    ,
    t
}(G.Component);
gr.defaultProps = {
    classNames: ""
},
gr.propTypes = {};
const gu = gr
  , bu = ({children: e}) => {
    const [t,r] = d.useState(!1)
      , n = d.useRef(null);
    return d.useEffect( () => {
        const i = l => {
            var u;
            if (l.messageType === "currentTabChanged") {
                const m = n.current === ((u = l == null ? void 0 : l.selfTab) == null ? void 0 : u.id);
                r(m),
                Ht.send("isCurrentTab").then(h => {
                    var v;
                    r(h.isCurrent || !1),
                    n.current = ((v = h.selfTab) == null ? void 0 : v.id) || null
                }
                )
            }
        }
          , a = () => {
            document.visibilityState === "hidden" ? r(!1) : Ht.send("isCurrentTab").then(l => {
                var u;
                r(l.isCurrent || !1),
                n.current = ((u = l.selfTab) == null ? void 0 : u.id) || null
            }
            )
        }
        ;
        Ht.send("isCurrentTab").then(l => {
            var u;
            r(l.isCurrent || !1),
            n.current = ((u = l.selfTab) == null ? void 0 : u.id) || null
        }
        ),
        chrome.runtime.onMessage.addListener(i),
        document.addEventListener("visibilitychange", a);
        const c = window.setInterval( () => {
            Ht.send("isCurrentTab").then(l => {
                var u;
                r(l.isCurrent || !1),
                n.current = ((u = l.selfTab) == null ? void 0 : u.id) || null
            }
            )
        }
        , 1e3);
        return () => {
            chrome.runtime.onMessage.removeListener(i),
            document.removeEventListener("visibilitychange", a),
            window.clearInterval(c)
        }
    }
    , []),
    t ? e : null
}
;
function vu() {
    var e;
    (e = document == null ? void 0 : document.querySelectorAll("[_i_d]")) == null || e.forEach(t => t == null ? void 0 : t.removeAttribute("_i_d"))
}
function Mi() {
    let e = 0;
    vu(),
    Array.from(document.body.querySelectorAll("*")).reverse().forEach(t => {
        const {display: r, visibility: n, opacity: i} = window.getComputedStyle(t)
          , {height: a, width: c} = t.getBoundingClientRect()
          , l = r === "none" || n === "hidden" || n === "collapse" || i === "0";
        !t.hasAttribute("_i_d") && c && a && !l && (t.setAttribute("_i_d", `${e}`),
        e += 1)
    }
    )
}
const xu = () => {
    const [e,t] = d.useState(!1);
    return d.useEffect( () => {
        const r = window.matchMedia("(prefers-reduced-motion: reduce)");
        t(r.matches);
        const n = () => t(r.matches);
        return r.addEventListener("change", n),
        () => r.removeEventListener("change", n)
    }
    , []),
    {
        prefersReducedMotion: e,
        prefersReducedMotionClassNames: e ? "motion-reduce:transition-none" : ""
    }
}
  , Ni = d.forwardRef( (e, t) => {
    const {prefersReducedMotion: r} = xu()
      , n = 3
      , i = e.sizeIncrease ? 56 : 32
      , a = 128
      , c = (e == null ? void 0 : e.clickTargetColor) || "F43F5E"
      , l = typeof c == "object" && c !== null
      , u = i / 2
      , m = 2
      , h = l ? "url(#target-gradient)" : `#${c}`
      , v = l ? c == null ? void 0 : c.from : `#${c}`
      , w = a / 2
      , k = a / 3
      , b = a / 2 - 2
      , g = ({inset: M=0}) => s.jsx("animate", {
        begin: 0,
        attributeName: "r",
        dur: n,
        from: u - M,
        to: u - M,
        values: `${u - M}; ${u + 2 - M}; ${u - M};`,
        calcMode: "spline",
        keySplines: "0.4 0 0.5 1; 0.5 0 0.4 1",
        repeatCount: "indefinite"
    })
      , _ = ({size: M, delay: D=0}) => !r && s.jsxs(s.Fragment, {
        children: [s.jsx("animate", {
            begin: D,
            attributeName: "r",
            from: 0,
            to: M,
            values: `0; ${M}; ${M}; ${M}`,
            dur: n,
            calcMode: "spline",
            keySplines: "0 0 0 1; 0 0 1 1; 0 0 1 1",
            repeatCount: "indefinite"
        }), s.jsx("animate", {
            begin: D,
            attributeName: "opacity",
            from: "0.8",
            to: "0",
            values: "0.8; 0.05; 0; 0; 0",
            dur: n,
            repeatCount: "indefinite"
        })]
    })
      , I = () => l && s.jsx("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: `0 ${w} ${w}`,
        to: `360 ${w} ${w}`,
        dur: n,
        repeatCount: "indefinite"
    });
    return s.jsx("div", {
        className: "relative flex size-8 items-center justify-center overflow-visible",
        children: s.jsxs("svg", {
            width: a,
            height: a,
            viewBox: `0 0 ${a} ${a}`,
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            ref: t,
            className: "pointer-events-none absolute",
            ...e,
            children: [s.jsx("defs", {
                children: l && c && s.jsxs("linearGradient", {
                    id: "target-gradient",
                    x1: "0",
                    y1: "0",
                    x2: "1",
                    y2: "1",
                    children: [s.jsx("stop", {
                        offset: "0%",
                        stopColor: c.from,
                        children: s.jsx("animate", {
                            attributeName: "stop-color",
                            values: `${c.from}; ${c.to}; ${c.via}; ${c.from}`,
                            dur: n,
                            repeatCount: "indefinite"
                        })
                    }), s.jsx("stop", {
                        offset: "50%",
                        stopColor: c.via,
                        children: s.jsx("animate", {
                            attributeName: "stop-color",
                            values: `${c.via}; ${c.from}; ${c.to}; ${c.via}`,
                            dur: n,
                            repeatCount: "indefinite"
                        })
                    }), s.jsx("stop", {
                        offset: "100%",
                        stopColor: c.to,
                        children: s.jsx("animate", {
                            attributeName: "stop-color",
                            values: `${c.to}; ${c.via}; ${c.from}; ${c.to}`,
                            dur: n,
                            repeatCount: "indefinite"
                        })
                    })]
                })
            }), s.jsx("defs", {
                children: s.jsxs("mask", {
                    id: "cutout",
                    children: [s.jsx("rect", {
                        width: "100%",
                        height: "100%",
                        fill: "white"
                    }), s.jsx("circle", {
                        r: u,
                        cx: w,
                        cy: w,
                        fill: "black",
                        children: g({
                            inset: m
                        })
                    })]
                })
            }), s.jsxs("g", {
                mask: "url(#cutout)",
                children: [s.jsx("circle", {
                    cx: w,
                    cy: w,
                    r: u + m,
                    fill: h,
                    vectorEffect: "non-scaling-stroke",
                    children: g({})
                }), s.jsx("circle", {
                    cx: w,
                    cy: w,
                    r: k,
                    opacity: "0.3",
                    fill: h,
                    fillOpacity: "0.4",
                    stroke: v,
                    vectorEffect: "non-scaling-stroke",
                    children: _({
                        size: k,
                        delay: .3
                    })
                }), s.jsx("circle", {
                    cx: w,
                    cy: w,
                    r: b,
                    opacity: "0.3",
                    fill: h,
                    fillOpacity: "0.2",
                    stroke: v,
                    vectorEffect: "non-scaling-stroke",
                    children: _({
                        size: b
                    })
                }), I()]
            })]
        })
    })
}
)
  , br = ({element: e, subtreeEnabled: t, isPinning: r}) => {
    const [n,i] = d.useState({
        x: 0,
        y: 0
    })
      , [a,c] = d.useState(!1)
      , l = () => {
        if (e) {
            const {x: u, y: m} = e.getBoundingClientRect();
            i({
                x: u,
                y: m
            })
        }
    }
    ;
    return d.useEffect( () => {
        if (!e || r) {
            c(!1),
            i({
                x: 0,
                y: 0
            });
            return
        }
        l();
        const u = new IntersectionObserver(g => {
            const _ = g[0];
            c(_.isIntersecting),
            _.isIntersecting && l()
        }
        ,{
            threshold: [0]
        });
        u.observe(e);
        const m = [];
        let h = e.parentElement;
        for (; h; ) {
            const {overflowY: g} = window.getComputedStyle(h);
            (g === "auto" || g === "scroll") && (m.push(h),
            h.addEventListener("scroll", l)),
            h = h.parentElement
        }
        window.addEventListener("scroll", l, {
            passive: !0
        }),
        window.addEventListener("resize", l);
        const v = new ResizeObserver( () => {
            l()
        }
        );
        v.observe(e);
        let w = e.parentElement;
        for (; w; )
            v.observe(w),
            w = w.parentElement;
        const k = new MutationObserver( () => {
            l()
        }
        );
        let b = e;
        for (; b; )
            k.observe(b, {
                attributes: !0,
                childList: !0,
                subtree: t
            }),
            b = b.parentElement;
        return () => {
            u.disconnect(),
            v.disconnect(),
            k.disconnect(),
            window.removeEventListener("scroll", l),
            window.removeEventListener("resize", l),
            m.forEach(g => {
                g.removeEventListener("scroll", l)
            }
            )
        }
    }
    , [e, r]),
    {
        position: n,
        isVisible: a
    }
}
  , vr = ({className: e}) => s.jsxs("div", {
    className: re("h-[20px] px-1.5 py-2 bg-gradient-to-r from-brand-600/20 to-cyan-400/20 rounded-md inline-flex justify-center items-center gap-1", e),
    children: [s.jsx(le, {
        icon: hl,
        className: "text-cyan-400 size-3"
    }), s.jsx("div", {
        className: "text-center justify-start text-white/90 text-xs font-medium font-['Public_Sans'] leading-[10px]",
        children: "Suggested step"
    })]
})
  , yu = ({targetHovered: e, modalInstruction: t, isClickContainerVisible: r}) => {
    const [n,i] = d.useState(!1)
      , a = d.useRef(null)
      , c = d.useRef(null)
      , l = d.useRef(null);
    return d.useEffect( () => {
        var h;
        const u = v => {
            var w, k;
            v.stopPropagation(),
            (v.target === (c == null ? void 0 : c.current) || (w = c == null ? void 0 : c.current) != null && w.contains(v.target)) && chrome.runtime.sendMessage({
                messageType: "pauseCopilotFromBrowser",
                source: "ClickTargetModal.tsx"
            }),
            (v.target === (l == null ? void 0 : l.current) || (k = l == null ? void 0 : l.current) != null && k.contains(v.target)) && chrome.runtime.sendMessage({
                messageType: "stopCopilotFromBrowser"
            })
        }
          , m = (h = a.current) == null ? void 0 : h.getRootNode();
        return m && m.addEventListener("mousedown", u),
        () => {
            m && m.removeEventListener("mousedown", u)
        }
    }
    , [a]),
    d.useLayoutEffect( () => {
        const u = () => {
            a.current && requestAnimationFrame( () => {
                if (!a.current)
                    return;
                const m = a.current.getBoundingClientRect()
                  , h = window.innerWidth < Math.ceil(m.right) + 12
                  , v = window.innerWidth - Math.ceil(m.x) - Math.ceil(m.width) * 2 - 56 - 12 > 36;
                !n && h && i(!0),
                n && v && i(!1)
            }
            )
        }
        ;
        return u(),
        window.addEventListener("resize", u),
        () => {
            window.removeEventListener("resize", u)
        }
    }
    , [n, r]),
    s.jsx(qe, {
        children: s.jsx("div", {
            ref: a,
            className: re("pointer-events-auto cursor-default h-20 w-max max-w-[450px] mt-[-12px] pl-3 pr-3.5 py-2 bg-slate-950/75 rounded-xl shadow-[0px_10px_16px_-11px_rgba(2,6,23,0.75)] ring-1 ring-slate-950/75 border border-white/25 backdrop-blur-lg flex-col justify-center items-start gap-1 inline-flex overflow-hidden", {
                "relative right-full mr-4": n,
                "opacity-0": e
            }),
            children: s.jsxs("div", {
                className: "pl-1 flex-col gap-2 flex",
                children: [s.jsx("div", {
                    className: "text-slate-100 text-sm font-medium leading-tight ml-1",
                    children: t || "Click here"
                }), s.jsxs("div", {
                    className: "flex gap-1 items-center",
                    children: [s.jsx(vr, {}), s.jsxs(de, {
                        children: [s.jsx(pe, {
                            children: s.jsx(oe, {
                                "data-testid": "copilot-modal-pause-btn",
                                variant: "ghost",
                                icon: gl,
                                theme: "dark",
                                size: "small",
                                ref: c
                            })
                        }), s.jsx(se, {
                            side: "top",
                            sideOffset: 8,
                            className: "text-xs",
                            variant: "compact",
                            avoidCollisions: !1,
                            children: "Pause"
                        })]
                    }), s.jsxs(de, {
                        children: [s.jsx(pe, {
                            children: s.jsx(oe, {
                                "data-testid": "copilot-modal-stop-btn",
                                variant: "ghost",
                                icon: bl,
                                theme: "dark",
                                size: "small",
                                ref: l
                            })
                        }), s.jsx(se, {
                            side: "top",
                            sideOffset: 8,
                            className: "text-xs",
                            variant: "compact",
                            avoidCollisions: !1,
                            children: "Done"
                        })]
                    })]
                })]
            })
        })
    })
}
  , wu = () => {
    const [e,t] = d.useState(null)
      , [r,n] = d.useState(!1)
      , [i,a] = d.useState("")
      , [c,l] = d.useState(!1)
      , [u,m] = d.useState(!1)
      , h = (e == null ? void 0 : e.element) || null;
    d.useEffect( () => {
        const D = o => {
            if (o.messageType === "highlightElementWithId") {
                if (m(!1),
                Number.isNaN(Number(o.elementId)) || o.url !== window.location.href)
                    return;
                const p = document.querySelector(`[_i_d="${o.elementId}"]`);
                if (p) {
                    t({
                        element: p
                    }),
                    a(o.modalInstruction || "");
                    let f = null;
                    const x = new IntersectionObserver( (E, j) => {
                        E.forEach(C => {
                            C.isIntersecting && (f && (clearTimeout(f),
                            f = null),
                            setTimeout( () => {
                                chrome.runtime.sendMessage({
                                    messageType: "sendScreenshotCoordinates",
                                    data: {
                                        coordinates: p.getBoundingClientRect(),
                                        sessionId: o.sessionId,
                                        requestId: o.requestId
                                    }
                                }),
                                j.disconnect()
                            }
                            , 200))
                        }
                        )
                    }
                    );
                    o.hasScreenshot ? l(!0) : (x.observe(p),
                    f = setTimeout( () => {
                        x.disconnect(),
                        J("copilot_debugging_screenshot_fallback", {
                            elementId: o.elementId,
                            url: window.location.href,
                            messageUrl: o.url,
                            sessionId: o.sessionId,
                            requestId: o.requestId
                        }),
                        chrome.runtime.sendMessage({
                            messageType: "sendScreenshotCoordinates",
                            data: {
                                coordinates: p.getBoundingClientRect(),
                                sessionId: o.sessionId,
                                requestId: o.requestId
                            }
                        })
                    }
                    , 4e3))
                } else
                    J("copilot_debugging_element_not_found", {
                        elementId: o.elementId,
                        url: window.location.href,
                        messageUrl: o.url,
                        sessionId: o.sessionId,
                        requestId: o.requestId
                    }),
                    chrome.runtime.sendMessage({
                        messageType: "getDomForCopilot"
                    })
            }
            if (o.messageType === "getCurrentDom" && window.self === window.top) {
                Mi();
                const p = document.body.outerHTML;
                chrome.runtime.sendMessage({
                    messageType: "currentDomForCopilot",
                    currentDom: p,
                    url: window.location.href,
                    sessionId: o.sessionId
                })
            }
            o.messageType === "removeCopilotClickTarget" && l(!1),
            o.messageType === "screenshotCaptureDone" && (l(!0),
            m(!0))
        }
        ;
        return chrome.runtime.onMessage.addListener(D),
        () => {
            chrome.runtime.onMessage.removeListener(D)
        }
    }
    , []);
    const {isVisible: v} = br({
        element: h,
        subtreeEnabled: !0
    })
      , w = ( () => {
        if (!h)
            return {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
        const D = h.getBoundingClientRect();
        return {
            left: D.left,
            top: D.top,
            width: D.width,
            height: D.height
        }
    }
    )()
      , k = () => {
        const D = w.left + w.width / 2 || 0
          , o = w.top + w.height / 2 || 0;
        return {
            x: D ?? 0,
            y: o ?? 0
        }
    }
      , b = ( () => k())()
      , g = () => n(!0)
      , _ = () => n(!1)
      , I = h && w.width && w.height;
    if (d.useEffect( () => {
        var D;
        I && !v && !u && ((D = e == null ? void 0 : e.element) == null || D.scrollIntoView({
            behavior: "smooth",
            block: "center"
        }))
    }
    , [e, I, v, u]),
    d.useEffect( () => (n(!1),
    h == null || h.addEventListener("mouseenter", g),
    h == null || h.addEventListener("mouseleave", _),
    () => {
        h == null || h.removeEventListener("mouseenter", g),
        h == null || h.removeEventListener("mouseleave", _)
    }
    ), [h]),
    !I)
        return null;
    const M = 16;
    return s.jsx("div", {
        id: "copilot-click-target-container",
        className: "group pointer-events-none absolute z-[999999] cursor-pointer opacity-100 transition-opacity",
        style: {
            position: "absolute",
            top: b.y - M,
            left: b.x - M,
            zIndex: 999999
        },
        children: v && s.jsxs("div", {
            id: "copilot-click-target",
            className: "gap-6",
            style: {
                display: c ? "flex" : "none"
            },
            children: [s.jsx(Ni, {
                sizeIncrease: !0,
                clickTargetColor: {
                    from: "#3AC3FF",
                    via: "#FFFFFF",
                    to: "#6366F1"
                }
            }), s.jsx(yu, {
                targetHovered: r,
                modalInstruction: i,
                isClickContainerVisible: c
            })]
        })
    })
}
  , Oi = () => s.jsxs("div", {
    "aria-hidden": !0,
    className: re("fixed select-none blur-3xl inset-0 z-99 pointer-events-none animate-grow-in-from-right *:[clip-path:ellipse(closest-side_farthest-side)] *:absolute *:mix-blend-overlay *:bg-gradient-to-br"),
    children: [s.jsx("div", {
        className: "top-0 -right-5 w-20 h-[80dvh] from-blue-700/70 via-blue-500/90 to-cyan-500 animate-glow-loader"
    }), s.jsx("div", {
        className: "bottom-0 -right-5 w-20 h-[80dvh] from-blue-700/70 via-blue-500/90 to-cyan-500 animate-glow-loader-2"
    })]
})
  , _u = () => {
    const [e,t] = d.useState(!1);
    return d.useEffect( () => {
        const r = n => {
            n.messageType === "startCopilotGenerating" && t(!0),
            n.messageType === "stopCopilotGenerating" && t(!1)
        }
        ;
        return chrome.runtime.onMessage.addListener(r),
        () => {
            chrome.runtime.onMessage.removeListener(r)
        }
    }
    , []),
    e ? s.jsx(Oi, {}) : null
}
;
function ku(e, ...t) {
    const r = document.getElementById("crxjs-ext")
      , n = c => {
        r.contains(c.target) || (e == null || e(c))
    }
      , i = c => {
        let l = !1;
        t.forEach(u => {
            var m;
            u && ((m = u.contains) != null && m.call(u, c.target)) && (l = !0)
        }
        ),
        l || (e == null || e(t))
    }
      , a = c => {
        let l = null;
        return c.forEach(u => {
            u && u.current && (l = u.current.getRootNode().getElementById("root-scribe-elem"))
        }
        ),
        l
    }
    ;
    d.useEffect( () => {
        const c = a(t);
        return document.addEventListener("mousedown", n),
        c !== null && c.addEventListener("mousedown", i),
        () => {
            document.removeEventListener("mousedown", n),
            c !== null && c.removeEventListener("mousedown", i)
        }
    }
    , t)
}
const Eu = () => {
    const e = d.useMemo( () => {
        const t = window.location && window.location.href ? window.location.href : null;
        if (!t || t.trim() === "")
            return !1;
        const r = new URL(t).origin.split("//");
        return r[r.length - 1] === "mail.google.com"
    }
    , []);
    return s.jsx("div", {
        style: ke.modal,
        onMouseDown: t => {
            t.stopPropagation(),
            chrome.runtime.sendMessage({
                messageType: "closedGmailRecordModal"
            })
        }
        ,
        children: e ? s.jsxs("div", {
            style: ke.outerBoxGmail,
            onMouseDown: t => {
                t.stopPropagation()
            }
            ,
            children: [s.jsx("style", {
                children: `
                            @keyframes MoveUpDown {
                                0%,
                                100% {
                                    margin-right: 12px;
                                    margin-left: 12px;
                                }
                                50% {
                                    margin-right: 8px;
                                    margin-left: 16px;
                                }
                            }

                            @-webkit-keyframes MoveUpDown {
                                from {
                                    margin-bottom: 12px;
                                    margin-top: 12px;
                                }
                                to {
                                    margin-bottom: 8px;
                                    margin-top: 16px;
                                }
                            }`
            }), s.jsxs("div", {
                style: ke.iconsContainer,
                children: [s.jsx("img", {
                    style: ke.extensionInstalledImg,
                    src: "https://colony-labs-public.s3.us-east-2.amazonaws.com/images/logo/extension.svg"
                }), s.jsx("div", {
                    style: ke.arrowGmail,
                    children: s.jsx("svg", {
                        width: "36px",
                        height: "36px",
                        version: "1.2",
                        fill: "#aaaac8",
                        baseProfile: "tiny",
                        viewBox: "0 0 24 24",
                        children: s.jsx("path", {
                            d: "M12 3.172l-6.414 6.414c-.781.781-.781 2.047 0 2.828s2.047.781 2.828 0l1.586-1.586v7.242c0 1.104.895 2 2 2 1.104 0 2-.896 2-2v-7.242l1.586 1.586c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-6.414-6.414z"
                        })
                    })
                }), s.jsx("div", {
                    style: ke.extensionInstalledImg,
                    children: s.jsxs("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "52 42 88 66",
                        width: "26",
                        height: "25",
                        children: [s.jsx("path", {
                            fill: "#4285f4",
                            d: "M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
                        }), s.jsx("path", {
                            fill: "#34a853",
                            d: "M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
                        }), s.jsx("path", {
                            fill: "#fbbc04",
                            d: "M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
                        }), s.jsx("path", {
                            fill: "#ea4335",
                            d: "M72 74V48l24 18 24-18v26L96 92"
                        }), s.jsx("path", {
                            fill: "#c5221f",
                            d: "M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
                        })]
                    })
                })]
            }), s.jsx("div", {
                style: ke.instructionTextContainer,
                children: s.jsx("p", {
                    style: ke.arrowText,
                    children: "Start capturing from the extension and when finished, add it to your Gmail."
                })
            })]
        }) : s.jsxs("div", {
            style: ke.outerBox,
            onMouseDown: t => {
                t.stopPropagation()
            }
            ,
            children: [s.jsx("style", {
                children: `
                            @keyframes MoveUpDown {
                                0%,
                                100% {
                                    margin-bottom: 12px;
                                    margin-top: 12px;
                                }
                                50% {
                                    margin-bottom: 8px;
                                    margin-top: 16px;
                                }
                            }

                            @-webkit-keyframes MoveUpDown {
                                from {
                                    margin-bottom: 12px;
                                    margin-top: 12px;
                                }
                                to {
                                    margin-bottom: 8px;
                                    margin-top: 16px;
                                }
                            }`
            }), s.jsx("div", {
                style: ke.arrow,
                children: s.jsx("svg", {
                    width: "36px",
                    height: "36px",
                    version: "1.2",
                    fill: "#aaaac8",
                    baseProfile: "tiny",
                    viewBox: "0 0 24 24",
                    children: s.jsx("path", {
                        d: "M12 3.172l-6.414 6.414c-.781.781-.781 2.047 0 2.828s2.047.781 2.828 0l1.586-1.586v7.242c0 1.104.895 2 2 2 1.104 0 2-.896 2-2v-7.242l1.586 1.586c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-6.414-6.414z"
                    })
                })
            }), s.jsx("img", {
                style: ke.extensionInstalledImg,
                src: "https://colony-labs-public.s3.us-east-2.amazonaws.com/images/logo/extension.svg"
            }), s.jsx("div", {
                style: ke.instructionTextContainer,
                children: s.jsx("p", {
                    style: ke.arrowText,
                    children: "Click the extension, start capturing, and then do the steps you want to appear in your guide."
                })
            })]
        })
    })
}
  , qt = {
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(6px)",
        zIndex: "100",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all"
    },
    outerBox: {
        position: "fixed",
        top: "16px",
        right: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "white",
        width: "192px",
        boxShadow: "4px 4px 16px 4px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        boxSizing: "content-box",
        padding: "20px 16px"
    },
    iconsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignOtems: "center"
    },
    arrow: {
        color: "#aaaac8",
        animation: "MoveUpDown 1s linear infinite"
    },
    arrowText: {
        marginTop: "16px",
        fontSize: "16px",
        textAlign: "center",
        fontFamily: "Mulish, sans-serif"
    },
    extensionInstalledImg: {
        width: "38px",
        height: "38px",
        minWidth: "38px",
        minHeight: "38px",
        boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.3)",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    instructionTextContainer: {
        overflowY: "hidden",
        fontSize: "16px"
    }
}
  , ke = {
    ...qt,
    outerBoxGmail: {
        ...qt.outerBox
    },
    outerBox: {
        ...qt.outerBox,
        paddingTop: "8px"
    },
    arrow: {
        ...qt.arrow
    },
    arrowGmail: {
        ...qt.arrow,
        transform: "rotate(90deg)"
    }
};
function Cu(e, t) {
    const r = {
        leading: !0,
        trailing: !0
    }
      , n = d.useRef(e);
    return d.useEffect( () => {
        n.current = e
    }
    ),
    d.useCallback(Qn.debounce( (...i) => n.current(...i), t, r), [t])
}
function ju(e, t) {
    const [r,n] = d.useState(e)
      , i = Cu(n, t);
    return [r, i]
}
const xr = e => {
    e.nativeEvent.stopImmediatePropagation(),
    e.stopPropagation()
}
  , Di = e => {
    e.nativeEvent.stopImmediatePropagation(),
    e.stopPropagation()
}
  , Su = ({initialValue: e, onChange: t}) => {
    const [r,n] = d.useState(e || "");
    return s.jsxs("div", {
        className: "w-full flex items-center justify-start relative",
        children: [s.jsx("div", {
            className: "absolute right-4 top-0 h-full flex flex-col items-center justify-center",
            children: s.jsx(le, {
                icon: _c,
                className: "text-brand-500 w-5 h-5"
            })
        }), s.jsx("input", {
            autoFocus: !0,
            type: "text",
            className: "[all:unset] bg-white text-slate-500 py-0 px-1 pl-[18px] w-full h-10 rounded-lg border border-slate-200 text-base font-normal font-sans",
            placeholder: "Search all...",
            value: r,
            onChange: i => {
                const a = i.target.value;
                n(a),
                t(a)
            }
            ,
            onMouseDown: xr,
            onMouseUp: xr,
            onClick: xr,
            onKeyDown: Di,
            onKeyUp: Di
        })]
    })
}
  , Tu = e => {
    const [t,r] = d.useState(!1);
    return s.jsxs("div", {
        style: {
            ...Gt.listItem,
            ...t ? Gt.hovered : {},
            ...e.selectedScribe && e.selectedScribe.id === e.item.id ? Gt.selected : {}
        },
        onClick: () => {
            e.setSelectedScribe(e.item)
        }
        ,
        onMouseEnter: () => {
            r(!0)
        }
        ,
        onMouseLeave: () => {
            r(!1)
        }
        ,
        children: [s.jsx("div", {
            style: Gt.listTitle,
            children: e.item.name
        }), s.jsx("div", {
            style: Gt.additionalInfo,
            children: e.item.author
        })]
    })
}
  , Gt = {
    listItem: {
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 24px)",
        textAlign: "left"
    },
    selected: {
        backgroundColor: "#e0e7ff"
    },
    hovered: {
        transition: "ease 0.4s",
        backgroundColor: "#e0e7ff",
        backgroundOpacity: "0.5"
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "17px",
        marginBottom: "2px",
        fontFamily: "Pro-Sans, sans-serif",
        color: "#1e293b"
    },
    additionalInfo: {
        opacity: "0.7",
        fontSize: "12px",
        fontFamily: "Pro-Sans, sans-serif"
    }
}
  , Pu = 45
  , Iu = 6
  , Ru = () => {
    const e = Xo()
      , {userData: t} = X(zt)
      , {scribes: r, isLoading: n, loadedAll: i} = X(Os)
      , [a,c] = d.useState(!1)
      , [l,u] = ju("", 600)
      , [m,h] = d.useState(!1)
      , [v,w] = d.useState(!1)
      , [k,b] = d.useState(!1)
      , g = Qn.throttle( () => {
        !i && !n && e(Bo({
            searchQuery: l,
            skip: r.length
        }))
    }
    , 1e3, {
        leading: !0
    });
    d.useEffect( () => {
        if (t) {
            const I = e(Bo({
                searchQuery: l
            }));
            return I.then( () => {
                h(!0)
            }
            ),
            () => {
                I.abort()
            }
        }
    }
    , [l]),
    d.useEffect( () => {
        const I = a ? r.find(M => M.id === a.id) : void 0;
        c(I)
    }
    , [r]);
    const _ = () => {
        chrome.runtime.sendMessage({
            messageType: "closedGmailSelectModal"
        }),
        e(As())
    }
    ;
    return s.jsx("div", {
        style: je.modal,
        onMouseDown: I => {
            !v && _(),
            I.stopPropagation()
        }
        ,
        children: s.jsxs("div", {
            style: je.outerBox,
            onMouseDown: I => {
                I.stopPropagation()
            }
            ,
            children: [v && s.jsx("div", {
                style: je.loadingOverlay,
                onMouseDown: I => {
                    I.stopPropagation()
                }
            }), s.jsx("div", {
                style: je.container,
                children: t ? s.jsx("div", {
                    style: je.loggedIn,
                    children: m ? s.jsxs("div", {
                        style: je.loggedIn,
                        children: [s.jsx("div", {
                            style: je.modalTitle,
                            children: "Select a Scribe"
                        }), s.jsx(Su, {
                            onChange: I => {
                                k && b(!1),
                                u(I)
                            }
                        }), s.jsx("div", {
                            style: je.listItems,
                            onScroll: I => {
                                const {clientHeight: M, scrollTop: D, scrollHeight: o} = I.target;
                                o - D - M < Pu * Iu && g()
                            }
                            ,
                            children: r.map(I => s.jsx(Tu, {
                                item: I,
                                selectedScribe: a,
                                setSelectedScribe: M => {
                                    k && b(!1),
                                    c(M)
                                }
                            }, I.id))
                        }), s.jsxs("div", {
                            style: je.buttonRow,
                            children: [s.jsx(oe, {
                                variant: "secondary",
                                onClick: () => {
                                    chrome.runtime.sendMessage({
                                        messageType: "widgetCancelModal"
                                    }),
                                    _()
                                }
                                ,
                                children: "Cancel"
                            }), s.jsx(oe, {
                                variant: "primary",
                                disabled: !a,
                                onClick: () => {
                                    w(!0),
                                    b(!1),
                                    Ds.exportScribeDocument(a.id, "html").then(async I => {
                                        const M = await Il(a.id, a.name, !1, a.type)
                                          , D = {
                                            messageType: "widgetSelectedFromModal",
                                            scribe_id: a.id,
                                            url: M,
                                            name: a.name,
                                            html: I.data.exported_data
                                        };
                                        chrome.runtime.sendMessage(D, o => {
                                            o ? _() : b(!0),
                                            w(!1)
                                        }
                                        )
                                    }
                                    ).catch(I => {
                                        b(!0),
                                        w(!1)
                                    }
                                    )
                                }
                                ,
                                children: "Insert selected"
                            })]
                        }), k && s.jsx("div", {
                            style: je.errorMessage,
                            children: "There was an error. Please try again."
                        })]
                    }) : s.jsx("div", {
                        style: je.loader,
                        children: s.jsx(Ko, {
                            size: 40,
                            color: "rgb(165, 180, 252)",
                            loading: !0
                        })
                    })
                }) : s.jsx("div", {
                    style: je.notLoggedIn,
                    children: "Please log in to proceed"
                })
            })]
        })
    })
}
  , je = {
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(6px)",
        zIndex: "100",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all"
    },
    outerBox: {
        position: "relative",
        display: "inline-block",
        borderRadius: "8px",
        width: "420px",
        height: "480px",
        boxShadow: "4px 4px 16px 4px rgba(0, 0, 0, 0.4)",
        overflow: "hidden",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "content-box",
        padding: "16px"
    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    modalTitle: {
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "12px",
        marginLeft: "4px",
        textAlign: "left",
        fontFamily: "Pro-Sans, sans-serif",
        color: "#1e293b"
    },
    inner: {
        display: "flex",
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },
    loader: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    listItems: {
        flex: 1,
        overflow: "scroll",
        width: "100%",
        paddingTop: 8
    },
    loggedIn: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "white",
        flex: 1,
        height: "100%",
        width: "100%",
        overflow: "visible"
    },
    buttonRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "4px 0px",
        margin: "auto",
        overflow: "visible",
        marginTop: "12px"
    },
    cancelButton: {
        backgroundColor: "#e04340"
    },
    searchBar: {
        height: "30px"
    },
    searchBarInner: {
        background: "transparent"
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 5,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: .43,
        pointerEvents: "all"
    },
    errorMessage: {
        fontFamily: "Pro-Sans, sans-serif",
        height: "20px",
        color: "#e04340",
        fontSize: "12px",
        marginLeft: "4px",
        marginTop: "12px",
        textAlign: "left"
    }
}
  , Ai = e => {
    try {
        return new URL(e),
        !0
    } catch {
        return !1
    }
}
  , Li = e => e.replace(/\/+$/, "")
  , yr = e => {
    if (typeof e != "string" || !Ai(e))
        return "";
    try {
        const t = new URL(e);
        return t.hash = "",
        Li(t.toString())
    } catch {
        return ""
    }
}
  , Mu = e => {
    if (typeof e != "string" || !Ai(e))
        return "";
    try {
        const t = new URL(e);
        return t.search = "",
        Li(t.toString())
    } catch {
        return ""
    }
}
  , Fi = e => {
    const t = Mu(e);
    return t ? yr(t) : ""
}
  , Wt = d.forwardRef( ({x: e, y: t, color: r, animate: n=!1, shape: i="circle", enablePointerEvents: a=!1, enableDragging: c=!1, isHovered: l=!1, inCluster: u=!1, inClusterContainer: m=!1, logoUrl: h, onDragStart: v, onDrag: w, onDragEnd: k, onMouseEnter: b, onMouseLeave: g}, _) => {
    const I = d.useRef(null)
      , M = N => {
        I.current = N,
        _ && (typeof _ == "function" ? _(N) : _.current = N)
    }
      , [D,o] = d.useState(!1)
      , [p,f] = d.useState({
        x: e,
        y: t
    })
      , x = X(Jn);
    d.useEffect( () => {
        D || f({
            x: e,
            y: t
        })
    }
    , [e, t, D]),
    d.useEffect( () => {
        const N = y => {
            document.body.style.cursor = y;
            const O = A => {
                A.querySelectorAll("iframe").forEach(L => {
                    var z;
                    try {
                        const F = L.contentDocument || ((z = L.contentWindow) == null ? void 0 : z.document);
                        F && F.body && (F.body.style.cursor = y,
                        O(F))
                    } catch (F) {
                        console.warn("Cannot access iframe content for cursor styling:", F)
                    }
                }
                )
            }
            ;
            O(document)
        }
        ;
        if (D)
            return N("grabbing"),
            () => {
                N("")
            }
    }
    , [D]),
    d.useEffect( () => {
        if (!c)
            return;
        const N = I.current;
        if (!N)
            return;
        const y = O => {
            O.preventDefault(),
            O.stopPropagation(),
            O.stopImmediatePropagation();
            const A = {
                x: O.clientX - 8,
                y: O.clientY - 8
            };
            f(A),
            o(!0),
            v == null || v(A)
        }
        ;
        return N.addEventListener("mousedown", y),
        () => N.removeEventListener("mousedown", y)
    }
    , [c, v]),
    d.useEffect( () => {
        if (!D)
            return;
        const N = A => {
            const L = {
                x: A.clientX - 8,
                y: A.clientY - 8
            };
            f(L),
            w == null || w(L)
        }
          , y = A => {
            A.preventDefault(),
            A.stopPropagation(),
            A.stopImmediatePropagation(),
            o(!1),
            k == null || k(p, A)
        }
          , O = [];
        return window.addEventListener("mousemove", N),
        window.addEventListener("mouseup", y),
        Rl(document, O, {
            eventTypes: ["mousemove", "mouseup"],
            createHandlers: (A, L) => ({
                mousemove: z => {
                    const F = {
                        x: z.clientX + A,
                        y: z.clientY + L
                    };
                    f(F),
                    w == null || w(F)
                }
                ,
                mouseup: z => {
                    const F = new MouseEvent("mouseup",{
                        ...z,
                        clientX: z.clientX + A,
                        clientY: z.clientY + L
                    });
                    Object.defineProperty(F, "target", {
                        value: z.target,
                        enumerable: !0,
                        configurable: !0
                    }),
                    Object.defineProperty(F, "offsetX", {
                        value: z.offsetX,
                        enumerable: !0,
                        configurable: !0
                    }),
                    Object.defineProperty(F, "offsetY", {
                        value: z.offsetY,
                        enumerable: !0,
                        configurable: !0
                    }),
                    o(!1),
                    k == null || k(p, F)
                }
            })
        }),
        () => {
            window.removeEventListener("mousemove", N),
            window.removeEventListener("mouseup", y),
            Ml(O, ["mousemove", "mouseup"])
        }
    }
    , [D, p, w, k]);
    const E = ( () => {
        switch (i) {
        case "circle":
            return er;
        default:
            return er
        }
    }
    )()
      , j = () => {
        D || (b == null || b())
    }
      , C = () => {
        g == null || g()
    }
      , S = d.useCallback( (N, y) => {
        const O = I.current;
        if (!O)
            return null;
        const A = O.style.pointerEvents;
        O.style.pointerEvents = "none";
        try {
            return document.elementFromPoint(N, y)
        } finally {
            O.style.pointerEvents = A
        }
    }
    , [])
      , T = d.useCallback( (N, y, O, A) => {
        const L = N;
        if (typeof L.click == "function") {
            L.click();
            return
        }
        const z = new MouseEvent("click",{
            bubbles: !0,
            cancelable: !0,
            composed: !0,
            clientX: y,
            clientY: O,
            view: A
        });
        N.dispatchEvent(z)
    }
    , [])
      , P = d.useCallback(N => {
        var O;
        if (D || c)
            return;
        const y = S(N.clientX, N.clientY);
        if (y) {
            if (y instanceof HTMLIFrameElement)
                try {
                    const A = y.contentDocument || ((O = y.contentWindow) == null ? void 0 : O.document);
                    if (A) {
                        const L = y.getBoundingClientRect()
                          , z = N.clientX - L.left
                          , F = N.clientY - L.top
                          , B = A.elementFromPoint(z, F);
                        if (B) {
                            T(B, z, F, y.contentWindow || window),
                            N.preventDefault(),
                            N.stopPropagation();
                            return
                        }
                    }
                } catch {}
            T(y, N.clientX, N.clientY, window),
            N.preventDefault(),
            N.stopPropagation()
        }
    }
    , [T, S, c, D])
      , R = h ? Nl : Ol;
    return s.jsxs("div", {
        ref: M,
        style: {
            position: D ? "fixed" : m ? "absolute" : "fixed",
            top: p.y,
            left: p.x,
            width: `${R}px`,
            height: `${R}px`,
            zIndex: 1e5 - 2,
            pointerEvents: a && !D && !x ? "auto" : "none",
            transform: l ? "scale(1.5)" : "scale(1)",
            opacity: l && !D ? .5 : 1,
            transformOrigin: "center center",
            transition: "transform 0.4s ease-in-out",
            cursor: D ? "grabbing" : c ? "grab" : "pointer",
            visibility: u ? "hidden" : "visible"
        },
        onMouseEnter: j,
        onMouseLeave: C,
        onClickCapture: P,
        children: [n && s.jsx(le, {
            style: {
                color: r,
                width: `${R}px`,
                height: `${R}px`,
                position: "absolute",
                top: 0,
                left: 0
            },
            icon: E,
            size: "lg",
            className: "animate-ping opacity-75"
        }), h ? s.jsx("img", {
            src: h,
            alt: "Organization logo",
            style: {
                width: `${R}px`,
                height: `${R}px`,
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "50%",
                border: `2px solid ${r}`
            }
        }) : s.jsx(le, {
            style: {
                color: r,
                width: `${R}px`,
                height: `${R}px`,
                position: "absolute",
                top: 0,
                left: 0
            },
            icon: E,
            size: "lg"
        })]
    })
}
)
  , zi = (e, t=document, r=0, n=0) => {
    var a;
    if (e === t)
        return {
            offsetX: r,
            offsetY: n
        };
    const i = t.querySelectorAll("iframe");
    for (const c of i)
        try {
            const l = c.contentDocument || ((a = c.contentWindow) == null ? void 0 : a.document);
            if (!l)
                continue;
            if (l === e) {
                const g = c.getBoundingClientRect()
                  , _ = window.getComputedStyle(c)
                  , I = parseFloat(_.borderLeftWidth) || 0
                  , M = parseFloat(_.borderTopWidth) || 0
                  , D = parseFloat(_.paddingLeft) || 0
                  , o = parseFloat(_.paddingTop) || 0;
                return {
                    offsetX: r + g.left + I + D,
                    offsetY: n + g.top + M + o
                }
            }
            const u = c.getBoundingClientRect()
              , m = window.getComputedStyle(c)
              , h = parseFloat(m.borderLeftWidth) || 0
              , v = parseFloat(m.borderTopWidth) || 0
              , w = parseFloat(m.paddingLeft) || 0
              , k = parseFloat(m.paddingTop) || 0
              , b = zi(e, l, r + u.left + h + w, n + u.top + v + k);
            if (b.offsetX !== 0 || b.offsetY !== 0 || e === l)
                return b
        } catch {
            continue
        }
    return {
        offsetX: 0,
        offsetY: 0
    }
}
  , Nu = (e, t, r) => {
    const n = r.elementFromPoint(e, t);
    if (!n)
        return null;
    const i = n.getBoundingClientRect();
    let a = 0
      , c = 0;
    if (r !== document) {
        const {offsetX: l, offsetY: u} = zi(r);
        a = l,
        c = u
    } else if (n.tagName === "IFRAME") {
        const l = n
          , u = Zo(l);
        if (u) {
            const m = l.getBoundingClientRect()
              , h = e - m.left
              , v = t - m.top
              , w = u.elementFromPoint(h, v);
            if (w) {
                const k = w.getBoundingClientRect();
                return {
                    element: w,
                    left: k.left + m.left,
                    top: k.top + m.top,
                    width: k.width,
                    height: k.height
                }
            }
        }
    }
    return {
        element: n,
        left: i.left + a,
        top: i.top + c,
        width: i.width,
        height: i.height
    }
}
  , Ou = (e, t) => {
    const [r,n] = d.useState({
        x: e.x + 12,
        y: e.y + 12
    });
    return d.useLayoutEffect( () => {
        t.current && requestAnimationFrame( () => {
            if (!t.current)
                return;
            const i = t.current.getBoundingClientRect()
              , a = 12
              , c = 12;
            let l = e.x + c
              , u = e.y + c;
            l + i.width > window.innerWidth - a && (l = e.x - c - i.width),
            u + i.height > window.innerHeight - a && (u = e.y - c - i.height),
            l < a && (l = a),
            u < a && (u = a),
            n({
                x: l,
                y: u
            })
        }
        )
    }
    , [e.x, e.y, t]),
    r
}
  , Du = ({mousePos: e, color: t, pinShiftClickThrough: r, logoUrl: n}) => {
    const i = d.useRef(null)
      , a = d.useRef(null)
      , c = Ou(e, i);
    return s.jsxs(s.Fragment, {
        children: [s.jsx(Wt, {
            ref: a,
            x: e.x - 8,
            y: e.y - 8,
            animate: !0,
            color: t,
            logoUrl: n
        }), s.jsx("div", {
            ref: i,
            className: "absolute text-white pt-2 pl-3 pr-3 pb-3 rounded-xl text-xs border-2 border-slate-700",
            style: {
                left: c.x,
                top: c.y,
                zIndex: 999999,
                backgroundColor: "#020617CC",
                width: "max-content",
                borderColor: "#636671",
                transition: "left 0.03s ease, top 0.03s ease",
                willChange: "left, top",
                visibility: r ? "hidden" : "visible"
            },
            children: s.jsxs("div", {
                className: "flex flex-col gap-1",
                children: [s.jsx("p", {
                    style: {
                        marginBottom: 0,
                        marginTop: 0
                    },
                    className: "text-sm font-medium",
                    children: "Click anywhere to pin"
                }), s.jsxs("div", {
                    className: "flex flex-row gap-2 text-slate-400",
                    children: [s.jsx(gi, {
                        theme: "dark",
                        children: "SHIFT + CLICK"
                    }), "navigate ", s.jsx(gi, {
                        theme: "dark",
                        children: "ESC"
                    }), " cancel"]
                })]
            })
        })]
    })
}
  , wr = ({onPinDrop: e, isDragging: t=!1, pinShiftClickThrough: r=!1, color: n, isUpdatingPin: i=!1, logoUrl: a}) => {
    const [c,l] = d.useState( () => {
        const k = typeof window < "u" ? window.innerWidth : 0
          , b = typeof window < "u" ? window.innerHeight : 0;
        return {
            x: Math.floor(k / 2),
            y: Math.floor(b / 2)
        }
    }
    )
      , u = d.useRef(null)
      , m = (k, b, g, _) => {
        u.current && (u.current.style.display = "block",
        u.current.style.left = `${k}px`,
        u.current.style.top = `${b}px`,
        u.current.style.width = `${g}px`,
        u.current.style.height = `${_}px`)
    }
      , h = (k, b, g=document) => {
        const _ = Nu(k, b, g);
        _ && m(_.left, _.top, _.width, _.height)
    }
      , v = (k, b, g) => _ => {
        const I = _.clientX + b
          , M = _.clientY + g;
        l({
            x: I,
            y: M
        }),
        h(_.clientX, _.clientY, k)
    }
      , w = (k, b, g, _=0, I=0) => {
        k.querySelectorAll("iframe").forEach(M => {
            const D = Zo(M);
            if (!D)
                return;
            const o = M.getBoundingClientRect()
              , p = _ + o.left
              , f = I + o.top
              , x = v(D, p, f)
              , E = j => {
                if (r && j.shiftKey) {
                    const S = j.target;
                    if (!S)
                        return;
                    if (S.tagName === "BUTTON" || S.getAttribute("role") === "button") {
                        Object.defineProperty(j, "shiftKey", {
                            value: !1,
                            writable: !1,
                            configurable: !0
                        });
                        return
                    }
                    const T = S.closest("a");
                    if (T && T.href) {
                        window.open(T.href, "_self");
                        return
                    }
                }
                j.preventDefault(),
                j.stopPropagation(),
                j.stopImmediatePropagation();
                const C = new MouseEvent("click",{
                    clientX: j.clientX + p,
                    clientY: j.clientY + f,
                    button: j.button,
                    buttons: j.buttons,
                    shiftKey: j.shiftKey,
                    ctrlKey: j.ctrlKey,
                    altKey: j.altKey,
                    metaKey: j.metaKey
                });
                Object.defineProperty(C, "target", {
                    value: j.target,
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(C, "offsetX", {
                    value: j.offsetX,
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(C, "offsetY", {
                    value: j.offsetY,
                    enumerable: !0,
                    configurable: !0
                }),
                g(C)
            }
            ;
            D.addEventListener("mousemove", x),
            D.addEventListener("click", E, {
                capture: !0
            }),
            b.push({
                iframeWindow: M.contentWindow,
                mouseHandler: x,
                clickHandler: E
            }),
            w(D, b, g, p, f)
        }
        )
    }
    ;
    return d.useEffect( () => {
        const k = _ => {
            l({
                x: _.clientX,
                y: _.clientY
            }),
            h(_.clientX, _.clientY)
        }
          , b = _ => {
            if (r) {
                if (_.shiftKey && _.target instanceof HTMLElement) {
                    _.preventDefault(),
                    _.stopPropagation(),
                    _.stopImmediatePropagation();
                    const I = _.target.closest("a");
                    if (I && I.href) {
                        window.open(I.href, "_self");
                        return
                    }
                    const M = _.target.closest('button, [role="button"], [onclick]');
                    if (M) {
                        setTimeout( () => {
                            M.click()
                        }
                        , 0);
                        return
                    }
                    setTimeout( () => {
                        var o;
                        const D = new MouseEvent("click",{
                            bubbles: !0,
                            cancelable: !0,
                            view: _.view,
                            detail: _.detail,
                            screenX: _.screenX,
                            screenY: _.screenY,
                            clientX: _.clientX,
                            clientY: _.clientY,
                            ctrlKey: _.ctrlKey,
                            altKey: _.altKey,
                            shiftKey: !1,
                            metaKey: _.metaKey,
                            button: _.button,
                            buttons: _.buttons,
                            relatedTarget: _.relatedTarget
                        });
                        (o = _.target) == null || o.dispatchEvent(D)
                    }
                    , 0);
                    return
                }
                return
            }
            _.preventDefault(),
            _.stopPropagation(),
            _.stopImmediatePropagation(),
            e == null || e(_)
        }
          , g = [];
        return window.addEventListener("mousemove", k),
        window.addEventListener("click", b, {
            capture: !0
        }),
        w(document, g, b),
        () => {
            window.removeEventListener("mousemove", k),
            window.removeEventListener("click", b, {
                capture: !0
            }),
            u.current && (u.current.style.display = "none"),
            g.forEach( ({iframeWindow: _, mouseHandler: I, clickHandler: M}) => {
                try {
                    _ == null || _.document.removeEventListener("mousemove", I),
                    _ == null || _.document.removeEventListener("click", M, {
                        capture: !0
                    })
                } catch (D) {
                    console.warn("Error cleaning up iframe listener:", D)
                }
            }
            )
        }
    }
    , [e]),
    d.useEffect( () => (t || (document.body.style.cursor = "grab"),
    () => {
        t || (document.body.style.cursor = "")
    }
    ), [t]),
    s.jsxs("div", {
        id: "guide-click-target",
        children: [!t && !i && s.jsx(Du, {
            mousePos: c,
            color: n,
            pinShiftClickThrough: r,
            logoUrl: a || null
        }), s.jsx("div", {
            className: "border-rounded-sm",
            ref: u,
            style: {
                position: "absolute",
                border: "solid 3px #FBBF24",
                borderRadius: "8px",
                pointerEvents: "none"
            }
        })]
    })
}
  , Au = 16
  , Lu = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2)
  , Fu = (e, t) => e.pinIds.some(r => t[r] !== void 0 && t[r].pinTargetOnScreen)
  , zu = e => {
    const t = Object.entries(e);
    if (t.length === 0)
        return {
            clusters: {},
            clusteredIds: new Set
        };
    const r = new Set;
    for (let l = 0; l < t.length; l += 1)
        for (let u = l + 1; u < t.length; u += 1) {
            const [m,h] = t[l]
              , [v,w] = t[u];
            Lu(h, w) <= Au && r.add(`${m},${v}`)
        }
    const n = new Set
      , i = {}
      , a = new Set;
    let c = 0;
    return t.forEach( ([l]) => {
        if (n.has(l))
            return;
        const u = [l]
          , m = [l];
        for (n.add(l); m.length > 0; ) {
            const h = m.shift();
            h && t.forEach( ([v]) => {
                !n.has(v) && (r.has(`${h},${v}`) || r.has(`${v},${h}`)) && (n.add(v),
                u.push(v),
                m.push(v))
            }
            )
        }
        if (u.length >= 2) {
            const {totalX: h, totalY: v} = u.reduce( (k, b) => ({
                totalX: k.totalX + e[b].x,
                totalY: k.totalY + e[b].y
            }), {
                totalX: 0,
                totalY: 0
            })
              , w = `cluster-${c}`;
            c += 1,
            i[w] = {
                pinIds: u,
                centerPosition: {
                    x: h / u.length,
                    y: v / u.length
                }
            },
            u.forEach(k => a.add(k))
        }
    }
    ),
    {
        clusters: i,
        clusteredIds: a
    }
}
  , Bu = e => {
    const [t,r] = d.useState({})
      , [n,i] = d.useState({})
      , [a,c] = d.useState(new Set)
      , l = d.useCallback( (h, v, w) => {
        r(k => ({
            ...k,
            [h]: {
                ...v,
                pinTargetOnScreen: w
            }
        }))
    }
    , [])
      , u = d.useCallback(h => Fu(h, t), [t])
      , m = d.useMemo( () => zu(t), [t]);
    return d.useEffect( () => {
        if (!e)
            return;
        const h = new Set(e.map(w => w.id).filter(Boolean))
          , v = Object.keys(t).filter(w => !h.has(w));
        v.length > 0 && r(w => {
            const k = {
                ...w
            };
            return v.forEach(b => {
                delete k[b]
            }
            ),
            k
        }
        )
    }
    , [e, t]),
    d.useEffect( () => {
        i(m.clusters),
        c(m.clusteredIds)
    }
    , [m]),
    {
        pinCoordinates: t,
        pinClusters: n,
        clusteredPinIds: a,
        updatePinCoordinates: l,
        isClusterVisible: u
    }
}
  , ot = () => {
    const [e,t] = d.useState(null);
    return d.useEffect( () => {
        const r = () => {
            const n = dr();
            n && t(n)
        }
        ;
        if (r(),
        !e) {
            const n = new MutationObserver( () => {
                r()
            }
            );
            return n.observe(document.body, {
                childList: !0,
                subtree: !0
            }),
            () => n.disconnect()
        }
    }
    , [e]),
    e
}
  , Bi = ({children: e, onPointerDown: t}) => s.jsx(fc, {
    className: re("group relative p-2 text-slate-500 flex items-start gap-2 max-w-[300px]", {
        "cursor-pointer": t
    }),
    style: {
        background: "#F8FAFC",
        border: "1px solid  #F1F5F9"
    },
    onPointerDown: t,
    children: e
})
  , Hi = ({name: e, author: t, organization: r}) => s.jsxs("div", {
    className: "flex-1 min-w-0",
    children: [s.jsx("div", {
        className: "text-sm font-semibold text-slate-900 mb-1 truncate",
        children: e
    }), s.jsxs("div", {
        className: "flex items-center gap-2 min-w-0",
        children: [s.jsx(Qo, {
            text: r
        }), s.jsx("div", {
            className: "text-xs text-slate-500 truncate flex-1 min-w-0",
            children: t
        })]
    })]
})
  , Hu = 27
  , $i = ({pin: e, deletePin: t, editPin: r}) => {
    var m;
    const n = X(Bt)
      , i = ot()
      , [a,c] = d.useState(!1)
      , l = !!(e.description && e.description.length > Hu)
      , u = h => {
        if (h.button !== 0)
            return;
        const {id: v, url: w} = e.attached_file;
        Ce("pins_document_clicked", {
            pin_id: e.id,
            location: "browser",
            document_id: v
        });
        const k = `${w}?sidepanel=true&referrer=sidekick`;
        chrome.runtime.sendMessage({
            messageType: "openUrlInSidepanel",
            url: k
        })
    }
    ;
    return s.jsx(qe, {
        children: s.jsxs("div", {
            children: [s.jsxs("div", {
                className: "flex items-start justify-between gap-4 mb-4",
                children: [s.jsx("div", {
                    className: "flex-1 min-w-0",
                    children: e.description && s.jsx(s.Fragment, {
                        children: l ? s.jsxs(de, {
                            children: [s.jsx(pe, {
                                children: s.jsx("div", {
                                    className: "text-sm text-gray-900 leading-relaxed text-left line-clamp-2",
                                    children: e.description
                                })
                            }), s.jsx(se, {
                                variant: "compact",
                                className: "w-[300px]",
                                children: s.jsx("p", {
                                    className: "text-xs",
                                    children: e.description
                                })
                            })]
                        }) : s.jsx("div", {
                            className: "text-sm text-gray-900 leading-relaxed text-left line-clamp-2",
                            children: e.description
                        })
                    })
                }), n && Dl(n) && s.jsx("div", {
                    className: "flex-shrink-0 z-[999999]",
                    children: s.jsxs(Al, {
                        children: [s.jsx(Ll, {
                            asChild: !0,
                            children: s.jsx(oe, {
                                variant: "ghost",
                                size: "small",
                                icon: vl,
                                "aria-label": "Pin options",
                                className: "text-slate-600"
                            })
                        }), s.jsxs(Fl, {
                            align: "end",
                            container: i,
                            className: "z-[999999]",
                            children: [s.jsx(Jo, {
                                onSelect: () => r(e.id),
                                icon: kc,
                                children: "Edit Pin"
                            }), s.jsx(Jo, {
                                onSelect: () => c(!0),
                                icon: di,
                                children: "Delete Pin"
                            })]
                        })]
                    })
                })]
            }), e.attached_file && !e.attached_file.error && s.jsxs(Bi, {
                onPointerDown: u,
                children: [s.jsx(ei, {
                    fileType: e.attached_file.type,
                    iconUrl: e.attached_file.contents.icon_url || ""
                }), s.jsx(Hi, {
                    name: e.attached_file.contents.name,
                    author: e.attached_file.contents.author,
                    organization: (m = e.attached_file.contents.organization_owner) == null ? void 0 : m.name
                })]
            }), a && s.jsx(si, {
                open: a,
                onOpenChange: () => c(!1),
                children: s.jsxs(li, {
                    container: i,
                    children: [s.jsx(ci, {
                        title: "Delete Pin",
                        description: zl({
                            pin: e,
                            userTeams: (n == null ? void 0 : n.organizations) || []
                        })
                    }), s.jsx(ui, {
                        primaryAction: {
                            children: "Delete",
                            variant: "danger",
                            onClick: () => t(e.id)
                        },
                        secondaryAction: {
                            children: "Cancel",
                            onClick: () => c(!1)
                        }
                    })]
                })
            })]
        })
    })
}
  , _r = ({pinX: e, pinY: t, isVisible: r, onMouseEnter: n, onMouseLeave: i, enableKeyboardCapture: a=!1, disableAutoPosition: c=!1, positionOverride: l=null, positioning: u="fixed", inClusterStack: m=!1, firstInStack: h=!1, lastInStack: v=!1, children: w}) => {
    const k = d.useRef(null)
      , [b,g] = d.useState(null)
      , _ = ot();
    return d.useEffect( () => {
        if (c) {
            g(null);
            return
        }
        if (k.current && r) {
            const I = k.current.getBoundingClientRect()
              , M = ti({
                pinX: e,
                pinY: t,
                dialogWidth: I.width,
                dialogHeight: I.height,
                horizontalSpacing: 12,
                verticalSpacing: 12,
                tightHorizontalSpacing: 6,
                tightVerticalSpacing: 6
            });
            g(M)
        }
    }
    , [e, t, r, c]),
    d.useEffect( () => {
        if (a && _) {
            const I = ["keydown", "keypress"]
              , M = [];
            return I.forEach(D => {
                const o = p => {
                    p.stopPropagation()
                }
                ;
                _.addEventListener(D, o),
                M.push(o)
            }
            ),
            () => {
                I.forEach( (D, o) => {
                    _.removeEventListener(D, M[o])
                }
                )
            }
        }
    }
    , [a, _]),
    r ? s.jsx("div", {
        ref: k,
        className: re("bg-white p-3", !m && "rounded-lg shadow-lg"),
        style: {
            position: u,
            left: (l == null ? void 0 : l.x) ?? (b == null ? void 0 : b.x) ?? e,
            top: (l == null ? void 0 : l.y) ?? (b == null ? void 0 : b.y) ?? t,
            zIndex: 1e5 - 1,
            width: u === "relative" ? "100%" : "300px",
            visibility: c || b ? "visible" : "hidden",
            pointerEvents: "auto",
            ...m ? {
                boxShadow: "none",
                borderTopLeftRadius: h ? "8px" : void 0,
                borderTopRightRadius: h ? "8px" : void 0,
                borderBottomLeftRadius: v ? "8px" : void 0,
                borderBottomRightRadius: v ? "8px" : void 0,
                borderBottom: v ? void 0 : "2px solid #E2E8F0"
            } : {}
        },
        onMouseEnter: n,
        onMouseLeave: i,
        children: w
    }) : null
}
  , $u = e => {
    const t = {};
    let r = null
      , n = 0;
    return e.forEach(i => {
        const a = i.pin_color;
        if (!a)
            return;
        const c = (t[a] ?? 0) + 1;
        t[a] = c,
        c > n && (n = c,
        r = a)
    }
    ),
    r
}
  , Uu = ({centerPosition: e, pins: t, color: r="#3C2EDD", deletePin: n, editPin: i, editingPin: a, repositionPin: c, onRepositionStart: l, tempPinPosition: u}) => {
    const [m,h] = d.useState(!1)
      , v = d.useRef(null)
      , w = d.useRef(null)
      , k = d.useRef(0)
      , b = d.useRef(!1)
      , [g,_] = d.useState(!1)
      , I = X(Jn)
      , M = a && t.some(T => T.id === a.id);
    d.useEffect( () => {
        b.current = !!M,
        M ? (v.current && (clearTimeout(v.current),
        v.current = null),
        w.current && (clearTimeout(w.current),
        w.current = null),
        h(!0)) : M || (v.current && (clearTimeout(v.current),
        v.current = null),
        w.current && (clearTimeout(w.current),
        w.current = null),
        h(!1))
    }
    , [M]);
    const D = () => {
        M || (t == null || t.forEach(T => {
            var P;
            Ce("pin_hovered", {
                pin_id: T.id,
                location: "browser",
                document_id: (P = T.attached_file) == null ? void 0 : P.id,
                pin_is_clustered: !0
            })
        }
        ),
        w.current && (clearTimeout(w.current),
        w.current = null),
        k.current = Math.max(0, k.current) + 1,
        m || (v.current && clearTimeout(v.current),
        v.current = setTimeout( () => {
            h(!0),
            v.current = null
        }
        , 500)))
    }
      , o = () => {
        M || (k.current = Math.max(0, k.current - 1),
        v.current && (clearTimeout(v.current),
        v.current = null),
        w.current && clearTimeout(w.current),
        w.current = setTimeout( () => {
            k.current === 0 && !b.current && h(!1),
            w.current = null
        }
        , 150))
    }
      , p = (T, P) => u && (a == null ? void 0 : a.id) === T.id ? {
        x: u.x - e.x,
        y: u.y - e.y
    } : P
      , f = $u(t)
      , x = !!(m && !g && !M)
      , E = d.useRef(null)
      , [j,C] = d.useState(0);
    d.useLayoutEffect( () => {
        if (!x)
            return;
        const T = E.current;
        if (!T)
            return;
        const P = () => {
            const N = T.getBoundingClientRect();
            C(N.height)
        }
        ;
        P();
        const R = new ResizeObserver( () => P());
        return R.observe(T),
        () => {
            R.disconnect()
        }
    }
    , [x, t.length]);
    const S = d.useMemo( () => {
        if (!x)
            return null;
        const T = Math.max(j, 0)
          , {x: P} = ti({
            pinX: e.x,
            pinY: e.y,
            dialogWidth: 300,
            dialogHeight: T || 300,
            horizontalSpacing: 12,
            verticalSpacing: 12,
            tightVerticalSpacing: 6
        })
          , R = document.documentElement.clientHeight
          , N = e.y - (T || 300) / 2
          , y = Math.max(0, Math.min(N, R - (T || 300)));
        return {
            x: P,
            y
        }
    }
    , [x, j, e.x, e.y]);
    return s.jsxs(s.Fragment, {
        children: [g && a && t.some(T => T.id === a.id) && s.jsx(wr, {
            isDragging: g,
            color: a.pin_color,
            pinShiftClickThrough: !1,
            isUpdatingPin: !0
        }), s.jsxs("div", {
            style: {
                position: "absolute",
                left: e.x,
                top: e.y,
                zIndex: 1e5 - 1,
                pointerEvents: I || g && a ? "none" : "auto"
            },
            onMouseEnter: M || a ? void 0 : D,
            onMouseLeave: M || a ? void 0 : o,
            children: [!M && s.jsx("div", {
                className: "flex items-center justify-center",
                style: {
                    transform: "scale(1.2)",
                    transformOrigin: "center center"
                },
                children: s.jsx(Wt, {
                    x: 0,
                    y: 0,
                    color: f || r,
                    shape: "circle",
                    animate: !0,
                    enablePointerEvents: !0,
                    isHovered: m,
                    inClusterContainer: !0
                })
            }), x && S && s.jsx("div", {
                className: "shadow-lg rounded-lg",
                style: {
                    position: "fixed",
                    left: S.x,
                    top: S.y,
                    width: 300,
                    zIndex: 1e5 - 1,
                    pointerEvents: I ? "none" : "auto",
                    boxSizing: "border-box"
                },
                onMouseEnter: D,
                onMouseLeave: o,
                children: s.jsx("div", {
                    className: "no-scrollbar",
                    ref: E,
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        width: "100%",
                        maxHeight: 400,
                        overflowY: "auto",
                        overflowX: "hidden"
                    },
                    children: t.map( (T, P) => s.jsx(_r, {
                        pinX: e.x,
                        pinY: e.y,
                        isVisible: !0,
                        disableAutoPosition: !0,
                        positioning: "relative",
                        positionOverride: {
                            x: 0,
                            y: 0
                        },
                        inClusterStack: !0,
                        firstInStack: P === 0,
                        lastInStack: P === t.length - 1,
                        children: s.jsx($i, {
                            pin: T,
                            deletePin: () => n && n({
                                pinId: T.id,
                                location: "browser"
                            }),
                            editPin: R => i && i(R, {
                                x: e.x,
                                y: e.y
                            })
                        })
                    }, T.id))
                })
            }), M && a && s.jsx("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: ( () => {
                        const T = p(a, {
                            x: 0,
                            y: 0
                        });
                        return g ? "none" : `translate(${T.x}px, ${T.y}px)`
                    }
                    )(),
                    transformOrigin: "0 0",
                    transition: g ? "none" : "transform 0.2s ease-out",
                    pointerEvents: I ? "none" : "auto"
                },
                children: s.jsx(Wt, {
                    x: 0,
                    y: 0,
                    color: a.pin_color,
                    shape: "circle",
                    animate: !1,
                    enablePointerEvents: !0,
                    enableDragging: !0,
                    isHovered: !1,
                    inCluster: !1,
                    inClusterContainer: !0,
                    onDragStart: () => {
                        _(!0),
                        v.current && (clearTimeout(v.current),
                        v.current = null),
                        w.current && (clearTimeout(w.current),
                        w.current = null),
                        l && l()
                    }
                    ,
                    onDragEnd: (T, P) => {
                        _(!1),
                        c && c(P)
                    }
                })
            })]
        })]
    })
}
  , Vu = ({baseDomain: e, urlChips: t, setUrlChips: r, originalPathSegments: n}) => {
    const i = d.useRef(new Map)
      , a = ({label: c, onClick: l}) => s.jsx(Zc, {
        onClick: l,
        label: c,
        className: "bg-slate-100 text-slate-900 border-none focus:bg-slate-200"
    });
    return s.jsx("div", {
        className: "group relative mb-2 box-border rounded-md border border-slate-300 bg-white  text-slate-400 outline outline-0 transition-all p-3",
        children: s.jsxs("div", {
            className: "flex flex-wrap gap-2 items-center",
            children: [s.jsxs("span", {
                className: "text-sm break-all flex items-center",
                children: [e, "/"]
            }), t.map( (c, l) => s.jsxs(d.Fragment, {
                children: [l > 0 && s.jsx("span", {
                    className: "text-slate-400",
                    children: "/"
                }), s.jsx(a, {
                    label: c,
                    onClick: () => {
                        r(u => {
                            const m = [...u];
                            if (m[l] === "*") {
                                const h = i.current.get(l) ?? n[l];
                                h !== void 0 && (m[l] = h)
                            } else
                                i.current.set(l, m[l]),
                                m[l] = "*";
                            return m
                        }
                        )
                    }
                })]
            }, l))]
        })
    })
}
  , qu = ({setPinUrl: e, originalUrl: t, pinUrl: r, isEditMode: n, editingPinUrl: i}) => {
    const [a,c] = d.useState(r);
    d.useEffect( () => {
        n || c(r),
        n && i && c(i)
    }
    , [i, n, r]);
    const {pathSegments: l} = d.useMemo( () => ni(t), [t])
      , {baseDomain: u, pathSegments: m} = d.useMemo( () => ni(a), [a])
      , [h,v] = d.useState(m);
    d.useEffect( () => {
        v(m)
    }
    , [m]);
    const w = d.useMemo( () => {
        if (m.length !== h.length)
            return !0;
        for (let _ = 0; _ < m.length; _ += 1)
            if (m[_] !== h[_])
                return !0;
        return !1
    }
    , [m, h])
      , k = () => {
        const _ = `${u}/${h.join("/")}`;
        e(_)
    }
      , b = () => {
        v(m)
    }
      , g = ot();
    return s.jsxs(si, {
        children: [s.jsx(mc, {
            asChild: !0,
            children: s.jsx(tr, {
                tooltipContent: s.jsx(se, {
                    variant: "compact",
                    children: "Edit URL configuration"
                }),
                children: s.jsx(oe, {
                    className: "text-slate-600",
                    icon: xl,
                    variant: "ghost",
                    "aria-label": "Edit URL configuration",
                    size: "small"
                })
            })
        }), s.jsxs(li, {
            container: g,
            children: [s.jsx(ci, {
                title: "Pin visibility configuration",
                description: "Customizing the URL allows the pin to persist and appear on all pages matching the configured URL path."
            }), s.jsxs(hc, {
                children: [s.jsx(Vu, {
                    baseDomain: u,
                    originalPathSegments: l,
                    urlChips: h,
                    setUrlChips: v
                }), s.jsx("div", {
                    className: "text-xs text-slate-500 mb-3",
                    children: "Change URL parameters by clicking on the blocks above."
                })]
            }), s.jsx(ui, {
                primaryAction: {
                    children: "Save",
                    variant: "primary",
                    onClick: k
                },
                secondaryAction: {
                    children: "Cancel",
                    onClick: b
                },
                children: w && s.jsx(oe, {
                    variant: "secondary",
                    "aria-label": "reset",
                    onClick: () => {
                        v(m)
                    }
                    ,
                    children: "Reset"
                })
            })]
        })]
    })
}
  , Gu = ({documentGlobalPermissions: e, pinTeamIds: t, documentTeamId: r}) => e === "private" || e === "team" && !t.some(n => n === r)
  , Wu = ({selectedDocument: e, editingPin: t, selectedTeamIds: r}) => {
    var n, i, a, c;
    return Gu(e ? {
        documentGlobalPermissions: e.global_permission,
        pinTeamIds: r,
        documentTeamId: String((n = e == null ? void 0 : e.organization_owner) == null ? void 0 : n.id) ?? ""
    } : {
        documentGlobalPermissions: (i = t == null ? void 0 : t.attached_file) == null ? void 0 : i.contents.global_permission,
        pinTeamIds: r,
        documentTeamId: String((c = (a = t == null ? void 0 : t.attached_file) == null ? void 0 : a.contents.organization_owner) == null ? void 0 : c.id) ?? ""
    })
}
  , Ui = e => s.jsx(lr, {
    ...e
})
  , Vi = G.forwardRef( (e, t) => s.jsx(bi, {
    ref: t,
    ...e
}))
  , Xu = G.forwardRef( (e, t) => s.jsx(Bl, {
    ref: t,
    ...e
}))
  , qi = G.forwardRef( ({theme: e="dark", children: t, className: r, ...n}, i) => s.jsx(sr, {
    theme: e,
    className: re("z-[100000] w-56 overflow-hidden px-0 py-2", r),
    ref: i,
    ...n,
    children: t
}))
  , Gi = ({showAvatar: e, avatarProps: t, icon: r, childrenClassName: n, children: i, disabled: a}) => s.jsxs(s.Fragment, {
    children: [e && s.jsx("div", {
        className: re("pl-1", {
            "pointer-events-none opacity-50": a
        }),
        children: s.jsx(Qc, {
            size: "xs",
            ...t
        })
    }), r && !e && s.jsx("span", {
        className: "mr-1 size-5 flex-none items-center justify-center pl-1",
        children: s.jsx(le, {
            icon: r,
            className: re(Ul(), "text-sm transition-colors")
        })
    }), s.jsx("span", {
        className: re("w-56 truncate px-1 text-left", n),
        children: i
    })]
})
  , Wi = Fo("group relative flex cursor-pointer select-none min-h-8 px-3 py-1 items-center gap-1 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:text-slate-500 w-full justify-between text-slate-900 bg-white dark:bg-slate-800 focus:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700")
  , kr = G.forwardRef( ({showAvatar: e, avatarProps: t, icon: r, checked: n=!1, menuType: i=mt.Radio, className: a, childrenClassName: c, children: l, onItemSelect: u, onItemKeyDown: m, value: h, disabled: v, ...w}, k) => {
    const b = {
        label: (l == null ? void 0 : l.toString()) || h.toString(),
        checked: n,
        value: h
    }
      , g = () => {
        u == null || u(b)
    }
    ;
    return s.jsxs("div", {
        ref: k,
        className: re(Wi(), a),
        onClick: g,
        onKeyDown: _ => m == null ? void 0 : m(_, b),
        tabIndex: 0,
        role: "button",
        "data-disabled": v,
        ...w,
        children: [i !== mt.Item && s.jsx("div", {
            className: "size-4 flex-none",
            children: n && s.jsx("div", {
                className: "flex size-4 items-center justify-center",
                children: s.jsx(le, {
                    icon: i === mt.Radio ? yl : Yo,
                    className: re(Hl(), "size-3")
                })
            })
        }), s.jsx(Gi, {
            showAvatar: e,
            avatarProps: t,
            icon: r,
            childrenClassName: c,
            disabled: v,
            children: l
        })]
    })
}
);
G.forwardRef( ({showAvatar: e, avatarProps: t, icon: r, className: n, childrenClassName: i, children: a, onClick: c, disabled: l, ...u}, m) => s.jsx("button", {
    ref: m,
    className: re(Wi(), n),
    onClick: c,
    "data-disabled": l,
    ...u,
    children: s.jsx(Gi, {
        showAvatar: e,
        avatarProps: t,
        icon: r,
        childrenClassName: i,
        disabled: l,
        children: a
    })
}));
const Yu = Fo("z-50 overflow-x-hidden max-h-[calc(var(--radix-dropdown-menu-content-available-height)_-_8px)]")
  , Ku = () => s.jsxs("div", {
    className: "flex flex-col space-y-4 px-4 py-2",
    children: [s.jsxs("div", {
        className: "flex items-center space-x-2",
        children: [s.jsx(Ae, {
            className: "h-4 w-8 rounded-md"
        }), s.jsx(Ae, {
            className: "h-4 w-[60%] rounded-md"
        })]
    }), s.jsxs("div", {
        className: "flex items-center space-x-2",
        children: [s.jsx(Ae, {
            className: "h-4 w-8 rounded-md"
        }), s.jsx(Ae, {
            className: "h-4 w-[75%] rounded-md"
        })]
    }), s.jsxs("div", {
        className: "flex items-center space-x-2",
        children: [s.jsx(Ae, {
            className: "h-4 w-8 rounded-md"
        }), s.jsx(Ae, {
            className: "h-4 w-[69%] rounded-md"
        })]
    }), s.jsxs("div", {
        className: "flex items-center space-x-2",
        children: [s.jsx(Ae, {
            className: "h-4 w-8 rounded-md"
        }), s.jsx(Ae, {
            className: "h-4 w-[71%] rounded-md"
        })]
    }), s.jsxs("div", {
        className: "flex items-center space-x-2",
        children: [s.jsx(Ae, {
            className: "h-4 w-8 rounded-md"
        }), s.jsx(Ae, {
            className: "h-4 w-[66%] rounded-md"
        })]
    })]
})
  , Xi = G.forwardRef( ({theme: e, placeholder: t="Search", menuType: r=mt.Radio, onOptionSelect: n, onValueChange: i, noResultsText: a, isLoading: c=!1, isSearchable: l=!0, children: u, className: m, scrollAreaChildren: h, handleInputChange: v}, w) => {
    const k = d.useMemo( () => u.map(S => S.props), [u])
      , [b,g] = d.useState("")
      , [_,I] = d.useState(k)
      , [M,D] = d.useState(null)
      , [o,p] = d.useState(0)
      , f = d.useRef(null)
      , x = d.useRef([])
      , E = d.useRef(null);
    d.useEffect( () => {
        if (b !== "") {
            const S = k.filter(T => (T.children || T.label).toLowerCase().includes(b.toLowerCase()));
            I(S)
        } else
            I(k.slice(0, k.length))
    }
    , [b, k]),
    d.useEffect( () => {
        if (M) {
            const S = _.map(T => {
                if (T.value === M.value) {
                    const P = {
                        ...T,
                        checked: r === mt.Checkbox ? !T.checked : !0
                    };
                    return n == null || n(P),
                    P
                }
                return r === mt.Radio ? {
                    ...T,
                    checked: !1
                } : T
            }
            );
            i == null || i(S.filter(T => T.checked)),
            I(S)
        }
    }
    , [M]);
    const j = S => {
        D(S)
    }
      , C = (S, T) => {
        var P, R, N, y, O, A;
        if ((S.key === " " || S.key === "Enter") && (S.preventDefault(),
        j(T)),
        S.key === "ArrowDown" || S.key === "Tab") {
            if (S.preventDefault(),
            (P = x.current[o]) == null || P.scrollIntoView({
                behavior: "smooth",
                block: "start"
            }),
            o < _.length - 1)
                p(L => L),
                (R = x.current[o]) == null || R.focus(),
                (N = E.current) == null || N.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            else {
                p(0),
                (y = f.current) == null || y.focus();
                return
            }
            p(L => {
                var F;
                const z = L === _.length - 1 ? 0 : L + 1;
                return (F = x.current[z]) == null || F.focus(),
                z
            }
            )
        }
        if (S.key === "ArrowUp") {
            if (S.preventDefault(),
            (O = x.current[o]) == null || O.scrollIntoView({
                behavior: "smooth",
                block: "start"
            }),
            o === 0) {
                (A = f.current) == null || A.focus();
                return
            }
            p(L => {
                var F;
                const z = L === 0 ? _.length - 1 : L - 1;
                return (F = x.current[z]) == null || F.focus(),
                z
            }
            )
        }
    }
    ;
    return s.jsxs("div", {
        ref: w,
        "data-theme": e,
        children: [l && s.jsx("div", {
            className: "px-2",
            children: s.jsx(xi, {
                iconLeft: Ec,
                placeholder: t,
                theme: e,
                iconProps: {
                    className: "text-slate-500 size-4"
                },
                small: !0,
                className: "outline-0 focus:outline-0",
                onChange: S => v ? v(S.target.value) : g(S.target.value),
                fullWidth: !0,
                ...!v && {
                    value: b
                },
                ref: f
            })
        }), u && l && s.jsx(Xu, {}), s.jsx("div", {
            className: re(Yu(), m),
            children: c ? s.jsx(Ku, {}) : s.jsxs(eu, {
                ref: E,
                children: [_.length > 0 ? _.map( (S, T) => s.jsx(kr, {
                    onItemSelect: () => j(S),
                    onItemKeyDown: C,
                    menuType: r,
                    ref: P => {
                        x.current[T] = P
                    }
                    ,
                    ...S,
                    children: S.children
                }, S.value)) : s.jsx("div", {
                    className: "p-4 text-center text-sm text-slate-200",
                    children: a ?? "No results found."
                }), !!h && h]
            })
        })]
    })
}
);
G.forwardRef( (e, t) => s.jsx($l, {
    ref: t,
    ...e
}));
const Yi = () => "dark"
  , Zu = ({result: e}) => {
    var n, i, a, c;
    const t = [(n = e == null ? void 0 : e.user_owner) == null ? void 0 : n.first_name, (i = e == null ? void 0 : e.user_owner) == null ? void 0 : i.last_name].filter(l => !!l && l.length > 0).join(" ") || void 0
      , r = (a = e == null ? void 0 : e.organization_owner) != null && a.name ? `${(c = e == null ? void 0 : e.organization_owner) == null ? void 0 : c.name}` : void 0;
    return s.jsxs("div", {
        className: "flex flex-row text-xs text-slate-500 gap-1 align-middle",
        children: [s.jsx(Qo, {
            text: r
        }), t && s.jsx("span", {
            children: t
        })]
    })
}
  , Qu = e => ({
    created: new Date((e == null ? void 0 : e.created) || ""),
    icon_and_color_updated: e == null ? void 0 : e.icon_and_color_updated,
    app_tags: e == null ? void 0 : e.app_tags,
    icon: e == null ? void 0 : e.icon,
    icon_color: e == null ? void 0 : e.icon_color,
    logo_app_tag: e == null ? void 0 : e.logo_app_tag
})
  , Ju = (e, t, r, n, i) => {
    const [a,c] = d.useState(!1)
      , l = r !== void 0 ? r : a
      , u = n || c
      , m = d.useCallback(w => {
        const k = document.getElementById("crxjs-ext");
        k && !k.contains(w.target) && u(!1)
    }
    , [u])
      , h = d.useCallback(w => {
        const k = w.target;
        if (e.current && (e.current === k || e.current.contains(k))) {
            u(!l);
            return
        }
        if (i != null && i.current && (i.current === k || i.current.contains(k))) {
            u(!l);
            return
        }
        t.current && (t.current === k || t.current.contains(k)) || u(!1)
    }
    , [l, e, t, i, u])
      , v = d.useCallback( () => {
        if (e.current) {
            const w = e.current.getRootNode();
            if ("getElementById"in w)
                return w.getElementById("root-scribe-elem")
        }
        return null
    }
    , [e]);
    return d.useEffect( () => {
        const w = v();
        return document.addEventListener("mousedown", m),
        w && w.addEventListener("mousedown", h),
        () => {
            document.removeEventListener("mousedown", m),
            w && w.removeEventListener("mousedown", h)
        }
    }
    , [m, h, v]),
    d.useEffect( () => {
        if (l) {
            const w = v();
            w && requestAnimationFrame( () => {
                const k = w.querySelector("[data-radix-popper-content-wrapper] input");
                k instanceof HTMLInputElement && k.focus()
            }
            )
        }
    }
    , [l, v]),
    [l, u]
}
  , Ki = ({selectedDocument: e, setSelectedDocument: t, external: r=!1, externalOpen: n, onExternalOpenChange: i, externalTriggerRef: a}) => {
    var S;
    const c = Yi()
      , l = ot()
      , u = d.useRef(null)
      , m = d.useRef(null)
      , h = Xo()
      , [v,w] = Ju(u, m, n, i, a)
      , k = X(Ls)
      , {workspaceScribes: b} = X(Ho)
      , g = X(Fs)
      , _ = X(Bt)
      , [I,M] = d.useState("popular")
      , D = d.useCallback( () => {
        try {
            chrome.runtime.sendMessage({
                messageType: "getSelectedSuggestionsFilter"
            }, T => {
                M(T || "popular")
            }
            )
        } catch (T) {
            console.error("Failed to get initial filter:", T)
        }
    }
    , []);
    d.useEffect( () => {
        D()
    }
    , [v, D]);
    const o = d.useMemo( () => I === "saved" ? (k == null ? void 0 : k.documents) ?? [] : b ?? [], [k, b, I])
      , p = d.useMemo( () => o.map(T => ({
        value: T.id,
        label: T.name || "",
        ...T
    })), [o])
      , [f,x] = d.useState("")
      , E = d.useMemo( () => {
        const T = f.trim().toLowerCase();
        return T ? p.filter(P => {
            var R, N;
            return (N = (R = P.label) == null ? void 0 : R.toLowerCase()) == null ? void 0 : N.includes(T)
        }
        ) : p
    }
    , [p, f])
      , j = T => {
        const P = T.map(y => String(y.value));
        if (P.length === 0) {
            t(null);
            return
        }
        const R = P[P.length - 1]
          , N = p.find(y => y.value === R) || null;
        t(N),
        w(!1)
    }
      , C = `menu-${(e == null ? void 0 : e.id) ?? "none"}`;
    return d.useEffect( () => {
        var N;
        if (!v)
            return;
        const T = typeof window < "u" ? window.location.href : null
          , P = (N = _ == null ? void 0 : _.active_organization) == null ? void 0 : N.id;
        if (T && h(zs(T)),
        !P)
            return;
        if (I === "saved") {
            h(Bs({
                organizationId: P
            }));
            return
        }
        const R = ["popular", "new", "viewed"].includes(I) ? I : "popular";
        h(Hs({
            url: T,
            sort: R,
            organizationId: P
        }))
    }
    , [h, v, I, (S = _ == null ? void 0 : _.active_organization) == null ? void 0 : S.id]),
    s.jsxs(Ui, {
        open: v,
        children: [r && (a == null ? void 0 : a.current) && s.jsx(vi, {
            asChild: !0,
            children: s.jsx("span", {})
        }), s.jsx(Vi, {
            asChild: !0,
            className: r ? "hidden" : "",
            children: s.jsx(oe, {
                ref: u,
                size: "small",
                variant: "secondary",
                icon: Cc,
                iconProps: {
                    style: {
                        color: "#64748B"
                    }
                },
                children: "Link document"
            })
        }), s.jsx(qi, {
            ref: m,
            theme: c,
            container: l,
            align: "start",
            alignOffset: -16,
            style: {
                maxHeight: "220px",
                overflowY: "scroll",
                width: "320px"
            },
            children: s.jsx(Xi, {
                theme: c,
                placeholder: "Search document to attach",
                isLoading: g,
                onValueChange: j,
                isSearchable: !0,
                handleInputChange: x,
                noResultsText: "No scribe documents found",
                children: E.map(T => {
                    var P;
                    return s.jsx(kr, {
                        value: T.value,
                        className: "flex justify-start",
                        childrenClassName: "w-[320px] overflow-x-hidden px-0",
                        checked: (e == null ? void 0 : e.id) === T.value,
                        menuType: "item",
                        children: s.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [T.type === "scribe" && s.jsx("div", {
                                className: "",
                                children: s.jsx(Vl, {
                                    document: T,
                                    size: 13,
                                    className: "size-5"
                                })
                            }), T.type === "knowledge_page" && s.jsx("div", {
                                children: s.jsx(ql, {
                                    isColorfulHeaderEnabled: !!((P = T == null ? void 0 : T.features) != null && P.includes("colorful_header")),
                                    colorfulHeader: (T == null ? void 0 : T.colorful_header) || "",
                                    className: "flex-none",
                                    size: "small"
                                })
                            }), s.jsxs("div", {
                                style: {
                                    textWrap: "wrap"
                                },
                                children: [s.jsx("span", {
                                    children: T.label
                                }), s.jsx(Zu, {
                                    result: T
                                })]
                            })]
                        })
                    }, T.value)
                }
                )
            }, C)
        })]
    })
}
  , ed = e => {
    var t, r, n, i;
    return {
        fileType: e.type || "scribe",
        faIcon: e.icon || void 0,
        iconUrl: (t = Qu(e).app_tags[0]) == null ? void 0 : t.icon_url,
        name: e.name || "",
        author: [(r = e == null ? void 0 : e.user_owner) == null ? void 0 : r.first_name, (n = e == null ? void 0 : e.user_owner) == null ? void 0 : n.last_name].filter(Boolean).join(" "),
        organization: ((i = e == null ? void 0 : e.organization_owner) == null ? void 0 : i.name) || ""
    }
}
  , td = ({selectedDocument: e, setSelectedDocument: t, editingPin: r, handleUpdateEditingPinAttachedFile: n}) => {
    var k;
    const [i,a] = d.useState(!1)
      , c = d.useRef(null)
      , l = e ? ed(e) : r != null && r.attached_file ? {
        fileType: r.attached_file.type,
        iconUrl: r.attached_file.contents.icon_url || void 0,
        name: r.attached_file.contents.name,
        author: r.attached_file.contents.author,
        organization: (k = r.attached_file.contents.organization_owner) == null ? void 0 : k.name
    } : null;
    if (!l)
        return null;
    const {fileType: u, iconUrl: m, name: h, author: v, organization: w} = l;
    return s.jsxs(Bi, {
        children: [s.jsx(ei, {
            fileType: u,
            iconUrl: m
        }), s.jsx(Hi, {
            name: h,
            author: v,
            organization: w
        }), s.jsx(Ki, {
            selectedDocument: e,
            setSelectedDocument: t,
            external: !0,
            externalOpen: i,
            onExternalOpenChange: a,
            externalTriggerRef: c
        }), s.jsxs(Gl, {
            className: re("absolute right-1 top-1 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"),
            children: [s.jsx(ri, {
                ref: c,
                icon: jc,
                onClick: () => a(!0),
                label: "Change document"
            }), s.jsx(ri, {
                icon: di,
                onClick: () => {
                    e && t(null),
                    r && n(null)
                }
                ,
                label: "Delete document",
                variant: "danger"
            })]
        })]
    })
}
  , Zi = (e, t) => {
    const r = e.startsWith("#") ? e.slice(1) : e
      , n = parseInt(r.slice(0, 2), 16)
      , i = parseInt(r.slice(2, 4), 16)
      , a = parseInt(r.slice(4, 6), 16);
    return `rgba(${n}, ${i}, ${a}, ${t})`
}
  , nd = (e, t=.1) => {
    const r = e.startsWith("#") ? e.slice(1) : e
      , n = Math.min(255, parseInt(r.slice(0, 2), 16) + 255 * t)
      , i = Math.min(255, parseInt(r.slice(2, 4), 16) + 255 * t)
      , a = Math.min(255, parseInt(r.slice(4, 6), 16) + 255 * t);
    return `#${[n, i, a].map(c => Math.round(c).toString(16).padStart(2, "0")).join("")}`
}
  , xn = e => /^[0-9A-F]{6}$/i.test(e)
  , rd = [{
    id: "D946EF",
    color: "#D946EF"
}, {
    id: "8B5CF6",
    color: "#8B5CF6"
}, {
    id: "3C2EDD",
    color: "#3C2EDD"
}, {
    id: "3B82F6",
    color: "#3B82F6"
}, {
    id: "0EA5E9",
    color: "#0EA5E9"
}, {
    id: "06B6D4",
    color: "#06B6D4"
}, {
    id: "34D399",
    color: "#34D399"
}, {
    id: "EAB308",
    color: "#EAB308"
}, {
    id: "FB923C",
    color: "#FB923C"
}, {
    id: "F97316",
    color: "#F97316"
}, {
    id: "EF4444",
    color: "#EF4444"
}, {
    id: "F43F5E",
    color: "#F43F5E"
}, {
    id: "EC4899",
    color: "#EC4899"
}]
  , od = ({onColorChange: e, customColor: t, organizationLogos: r=[], selectedLogoId: n, onLogoChange: i}) => {
    const [a,c] = d.useState(!1)
      , [l,u] = d.useState(t.slice(1))
      , [m,h] = d.useState(!1)
      , v = ot()
      , w = d.useRef(null)
      , k = d.useRef(null)
      , b = r.find(g => g.id === n);
    return s.jsxs(lr, {
        open: m,
        onOpenChange: h,
        children: [s.jsx(bi, {
            asChild: !0,
            children: s.jsx(tr, {
                tooltipContent: s.jsx(se, {
                    variant: "compact",
                    children: "Customize pin appearance"
                }),
                children: b ? s.jsx(oe, {
                    "aria-label": "customize pin appearance",
                    ref: k,
                    size: "small",
                    variant: "ghost",
                    children: s.jsx("img", {
                        src: b.logoUrl,
                        alt: "Selected logo",
                        className: "rounded-full w-5 h-5",
                        style: {
                            border: `2px solid ${t}`
                        }
                    })
                }) : s.jsx(oe, {
                    "aria-label": "Customize pin appearance",
                    ref: k,
                    style: {
                        color: t
                    },
                    size: "small",
                    variant: "ghost",
                    icon: er
                })
            })
        }), s.jsxs(sr, {
            className: "pt-2 pb-2",
            style: {
                zIndex: 1e6,
                width: "230px",
                marginTop: "-1px"
            },
            side: "bottom",
            container: v,
            theme: "dark",
            children: [r.length > 0 && s.jsxs(s.Fragment, {
                children: [s.jsx("div", {
                    className: "pb-1 text-xs uppercase text-slate-400 text-left",
                    children: "team logos"
                }), s.jsx("div", {
                    className: "relative flex flex-row flex-wrap p-1 gap-3 mb-3",
                    children: r.map(g => {
                        const _ = n === g.id;
                        return s.jsxs("button", {
                            className: "cursor-pointer h-4 w-4 rounded-full relative items-center justify-center flex",
                            "aria-label": `Select ${g.name} logo`,
                            onClick: () => {
                                c(!1),
                                i == null || i(_ ? null : g.id)
                            }
                            ,
                            children: [s.jsxs("div", {
                                className: "flex h-6 w-6 items-center justify-center",
                                children: [s.jsx("img", {
                                    src: g.logoUrl,
                                    alt: g.name,
                                    className: "absolute h-4 w-4 rounded-full object-cover",
                                    style: {
                                        boxShadow: "rgba(255, 255, 255, 0.3) 0px 0px 0px 1px"
                                    }
                                }), s.jsx("div", {
                                    className: "absolute inset-0 h-4 w-4 rounded-full hover:animate-ping",
                                    style: {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }
                                })]
                            }), _ && s.jsx("div", {
                                className: "absolute h-7 w-7 rounded-full pointer-events-none left-[-6px] top-[-6px]",
                                style: {
                                    border: "2px solid #6366F1"
                                }
                            })]
                        }, g.id)
                    }
                    )
                })]
            }), s.jsx("div", {
                className: "pb-1 text-xs uppercase text-slate-400 text-left",
                children: "Select color"
            }), s.jsxs("div", {
                className: "relative flex flex-row flex-wrap p-1 gap-3",
                children: [s.jsxs("button", {
                    onClick: () => {
                        c(!0)
                    }
                    ,
                    "aria-label": "Select custom color",
                    className: re("flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-transparent text-white hover:bg-slate-800"),
                    children: [s.jsx("div", {
                        className: "flex rounded-full text-white",
                        children: s.jsx(le, {
                            icon: wl,
                            style: {
                                width: "15px",
                                height: "15px"
                            }
                        })
                    }), a && s.jsx("div", {
                        className: "absolute h-7 w-7 rounded-full pointer-events-none",
                        style: {
                            border: "2px solid #6366F1"
                        }
                    })]
                }), rd.map(g => {
                    const _ = t === g.color && !a;
                    return s.jsx("button", {
                        className: "cursor-pointer h-4 w-4 rounded-full relative items-center justify-center flex",
                        "aria-label": `Select ${g.color} color`,
                        onClick: () => {
                            _ || (c(!1),
                            e(g.color),
                            u(g.color.slice(1)))
                        }
                        ,
                        children: s.jsxs("div", {
                            className: "flex h-6 w-6 items-center justify-center",
                            children: [s.jsx("div", {
                                className: "absolute h-4 w-4 rounded-full",
                                style: {
                                    backgroundColor: g.color,
                                    boxShadow: `${nd(g.id, .3)} 0px 0px 0px 1px`
                                },
                                children: s.jsx("div", {
                                    className: "absolute inset-0 h-4 w-4 rounded-full hover:animate-ping",
                                    style: {
                                        backgroundColor: Zi(g.id, .3),
                                        border: `1px solid ${g.color}`
                                    }
                                })
                            }), _ && s.jsx("div", {
                                className: "absolute h-7 w-7 rounded-full pointer-events-none left-[-6px] top-[-6px]",
                                style: {
                                    border: "2px solid #6366F1"
                                }
                            })]
                        })
                    }, g.id)
                }
                ), a && s.jsx("div", {
                    className: "mb-2 mt-2 block w-full flex-row justify-around align-middle",
                    style: {
                        backgroundColor: "#33415526",
                        border: "1px solid #334155",
                        borderRadius: "4px",
                        width: "200px"
                    },
                    children: s.jsxs("div", {
                        className: "relative rounded-md shadow-sm grid grid-cols-[auto_1fr_auto] items-center pl-2",
                        children: [s.jsx("div", {
                            className: "h-4 w-4 rounded-full mr-2",
                            onClick: () => {
                                w.current && w.current.focus()
                            }
                            ,
                            style: {
                                backgroundColor: Zi(l, 1),
                                boxShadow: "rgba(255, 255, 255, 0.15) 0px 0px 0px 1px inset"
                            }
                        }), s.jsx("input", {
                            type: "text",
                            ref: w,
                            style: {
                                width: "100%",
                                height: "1rem",
                                backgroundColor: "#212D3F",
                                border: "none",
                                fontSize: "12px"
                            },
                            className: "p-0 text-slate-100",
                            maxLength: 6,
                            minLength: 6,
                            value: l,
                            onChange: g => {
                                const _ = g.target.value;
                                u(_)
                            }
                        }), s.jsx("button", {
                            "aria-label": "Select custom color",
                            disabled: !xn(l),
                            onClick: () => {
                                if (xn(l)) {
                                    const g = `#${l}`;
                                    c(!0),
                                    e(g),
                                    u(g.slice(1)),
                                    h(!1)
                                }
                            }
                            ,
                            className: "pt-1 pb-1",
                            style: {
                                borderTopRightRadius: "4px",
                                borderBottomRightRadius: "4px",
                                backgroundColor: "#212D3F",
                                cursor: xn(l) ? "pointer" : "default"
                            },
                            children: s.jsx(le, {
                                icon: Yo,
                                style: {
                                    width: "1rem",
                                    height: "100%"
                                },
                                className: re("h-4 w-4", xn(l) ? "text-white" : "text-gray-500"),
                                "aria-hidden": "true"
                            })
                        })]
                    })
                })]
            })]
        })]
    })
}
  , id = ({pinDescription: e, onDescriptionChange: t}) => {
    const r = e.length >= 140;
    return s.jsx("div", {
        className: "mb-3",
        children: s.jsx(xi, {
            "data-testid": "pin-description-input",
            value: e,
            onChange: n => t(n.target.value),
            placeholder: "Describe your pin...",
            required: !0,
            small: !0,
            fullWidth: !0,
            maxLength: 140,
            className: "mt-3",
            error: r,
            helpText: r ? "Description is too long. Max 140 characters." : void 0
        })
    })
}
  , ad = ({selectedTeamIds: e, onTeamChange: t}) => {
    const r = Yi()
      , n = ot()
      , i = X(Bt)
      , a = Wl(i, e)
      , c = ((i == null ? void 0 : i.organizations) || []).filter(v => v.permission_level !== "read")
      , l = d.useMemo( () => {
        var v;
        if (e.length === 0)
            return "";
        if (e.length === 1) {
            const w = ((v = c.find(b => b.id === e[0])) == null ? void 0 : v.name) || ""
              , k = 10;
            return w.length > k ? `${w.slice(0, k)}...` : w
        }
        return `${e.length} teams`
    }
    , [e, c])
      , u = v => {
        const w = v.map(g => g.value)
          , k = w.includes("all-teams")
          , b = c.length > 0 && c.every(g => e.includes(g.id));
        if (k && !b) {
            const g = c.map(_ => _.id);
            t(g)
        } else if (!k && b)
            t([]);
        else {
            const g = w.filter(_ => _ !== "all-teams");
            t(g)
        }
    }
      , m = c.length > 0 && c.every(v => e.includes(v.id))
      , h = `menu-${m}-${e.join(",")}`;
    return s.jsxs(Ui, {
        children: [s.jsx(Vi, {
            asChild: !0,
            children: s.jsx(tr, {
                tooltipContent: s.jsx(se, {
                    variant: "compact",
                    children: "Select team"
                }),
                children: s.jsx(oe, {
                    "data-testid": "pin-team-picker-button",
                    className: "text-slate-600",
                    size: "small",
                    variant: "ghost",
                    icon: Sc,
                    children: l
                })
            })
        }), s.jsx(qi, {
            theme: r,
            container: n,
            align: "start",
            alignOffset: -13,
            style: {
                marginTop: "-1px",
                maxHeight: "220px",
                overflowY: "auto",
                width: "300px",
                scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
                WebkitScrollbarWidth: "8px"
            },
            children: s.jsx(Xi, {
                menuType: "checkbox",
                theme: r,
                onValueChange: u,
                children: a.map(v => s.jsx(kr, {
                    value: v.value,
                    checked: v.value === "all-teams" ? m : e.includes(v.value),
                    ...v.menuItemProps,
                    children: v.label
                }, v.value))
            }, h)
        })]
    })
}
  , sd = ({handleCreatePin: e, selectedTeamIds: t, onTeamChange: r, onColorChange: n, customColor: i, selectedLogoId: a, onLogoChange: c, pinUrl: l, setPinUrl: u, pinDescription: m, onDescriptionChange: h, selectedDocument: v, setSelectedDocument: w, editingPin: k, handleUpdatePin: b, handleCancelEdit: g, handleDialogCancel: _, handleUpdateEditingPinAttachedFile: I}) => {
    var S, T;
    const M = k !== null
      , {pinTreasuresAiUrl: D} = De(ce.getState())
      , {userData: o} = X(zt)
      , p = (T = (S = o == null ? void 0 : o.active_organization) == null ? void 0 : S.super_organization) == null ? void 0 : T.allow_openai
      , [f,x] = d.useState(!1)
      , E = ((o == null ? void 0 : o.organizations) || []).filter(P => {
        var R, N;
        return ((R = P.logo) == null ? void 0 : R.download_url) && ((N = P.logo) == null ? void 0 : N.id)
    }
    ).map(P => ({
        id: P.logo.id,
        logoUrl: P.logo.download_url,
        name: P.name
    }))
      , j = Wu({
        selectedDocument: v,
        editingPin: k,
        selectedTeamIds: t
    })
      , C = !(m.trim() || v || M && (k != null && k.attached_file)) || t.length === 0;
    return d.useEffect( () => {
        if (M)
            return;
        const P = yr(window.location.href);
        p && D && !M ? (x(!0),
        chrome.runtime.sendMessage({
            messageType: "generateAiUrl",
            originalUrl: P
        }).then(R => {
            R.success ? u(Fi(R.generatedUrl)) : u(P)
        }
        ).catch( () => {
            u(P)
        }
        ).finally( () => {
            x(!1)
        }
        )) : (u(P),
        x(!1))
    }
    , [M, p, D, u]),
    s.jsxs(s.Fragment, {
        children: [s.jsxs("div", {
            className: "flex justify-between items-center text-sm",
            children: [s.jsx("div", {
                className: "text-slate-900 font-semibold",
                children: "Add pin"
            }), s.jsx(oe, {
                "aria-label": "close",
                variant: "ghost",
                size: "small",
                icon: _l,
                iconProps: {
                    className: "text-slate-600"
                },
                onClick: () => {
                    M ? g() : _()
                }
            })]
        }), s.jsx(id, {
            pinDescription: m,
            onDescriptionChange: h
        }), j && s.jsx(Jc, {
            icon: kl,
            title: "Document is not shared with all teams",
            variant: "warning",
            className: "mb-2"
        }), (v || M && (k == null ? void 0 : k.attached_file)) && s.jsx(td, {
            selectedDocument: v,
            setSelectedDocument: w,
            editingPin: k,
            handleUpdateEditingPinAttachedFile: I
        }), !v && (!M || !(k != null && k.attached_file)) && s.jsx(Ki, {
            selectedDocument: v,
            setSelectedDocument: w
        }), s.jsx("div", {
            className: "flex gap-2 mt-8",
            children: s.jsxs(qe, {
                children: [s.jsx(ad, {
                    selectedTeamIds: t,
                    onTeamChange: r
                }), s.jsx(qu, {
                    originalUrl: Fi((k == null ? void 0 : k.url) || window.location.href),
                    isEditMode: M,
                    pinUrl: l,
                    editingPinUrl: k == null ? void 0 : k.user_chosen_url,
                    setPinUrl: u
                }), s.jsx(od, {
                    onColorChange: n,
                    customColor: i,
                    organizationLogos: E,
                    selectedLogoId: a,
                    onLogoChange: c
                }), s.jsxs(de, {
                    children: [s.jsx(pe, {
                        children: s.jsx(oe, {
                            className: "text-white ml-auto",
                            variant: "primary",
                            size: "small",
                            loading: f,
                            onClick: () => {
                                M ? b() : e()
                            }
                            ,
                            disabled: C,
                            children: "Save"
                        })
                    }), C && s.jsx(se, {
                        variant: "compact",
                        children: t.length === 0 ? "Select at least one team" : "Enter description or select a document to save"
                    })]
                })]
            })
        })]
    })
}
  , ld = {
    attributes: !0,
    childList: !0,
    subtree: !0
}
  , cd = ({callback: e, debounceMs: t=0, options: r=ld}) => {
    const [n,i] = d.useState();
    return d.useEffect( () => {
        const a = new MutationObserver(t > 0 ? Qn.debounce(e, t) : e);
        return i(a),
        () => a == null ? void 0 : a.disconnect()
    }
    , [e]),
    d.useEffect( () => {
        n && n.observe(document, r)
    }
    , [r, n]),
    n
}
  , ud = {
    attributes: !0,
    childList: !0,
    subtree: !0
}
  , Qi = ({selector: e, xpath: t, tag: r, text: n, attributes: i, debounceMs: a, options: c=ud, retryCount: l=0, timestamp: u, actionType: m, aiFallbackElementId: h, actionId: v, wasInIframe: w, iframeAttributes: k, parentAttributes: b, parentTag: g}) => {
    const {guideMeAlgo: _, guideMeAlgoV3: I, guideMeAiFallbackAlwaysOn: M, guideMeAiFallback: D} = De(ce.getState())
      , [o,p] = d.useState(null)
      , [f,x] = d.useState(null)
      , [E,j] = d.useState("")
      , [C,S] = d.useState(null)
      , T = (y, O=1) => {
        let A = 0
          , L = y;
        for (; A <= O; ) {
            if (!L.parentElement)
                return y;
            if (Gc(L.parentElement))
                return L.parentElement;
            A += 1,
            L = L.parentElement
        }
        return y
    }
      , P = y => y ? y != null && y.matches(qc.join(", ")) || m !== "mouse_click_action" ? y : T(y) : null
      , R = d.useRef({
        selector: e,
        xpath: t,
        tag: r,
        text: n,
        attributes: i,
        aiFallbackElementId: h,
        actionId: v,
        wasInIframe: w,
        iframeAttributes: k,
        parentAttributes: b,
        parentTag: g
    });
    d.useEffect( () => {
        R.current = {
            selector: e,
            xpath: t,
            tag: r,
            text: n,
            attributes: i,
            aiFallbackElementId: h,
            actionId: v,
            wasInIframe: w,
            iframeAttributes: k,
            parentAttributes: b,
            parentTag: g
        }
    }
    , [e, t, r, n, i, h, v, w, k, b, g]);
    const N = d.useCallback( () => {
        var z, F, B, U, V, $, W, K, Q, ve, Me;
        const {element: y, matchMethod: O, parentIframe: A, algorithm: L} = or({
            selector: (z = R == null ? void 0 : R.current) == null ? void 0 : z.selector,
            attributes: (F = R == null ? void 0 : R.current) == null ? void 0 : F.attributes,
            xpath: (B = R == null ? void 0 : R.current) == null ? void 0 : B.xpath,
            tag: (U = R == null ? void 0 : R.current) == null ? void 0 : U.tag,
            text: (V = R == null ? void 0 : R.current) == null ? void 0 : V.text,
            parentAttributes: ($ = R == null ? void 0 : R.current) == null ? void 0 : $.parentAttributes,
            parentTag: (W = R == null ? void 0 : R.current) == null ? void 0 : W.parentTag,
            algoVersion: _ == null ? void 0 : _.toString(),
            algoV3Enabled: !!I,
            isAiFallbackEnabled: !!D,
            isAiFallbackAlwaysOnEnabled: !!M,
            aiFallbackElementId: (K = R == null ? void 0 : R.current) == null ? void 0 : K.aiFallbackElementId,
            actionId: ((Q = R == null ? void 0 : R.current) == null ? void 0 : Q.actionId) || "",
            wasInIframe: (ve = R == null ? void 0 : R.current) == null ? void 0 : ve.wasInIframe,
            iframeAttributes: (Me = R == null ? void 0 : R.current) == null ? void 0 : Me.iframeAttributes
        });
        p(P(y) ?? y ?? null),
        x(O),
        S(A || null),
        j(L || "")
    }
    , [v]);
    return d.useEffect( () => {
        const {element: y, matchMethod: O, parentIframe: A, algorithm: L} = or({
            selector: e,
            attributes: i,
            xpath: t,
            tag: r,
            text: n,
            parentAttributes: b,
            parentTag: g,
            algoVersion: _ == null ? void 0 : _.toString(),
            algoV3Enabled: !!I,
            isAiFallbackEnabled: !!D,
            isAiFallbackAlwaysOnEnabled: !!M,
            aiFallbackElementId: h,
            actionId: v ?? "",
            wasInIframe: w,
            iframeAttributes: k
        });
        p(P(y) ?? y ?? null),
        x(O),
        S(A || null),
        j(L || "")
    }
    , [p, e, t, r, n, l, u, h]),
    cd({
        callback: N,
        debounceMs: a,
        options: c
    }),
    {
        element: o,
        matchMethod: f,
        parentIframe: C,
        algorithm: E
    }
}
  , dd = ({displayCoordinates: e}) => {
    const [t,r] = d.useState(!1)
      , n = ot()
      , i = Xl();
    d.useEffect( () => {
        chrome.storage.local.get("hasSeenViewPinCallout", c => {
            c && !c.hasSeenViewPinCallout && r(!0)
        }
        )
    }
    , []);
    const a = () => {
        chrome.storage.local.set({
            hasSeenViewPinCallout: !0
        }),
        r(!1)
    }
    ;
    return i ? null : s.jsx("div", {
        style: {
            position: "absolute",
            top: e.y,
            left: e.x
        },
        children: s.jsxs(Yl, {
            open: t,
            children: [s.jsx(Kl, {}), s.jsxs(Zl, {
                className: "p-3",
                sideOffset: 30,
                align: "start",
                showCloseButton: !0,
                onCloseAction: a,
                portalContainer: n,
                children: [s.jsx(Ql, {
                    title: "Hover over this pin to view it",
                    icon: Tc,
                    titleClassName: "text-sm"
                }), s.jsx(Jl, {
                    className: "text-xs text-wrap",
                    children: "Your Scribe team admin has added something useful to the webpage!"
                })]
            })]
        })
    })
}
  , pd = ({pin: e, isPinning: t, deletePin: r, editPin: n, editingPin: i, repositionPin: a, onRepositionStart: c, tempPinPosition: l, animate: u=!1, onCoordinatesUpdate: m, clusteredPinIds: h, attachCallout: v=!1}) => {
    var O, A, L, z, F, B, U, V, $, W, K;
    const [w,k] = d.useState(!1)
      , b = d.useRef(null)
      , g = d.useRef(null)
      , _ = X($s)
      , I = X(Us)
      , M = d.useRef(null)
      , [D,o] = d.useState(!1)
      , p = (w || _ === e.id) && (i == null ? void 0 : i.id) !== e.id
      , {element: f, parentIframe: x} = Qi({
        aiFallbackElementId: (O = e.id) == null ? void 0 : O.toString(),
        selector: ((A = e.location_metadata) == null ? void 0 : A.selector) ?? null,
        xpath: ((L = e.location_metadata) == null ? void 0 : L.target_xpath) || "",
        tag: ((z = e.location_metadata) == null ? void 0 : z.target_tag) || "",
        text: ((F = e.location_metadata) == null ? void 0 : F.text) || "",
        attributes: ((B = e.location_metadata) == null ? void 0 : B.attributes) ?? null,
        debounceMs: 200,
        retryCount: 0,
        timestamp: (U = e.location_metadata) == null ? void 0 : U.timestamp.toString(),
        actionType: "mouse_click_action",
        wasInIframe: ((V = e.location_metadata) == null ? void 0 : V.was_in_iframe) ?? null,
        iframeAttributes: (($ = e.location_metadata) == null ? void 0 : $.iframe_attributes) ?? null,
        parentAttributes: ((W = e.location_metadata) == null ? void 0 : W.target_parent_attributes) ?? null,
        parentTag: ((K = e.location_metadata) == null ? void 0 : K.target_parent_tag) ?? ""
    })
      , {isVisible: E} = br({
        element: f,
        subtreeEnabled: !1,
        isPinning: t
    })
      , j = oi({
        pin: e,
        pinTarget: f,
        parentIframe: x
    })
      , C = {
        x: j.x,
        y: j.y
    }
      , S = E && j.isClickPointInViewport
      , T = l && (i == null ? void 0 : i.id) === e.id ? l : C;
    d.useEffect( () => () => {
        b.current && clearTimeout(b.current),
        g.current && clearTimeout(g.current)
    }
    , []),
    d.useEffect( () => {
        e.id && j && m(e.id, {
            x: j.x,
            y: j.y
        }, S)
    }
    , [e.id, j.x, j.y, S]);
    const P = () => {
        var Q;
        e != null && e.id && !(I != null && I.includes(e.id)) && chrome.runtime.sendMessage({
            messageType: "setViewedPin",
            data: {
                pinId: e.id
            }
        }),
        Ce("pin_hovered", {
            pin_id: e.id,
            location: "browser",
            document_id: (Q = e.attached_file) == null ? void 0 : Q.id,
            pin_is_clustered: !1
        }),
        b.current && (clearTimeout(b.current),
        b.current = null),
        g.current && (clearTimeout(g.current),
        g.current = null),
        g.current = setTimeout( () => {
            k(!0)
        }
        , 500)
    }
      , R = () => {
        g.current && (clearTimeout(g.current),
        g.current = null),
        b.current = setTimeout( () => {
            k(!1)
        }
        , 150)
    }
      , N = () => {
        b.current && (clearTimeout(b.current),
        b.current = null)
    }
      , y = () => {
        k(!1)
    }
    ;
    return S ? s.jsxs(s.Fragment, {
        children: [D && (i == null ? void 0 : i.id) === e.id && s.jsx(wr, {
            isDragging: D,
            color: e.pin_color,
            pinShiftClickThrough: !1,
            isUpdatingPin: !0,
            logoUrl: e.logo_url || null
        }), s.jsx(Wt, {
            inCluster: h == null ? void 0 : h.has(e.id || ""),
            x: T.x,
            y: T.y,
            enableDragging: (i == null ? void 0 : i.id) === e.id,
            ref: M,
            animate: u,
            shape: "circle",
            enablePointerEvents: !0,
            color: e.pin_color,
            logoUrl: e.logo_url || null,
            isHovered: p,
            onMouseEnter: P,
            onMouseLeave: R,
            onDragStart: () => {
                o(!0),
                (i == null ? void 0 : i.id) === e.id && c()
            }
            ,
            onDragEnd: (Q, ve) => {
                o(!1),
                (i == null ? void 0 : i.id) === e.id && a(ve)
            }
        }), s.jsx(_r, {
            pinX: T.x,
            pinY: T.y,
            isVisible: p,
            onMouseEnter: N,
            onMouseLeave: y,
            children: s.jsx($i, {
                pin: e,
                deletePin: () => r({
                    pinId: e.id,
                    location: "browser"
                }),
                editPin: Q => n(Q, T)
            })
        }), v && s.jsx(dd, {
            displayCoordinates: T
        })]
    }) : null
}
  , fd = ({pins: e, isPinning: t, deletePin: r, editPin: n, editingPin: i, repositionPin: a, onRepositionStart: c, tempPinPosition: l, onCoordinatesUpdate: u, clusteredPinIds: m}) => {
    var _, I, M, D, o, p;
    const [h,v] = d.useState(!1)
      , w = X(Bt)
      , k = Wc(w);
    d.useEffect( () => {
        e && e.length > 0 && Ce("pins_displayed", {
            pins_visible_count: e.length,
            pins_total_count: e.length,
            page_domain: window.location.hostname,
            iframe_pins_count: e.filter(f => {
                var x;
                return (x = f.location_metadata) == null ? void 0 : x.was_in_iframe
            }
            ).length
        })
    }
    , [e]),
    d.useEffect( () => {
        chrome.runtime.sendMessage({
            messageType: "isSidepanelOpen"
        }, x => {
            x.isSidepanelOpen && v(!0)
        }
        );
        const f = x => {
            x.messageType === "sidepanelOpened" && (h || v(!0)),
            x.messageType === "sidepanelClosed" && h && v(!1)
        }
        ;
        return chrome.runtime.onMessage.addListener(f),
        () => {
            chrome.runtime.onMessage.removeListener(f)
        }
    }
    , [h]);
    const b = (I = new URL((_ = document.location) == null ? void 0 : _.href)) == null ? void 0 : I.hostname
      , g = ((D = new URL((M = e[0]) == null ? void 0 : M.url)) == null ? void 0 : D.hostname) || ((p = new URL((o = e[0]) == null ? void 0 : o.url)) == null ? void 0 : p.hostname);
    return b !== g ? null : s.jsx(s.Fragment, {
        children: e.map( (f, x) => s.jsx(pd, {
            pin: f,
            isPinning: t,
            deletePin: r,
            editPin: n,
            editingPin: i,
            repositionPin: a,
            onRepositionStart: c,
            tempPinPosition: l,
            animate: h,
            onCoordinatesUpdate: u,
            clusteredPinIds: m,
            attachCallout: x === 0 && k
        }, f.id))
    })
}
  , Er = "#3C2EDD"
  , md = ({pins: e}) => {
    var Mt, Nt, Ot, So, To, Po;
    const t = X(Jn)
      , [r,n] = d.useState(!1)
      , i = X(Vs)
      , a = X(qs)
      , c = window.location.href
      , l = a.includes(c)
      , [u,m] = d.useState(!1)
      , [h,v] = d.useState(!1)
      , [w,k] = d.useState(!1)
      , [b,g] = d.useState(null)
      , _ = X(Bt)
      , [I,M] = d.useState((Mt = _ == null ? void 0 : _.active_organization) != null && Mt.id ? [(Nt = _ == null ? void 0 : _.active_organization) == null ? void 0 : Nt.id] : [])
      , [D,o] = d.useState(!1)
      , [p,f] = d.useState(Er)
      , [x,E] = d.useState(null)
      , [j,C] = d.useState(null)
      , [S,T] = d.useState("")
      , [P,R] = d.useState(null)
      , [N,y] = d.useState({
        x: 0,
        y: 0
    })
      , [O,A] = d.useState(null)
      , L = x && ((To = (So = (Ot = _ == null ? void 0 : _.organizations) == null ? void 0 : Ot.find(H => {
        var q;
        return ((q = H.logo) == null ? void 0 : q.id) === x
    }
    )) == null ? void 0 : So.logo) == null ? void 0 : To.download_url) || null
      , {pinClusters: z, clusteredPinIds: F, updatePinCoordinates: B, isClusterVisible: U} = Bu(e)
      , V = X(Gs)
      , $ = X(Ws)
      , [W,K] = d.useState($ || null)
      , Q = d.useRef(null)
      , ve = ((Po = _ == null ? void 0 : _.active_organization) == null ? void 0 : Po.id) || ""
      , Me = H => {
        var Dt, At;
        if (!H)
            return {
                element: null,
                elementTag: "unknown",
                elementClass: "",
                isInIframe: !1
            };
        const q = H.target
          , te = ((Dt = q == null ? void 0 : q.tagName) == null ? void 0 : Dt.toLowerCase()) || "unknown"
          , ue = (q == null ? void 0 : q.className) || ""
          , ft = document !== ((At = window.top) == null ? void 0 : At.document);
        return {
            element: q,
            elementTag: te,
            elementClass: ue,
            isInIframe: ft
        }
    }
      , ze = H => {
        H.preventDefault(),
        H.stopPropagation(),
        H.stopImmediatePropagation();
        const {element: q, elementTag: te, elementClass: ue, isInIframe: ft} = Me(H);
        Ce("pins_pin_dropped", {
            element: q,
            element_tag: te,
            element_class: ue,
            pin_x: H.clientX,
            pin_y: H.clientY,
            iframe_context: ft,
            page_domain: window.location.hostname
        }),
        chrome.runtime.sendMessage({
            messageType: "stopDropPin"
        }),
        g(H),
        m(!0)
    }
      , Qe = () => {
        if (m(!1),
        !b)
            return;
        const H = ai(b)
          , q = yr(window.location.href)
          , te = {
            shared_with_orgs: I,
            url: q,
            attached_file: W == null ? void 0 : W.id,
            description: S,
            ...j && j !== q && {
                user_chosen_url: j
            },
            location_metadata: H,
            pin_color: p,
            pin_shape: "circle",
            ...x && {
                logo_id: x
            }
        };
        Ce("pins_save_pin_clicked", {
            pin: {
                ...te,
                document_id: te == null ? void 0 : te.attached_file
            },
            page_domain: window.location.hostname,
            pin_save_type: "creation"
        }),
        chrome.runtime.sendMessage({
            messageType: "createPin",
            pin: te
        }).then(ue => {
            if (!ue.success) {
                nr("Error creating pin");
                return
            }
            Ce("pins_create_success", {
                pin_id: ue.pin.id,
                page_domain: window.location.hostname
            })
        }
        ),
        Oe(),
        g(null)
    }
      , Oe = () => {
        T(""),
        K(null),
        f(Er),
        M([ve]),
        C(nc()),
        E(null)
    }
      , Zn = () => {
        var te;
        if (!P)
            return;
        const H = (W == null ? void 0 : W.id) ?? (P.attached_file === null ? null : (te = P.attached_file) == null ? void 0 : te.id)
          , q = {
            shared_with_orgs: I,
            attached_file: H,
            description: S,
            ...j && {
                user_chosen_url: j
            },
            ...P.location_metadata && {
                location_metadata: P.location_metadata
            },
            pin_color: p,
            pin_shape: P.pin_shape,
            logo_id: x
        };
        Ce("pins_save_pin_clicked", {
            pin: q,
            page_domain: window.location.hostname,
            pin_save_type: "edit"
        }),
        chrome.runtime.sendMessage({
            messageType: "updatePin",
            pin: q,
            pinId: P.id,
            location: "browser"
        }).then(ue => {
            if (!ue.success) {
                nr("Error updating pin");
                return
            }
            Ce("pins_update_success", {
                pin_id: P.id,
                page_domain: window.location.hostname
            })
        }
        ),
        chrome.runtime.sendMessage({
            messageType: "stopDropPin"
        }),
        R(null),
        m(!1),
        y({
            x: 0,
            y: 0
        }),
        A(null),
        Oe(),
        g(null)
    }
      , pn = () => {
        k(!0)
    }
      , pt = H => {
        if (!P)
            return;
        k(!1),
        y({
            x: H.clientX - Ge,
            y: H.clientY - Ge
        }),
        A({
            x: H.clientX - Ge,
            y: H.clientY - Ge
        });
        const q = ai(H);
        R({
            ...P,
            location_metadata: q
        }),
        Ce("pins_reposition_during_edit", {
            pin_id: P.id,
            new_position: q,
            page_domain: window.location.hostname
        })
    }
      , Tt = H => {
        var ft, Dt, At, Io, Ro, Mo, No, Oo, Do, Ao, Lo;
        const q = De(ce.getState())
          , {element: te, parentIframe: ue} = or({
            selector: ((ft = H.location_metadata) == null ? void 0 : ft.selector) ?? null,
            attributes: ((Dt = H.location_metadata) == null ? void 0 : Dt.attributes) ?? null,
            xpath: ((At = H.location_metadata) == null ? void 0 : At.target_xpath) || "",
            tag: ((Io = H.location_metadata) == null ? void 0 : Io.target_tag) || "",
            text: ((Ro = H.location_metadata) == null ? void 0 : Ro.text) || "",
            parentAttributes: ((Mo = H.location_metadata) == null ? void 0 : Mo.target_parent_attributes) ?? null,
            parentTag: ((No = H.location_metadata) == null ? void 0 : No.target_parent_tag) ?? "",
            algoVersion: ((Oo = q.guideMeAlgo) == null ? void 0 : Oo.toString()) || "",
            algoV3Enabled: !!q.guideMeAlgoV3,
            isAiFallbackEnabled: !!q.guideMeAiFallback,
            isAiFallbackAlwaysOnEnabled: !!q.guideMeAiFallbackAlwaysOn,
            aiFallbackElementId: (Do = H.id) == null ? void 0 : Do.toString(),
            actionId: "",
            wasInIframe: ((Ao = H.location_metadata) == null ? void 0 : Ao.was_in_iframe) ?? null,
            iframeAttributes: ((Lo = H.location_metadata) == null ? void 0 : Lo.iframe_attributes) ?? null
        });
        return oi({
            pin: H,
            pinTarget: te,
            parentIframe: ue
        })
    }
      , Je = d.useCallback( (H, q) => {
        Ce("pins_edit_pin_clicked", {
            pin_id: H,
            page_domain: window.location.hostname,
            location: "browser"
        }),
        g(null);
        const te = e == null ? void 0 : e.find(ue => ue.id === H);
        te && (R(te),
        q && y(q),
        f(te.pin_color || Er),
        M(te.shared_with_orgs || [ve]),
        T(te.description || ""),
        C(te.user_chosen_url || te.url),
        E(te.logo_id || null))
    }
    , [e, ve])
      , Pt = () => {
        R(null),
        y({
            x: 0,
            y: 0
        }),
        A(null),
        Oe(),
        g(null)
    }
      , Be = H => {
        P && R({
            ...P,
            attached_file: H
        })
    }
      , et = () => {
        const {element: H} = Me(b);
        Ce("pins_creation_canceled", {
            pin_text: S,
            pin_teams: I,
            pin_color: p,
            page_domain: window.location.hostname,
            element: H
        }),
        m(!1),
        Oe(),
        g(null)
    }
      , It = P !== null;
    ec({
        isDropping: t,
        isPinning: u,
        isEditingPin: It,
        onDialogCancel: It ? Pt : et
    });
    const fn = H => {
        M(H)
    }
      , Rt = async () => {
        const H = await ir();
        n(H)
    }
    ;
    d.useEffect( () => (pi( () => {
        o(!0),
        Rt()
    }
    ),
    chrome.storage.local.onChanged.addListener(H => {
        if (H != null && H.isGuiding) {
            if (!H.isGuiding.newValue)
                return;
            const q = H.isGuiding.newValue === "true";
            n(q)
        }
    }
    ),
    () => {
        chrome.storage.local.onChanged.removeListener( () => {}
        )
    }
    ), []),
    d.useEffect( () => {
        const H = $ ? {
            ...$,
            external_id: $.id,
            value: $.id,
            label: $.name
        } : null;
        K(H)
    }
    , [$]),
    d.useEffect( () => {
        const H = q => {
            if (q.messageType === "showErrorToast" && nr(q.title),
            q.messageType === "editPin") {
                const te = e == null ? void 0 : e.find(ue => ue.id === q.pinId);
                if (te) {
                    const ue = Tt(te);
                    Je(q.pinId, ue)
                } else
                    Je(q.pinId)
            }
            q.messageType === "cancelEditPin" && Pt(),
            q.messageType === "setPinDocument" && K(q.document)
        }
        ;
        return chrome.runtime.onMessage.addListener(H),
        () => {
            chrome.runtime.onMessage.removeListener(H)
        }
    }
    , [e, Je]),
    d.useEffect( () => {
        const H = () => {
            if (!P)
                return;
            const q = Tt(P);
            y(q),
            A(q)
        }
        ;
        return P && window.addEventListener("scroll", H),
        () => {
            window.removeEventListener("scroll", H)
        }
    }
    , [P]);
    const mn = X(Xs);
    return s.jsxs(s.Fragment, {
        children: [e && e.length !== 0 && D && !r && !i && !mn && !l && s.jsxs(s.Fragment, {
            children: [Object.entries(z).map( ([H,q]) => {
                if (!U(q))
                    return null;
                const te = e.filter(ue => q.pinIds.includes(ue.id));
                return s.jsx(Uu, {
                    centerPosition: q.centerPosition,
                    pins: te,
                    deletePin: ii,
                    editPin: Je,
                    editingPin: P,
                    repositionPin: pt,
                    onRepositionStart: pn,
                    tempPinPosition: O
                }, H)
            }
            ), s.jsx(fd, {
                pins: e,
                isPinning: u,
                deletePin: ii,
                editPin: Je,
                editingPin: P,
                repositionPin: pt,
                onRepositionStart: pn,
                tempPinPosition: O,
                onCoordinatesUpdate: B,
                clusteredPinIds: F
            })]
        }), t && s.jsx(wr, {
            onPinDrop: ze,
            isDragging: h,
            color: p,
            logoUrl: L,
            pinShiftClickThrough: V
        }), (u && b || P) && s.jsxs(s.Fragment, {
            children: [s.jsx("div", {
                style: {
                    display: w || h ? "none" : "block"
                },
                children: s.jsx(_r, {
                    pinX: u && b ? b.x - Ge + tc : N.x,
                    pinY: u && b ? b.y - Ge : N.y,
                    isVisible: !0,
                    enableKeyboardCapture: !0,
                    children: s.jsx(sd, {
                        handleCreatePin: Qe,
                        selectedTeamIds: I,
                        onTeamChange: fn,
                        customColor: p,
                        onColorChange: f,
                        selectedLogoId: x,
                        onLogoChange: E,
                        pinUrl: j || "",
                        setPinUrl: C,
                        pinDescription: S,
                        onDescriptionChange: T,
                        selectedDocument: W,
                        setSelectedDocument: K,
                        editingPin: P,
                        handleUpdatePin: Zn,
                        handleCancelEdit: Pt,
                        handleDialogCancel: et,
                        handleUpdateEditingPinAttachedFile: Be
                    })
                })
            }), u && b && s.jsx(Wt, {
                color: p,
                logoUrl: L,
                ref: Q,
                x: b.x - Ge,
                y: b.y - Ge,
                animate: !0,
                enablePointerEvents: !0,
                enableDragging: !0,
                onDragStart: () => {
                    v(!0),
                    chrome.runtime.sendMessage({
                        messageType: "startDropPin",
                        scribe: W
                    })
                }
                ,
                onDragEnd: (H, q) => {
                    v(!1),
                    chrome.runtime.sendMessage({
                        messageType: "stopDropPin"
                    }),
                    ze(q),
                    pt(q)
                }
            })]
        })]
    })
}
;
var Ji = function(e) {
    return e.reduce(function(t, r) {
        var n = r[0]
          , i = r[1];
        return t[n] = i,
        t
    }, {})
}
  , ea = typeof window < "u" && window.document && window.document.createElement ? d.useLayoutEffect : d.useEffect
  , ye = "top"
  , Se = "bottom"
  , Te = "right"
  , we = "left"
  , Cr = "auto"
  , Xt = [ye, Se, Te, we]
  , vt = "start"
  , Yt = "end"
  , hd = "clippingParents"
  , ta = "viewport"
  , Kt = "popper"
  , gd = "reference"
  , na = Xt.reduce(function(e, t) {
    return e.concat([t + "-" + vt, t + "-" + Yt])
}, [])
  , ra = [].concat(Xt, [Cr]).reduce(function(e, t) {
    return e.concat([t, t + "-" + vt, t + "-" + Yt])
}, [])
  , bd = "beforeRead"
  , vd = "read"
  , xd = "afterRead"
  , yd = "beforeMain"
  , wd = "main"
  , _d = "afterMain"
  , kd = "beforeWrite"
  , Ed = "write"
  , Cd = "afterWrite"
  , jd = [bd, vd, xd, yd, wd, _d, kd, Ed, Cd];
function Le(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}
function Ee(e) {
    if (e == null)
        return window;
    if (e.toString() !== "[object Window]") {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}
function it(e) {
    var t = Ee(e).Element;
    return e instanceof t || e instanceof Element
}
function Pe(e) {
    var t = Ee(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement
}
function jr(e) {
    if (typeof ShadowRoot > "u")
        return !1;
    var t = Ee(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot
}
function Sd(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(r) {
        var n = t.styles[r] || {}
          , i = t.attributes[r] || {}
          , a = t.elements[r];
        !Pe(a) || !Le(a) || (Object.assign(a.style, n),
        Object.keys(i).forEach(function(c) {
            var l = i[c];
            l === !1 ? a.removeAttribute(c) : a.setAttribute(c, l === !0 ? "" : l)
        }))
    })
}
function Td(e) {
    var t = e.state
      , r = {
        popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
        },
        arrow: {
            position: "absolute"
        },
        reference: {}
    };
    return Object.assign(t.elements.popper.style, r.popper),
    t.styles = r,
    t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
    function() {
        Object.keys(t.elements).forEach(function(n) {
            var i = t.elements[n]
              , a = t.attributes[n] || {}
              , c = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n])
              , l = c.reduce(function(u, m) {
                return u[m] = "",
                u
            }, {});
            !Pe(i) || !Le(i) || (Object.assign(i.style, l),
            Object.keys(a).forEach(function(u) {
                i.removeAttribute(u)
            }))
        })
    }
}
const Pd = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: Sd,
    effect: Td,
    requires: ["computeStyles"]
};
function Fe(e) {
    return e.split("-")[0]
}
var at = Math.max
  , yn = Math.min
  , xt = Math.round;
function Sr() {
    var e = navigator.userAgentData;
    return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}
function oa() {
    return !/^((?!chrome|android).)*safari/i.test(Sr())
}
function yt(e, t, r) {
    t === void 0 && (t = !1),
    r === void 0 && (r = !1);
    var n = e.getBoundingClientRect()
      , i = 1
      , a = 1;
    t && Pe(e) && (i = e.offsetWidth > 0 && xt(n.width) / e.offsetWidth || 1,
    a = e.offsetHeight > 0 && xt(n.height) / e.offsetHeight || 1);
    var c = it(e) ? Ee(e) : window
      , l = c.visualViewport
      , u = !oa() && r
      , m = (n.left + (u && l ? l.offsetLeft : 0)) / i
      , h = (n.top + (u && l ? l.offsetTop : 0)) / a
      , v = n.width / i
      , w = n.height / a;
    return {
        width: v,
        height: w,
        top: h,
        right: m + v,
        bottom: h + w,
        left: m,
        x: m,
        y: h
    }
}
function Tr(e) {
    var t = yt(e)
      , r = e.offsetWidth
      , n = e.offsetHeight;
    return Math.abs(t.width - r) <= 1 && (r = t.width),
    Math.abs(t.height - n) <= 1 && (n = t.height),
    {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: r,
        height: n
    }
}
function ia(e, t) {
    var r = t.getRootNode && t.getRootNode();
    if (e.contains(t))
        return !0;
    if (r && jr(r)) {
        var n = t;
        do {
            if (n && e.isSameNode(n))
                return !0;
            n = n.parentNode || n.host
        } while (n)
    }
    return !1
}
function $e(e) {
    return Ee(e).getComputedStyle(e)
}
function Id(e) {
    return ["table", "td", "th"].indexOf(Le(e)) >= 0
}
function Xe(e) {
    return ((it(e) ? e.ownerDocument : e.document) || window.document).documentElement
}
function wn(e) {
    return Le(e) === "html" ? e : e.assignedSlot || e.parentNode || (jr(e) ? e.host : null) || Xe(e)
}
function aa(e) {
    return !Pe(e) || $e(e).position === "fixed" ? null : e.offsetParent
}
function Rd(e) {
    var t = /firefox/i.test(Sr())
      , r = /Trident/i.test(Sr());
    if (r && Pe(e)) {
        var n = $e(e);
        if (n.position === "fixed")
            return null
    }
    var i = wn(e);
    for (jr(i) && (i = i.host); Pe(i) && ["html", "body"].indexOf(Le(i)) < 0; ) {
        var a = $e(i);
        if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
            return i;
        i = i.parentNode
    }
    return null
}
function Zt(e) {
    for (var t = Ee(e), r = aa(e); r && Id(r) && $e(r).position === "static"; )
        r = aa(r);
    return r && (Le(r) === "html" || Le(r) === "body" && $e(r).position === "static") ? t : r || Rd(e) || t
}
function Pr(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}
function Qt(e, t, r) {
    return at(e, yn(t, r))
}
function Md(e, t, r) {
    var n = Qt(e, t, r);
    return n > r ? r : n
}
function sa() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}
function la(e) {
    return Object.assign({}, sa(), e)
}
function ca(e, t) {
    return t.reduce(function(r, n) {
        return r[n] = e,
        r
    }, {})
}
var Nd = function(e, t) {
    return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
        placement: t.placement
    })) : e,
    la(typeof e != "number" ? e : ca(e, Xt))
};
function Od(e) {
    var t, r = e.state, n = e.name, i = e.options, a = r.elements.arrow, c = r.modifiersData.popperOffsets, l = Fe(r.placement), u = Pr(l), m = [we, Te].indexOf(l) >= 0, h = m ? "height" : "width";
    if (!(!a || !c)) {
        var v = Nd(i.padding, r)
          , w = Tr(a)
          , k = u === "y" ? ye : we
          , b = u === "y" ? Se : Te
          , g = r.rects.reference[h] + r.rects.reference[u] - c[u] - r.rects.popper[h]
          , _ = c[u] - r.rects.reference[u]
          , I = Zt(a)
          , M = I ? u === "y" ? I.clientHeight || 0 : I.clientWidth || 0 : 0
          , D = g / 2 - _ / 2
          , o = v[k]
          , p = M - w[h] - v[b]
          , f = M / 2 - w[h] / 2 + D
          , x = Qt(o, f, p)
          , E = u;
        r.modifiersData[n] = (t = {},
        t[E] = x,
        t.centerOffset = x - f,
        t)
    }
}
function Dd(e) {
    var t = e.state
      , r = e.options
      , n = r.element
      , i = n === void 0 ? "[data-popper-arrow]" : n;
    i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i),
    !i) || ia(t.elements.popper, i) && (t.elements.arrow = i))
}
const Ad = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: Od,
    effect: Dd,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};
function wt(e) {
    return e.split("-")[1]
}
var Ld = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};
function Fd(e, t) {
    var r = e.x
      , n = e.y
      , i = t.devicePixelRatio || 1;
    return {
        x: xt(r * i) / i || 0,
        y: xt(n * i) / i || 0
    }
}
function ua(e) {
    var t, r = e.popper, n = e.popperRect, i = e.placement, a = e.variation, c = e.offsets, l = e.position, u = e.gpuAcceleration, m = e.adaptive, h = e.roundOffsets, v = e.isFixed, w = c.x, k = w === void 0 ? 0 : w, b = c.y, g = b === void 0 ? 0 : b, _ = typeof h == "function" ? h({
        x: k,
        y: g
    }) : {
        x: k,
        y: g
    };
    k = _.x,
    g = _.y;
    var I = c.hasOwnProperty("x")
      , M = c.hasOwnProperty("y")
      , D = we
      , o = ye
      , p = window;
    if (m) {
        var f = Zt(r)
          , x = "clientHeight"
          , E = "clientWidth";
        if (f === Ee(r) && (f = Xe(r),
        $e(f).position !== "static" && l === "absolute" && (x = "scrollHeight",
        E = "scrollWidth")),
        f = f,
        i === ye || (i === we || i === Te) && a === Yt) {
            o = Se;
            var j = v && f === p && p.visualViewport ? p.visualViewport.height : f[x];
            g -= j - n.height,
            g *= u ? 1 : -1
        }
        if (i === we || (i === ye || i === Se) && a === Yt) {
            D = Te;
            var C = v && f === p && p.visualViewport ? p.visualViewport.width : f[E];
            k -= C - n.width,
            k *= u ? 1 : -1
        }
    }
    var S = Object.assign({
        position: l
    }, m && Ld)
      , T = h === !0 ? Fd({
        x: k,
        y: g
    }, Ee(r)) : {
        x: k,
        y: g
    };
    if (k = T.x,
    g = T.y,
    u) {
        var P;
        return Object.assign({}, S, (P = {},
        P[o] = M ? "0" : "",
        P[D] = I ? "0" : "",
        P.transform = (p.devicePixelRatio || 1) <= 1 ? "translate(" + k + "px, " + g + "px)" : "translate3d(" + k + "px, " + g + "px, 0)",
        P))
    }
    return Object.assign({}, S, (t = {},
    t[o] = M ? g + "px" : "",
    t[D] = I ? k + "px" : "",
    t.transform = "",
    t))
}
function zd(e) {
    var t = e.state
      , r = e.options
      , n = r.gpuAcceleration
      , i = n === void 0 ? !0 : n
      , a = r.adaptive
      , c = a === void 0 ? !0 : a
      , l = r.roundOffsets
      , u = l === void 0 ? !0 : l
      , m = {
        placement: Fe(t.placement),
        variation: wt(t.placement),
        popper: t.elements.popper,
        popperRect: t.rects.popper,
        gpuAcceleration: i,
        isFixed: t.options.strategy === "fixed"
    };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ua(Object.assign({}, m, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: c,
        roundOffsets: u
    })))),
    t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ua(Object.assign({}, m, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: u
    })))),
    t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
const Bd = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: zd,
    data: {}
};
var _n = {
    passive: !0
};
function Hd(e) {
    var t = e.state
      , r = e.instance
      , n = e.options
      , i = n.scroll
      , a = i === void 0 ? !0 : i
      , c = n.resize
      , l = c === void 0 ? !0 : c
      , u = Ee(t.elements.popper)
      , m = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return a && m.forEach(function(h) {
        h.addEventListener("scroll", r.update, _n)
    }),
    l && u.addEventListener("resize", r.update, _n),
    function() {
        a && m.forEach(function(h) {
            h.removeEventListener("scroll", r.update, _n)
        }),
        l && u.removeEventListener("resize", r.update, _n)
    }
}
const $d = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: Hd,
    data: {}
};
var Ud = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};
function kn(e) {
    return e.replace(/left|right|bottom|top/g, function(t) {
        return Ud[t]
    })
}
var Vd = {
    start: "end",
    end: "start"
};
function da(e) {
    return e.replace(/start|end/g, function(t) {
        return Vd[t]
    })
}
function Ir(e) {
    var t = Ee(e)
      , r = t.pageXOffset
      , n = t.pageYOffset;
    return {
        scrollLeft: r,
        scrollTop: n
    }
}
function Rr(e) {
    return yt(Xe(e)).left + Ir(e).scrollLeft
}
function qd(e, t) {
    var r = Ee(e)
      , n = Xe(e)
      , i = r.visualViewport
      , a = n.clientWidth
      , c = n.clientHeight
      , l = 0
      , u = 0;
    if (i) {
        a = i.width,
        c = i.height;
        var m = oa();
        (m || !m && t === "fixed") && (l = i.offsetLeft,
        u = i.offsetTop)
    }
    return {
        width: a,
        height: c,
        x: l + Rr(e),
        y: u
    }
}
function Gd(e) {
    var t, r = Xe(e), n = Ir(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, a = at(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), c = at(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -n.scrollLeft + Rr(e), u = -n.scrollTop;
    return $e(i || r).direction === "rtl" && (l += at(r.clientWidth, i ? i.clientWidth : 0) - a),
    {
        width: a,
        height: c,
        x: l,
        y: u
    }
}
function Mr(e) {
    var t = $e(e)
      , r = t.overflow
      , n = t.overflowX
      , i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(r + i + n)
}
function pa(e) {
    return ["html", "body", "#document"].indexOf(Le(e)) >= 0 ? e.ownerDocument.body : Pe(e) && Mr(e) ? e : pa(wn(e))
}
function Jt(e, t) {
    var r;
    t === void 0 && (t = []);
    var n = pa(e)
      , i = n === ((r = e.ownerDocument) == null ? void 0 : r.body)
      , a = Ee(n)
      , c = i ? [a].concat(a.visualViewport || [], Mr(n) ? n : []) : n
      , l = t.concat(c);
    return i ? l : l.concat(Jt(wn(c)))
}
function Nr(e) {
    return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height
    })
}
function Wd(e, t) {
    var r = yt(e, !1, t === "fixed");
    return r.top = r.top + e.clientTop,
    r.left = r.left + e.clientLeft,
    r.bottom = r.top + e.clientHeight,
    r.right = r.left + e.clientWidth,
    r.width = e.clientWidth,
    r.height = e.clientHeight,
    r.x = r.left,
    r.y = r.top,
    r
}
function fa(e, t, r) {
    return t === ta ? Nr(qd(e, r)) : it(t) ? Wd(t, r) : Nr(Gd(Xe(e)))
}
function Xd(e) {
    var t = Jt(wn(e))
      , r = ["absolute", "fixed"].indexOf($e(e).position) >= 0
      , n = r && Pe(e) ? Zt(e) : e;
    return it(n) ? t.filter(function(i) {
        return it(i) && ia(i, n) && Le(i) !== "body"
    }) : []
}
function Yd(e, t, r, n) {
    var i = t === "clippingParents" ? Xd(e) : [].concat(t)
      , a = [].concat(i, [r])
      , c = a[0]
      , l = a.reduce(function(u, m) {
        var h = fa(e, m, n);
        return u.top = at(h.top, u.top),
        u.right = yn(h.right, u.right),
        u.bottom = yn(h.bottom, u.bottom),
        u.left = at(h.left, u.left),
        u
    }, fa(e, c, n));
    return l.width = l.right - l.left,
    l.height = l.bottom - l.top,
    l.x = l.left,
    l.y = l.top,
    l
}
function ma(e) {
    var t = e.reference, r = e.element, n = e.placement, i = n ? Fe(n) : null, a = n ? wt(n) : null, c = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, u;
    switch (i) {
    case ye:
        u = {
            x: c,
            y: t.y - r.height
        };
        break;
    case Se:
        u = {
            x: c,
            y: t.y + t.height
        };
        break;
    case Te:
        u = {
            x: t.x + t.width,
            y: l
        };
        break;
    case we:
        u = {
            x: t.x - r.width,
            y: l
        };
        break;
    default:
        u = {
            x: t.x,
            y: t.y
        }
    }
    var m = i ? Pr(i) : null;
    if (m != null) {
        var h = m === "y" ? "height" : "width";
        switch (a) {
        case vt:
            u[m] = u[m] - (t[h] / 2 - r[h] / 2);
            break;
        case Yt:
            u[m] = u[m] + (t[h] / 2 - r[h] / 2);
            break
        }
    }
    return u
}
function en(e, t) {
    t === void 0 && (t = {});
    var r = t
      , n = r.placement
      , i = n === void 0 ? e.placement : n
      , a = r.strategy
      , c = a === void 0 ? e.strategy : a
      , l = r.boundary
      , u = l === void 0 ? hd : l
      , m = r.rootBoundary
      , h = m === void 0 ? ta : m
      , v = r.elementContext
      , w = v === void 0 ? Kt : v
      , k = r.altBoundary
      , b = k === void 0 ? !1 : k
      , g = r.padding
      , _ = g === void 0 ? 0 : g
      , I = la(typeof _ != "number" ? _ : ca(_, Xt))
      , M = w === Kt ? gd : Kt
      , D = e.rects.popper
      , o = e.elements[b ? M : w]
      , p = Yd(it(o) ? o : o.contextElement || Xe(e.elements.popper), u, h, c)
      , f = yt(e.elements.reference)
      , x = ma({
        reference: f,
        element: D,
        strategy: "absolute",
        placement: i
    })
      , E = Nr(Object.assign({}, D, x))
      , j = w === Kt ? E : f
      , C = {
        top: p.top - j.top + I.top,
        bottom: j.bottom - p.bottom + I.bottom,
        left: p.left - j.left + I.left,
        right: j.right - p.right + I.right
    }
      , S = e.modifiersData.offset;
    if (w === Kt && S) {
        var T = S[i];
        Object.keys(C).forEach(function(P) {
            var R = [Te, Se].indexOf(P) >= 0 ? 1 : -1
              , N = [ye, Se].indexOf(P) >= 0 ? "y" : "x";
            C[P] += T[N] * R
        })
    }
    return C
}
function Kd(e, t) {
    t === void 0 && (t = {});
    var r = t
      , n = r.placement
      , i = r.boundary
      , a = r.rootBoundary
      , c = r.padding
      , l = r.flipVariations
      , u = r.allowedAutoPlacements
      , m = u === void 0 ? ra : u
      , h = wt(n)
      , v = h ? l ? na : na.filter(function(b) {
        return wt(b) === h
    }) : Xt
      , w = v.filter(function(b) {
        return m.indexOf(b) >= 0
    });
    w.length === 0 && (w = v);
    var k = w.reduce(function(b, g) {
        return b[g] = en(e, {
            placement: g,
            boundary: i,
            rootBoundary: a,
            padding: c
        })[Fe(g)],
        b
    }, {});
    return Object.keys(k).sort(function(b, g) {
        return k[b] - k[g]
    })
}
function Zd(e) {
    if (Fe(e) === Cr)
        return [];
    var t = kn(e);
    return [da(e), t, da(t)]
}
function Qd(e) {
    var t = e.state
      , r = e.options
      , n = e.name;
    if (!t.modifiersData[n]._skip) {
        for (var i = r.mainAxis, a = i === void 0 ? !0 : i, c = r.altAxis, l = c === void 0 ? !0 : c, u = r.fallbackPlacements, m = r.padding, h = r.boundary, v = r.rootBoundary, w = r.altBoundary, k = r.flipVariations, b = k === void 0 ? !0 : k, g = r.allowedAutoPlacements, _ = t.options.placement, I = Fe(_), M = I === _, D = u || (M || !b ? [kn(_)] : Zd(_)), o = [_].concat(D).reduce(function(V, $) {
            return V.concat(Fe($) === Cr ? Kd(t, {
                placement: $,
                boundary: h,
                rootBoundary: v,
                padding: m,
                flipVariations: b,
                allowedAutoPlacements: g
            }) : $)
        }, []), p = t.rects.reference, f = t.rects.popper, x = new Map, E = !0, j = o[0], C = 0; C < o.length; C++) {
            var S = o[C]
              , T = Fe(S)
              , P = wt(S) === vt
              , R = [ye, Se].indexOf(T) >= 0
              , N = R ? "width" : "height"
              , y = en(t, {
                placement: S,
                boundary: h,
                rootBoundary: v,
                altBoundary: w,
                padding: m
            })
              , O = R ? P ? Te : we : P ? Se : ye;
            p[N] > f[N] && (O = kn(O));
            var A = kn(O)
              , L = [];
            if (a && L.push(y[T] <= 0),
            l && L.push(y[O] <= 0, y[A] <= 0),
            L.every(function(V) {
                return V
            })) {
                j = S,
                E = !1;
                break
            }
            x.set(S, L)
        }
        if (E)
            for (var z = b ? 3 : 1, F = function(V) {
                var $ = o.find(function(W) {
                    var K = x.get(W);
                    if (K)
                        return K.slice(0, V).every(function(Q) {
                            return Q
                        })
                });
                if ($)
                    return j = $,
                    "break"
            }, B = z; B > 0; B--) {
                var U = F(B);
                if (U === "break")
                    break
            }
        t.placement !== j && (t.modifiersData[n]._skip = !0,
        t.placement = j,
        t.reset = !0)
    }
}
const Jd = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: Qd,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};
function ha(e, t, r) {
    return r === void 0 && (r = {
        x: 0,
        y: 0
    }),
    {
        top: e.top - t.height - r.y,
        right: e.right - t.width + r.x,
        bottom: e.bottom - t.height + r.y,
        left: e.left - t.width - r.x
    }
}
function ga(e) {
    return [ye, Te, Se, we].some(function(t) {
        return e[t] >= 0
    })
}
function ep(e) {
    var t = e.state
      , r = e.name
      , n = t.rects.reference
      , i = t.rects.popper
      , a = t.modifiersData.preventOverflow
      , c = en(t, {
        elementContext: "reference"
    })
      , l = en(t, {
        altBoundary: !0
    })
      , u = ha(c, n)
      , m = ha(l, i, a)
      , h = ga(u)
      , v = ga(m);
    t.modifiersData[r] = {
        referenceClippingOffsets: u,
        popperEscapeOffsets: m,
        isReferenceHidden: h,
        hasPopperEscaped: v
    },
    t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": h,
        "data-popper-escaped": v
    })
}
const tp = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: ep
};
function np(e, t, r) {
    var n = Fe(e)
      , i = [we, ye].indexOf(n) >= 0 ? -1 : 1
      , a = typeof r == "function" ? r(Object.assign({}, t, {
        placement: e
    })) : r
      , c = a[0]
      , l = a[1];
    return c = c || 0,
    l = (l || 0) * i,
    [we, Te].indexOf(n) >= 0 ? {
        x: l,
        y: c
    } : {
        x: c,
        y: l
    }
}
function rp(e) {
    var t = e.state
      , r = e.options
      , n = e.name
      , i = r.offset
      , a = i === void 0 ? [0, 0] : i
      , c = ra.reduce(function(h, v) {
        return h[v] = np(v, t.rects, a),
        h
    }, {})
      , l = c[t.placement]
      , u = l.x
      , m = l.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u,
    t.modifiersData.popperOffsets.y += m),
    t.modifiersData[n] = c
}
const op = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: rp
};
function ip(e) {
    var t = e.state
      , r = e.name;
    t.modifiersData[r] = ma({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement
    })
}
const ap = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: ip,
    data: {}
};
function sp(e) {
    return e === "x" ? "y" : "x"
}
function lp(e) {
    var t = e.state
      , r = e.options
      , n = e.name
      , i = r.mainAxis
      , a = i === void 0 ? !0 : i
      , c = r.altAxis
      , l = c === void 0 ? !1 : c
      , u = r.boundary
      , m = r.rootBoundary
      , h = r.altBoundary
      , v = r.padding
      , w = r.tether
      , k = w === void 0 ? !0 : w
      , b = r.tetherOffset
      , g = b === void 0 ? 0 : b
      , _ = en(t, {
        boundary: u,
        rootBoundary: m,
        padding: v,
        altBoundary: h
    })
      , I = Fe(t.placement)
      , M = wt(t.placement)
      , D = !M
      , o = Pr(I)
      , p = sp(o)
      , f = t.modifiersData.popperOffsets
      , x = t.rects.reference
      , E = t.rects.popper
      , j = typeof g == "function" ? g(Object.assign({}, t.rects, {
        placement: t.placement
    })) : g
      , C = typeof j == "number" ? {
        mainAxis: j,
        altAxis: j
    } : Object.assign({
        mainAxis: 0,
        altAxis: 0
    }, j)
      , S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null
      , T = {
        x: 0,
        y: 0
    };
    if (f) {
        if (a) {
            var P, R = o === "y" ? ye : we, N = o === "y" ? Se : Te, y = o === "y" ? "height" : "width", O = f[o], A = O + _[R], L = O - _[N], z = k ? -E[y] / 2 : 0, F = M === vt ? x[y] : E[y], B = M === vt ? -E[y] : -x[y], U = t.elements.arrow, V = k && U ? Tr(U) : {
                width: 0,
                height: 0
            }, $ = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : sa(), W = $[R], K = $[N], Q = Qt(0, x[y], V[y]), ve = D ? x[y] / 2 - z - Q - W - C.mainAxis : F - Q - W - C.mainAxis, Me = D ? -x[y] / 2 + z + Q + K + C.mainAxis : B + Q + K + C.mainAxis, ze = t.elements.arrow && Zt(t.elements.arrow), Qe = ze ? o === "y" ? ze.clientTop || 0 : ze.clientLeft || 0 : 0, Oe = (P = S == null ? void 0 : S[o]) != null ? P : 0, Zn = O + ve - Oe - Qe, pn = O + Me - Oe, pt = Qt(k ? yn(A, Zn) : A, O, k ? at(L, pn) : L);
            f[o] = pt,
            T[o] = pt - O
        }
        if (l) {
            var Tt, Je = o === "x" ? ye : we, Pt = o === "x" ? Se : Te, Be = f[p], et = p === "y" ? "height" : "width", It = Be + _[Je], fn = Be - _[Pt], Rt = [ye, we].indexOf(I) !== -1, mn = (Tt = S == null ? void 0 : S[p]) != null ? Tt : 0, Mt = Rt ? It : Be - x[et] - E[et] - mn + C.altAxis, Nt = Rt ? Be + x[et] + E[et] - mn - C.altAxis : fn, Ot = k && Rt ? Md(Mt, Be, Nt) : Qt(k ? Mt : It, Be, k ? Nt : fn);
            f[p] = Ot,
            T[p] = Ot - Be
        }
        t.modifiersData[n] = T
    }
}
const cp = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: lp,
    requiresIfExists: ["offset"]
};
function up(e) {
    return {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    }
}
function dp(e) {
    return e === Ee(e) || !Pe(e) ? Ir(e) : up(e)
}
function pp(e) {
    var t = e.getBoundingClientRect()
      , r = xt(t.width) / e.offsetWidth || 1
      , n = xt(t.height) / e.offsetHeight || 1;
    return r !== 1 || n !== 1
}
function fp(e, t, r) {
    r === void 0 && (r = !1);
    var n = Pe(t)
      , i = Pe(t) && pp(t)
      , a = Xe(t)
      , c = yt(e, i, r)
      , l = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , u = {
        x: 0,
        y: 0
    };
    return (n || !n && !r) && ((Le(t) !== "body" || Mr(a)) && (l = dp(t)),
    Pe(t) ? (u = yt(t, !0),
    u.x += t.clientLeft,
    u.y += t.clientTop) : a && (u.x = Rr(a))),
    {
        x: c.left + l.scrollLeft - u.x,
        y: c.top + l.scrollTop - u.y,
        width: c.width,
        height: c.height
    }
}
function mp(e) {
    var t = new Map
      , r = new Set
      , n = [];
    e.forEach(function(a) {
        t.set(a.name, a)
    });
    function i(a) {
        r.add(a.name);
        var c = [].concat(a.requires || [], a.requiresIfExists || []);
        c.forEach(function(l) {
            if (!r.has(l)) {
                var u = t.get(l);
                u && i(u)
            }
        }),
        n.push(a)
    }
    return e.forEach(function(a) {
        r.has(a.name) || i(a)
    }),
    n
}
function hp(e) {
    var t = mp(e);
    return jd.reduce(function(r, n) {
        return r.concat(t.filter(function(i) {
            return i.phase === n
        }))
    }, [])
}
function gp(e) {
    var t;
    return function() {
        return t || (t = new Promise(function(r) {
            Promise.resolve().then(function() {
                t = void 0,
                r(e())
            })
        }
        )),
        t
    }
}
function bp(e) {
    var t = e.reduce(function(r, n) {
        var i = r[n.name];
        return r[n.name] = i ? Object.assign({}, i, n, {
            options: Object.assign({}, i.options, n.options),
            data: Object.assign({}, i.data, n.data)
        }) : n,
        r
    }, {});
    return Object.keys(t).map(function(r) {
        return t[r]
    })
}
var ba = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};
function va() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
    return !t.some(function(n) {
        return !(n && typeof n.getBoundingClientRect == "function")
    })
}
function vp(e) {
    e === void 0 && (e = {});
    var t = e
      , r = t.defaultModifiers
      , n = r === void 0 ? [] : r
      , i = t.defaultOptions
      , a = i === void 0 ? ba : i;
    return function(c, l, u) {
        u === void 0 && (u = a);
        var m = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, ba, a),
            modifiersData: {},
            elements: {
                reference: c,
                popper: l
            },
            attributes: {},
            styles: {}
        }
          , h = []
          , v = !1
          , w = {
            state: m,
            setOptions: function(g) {
                var _ = typeof g == "function" ? g(m.options) : g;
                b(),
                m.options = Object.assign({}, a, m.options, _),
                m.scrollParents = {
                    reference: it(c) ? Jt(c) : c.contextElement ? Jt(c.contextElement) : [],
                    popper: Jt(l)
                };
                var I = hp(bp([].concat(n, m.options.modifiers)));
                return m.orderedModifiers = I.filter(function(M) {
                    return M.enabled
                }),
                k(),
                w.update()
            },
            forceUpdate: function() {
                if (!v) {
                    var g = m.elements
                      , _ = g.reference
                      , I = g.popper;
                    if (va(_, I)) {
                        m.rects = {
                            reference: fp(_, Zt(I), m.options.strategy === "fixed"),
                            popper: Tr(I)
                        },
                        m.reset = !1,
                        m.placement = m.options.placement,
                        m.orderedModifiers.forEach(function(E) {
                            return m.modifiersData[E.name] = Object.assign({}, E.data)
                        });
                        for (var M = 0; M < m.orderedModifiers.length; M++) {
                            if (m.reset === !0) {
                                m.reset = !1,
                                M = -1;
                                continue
                            }
                            var D = m.orderedModifiers[M]
                              , o = D.fn
                              , p = D.options
                              , f = p === void 0 ? {} : p
                              , x = D.name;
                            typeof o == "function" && (m = o({
                                state: m,
                                options: f,
                                name: x,
                                instance: w
                            }) || m)
                        }
                    }
                }
            },
            update: gp(function() {
                return new Promise(function(g) {
                    w.forceUpdate(),
                    g(m)
                }
                )
            }),
            destroy: function() {
                b(),
                v = !0
            }
        };
        if (!va(c, l))
            return w;
        w.setOptions(u).then(function(g) {
            !v && u.onFirstUpdate && u.onFirstUpdate(g)
        });
        function k() {
            m.orderedModifiers.forEach(function(g) {
                var _ = g.name
                  , I = g.options
                  , M = I === void 0 ? {} : I
                  , D = g.effect;
                if (typeof D == "function") {
                    var o = D({
                        state: m,
                        name: _,
                        instance: w,
                        options: M
                    })
                      , p = function() {};
                    h.push(o || p)
                }
            })
        }
        function b() {
            h.forEach(function(g) {
                return g()
            }),
            h = []
        }
        return w
    }
}
var xp = [$d, ap, Bd, Pd, op, Jd, cp, Ad, tp]
  , yp = vp({
    defaultModifiers: xp
})
  , wp = typeof Element < "u"
  , _p = typeof Map == "function"
  , kp = typeof Set == "function"
  , Ep = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function En(e, t) {
    if (e === t)
        return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
        if (e.constructor !== t.constructor)
            return !1;
        var r, n, i;
        if (Array.isArray(e)) {
            if (r = e.length,
            r != t.length)
                return !1;
            for (n = r; n-- !== 0; )
                if (!En(e[n], t[n]))
                    return !1;
            return !0
        }
        var a;
        if (_p && e instanceof Map && t instanceof Map) {
            if (e.size !== t.size)
                return !1;
            for (a = e.entries(); !(n = a.next()).done; )
                if (!t.has(n.value[0]))
                    return !1;
            for (a = e.entries(); !(n = a.next()).done; )
                if (!En(n.value[1], t.get(n.value[0])))
                    return !1;
            return !0
        }
        if (kp && e instanceof Set && t instanceof Set) {
            if (e.size !== t.size)
                return !1;
            for (a = e.entries(); !(n = a.next()).done; )
                if (!t.has(n.value[0]))
                    return !1;
            return !0
        }
        if (Ep && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
            if (r = e.length,
            r != t.length)
                return !1;
            for (n = r; n-- !== 0; )
                if (e[n] !== t[n])
                    return !1;
            return !0
        }
        if (e.constructor === RegExp)
            return e.source === t.source && e.flags === t.flags;
        if (e.valueOf !== Object.prototype.valueOf && typeof e.valueOf == "function" && typeof t.valueOf == "function")
            return e.valueOf() === t.valueOf();
        if (e.toString !== Object.prototype.toString && typeof e.toString == "function" && typeof t.toString == "function")
            return e.toString() === t.toString();
        if (i = Object.keys(e),
        r = i.length,
        r !== Object.keys(t).length)
            return !1;
        for (n = r; n-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(t, i[n]))
                return !1;
        if (wp && e instanceof Element)
            return !1;
        for (n = r; n-- !== 0; )
            if (!((i[n] === "_owner" || i[n] === "__v" || i[n] === "__o") && e.$$typeof) && !En(e[i[n]], t[i[n]]))
                return !1;
        return !0
    }
    return e !== e && t !== t
}
var Cp = function(e, t) {
    try {
        return En(e, t)
    } catch (r) {
        if ((r.message || "").match(/stack|recursion/i))
            return console.warn("react-fast-compare cannot handle circular refs"),
            !1;
        throw r
    }
};
const jp = cr(Cp);
var Sp = []
  , xa = function(e, t, r) {
    r === void 0 && (r = {});
    var n = d.useRef(null)
      , i = {
        onFirstUpdate: r.onFirstUpdate,
        placement: r.placement || "bottom",
        strategy: r.strategy || "absolute",
        modifiers: r.modifiers || Sp
    }
      , a = d.useState({
        styles: {
            popper: {
                position: i.strategy,
                left: "0",
                top: "0"
            },
            arrow: {
                position: "absolute"
            }
        },
        attributes: {}
    })
      , c = a[0]
      , l = a[1]
      , u = d.useMemo(function() {
        return {
            name: "updateState",
            enabled: !0,
            phase: "write",
            fn: function(v) {
                var w = v.state
                  , k = Object.keys(w.elements);
                zo.flushSync(function() {
                    l({
                        styles: Ji(k.map(function(b) {
                            return [b, w.styles[b] || {}]
                        })),
                        attributes: Ji(k.map(function(b) {
                            return [b, w.attributes[b]]
                        }))
                    })
                })
            },
            requires: ["computeStyles"]
        }
    }, [])
      , m = d.useMemo(function() {
        var v = {
            onFirstUpdate: i.onFirstUpdate,
            placement: i.placement,
            strategy: i.strategy,
            modifiers: [].concat(i.modifiers, [u, {
                name: "applyStyles",
                enabled: !1
            }])
        };
        return jp(n.current, v) ? n.current || v : (n.current = v,
        v)
    }, [i.onFirstUpdate, i.placement, i.strategy, i.modifiers, u])
      , h = d.useRef();
    return ea(function() {
        h.current && h.current.setOptions(m)
    }, [m]),
    ea(function() {
        if (!(e == null || t == null)) {
            var v = r.createPopper || yp
              , w = v(e, t, m);
            return h.current = w,
            function() {
                w.destroy(),
                h.current = null
            }
        }
    }, [e, t, r.createPopper]),
    {
        state: h.current ? h.current.state : null,
        styles: c.styles,
        attributes: c.attributes,
        update: h.current ? h.current.update : null,
        forceUpdate: h.current ? h.current.forceUpdate : null
    }
};
function Ie() {
    let e = []
      , t = []
      , r = {
        enqueue(n) {
            t.push(n)
        },
        requestAnimationFrame(...n) {
            let i = requestAnimationFrame(...n);
            r.add( () => cancelAnimationFrame(i))
        },
        nextFrame(...n) {
            r.requestAnimationFrame( () => {
                r.requestAnimationFrame(...n)
            }
            )
        },
        setTimeout(...n) {
            let i = setTimeout(...n);
            r.add( () => clearTimeout(i))
        },
        add(n) {
            e.push(n)
        },
        dispose() {
            for (let n of e.splice(0))
                n()
        },
        async workQueue() {
            for (let n of t.splice(0))
                await n()
        }
    };
    return r
}
function st() {
    let[e] = d.useState(Ie);
    return d.useEffect( () => () => e.dispose(), [e]),
    e
}
var Y = typeof window < "u" ? d.useLayoutEffect : d.useEffect
  , Or = {
    serverHandoffComplete: !1
};
function Cn() {
    let[e,t] = d.useState(Or.serverHandoffComplete);
    return d.useEffect( () => {
        e !== !0 && t(!0)
    }
    , [e]),
    d.useEffect( () => {
        Or.serverHandoffComplete === !1 && (Or.serverHandoffComplete = !0)
    }
    , []),
    e
}
var Tp = 0;
function ya() {
    return ++Tp
}
function ie() {
    let e = Cn()
      , [t,r] = d.useState(e ? ya : null);
    return Y( () => {
        t === null && r(ya())
    }
    , [t]),
    t != null ? "" + t : void 0
}
function wa(e) {
    let t = d.useRef(e);
    return d.useEffect( () => {
        t.current = e
    }
    , [e]),
    t
}
function tn(e, t) {
    let[r,n] = d.useState(e)
      , i = wa(e);
    return Y( () => n(i.current), [i, n, ...t]),
    r
}
function he(...e) {
    let t = d.useRef(e);
    return d.useEffect( () => {
        t.current = e
    }
    , [e]),
    d.useCallback(r => {
        for (let n of t.current)
            n != null && (typeof n == "function" ? n(r) : n.current = r)
    }
    , [t])
}
function ne(e, t, ...r) {
    if (e in t) {
        let i = t[e];
        return typeof i == "function" ? i(...r) : i
    }
    let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(i => `"${i}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, ne),
    n
}
function ee({props: e, slot: t, defaultTag: r, features: n, visible: i=!0, name: a}) {
    if (i)
        return jn(e, t, r, a);
    let c = n ?? 0;
    if (c & 2) {
        let {static: l=!1, ...u} = e;
        if (l)
            return jn(u, t, r, a)
    }
    if (c & 1) {
        let {unmount: l=!0, ...u} = e;
        return ne(l ? 0 : 1, {
            0() {
                return null
            },
            1() {
                return jn({
                    ...u,
                    hidden: !0,
                    style: {
                        display: "none"
                    }
                }, t, r, a)
            }
        })
    }
    return jn(e, t, r, a)
}
function jn(e, t={}, r, n) {
    let {as: i=r, children: a, refName: c="ref", ...l} = Dr(e, ["unmount", "static"])
      , u = e.ref !== void 0 ? {
        [c]: e.ref
    } : {}
      , m = typeof a == "function" ? a(t) : a;
    if (l.className && typeof l.className == "function" && (l.className = l.className(t)),
    i === d.Fragment && Object.keys(l).length > 0) {
        if (!d.isValidElement(m) || Array.isArray(m) && m.length > 1)
            throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(l).map(h => `  - ${h}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map(h => `  - ${h}`).join(`
`)].join(`
`));
        return d.cloneElement(m, Object.assign({}, Pp(Ip(Dr(l, ["ref"])), m.props, ["onClick"]), u))
    }
    return d.createElement(i, Object.assign({}, Dr(l, ["ref"]), i !== d.Fragment && u), m)
}
function Pp(e, t, r) {
    let n = Object.assign({}, e);
    for (let i of r)
        e[i] !== void 0 && t[i] !== void 0 && Object.assign(n, {
            [i](a) {
                a.defaultPrevented || e[i](a),
                a.defaultPrevented || t[i](a)
            }
        });
    return n
}
function ge(e) {
    var t;
    return Object.assign(d.forwardRef(e), {
        displayName: (t = e.displayName) != null ? t : e.name
    })
}
function Ip(e) {
    let t = Object.assign({}, e);
    for (let r in t)
        t[r] === void 0 && delete t[r];
    return t
}
function Dr(e, t=[]) {
    let r = Object.assign({}, e);
    for (let n of t)
        n in r && delete r[n];
    return r
}
function Rp(e) {
    throw new Error("Unexpected object: " + e)
}
function Ar(e, t) {
    let r = t.resolveItems();
    if (r.length <= 0)
        return null;
    let n = t.resolveActiveIndex()
      , i = n ?? -1
      , a = ( () => {
        switch (e.focus) {
        case 0:
            return r.findIndex(c => !t.resolveDisabled(c));
        case 1:
            {
                let c = r.slice().reverse().findIndex( (l, u, m) => i !== -1 && m.length - u - 1 >= i ? !1 : !t.resolveDisabled(l));
                return c === -1 ? c : r.length - 1 - c
            }
        case 2:
            return r.findIndex( (c, l) => l <= i ? !1 : !t.resolveDisabled(c));
        case 3:
            {
                let c = r.slice().reverse().findIndex(l => !t.resolveDisabled(l));
                return c === -1 ? c : r.length - 1 - c
            }
        case 4:
            return r.findIndex(c => t.resolveId(c) === e.id);
        case 5:
            return null;
        default:
            Rp(e)
        }
    }
    )();
    return a === -1 ? n : a
}
function lt(e) {
    let t = e.parentElement
      , r = null;
    for (; t && !(t instanceof HTMLFieldSetElement); )
        t instanceof HTMLLegendElement && (r = t),
        t = t.parentElement;
    let n = (t == null ? void 0 : t.getAttribute("disabled")) === "";
    return n && Mp(r) ? !1 : n
}
function Mp(e) {
    if (!e)
        return !1;
    let t = e.previousElementSibling;
    for (; t !== null; ) {
        if (t instanceof HTMLLegendElement)
            return !1;
        t = t.previousElementSibling
    }
    return !0
}
function Re(e, t, r) {
    let n = d.useRef(t);
    n.current = t,
    d.useEffect( () => {
        function i(a) {
            n.current.call(window, a)
        }
        return window.addEventListener(e, i, r),
        () => window.removeEventListener(e, i, r)
    }
    , [e, r])
}
var Lr = d.createContext(null);
Lr.displayName = "OpenClosedContext";
function Ue() {
    return d.useContext(Lr)
}
function _t({value: e, children: t}) {
    return G.createElement(Lr.Provider, {
        value: e
    }, t)
}
function _a(e) {
    var t;
    if (e.type)
        return e.type;
    let r = (t = e.as) != null ? t : "button";
    if (typeof r == "string" && r.toLowerCase() === "button")
        return "button"
}
function nn(e, t) {
    let[r,n] = d.useState( () => _a(e));
    return Y( () => {
        n(_a(e))
    }
    , [e.type, e.as]),
    Y( () => {
        r || !t.current || t.current instanceof HTMLButtonElement && !t.current.hasAttribute("type") && n("button")
    }
    , [r, t]),
    r
}
function ka({container: e, accept: t, walk: r, enabled: n=!0}) {
    let i = d.useRef(t)
      , a = d.useRef(r);
    d.useEffect( () => {
        i.current = t,
        a.current = r
    }
    , [t, r]),
    Y( () => {
        if (!e || !n)
            return;
        let c = i.current
          , l = a.current
          , u = Object.assign(h => c(h), {
            acceptNode: c
        })
          , m = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, u, !1);
        for (; m.nextNode(); )
            l(m.currentNode)
    }
    , [e, n, i, a])
}
var Np = {
    1(e) {
        return e.disabled || e.comboboxState === 1 ? e : {
            ...e,
            activeOptionIndex: null,
            comboboxState: 1
        }
    },
    0(e) {
        return e.disabled || e.comboboxState === 0 ? e : {
            ...e,
            comboboxState: 0
        }
    },
    2(e, t) {
        return e.disabled === t.disabled ? e : {
            ...e,
            disabled: t.disabled
        }
    },
    3(e, t) {
        if (e.disabled || e.optionsRef.current && !e.optionsPropsRef.current.static && e.comboboxState === 1)
            return e;
        let r = Ar(t, {
            resolveItems: () => e.options,
            resolveActiveIndex: () => e.activeOptionIndex,
            resolveId: n => n.id,
            resolveDisabled: n => n.dataRef.current.disabled
        });
        return e.activeOptionIndex === r ? e : {
            ...e,
            activeOptionIndex: r
        }
    },
    4: (e, t) => {
        var r;
        let n = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null
          , i = Array.from((r = e.optionsRef.current) == null ? void 0 : r.querySelectorAll('[id^="headlessui-combobox-option-"]')).reduce( (c, l, u) => Object.assign(c, {
            [l.id]: u
        }), {})
          , a = [...e.options, {
            id: t.id,
            dataRef: t.dataRef
        }].sort( (c, l) => i[c.id] - i[l.id]);
        return {
            ...e,
            options: a,
            activeOptionIndex: ( () => n === null ? null : a.indexOf(n))()
        }
    }
    ,
    5: (e, t) => {
        let r = e.options.slice()
          , n = e.activeOptionIndex !== null ? r[e.activeOptionIndex] : null
          , i = r.findIndex(a => a.id === t.id);
        return i !== -1 && r.splice(i, 1),
        {
            ...e,
            options: r,
            activeOptionIndex: ( () => i === e.activeOptionIndex || n === null ? null : r.indexOf(n))()
        }
    }
}
  , Fr = d.createContext(null);
Fr.displayName = "ComboboxContext";
function kt(e) {
    let t = d.useContext(Fr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, kt),
        r
    }
    return t
}
var zr = d.createContext(null);
zr.displayName = "ComboboxActions";
function Sn() {
    let e = d.useContext(zr);
    if (e === null) {
        let t = new Error("ComboboxActions is missing a parent <Combobox /> component.");
        throw Error.captureStackTrace && Error.captureStackTrace(t, Sn),
        t
    }
    return e
}
function Op(e, t) {
    return ne(t.type, Np, e, t)
}
var Dp = d.Fragment
  , Ap = ge(function(e, t) {
    let {value: r, onChange: n, disabled: i=!1, ...a} = e
      , c = d.useRef({
        value: r,
        onChange: n
    })
      , l = d.useRef({
        static: !1,
        hold: !1
    })
      , u = d.useRef({
        displayValue: void 0
    })
      , m = d.useReducer(Op, {
        comboboxState: 1,
        comboboxPropsRef: c,
        optionsPropsRef: l,
        inputPropsRef: u,
        labelRef: d.createRef(),
        inputRef: d.createRef(),
        buttonRef: d.createRef(),
        optionsRef: d.createRef(),
        disabled: i,
        options: [],
        activeOptionIndex: null
    })
      , [{comboboxState: h, options: v, activeOptionIndex: w, optionsRef: k, inputRef: b, buttonRef: g},_] = m;
    Y( () => {
        c.current.value = r
    }
    , [r, c]),
    Y( () => {
        c.current.onChange = n
    }
    , [n, c]),
    Y( () => _({
        type: 2,
        disabled: i
    }), [i]),
    Re("mousedown", x => {
        var E, j, C;
        let S = x.target;
        h === 0 && ((E = g.current) != null && E.contains(S) || (j = b.current) != null && j.contains(S) || (C = k.current) != null && C.contains(S) || _({
            type: 1
        }))
    }
    );
    let I = w === null ? null : v[w].dataRef.current.value
      , M = d.useMemo( () => ({
        open: h === 0,
        disabled: i,
        activeIndex: w,
        activeOption: I
    }), [h, i, v, w])
      , D = d.useCallback( () => {
        if (!b.current || r === void 0)
            return;
        let x = u.current.displayValue;
        typeof x == "function" ? b.current.value = x(r) : typeof r == "string" && (b.current.value = r)
    }
    , [r, b, u])
      , o = d.useCallback(x => {
        let E = v.find(C => C.id === x);
        if (!E)
            return;
        let {dataRef: j} = E;
        c.current.onChange(j.current.value),
        D()
    }
    , [v, c, b])
      , p = d.useCallback( () => {
        if (w !== null) {
            let {dataRef: x} = v[w];
            c.current.onChange(x.current.value),
            D()
        }
    }
    , [w, v, c, b])
      , f = d.useMemo( () => ({
        selectOption: o,
        selectActiveOption: p
    }), [o, p]);
    return Y( () => {
        h === 1 && D()
    }
    , [D, h]),
    Y(D, [D]),
    G.createElement(zr.Provider, {
        value: f
    }, G.createElement(Fr.Provider, {
        value: m
    }, G.createElement(_t, {
        value: ne(h, {
            0: 0,
            1: 1
        })
    }, ee({
        props: t === null ? a : {
            ...a,
            ref: t
        },
        slot: M,
        defaultTag: Dp,
        name: "Combobox"
    }))))
})
  , Lp = "input"
  , Fp = ge(function(e, t) {
    var r, n;
    let {value: i, onChange: a, displayValue: c, ...l} = e
      , [u,m] = kt("Combobox.Input")
      , h = Sn()
      , v = he(u.inputRef, t)
      , w = u.inputPropsRef
      , k = `headlessui-combobox-input-${ie()}`
      , b = st()
      , g = wa(a);
    Y( () => {
        w.current.displayValue = c
    }
    , [c, w]);
    let _ = d.useCallback(p => {
        switch (p.key) {
        case "Enter":
            p.preventDefault(),
            p.stopPropagation(),
            h.selectActiveOption(),
            m({
                type: 1
            });
            break;
        case "ArrowDown":
            return p.preventDefault(),
            p.stopPropagation(),
            ne(u.comboboxState, {
                0: () => m({
                    type: 3,
                    focus: 2
                }),
                1: () => {
                    m({
                        type: 0
                    }),
                    b.nextFrame( () => {
                        u.comboboxPropsRef.current.value || m({
                            type: 3,
                            focus: 0
                        })
                    }
                    )
                }
            });
        case "ArrowUp":
            return p.preventDefault(),
            p.stopPropagation(),
            ne(u.comboboxState, {
                0: () => m({
                    type: 3,
                    focus: 1
                }),
                1: () => {
                    m({
                        type: 0
                    }),
                    b.nextFrame( () => {
                        u.comboboxPropsRef.current.value || m({
                            type: 3,
                            focus: 3
                        })
                    }
                    )
                }
            });
        case "Home":
        case "PageUp":
            return p.preventDefault(),
            p.stopPropagation(),
            m({
                type: 3,
                focus: 0
            });
        case "End":
        case "PageDown":
            return p.preventDefault(),
            p.stopPropagation(),
            m({
                type: 3,
                focus: 3
            });
        case "Escape":
            return p.preventDefault(),
            u.optionsRef.current && !u.optionsPropsRef.current.static && p.stopPropagation(),
            m({
                type: 1
            });
        case "Tab":
            h.selectActiveOption(),
            m({
                type: 1
            });
            break
        }
    }
    , [b, m, u, h])
      , I = d.useCallback(p => {
        var f;
        m({
            type: 0
        }),
        (f = g.current) == null || f.call(g, p)
    }
    , [m, g])
      , M = tn( () => {
        if (u.labelRef.current)
            return [u.labelRef.current.id].join(" ")
    }
    , [u.labelRef.current])
      , D = d.useMemo( () => ({
        open: u.comboboxState === 0,
        disabled: u.disabled
    }), [u])
      , o = {
        ref: v,
        id: k,
        role: "combobox",
        type: "text",
        "aria-controls": (r = u.optionsRef.current) == null ? void 0 : r.id,
        "aria-expanded": u.disabled ? void 0 : u.comboboxState === 0,
        "aria-activedescendant": u.activeOptionIndex === null || (n = u.options[u.activeOptionIndex]) == null ? void 0 : n.id,
        "aria-labelledby": M,
        disabled: u.disabled,
        onKeyDown: _,
        onChange: I
    };
    return ee({
        props: {
            ...l,
            ...o
        },
        slot: D,
        defaultTag: Lp,
        name: "Combobox.Input"
    })
})
  , zp = "button"
  , Bp = ge(function(e, t) {
    var r;
    let[n,i] = kt("Combobox.Button")
      , a = Sn()
      , c = he(n.buttonRef, t)
      , l = `headlessui-combobox-button-${ie()}`
      , u = st()
      , m = d.useCallback(g => {
        switch (g.key) {
        case "ArrowDown":
            return g.preventDefault(),
            g.stopPropagation(),
            n.comboboxState === 1 && (i({
                type: 0
            }),
            u.nextFrame( () => {
                n.comboboxPropsRef.current.value || i({
                    type: 3,
                    focus: 0
                })
            }
            )),
            u.nextFrame( () => {
                var _;
                return (_ = n.inputRef.current) == null ? void 0 : _.focus({
                    preventScroll: !0
                })
            }
            );
        case "ArrowUp":
            return g.preventDefault(),
            g.stopPropagation(),
            n.comboboxState === 1 && (i({
                type: 0
            }),
            u.nextFrame( () => {
                n.comboboxPropsRef.current.value || i({
                    type: 3,
                    focus: 3
                })
            }
            )),
            u.nextFrame( () => {
                var _;
                return (_ = n.inputRef.current) == null ? void 0 : _.focus({
                    preventScroll: !0
                })
            }
            );
        case "Escape":
            return g.preventDefault(),
            n.optionsRef.current && !n.optionsPropsRef.current.static && g.stopPropagation(),
            i({
                type: 1
            }),
            u.nextFrame( () => {
                var _;
                return (_ = n.inputRef.current) == null ? void 0 : _.focus({
                    preventScroll: !0
                })
            }
            )
        }
    }
    , [u, i, n, a])
      , h = d.useCallback(g => {
        if (lt(g.currentTarget))
            return g.preventDefault();
        n.comboboxState === 0 ? i({
            type: 1
        }) : (g.preventDefault(),
        i({
            type: 0
        })),
        u.nextFrame( () => {
            var _;
            return (_ = n.inputRef.current) == null ? void 0 : _.focus({
                preventScroll: !0
            })
        }
        )
    }
    , [i, u, n])
      , v = tn( () => {
        if (n.labelRef.current)
            return [n.labelRef.current.id, l].join(" ")
    }
    , [n.labelRef.current, l])
      , w = d.useMemo( () => ({
        open: n.comboboxState === 0,
        disabled: n.disabled
    }), [n])
      , k = e
      , b = {
        ref: c,
        id: l,
        type: nn(e, n.buttonRef),
        tabIndex: -1,
        "aria-haspopup": !0,
        "aria-controls": (r = n.optionsRef.current) == null ? void 0 : r.id,
        "aria-expanded": n.disabled ? void 0 : n.comboboxState === 0,
        "aria-labelledby": v,
        disabled: n.disabled,
        onClick: h,
        onKeyDown: m
    };
    return ee({
        props: {
            ...k,
            ...b
        },
        slot: w,
        defaultTag: zp,
        name: "Combobox.Button"
    })
})
  , Hp = "label";
function $p(e) {
    let[t] = kt("Combobox.Label")
      , r = `headlessui-combobox-label-${ie()}`
      , n = d.useCallback( () => {
        var c;
        return (c = t.inputRef.current) == null ? void 0 : c.focus({
            preventScroll: !0
        })
    }
    , [t.inputRef])
      , i = d.useMemo( () => ({
        open: t.comboboxState === 0,
        disabled: t.disabled
    }), [t])
      , a = {
        ref: t.labelRef,
        id: r,
        onClick: n
    };
    return ee({
        props: {
            ...e,
            ...a
        },
        slot: i,
        defaultTag: Hp,
        name: "Combobox.Label"
    })
}
var Up = "ul"
  , Vp = 3
  , qp = ge(function(e, t) {
    var r;
    let {hold: n=!1, ...i} = e
      , [a] = kt("Combobox.Options")
      , {optionsPropsRef: c} = a
      , l = he(a.optionsRef, t)
      , u = `headlessui-combobox-options-${ie()}`
      , m = Ue()
      , h = ( () => m !== null ? m === 0 : a.comboboxState === 0)();
    Y( () => {
        var b;
        c.current.static = (b = e.static) != null ? b : !1
    }
    , [c, e.static]),
    Y( () => {
        c.current.hold = n
    }
    , [n, c]),
    ka({
        container: a.optionsRef.current,
        enabled: a.comboboxState === 0,
        accept(b) {
            return b.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : b.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
        },
        walk(b) {
            b.setAttribute("role", "none")
        }
    });
    let v = tn( () => {
        var b, g, _;
        return (_ = (b = a.labelRef.current) == null ? void 0 : b.id) != null ? _ : (g = a.buttonRef.current) == null ? void 0 : g.id
    }
    , [a.labelRef.current, a.buttonRef.current])
      , w = d.useMemo( () => ({
        open: a.comboboxState === 0
    }), [a])
      , k = {
        "aria-activedescendant": a.activeOptionIndex === null || (r = a.options[a.activeOptionIndex]) == null ? void 0 : r.id,
        "aria-labelledby": v,
        role: "listbox",
        id: u,
        ref: l
    };
    return ee({
        props: {
            ...i,
            ...k
        },
        slot: w,
        defaultTag: Up,
        features: Vp,
        visible: h,
        name: "Combobox.Options"
    })
})
  , Gp = "li";
function Wp(e) {
    let {disabled: t=!1, value: r, ...n} = e
      , [i,a] = kt("Combobox.Option")
      , c = Sn()
      , l = `headlessui-combobox-option-${ie()}`
      , u = i.activeOptionIndex !== null ? i.options[i.activeOptionIndex].id === l : !1
      , m = i.comboboxPropsRef.current.value === r
      , h = d.useRef({
        disabled: t,
        value: r
    });
    Y( () => {
        h.current.disabled = t
    }
    , [h, t]),
    Y( () => {
        h.current.value = r
    }
    , [h, r]),
    Y( () => {
        var I, M;
        h.current.textValue = (M = (I = document.getElementById(l)) == null ? void 0 : I.textContent) == null ? void 0 : M.toLowerCase()
    }
    , [h, l]);
    let v = d.useCallback( () => c.selectOption(l), [c, l]);
    Y( () => (a({
        type: 4,
        id: l,
        dataRef: h
    }),
    () => a({
        type: 5,
        id: l
    })), [h, l]),
    Y( () => {
        i.comboboxState === 0 && (!m || a({
            type: 3,
            focus: 4,
            id: l
        }))
    }
    , [i.comboboxState, m, l]),
    Y( () => {
        if (i.comboboxState !== 0 || !u)
            return;
        let I = Ie();
        return I.requestAnimationFrame( () => {
            var M, D;
            (D = (M = document.getElementById(l)) == null ? void 0 : M.scrollIntoView) == null || D.call(M, {
                block: "nearest"
            })
        }
        ),
        I.dispose
    }
    , [l, u, i.comboboxState, i.activeOptionIndex]);
    let w = d.useCallback(I => {
        if (t)
            return I.preventDefault();
        v(),
        a({
            type: 1
        }),
        Ie().nextFrame( () => {
            var M;
            return (M = i.inputRef.current) == null ? void 0 : M.focus({
                preventScroll: !0
            })
        }
        )
    }
    , [a, i.inputRef, t, v])
      , k = d.useCallback( () => {
        if (t)
            return a({
                type: 3,
                focus: 5
            });
        a({
            type: 3,
            focus: 4,
            id: l
        })
    }
    , [t, l, a])
      , b = d.useCallback( () => {
        t || u || a({
            type: 3,
            focus: 4,
            id: l
        })
    }
    , [t, u, l, a])
      , g = d.useCallback( () => {
        t || !u || i.optionsPropsRef.current.hold || a({
            type: 3,
            focus: 5
        })
    }
    , [t, u, a, i.comboboxState, i.comboboxPropsRef])
      , _ = d.useMemo( () => ({
        active: u,
        selected: m,
        disabled: t
    }), [u, m, t]);
    return ee({
        props: {
            ...n,
            id: l,
            role: "option",
            tabIndex: t === !0 ? void 0 : -1,
            "aria-disabled": t === !0 ? !0 : void 0,
            "aria-selected": m === !0 ? !0 : void 0,
            disabled: void 0,
            onClick: w,
            onFocus: k,
            onPointerMove: b,
            onMouseMove: b,
            onPointerLeave: g,
            onMouseLeave: g
        },
        slot: _,
        defaultTag: Gp,
        name: "Combobox.Option"
    })
}
Object.assign(Ap, {
    Input: Fp,
    Button: Bp,
    Label: $p,
    Options: qp,
    Option: Wp
});
var Br = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e => `${e}:not([tabindex='-1'])`).join(",");
function Tn(e=document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(Br))
}
function Hr(e, t=0) {
    return e === document.body ? !1 : ne(t, {
        0() {
            return e.matches(Br)
        },
        1() {
            let r = e;
            for (; r !== null; ) {
                if (r.matches(Br))
                    return !0;
                r = r.parentElement
            }
            return !1
        }
    })
}
function rn(e) {
    e == null || e.focus({
        preventScroll: !0
    })
}
function Ve(e, t) {
    let r = Array.isArray(e) ? e.slice().sort( (h, v) => {
        let w = h.compareDocumentPosition(v);
        return w & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : w & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    }
    ) : Tn(e), n = document.activeElement, i = ( () => {
        if (t & 5)
            return 1;
        if (t & 10)
            return -1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), a = ( () => {
        if (t & 1)
            return 0;
        if (t & 2)
            return Math.max(0, r.indexOf(n)) - 1;
        if (t & 4)
            return Math.max(0, r.indexOf(n)) + 1;
        if (t & 8)
            return r.length - 1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), c = t & 32 ? {
        preventScroll: !0
    } : {}, l = 0, u = r.length, m;
    do {
        if (l >= u || l + u <= 0)
            return 0;
        let h = a + l;
        if (t & 16)
            h = (h + u) % u;
        else {
            if (h < 0)
                return 3;
            if (h >= u)
                return 1
        }
        m = r[h],
        m == null || m.focus(c),
        l += i
    } while (m !== document.activeElement);
    return m.hasAttribute("tabindex") || m.setAttribute("tabindex", "0"),
    2
}
function Ea() {
    let e = d.useRef(!1);
    return d.useEffect( () => (e.current = !0,
    () => {
        e.current = !1
    }
    ), []),
    e
}
function Xp(e, t=30, {initialFocus: r, containers: n}={}) {
    let i = d.useRef(typeof window < "u" ? document.activeElement : null)
      , a = d.useRef(null)
      , c = Ea()
      , l = !!(t & 16)
      , u = !!(t & 2);
    d.useEffect( () => {
        !l || (i.current = document.activeElement)
    }
    , [l]),
    d.useEffect( () => {
        if (l)
            return () => {
                rn(i.current),
                i.current = null
            }
    }
    , [l]),
    d.useEffect( () => {
        if (!u || !e.current)
            return;
        let m = document.activeElement;
        if (r != null && r.current) {
            if ((r == null ? void 0 : r.current) === m) {
                a.current = m;
                return
            }
        } else if (e.current.contains(m)) {
            a.current = m;
            return
        }
        r != null && r.current ? rn(r.current) : Ve(e.current, 1) === 0 && console.warn("There are no focusable elements inside the <FocusTrap />"),
        a.current = document.activeElement
    }
    , [e, r, u]),
    Re("keydown", m => {
        !(t & 4) || !e.current || m.key === "Tab" && (m.preventDefault(),
        Ve(e.current, (m.shiftKey ? 2 : 4) | 16) === 2 && (a.current = document.activeElement))
    }
    ),
    Re("focus", m => {
        if (!(t & 8))
            return;
        let h = new Set(n == null ? void 0 : n.current);
        if (h.add(e),
        !h.size)
            return;
        let v = a.current;
        if (!v || !c.current)
            return;
        let w = m.target;
        w && w instanceof HTMLElement ? Yp(h, w) ? (a.current = w,
        rn(w)) : (m.preventDefault(),
        m.stopPropagation(),
        rn(v)) : rn(a.current)
    }
    , !0)
}
function Yp(e, t) {
    var r;
    for (let n of e)
        if ((r = n.current) != null && r.contains(t))
            return !0;
    return !1
}
var Et = new Set
  , Ye = new Map;
function Ca(e) {
    e.setAttribute("aria-hidden", "true"),
    e.inert = !0
}
function ja(e) {
    let t = Ye.get(e);
    !t || (t["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", t["aria-hidden"]),
    e.inert = t.inert)
}
function Kp(e, t=!0) {
    Y( () => {
        if (!t || !e.current)
            return;
        let r = e.current;
        Et.add(r);
        for (let n of Ye.keys())
            n.contains(r) && (ja(n),
            Ye.delete(n));
        return document.querySelectorAll("body > *").forEach(n => {
            if (n instanceof HTMLElement) {
                for (let i of Et)
                    if (n.contains(i))
                        return;
                Et.size === 1 && (Ye.set(n, {
                    "aria-hidden": n.getAttribute("aria-hidden"),
                    inert: n.inert
                }),
                Ca(n))
            }
        }
        ),
        () => {
            if (Et.delete(r),
            Et.size > 0)
                document.querySelectorAll("body > *").forEach(n => {
                    if (n instanceof HTMLElement && !Ye.has(n)) {
                        for (let i of Et)
                            if (n.contains(i))
                                return;
                        Ye.set(n, {
                            "aria-hidden": n.getAttribute("aria-hidden"),
                            inert: n.inert
                        }),
                        Ca(n)
                    }
                }
                );
            else
                for (let n of Ye.keys())
                    ja(n),
                    Ye.delete(n)
        }
    }
    , [t])
}
var Sa = d.createContext(!1);
function Zp() {
    return d.useContext(Sa)
}
function Ta(e) {
    return G.createElement(Sa.Provider, {
        value: e.force
    }, e.children)
}
function Qp() {
    let e = Zp()
      , t = d.useContext(Pa)
      , [r,n] = d.useState( () => {
        if (!e && t !== null || typeof window > "u")
            return null;
        let i = document.getElementById("headlessui-portal-root");
        if (i)
            return i;
        let a = document.createElement("div");
        return a.setAttribute("id", "headlessui-portal-root"),
        document.body.appendChild(a)
    }
    );
    return d.useEffect( () => {
        r !== null && (document.body.contains(r) || document.body.appendChild(r))
    }
    , [r]),
    d.useEffect( () => {
        e || t !== null && n(t.current)
    }
    , [t, n, e]),
    r
}
var Jp = d.Fragment;
function $r(e) {
    let t = e
      , r = Qp()
      , [n] = d.useState( () => typeof window > "u" ? null : document.createElement("div"))
      , i = Cn();
    return Y( () => {
        if (r && n)
            return r.appendChild(n),
            () => {
                var a;
                !r || !n || (r.removeChild(n),
                r.childNodes.length <= 0 && ((a = r.parentElement) == null || a.removeChild(r)))
            }
    }
    , [r, n]),
    i ? !r || !n ? null : zo.createPortal(ee({
        props: t,
        defaultTag: Jp,
        name: "Portal"
    }), n) : null
}
var ef = d.Fragment
  , Pa = d.createContext(null);
function tf(e) {
    let {target: t, ...r} = e;
    return G.createElement(Pa.Provider, {
        value: t
    }, ee({
        props: r,
        defaultTag: ef,
        name: "Popover.Group"
    }))
}
$r.Group = tf;
var Ia = d.createContext(null);
function Ra() {
    let e = d.useContext(Ia);
    if (e === null) {
        let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
        throw Error.captureStackTrace && Error.captureStackTrace(t, Ra),
        t
    }
    return e
}
function nf() {
    let[e,t] = d.useState([]);
    return [e.length > 0 ? e.join(" ") : void 0, d.useMemo( () => function(r) {
        let n = d.useCallback(a => (t(c => [...c, a]),
        () => t(c => {
            let l = c.slice()
              , u = l.indexOf(a);
            return u !== -1 && l.splice(u, 1),
            l
        }
        )), [])
          , i = d.useMemo( () => ({
            register: n,
            slot: r.slot,
            name: r.name,
            props: r.props
        }), [n, r.slot, r.name, r.props]);
        return G.createElement(Ia.Provider, {
            value: i
        }, r.children)
    }
    , [t])]
}
var rf = "p";
function of(e) {
    let t = Ra()
      , r = `headlessui-description-${ie()}`;
    Y( () => t.register(r), [r, t.register]);
    let n = e
      , i = {
        ...t.props,
        id: r
    };
    return ee({
        props: {
            ...n,
            ...i
        },
        slot: t.slot || {},
        defaultTag: rf,
        name: t.name || "Description"
    })
}
var Ur = d.createContext( () => {}
);
Ur.displayName = "StackContext";
function af() {
    return d.useContext(Ur)
}
function sf({children: e, onUpdate: t, type: r, element: n}) {
    let i = af()
      , a = d.useCallback( (...c) => {
        t == null || t(...c),
        i(...c)
    }
    , [i, t]);
    return Y( () => (a(0, r, n),
    () => a(1, r, n)), [a, r, n]),
    G.createElement(Ur.Provider, {
        value: a
    }, e)
}
var lf = {
    0(e, t) {
        return e.titleId === t.id ? e : {
            ...e,
            titleId: t.id
        }
    }
}
  , Pn = d.createContext(null);
Pn.displayName = "DialogContext";
function Vr(e) {
    let t = d.useContext(Pn);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${bf.displayName} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Vr),
        r
    }
    return t
}
function cf(e, t) {
    return ne(t.type, lf, e, t)
}
var uf = "div"
  , df = 3
  , pf = ge(function(e, t) {
    let {open: r, onClose: n, initialFocus: i, ...a} = e
      , [c,l] = d.useState(0)
      , u = Ue();
    r === void 0 && u !== null && (r = ne(u, {
        0: !0,
        1: !1
    }));
    let m = d.useRef(new Set)
      , h = d.useRef(null)
      , v = he(h, t)
      , w = e.hasOwnProperty("open") || u !== null
      , k = e.hasOwnProperty("onClose");
    if (!w && !k)
        throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
    if (!w)
        throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
    if (!k)
        throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
    if (typeof r != "boolean")
        throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${r}`);
    if (typeof n != "function")
        throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${n}`);
    let b = r ? 0 : 1
      , g = ( () => u !== null ? u === 0 : b === 0)()
      , [_,I] = d.useReducer(cf, {
        titleId: null,
        descriptionId: null
    })
      , M = d.useCallback( () => n(!1), [n])
      , D = d.useCallback(R => I({
        type: 0,
        id: R
    }), [I])
      , o = Cn() && b === 0
      , p = c > 1
      , f = d.useContext(Pn) !== null;
    Xp(h, o ? ne(p ? "parent" : "leaf", {
        parent: 16,
        leaf: 30
    }) : 1, {
        initialFocus: i,
        containers: m
    }),
    Kp(h, p ? o : !1),
    Re("mousedown", R => {
        var N;
        let y = R.target;
        b === 0 && (p || (N = h.current) != null && N.contains(y) || M())
    }
    ),
    Re("keydown", R => {
        R.key === "Escape" && b === 0 && (p || (R.preventDefault(),
        R.stopPropagation(),
        M()))
    }
    ),
    d.useEffect( () => {
        if (b !== 0 || f)
            return;
        let R = document.documentElement.style.overflow
          , N = document.documentElement.style.paddingRight
          , y = window.innerWidth - document.documentElement.clientWidth;
        return document.documentElement.style.overflow = "hidden",
        document.documentElement.style.paddingRight = `${y}px`,
        () => {
            document.documentElement.style.overflow = R,
            document.documentElement.style.paddingRight = N
        }
    }
    , [b, f]),
    d.useEffect( () => {
        if (b !== 0 || !h.current)
            return;
        let R = new IntersectionObserver(N => {
            for (let y of N)
                y.boundingClientRect.x === 0 && y.boundingClientRect.y === 0 && y.boundingClientRect.width === 0 && y.boundingClientRect.height === 0 && M()
        }
        );
        return R.observe(h.current),
        () => R.disconnect()
    }
    , [b, h, M]);
    let[x,E] = nf()
      , j = `headlessui-dialog-${ie()}`
      , C = d.useMemo( () => [{
        dialogState: b,
        close: M,
        setTitleId: D
    }, _], [b, _, M, D])
      , S = d.useMemo( () => ({
        open: b === 0
    }), [b])
      , T = {
        ref: v,
        id: j,
        role: "dialog",
        "aria-modal": b === 0 ? !0 : void 0,
        "aria-labelledby": _.titleId,
        "aria-describedby": x,
        onClick(R) {
            R.stopPropagation()
        }
    }
      , P = a;
    return G.createElement(sf, {
        type: "Dialog",
        element: h,
        onUpdate: d.useCallback( (R, N, y) => {
            N === "Dialog" && ne(R, {
                0() {
                    m.current.add(y),
                    l(O => O + 1)
                },
                1() {
                    m.current.add(y),
                    l(O => O - 1)
                }
            })
        }
        , [])
    }, G.createElement(Ta, {
        force: !0
    }, G.createElement($r, null, G.createElement(Pn.Provider, {
        value: C
    }, G.createElement($r.Group, {
        target: h
    }, G.createElement(Ta, {
        force: !1
    }, G.createElement(E, {
        slot: S,
        name: "Dialog.Description"
    }, ee({
        props: {
            ...P,
            ...T
        },
        slot: S,
        defaultTag: uf,
        features: df,
        visible: g,
        name: "Dialog"
    }))))))))
})
  , ff = "div"
  , mf = ge(function(e, t) {
    let[{dialogState: r, close: n}] = Vr("Dialog.Overlay")
      , i = he(t)
      , a = `headlessui-dialog-overlay-${ie()}`
      , c = d.useCallback(u => {
        if (u.target === u.currentTarget) {
            if (lt(u.currentTarget))
                return u.preventDefault();
            u.preventDefault(),
            u.stopPropagation(),
            n()
        }
    }
    , [n])
      , l = d.useMemo( () => ({
        open: r === 0
    }), [r]);
    return ee({
        props: {
            ...e,
            ref: i,
            id: a,
            "aria-hidden": !0,
            onClick: c
        },
        slot: l,
        defaultTag: ff,
        name: "Dialog.Overlay"
    })
})
  , hf = "h2";
function gf(e) {
    let[{dialogState: t, setTitleId: r}] = Vr("Dialog.Title")
      , n = `headlessui-dialog-title-${ie()}`;
    d.useEffect( () => (r(n),
    () => r(null)), [n, r]);
    let i = d.useMemo( () => ({
        open: t === 0
    }), [t]);
    return ee({
        props: {
            ...e,
            id: n
        },
        slot: i,
        defaultTag: hf,
        name: "Dialog.Title"
    })
}
var bf = Object.assign(pf, {
    Overlay: mf,
    Title: gf,
    Description: of
})
  , vf = {
    0: e => ({
        ...e,
        disclosureState: ne(e.disclosureState, {
            0: 1,
            1: 0
        })
    }),
    1: e => e.disclosureState === 1 ? e : {
        ...e,
        disclosureState: 1
    },
    4(e) {
        return e.linkedPanel === !0 ? e : {
            ...e,
            linkedPanel: !0
        }
    },
    5(e) {
        return e.linkedPanel === !1 ? e : {
            ...e,
            linkedPanel: !1
        }
    },
    2(e, t) {
        return e.buttonId === t.buttonId ? e : {
            ...e,
            buttonId: t.buttonId
        }
    },
    3(e, t) {
        return e.panelId === t.panelId ? e : {
            ...e,
            panelId: t.panelId
        }
    }
}
  , qr = d.createContext(null);
qr.displayName = "DisclosureContext";
function Gr(e) {
    let t = d.useContext(qr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${In.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Gr),
        r
    }
    return t
}
var Wr = d.createContext(null);
Wr.displayName = "DisclosureAPIContext";
function Ma(e) {
    let t = d.useContext(Wr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${In.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Ma),
        r
    }
    return t
}
var Xr = d.createContext(null);
Xr.displayName = "DisclosurePanelContext";
function xf() {
    return d.useContext(Xr)
}
function yf(e, t) {
    return ne(t.type, vf, e, t)
}
var wf = d.Fragment;
function In(e) {
    let {defaultOpen: t=!1, ...r} = e
      , n = `headlessui-disclosure-button-${ie()}`
      , i = `headlessui-disclosure-panel-${ie()}`
      , a = d.useReducer(yf, {
        disclosureState: t ? 0 : 1,
        linkedPanel: !1,
        buttonId: n,
        panelId: i
    })
      , [{disclosureState: c},l] = a;
    d.useEffect( () => l({
        type: 2,
        buttonId: n
    }), [n, l]),
    d.useEffect( () => l({
        type: 3,
        panelId: i
    }), [i, l]);
    let u = d.useCallback(v => {
        l({
            type: 1
        });
        let w = ( () => v ? v instanceof HTMLElement ? v : v.current instanceof HTMLElement ? v.current : document.getElementById(n) : document.getElementById(n))();
        w == null || w.focus()
    }
    , [l, n])
      , m = d.useMemo( () => ({
        close: u
    }), [u])
      , h = d.useMemo( () => ({
        open: c === 0,
        close: u
    }), [c, u]);
    return G.createElement(qr.Provider, {
        value: a
    }, G.createElement(Wr.Provider, {
        value: m
    }, G.createElement(_t, {
        value: ne(c, {
            0: 0,
            1: 1
        })
    }, ee({
        props: r,
        slot: h,
        defaultTag: wf,
        name: "Disclosure"
    }))))
}
var _f = "button"
  , kf = ge(function(e, t) {
    let[r,n] = Gr("Disclosure.Button")
      , i = d.useRef(null)
      , a = he(i, t)
      , c = xf()
      , l = c === null ? !1 : c === r.panelId
      , u = d.useCallback(g => {
        var _;
        if (l) {
            if (r.disclosureState === 1)
                return;
            switch (g.key) {
            case " ":
            case "Enter":
                g.preventDefault(),
                g.stopPropagation(),
                n({
                    type: 0
                }),
                (_ = document.getElementById(r.buttonId)) == null || _.focus();
                break
            }
        } else
            switch (g.key) {
            case " ":
            case "Enter":
                g.preventDefault(),
                g.stopPropagation(),
                n({
                    type: 0
                });
                break
            }
    }
    , [n, l, r.disclosureState, r.buttonId])
      , m = d.useCallback(g => {
        switch (g.key) {
        case " ":
            g.preventDefault();
            break
        }
    }
    , [])
      , h = d.useCallback(g => {
        var _;
        lt(g.currentTarget) || e.disabled || (l ? (n({
            type: 0
        }),
        (_ = document.getElementById(r.buttonId)) == null || _.focus()) : n({
            type: 0
        }))
    }
    , [n, e.disabled, r.buttonId, l])
      , v = d.useMemo( () => ({
        open: r.disclosureState === 0
    }), [r])
      , w = nn(e, i)
      , k = e
      , b = l ? {
        ref: a,
        type: w,
        onKeyDown: u,
        onClick: h
    } : {
        ref: a,
        id: r.buttonId,
        type: w,
        "aria-expanded": e.disabled ? void 0 : r.disclosureState === 0,
        "aria-controls": r.linkedPanel ? r.panelId : void 0,
        onKeyDown: u,
        onKeyUp: m,
        onClick: h
    };
    return ee({
        props: {
            ...k,
            ...b
        },
        slot: v,
        defaultTag: _f,
        name: "Disclosure.Button"
    })
})
  , Ef = "div"
  , Cf = 3
  , jf = ge(function(e, t) {
    let[r,n] = Gr("Disclosure.Panel")
      , {close: i} = Ma("Disclosure.Panel")
      , a = he(t, () => {
        r.linkedPanel || n({
            type: 4
        })
    }
    )
      , c = Ue()
      , l = ( () => c !== null ? c === 0 : r.disclosureState === 0)();
    d.useEffect( () => () => n({
        type: 5
    }), [n]),
    d.useEffect( () => {
        var v;
        r.disclosureState === 1 && ((v = e.unmount) == null || v) && n({
            type: 5
        })
    }
    , [r.disclosureState, e.unmount, n]);
    let u = d.useMemo( () => ({
        open: r.disclosureState === 0,
        close: i
    }), [r, i])
      , m = {
        ref: a,
        id: r.panelId
    }
      , h = e;
    return G.createElement(Xr.Provider, {
        value: r.panelId
    }, ee({
        props: {
            ...h,
            ...m
        },
        slot: u,
        defaultTag: Ef,
        features: Cf,
        visible: l,
        name: "Disclosure.Panel"
    }))
});
In.Button = kf,
In.Panel = jf;
var Sf = {
    1(e) {
        return e.disabled || e.listboxState === 1 ? e : {
            ...e,
            activeOptionIndex: null,
            listboxState: 1
        }
    },
    0(e) {
        return e.disabled || e.listboxState === 0 ? e : {
            ...e,
            listboxState: 0
        }
    },
    2(e, t) {
        return e.disabled === t.disabled ? e : {
            ...e,
            disabled: t.disabled
        }
    },
    3(e, t) {
        return e.orientation === t.orientation ? e : {
            ...e,
            orientation: t.orientation
        }
    },
    4(e, t) {
        if (e.disabled || e.listboxState === 1)
            return e;
        let r = Ar(t, {
            resolveItems: () => e.options,
            resolveActiveIndex: () => e.activeOptionIndex,
            resolveId: n => n.id,
            resolveDisabled: n => n.dataRef.current.disabled
        });
        return e.searchQuery === "" && e.activeOptionIndex === r ? e : {
            ...e,
            searchQuery: "",
            activeOptionIndex: r
        }
    },
    5: (e, t) => {
        if (e.disabled || e.listboxState === 1)
            return e;
        let r = e.searchQuery !== "" ? 0 : 1
          , n = e.searchQuery + t.value.toLowerCase()
          , i = (e.activeOptionIndex !== null ? e.options.slice(e.activeOptionIndex + r).concat(e.options.slice(0, e.activeOptionIndex + r)) : e.options).find(c => {
            var l;
            return !c.dataRef.current.disabled && ((l = c.dataRef.current.textValue) == null ? void 0 : l.startsWith(n))
        }
        )
          , a = i ? e.options.indexOf(i) : -1;
        return a === -1 || a === e.activeOptionIndex ? {
            ...e,
            searchQuery: n
        } : {
            ...e,
            searchQuery: n,
            activeOptionIndex: a
        }
    }
    ,
    6(e) {
        return e.disabled || e.listboxState === 1 || e.searchQuery === "" ? e : {
            ...e,
            searchQuery: ""
        }
    },
    7: (e, t) => {
        var r;
        let n = Array.from((r = e.optionsRef.current) == null ? void 0 : r.querySelectorAll('[id^="headlessui-listbox-option-"]')).reduce( (a, c, l) => Object.assign(a, {
            [c.id]: l
        }), {})
          , i = [...e.options, {
            id: t.id,
            dataRef: t.dataRef
        }].sort( (a, c) => n[a.id] - n[c.id]);
        return {
            ...e,
            options: i
        }
    }
    ,
    8: (e, t) => {
        let r = e.options.slice()
          , n = e.activeOptionIndex !== null ? r[e.activeOptionIndex] : null
          , i = r.findIndex(a => a.id === t.id);
        return i !== -1 && r.splice(i, 1),
        {
            ...e,
            options: r,
            activeOptionIndex: ( () => i === e.activeOptionIndex || n === null ? null : r.indexOf(n))()
        }
    }
}
  , Yr = d.createContext(null);
Yr.displayName = "ListboxContext";
function on(e) {
    let t = d.useContext(Yr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${an.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, on),
        r
    }
    return t
}
function Tf(e, t) {
    return ne(t.type, Sf, e, t)
}
var Pf = d.Fragment;
function an(e) {
    let {value: t, onChange: r, disabled: n=!1, horizontal: i=!1, ...a} = e
      , c = i ? "horizontal" : "vertical"
      , l = d.useReducer(Tf, {
        listboxState: 1,
        propsRef: {
            current: {
                value: t,
                onChange: r
            }
        },
        labelRef: d.createRef(),
        buttonRef: d.createRef(),
        optionsRef: d.createRef(),
        disabled: n,
        orientation: c,
        options: [],
        searchQuery: "",
        activeOptionIndex: null
    })
      , [{listboxState: u, propsRef: m, optionsRef: h, buttonRef: v},w] = l;
    Y( () => {
        m.current.value = t
    }
    , [t, m]),
    Y( () => {
        m.current.onChange = r
    }
    , [r, m]),
    Y( () => w({
        type: 2,
        disabled: n
    }), [n]),
    Y( () => w({
        type: 3,
        orientation: c
    }), [c]),
    Re("mousedown", b => {
        var g, _, I;
        let M = b.target;
        u === 0 && ((g = v.current) != null && g.contains(M) || (_ = h.current) != null && _.contains(M) || (w({
            type: 1
        }),
        Hr(M, 1) || (b.preventDefault(),
        (I = v.current) == null || I.focus())))
    }
    );
    let k = d.useMemo( () => ({
        open: u === 0,
        disabled: n
    }), [u, n]);
    return G.createElement(Yr.Provider, {
        value: l
    }, G.createElement(_t, {
        value: ne(u, {
            0: 0,
            1: 1
        })
    }, ee({
        props: a,
        slot: k,
        defaultTag: Pf,
        name: "Listbox"
    })))
}
var If = "button"
  , Rf = ge(function(e, t) {
    var r;
    let[n,i] = on("Listbox.Button")
      , a = he(n.buttonRef, t)
      , c = `headlessui-listbox-button-${ie()}`
      , l = st()
      , u = d.useCallback(g => {
        switch (g.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
            g.preventDefault(),
            i({
                type: 0
            }),
            l.nextFrame( () => {
                n.propsRef.current.value || i({
                    type: 4,
                    focus: 0
                })
            }
            );
            break;
        case "ArrowUp":
            g.preventDefault(),
            i({
                type: 0
            }),
            l.nextFrame( () => {
                n.propsRef.current.value || i({
                    type: 4,
                    focus: 3
                })
            }
            );
            break
        }
    }
    , [i, n, l])
      , m = d.useCallback(g => {
        switch (g.key) {
        case " ":
            g.preventDefault();
            break
        }
    }
    , [])
      , h = d.useCallback(g => {
        if (lt(g.currentTarget))
            return g.preventDefault();
        n.listboxState === 0 ? (i({
            type: 1
        }),
        l.nextFrame( () => {
            var _;
            return (_ = n.buttonRef.current) == null ? void 0 : _.focus({
                preventScroll: !0
            })
        }
        )) : (g.preventDefault(),
        i({
            type: 0
        }))
    }
    , [i, l, n])
      , v = tn( () => {
        if (n.labelRef.current)
            return [n.labelRef.current.id, c].join(" ")
    }
    , [n.labelRef.current, c])
      , w = d.useMemo( () => ({
        open: n.listboxState === 0,
        disabled: n.disabled
    }), [n])
      , k = e
      , b = {
        ref: a,
        id: c,
        type: nn(e, n.buttonRef),
        "aria-haspopup": !0,
        "aria-controls": (r = n.optionsRef.current) == null ? void 0 : r.id,
        "aria-expanded": n.disabled ? void 0 : n.listboxState === 0,
        "aria-labelledby": v,
        disabled: n.disabled,
        onKeyDown: u,
        onKeyUp: m,
        onClick: h
    };
    return ee({
        props: {
            ...k,
            ...b
        },
        slot: w,
        defaultTag: If,
        name: "Listbox.Button"
    })
})
  , Mf = "label";
function Nf(e) {
    let[t] = on("Listbox.Label")
      , r = `headlessui-listbox-label-${ie()}`
      , n = d.useCallback( () => {
        var c;
        return (c = t.buttonRef.current) == null ? void 0 : c.focus({
            preventScroll: !0
        })
    }
    , [t.buttonRef])
      , i = d.useMemo( () => ({
        open: t.listboxState === 0,
        disabled: t.disabled
    }), [t])
      , a = {
        ref: t.labelRef,
        id: r,
        onClick: n
    };
    return ee({
        props: {
            ...e,
            ...a
        },
        slot: i,
        defaultTag: Mf,
        name: "Listbox.Label"
    })
}
var Of = "ul"
  , Df = 3
  , Af = ge(function(e, t) {
    var r;
    let[n,i] = on("Listbox.Options")
      , a = he(n.optionsRef, t)
      , c = `headlessui-listbox-options-${ie()}`
      , l = st()
      , u = st()
      , m = Ue()
      , h = ( () => m !== null ? m === 0 : n.listboxState === 0)();
    Y( () => {
        let g = n.optionsRef.current;
        !g || n.listboxState === 0 && g !== document.activeElement && g.focus({
            preventScroll: !0
        })
    }
    , [n.listboxState, n.optionsRef]);
    let v = d.useCallback(g => {
        switch (u.dispose(),
        g.key) {
        case " ":
            if (n.searchQuery !== "")
                return g.preventDefault(),
                g.stopPropagation(),
                i({
                    type: 5,
                    value: g.key
                });
        case "Enter":
            if (g.preventDefault(),
            g.stopPropagation(),
            i({
                type: 1
            }),
            n.activeOptionIndex !== null) {
                let {dataRef: _} = n.options[n.activeOptionIndex];
                n.propsRef.current.onChange(_.current.value)
            }
            Ie().nextFrame( () => {
                var _;
                return (_ = n.buttonRef.current) == null ? void 0 : _.focus({
                    preventScroll: !0
                })
            }
            );
            break;
        case ne(n.orientation, {
            vertical: "ArrowDown",
            horizontal: "ArrowRight"
        }):
            return g.preventDefault(),
            g.stopPropagation(),
            i({
                type: 4,
                focus: 2
            });
        case ne(n.orientation, {
            vertical: "ArrowUp",
            horizontal: "ArrowLeft"
        }):
            return g.preventDefault(),
            g.stopPropagation(),
            i({
                type: 4,
                focus: 1
            });
        case "Home":
        case "PageUp":
            return g.preventDefault(),
            g.stopPropagation(),
            i({
                type: 4,
                focus: 0
            });
        case "End":
        case "PageDown":
            return g.preventDefault(),
            g.stopPropagation(),
            i({
                type: 4,
                focus: 3
            });
        case "Escape":
            return g.preventDefault(),
            g.stopPropagation(),
            i({
                type: 1
            }),
            l.nextFrame( () => {
                var _;
                return (_ = n.buttonRef.current) == null ? void 0 : _.focus({
                    preventScroll: !0
                })
            }
            );
        case "Tab":
            g.preventDefault(),
            g.stopPropagation();
            break;
        default:
            g.key.length === 1 && (i({
                type: 5,
                value: g.key
            }),
            u.setTimeout( () => i({
                type: 6
            }), 350));
            break
        }
    }
    , [l, i, u, n])
      , w = tn( () => {
        var g, _, I;
        return (I = (g = n.labelRef.current) == null ? void 0 : g.id) != null ? I : (_ = n.buttonRef.current) == null ? void 0 : _.id
    }
    , [n.labelRef.current, n.buttonRef.current])
      , k = d.useMemo( () => ({
        open: n.listboxState === 0
    }), [n])
      , b = {
        "aria-activedescendant": n.activeOptionIndex === null || (r = n.options[n.activeOptionIndex]) == null ? void 0 : r.id,
        "aria-labelledby": w,
        "aria-orientation": n.orientation,
        id: c,
        onKeyDown: v,
        role: "listbox",
        tabIndex: 0,
        ref: a
    };
    return ee({
        props: {
            ...e,
            ...b
        },
        slot: k,
        defaultTag: Of,
        features: Df,
        visible: h,
        name: "Listbox.Options"
    })
})
  , Lf = "li";
function Ff(e) {
    let {disabled: t=!1, value: r, ...n} = e
      , [i,a] = on("Listbox.Option")
      , c = `headlessui-listbox-option-${ie()}`
      , l = i.activeOptionIndex !== null ? i.options[i.activeOptionIndex].id === c : !1
      , u = i.propsRef.current.value === r
      , m = d.useRef({
        disabled: t,
        value: r
    });
    Y( () => {
        m.current.disabled = t
    }
    , [m, t]),
    Y( () => {
        m.current.value = r
    }
    , [m, r]),
    Y( () => {
        var _, I;
        m.current.textValue = (I = (_ = document.getElementById(c)) == null ? void 0 : _.textContent) == null ? void 0 : I.toLowerCase()
    }
    , [m, c]);
    let h = d.useCallback( () => i.propsRef.current.onChange(r), [i.propsRef, r]);
    Y( () => (a({
        type: 7,
        id: c,
        dataRef: m
    }),
    () => a({
        type: 8,
        id: c
    })), [m, c]),
    Y( () => {
        var _, I;
        i.listboxState === 0 && (!u || (a({
            type: 4,
            focus: 4,
            id: c
        }),
        (I = (_ = document.getElementById(c)) == null ? void 0 : _.focus) == null || I.call(_)))
    }
    , [i.listboxState]),
    Y( () => {
        if (i.listboxState !== 0 || !l)
            return;
        let _ = Ie();
        return _.requestAnimationFrame( () => {
            var I, M;
            (M = (I = document.getElementById(c)) == null ? void 0 : I.scrollIntoView) == null || M.call(I, {
                block: "nearest"
            })
        }
        ),
        _.dispose
    }
    , [c, l, i.listboxState, i.activeOptionIndex]);
    let v = d.useCallback(_ => {
        if (t)
            return _.preventDefault();
        h(),
        a({
            type: 1
        }),
        Ie().nextFrame( () => {
            var I;
            return (I = i.buttonRef.current) == null ? void 0 : I.focus({
                preventScroll: !0
            })
        }
        )
    }
    , [a, i.buttonRef, t, h])
      , w = d.useCallback( () => {
        if (t)
            return a({
                type: 4,
                focus: 5
            });
        a({
            type: 4,
            focus: 4,
            id: c
        })
    }
    , [t, c, a])
      , k = d.useCallback( () => {
        t || l || a({
            type: 4,
            focus: 4,
            id: c
        })
    }
    , [t, l, c, a])
      , b = d.useCallback( () => {
        t || !l || a({
            type: 4,
            focus: 5
        })
    }
    , [t, l, a])
      , g = d.useMemo( () => ({
        active: l,
        selected: u,
        disabled: t
    }), [l, u, t]);
    return ee({
        props: {
            ...n,
            id: c,
            role: "option",
            tabIndex: t === !0 ? void 0 : -1,
            "aria-disabled": t === !0 ? !0 : void 0,
            "aria-selected": u === !0 ? !0 : void 0,
            disabled: void 0,
            onClick: v,
            onFocus: w,
            onPointerMove: k,
            onMouseMove: k,
            onPointerLeave: b,
            onMouseLeave: b
        },
        slot: g,
        defaultTag: Lf,
        name: "Listbox.Option"
    })
}
an.Button = Rf,
an.Label = Nf,
an.Options = Af,
an.Option = Ff;
var zf = {
    1(e) {
        return e.menuState === 1 ? e : {
            ...e,
            activeItemIndex: null,
            menuState: 1
        }
    },
    0(e) {
        return e.menuState === 0 ? e : {
            ...e,
            menuState: 0
        }
    },
    2: (e, t) => {
        let r = Ar(t, {
            resolveItems: () => e.items,
            resolveActiveIndex: () => e.activeItemIndex,
            resolveId: n => n.id,
            resolveDisabled: n => n.dataRef.current.disabled
        });
        return e.searchQuery === "" && e.activeItemIndex === r ? e : {
            ...e,
            searchQuery: "",
            activeItemIndex: r
        }
    }
    ,
    3: (e, t) => {
        let r = e.searchQuery !== "" ? 0 : 1
          , n = e.searchQuery + t.value.toLowerCase()
          , i = (e.activeItemIndex !== null ? e.items.slice(e.activeItemIndex + r).concat(e.items.slice(0, e.activeItemIndex + r)) : e.items).find(c => {
            var l;
            return ((l = c.dataRef.current.textValue) == null ? void 0 : l.startsWith(n)) && !c.dataRef.current.disabled
        }
        )
          , a = i ? e.items.indexOf(i) : -1;
        return a === -1 || a === e.activeItemIndex ? {
            ...e,
            searchQuery: n
        } : {
            ...e,
            searchQuery: n,
            activeItemIndex: a
        }
    }
    ,
    4(e) {
        return e.searchQuery === "" ? e : {
            ...e,
            searchQuery: "",
            searchActiveItemIndex: null
        }
    },
    5: (e, t) => {
        var r;
        let n = Array.from((r = e.itemsRef.current) == null ? void 0 : r.querySelectorAll('[id^="headlessui-menu-item-"]')).reduce( (a, c, l) => Object.assign(a, {
            [c.id]: l
        }), {})
          , i = [...e.items, {
            id: t.id,
            dataRef: t.dataRef
        }].sort( (a, c) => n[a.id] - n[c.id]);
        return {
            ...e,
            items: i
        }
    }
    ,
    6: (e, t) => {
        let r = e.items.slice()
          , n = e.activeItemIndex !== null ? r[e.activeItemIndex] : null
          , i = r.findIndex(a => a.id === t.id);
        return i !== -1 && r.splice(i, 1),
        {
            ...e,
            items: r,
            activeItemIndex: ( () => i === e.activeItemIndex || n === null ? null : r.indexOf(n))()
        }
    }
}
  , Kr = d.createContext(null);
Kr.displayName = "MenuContext";
function Rn(e) {
    let t = d.useContext(Kr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${Mn.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Rn),
        r
    }
    return t
}
function Bf(e, t) {
    return ne(t.type, zf, e, t)
}
var Hf = d.Fragment;
function Mn(e) {
    let t = d.useReducer(Bf, {
        menuState: 1,
        buttonRef: d.createRef(),
        itemsRef: d.createRef(),
        items: [],
        searchQuery: "",
        activeItemIndex: null
    })
      , [{menuState: r, itemsRef: n, buttonRef: i},a] = t;
    Re("mousedown", l => {
        var u, m, h;
        let v = l.target;
        r === 0 && ((u = i.current) != null && u.contains(v) || (m = n.current) != null && m.contains(v) || (a({
            type: 1
        }),
        Hr(v, 1) || (l.preventDefault(),
        (h = i.current) == null || h.focus())))
    }
    );
    let c = d.useMemo( () => ({
        open: r === 0
    }), [r]);
    return G.createElement(Kr.Provider, {
        value: t
    }, G.createElement(_t, {
        value: ne(r, {
            0: 0,
            1: 1
        })
    }, ee({
        props: e,
        slot: c,
        defaultTag: Hf,
        name: "Menu"
    })))
}
var $f = "button"
  , Uf = ge(function(e, t) {
    var r;
    let[n,i] = Rn("Menu.Button")
      , a = he(n.buttonRef, t)
      , c = `headlessui-menu-button-${ie()}`
      , l = st()
      , u = d.useCallback(b => {
        switch (b.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
            b.preventDefault(),
            b.stopPropagation(),
            i({
                type: 0
            }),
            l.nextFrame( () => i({
                type: 2,
                focus: 0
            }));
            break;
        case "ArrowUp":
            b.preventDefault(),
            b.stopPropagation(),
            i({
                type: 0
            }),
            l.nextFrame( () => i({
                type: 2,
                focus: 3
            }));
            break
        }
    }
    , [i, l])
      , m = d.useCallback(b => {
        switch (b.key) {
        case " ":
            b.preventDefault();
            break
        }
    }
    , [])
      , h = d.useCallback(b => {
        if (lt(b.currentTarget))
            return b.preventDefault();
        e.disabled || (n.menuState === 0 ? (i({
            type: 1
        }),
        l.nextFrame( () => {
            var g;
            return (g = n.buttonRef.current) == null ? void 0 : g.focus({
                preventScroll: !0
            })
        }
        )) : (b.preventDefault(),
        b.stopPropagation(),
        i({
            type: 0
        })))
    }
    , [i, l, n, e.disabled])
      , v = d.useMemo( () => ({
        open: n.menuState === 0
    }), [n])
      , w = e
      , k = {
        ref: a,
        id: c,
        type: nn(e, n.buttonRef),
        "aria-haspopup": !0,
        "aria-controls": (r = n.itemsRef.current) == null ? void 0 : r.id,
        "aria-expanded": e.disabled ? void 0 : n.menuState === 0,
        onKeyDown: u,
        onKeyUp: m,
        onClick: h
    };
    return ee({
        props: {
            ...w,
            ...k
        },
        slot: v,
        defaultTag: $f,
        name: "Menu.Button"
    })
})
  , Vf = "div"
  , qf = 3
  , Gf = ge(function(e, t) {
    var r, n;
    let[i,a] = Rn("Menu.Items")
      , c = he(i.itemsRef, t)
      , l = `headlessui-menu-items-${ie()}`
      , u = st()
      , m = Ue()
      , h = ( () => m !== null ? m === 0 : i.menuState === 0)();
    d.useEffect( () => {
        let g = i.itemsRef.current;
        !g || i.menuState === 0 && g !== document.activeElement && g.focus({
            preventScroll: !0
        })
    }
    , [i.menuState, i.itemsRef]),
    ka({
        container: i.itemsRef.current,
        enabled: i.menuState === 0,
        accept(g) {
            return g.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : g.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
        },
        walk(g) {
            g.setAttribute("role", "none")
        }
    });
    let v = d.useCallback(g => {
        var _;
        switch (u.dispose(),
        g.key) {
        case " ":
            if (i.searchQuery !== "")
                return g.preventDefault(),
                g.stopPropagation(),
                a({
                    type: 3,
                    value: g.key
                });
        case "Enter":
            if (g.preventDefault(),
            g.stopPropagation(),
            a({
                type: 1
            }),
            i.activeItemIndex !== null) {
                let {id: I} = i.items[i.activeItemIndex];
                (_ = document.getElementById(I)) == null || _.click()
            }
            Ie().nextFrame( () => {
                var I;
                return (I = i.buttonRef.current) == null ? void 0 : I.focus({
                    preventScroll: !0
                })
            }
            );
            break;
        case "ArrowDown":
            return g.preventDefault(),
            g.stopPropagation(),
            a({
                type: 2,
                focus: 2
            });
        case "ArrowUp":
            return g.preventDefault(),
            g.stopPropagation(),
            a({
                type: 2,
                focus: 1
            });
        case "Home":
        case "PageUp":
            return g.preventDefault(),
            g.stopPropagation(),
            a({
                type: 2,
                focus: 0
            });
        case "End":
        case "PageDown":
            return g.preventDefault(),
            g.stopPropagation(),
            a({
                type: 2,
                focus: 3
            });
        case "Escape":
            g.preventDefault(),
            g.stopPropagation(),
            a({
                type: 1
            }),
            Ie().nextFrame( () => {
                var I;
                return (I = i.buttonRef.current) == null ? void 0 : I.focus({
                    preventScroll: !0
                })
            }
            );
            break;
        case "Tab":
            g.preventDefault(),
            g.stopPropagation();
            break;
        default:
            g.key.length === 1 && (a({
                type: 3,
                value: g.key
            }),
            u.setTimeout( () => a({
                type: 4
            }), 350));
            break
        }
    }
    , [a, u, i])
      , w = d.useCallback(g => {
        switch (g.key) {
        case " ":
            g.preventDefault();
            break
        }
    }
    , [])
      , k = d.useMemo( () => ({
        open: i.menuState === 0
    }), [i])
      , b = {
        "aria-activedescendant": i.activeItemIndex === null || (r = i.items[i.activeItemIndex]) == null ? void 0 : r.id,
        "aria-labelledby": (n = i.buttonRef.current) == null ? void 0 : n.id,
        id: l,
        onKeyDown: v,
        onKeyUp: w,
        role: "menu",
        tabIndex: 0,
        ref: c
    };
    return ee({
        props: {
            ...e,
            ...b
        },
        slot: k,
        defaultTag: Vf,
        features: qf,
        visible: h,
        name: "Menu.Items"
    })
})
  , Wf = d.Fragment;
function Xf(e) {
    let {disabled: t=!1, onClick: r, ...n} = e
      , [i,a] = Rn("Menu.Item")
      , c = `headlessui-menu-item-${ie()}`
      , l = i.activeItemIndex !== null ? i.items[i.activeItemIndex].id === c : !1;
    Y( () => {
        if (i.menuState !== 0 || !l)
            return;
        let b = Ie();
        return b.requestAnimationFrame( () => {
            var g, _;
            (_ = (g = document.getElementById(c)) == null ? void 0 : g.scrollIntoView) == null || _.call(g, {
                block: "nearest"
            })
        }
        ),
        b.dispose
    }
    , [c, l, i.menuState, i.activeItemIndex]);
    let u = d.useRef({
        disabled: t
    });
    Y( () => {
        u.current.disabled = t
    }
    , [u, t]),
    Y( () => {
        var b, g;
        u.current.textValue = (g = (b = document.getElementById(c)) == null ? void 0 : b.textContent) == null ? void 0 : g.toLowerCase()
    }
    , [u, c]),
    Y( () => (a({
        type: 5,
        id: c,
        dataRef: u
    }),
    () => a({
        type: 6,
        id: c
    })), [u, c]);
    let m = d.useCallback(b => {
        if (t)
            return b.preventDefault();
        if (a({
            type: 1
        }),
        Ie().nextFrame( () => {
            var g;
            return (g = i.buttonRef.current) == null ? void 0 : g.focus({
                preventScroll: !0
            })
        }
        ),
        r)
            return r(b)
    }
    , [a, i.buttonRef, t, r])
      , h = d.useCallback( () => {
        if (t)
            return a({
                type: 2,
                focus: 5
            });
        a({
            type: 2,
            focus: 4,
            id: c
        })
    }
    , [t, c, a])
      , v = d.useCallback( () => {
        t || l || a({
            type: 2,
            focus: 4,
            id: c
        })
    }
    , [t, l, c, a])
      , w = d.useCallback( () => {
        t || !l || a({
            type: 2,
            focus: 5
        })
    }
    , [t, l, a])
      , k = d.useMemo( () => ({
        active: l,
        disabled: t
    }), [l, t]);
    return ee({
        props: {
            ...n,
            id: c,
            role: "menuitem",
            tabIndex: t === !0 ? void 0 : -1,
            "aria-disabled": t === !0 ? !0 : void 0,
            disabled: void 0,
            onClick: m,
            onFocus: h,
            onPointerMove: v,
            onMouseMove: v,
            onPointerLeave: w,
            onMouseLeave: w
        },
        slot: k,
        defaultTag: Wf,
        name: "Menu.Item"
    })
}
Mn.Button = Uf,
Mn.Items = Gf,
Mn.Item = Xf;
var Yf = {
    0: e => ({
        ...e,
        popoverState: ne(e.popoverState, {
            0: 1,
            1: 0
        })
    }),
    1(e) {
        return e.popoverState === 1 ? e : {
            ...e,
            popoverState: 1
        }
    },
    2(e, t) {
        return e.button === t.button ? e : {
            ...e,
            button: t.button
        }
    },
    3(e, t) {
        return e.buttonId === t.buttonId ? e : {
            ...e,
            buttonId: t.buttonId
        }
    },
    4(e, t) {
        return e.panel === t.panel ? e : {
            ...e,
            panel: t.panel
        }
    },
    5(e, t) {
        return e.panelId === t.panelId ? e : {
            ...e,
            panelId: t.panelId
        }
    }
}
  , Zr = d.createContext(null);
Zr.displayName = "PopoverContext";
function Nn(e) {
    let t = d.useContext(Zr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${Ct.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Nn),
        r
    }
    return t
}
var Qr = d.createContext(null);
Qr.displayName = "PopoverAPIContext";
function Na(e) {
    let t = d.useContext(Qr);
    if (t === null) {
        let r = new Error(`<${e} /> is missing a parent <${Ct.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Na),
        r
    }
    return t
}
var Jr = d.createContext(null);
Jr.displayName = "PopoverGroupContext";
function Oa() {
    return d.useContext(Jr)
}
var eo = d.createContext(null);
eo.displayName = "PopoverPanelContext";
function Kf() {
    return d.useContext(eo)
}
function Zf(e, t) {
    return ne(t.type, Yf, e, t)
}
var Qf = "div";
function Ct(e) {
    let t = `headlessui-popover-button-${ie()}`
      , r = `headlessui-popover-panel-${ie()}`
      , n = d.useReducer(Zf, {
        popoverState: 1,
        button: null,
        buttonId: t,
        panel: null,
        panelId: r
    })
      , [{popoverState: i, button: a, panel: c},l] = n;
    d.useEffect( () => l({
        type: 3,
        buttonId: t
    }), [t, l]),
    d.useEffect( () => l({
        type: 5,
        panelId: r
    }), [r, l]);
    let u = d.useMemo( () => ({
        buttonId: t,
        panelId: r,
        close: () => l({
            type: 1
        })
    }), [t, r, l])
      , m = Oa()
      , h = m == null ? void 0 : m.registerPopover
      , v = d.useCallback( () => {
        var g;
        return (g = m == null ? void 0 : m.isFocusWithinPopoverGroup()) != null ? g : (a == null ? void 0 : a.contains(document.activeElement)) || (c == null ? void 0 : c.contains(document.activeElement))
    }
    , [m, a, c]);
    d.useEffect( () => h == null ? void 0 : h(u), [h, u]),
    Re("focus", () => {
        i === 0 && (v() || !a || !c || l({
            type: 1
        }))
    }
    , !0),
    Re("mousedown", g => {
        let _ = g.target;
        i === 0 && (a != null && a.contains(_) || c != null && c.contains(_) || (l({
            type: 1
        }),
        Hr(_, 1) || (g.preventDefault(),
        a == null || a.focus())))
    }
    );
    let w = d.useCallback(g => {
        l({
            type: 1
        });
        let _ = ( () => g ? g instanceof HTMLElement ? g : g.current instanceof HTMLElement ? g.current : a : a)();
        _ == null || _.focus()
    }
    , [l, a])
      , k = d.useMemo( () => ({
        close: w
    }), [w])
      , b = d.useMemo( () => ({
        open: i === 0,
        close: w
    }), [i, w]);
    return G.createElement(Zr.Provider, {
        value: n
    }, G.createElement(Qr.Provider, {
        value: k
    }, G.createElement(_t, {
        value: ne(i, {
            0: 0,
            1: 1
        })
    }, ee({
        props: e,
        slot: b,
        defaultTag: Qf,
        name: "Popover"
    }))))
}
var Jf = "button"
  , em = ge(function(e, t) {
    let[r,n] = Nn("Popover.Button")
      , i = d.useRef(null)
      , a = Oa()
      , c = a == null ? void 0 : a.closeOthers
      , l = Kf()
      , u = l === null ? !1 : l === r.panelId
      , m = he(i, t, u ? null : o => n({
        type: 2,
        button: o
    }))
      , h = he(i, t)
      , v = d.useRef(null)
      , w = d.useRef(typeof window > "u" ? null : document.activeElement);
    Re("focus", () => {
        w.current = v.current,
        v.current = document.activeElement
    }
    , !0);
    let k = d.useCallback(o => {
        var p, f;
        if (u) {
            if (r.popoverState === 1)
                return;
            switch (o.key) {
            case " ":
            case "Enter":
                o.preventDefault(),
                o.stopPropagation(),
                n({
                    type: 1
                }),
                (p = r.button) == null || p.focus();
                break
            }
        } else
            switch (o.key) {
            case " ":
            case "Enter":
                o.preventDefault(),
                o.stopPropagation(),
                r.popoverState === 1 && (c == null || c(r.buttonId)),
                n({
                    type: 0
                });
                break;
            case "Escape":
                if (r.popoverState !== 0)
                    return c == null ? void 0 : c(r.buttonId);
                if (!i.current || !i.current.contains(document.activeElement))
                    return;
                o.preventDefault(),
                o.stopPropagation(),
                n({
                    type: 1
                });
                break;
            case "Tab":
                if (r.popoverState !== 0 || !r.panel || !r.button)
                    return;
                if (o.shiftKey) {
                    if (!w.current || (f = r.button) != null && f.contains(w.current) || r.panel.contains(w.current))
                        return;
                    let x = Tn()
                      , E = x.indexOf(w.current);
                    if (x.indexOf(r.button) > E)
                        return;
                    o.preventDefault(),
                    o.stopPropagation(),
                    Ve(r.panel, 8)
                } else
                    o.preventDefault(),
                    o.stopPropagation(),
                    Ve(r.panel, 1);
                break
            }
    }
    , [n, r.popoverState, r.buttonId, r.button, r.panel, i, c, u])
      , b = d.useCallback(o => {
        var p;
        if (!u && (o.key === " " && o.preventDefault(),
        r.popoverState === 0 && !!r.panel && !!r.button))
            switch (o.key) {
            case "Tab":
                if (!w.current || (p = r.button) != null && p.contains(w.current) || r.panel.contains(w.current))
                    return;
                let f = Tn()
                  , x = f.indexOf(w.current);
                if (f.indexOf(r.button) > x)
                    return;
                o.preventDefault(),
                o.stopPropagation(),
                Ve(r.panel, 8);
                break
            }
    }
    , [r.popoverState, r.panel, r.button, u])
      , g = d.useCallback(o => {
        var p, f;
        lt(o.currentTarget) || e.disabled || (u ? (n({
            type: 1
        }),
        (p = r.button) == null || p.focus()) : (r.popoverState === 1 && (c == null || c(r.buttonId)),
        (f = r.button) == null || f.focus(),
        n({
            type: 0
        })))
    }
    , [n, r.button, r.popoverState, r.buttonId, e.disabled, c, u])
      , _ = d.useMemo( () => ({
        open: r.popoverState === 0
    }), [r])
      , I = nn(e, i)
      , M = e
      , D = u ? {
        ref: h,
        type: I,
        onKeyDown: k,
        onClick: g
    } : {
        ref: m,
        id: r.buttonId,
        type: I,
        "aria-expanded": e.disabled ? void 0 : r.popoverState === 0,
        "aria-controls": r.panel ? r.panelId : void 0,
        onKeyDown: k,
        onKeyUp: b,
        onClick: g
    };
    return ee({
        props: {
            ...M,
            ...D
        },
        slot: _,
        defaultTag: Jf,
        name: "Popover.Button"
    })
})
  , tm = "div"
  , nm = 3
  , rm = ge(function(e, t) {
    let[{popoverState: r},n] = Nn("Popover.Overlay")
      , i = he(t)
      , a = `headlessui-popover-overlay-${ie()}`
      , c = Ue()
      , l = ( () => c !== null ? c === 0 : r === 0)()
      , u = d.useCallback(h => {
        if (lt(h.currentTarget))
            return h.preventDefault();
        n({
            type: 1
        })
    }
    , [n])
      , m = d.useMemo( () => ({
        open: r === 0
    }), [r]);
    return ee({
        props: {
            ...e,
            ref: i,
            id: a,
            "aria-hidden": !0,
            onClick: u
        },
        slot: m,
        defaultTag: tm,
        features: nm,
        visible: l,
        name: "Popover.Overlay"
    })
})
  , om = "div"
  , im = 3
  , am = ge(function(e, t) {
    let {focus: r=!1, ...n} = e
      , [i,a] = Nn("Popover.Panel")
      , {close: c} = Na("Popover.Panel")
      , l = d.useRef(null)
      , u = he(l, t, b => {
        a({
            type: 4,
            panel: b
        })
    }
    )
      , m = Ue()
      , h = ( () => m !== null ? m === 0 : i.popoverState === 0)()
      , v = d.useCallback(b => {
        var g;
        switch (b.key) {
        case "Escape":
            if (i.popoverState !== 0 || !l.current || !l.current.contains(document.activeElement))
                return;
            b.preventDefault(),
            b.stopPropagation(),
            a({
                type: 1
            }),
            (g = i.button) == null || g.focus();
            break
        }
    }
    , [i, l, a]);
    d.useEffect( () => () => a({
        type: 4,
        panel: null
    }), [a]),
    d.useEffect( () => {
        var b;
        e.static || i.popoverState === 1 && ((b = e.unmount) == null || b) && a({
            type: 4,
            panel: null
        })
    }
    , [i.popoverState, e.unmount, e.static, a]),
    d.useEffect( () => {
        if (!r || i.popoverState !== 0 || !l.current)
            return;
        let b = document.activeElement;
        l.current.contains(b) || Ve(l.current, 1)
    }
    , [r, l, i.popoverState]),
    Re("keydown", b => {
        var g;
        if (i.popoverState !== 0 || !l.current || b.key !== "Tab" || !document.activeElement || !l.current || !l.current.contains(document.activeElement))
            return;
        b.preventDefault();
        let _ = Ve(l.current, b.shiftKey ? 2 : 4);
        if (_ === 3)
            return (g = i.button) == null ? void 0 : g.focus();
        if (_ === 1) {
            if (!i.button)
                return;
            let I = Tn()
              , M = I.indexOf(i.button)
              , D = I.splice(M + 1).filter(o => {
                var p;
                return !((p = l.current) != null && p.contains(o))
            }
            );
            Ve(D, 1) === 0 && Ve(document.body, 1)
        }
    }
    ),
    Re("focus", () => {
        var b;
        !r || i.popoverState === 0 && (!l.current || (b = l.current) != null && b.contains(document.activeElement) || a({
            type: 1
        }))
    }
    , !0);
    let w = d.useMemo( () => ({
        open: i.popoverState === 0,
        close: c
    }), [i, c])
      , k = {
        ref: u,
        id: i.panelId,
        onKeyDown: v
    };
    return G.createElement(eo.Provider, {
        value: i.panelId
    }, ee({
        props: {
            ...n,
            ...k
        },
        slot: w,
        defaultTag: om,
        features: im,
        visible: h,
        name: "Popover.Panel"
    }))
})
  , sm = "div";
function lm(e) {
    let t = d.useRef(null)
      , [r,n] = d.useState([])
      , i = d.useCallback(w => {
        n(k => {
            let b = k.indexOf(w);
            if (b !== -1) {
                let g = k.slice();
                return g.splice(b, 1),
                g
            }
            return k
        }
        )
    }
    , [n])
      , a = d.useCallback(w => (n(k => [...k, w]),
    () => i(w)), [n, i])
      , c = d.useCallback( () => {
        var w;
        let k = document.activeElement;
        return (w = t.current) != null && w.contains(k) ? !0 : r.some(b => {
            var g, _;
            return ((g = document.getElementById(b.buttonId)) == null ? void 0 : g.contains(k)) || ((_ = document.getElementById(b.panelId)) == null ? void 0 : _.contains(k))
        }
        )
    }
    , [t, r])
      , l = d.useCallback(w => {
        for (let k of r)
            k.buttonId !== w && k.close()
    }
    , [r])
      , u = d.useMemo( () => ({
        registerPopover: a,
        unregisterPopover: i,
        isFocusWithinPopoverGroup: c,
        closeOthers: l
    }), [a, i, c, l])
      , m = d.useMemo( () => ({}), [])
      , h = {
        ref: t
    }
      , v = e;
    return G.createElement(Jr.Provider, {
        value: u
    }, ee({
        props: {
            ...v,
            ...h
        },
        slot: m,
        defaultTag: sm,
        name: "Popover.Group"
    }))
}
Ct.Button = em,
Ct.Overlay = rm,
Ct.Panel = am,
Ct.Group = lm,
d.createContext(null);
var cm = d.createContext(null);
cm.displayName = "RadioGroupContext";
var um = d.createContext(null);
um.displayName = "GroupContext";
var dm = d.createContext(null);
dm.displayName = "TabsContext";
function pm() {
    let e = d.useRef(!0);
    return d.useEffect( () => {
        e.current = !1
    }
    , []),
    e.current
}
function fm(e) {
    let t = {
        called: !1
    };
    return (...r) => {
        if (!t.called)
            return t.called = !0,
            e(...r)
    }
}
function to(e, ...t) {
    e && t.length > 0 && e.classList.add(...t)
}
function On(e, ...t) {
    e && t.length > 0 && e.classList.remove(...t)
}
function mm(e, t) {
    let r = Ie();
    if (!e)
        return r.dispose;
    let {transitionDuration: n, transitionDelay: i} = getComputedStyle(e)
      , [a,c] = [n, i].map(l => {
        let[u=0] = l.split(",").filter(Boolean).map(m => m.includes("ms") ? parseFloat(m) : parseFloat(m) * 1e3).sort( (m, h) => h - m);
        return u
    }
    );
    return a !== 0 ? r.setTimeout( () => {
        t("finished")
    }
    , a + c) : t("finished"),
    r.add( () => t("cancelled")),
    r.dispose
}
function Da(e, t, r, n, i, a) {
    let c = Ie()
      , l = a !== void 0 ? fm(a) : () => {}
    ;
    return On(e, ...i),
    to(e, ...t, ...r),
    c.nextFrame( () => {
        On(e, ...r),
        to(e, ...n),
        c.add(mm(e, u => (On(e, ...n, ...t),
        to(e, ...i),
        l(u))))
    }
    ),
    c.add( () => On(e, ...t, ...r, ...n, ...i)),
    c.add( () => l("cancelled")),
    c.dispose
}
function ct(e="") {
    return d.useMemo( () => e.split(" ").filter(t => t.trim().length > 1), [e])
}
var Dn = d.createContext(null);
Dn.displayName = "TransitionContext";
function hm() {
    let e = d.useContext(Dn);
    if (e === null)
        throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
    return e
}
function gm() {
    let e = d.useContext(An);
    if (e === null)
        throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
    return e
}
var An = d.createContext(null);
An.displayName = "NestingContext";
function Ln(e) {
    return "children"in e ? Ln(e.children) : e.current.filter( ({state: t}) => t === "visible").length > 0
}
function Aa(e) {
    let t = d.useRef(e)
      , r = d.useRef([])
      , n = Ea();
    d.useEffect( () => {
        t.current = e
    }
    , [e]);
    let i = d.useCallback( (c, l=1) => {
        var u;
        let m = r.current.findIndex( ({id: h}) => h === c);
        m !== -1 && (ne(l, {
            0() {
                r.current.splice(m, 1)
            },
            1() {
                r.current[m].state = "hidden"
            }
        }),
        !Ln(r) && n.current && ((u = t.current) == null || u.call(t)))
    }
    , [t, n, r])
      , a = d.useCallback(c => {
        let l = r.current.find( ({id: u}) => u === c);
        return l ? l.state !== "visible" && (l.state = "visible") : r.current.push({
            id: c,
            state: "visible"
        }),
        () => i(c, 0)
    }
    , [r, i]);
    return d.useMemo( () => ({
        children: r,
        register: a,
        unregister: i
    }), [a, i, r])
}
function bm() {}
var vm = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function La(e) {
    var t;
    let r = {};
    for (let n of vm)
        r[n] = (t = e[n]) != null ? t : bm;
    return r
}
function xm(e) {
    let t = d.useRef(La(e));
    return d.useEffect( () => {
        t.current = La(e)
    }
    , [e]),
    t
}
var ym = "div"
  , Fa = 1;
function za(e) {
    let {beforeEnter: t, afterEnter: r, beforeLeave: n, afterLeave: i, enter: a, enterFrom: c, enterTo: l, entered: u, leave: m, leaveFrom: h, leaveTo: v, ...w} = e
      , k = d.useRef(null)
      , [b,g] = d.useState("visible")
      , _ = w.unmount ? 0 : 1
      , {show: I, appear: M, initial: D} = hm()
      , {register: o, unregister: p} = gm()
      , f = ie()
      , x = d.useRef(!1)
      , E = Aa( () => {
        x.current || (g("hidden"),
        p(f),
        y.current.afterLeave())
    }
    );
    Y( () => {
        if (f)
            return o(f)
    }
    , [o, f]),
    Y( () => {
        if (_ === 1 && f) {
            if (I && b !== "visible") {
                g("visible");
                return
            }
            ne(b, {
                hidden: () => p(f),
                visible: () => o(f)
            })
        }
    }
    , [b, f, o, p, I, _]);
    let j = ct(a)
      , C = ct(c)
      , S = ct(l)
      , T = ct(u)
      , P = ct(m)
      , R = ct(h)
      , N = ct(v)
      , y = xm({
        beforeEnter: t,
        afterEnter: r,
        beforeLeave: n,
        afterLeave: i
    })
      , O = Cn();
    d.useEffect( () => {
        if (O && b === "visible" && k.current === null)
            throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")
    }
    , [k, b, O]);
    let A = D && !M;
    Y( () => {
        let F = k.current;
        if (F && !A)
            return x.current = !0,
            I && y.current.beforeEnter(),
            I || y.current.beforeLeave(),
            I ? Da(F, j, C, S, T, B => {
                x.current = !1,
                B === "finished" && y.current.afterEnter()
            }
            ) : Da(F, P, R, N, T, B => {
                x.current = !1,
                B === "finished" && (Ln(E) || (g("hidden"),
                p(f),
                y.current.afterLeave()))
            }
            )
    }
    , [y, f, x, p, E, k, A, I, j, C, S, P, R, N]);
    let L = {
        ref: k
    }
      , z = w;
    return G.createElement(An.Provider, {
        value: E
    }, G.createElement(_t, {
        value: ne(b, {
            visible: 0,
            hidden: 1
        })
    }, ee({
        props: {
            ...z,
            ...L
        },
        defaultTag: ym,
        features: Fa,
        visible: b === "visible",
        name: "Transition.Child"
    })))
}
function jt(e) {
    let {show: t, appear: r=!1, unmount: n, ...i} = e
      , a = Ue();
    if (t === void 0 && a !== null && (t = ne(a, {
        0: !0,
        1: !1
    })),
    ![!0, !1].includes(t))
        throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
    let[c,l] = d.useState(t ? "visible" : "hidden")
      , u = Aa( () => {
        l("hidden")
    }
    )
      , m = pm()
      , h = d.useMemo( () => ({
        show: t,
        appear: r || !m,
        initial: m
    }), [t, r, m]);
    d.useEffect( () => {
        t ? l("visible") : Ln(u) || l("hidden")
    }
    , [t, u]);
    let v = {
        unmount: n
    };
    return G.createElement(An.Provider, {
        value: u
    }, G.createElement(Dn.Provider, {
        value: h
    }, ee({
        props: {
            ...v,
            as: d.Fragment,
            children: G.createElement(za, {
                ...v,
                ...i
            })
        },
        defaultTag: d.Fragment,
        features: Fa,
        visible: c === "visible",
        name: "Transition"
    })))
}
jt.Child = function(e) {
    let t = d.useContext(Dn) !== null
      , r = Ue() !== null;
    return !t && r ? G.createElement(jt, {
        ...e
    }) : G.createElement(za, {
        ...e
    })
}
,
jt.Root = jt;
const Ba = ({show: e=!0, onClick: t, modalRef: r}) => window === window.top && s.jsx(jt, {
    appear: !0,
    show: e,
    enter: "transition-opacity duration-500",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity duration-500",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
    children: s.jsx("div", {
        role: "presentation",
        onClick: t,
        ref: r,
        className: "absolute left-0 top-0 -z-[1] flex h-screen w-screen items-center justify-center bg-slate-900/70",
        children: s.jsx("div", {
            className: "top-[50%] select-none text-5xl font-bold text-white",
            children: "Now capturing your browser."
        })
    })
})
  , Ha = ({onClick: e, text: t, showCancel: r, primary: n=!0, dataTestID: i=void 0}) => r ? s.jsx("button", {
    onClick: e,
    className: n ? "DeleteButton" : "CancelButton",
    "data-testid": i,
    children: s.jsx("a", {
        className: n ? "DeleteButton--text" : "CancelButton--text",
        children: t
    })
}) : s.jsx("button", {
    onClick: e,
    className: "GotItButton",
    children: s.jsx("a", {
        className: "GotItButton--text",
        children: t
    })
});
function wm({onCancel: e, onDelete: t, showDelete: r, showCancelButton: n, modalRef: i, title: a, description: c, dataTestID: l=void 0, dataTestIDPrimaryBtn: u=void 0, dataTestIDSecondaryBtn: m=void 0}) {
    return s.jsx("div", {
        className: "AlertModal--wrapper",
        "data-testid": l,
        children: s.jsxs("div", {
            className: "AlertModal",
            ref: i,
            children: [s.jsxs("div", {
                className: "AlertModal--content",
                children: [s.jsx("div", {
                    className: "AlertModal--row",
                    children: n && s.jsxs(s.Fragment, {
                        children: [s.jsx("a", {
                            className: "AlertModal--title",
                            children: a
                        }), s.jsx(le, {
                            onClick: e,
                            className: "XButton",
                            icon: Pc
                        })]
                    })
                }), s.jsx("p", {
                    className: "AlertModal--body",
                    children: c
                })]
            }), s.jsx("div", {
                className: "BounceLoaderModal",
                children: s.jsx(Ko, {
                    size: 50,
                    color: "#6466f1",
                    loading: !n
                })
            }), n && s.jsxs("div", {
                className: r ? "AlertModal--row" : "GotItScribeModal--row",
                children: [s.jsx(Ha, {
                    onClick: e,
                    text: r ? "Cancel" : "Got it",
                    showCancel: r,
                    primary: !1,
                    dataTestID: m
                }), r && s.jsx(Ha, {
                    onClick: t,
                    showCancel: r,
                    text: "Yes, Delete Scribe",
                    dataTestID: u
                })]
            })]
        })
    })
}
const _m = ({onCancel: e, onDelete: t, modalRef: r}) => {
    const n = d.useCallback(i => {
        i.keyCode === 27 && e(i)
    }
    , []);
    return d.useEffect( () => (document.addEventListener("keydown", n, !1),
    () => {
        document.removeEventListener("keydown", n, !1)
    }
    ), [n]),
    s.jsx(wm, {
        onCancel: e,
        showDelete: !0,
        onDelete: t,
        modalRef: r,
        showCancelButton: !0,
        title: "Are you sure?",
        description: "This action is permanent. You can always edit a Scribe when you are done capturing it.",
        dataTestID: "extensionDeleteCurrentScribeModal",
        dataTestIDPrimaryBtn: "extensionDeleteCurrentScribeButton",
        dataTestIDSecondaryBtn: "extensionCancelDeleteCurrentScribeButton"
    })
}
  , km = () => s.jsx(jt, {
    appear: !0,
    show: !0,
    enter: "transition-opacity duration-500",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity duration-500",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
    children: s.jsx("div", {
        className: "absolute left-0 top-0 -z-[1] flex h-screen w-screen items-center justify-center bg-slate-900/70 text-center",
        children: s.jsxs("text", {
            className: "top-[50%] select-none text-5xl font-bold text-white",
            children: ["Step limit has been reached.", s.jsx("br", {}), "Your Scribe has stopped capturing.", s.jsx("br", {}), s.jsx("br", {}), s.jsx("br", {}), "Processing your Scribe...."]
        })
    })
})
  , Em = () => s.jsx("div", {
    className: "h-5 w-5 animate-pulse rounded-full bg-red-400"
})
  , Cm = "/assets/spinner.png"
  , jm = () => s.jsx("img", {
    className: "h-full w-full animate-spin",
    src: Cm,
    alt: "Ending capturing"
})
  , Sm = () => s.jsx("div", {
    className: "h-5 w-5 rounded-full bg-slate-400"
})
  , Tm = ({open: e, hovered: t, status: r}) => {
    if (e || t)
        return s.jsx(le, {
            className: "h-4 w-4 text-slate-100",
            icon: e ? Ic : Rc
        });
    switch (r) {
    case me.PAUSED_RECORDING:
        return s.jsx(Sm, {});
    case me.ENDING_RECORDING:
        return s.jsx(jm, {});
    default:
        return s.jsx(Em, {})
    }
}
  , Pm = ({status: e, open: t, onClick: r}) => {
    const [n,i] = d.useState(!1);
    function a() {
        i(!0)
    }
    function c() {
        i(!1)
    }
    return s.jsx(qe, {
        children: s.jsxs(de, {
            children: [s.jsx(pe, {
                children: s.jsx("button", {
                    "data-testid": "extensionRecordingControlsIndicator",
                    className: ht("flex cursor-pointer flex-col rounded-full border bg-slate-800 p-2 shadow-2xl", {
                        "border-slate-600": t,
                        "border-transparent bg-brand-800": !t && (e === me.RECORDING || e === me.ENDING_RECORDING)
                    }),
                    onClick: r,
                    onMouseEnter: a,
                    onMouseLeave: c,
                    children: s.jsx("div", {
                        className: ht("flex h-10 w-10 items-center justify-center rounded-full  text-slate-100", {
                            "bg-slate-300/10": t || n || e === me.IDLE
                        }),
                        children: s.jsx(Tm, {
                            open: t,
                            hovered: n,
                            status: e
                        })
                    })
                })
            }), s.jsxs(se, {
                side: "right",
                children: [t ? "Hide" : "Show", " Controls"]
            })]
        })
    })
}
  , no = d.createContext(null)
  , $a = ({message: e, icon: t, iconClassName: r, children: n, className: i, side: a="bottom", container: c, ...l}) => {
    const u = d.useMemo( () => ({
        side: a
    }), [a]);
    return s.jsxs(lr, {
        ...l,
        children: [s.jsx(vi, {
            className: re("fixed left-0 right-0 flex justify-center", {
                "bottom-0": a === "bottom",
                "top-0": a === "top"
            })
        }), s.jsx(sr, {
            sideOffset: 24,
            onOpenAutoFocus: m => m.preventDefault(),
            className: re("flex h-12 min-w-0 items-center justify-between gap-6 rounded-xl p-0 bg-slate-800 shadow-2xl", i),
            theme: "dark",
            container: c,
            children: s.jsxs(no.Provider, {
                value: u,
                children: [!!(t || e) && s.jsxs("div", {
                    className: "flex items-center gap-2 px-4 h-full",
                    children: [t && s.jsx(le, {
                        icon: t,
                        className: re("size-4 shrink-0 text-brand-400", r)
                    }), e && s.jsx("span", {
                        className: "whitespace-nowrap font-sans text-sm font-normal tabular-nums leading-5 text-slate-100",
                        children: e
                    })]
                }), n && s.jsx("div", {
                    className: "flex shrink-0 gap-1.5 p-2",
                    children: n
                })]
            })
        })]
    })
}
;
d.forwardRef( ({tooltip: e, icon: t, ...r}, n) => {
    const i = d.useContext(no);
    if (!i)
        throw new Error("ActionBarIconButton must be used within an ActionBar");
    return s.jsxs(de, {
        children: [s.jsx(pe, {
            asChild: !0,
            children: s.jsx(oe, {
                theme: "dark",
                variant: "ghost",
                "aria-label": e,
                icon: t,
                ref: n,
                "data-testid": r["data-testid"],
                ...r
            })
        }), s.jsx(se, {
            side: i.side === "bottom" ? "top" : "bottom",
            variant: "compact",
            children: e
        })]
    })
}
);
const ro = ({children: e, tooltip: t, className: r, ...n}) => {
    const i = d.useContext(no);
    if (!i)
        throw new Error("ActionBarButton must be used within an ActionBar");
    const a = s.jsx(oe, {
        theme: "dark",
        variant: "ghost",
        size: "small",
        "data-action-bar-text": !0,
        className: r,
        ...n,
        children: e
    });
    return t ? s.jsxs(de, {
        children: [s.jsx(pe, {
            asChild: !0,
            children: a
        }), s.jsx(se, {
            side: i.side === "bottom" ? "top" : "bottom",
            variant: "compact",
            children: t
        })]
    }) : a
}
  , Im = (e, t) => t ? document.elementsFromPoint(e.clientX, e.clientY)[0] : uu(document.elementsFromPoint(e.clientX, e.clientY))
  , Rm = e => {
    const [t,r] = d.useState(null)
      , [n,i] = d.useState(!1)
      , a = d.useCallback(l => {
        r(Im(l, e)),
        i(!1)
    }
    , [])
      , c = d.useCallback( () => i(!0), []);
    return d.useEffect( () => (window.addEventListener("scroll", c, !0),
    () => {
        window.removeEventListener("scroll", c)
    }
    ), [c]),
    d.useEffect( () => (window.addEventListener("mousemove", a),
    () => {
        window.removeEventListener("mousemove", a)
    }
    ), [a]),
    n ? null : t
}
;
function Ua(e) {
    const t = document.getElementById(Ut);
    return t ? t.contains(e) : !1
}
const Mm = ({onClick: e, onEscape: t}) => {
    const r = Rm(!0)
      , [n,i] = d.useState(!1)
      , a = d.useRef(void 0);
    return d.useEffect( () => {
        const c = l => {
            l.key === "Escape" && (t == null || t())
        }
        ;
        return document.addEventListener("keydown", c),
        () => document.removeEventListener("keydown", c)
    }
    , [t]),
    d.useEffect( () => {
        const c = l => {
            l.target && !Ua(l.target) && (l.preventDefault(),
            l.stopPropagation(),
            e == null || e(l))
        }
        ;
        return document.addEventListener("click", c, !0),
        () => document.removeEventListener("click", c, !0)
    }
    , [e]),
    d.useEffect( () => () => {
        a.current && (a.current.style.filter = "")
    }
    , []),
    d.useEffect( () => {
        a.current && (a.current.getAttribute(ou) || (a.current.style.filter = "")),
        r && !Ua(r) ? (r.getAttribute(ur) || (r.style.filter = "blur(16px)",
        a.current = r),
        i(!0)) : r && i(!1)
    }
    , [r]),
    n ? s.jsx("div", {
        className: "pointer-events-none fixed z-50 cursor-pointer rounded-md rounded-tr-none border-2 border-dashed border-brand-500 border-opacity-80",
        style: {
            top: r == null ? void 0 : r.getBoundingClientRect().top,
            left: r == null ? void 0 : r.getBoundingClientRect().left,
            width: r == null ? void 0 : r.getBoundingClientRect().width,
            height: r == null ? void 0 : r.getBoundingClientRect().height
        }
    }) : null
}
  , Nm = ({isEnabled: e, isPreviewing: t, onEnabledChange: r, onSettingsChange: n, onPrecisionBlurEnabledChange: i, settings: a}) => {
    const [c,l] = d.useState(!1)
      , u = (h, v) => {
        J("change_smart_blur_setting", {
            key: h,
            value: v,
            isPreview: t
        }),
        n({
            ...a || {},
            [h]: v
        })
    }
    ;
    d.useEffect( () => {
        e || (r(!0),
        Object.keys(a).filter(h => !!Object.create(a)[h]).length === 0 && n({
            ...a,
            images: !0,
            commonNames: !0,
            emailAddresses: !0,
            numbers: !0
        }))
    }
    , []);
    const m = d.useCallback( (h, v) => {
        const w = h.target.getAttribute(ur);
        if (w) {
            const k = (v.customTargets || []).filter(b => b.id !== w);
            n({
                ...a || {},
                customTargets: k
            })
        } else {
            const k = ki().split("-")[0];
            h.target.setAttribute(ur, k);
            const b = {
                id: k,
                selector: yi(h.target, {
                    attr: _ => ["title", "alt"].includes(_) || _.startsWith("aria-label")
                }),
                url: `${document.location.protocol}//${document.location.hostname}${document.location.pathname}`
            }
              , g = JSON.parse(JSON.stringify(Array.from(v.customTargets || [])));
            g.push(b),
            n({
                ...v || {},
                customTargets: g
            })
        }
    }
    , [a, n]);
    return s.jsxs(s.Fragment, {
        children: [s.jsxs("div", {
            className: ht("w-[280px] flex-col rounded-xl bg-slate-800 shadow-2xl", {
                flex: !c,
                hidden: c
            }),
            children: [s.jsx("div", {
                className: "flex flex-col gap-3 px-4 py-3",
                children: s.jsxs("div", {
                    className: "flex items-center justify-between gap-2",
                    children: [s.jsx("span", {
                        className: "text-base font-semibold leading-6 text-slate-50",
                        children: "Smart Blur"
                    }), s.jsx(We, {
                        theme: "dark",
                        checked: e,
                        onCheckedChange: r
                    })]
                })
            }), s.jsxs("div", {
                children: [s.jsx("div", {
                    className: "h-px bg-slate-900"
                }), s.jsx("div", {
                    className: "h-px bg-slate-700"
                })]
            }), s.jsxs("div", {
                className: "flex flex-col gap-3 px-4 py-3",
                children: [s.jsx(We, {
                    label: "Email Addresses",
                    checked: a == null ? void 0 : a.emailAddresses,
                    disabled: !e,
                    onCheckedChange: h => u("emailAddresses", h),
                    theme: "dark"
                }), s.jsx(We, {
                    label: "Numbers",
                    checked: a == null ? void 0 : a.numbers,
                    disabled: !e,
                    onCheckedChange: h => u("numbers", h),
                    theme: "dark"
                }), s.jsx(We, {
                    label: "Common Names",
                    checked: (a == null ? void 0 : a.commonNames) || !1,
                    disabled: !e,
                    onCheckedChange: h => u("commonNames", h),
                    theme: "dark"
                }), s.jsx(We, {
                    label: "Long Text",
                    checked: a == null ? void 0 : a.longText,
                    disabled: !e,
                    onCheckedChange: h => u("longText", h),
                    theme: "dark"
                }), s.jsx(We, {
                    label: "Form Fields",
                    checked: a == null ? void 0 : a.formFields,
                    disabled: !e,
                    onCheckedChange: h => u("formFields", h),
                    theme: "dark"
                }), s.jsx(We, {
                    label: "Table Rows",
                    checked: a == null ? void 0 : a.tableRows,
                    disabled: !e,
                    onCheckedChange: h => u("tableRows", h),
                    theme: "dark"
                }), s.jsx(We, {
                    label: "Images",
                    checked: a == null ? void 0 : a.images,
                    disabled: !e,
                    onCheckedChange: h => u("images", h),
                    theme: "dark"
                }), s.jsx(oe, {
                    className: "mt-2",
                    onClick: () => {
                        i(!0),
                        l(!0)
                    }
                    ,
                    variant: "ghost",
                    theme: "dark",
                    disabled: !e || c,
                    children: s.jsxs("div", {
                        className: "flex items-center justify-center",
                        children: [s.jsx(le, {
                            icon: Mc,
                            className: "mr-2 h-3 w-3 text-slate-500"
                        }), "Choose Others"]
                    })
                }), s.jsx("span", {
                    className: "block text-xs font-normal leading-4 text-slate-400",
                    children: "Elements you hover over will still be visible. Works on most sites."
                })]
            })]
        }), s.jsx($a, {
            icon: rr,
            message: "Select elements to blur",
            open: c && e,
            container: dr(),
            children: s.jsx(ro, {
                variant: "primary",
                onClick: () => {
                    J("enable_precision_blur"),
                    i(!1),
                    l(!1)
                }
                ,
                children: "Done"
            })
        }), c && e && s.jsx(Mm, {
            onClick: h => {
                J("add_precision_blur_target"),
                m(h, a)
            }
            ,
            onEscape: () => {
                i(!1),
                l(!1)
            }
        }), s.jsxs($a, {
            icon: rr,
            message: "Capture is paused during preview. Get Scribe Pro to use Smart Blur while capturing a guide.",
            side: "top",
            open: t && e,
            container: dr(),
            children: [s.jsx(ro, {
                onClick: () => {
                    r(!1)
                }
                ,
                children: "Done"
            }), s.jsx(ro, {
                variant: "primary",
                onClick: () => {
                    J("show_pro_features_workspace_page", {
                        location: "smart_blur_snackbar"
                    });
                    const h = wi({
                        location: "smart_blur_snackbar",
                        frontendUrl: $o.FRONTEND_URL,
                        variant: _i.FREE_TO_PRO
                    });
                    window.open(h, "_blank")
                }
                ,
                children: "Get Scribe Pro"
            })]
        })]
    })
}
  , Om = ({onPrecisionBlurEnabledChange: e}) => {
    const {liveBlurEnabled: t, liveBlurSettings: r} = X(Uo)
      , {userData: n} = X(zt);
    return s.jsx(Nm, {
        isPreviewing: vn(n),
        onPrecisionBlurEnabledChange: e,
        isEnabled: t,
        settings: r,
        onEnabledChange: i => {
            J(i ? "enable_smart_blur" : "disable_smart_blur", {
                isPreview: vn(n)
            }),
            chrome.runtime.sendMessage({
                messageType: "changeLiveBlurSettings",
                liveBlurEnabled: !!i,
                liveBlurSettings: r
            })
        }
        ,
        onSettingsChange: i => {
            chrome.runtime.sendMessage({
                messageType: "changeLiveBlurSettings",
                liveBlurEnabled: !0,
                liveBlurSettings: i || {}
            })
        }
    })
}
  , St = ({color: e="brand", disabled: t=!1, showTooltip: r=!0, icon: n, tooltip: i, showProTag: a=!1, onClick: c= () => {}
, setButtonRef: l=void 0, dataTestID: u=void 0}) => {
    const m = s.jsxs("button", {
        ref: l,
        type: "button",
        disabled: t,
        className: ht("relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent bg-slate-300/10 p-0 text-slate-100", {
            "hover:border-green-400 hover:bg-green-600/30": e === "green",
            "hover:border-brand-400 hover:bg-brand-600/30": e === "brand",
            "hover:border-red-400 hover:bg-red-600/30": e === "red"
        }),
        onClick: c,
        "data-testid": u,
        children: [a && s.jsx(ru, {
            type: "pro",
            theme: "dark",
            className: "absolute -right-1 -top-1"
        }), s.jsx("div", {
            className: "flex content-center justify-center",
            children: n
        })]
    });
    return r ? s.jsxs(de, {
        children: [s.jsx(pe, {
            children: m
        }), s.jsx(se, {
            className: "z-[99999999]",
            side: "right",
            collisionPadding: 16,
            children: i
        })]
    }) : m
}
  , Dm = ({status: e, isPlanFree: t, screenPositionMenuOpen: r=!1, blurControlsOpen: n=!1, isRecordingAudio: i=!1, onChangeScreenPosition: a=void 0, onPause: c=void 0, onDelete: l=void 0, onComplete: u=void 0, onLiveBlur: m=void 0, screenPositionMenuButtonSetReference: h=void 0}) => {
    const v = !t && i;
    return s.jsx(qe, {
        children: s.jsxs("div", {
            className: "flex w-fit flex-col gap-2 rounded-full border border-slate-600 bg-slate-800 p-2 shadow-2xl",
            children: [s.jsx(St, {
                icon: s.jsx(le, {
                    icon: Nc,
                    className: "h-4 w-4 text-green-400"
                }),
                color: "green",
                onClick: u,
                tooltip: "Complete Capture",
                dataTestID: "extensionCompleteRecordingButton"
            }), e === me.PAUSED_RECORDING ? s.jsx(St, {
                icon: s.jsx(le, {
                    className: "h-4 w-4",
                    style: {
                        transform: "rotate(90deg)",
                        paddingBottom: "2px"
                    },
                    icon: Oc
                }),
                onClick: c,
                tooltip: "Resume",
                dataTestID: "extensionResumeRecordingButton"
            }) : s.jsx(St, {
                icon: s.jsx(le, {
                    icon: Dc,
                    className: "h-4 w-4"
                }),
                onClick: c,
                tooltip: "Pause Capture",
                dataTestID: "extensionPauseRecordingButton"
            }), s.jsx(St, {
                showTooltip: !n,
                showProTag: t,
                icon: s.jsx(le, {
                    icon: rr,
                    className: "h-4 w-4"
                }),
                onClick: m,
                disabled: v,
                tooltip: s.jsx("span", {
                    className: "flex items-center justify-center gap-1",
                    children: v ? Ys : "Smart Blur"
                }),
                dataTestID: "extensionSmartBlurMenuButton"
            }), s.jsx(St, {
                showTooltip: !r,
                icon: s.jsx(le, {
                    icon: Ac,
                    className: "h-4 w-4"
                }),
                onClick: a,
                tooltip: "Move Controls",
                setButtonRef: h,
                dataTestID: "extensionScreenPositionMenuButton"
            }), s.jsx(St, {
                icon: s.jsx(le, {
                    icon: Lc,
                    className: "h-4 w-4"
                }),
                color: "red",
                onClick: l,
                tooltip: "Delete Scribe",
                dataTestID: "extensionDeleteCurrentScribeMenuButton"
            })]
        })
    })
}
  , Am = e => d.createElement("svg", {
    width: 22,
    height: 18,
    viewBox: "0 0 22 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...e
}, d.createElement("rect", {
    y: 10,
    width: 10,
    height: 8,
    rx: 2,
    fill: "#C7D2FE"
}), d.createElement("rect", {
    x: 12.5,
    y: .5,
    width: 9,
    height: 7,
    rx: 1.5,
    stroke: "#C7D2FE"
}), d.createElement("rect", {
    x: 12.5,
    y: 10.5,
    width: 9,
    height: 7,
    rx: 1.5,
    stroke: "#C7D2FE"
}), d.createElement("rect", {
    x: .5,
    y: .5,
    width: 9,
    height: 7,
    rx: 1.5,
    stroke: "#C7D2FE"
}))
  , Lm = e => d.createElement("svg", {
    width: 22,
    height: 18,
    viewBox: "0 0 22 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...e
}, d.createElement("rect", {
    y: 10,
    width: 10,
    height: 8,
    rx: 2,
    fill: "#818CF8"
}), d.createElement("rect", {
    x: 12.5,
    y: .5,
    width: 9,
    height: 7,
    rx: 1.5,
    stroke: "#818CF8"
}), d.createElement("rect", {
    x: 12.5,
    y: 10.5,
    width: 9,
    height: 7,
    rx: 1.5,
    stroke: "#818CF8"
}), d.createElement("rect", {
    x: .5,
    y: .5,
    width: 9,
    height: 7,
    rx: 1.5,
    stroke: "#818CF8"
}));
function Fm({position: e, brighten: t=!1}) {
    const r = e === xe.TOP_RIGHT || e === xe.BOTTOM_RIGHT
      , n = e === xe.TOP_LEFT || e === xe.TOP_RIGHT
      , i = t ? Am : Lm;
    return s.jsx(i, {
        style: {
            transform: `scaleX(${r ? -1 : 1}) scaleY(${n ? -1 : 1})`
        }
    })
}
const zm = ({position: e, onClick: t, dataTestID: r=void 0}) => {
    const [n,i] = d.useState(!1);
    return s.jsx("button", {
        className: "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent bg-slate-300/10 p-0 hover:border-brand-400 hover:border-brand-400 hover:bg-brand-600/30",
        onClick: t,
        onMouseEnter: () => {
            i(!0)
        }
        ,
        onMouseLeave: () => {
            i(!1)
        }
        ,
        "data-testid": r,
        children: s.jsx(Fm, {
            position: e,
            brighten: n
        })
    })
}
;
function Bm({buttonOnClickMaker: e}) {
    return s.jsx("div", {
        className: "flex w-fit gap-2 rounded-full border border-slate-600 bg-slate-800 p-2 shadow-2xl",
        children: Object.values(xe).filter(t => typeof t == "number").map(t => s.jsx(zm, {
            position: t,
            onClick: e ? e(t) : void 0,
            dataTestID: `extensionScreenPositionMenuButton-${xe[t]}`
        }, `screen-position-menu-button-${t}`))
    })
}
const Hm = e => {
    const t = r => `${r}px`;
    switch (e) {
    case xe.TOP_LEFT:
        return {
            indicator: {
                top: t(24),
                left: t(24)
            }
        };
    case xe.TOP_RIGHT:
        return {
            indicator: {
                top: t(24),
                right: t(24)
            }
        };
    case xe.BOTTOM_RIGHT:
        return {
            indicator: {
                bottom: t(24),
                right: t(24)
            }
        };
    case xe.BOTTOM_LEFT:
    default:
        return {
            indicator: {
                bottom: t(24),
                left: t(24)
            }
        }
    }
}
  , oo = () => {
    chrome.runtime.sendMessage({
        messageType: "closeStartingRecordingModal"
    })
}
  , $m = 2e3
  , Um = ({isPlanFree: e}) => {
    var U;
    const {status: t} = X(Vo)
      , r = X(qo)
      , {position: n, menuOpen: i, screenPositionMenuOpen: a, deleteScribeModalOpen: c} = X(Uo)
      , {startingRecordingModalVisible: l, endRecordingWithCutoffVisible: u} = X(Go)
      , {recordAudio: m} = X(hn)
      , {recordingControlsPreference: h} = X(hn)
      , v = !!((U = De(ce.getState())) != null && U.deprecateCaptureOptions)
      , [w,k] = d.useState(!1)
      , [b,g] = d.useState(null)
      , [_,I] = d.useState(null)
      , [M,D] = d.useState(!1)
      , [o,p] = d.useState(null)
      , [f,x] = d.useState(null)
      , E = d.useRef(null)
      , j = xa(b, _, {
        placement: ( () => n === xe.TOP_LEFT || n === xe.TOP_RIGHT ? "bottom" : "top")(),
        modifiers: [{
            name: "offset",
            options: {
                offset: [0, 8]
            }
        }, {
            name: "flip",
            options: {
                fallbackPlacements: []
            }
        }, {
            name: "preventOverflow",
            options: {
                mainAxis: !1,
                altAxis: !1,
                tether: !1
            }
        }, {
            name: "eventListeners",
            options: {
                scroll: !1,
                resize: !1
            }
        }]
    })
      , C = xa(_, o, {
        modifiers: [{
            name: "offset",
            options: {
                offset: [24, 8]
            }
        }, {
            name: "flip",
            options: {
                fallbackPlacements: []
            }
        }, {
            name: "preventOverflow",
            options: {
                mainAxis: !1,
                altAxis: !1,
                tether: !1
            }
        }, {
            name: "eventListeners",
            options: {
                scroll: !1,
                resize: !1
            }
        }]
    });
    d.useEffect( () => {
        if (!l)
            return;
        const V = setTimeout(oo, $m);
        return () => clearTimeout(V)
    }
    , [l]);
    const S = () => {
        J("recording_controls_button_press", {
            buttonName: i || l ? "indicatorClosed" : "indicatorOpened"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsIndicatorPressed"
        })
    }
      , T = () => {
        J("recording_controls_button_press", {
            buttonName: t === me.PAUSED_RECORDING ? "unpaused" : "paused"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsPausePressed"
        })
    }
      , P = () => {
        J("recording_controls_button_press", {
            buttonName: "delete"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsDeletePressed"
        })
    }
      , R = () => {
        J("recording_controls_button_press", {
            buttonName: "deleteConfirm"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsDeleteConfirmPressed"
        })
    }
      , N = () => {
        c && (J("recording_controls_button_press", {
            buttonName: "deleteCancel"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsDeleteCancelPressed"
        }))
    }
      , y = V => {
        k($ => {
            const W = V === "visible" || V === "toggle" && !$;
            return tu().then(K => {
                (W && K.status === me.RECORDING || !W && K.status === me.PAUSED_RECORDING) && (T == null || T())
            }
            ),
            W
        }
        )
    }
    ;
    d.useEffect( () => {
        const V = $ => {
            $.messageType === "toggleBlurControls" && y("toggle"),
            $.messageType === "hideBlurControls" && k(!1),
            $.messageType === "extensionStatusChange" && $.status === me.RECORDING && (D(!1),
            y("hide"))
        }
        ;
        return chrome.runtime.onMessage.addListener(V),
        () => {
            chrome.runtime.onMessage.removeListener(V)
        }
    }
    , []);
    const O = () => {
        J("recording_controls_button_press", {
            buttonName: "completedRecording"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingCompletedPressed"
        })
    }
      , A = () => {
        J("recording_controls_button_press", {
            buttonName: "screenPosition"
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsScreenPositionPressed"
        })
    }
      , L = V => () => {
        J("recording_controls_button_press", {
            buttonName: "screenPositionMenuButton",
            screenPosition: V
        }),
        chrome.runtime.sendMessage({
            messageType: "recordingControlsScreenPositionMenuButtonPressed",
            position: V
        })
    }
    ;
    if (u)
        return s.jsx(km, {});
    if (!r)
        return null;
    const z = ( () => {
        if (!v)
            return h;
        const V = typeof (chrome == null ? void 0 : chrome.sidePanel) < "u"
          , $ = Ks(Zs);
        return V && $ ? "sidepanel" : "floating-button"
    }
    )();
    if (z === "none")
        return s.jsx(Ba, {
            onClick: oo,
            modalRef: E,
            show: l
        });
    const F = z === "floating-button" && (i || l)
      , B = z === "floating-button";
    return s.jsxs(s.Fragment, {
        children: [c && s.jsx(_m, {
            onCancel: N,
            onDelete: R
        }), s.jsx(Ba, {
            onClick: oo,
            modalRef: E,
            show: l
        }), s.jsx("div", {
            className: ht("fixed h-screen w-screen", {
                "pointer-events-none": !i && !w && !a || M
            }),
            onClick: () => {
                (i || w && !M) && chrome.runtime.sendMessage({
                    messageType: "recordingControlsClickOutside"
                }),
                w && !M && y("hide"),
                a && chrome.runtime.sendMessage({
                    messageType: "recordingControlsScreenPositionMenuClickOutside"
                })
            }
            ,
            children: s.jsxs("div", {
                className: "pointer-events-auto absolute",
                style: Hm(n).indicator,
                onClick: V => V.stopPropagation(),
                children: [z === "floating-button" && s.jsx("div", {
                    ref: g,
                    children: s.jsx(Pm, {
                        status: t,
                        open: F,
                        onClick: S
                    })
                }), w && s.jsx("div", {
                    className: ht({
                        "fixed bottom-4 right-4": !B,
                        "absolute bottom-0 left-[72px]": B && n === xe.BOTTOM_LEFT,
                        "fixed bottom-4 left-4": B && n !== xe.BOTTOM_LEFT
                    }),
                    children: s.jsx(Om, {
                        onPrecisionBlurEnabledChange: V => D(V)
                    })
                }), s.jsx("div", {
                    ref: p,
                    style: C.styles.popper,
                    ...C.attributes.popper,
                    children: a && s.jsx(Bm, {
                        buttonOnClickMaker: L
                    })
                }), F && s.jsx("div", {
                    ref: I,
                    style: j.styles.popper,
                    ...j.attributes.popper,
                    children: s.jsx(Dm, {
                        isPlanFree: e,
                        status: t,
                        screenPositionMenuOpen: a,
                        blurControlsOpen: w,
                        onChangeScreenPosition: () => {
                            y("hide"),
                            A()
                        }
                        ,
                        isRecordingAudio: m,
                        onPause: T,
                        onDelete: P,
                        onComplete: O,
                        onLiveBlur: () => {
                            y("toggle"),
                            chrome.runtime.sendMessage({
                                messageType: "recordingControlsScreenPositionClosed"
                            })
                        }
                        ,
                        screenPositionMenuButtonReference: f,
                        screenPositionMenuButtonSetReference: x
                    })
                })]
            })
        })]
    })
}
  , Va = e => {
    try {
        const t = new URL(e);
        return t.search = "",
        t.toString()
    } catch {
        return ""
    }
}
  , io = (e, t) => {
    if (!e || !t)
        return !1;
    const r = Va(e)
      , n = Va(t)
      , i = l => {
        try {
            const u = new URL(l)
              , m = u.hostname.replace(/^www\./i, "")
              , h = u.port ? `:${u.port}` : "";
            return `${u.protocol}//${m}${h}`
        } catch {
            return l
        }
    }
      , a = i(r)
      , c = i(n);
    return a === c
}
  , ao = Qs("guideMe/setAutoPilotAction");
var qa = {}
  , so = {}
  , lo = {}
  , ut = {}
  , co = {}
  , uo = {};
(function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Doctype = e.CDATA = e.Tag = e.Style = e.Script = e.Comment = e.Directive = e.Text = e.Root = e.isTag = e.ElementType = void 0;
    var t;
    (function(n) {
        n.Root = "root",
        n.Text = "text",
        n.Directive = "directive",
        n.Comment = "comment",
        n.Script = "script",
        n.Style = "style",
        n.Tag = "tag",
        n.CDATA = "cdata",
        n.Doctype = "doctype"
    }
    )(t = e.ElementType || (e.ElementType = {}));
    function r(n) {
        return n.type === t.Tag || n.type === t.Script || n.type === t.Style
    }
    e.isTag = r,
    e.Root = t.Root,
    e.Text = t.Text,
    e.Directive = t.Directive,
    e.Comment = t.Comment,
    e.Script = t.Script,
    e.Style = t.Style,
    e.Tag = t.Tag,
    e.CDATA = t.CDATA,
    e.Doctype = t.Doctype
}
)(uo);
var Z = {}
  , Ke = ae && ae.__extends || function() {
    var e = function(t, r) {
        return e = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, i) {
            n.__proto__ = i
        }
        || function(n, i) {
            for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a])
        }
        ,
        e(t, r)
    };
    return function(t, r) {
        if (typeof r != "function" && r !== null)
            throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        e(t, r);
        function n() {
            this.constructor = t
        }
        t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype,
        new n)
    }
}()
  , sn = ae && ae.__assign || function() {
    return sn = Object.assign || function(e) {
        for (var t, r = 1, n = arguments.length; r < n; r++) {
            t = arguments[r];
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    }
    ,
    sn.apply(this, arguments)
}
;
Object.defineProperty(Z, "__esModule", {
    value: !0
}),
Z.cloneNode = Z.hasChildren = Z.isDocument = Z.isDirective = Z.isComment = Z.isText = Z.isCDATA = Z.isTag = Z.Element = Z.Document = Z.CDATA = Z.NodeWithChildren = Z.ProcessingInstruction = Z.Comment = Z.Text = Z.DataNode = Z.Node = void 0;
var _e = uo
  , po = function() {
    function e() {
        this.parent = null,
        this.prev = null,
        this.next = null,
        this.startIndex = null,
        this.endIndex = null
    }
    return Object.defineProperty(e.prototype, "parentNode", {
        get: function() {
            return this.parent
        },
        set: function(t) {
            this.parent = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(e.prototype, "previousSibling", {
        get: function() {
            return this.prev
        },
        set: function(t) {
            this.prev = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(e.prototype, "nextSibling", {
        get: function() {
            return this.next
        },
        set: function(t) {
            this.next = t
        },
        enumerable: !1,
        configurable: !0
    }),
    e.prototype.cloneNode = function(t) {
        return t === void 0 && (t = !1),
        fo(this, t)
    }
    ,
    e
}();
Z.Node = po;
var Fn = function(e) {
    Ke(t, e);
    function t(r) {
        var n = e.call(this) || this;
        return n.data = r,
        n
    }
    return Object.defineProperty(t.prototype, "nodeValue", {
        get: function() {
            return this.data
        },
        set: function(r) {
            this.data = r
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(po);
Z.DataNode = Fn;
var Ga = function(e) {
    Ke(t, e);
    function t() {
        var r = e !== null && e.apply(this, arguments) || this;
        return r.type = _e.ElementType.Text,
        r
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 3
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(Fn);
Z.Text = Ga;
var Wa = function(e) {
    Ke(t, e);
    function t() {
        var r = e !== null && e.apply(this, arguments) || this;
        return r.type = _e.ElementType.Comment,
        r
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 8
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(Fn);
Z.Comment = Wa;
var Xa = function(e) {
    Ke(t, e);
    function t(r, n) {
        var i = e.call(this, n) || this;
        return i.name = r,
        i.type = _e.ElementType.Directive,
        i
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 1
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(Fn);
Z.ProcessingInstruction = Xa;
var zn = function(e) {
    Ke(t, e);
    function t(r) {
        var n = e.call(this) || this;
        return n.children = r,
        n
    }
    return Object.defineProperty(t.prototype, "firstChild", {
        get: function() {
            var r;
            return (r = this.children[0]) !== null && r !== void 0 ? r : null
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "lastChild", {
        get: function() {
            return this.children.length > 0 ? this.children[this.children.length - 1] : null
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "childNodes", {
        get: function() {
            return this.children
        },
        set: function(r) {
            this.children = r
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(po);
Z.NodeWithChildren = zn;
var Ya = function(e) {
    Ke(t, e);
    function t() {
        var r = e !== null && e.apply(this, arguments) || this;
        return r.type = _e.ElementType.CDATA,
        r
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 4
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(zn);
Z.CDATA = Ya;
var Ka = function(e) {
    Ke(t, e);
    function t() {
        var r = e !== null && e.apply(this, arguments) || this;
        return r.type = _e.ElementType.Root,
        r
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 9
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(zn);
Z.Document = Ka;
var Za = function(e) {
    Ke(t, e);
    function t(r, n, i, a) {
        i === void 0 && (i = []),
        a === void 0 && (a = r === "script" ? _e.ElementType.Script : r === "style" ? _e.ElementType.Style : _e.ElementType.Tag);
        var c = e.call(this, i) || this;
        return c.name = r,
        c.attribs = n,
        c.type = a,
        c
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 1
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "tagName", {
        get: function() {
            return this.name
        },
        set: function(r) {
            this.name = r
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "attributes", {
        get: function() {
            var r = this;
            return Object.keys(this.attribs).map(function(n) {
                var i, a;
                return {
                    name: n,
                    value: r.attribs[n],
                    namespace: (i = r["x-attribsNamespace"]) === null || i === void 0 ? void 0 : i[n],
                    prefix: (a = r["x-attribsPrefix"]) === null || a === void 0 ? void 0 : a[n]
                }
            })
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(zn);
Z.Element = Za;
function Qa(e) {
    return (0,
    _e.isTag)(e)
}
Z.isTag = Qa;
function Ja(e) {
    return e.type === _e.ElementType.CDATA
}
Z.isCDATA = Ja;
function es(e) {
    return e.type === _e.ElementType.Text
}
Z.isText = es;
function ts(e) {
    return e.type === _e.ElementType.Comment
}
Z.isComment = ts;
function ns(e) {
    return e.type === _e.ElementType.Directive
}
Z.isDirective = ns;
function rs(e) {
    return e.type === _e.ElementType.Root
}
Z.isDocument = rs;
function Vm(e) {
    return Object.prototype.hasOwnProperty.call(e, "children")
}
Z.hasChildren = Vm;
function fo(e, t) {
    t === void 0 && (t = !1);
    var r;
    if (es(e))
        r = new Ga(e.data);
    else if (ts(e))
        r = new Wa(e.data);
    else if (Qa(e)) {
        var n = t ? mo(e.children) : []
          , i = new Za(e.name,sn({}, e.attribs),n);
        n.forEach(function(u) {
            return u.parent = i
        }),
        e.namespace != null && (i.namespace = e.namespace),
        e["x-attribsNamespace"] && (i["x-attribsNamespace"] = sn({}, e["x-attribsNamespace"])),
        e["x-attribsPrefix"] && (i["x-attribsPrefix"] = sn({}, e["x-attribsPrefix"])),
        r = i
    } else if (Ja(e)) {
        var n = t ? mo(e.children) : []
          , a = new Ya(n);
        n.forEach(function(m) {
            return m.parent = a
        }),
        r = a
    } else if (rs(e)) {
        var n = t ? mo(e.children) : []
          , c = new Ka(n);
        n.forEach(function(m) {
            return m.parent = c
        }),
        e["x-mode"] && (c["x-mode"] = e["x-mode"]),
        r = c
    } else if (ns(e)) {
        var l = new Xa(e.name,e.data);
        e["x-name"] != null && (l["x-name"] = e["x-name"],
        l["x-publicId"] = e["x-publicId"],
        l["x-systemId"] = e["x-systemId"]),
        r = l
    } else
        throw new Error("Not implemented yet: ".concat(e.type));
    return r.startIndex = e.startIndex,
    r.endIndex = e.endIndex,
    e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation),
    r
}
Z.cloneNode = fo;
function mo(e) {
    for (var t = e.map(function(n) {
        return fo(n, !0)
    }), r = 1; r < t.length; r++)
        t[r].prev = t[r - 1],
        t[r - 1].next = t[r];
    return t
}
(function(e) {
    var t = ae && ae.__createBinding || (Object.create ? function(l, u, m, h) {
        h === void 0 && (h = m);
        var v = Object.getOwnPropertyDescriptor(u, m);
        (!v || ("get"in v ? !u.__esModule : v.writable || v.configurable)) && (v = {
            enumerable: !0,
            get: function() {
                return u[m]
            }
        }),
        Object.defineProperty(l, h, v)
    }
    : function(l, u, m, h) {
        h === void 0 && (h = m),
        l[h] = u[m]
    }
    )
      , r = ae && ae.__exportStar || function(l, u) {
        for (var m in l)
            m !== "default" && !Object.prototype.hasOwnProperty.call(u, m) && t(u, l, m)
    }
    ;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.DomHandler = void 0;
    var n = uo
      , i = Z;
    r(Z, e);
    var a = {
        withStartIndices: !1,
        withEndIndices: !1,
        xmlMode: !1
    }
      , c = function() {
        function l(u, m, h) {
            this.dom = [],
            this.root = new i.Document(this.dom),
            this.done = !1,
            this.tagStack = [this.root],
            this.lastNode = null,
            this.parser = null,
            typeof m == "function" && (h = m,
            m = a),
            typeof u == "object" && (m = u,
            u = void 0),
            this.callback = u ?? null,
            this.options = m ?? a,
            this.elementCB = h ?? null
        }
        return l.prototype.onparserinit = function(u) {
            this.parser = u
        }
        ,
        l.prototype.onreset = function() {
            this.dom = [],
            this.root = new i.Document(this.dom),
            this.done = !1,
            this.tagStack = [this.root],
            this.lastNode = null,
            this.parser = null
        }
        ,
        l.prototype.onend = function() {
            this.done || (this.done = !0,
            this.parser = null,
            this.handleCallback(null))
        }
        ,
        l.prototype.onerror = function(u) {
            this.handleCallback(u)
        }
        ,
        l.prototype.onclosetag = function() {
            this.lastNode = null;
            var u = this.tagStack.pop();
            this.options.withEndIndices && (u.endIndex = this.parser.endIndex),
            this.elementCB && this.elementCB(u)
        }
        ,
        l.prototype.onopentag = function(u, m) {
            var h = this.options.xmlMode ? n.ElementType.Tag : void 0
              , v = new i.Element(u,m,void 0,h);
            this.addNode(v),
            this.tagStack.push(v)
        }
        ,
        l.prototype.ontext = function(u) {
            var m = this.lastNode;
            if (m && m.type === n.ElementType.Text)
                m.data += u,
                this.options.withEndIndices && (m.endIndex = this.parser.endIndex);
            else {
                var h = new i.Text(u);
                this.addNode(h),
                this.lastNode = h
            }
        }
        ,
        l.prototype.oncomment = function(u) {
            if (this.lastNode && this.lastNode.type === n.ElementType.Comment) {
                this.lastNode.data += u;
                return
            }
            var m = new i.Comment(u);
            this.addNode(m),
            this.lastNode = m
        }
        ,
        l.prototype.oncommentend = function() {
            this.lastNode = null
        }
        ,
        l.prototype.oncdatastart = function() {
            var u = new i.Text("")
              , m = new i.CDATA([u]);
            this.addNode(m),
            u.parent = m,
            this.lastNode = u
        }
        ,
        l.prototype.oncdataend = function() {
            this.lastNode = null
        }
        ,
        l.prototype.onprocessinginstruction = function(u, m) {
            var h = new i.ProcessingInstruction(u,m);
            this.addNode(h)
        }
        ,
        l.prototype.handleCallback = function(u) {
            if (typeof this.callback == "function")
                this.callback(u, this.dom);
            else if (u)
                throw u
        }
        ,
        l.prototype.addNode = function(u) {
            var m = this.tagStack[this.tagStack.length - 1]
              , h = m.children[m.children.length - 1];
            this.options.withStartIndices && (u.startIndex = this.parser.startIndex),
            this.options.withEndIndices && (u.endIndex = this.parser.endIndex),
            m.children.push(u),
            h && (u.prev = h,
            h.next = u),
            u.parent = m,
            this.lastNode = null
        }
        ,
        l
    }();
    e.DomHandler = c,
    e.default = c
}
)(co);
var os = {};
(function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.CARRIAGE_RETURN_PLACEHOLDER_REGEX = e.CARRIAGE_RETURN_PLACEHOLDER = e.CARRIAGE_RETURN_REGEX = e.CARRIAGE_RETURN = e.CASE_SENSITIVE_TAG_NAMES_MAP = e.CASE_SENSITIVE_TAG_NAMES = void 0,
    e.CASE_SENSITIVE_TAG_NAMES = ["animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"],
    e.CASE_SENSITIVE_TAG_NAMES_MAP = e.CASE_SENSITIVE_TAG_NAMES.reduce(function(t, r) {
        return t[r.toLowerCase()] = r,
        t
    }, {}),
    e.CARRIAGE_RETURN = "\r",
    e.CARRIAGE_RETURN_REGEX = new RegExp(e.CARRIAGE_RETURN,"g"),
    e.CARRIAGE_RETURN_PLACEHOLDER = "__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_".concat(Date.now(), "__"),
    e.CARRIAGE_RETURN_PLACEHOLDER_REGEX = new RegExp(e.CARRIAGE_RETURN_PLACEHOLDER,"g")
}
)(os),
Object.defineProperty(ut, "__esModule", {
    value: !0
}),
ut.formatAttributes = is,
ut.escapeSpecialCharacters = Wm,
ut.revertEscapedCharacters = as,
ut.formatDOM = ss;
var Bn = co
  , ln = os;
function qm(e) {
    return ln.CASE_SENSITIVE_TAG_NAMES_MAP[e]
}
function is(e) {
    for (var t = {}, r = 0, n = e.length; r < n; r++) {
        var i = e[r];
        t[i.name] = i.value
    }
    return t
}
function Gm(e) {
    e = e.toLowerCase();
    var t = qm(e);
    return t || e
}
function Wm(e) {
    return e.replace(ln.CARRIAGE_RETURN_REGEX, ln.CARRIAGE_RETURN_PLACEHOLDER)
}
function as(e) {
    return e.replace(ln.CARRIAGE_RETURN_PLACEHOLDER_REGEX, ln.CARRIAGE_RETURN)
}
function ss(e, t, r) {
    t === void 0 && (t = null);
    for (var n = [], i, a = 0, c = e.length; a < c; a++) {
        var l = e[a];
        switch (l.nodeType) {
        case 1:
            {
                var u = Gm(l.nodeName);
                i = new Bn.Element(u,is(l.attributes)),
                i.children = ss(u === "template" ? l.content.childNodes : l.childNodes, i);
                break
            }
        case 3:
            i = new Bn.Text(as(l.nodeValue));
            break;
        case 8:
            i = new Bn.Comment(l.nodeValue);
            break;
        default:
            continue
        }
        var m = n[a - 1] || null;
        m && (m.next = i),
        i.parent = t,
        i.prev = m,
        i.next = null,
        n.push(i)
    }
    return r && (i = new Bn.ProcessingInstruction(r.substring(0, r.indexOf(" ")).toLowerCase(),r),
    i.next = n[0] || null,
    i.parent = t,
    n.unshift(i),
    n[1] && (n[1].prev = n[0])),
    n
}
Object.defineProperty(lo, "__esModule", {
    value: !0
}),
lo.default = Qm;
var Xm = ut
  , ls = "html"
  , cs = "head"
  , Hn = "body"
  , Ym = /<([a-zA-Z]+[0-9]?)/
  , us = /<head[^]*>/i
  , ds = /<body[^]*>/i
  , $n = function(e, t) {
    throw new Error("This browser does not support `document.implementation.createHTMLDocument`")
}
  , ho = function(e, t) {
    throw new Error("This browser does not support `DOMParser.prototype.parseFromString`")
}
  , ps = typeof window == "object" && window.DOMParser;
if (typeof ps == "function") {
    var Km = new ps
      , Zm = "text/html";
    ho = function(e, t) {
        return t && (e = "<".concat(t, ">").concat(e, "</").concat(t, ">")),
        Km.parseFromString(e, Zm)
    }
    ,
    $n = ho
}
if (typeof document == "object" && document.implementation) {
    var Un = document.implementation.createHTMLDocument();
    $n = function(e, t) {
        if (t) {
            var r = Un.documentElement.querySelector(t);
            return r && (r.innerHTML = e),
            Un
        }
        return Un.documentElement.innerHTML = e,
        Un
    }
}
var Vn = typeof document == "object" && document.createElement("template"), go;
Vn && Vn.content && (go = function(e) {
    return Vn.innerHTML = e,
    Vn.content.childNodes
}
);
function Qm(e) {
    var t, r;
    e = (0,
    Xm.escapeSpecialCharacters)(e);
    var n = e.match(Ym)
      , i = n && n[1] ? n[1].toLowerCase() : "";
    switch (i) {
    case ls:
        {
            var a = ho(e);
            if (!us.test(e)) {
                var c = a.querySelector(cs);
                (t = c == null ? void 0 : c.parentNode) === null || t === void 0 || t.removeChild(c)
            }
            if (!ds.test(e)) {
                var c = a.querySelector(Hn);
                (r = c == null ? void 0 : c.parentNode) === null || r === void 0 || r.removeChild(c)
            }
            return a.querySelectorAll(ls)
        }
    case cs:
    case Hn:
        {
            var l = $n(e).querySelectorAll(i);
            return ds.test(e) && us.test(e) ? l[0].parentNode.childNodes : l
        }
    default:
        {
            if (go)
                return go(e);
            var c = $n(e, Hn).querySelector(Hn);
            return c.childNodes
        }
    }
}
var Jm = ae && ae.__importDefault || function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
;
Object.defineProperty(so, "__esModule", {
    value: !0
}),
so.default = rh;
var eh = Jm(lo)
  , th = ut
  , nh = /<(![a-zA-Z\s]+)>/;
function rh(e) {
    if (typeof e != "string")
        throw new TypeError("First argument must be a string");
    if (!e)
        return [];
    var t = e.match(nh)
      , r = t ? t[1] : void 0;
    return (0,
    th.formatDOM)((0,
    eh.default)(e), null, r)
}
var qn = {}
  , Ne = {}
  , Gn = {}
  , oh = 0;
Gn.SAME = oh;
var ih = 1;
Gn.CAMELCASE = ih,
Gn.possibleStandardNames = {
    accept: 0,
    acceptCharset: 1,
    "accept-charset": "acceptCharset",
    accessKey: 1,
    action: 0,
    allowFullScreen: 1,
    alt: 0,
    as: 0,
    async: 0,
    autoCapitalize: 1,
    autoComplete: 1,
    autoCorrect: 1,
    autoFocus: 1,
    autoPlay: 1,
    autoSave: 1,
    capture: 0,
    cellPadding: 1,
    cellSpacing: 1,
    challenge: 0,
    charSet: 1,
    checked: 0,
    children: 0,
    cite: 0,
    class: "className",
    classID: 1,
    className: 1,
    cols: 0,
    colSpan: 1,
    content: 0,
    contentEditable: 1,
    contextMenu: 1,
    controls: 0,
    controlsList: 1,
    coords: 0,
    crossOrigin: 1,
    dangerouslySetInnerHTML: 1,
    data: 0,
    dateTime: 1,
    default: 0,
    defaultChecked: 1,
    defaultValue: 1,
    defer: 0,
    dir: 0,
    disabled: 0,
    disablePictureInPicture: 1,
    disableRemotePlayback: 1,
    download: 0,
    draggable: 0,
    encType: 1,
    enterKeyHint: 1,
    for: "htmlFor",
    form: 0,
    formMethod: 1,
    formAction: 1,
    formEncType: 1,
    formNoValidate: 1,
    formTarget: 1,
    frameBorder: 1,
    headers: 0,
    height: 0,
    hidden: 0,
    high: 0,
    href: 0,
    hrefLang: 1,
    htmlFor: 1,
    httpEquiv: 1,
    "http-equiv": "httpEquiv",
    icon: 0,
    id: 0,
    innerHTML: 1,
    inputMode: 1,
    integrity: 0,
    is: 0,
    itemID: 1,
    itemProp: 1,
    itemRef: 1,
    itemScope: 1,
    itemType: 1,
    keyParams: 1,
    keyType: 1,
    kind: 0,
    label: 0,
    lang: 0,
    list: 0,
    loop: 0,
    low: 0,
    manifest: 0,
    marginWidth: 1,
    marginHeight: 1,
    max: 0,
    maxLength: 1,
    media: 0,
    mediaGroup: 1,
    method: 0,
    min: 0,
    minLength: 1,
    multiple: 0,
    muted: 0,
    name: 0,
    noModule: 1,
    nonce: 0,
    noValidate: 1,
    open: 0,
    optimum: 0,
    pattern: 0,
    placeholder: 0,
    playsInline: 1,
    poster: 0,
    preload: 0,
    profile: 0,
    radioGroup: 1,
    readOnly: 1,
    referrerPolicy: 1,
    rel: 0,
    required: 0,
    reversed: 0,
    role: 0,
    rows: 0,
    rowSpan: 1,
    sandbox: 0,
    scope: 0,
    scoped: 0,
    scrolling: 0,
    seamless: 0,
    selected: 0,
    shape: 0,
    size: 0,
    sizes: 0,
    span: 0,
    spellCheck: 1,
    src: 0,
    srcDoc: 1,
    srcLang: 1,
    srcSet: 1,
    start: 0,
    step: 0,
    style: 0,
    summary: 0,
    tabIndex: 1,
    target: 0,
    title: 0,
    type: 0,
    useMap: 1,
    value: 0,
    width: 0,
    wmode: 0,
    wrap: 0,
    about: 0,
    accentHeight: 1,
    "accent-height": "accentHeight",
    accumulate: 0,
    additive: 0,
    alignmentBaseline: 1,
    "alignment-baseline": "alignmentBaseline",
    allowReorder: 1,
    alphabetic: 0,
    amplitude: 0,
    arabicForm: 1,
    "arabic-form": "arabicForm",
    ascent: 0,
    attributeName: 1,
    attributeType: 1,
    autoReverse: 1,
    azimuth: 0,
    baseFrequency: 1,
    baselineShift: 1,
    "baseline-shift": "baselineShift",
    baseProfile: 1,
    bbox: 0,
    begin: 0,
    bias: 0,
    by: 0,
    calcMode: 1,
    capHeight: 1,
    "cap-height": "capHeight",
    clip: 0,
    clipPath: 1,
    "clip-path": "clipPath",
    clipPathUnits: 1,
    clipRule: 1,
    "clip-rule": "clipRule",
    color: 0,
    colorInterpolation: 1,
    "color-interpolation": "colorInterpolation",
    colorInterpolationFilters: 1,
    "color-interpolation-filters": "colorInterpolationFilters",
    colorProfile: 1,
    "color-profile": "colorProfile",
    colorRendering: 1,
    "color-rendering": "colorRendering",
    contentScriptType: 1,
    contentStyleType: 1,
    cursor: 0,
    cx: 0,
    cy: 0,
    d: 0,
    datatype: 0,
    decelerate: 0,
    descent: 0,
    diffuseConstant: 1,
    direction: 0,
    display: 0,
    divisor: 0,
    dominantBaseline: 1,
    "dominant-baseline": "dominantBaseline",
    dur: 0,
    dx: 0,
    dy: 0,
    edgeMode: 1,
    elevation: 0,
    enableBackground: 1,
    "enable-background": "enableBackground",
    end: 0,
    exponent: 0,
    externalResourcesRequired: 1,
    fill: 0,
    fillOpacity: 1,
    "fill-opacity": "fillOpacity",
    fillRule: 1,
    "fill-rule": "fillRule",
    filter: 0,
    filterRes: 1,
    filterUnits: 1,
    floodOpacity: 1,
    "flood-opacity": "floodOpacity",
    floodColor: 1,
    "flood-color": "floodColor",
    focusable: 0,
    fontFamily: 1,
    "font-family": "fontFamily",
    fontSize: 1,
    "font-size": "fontSize",
    fontSizeAdjust: 1,
    "font-size-adjust": "fontSizeAdjust",
    fontStretch: 1,
    "font-stretch": "fontStretch",
    fontStyle: 1,
    "font-style": "fontStyle",
    fontVariant: 1,
    "font-variant": "fontVariant",
    fontWeight: 1,
    "font-weight": "fontWeight",
    format: 0,
    from: 0,
    fx: 0,
    fy: 0,
    g1: 0,
    g2: 0,
    glyphName: 1,
    "glyph-name": "glyphName",
    glyphOrientationHorizontal: 1,
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    glyphOrientationVertical: 1,
    "glyph-orientation-vertical": "glyphOrientationVertical",
    glyphRef: 1,
    gradientTransform: 1,
    gradientUnits: 1,
    hanging: 0,
    horizAdvX: 1,
    "horiz-adv-x": "horizAdvX",
    horizOriginX: 1,
    "horiz-origin-x": "horizOriginX",
    ideographic: 0,
    imageRendering: 1,
    "image-rendering": "imageRendering",
    in2: 0,
    in: 0,
    inlist: 0,
    intercept: 0,
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
    k: 0,
    kernelMatrix: 1,
    kernelUnitLength: 1,
    kerning: 0,
    keyPoints: 1,
    keySplines: 1,
    keyTimes: 1,
    lengthAdjust: 1,
    letterSpacing: 1,
    "letter-spacing": "letterSpacing",
    lightingColor: 1,
    "lighting-color": "lightingColor",
    limitingConeAngle: 1,
    local: 0,
    markerEnd: 1,
    "marker-end": "markerEnd",
    markerHeight: 1,
    markerMid: 1,
    "marker-mid": "markerMid",
    markerStart: 1,
    "marker-start": "markerStart",
    markerUnits: 1,
    markerWidth: 1,
    mask: 0,
    maskContentUnits: 1,
    maskUnits: 1,
    mathematical: 0,
    mode: 0,
    numOctaves: 1,
    offset: 0,
    opacity: 0,
    operator: 0,
    order: 0,
    orient: 0,
    orientation: 0,
    origin: 0,
    overflow: 0,
    overlinePosition: 1,
    "overline-position": "overlinePosition",
    overlineThickness: 1,
    "overline-thickness": "overlineThickness",
    paintOrder: 1,
    "paint-order": "paintOrder",
    panose1: 0,
    "panose-1": "panose1",
    pathLength: 1,
    patternContentUnits: 1,
    patternTransform: 1,
    patternUnits: 1,
    pointerEvents: 1,
    "pointer-events": "pointerEvents",
    points: 0,
    pointsAtX: 1,
    pointsAtY: 1,
    pointsAtZ: 1,
    prefix: 0,
    preserveAlpha: 1,
    preserveAspectRatio: 1,
    primitiveUnits: 1,
    property: 0,
    r: 0,
    radius: 0,
    refX: 1,
    refY: 1,
    renderingIntent: 1,
    "rendering-intent": "renderingIntent",
    repeatCount: 1,
    repeatDur: 1,
    requiredExtensions: 1,
    requiredFeatures: 1,
    resource: 0,
    restart: 0,
    result: 0,
    results: 0,
    rotate: 0,
    rx: 0,
    ry: 0,
    scale: 0,
    security: 0,
    seed: 0,
    shapeRendering: 1,
    "shape-rendering": "shapeRendering",
    slope: 0,
    spacing: 0,
    specularConstant: 1,
    specularExponent: 1,
    speed: 0,
    spreadMethod: 1,
    startOffset: 1,
    stdDeviation: 1,
    stemh: 0,
    stemv: 0,
    stitchTiles: 1,
    stopColor: 1,
    "stop-color": "stopColor",
    stopOpacity: 1,
    "stop-opacity": "stopOpacity",
    strikethroughPosition: 1,
    "strikethrough-position": "strikethroughPosition",
    strikethroughThickness: 1,
    "strikethrough-thickness": "strikethroughThickness",
    string: 0,
    stroke: 0,
    strokeDasharray: 1,
    "stroke-dasharray": "strokeDasharray",
    strokeDashoffset: 1,
    "stroke-dashoffset": "strokeDashoffset",
    strokeLinecap: 1,
    "stroke-linecap": "strokeLinecap",
    strokeLinejoin: 1,
    "stroke-linejoin": "strokeLinejoin",
    strokeMiterlimit: 1,
    "stroke-miterlimit": "strokeMiterlimit",
    strokeWidth: 1,
    "stroke-width": "strokeWidth",
    strokeOpacity: 1,
    "stroke-opacity": "strokeOpacity",
    suppressContentEditableWarning: 1,
    suppressHydrationWarning: 1,
    surfaceScale: 1,
    systemLanguage: 1,
    tableValues: 1,
    targetX: 1,
    targetY: 1,
    textAnchor: 1,
    "text-anchor": "textAnchor",
    textDecoration: 1,
    "text-decoration": "textDecoration",
    textLength: 1,
    textRendering: 1,
    "text-rendering": "textRendering",
    to: 0,
    transform: 0,
    typeof: 0,
    u1: 0,
    u2: 0,
    underlinePosition: 1,
    "underline-position": "underlinePosition",
    underlineThickness: 1,
    "underline-thickness": "underlineThickness",
    unicode: 0,
    unicodeBidi: 1,
    "unicode-bidi": "unicodeBidi",
    unicodeRange: 1,
    "unicode-range": "unicodeRange",
    unitsPerEm: 1,
    "units-per-em": "unitsPerEm",
    unselectable: 0,
    vAlphabetic: 1,
    "v-alphabetic": "vAlphabetic",
    values: 0,
    vectorEffect: 1,
    "vector-effect": "vectorEffect",
    version: 0,
    vertAdvY: 1,
    "vert-adv-y": "vertAdvY",
    vertOriginX: 1,
    "vert-origin-x": "vertOriginX",
    vertOriginY: 1,
    "vert-origin-y": "vertOriginY",
    vHanging: 1,
    "v-hanging": "vHanging",
    vIdeographic: 1,
    "v-ideographic": "vIdeographic",
    viewBox: 1,
    viewTarget: 1,
    visibility: 0,
    vMathematical: 1,
    "v-mathematical": "vMathematical",
    vocab: 0,
    widths: 0,
    wordSpacing: 1,
    "word-spacing": "wordSpacing",
    writingMode: 1,
    "writing-mode": "writingMode",
    x1: 0,
    x2: 0,
    x: 0,
    xChannelSelector: 1,
    xHeight: 1,
    "x-height": "xHeight",
    xlinkActuate: 1,
    "xlink:actuate": "xlinkActuate",
    xlinkArcrole: 1,
    "xlink:arcrole": "xlinkArcrole",
    xlinkHref: 1,
    "xlink:href": "xlinkHref",
    xlinkRole: 1,
    "xlink:role": "xlinkRole",
    xlinkShow: 1,
    "xlink:show": "xlinkShow",
    xlinkTitle: 1,
    "xlink:title": "xlinkTitle",
    xlinkType: 1,
    "xlink:type": "xlinkType",
    xmlBase: 1,
    "xml:base": "xmlBase",
    xmlLang: 1,
    "xml:lang": "xmlLang",
    xmlns: 0,
    "xml:space": "xmlSpace",
    xmlnsXlink: 1,
    "xmlns:xlink": "xmlnsXlink",
    xmlSpace: 1,
    y1: 0,
    y2: 0,
    y: 0,
    yChannelSelector: 1,
    z: 0,
    zoomAndPan: 1
};
const fs = 0
  , Ze = 1
  , Wn = 2
  , Xn = 3
  , bo = 4
  , ms = 5
  , hs = 6;
function ah(e) {
    return fe.hasOwnProperty(e) ? fe[e] : null
}
function be(e, t, r, n, i, a, c) {
    this.acceptsBooleans = t === Wn || t === Xn || t === bo,
    this.attributeName = n,
    this.attributeNamespace = i,
    this.mustUseProperty = r,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = a,
    this.removeEmptyString = c
}
const fe = {}
  , sh = ["children", "dangerouslySetInnerHTML", "defaultValue", "defaultChecked", "innerHTML", "suppressContentEditableWarning", "suppressHydrationWarning", "style"];
sh.forEach(e => {
    fe[e] = new be(e,fs,!1,e,null,!1,!1)
}
),
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach( ([e,t]) => {
    fe[e] = new be(e,Ze,!1,t,null,!1,!1)
}
),
["contentEditable", "draggable", "spellCheck", "value"].forEach(e => {
    fe[e] = new be(e,Wn,!1,e.toLowerCase(),null,!1,!1)
}
),
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(e => {
    fe[e] = new be(e,Wn,!1,e,null,!1,!1)
}
),
["allowFullScreen", "async", "autoFocus", "autoPlay", "controls", "default", "defer", "disabled", "disablePictureInPicture", "disableRemotePlayback", "formNoValidate", "hidden", "loop", "noModule", "noValidate", "open", "playsInline", "readOnly", "required", "reversed", "scoped", "seamless", "itemScope"].forEach(e => {
    fe[e] = new be(e,Xn,!1,e.toLowerCase(),null,!1,!1)
}
),
["checked", "multiple", "muted", "selected"].forEach(e => {
    fe[e] = new be(e,Xn,!0,e,null,!1,!1)
}
),
["capture", "download"].forEach(e => {
    fe[e] = new be(e,bo,!1,e,null,!1,!1)
}
),
["cols", "rows", "size", "span"].forEach(e => {
    fe[e] = new be(e,hs,!1,e,null,!1,!1)
}
),
["rowSpan", "start"].forEach(e => {
    fe[e] = new be(e,ms,!1,e.toLowerCase(),null,!1,!1)
}
);
const vo = /[\-\:]([a-z])/g
  , xo = e => e[1].toUpperCase();
["accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height"].forEach(e => {
    const t = e.replace(vo, xo);
    fe[t] = new be(t,Ze,!1,e,null,!1,!1)
}
),
["xlink:actuate", "xlink:arcrole", "xlink:role", "xlink:show", "xlink:title", "xlink:type"].forEach(e => {
    const t = e.replace(vo, xo);
    fe[t] = new be(t,Ze,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
}
),
["xml:base", "xml:lang", "xml:space"].forEach(e => {
    const t = e.replace(vo, xo);
    fe[t] = new be(t,Ze,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
}
),
["tabIndex", "crossOrigin"].forEach(e => {
    fe[e] = new be(e,Ze,!1,e.toLowerCase(),null,!1,!1)
}
);
const lh = "xlinkHref";
fe[lh] = new be("xlinkHref",Ze,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),
["src", "href", "action", "formAction"].forEach(e => {
    fe[e] = new be(e,Ze,!1,e.toLowerCase(),null,!0,!0)
}
);
const {CAMELCASE: ch, SAME: uh, possibleStandardNames: gs} = Gn
  , dh = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD"
  , ph = dh + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040"
  , fh = RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + ph + "]*$"))
  , mh = Object.keys(gs).reduce( (e, t) => {
    const r = gs[t];
    return r === uh ? e[t] = t : r === ch ? e[t.toLowerCase()] = t : e[t] = r,
    e
}
, {});
Ne.BOOLEAN = Xn,
Ne.BOOLEANISH_STRING = Wn,
Ne.NUMERIC = ms,
Ne.OVERLOADED_BOOLEAN = bo,
Ne.POSITIVE_NUMERIC = hs,
Ne.RESERVED = fs,
Ne.STRING = Ze,
Ne.getPropertyInfo = ah,
Ne.isCustomAttribute = fh,
Ne.possibleStandardNames = mh;
var yo = {}
  , wo = {}
  , bs = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g
  , hh = /\n/g
  , gh = /^\s*/
  , bh = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/
  , vh = /^:\s*/
  , xh = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/
  , yh = /^[;\s]*/
  , wh = /^\s+|\s+$/g
  , _h = `
`
  , vs = "/"
  , xs = "*"
  , dt = ""
  , kh = "comment"
  , Eh = "declaration"
  , Ch = function(e, t) {
    if (typeof e != "string")
        throw new TypeError("First argument must be a string");
    if (!e)
        return [];
    t = t || {};
    var r = 1
      , n = 1;
    function i(b) {
        var g = b.match(hh);
        g && (r += g.length);
        var _ = b.lastIndexOf(_h);
        n = ~_ ? b.length - _ : n + b.length
    }
    function a() {
        var b = {
            line: r,
            column: n
        };
        return function(g) {
            return g.position = new c(b),
            m(),
            g
        }
    }
    function c(b) {
        this.start = b,
        this.end = {
            line: r,
            column: n
        },
        this.source = t.source
    }
    c.prototype.content = e;
    function l(b) {
        var g = new Error(t.source + ":" + r + ":" + n + ": " + b);
        if (g.reason = b,
        g.filename = t.source,
        g.line = r,
        g.column = n,
        g.source = e,
        !t.silent)
            throw g
    }
    function u(b) {
        var g = b.exec(e);
        if (g) {
            var _ = g[0];
            return i(_),
            e = e.slice(_.length),
            g
        }
    }
    function m() {
        u(gh)
    }
    function h(b) {
        var g;
        for (b = b || []; g = v(); )
            g !== !1 && b.push(g);
        return b
    }
    function v() {
        var b = a();
        if (!(vs != e.charAt(0) || xs != e.charAt(1))) {
            for (var g = 2; dt != e.charAt(g) && (xs != e.charAt(g) || vs != e.charAt(g + 1)); )
                ++g;
            if (g += 2,
            dt === e.charAt(g - 1))
                return l("End of comment missing");
            var _ = e.slice(2, g - 2);
            return n += 2,
            i(_),
            e = e.slice(g),
            n += 2,
            b({
                type: kh,
                comment: _
            })
        }
    }
    function w() {
        var b = a()
          , g = u(bh);
        if (g) {
            if (v(),
            !u(vh))
                return l("property missing ':'");
            var _ = u(xh)
              , I = b({
                type: Eh,
                property: ys(g[0].replace(bs, dt)),
                value: _ ? ys(_[0].replace(bs, dt)) : dt
            });
            return u(yh),
            I
        }
    }
    function k() {
        var b = [];
        h(b);
        for (var g; g = w(); )
            g !== !1 && (b.push(g),
            h(b));
        return b
    }
    return m(),
    k()
};
function ys(e) {
    return e ? e.replace(wh, dt) : dt
}
var jh = ae && ae.__importDefault || function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
;
Object.defineProperty(wo, "__esModule", {
    value: !0
}),
wo.default = Th;
var Sh = jh(Ch);
function Th(e, t) {
    var r = null;
    if (!e || typeof e != "string")
        return r;
    var n = (0,
    Sh.default)(e)
      , i = typeof t == "function";
    return n.forEach(function(a) {
        if (a.type === "declaration") {
            var c = a.property
              , l = a.value;
            i ? t(c, l, a) : l && (r = r || {},
            r[c] = l)
        }
    }),
    r
}
var Yn = {};
Object.defineProperty(Yn, "__esModule", {
    value: !0
}),
Yn.camelCase = void 0;
var Ph = /^--[a-zA-Z0-9_-]+$/
  , Ih = /-([a-z])/g
  , Rh = /^[^-]+$/
  , Mh = /^-(webkit|moz|ms|o|khtml)-/
  , Nh = /^-(ms)-/
  , Oh = function(e) {
    return !e || Rh.test(e) || Ph.test(e)
}
  , Dh = function(e, t) {
    return t.toUpperCase()
}
  , ws = function(e, t) {
    return "".concat(t, "-")
}
  , Ah = function(e, t) {
    return t === void 0 && (t = {}),
    Oh(e) ? e : (e = e.toLowerCase(),
    t.reactCompat ? e = e.replace(Nh, ws) : e = e.replace(Mh, ws),
    e.replace(Ih, Dh))
};
Yn.camelCase = Ah;
var Lh = ae && ae.__importDefault || function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
  , Fh = Lh(wo)
  , zh = Yn;
function _o(e, t) {
    var r = {};
    return !e || typeof e != "string" || (0,
    Fh.default)(e, function(n, i) {
        n && i && (r[(0,
        zh.camelCase)(n, t)] = i)
    }),
    r
}
_o.default = _o;
var Bh = _o;
(function(e) {
    var t = ae && ae.__importDefault || function(h) {
        return h && h.__esModule ? h : {
            default: h
        }
    }
    ;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.returnFirstArg = e.canTextBeChildOfNode = e.ELEMENTS_WITH_NO_TEXT_CHILDREN = e.PRESERVE_CUSTOM_ATTRIBUTES = void 0,
    e.isCustomComponent = a,
    e.setStyleProp = l;
    var r = d
      , n = t(Bh)
      , i = new Set(["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"]);
    function a(h, v) {
        return h.includes("-") ? !i.has(h) : !!(v && typeof v.is == "string")
    }
    var c = {
        reactCompat: !0
    };
    function l(h, v) {
        if (typeof h == "string") {
            if (!h.trim()) {
                v.style = {};
                return
            }
            try {
                v.style = (0,
                n.default)(h, c)
            } catch {
                v.style = {}
            }
        }
    }
    e.PRESERVE_CUSTOM_ATTRIBUTES = Number(r.version.split(".")[0]) >= 16,
    e.ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set(["tr", "tbody", "thead", "tfoot", "colgroup", "table", "head", "html", "frameset"]);
    var u = function(h) {
        return !e.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(h.name)
    };
    e.canTextBeChildOfNode = u;
    var m = function(h) {
        return h
    };
    e.returnFirstArg = m
}
)(yo),
Object.defineProperty(qn, "__esModule", {
    value: !0
}),
qn.default = Vh;
var cn = Ne
  , _s = yo
  , Hh = ["checked", "value"]
  , $h = ["input", "select", "textarea"]
  , Uh = {
    reset: !0,
    submit: !0
};
function Vh(e, t) {
    e === void 0 && (e = {});
    var r = {}
      , n = !!(e.type && Uh[e.type]);
    for (var i in e) {
        var a = e[i];
        if ((0,
        cn.isCustomAttribute)(i)) {
            r[i] = a;
            continue
        }
        var c = i.toLowerCase()
          , l = ks(c);
        if (l) {
            var u = (0,
            cn.getPropertyInfo)(l);
            switch (Hh.includes(l) && $h.includes(t) && !n && (l = ks("default" + c)),
            r[l] = a,
            u && u.type) {
            case cn.BOOLEAN:
                r[l] = !0;
                break;
            case cn.OVERLOADED_BOOLEAN:
                a === "" && (r[l] = !0);
                break
            }
            continue
        }
        _s.PRESERVE_CUSTOM_ATTRIBUTES && (r[i] = a)
    }
    return (0,
    _s.setStyleProp)(e.style, r),
    r
}
function ks(e) {
    return cn.possibleStandardNames[e]
}
var ko = {}
  , qh = ae && ae.__importDefault || function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
;
Object.defineProperty(ko, "__esModule", {
    value: !0
}),
ko.default = Es;
var Eo = d
  , Gh = qh(qn)
  , un = yo
  , Wh = {
    cloneElement: Eo.cloneElement,
    createElement: Eo.createElement,
    isValidElement: Eo.isValidElement
};
function Es(e, t) {
    t === void 0 && (t = {});
    for (var r = [], n = typeof t.replace == "function", i = t.transform || un.returnFirstArg, a = t.library || Wh, c = a.cloneElement, l = a.createElement, u = a.isValidElement, m = e.length, h = 0; h < m; h++) {
        var v = e[h];
        if (n) {
            var w = t.replace(v, h);
            if (u(w)) {
                m > 1 && (w = c(w, {
                    key: w.key || h
                })),
                r.push(i(w, v, h));
                continue
            }
        }
        if (v.type === "text") {
            var k = !v.data.trim().length;
            if (k && v.parent && !(0,
            un.canTextBeChildOfNode)(v.parent) || t.trim && k)
                continue;
            r.push(i(v.data, v, h));
            continue
        }
        var b = v
          , g = {};
        Xh(b) ? ((0,
        un.setStyleProp)(b.attribs.style, b.attribs),
        g = b.attribs) : b.attribs && (g = (0,
        Gh.default)(b.attribs, b.name));
        var _ = void 0;
        switch (v.type) {
        case "script":
        case "style":
            v.children[0] && (g.dangerouslySetInnerHTML = {
                __html: v.children[0].data
            });
            break;
        case "tag":
            v.name === "textarea" && v.children[0] ? g.defaultValue = v.children[0].data : v.children && v.children.length && (_ = Es(v.children, t));
            break;
        default:
            continue
        }
        m > 1 && (g.key = h),
        r.push(i(l(v.name, g, _), v, h))
    }
    return r.length === 1 ? r[0] : r
}
function Xh(e) {
    return un.PRESERVE_CUSTOM_ATTRIBUTES && e.type === "tag" && (0,
    un.isCustomComponent)(e.name, e.attribs)
}
(function(e) {
    var t = ae && ae.__importDefault || function(u) {
        return u && u.__esModule ? u : {
            default: u
        }
    }
    ;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.htmlToDOM = e.domToReact = e.attributesToProps = e.Text = e.ProcessingInstruction = e.Element = e.Comment = void 0,
    e.default = l;
    var r = t(so);
    e.htmlToDOM = r.default;
    var n = t(qn);
    e.attributesToProps = n.default;
    var i = t(ko);
    e.domToReact = i.default;
    var a = co;
    Object.defineProperty(e, "Comment", {
        enumerable: !0,
        get: function() {
            return a.Comment
        }
    }),
    Object.defineProperty(e, "Element", {
        enumerable: !0,
        get: function() {
            return a.Element
        }
    }),
    Object.defineProperty(e, "ProcessingInstruction", {
        enumerable: !0,
        get: function() {
            return a.ProcessingInstruction
        }
    }),
    Object.defineProperty(e, "Text", {
        enumerable: !0,
        get: function() {
            return a.Text
        }
    });
    var c = {
        lowerCaseAttributeNames: !1
    };
    function l(u, m) {
        if (typeof u != "string")
            throw new TypeError("First argument must be a string");
        return u ? (0,
        i.default)((0,
        r.default)(u, (m == null ? void 0 : m.htmlparser2) || c), m) : []
    }
}
)(qa);
const Cs = cr(qa)
  , Kn = Cs.default || Cs;
var js = {
    exports: {}
};
(function(e) {
    (function() {
        function t(o) {
            var p = {
                omitExtraWLInCodeBlocks: {
                    defaultValue: !1,
                    describe: "Omit the default extra whiteline added to code blocks",
                    type: "boolean"
                },
                noHeaderId: {
                    defaultValue: !1,
                    describe: "Turn on/off generated header id",
                    type: "boolean"
                },
                prefixHeaderId: {
                    defaultValue: !1,
                    describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
                    type: "string"
                },
                rawPrefixHeaderId: {
                    defaultValue: !1,
                    describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
                    type: "boolean"
                },
                ghCompatibleHeaderId: {
                    defaultValue: !1,
                    describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
                    type: "boolean"
                },
                rawHeaderId: {
                    defaultValue: !1,
                    describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
                    type: "boolean"
                },
                headerLevelStart: {
                    defaultValue: !1,
                    describe: "The header blocks level start",
                    type: "integer"
                },
                parseImgDimensions: {
                    defaultValue: !1,
                    describe: "Turn on/off image dimension parsing",
                    type: "boolean"
                },
                simplifiedAutoLink: {
                    defaultValue: !1,
                    describe: "Turn on/off GFM autolink style",
                    type: "boolean"
                },
                excludeTrailingPunctuationFromURLs: {
                    defaultValue: !1,
                    describe: "Excludes trailing punctuation from links generated with autoLinking",
                    type: "boolean"
                },
                literalMidWordUnderscores: {
                    defaultValue: !1,
                    describe: "Parse midword underscores as literal underscores",
                    type: "boolean"
                },
                literalMidWordAsterisks: {
                    defaultValue: !1,
                    describe: "Parse midword asterisks as literal asterisks",
                    type: "boolean"
                },
                strikethrough: {
                    defaultValue: !1,
                    describe: "Turn on/off strikethrough support",
                    type: "boolean"
                },
                tables: {
                    defaultValue: !1,
                    describe: "Turn on/off tables support",
                    type: "boolean"
                },
                tablesHeaderId: {
                    defaultValue: !1,
                    describe: "Add an id to table headers",
                    type: "boolean"
                },
                ghCodeBlocks: {
                    defaultValue: !0,
                    describe: "Turn on/off GFM fenced code blocks support",
                    type: "boolean"
                },
                tasklists: {
                    defaultValue: !1,
                    describe: "Turn on/off GFM tasklist support",
                    type: "boolean"
                },
                smoothLivePreview: {
                    defaultValue: !1,
                    describe: "Prevents weird effects in live previews due to incomplete input",
                    type: "boolean"
                },
                smartIndentationFix: {
                    defaultValue: !1,
                    describe: "Tries to smartly fix indentation in es6 strings",
                    type: "boolean"
                },
                disableForced4SpacesIndentedSublists: {
                    defaultValue: !1,
                    describe: "Disables the requirement of indenting nested sublists by 4 spaces",
                    type: "boolean"
                },
                simpleLineBreaks: {
                    defaultValue: !1,
                    describe: "Parses simple line breaks as <br> (GFM Style)",
                    type: "boolean"
                },
                requireSpaceBeforeHeadingText: {
                    defaultValue: !1,
                    describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
                    type: "boolean"
                },
                ghMentions: {
                    defaultValue: !1,
                    describe: "Enables github @mentions",
                    type: "boolean"
                },
                ghMentionsLink: {
                    defaultValue: "https://github.com/{u}",
                    describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
                    type: "string"
                },
                encodeEmails: {
                    defaultValue: !0,
                    describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
                    type: "boolean"
                },
                openLinksInNewWindow: {
                    defaultValue: !1,
                    describe: "Open all links in new windows",
                    type: "boolean"
                },
                backslashEscapesHTMLTags: {
                    defaultValue: !1,
                    describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
                    type: "boolean"
                },
                emoji: {
                    defaultValue: !1,
                    describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
                    type: "boolean"
                },
                underline: {
                    defaultValue: !1,
                    describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
                    type: "boolean"
                },
                ellipsis: {
                    defaultValue: !0,
                    describe: "Replaces three dots with the ellipsis unicode character",
                    type: "boolean"
                },
                completeHTMLDocument: {
                    defaultValue: !1,
                    describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
                    type: "boolean"
                },
                metadata: {
                    defaultValue: !1,
                    describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).",
                    type: "boolean"
                },
                splitAdjacentBlockquotes: {
                    defaultValue: !1,
                    describe: "Split adjacent blockquote blocks",
                    type: "boolean"
                }
            };
            if (o === !1)
                return JSON.parse(JSON.stringify(p));
            var f = {};
            for (var x in p)
                p.hasOwnProperty(x) && (f[x] = p[x].defaultValue);
            return f
        }
        function r() {
            var o = t(!0)
              , p = {};
            for (var f in o)
                o.hasOwnProperty(f) && (p[f] = !0);
            return p
        }
        var n = {}
          , i = {}
          , a = {}
          , c = t(!0)
          , l = "vanilla"
          , u = {
            github: {
                omitExtraWLInCodeBlocks: !0,
                simplifiedAutoLink: !0,
                excludeTrailingPunctuationFromURLs: !0,
                literalMidWordUnderscores: !0,
                strikethrough: !0,
                tables: !0,
                tablesHeaderId: !0,
                ghCodeBlocks: !0,
                tasklists: !0,
                disableForced4SpacesIndentedSublists: !0,
                simpleLineBreaks: !0,
                requireSpaceBeforeHeadingText: !0,
                ghCompatibleHeaderId: !0,
                ghMentions: !0,
                backslashEscapesHTMLTags: !0,
                emoji: !0,
                splitAdjacentBlockquotes: !0
            },
            original: {
                noHeaderId: !0,
                ghCodeBlocks: !1
            },
            ghost: {
                omitExtraWLInCodeBlocks: !0,
                parseImgDimensions: !0,
                simplifiedAutoLink: !0,
                excludeTrailingPunctuationFromURLs: !0,
                literalMidWordUnderscores: !0,
                strikethrough: !0,
                tables: !0,
                tablesHeaderId: !0,
                ghCodeBlocks: !0,
                tasklists: !0,
                smoothLivePreview: !0,
                simpleLineBreaks: !0,
                requireSpaceBeforeHeadingText: !0,
                ghMentions: !1,
                encodeEmails: !0
            },
            vanilla: t(!0),
            allOn: r()
        };
        n.helper = {},
        n.extensions = {},
        n.setOption = function(o, p) {
            return c[o] = p,
            this
        }
        ,
        n.getOption = function(o) {
            return c[o]
        }
        ,
        n.getOptions = function() {
            return c
        }
        ,
        n.resetOptions = function() {
            c = t(!0)
        }
        ,
        n.setFlavor = function(o) {
            if (!u.hasOwnProperty(o))
                throw Error(o + " flavor was not found");
            n.resetOptions();
            var p = u[o];
            l = o;
            for (var f in p)
                p.hasOwnProperty(f) && (c[f] = p[f])
        }
        ,
        n.getFlavor = function() {
            return l
        }
        ,
        n.getFlavorOptions = function(o) {
            if (u.hasOwnProperty(o))
                return u[o]
        }
        ,
        n.getDefaultOptions = function(o) {
            return t(o)
        }
        ,
        n.subParser = function(o, p) {
            if (n.helper.isString(o))
                if (typeof p < "u")
                    i[o] = p;
                else {
                    if (i.hasOwnProperty(o))
                        return i[o];
                    throw Error("SubParser named " + o + " not registered!")
                }
        }
        ,
        n.extension = function(o, p) {
            if (!n.helper.isString(o))
                throw Error("Extension 'name' must be a string");
            if (o = n.helper.stdExtName(o),
            n.helper.isUndefined(p)) {
                if (!a.hasOwnProperty(o))
                    throw Error("Extension named " + o + " is not registered!");
                return a[o]
            } else {
                typeof p == "function" && (p = p()),
                n.helper.isArray(p) || (p = [p]);
                var f = m(p, o);
                if (f.valid)
                    a[o] = p;
                else
                    throw Error(f.error)
            }
        }
        ,
        n.getAllExtensions = function() {
            return a
        }
        ,
        n.removeExtension = function(o) {
            delete a[o]
        }
        ,
        n.resetExtensions = function() {
            a = {}
        }
        ;
        function m(o, p) {
            var f = p ? "Error in " + p + " extension->" : "Error in unnamed extension"
              , x = {
                valid: !0,
                error: ""
            };
            n.helper.isArray(o) || (o = [o]);
            for (var E = 0; E < o.length; ++E) {
                var j = f + " sub-extension " + E + ": "
                  , C = o[E];
                if (typeof C != "object")
                    return x.valid = !1,
                    x.error = j + "must be an object, but " + typeof C + " given",
                    x;
                if (!n.helper.isString(C.type))
                    return x.valid = !1,
                    x.error = j + 'property "type" must be a string, but ' + typeof C.type + " given",
                    x;
                var S = C.type = C.type.toLowerCase();
                if (S === "language" && (S = C.type = "lang"),
                S === "html" && (S = C.type = "output"),
                S !== "lang" && S !== "output" && S !== "listener")
                    return x.valid = !1,
                    x.error = j + "type " + S + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"',
                    x;
                if (S === "listener") {
                    if (n.helper.isUndefined(C.listeners))
                        return x.valid = !1,
                        x.error = j + '. Extensions of type "listener" must have a property called "listeners"',
                        x
                } else if (n.helper.isUndefined(C.filter) && n.helper.isUndefined(C.regex))
                    return x.valid = !1,
                    x.error = j + S + ' extensions must define either a "regex" property or a "filter" method',
                    x;
                if (C.listeners) {
                    if (typeof C.listeners != "object")
                        return x.valid = !1,
                        x.error = j + '"listeners" property must be an object but ' + typeof C.listeners + " given",
                        x;
                    for (var T in C.listeners)
                        if (C.listeners.hasOwnProperty(T) && typeof C.listeners[T] != "function")
                            return x.valid = !1,
                            x.error = j + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + T + " must be a function but " + typeof C.listeners[T] + " given",
                            x
                }
                if (C.filter) {
                    if (typeof C.filter != "function")
                        return x.valid = !1,
                        x.error = j + '"filter" must be a function, but ' + typeof C.filter + " given",
                        x
                } else if (C.regex) {
                    if (n.helper.isString(C.regex) && (C.regex = new RegExp(C.regex,"g")),
                    !(C.regex instanceof RegExp))
                        return x.valid = !1,
                        x.error = j + '"regex" property must either be a string or a RegExp object, but ' + typeof C.regex + " given",
                        x;
                    if (n.helper.isUndefined(C.replace))
                        return x.valid = !1,
                        x.error = j + '"regex" extensions must implement a replace string or function',
                        x
                }
            }
            return x
        }
        n.validateExtension = function(o) {
            var p = m(o, null);
            return p.valid ? !0 : (console.warn(p.error),
            !1)
        }
        ,
        n.hasOwnProperty("helper") || (n.helper = {}),
        n.helper.isString = function(o) {
            return typeof o == "string" || o instanceof String
        }
        ,
        n.helper.isFunction = function(o) {
            var p = {};
            return o && p.toString.call(o) === "[object Function]"
        }
        ,
        n.helper.isArray = function(o) {
            return Array.isArray(o)
        }
        ,
        n.helper.isUndefined = function(o) {
            return typeof o > "u"
        }
        ,
        n.helper.forEach = function(o, p) {
            if (n.helper.isUndefined(o))
                throw new Error("obj param is required");
            if (n.helper.isUndefined(p))
                throw new Error("callback param is required");
            if (!n.helper.isFunction(p))
                throw new Error("callback param must be a function/closure");
            if (typeof o.forEach == "function")
                o.forEach(p);
            else if (n.helper.isArray(o))
                for (var f = 0; f < o.length; f++)
                    p(o[f], f, o);
            else if (typeof o == "object")
                for (var x in o)
                    o.hasOwnProperty(x) && p(o[x], x, o);
            else
                throw new Error("obj does not seem to be an array or an iterable object")
        }
        ,
        n.helper.stdExtName = function(o) {
            return o.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase()
        }
        ;
        function h(o, p) {
            var f = p.charCodeAt(0);
            return "\xA8E" + f + "E"
        }
        n.helper.escapeCharactersCallback = h,
        n.helper.escapeCharacters = function(o, p, f) {
            var x = "([" + p.replace(/([\[\]\\])/g, "\\$1") + "])";
            f && (x = "\\\\" + x);
            var E = new RegExp(x,"g");
            return o = o.replace(E, h),
            o
        }
        ,
        n.helper.unescapeHTMLEntities = function(o) {
            return o.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        }
        ;
        var v = function(o, p, f, x) {
            var E = x || "", j = E.indexOf("g") > -1, C = new RegExp(p + "|" + f,"g" + E.replace(/g/g, "")), S = new RegExp(p,E.replace(/g/g, "")), T = [], P, R, N, y, O;
            do
                for (P = 0; N = C.exec(o); )
                    if (S.test(N[0]))
                        P++ || (R = C.lastIndex,
                        y = R - N[0].length);
                    else if (P && !--P) {
                        O = N.index + N[0].length;
                        var A = {
                            left: {
                                start: y,
                                end: R
                            },
                            match: {
                                start: R,
                                end: N.index
                            },
                            right: {
                                start: N.index,
                                end: O
                            },
                            wholeMatch: {
                                start: y,
                                end: O
                            }
                        };
                        if (T.push(A),
                        !j)
                            return T
                    }
            while (P && (C.lastIndex = R));
            return T
        };
        n.helper.matchRecursiveRegExp = function(o, p, f, x) {
            for (var E = v(o, p, f, x), j = [], C = 0; C < E.length; ++C)
                j.push([o.slice(E[C].wholeMatch.start, E[C].wholeMatch.end), o.slice(E[C].match.start, E[C].match.end), o.slice(E[C].left.start, E[C].left.end), o.slice(E[C].right.start, E[C].right.end)]);
            return j
        }
        ,
        n.helper.replaceRecursiveRegExp = function(o, p, f, x, E) {
            if (!n.helper.isFunction(p)) {
                var j = p;
                p = function() {
                    return j
                }
            }
            var C = v(o, f, x, E)
              , S = o
              , T = C.length;
            if (T > 0) {
                var P = [];
                C[0].wholeMatch.start !== 0 && P.push(o.slice(0, C[0].wholeMatch.start));
                for (var R = 0; R < T; ++R)
                    P.push(p(o.slice(C[R].wholeMatch.start, C[R].wholeMatch.end), o.slice(C[R].match.start, C[R].match.end), o.slice(C[R].left.start, C[R].left.end), o.slice(C[R].right.start, C[R].right.end))),
                    R < T - 1 && P.push(o.slice(C[R].wholeMatch.end, C[R + 1].wholeMatch.start));
                C[T - 1].wholeMatch.end < o.length && P.push(o.slice(C[T - 1].wholeMatch.end)),
                S = P.join("")
            }
            return S
        }
        ,
        n.helper.regexIndexOf = function(o, p, f) {
            if (!n.helper.isString(o))
                throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
            if (!(p instanceof RegExp))
                throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
            var x = o.substring(f || 0).search(p);
            return x >= 0 ? x + (f || 0) : x
        }
        ,
        n.helper.splitAtIndex = function(o, p) {
            if (!n.helper.isString(o))
                throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
            return [o.substring(0, p), o.substring(p)]
        }
        ,
        n.helper.encodeEmailAddress = function(o) {
            var p = [function(f) {
                return "&#" + f.charCodeAt(0) + ";"
            }
            , function(f) {
                return "&#x" + f.charCodeAt(0).toString(16) + ";"
            }
            , function(f) {
                return f
            }
            ];
            return o = o.replace(/./g, function(f) {
                if (f === "@")
                    f = p[Math.floor(Math.random() * 2)](f);
                else {
                    var x = Math.random();
                    f = x > .9 ? p[2](f) : x > .45 ? p[1](f) : p[0](f)
                }
                return f
            }),
            o
        }
        ,
        n.helper.padEnd = function(o, p, f) {
            return p = p >> 0,
            f = String(f || " "),
            o.length > p ? String(o) : (p = p - o.length,
            p > f.length && (f += f.repeat(p / f.length)),
            String(o) + f.slice(0, p))
        }
        ,
        typeof console > "u" && (console = {
            warn: function(o) {
                alert(o)
            },
            log: function(o) {
                alert(o)
            },
            error: function(o) {
                throw o
            }
        }),
        n.helper.regexes = {
            asteriskDashAndColon: /([*_:~])/g
        },
        n.helper.emojis = {
            "+1": "\u{1F44D}",
            "-1": "\u{1F44E}",
            100: "\u{1F4AF}",
            1234: "\u{1F522}",
            "1st_place_medal": "\u{1F947}",
            "2nd_place_medal": "\u{1F948}",
            "3rd_place_medal": "\u{1F949}",
            "8ball": "\u{1F3B1}",
            a: "\u{1F170}\uFE0F",
            ab: "\u{1F18E}",
            abc: "\u{1F524}",
            abcd: "\u{1F521}",
            accept: "\u{1F251}",
            aerial_tramway: "\u{1F6A1}",
            airplane: "\u2708\uFE0F",
            alarm_clock: "\u23F0",
            alembic: "\u2697\uFE0F",
            alien: "\u{1F47D}",
            ambulance: "\u{1F691}",
            amphora: "\u{1F3FA}",
            anchor: "\u2693\uFE0F",
            angel: "\u{1F47C}",
            anger: "\u{1F4A2}",
            angry: "\u{1F620}",
            anguished: "\u{1F627}",
            ant: "\u{1F41C}",
            apple: "\u{1F34E}",
            aquarius: "\u2652\uFE0F",
            aries: "\u2648\uFE0F",
            arrow_backward: "\u25C0\uFE0F",
            arrow_double_down: "\u23EC",
            arrow_double_up: "\u23EB",
            arrow_down: "\u2B07\uFE0F",
            arrow_down_small: "\u{1F53D}",
            arrow_forward: "\u25B6\uFE0F",
            arrow_heading_down: "\u2935\uFE0F",
            arrow_heading_up: "\u2934\uFE0F",
            arrow_left: "\u2B05\uFE0F",
            arrow_lower_left: "\u2199\uFE0F",
            arrow_lower_right: "\u2198\uFE0F",
            arrow_right: "\u27A1\uFE0F",
            arrow_right_hook: "\u21AA\uFE0F",
            arrow_up: "\u2B06\uFE0F",
            arrow_up_down: "\u2195\uFE0F",
            arrow_up_small: "\u{1F53C}",
            arrow_upper_left: "\u2196\uFE0F",
            arrow_upper_right: "\u2197\uFE0F",
            arrows_clockwise: "\u{1F503}",
            arrows_counterclockwise: "\u{1F504}",
            art: "\u{1F3A8}",
            articulated_lorry: "\u{1F69B}",
            artificial_satellite: "\u{1F6F0}",
            astonished: "\u{1F632}",
            athletic_shoe: "\u{1F45F}",
            atm: "\u{1F3E7}",
            atom_symbol: "\u269B\uFE0F",
            avocado: "\u{1F951}",
            b: "\u{1F171}\uFE0F",
            baby: "\u{1F476}",
            baby_bottle: "\u{1F37C}",
            baby_chick: "\u{1F424}",
            baby_symbol: "\u{1F6BC}",
            back: "\u{1F519}",
            bacon: "\u{1F953}",
            badminton: "\u{1F3F8}",
            baggage_claim: "\u{1F6C4}",
            baguette_bread: "\u{1F956}",
            balance_scale: "\u2696\uFE0F",
            balloon: "\u{1F388}",
            ballot_box: "\u{1F5F3}",
            ballot_box_with_check: "\u2611\uFE0F",
            bamboo: "\u{1F38D}",
            banana: "\u{1F34C}",
            bangbang: "\u203C\uFE0F",
            bank: "\u{1F3E6}",
            bar_chart: "\u{1F4CA}",
            barber: "\u{1F488}",
            baseball: "\u26BE\uFE0F",
            basketball: "\u{1F3C0}",
            basketball_man: "\u26F9\uFE0F",
            basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F",
            bat: "\u{1F987}",
            bath: "\u{1F6C0}",
            bathtub: "\u{1F6C1}",
            battery: "\u{1F50B}",
            beach_umbrella: "\u{1F3D6}",
            bear: "\u{1F43B}",
            bed: "\u{1F6CF}",
            bee: "\u{1F41D}",
            beer: "\u{1F37A}",
            beers: "\u{1F37B}",
            beetle: "\u{1F41E}",
            beginner: "\u{1F530}",
            bell: "\u{1F514}",
            bellhop_bell: "\u{1F6CE}",
            bento: "\u{1F371}",
            biking_man: "\u{1F6B4}",
            bike: "\u{1F6B2}",
            biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F",
            bikini: "\u{1F459}",
            biohazard: "\u2623\uFE0F",
            bird: "\u{1F426}",
            birthday: "\u{1F382}",
            black_circle: "\u26AB\uFE0F",
            black_flag: "\u{1F3F4}",
            black_heart: "\u{1F5A4}",
            black_joker: "\u{1F0CF}",
            black_large_square: "\u2B1B\uFE0F",
            black_medium_small_square: "\u25FE\uFE0F",
            black_medium_square: "\u25FC\uFE0F",
            black_nib: "\u2712\uFE0F",
            black_small_square: "\u25AA\uFE0F",
            black_square_button: "\u{1F532}",
            blonde_man: "\u{1F471}",
            blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F",
            blossom: "\u{1F33C}",
            blowfish: "\u{1F421}",
            blue_book: "\u{1F4D8}",
            blue_car: "\u{1F699}",
            blue_heart: "\u{1F499}",
            blush: "\u{1F60A}",
            boar: "\u{1F417}",
            boat: "\u26F5\uFE0F",
            bomb: "\u{1F4A3}",
            book: "\u{1F4D6}",
            bookmark: "\u{1F516}",
            bookmark_tabs: "\u{1F4D1}",
            books: "\u{1F4DA}",
            boom: "\u{1F4A5}",
            boot: "\u{1F462}",
            bouquet: "\u{1F490}",
            bowing_man: "\u{1F647}",
            bow_and_arrow: "\u{1F3F9}",
            bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F",
            bowling: "\u{1F3B3}",
            boxing_glove: "\u{1F94A}",
            boy: "\u{1F466}",
            bread: "\u{1F35E}",
            bride_with_veil: "\u{1F470}",
            bridge_at_night: "\u{1F309}",
            briefcase: "\u{1F4BC}",
            broken_heart: "\u{1F494}",
            bug: "\u{1F41B}",
            building_construction: "\u{1F3D7}",
            bulb: "\u{1F4A1}",
            bullettrain_front: "\u{1F685}",
            bullettrain_side: "\u{1F684}",
            burrito: "\u{1F32F}",
            bus: "\u{1F68C}",
            business_suit_levitating: "\u{1F574}",
            busstop: "\u{1F68F}",
            bust_in_silhouette: "\u{1F464}",
            busts_in_silhouette: "\u{1F465}",
            butterfly: "\u{1F98B}",
            cactus: "\u{1F335}",
            cake: "\u{1F370}",
            calendar: "\u{1F4C6}",
            call_me_hand: "\u{1F919}",
            calling: "\u{1F4F2}",
            camel: "\u{1F42B}",
            camera: "\u{1F4F7}",
            camera_flash: "\u{1F4F8}",
            camping: "\u{1F3D5}",
            cancer: "\u264B\uFE0F",
            candle: "\u{1F56F}",
            candy: "\u{1F36C}",
            canoe: "\u{1F6F6}",
            capital_abcd: "\u{1F520}",
            capricorn: "\u2651\uFE0F",
            car: "\u{1F697}",
            card_file_box: "\u{1F5C3}",
            card_index: "\u{1F4C7}",
            card_index_dividers: "\u{1F5C2}",
            carousel_horse: "\u{1F3A0}",
            carrot: "\u{1F955}",
            cat: "\u{1F431}",
            cat2: "\u{1F408}",
            cd: "\u{1F4BF}",
            chains: "\u26D3",
            champagne: "\u{1F37E}",
            chart: "\u{1F4B9}",
            chart_with_downwards_trend: "\u{1F4C9}",
            chart_with_upwards_trend: "\u{1F4C8}",
            checkered_flag: "\u{1F3C1}",
            cheese: "\u{1F9C0}",
            cherries: "\u{1F352}",
            cherry_blossom: "\u{1F338}",
            chestnut: "\u{1F330}",
            chicken: "\u{1F414}",
            children_crossing: "\u{1F6B8}",
            chipmunk: "\u{1F43F}",
            chocolate_bar: "\u{1F36B}",
            christmas_tree: "\u{1F384}",
            church: "\u26EA\uFE0F",
            cinema: "\u{1F3A6}",
            circus_tent: "\u{1F3AA}",
            city_sunrise: "\u{1F307}",
            city_sunset: "\u{1F306}",
            cityscape: "\u{1F3D9}",
            cl: "\u{1F191}",
            clamp: "\u{1F5DC}",
            clap: "\u{1F44F}",
            clapper: "\u{1F3AC}",
            classical_building: "\u{1F3DB}",
            clinking_glasses: "\u{1F942}",
            clipboard: "\u{1F4CB}",
            clock1: "\u{1F550}",
            clock10: "\u{1F559}",
            clock1030: "\u{1F565}",
            clock11: "\u{1F55A}",
            clock1130: "\u{1F566}",
            clock12: "\u{1F55B}",
            clock1230: "\u{1F567}",
            clock130: "\u{1F55C}",
            clock2: "\u{1F551}",
            clock230: "\u{1F55D}",
            clock3: "\u{1F552}",
            clock330: "\u{1F55E}",
            clock4: "\u{1F553}",
            clock430: "\u{1F55F}",
            clock5: "\u{1F554}",
            clock530: "\u{1F560}",
            clock6: "\u{1F555}",
            clock630: "\u{1F561}",
            clock7: "\u{1F556}",
            clock730: "\u{1F562}",
            clock8: "\u{1F557}",
            clock830: "\u{1F563}",
            clock9: "\u{1F558}",
            clock930: "\u{1F564}",
            closed_book: "\u{1F4D5}",
            closed_lock_with_key: "\u{1F510}",
            closed_umbrella: "\u{1F302}",
            cloud: "\u2601\uFE0F",
            cloud_with_lightning: "\u{1F329}",
            cloud_with_lightning_and_rain: "\u26C8",
            cloud_with_rain: "\u{1F327}",
            cloud_with_snow: "\u{1F328}",
            clown_face: "\u{1F921}",
            clubs: "\u2663\uFE0F",
            cocktail: "\u{1F378}",
            coffee: "\u2615\uFE0F",
            coffin: "\u26B0\uFE0F",
            cold_sweat: "\u{1F630}",
            comet: "\u2604\uFE0F",
            computer: "\u{1F4BB}",
            computer_mouse: "\u{1F5B1}",
            confetti_ball: "\u{1F38A}",
            confounded: "\u{1F616}",
            confused: "\u{1F615}",
            congratulations: "\u3297\uFE0F",
            construction: "\u{1F6A7}",
            construction_worker_man: "\u{1F477}",
            construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F",
            control_knobs: "\u{1F39B}",
            convenience_store: "\u{1F3EA}",
            cookie: "\u{1F36A}",
            cool: "\u{1F192}",
            policeman: "\u{1F46E}",
            copyright: "\xA9\uFE0F",
            corn: "\u{1F33D}",
            couch_and_lamp: "\u{1F6CB}",
            couple: "\u{1F46B}",
            couple_with_heart_woman_man: "\u{1F491}",
            couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}",
            couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}",
            couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}",
            couplekiss_man_woman: "\u{1F48F}",
            couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}",
            cow: "\u{1F42E}",
            cow2: "\u{1F404}",
            cowboy_hat_face: "\u{1F920}",
            crab: "\u{1F980}",
            crayon: "\u{1F58D}",
            credit_card: "\u{1F4B3}",
            crescent_moon: "\u{1F319}",
            cricket: "\u{1F3CF}",
            crocodile: "\u{1F40A}",
            croissant: "\u{1F950}",
            crossed_fingers: "\u{1F91E}",
            crossed_flags: "\u{1F38C}",
            crossed_swords: "\u2694\uFE0F",
            crown: "\u{1F451}",
            cry: "\u{1F622}",
            crying_cat_face: "\u{1F63F}",
            crystal_ball: "\u{1F52E}",
            cucumber: "\u{1F952}",
            cupid: "\u{1F498}",
            curly_loop: "\u27B0",
            currency_exchange: "\u{1F4B1}",
            curry: "\u{1F35B}",
            custard: "\u{1F36E}",
            customs: "\u{1F6C3}",
            cyclone: "\u{1F300}",
            dagger: "\u{1F5E1}",
            dancer: "\u{1F483}",
            dancing_women: "\u{1F46F}",
            dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F",
            dango: "\u{1F361}",
            dark_sunglasses: "\u{1F576}",
            dart: "\u{1F3AF}",
            dash: "\u{1F4A8}",
            date: "\u{1F4C5}",
            deciduous_tree: "\u{1F333}",
            deer: "\u{1F98C}",
            department_store: "\u{1F3EC}",
            derelict_house: "\u{1F3DA}",
            desert: "\u{1F3DC}",
            desert_island: "\u{1F3DD}",
            desktop_computer: "\u{1F5A5}",
            male_detective: "\u{1F575}\uFE0F",
            diamond_shape_with_a_dot_inside: "\u{1F4A0}",
            diamonds: "\u2666\uFE0F",
            disappointed: "\u{1F61E}",
            disappointed_relieved: "\u{1F625}",
            dizzy: "\u{1F4AB}",
            dizzy_face: "\u{1F635}",
            do_not_litter: "\u{1F6AF}",
            dog: "\u{1F436}",
            dog2: "\u{1F415}",
            dollar: "\u{1F4B5}",
            dolls: "\u{1F38E}",
            dolphin: "\u{1F42C}",
            door: "\u{1F6AA}",
            doughnut: "\u{1F369}",
            dove: "\u{1F54A}",
            dragon: "\u{1F409}",
            dragon_face: "\u{1F432}",
            dress: "\u{1F457}",
            dromedary_camel: "\u{1F42A}",
            drooling_face: "\u{1F924}",
            droplet: "\u{1F4A7}",
            drum: "\u{1F941}",
            duck: "\u{1F986}",
            dvd: "\u{1F4C0}",
            "e-mail": "\u{1F4E7}",
            eagle: "\u{1F985}",
            ear: "\u{1F442}",
            ear_of_rice: "\u{1F33E}",
            earth_africa: "\u{1F30D}",
            earth_americas: "\u{1F30E}",
            earth_asia: "\u{1F30F}",
            egg: "\u{1F95A}",
            eggplant: "\u{1F346}",
            eight_pointed_black_star: "\u2734\uFE0F",
            eight_spoked_asterisk: "\u2733\uFE0F",
            electric_plug: "\u{1F50C}",
            elephant: "\u{1F418}",
            email: "\u2709\uFE0F",
            end: "\u{1F51A}",
            envelope_with_arrow: "\u{1F4E9}",
            euro: "\u{1F4B6}",
            european_castle: "\u{1F3F0}",
            european_post_office: "\u{1F3E4}",
            evergreen_tree: "\u{1F332}",
            exclamation: "\u2757\uFE0F",
            expressionless: "\u{1F611}",
            eye: "\u{1F441}",
            eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}",
            eyeglasses: "\u{1F453}",
            eyes: "\u{1F440}",
            face_with_head_bandage: "\u{1F915}",
            face_with_thermometer: "\u{1F912}",
            fist_oncoming: "\u{1F44A}",
            factory: "\u{1F3ED}",
            fallen_leaf: "\u{1F342}",
            family_man_woman_boy: "\u{1F46A}",
            family_man_boy: "\u{1F468}&zwj;\u{1F466}",
            family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
            family_man_girl: "\u{1F468}&zwj;\u{1F467}",
            family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
            family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
            family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}",
            family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
            family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}",
            family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
            family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
            family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
            family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}",
            family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
            family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
            family_woman_boy: "\u{1F469}&zwj;\u{1F466}",
            family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
            family_woman_girl: "\u{1F469}&zwj;\u{1F467}",
            family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
            family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
            family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}",
            family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
            family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}",
            family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
            family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
            fast_forward: "\u23E9",
            fax: "\u{1F4E0}",
            fearful: "\u{1F628}",
            feet: "\u{1F43E}",
            female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F",
            ferris_wheel: "\u{1F3A1}",
            ferry: "\u26F4",
            field_hockey: "\u{1F3D1}",
            file_cabinet: "\u{1F5C4}",
            file_folder: "\u{1F4C1}",
            film_projector: "\u{1F4FD}",
            film_strip: "\u{1F39E}",
            fire: "\u{1F525}",
            fire_engine: "\u{1F692}",
            fireworks: "\u{1F386}",
            first_quarter_moon: "\u{1F313}",
            first_quarter_moon_with_face: "\u{1F31B}",
            fish: "\u{1F41F}",
            fish_cake: "\u{1F365}",
            fishing_pole_and_fish: "\u{1F3A3}",
            fist_raised: "\u270A",
            fist_left: "\u{1F91B}",
            fist_right: "\u{1F91C}",
            flags: "\u{1F38F}",
            flashlight: "\u{1F526}",
            fleur_de_lis: "\u269C\uFE0F",
            flight_arrival: "\u{1F6EC}",
            flight_departure: "\u{1F6EB}",
            floppy_disk: "\u{1F4BE}",
            flower_playing_cards: "\u{1F3B4}",
            flushed: "\u{1F633}",
            fog: "\u{1F32B}",
            foggy: "\u{1F301}",
            football: "\u{1F3C8}",
            footprints: "\u{1F463}",
            fork_and_knife: "\u{1F374}",
            fountain: "\u26F2\uFE0F",
            fountain_pen: "\u{1F58B}",
            four_leaf_clover: "\u{1F340}",
            fox_face: "\u{1F98A}",
            framed_picture: "\u{1F5BC}",
            free: "\u{1F193}",
            fried_egg: "\u{1F373}",
            fried_shrimp: "\u{1F364}",
            fries: "\u{1F35F}",
            frog: "\u{1F438}",
            frowning: "\u{1F626}",
            frowning_face: "\u2639\uFE0F",
            frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F",
            frowning_woman: "\u{1F64D}",
            middle_finger: "\u{1F595}",
            fuelpump: "\u26FD\uFE0F",
            full_moon: "\u{1F315}",
            full_moon_with_face: "\u{1F31D}",
            funeral_urn: "\u26B1\uFE0F",
            game_die: "\u{1F3B2}",
            gear: "\u2699\uFE0F",
            gem: "\u{1F48E}",
            gemini: "\u264A\uFE0F",
            ghost: "\u{1F47B}",
            gift: "\u{1F381}",
            gift_heart: "\u{1F49D}",
            girl: "\u{1F467}",
            globe_with_meridians: "\u{1F310}",
            goal_net: "\u{1F945}",
            goat: "\u{1F410}",
            golf: "\u26F3\uFE0F",
            golfing_man: "\u{1F3CC}\uFE0F",
            golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F",
            gorilla: "\u{1F98D}",
            grapes: "\u{1F347}",
            green_apple: "\u{1F34F}",
            green_book: "\u{1F4D7}",
            green_heart: "\u{1F49A}",
            green_salad: "\u{1F957}",
            grey_exclamation: "\u2755",
            grey_question: "\u2754",
            grimacing: "\u{1F62C}",
            grin: "\u{1F601}",
            grinning: "\u{1F600}",
            guardsman: "\u{1F482}",
            guardswoman: "\u{1F482}&zwj;\u2640\uFE0F",
            guitar: "\u{1F3B8}",
            gun: "\u{1F52B}",
            haircut_woman: "\u{1F487}",
            haircut_man: "\u{1F487}&zwj;\u2642\uFE0F",
            hamburger: "\u{1F354}",
            hammer: "\u{1F528}",
            hammer_and_pick: "\u2692",
            hammer_and_wrench: "\u{1F6E0}",
            hamster: "\u{1F439}",
            hand: "\u270B",
            handbag: "\u{1F45C}",
            handshake: "\u{1F91D}",
            hankey: "\u{1F4A9}",
            hatched_chick: "\u{1F425}",
            hatching_chick: "\u{1F423}",
            headphones: "\u{1F3A7}",
            hear_no_evil: "\u{1F649}",
            heart: "\u2764\uFE0F",
            heart_decoration: "\u{1F49F}",
            heart_eyes: "\u{1F60D}",
            heart_eyes_cat: "\u{1F63B}",
            heartbeat: "\u{1F493}",
            heartpulse: "\u{1F497}",
            hearts: "\u2665\uFE0F",
            heavy_check_mark: "\u2714\uFE0F",
            heavy_division_sign: "\u2797",
            heavy_dollar_sign: "\u{1F4B2}",
            heavy_heart_exclamation: "\u2763\uFE0F",
            heavy_minus_sign: "\u2796",
            heavy_multiplication_x: "\u2716\uFE0F",
            heavy_plus_sign: "\u2795",
            helicopter: "\u{1F681}",
            herb: "\u{1F33F}",
            hibiscus: "\u{1F33A}",
            high_brightness: "\u{1F506}",
            high_heel: "\u{1F460}",
            hocho: "\u{1F52A}",
            hole: "\u{1F573}",
            honey_pot: "\u{1F36F}",
            horse: "\u{1F434}",
            horse_racing: "\u{1F3C7}",
            hospital: "\u{1F3E5}",
            hot_pepper: "\u{1F336}",
            hotdog: "\u{1F32D}",
            hotel: "\u{1F3E8}",
            hotsprings: "\u2668\uFE0F",
            hourglass: "\u231B\uFE0F",
            hourglass_flowing_sand: "\u23F3",
            house: "\u{1F3E0}",
            house_with_garden: "\u{1F3E1}",
            houses: "\u{1F3D8}",
            hugs: "\u{1F917}",
            hushed: "\u{1F62F}",
            ice_cream: "\u{1F368}",
            ice_hockey: "\u{1F3D2}",
            ice_skate: "\u26F8",
            icecream: "\u{1F366}",
            id: "\u{1F194}",
            ideograph_advantage: "\u{1F250}",
            imp: "\u{1F47F}",
            inbox_tray: "\u{1F4E5}",
            incoming_envelope: "\u{1F4E8}",
            tipping_hand_woman: "\u{1F481}",
            information_source: "\u2139\uFE0F",
            innocent: "\u{1F607}",
            interrobang: "\u2049\uFE0F",
            iphone: "\u{1F4F1}",
            izakaya_lantern: "\u{1F3EE}",
            jack_o_lantern: "\u{1F383}",
            japan: "\u{1F5FE}",
            japanese_castle: "\u{1F3EF}",
            japanese_goblin: "\u{1F47A}",
            japanese_ogre: "\u{1F479}",
            jeans: "\u{1F456}",
            joy: "\u{1F602}",
            joy_cat: "\u{1F639}",
            joystick: "\u{1F579}",
            kaaba: "\u{1F54B}",
            key: "\u{1F511}",
            keyboard: "\u2328\uFE0F",
            keycap_ten: "\u{1F51F}",
            kick_scooter: "\u{1F6F4}",
            kimono: "\u{1F458}",
            kiss: "\u{1F48B}",
            kissing: "\u{1F617}",
            kissing_cat: "\u{1F63D}",
            kissing_closed_eyes: "\u{1F61A}",
            kissing_heart: "\u{1F618}",
            kissing_smiling_eyes: "\u{1F619}",
            kiwi_fruit: "\u{1F95D}",
            koala: "\u{1F428}",
            koko: "\u{1F201}",
            label: "\u{1F3F7}",
            large_blue_circle: "\u{1F535}",
            large_blue_diamond: "\u{1F537}",
            large_orange_diamond: "\u{1F536}",
            last_quarter_moon: "\u{1F317}",
            last_quarter_moon_with_face: "\u{1F31C}",
            latin_cross: "\u271D\uFE0F",
            laughing: "\u{1F606}",
            leaves: "\u{1F343}",
            ledger: "\u{1F4D2}",
            left_luggage: "\u{1F6C5}",
            left_right_arrow: "\u2194\uFE0F",
            leftwards_arrow_with_hook: "\u21A9\uFE0F",
            lemon: "\u{1F34B}",
            leo: "\u264C\uFE0F",
            leopard: "\u{1F406}",
            level_slider: "\u{1F39A}",
            libra: "\u264E\uFE0F",
            light_rail: "\u{1F688}",
            link: "\u{1F517}",
            lion: "\u{1F981}",
            lips: "\u{1F444}",
            lipstick: "\u{1F484}",
            lizard: "\u{1F98E}",
            lock: "\u{1F512}",
            lock_with_ink_pen: "\u{1F50F}",
            lollipop: "\u{1F36D}",
            loop: "\u27BF",
            loud_sound: "\u{1F50A}",
            loudspeaker: "\u{1F4E2}",
            love_hotel: "\u{1F3E9}",
            love_letter: "\u{1F48C}",
            low_brightness: "\u{1F505}",
            lying_face: "\u{1F925}",
            m: "\u24C2\uFE0F",
            mag: "\u{1F50D}",
            mag_right: "\u{1F50E}",
            mahjong: "\u{1F004}\uFE0F",
            mailbox: "\u{1F4EB}",
            mailbox_closed: "\u{1F4EA}",
            mailbox_with_mail: "\u{1F4EC}",
            mailbox_with_no_mail: "\u{1F4ED}",
            man: "\u{1F468}",
            man_artist: "\u{1F468}&zwj;\u{1F3A8}",
            man_astronaut: "\u{1F468}&zwj;\u{1F680}",
            man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F",
            man_cook: "\u{1F468}&zwj;\u{1F373}",
            man_dancing: "\u{1F57A}",
            man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F",
            man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}",
            man_farmer: "\u{1F468}&zwj;\u{1F33E}",
            man_firefighter: "\u{1F468}&zwj;\u{1F692}",
            man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F",
            man_in_tuxedo: "\u{1F935}",
            man_judge: "\u{1F468}&zwj;\u2696\uFE0F",
            man_juggling: "\u{1F939}&zwj;\u2642\uFE0F",
            man_mechanic: "\u{1F468}&zwj;\u{1F527}",
            man_office_worker: "\u{1F468}&zwj;\u{1F4BC}",
            man_pilot: "\u{1F468}&zwj;\u2708\uFE0F",
            man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F",
            man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F",
            man_scientist: "\u{1F468}&zwj;\u{1F52C}",
            man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F",
            man_singer: "\u{1F468}&zwj;\u{1F3A4}",
            man_student: "\u{1F468}&zwj;\u{1F393}",
            man_teacher: "\u{1F468}&zwj;\u{1F3EB}",
            man_technologist: "\u{1F468}&zwj;\u{1F4BB}",
            man_with_gua_pi_mao: "\u{1F472}",
            man_with_turban: "\u{1F473}",
            tangerine: "\u{1F34A}",
            mans_shoe: "\u{1F45E}",
            mantelpiece_clock: "\u{1F570}",
            maple_leaf: "\u{1F341}",
            martial_arts_uniform: "\u{1F94B}",
            mask: "\u{1F637}",
            massage_woman: "\u{1F486}",
            massage_man: "\u{1F486}&zwj;\u2642\uFE0F",
            meat_on_bone: "\u{1F356}",
            medal_military: "\u{1F396}",
            medal_sports: "\u{1F3C5}",
            mega: "\u{1F4E3}",
            melon: "\u{1F348}",
            memo: "\u{1F4DD}",
            men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F",
            menorah: "\u{1F54E}",
            mens: "\u{1F6B9}",
            metal: "\u{1F918}",
            metro: "\u{1F687}",
            microphone: "\u{1F3A4}",
            microscope: "\u{1F52C}",
            milk_glass: "\u{1F95B}",
            milky_way: "\u{1F30C}",
            minibus: "\u{1F690}",
            minidisc: "\u{1F4BD}",
            mobile_phone_off: "\u{1F4F4}",
            money_mouth_face: "\u{1F911}",
            money_with_wings: "\u{1F4B8}",
            moneybag: "\u{1F4B0}",
            monkey: "\u{1F412}",
            monkey_face: "\u{1F435}",
            monorail: "\u{1F69D}",
            moon: "\u{1F314}",
            mortar_board: "\u{1F393}",
            mosque: "\u{1F54C}",
            motor_boat: "\u{1F6E5}",
            motor_scooter: "\u{1F6F5}",
            motorcycle: "\u{1F3CD}",
            motorway: "\u{1F6E3}",
            mount_fuji: "\u{1F5FB}",
            mountain: "\u26F0",
            mountain_biking_man: "\u{1F6B5}",
            mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F",
            mountain_cableway: "\u{1F6A0}",
            mountain_railway: "\u{1F69E}",
            mountain_snow: "\u{1F3D4}",
            mouse: "\u{1F42D}",
            mouse2: "\u{1F401}",
            movie_camera: "\u{1F3A5}",
            moyai: "\u{1F5FF}",
            mrs_claus: "\u{1F936}",
            muscle: "\u{1F4AA}",
            mushroom: "\u{1F344}",
            musical_keyboard: "\u{1F3B9}",
            musical_note: "\u{1F3B5}",
            musical_score: "\u{1F3BC}",
            mute: "\u{1F507}",
            nail_care: "\u{1F485}",
            name_badge: "\u{1F4DB}",
            national_park: "\u{1F3DE}",
            nauseated_face: "\u{1F922}",
            necktie: "\u{1F454}",
            negative_squared_cross_mark: "\u274E",
            nerd_face: "\u{1F913}",
            neutral_face: "\u{1F610}",
            new: "\u{1F195}",
            new_moon: "\u{1F311}",
            new_moon_with_face: "\u{1F31A}",
            newspaper: "\u{1F4F0}",
            newspaper_roll: "\u{1F5DE}",
            next_track_button: "\u23ED",
            ng: "\u{1F196}",
            no_good_man: "\u{1F645}&zwj;\u2642\uFE0F",
            no_good_woman: "\u{1F645}",
            night_with_stars: "\u{1F303}",
            no_bell: "\u{1F515}",
            no_bicycles: "\u{1F6B3}",
            no_entry: "\u26D4\uFE0F",
            no_entry_sign: "\u{1F6AB}",
            no_mobile_phones: "\u{1F4F5}",
            no_mouth: "\u{1F636}",
            no_pedestrians: "\u{1F6B7}",
            no_smoking: "\u{1F6AD}",
            "non-potable_water": "\u{1F6B1}",
            nose: "\u{1F443}",
            notebook: "\u{1F4D3}",
            notebook_with_decorative_cover: "\u{1F4D4}",
            notes: "\u{1F3B6}",
            nut_and_bolt: "\u{1F529}",
            o: "\u2B55\uFE0F",
            o2: "\u{1F17E}\uFE0F",
            ocean: "\u{1F30A}",
            octopus: "\u{1F419}",
            oden: "\u{1F362}",
            office: "\u{1F3E2}",
            oil_drum: "\u{1F6E2}",
            ok: "\u{1F197}",
            ok_hand: "\u{1F44C}",
            ok_man: "\u{1F646}&zwj;\u2642\uFE0F",
            ok_woman: "\u{1F646}",
            old_key: "\u{1F5DD}",
            older_man: "\u{1F474}",
            older_woman: "\u{1F475}",
            om: "\u{1F549}",
            on: "\u{1F51B}",
            oncoming_automobile: "\u{1F698}",
            oncoming_bus: "\u{1F68D}",
            oncoming_police_car: "\u{1F694}",
            oncoming_taxi: "\u{1F696}",
            open_file_folder: "\u{1F4C2}",
            open_hands: "\u{1F450}",
            open_mouth: "\u{1F62E}",
            open_umbrella: "\u2602\uFE0F",
            ophiuchus: "\u26CE",
            orange_book: "\u{1F4D9}",
            orthodox_cross: "\u2626\uFE0F",
            outbox_tray: "\u{1F4E4}",
            owl: "\u{1F989}",
            ox: "\u{1F402}",
            package: "\u{1F4E6}",
            page_facing_up: "\u{1F4C4}",
            page_with_curl: "\u{1F4C3}",
            pager: "\u{1F4DF}",
            paintbrush: "\u{1F58C}",
            palm_tree: "\u{1F334}",
            pancakes: "\u{1F95E}",
            panda_face: "\u{1F43C}",
            paperclip: "\u{1F4CE}",
            paperclips: "\u{1F587}",
            parasol_on_ground: "\u26F1",
            parking: "\u{1F17F}\uFE0F",
            part_alternation_mark: "\u303D\uFE0F",
            partly_sunny: "\u26C5\uFE0F",
            passenger_ship: "\u{1F6F3}",
            passport_control: "\u{1F6C2}",
            pause_button: "\u23F8",
            peace_symbol: "\u262E\uFE0F",
            peach: "\u{1F351}",
            peanuts: "\u{1F95C}",
            pear: "\u{1F350}",
            pen: "\u{1F58A}",
            pencil2: "\u270F\uFE0F",
            penguin: "\u{1F427}",
            pensive: "\u{1F614}",
            performing_arts: "\u{1F3AD}",
            persevere: "\u{1F623}",
            person_fencing: "\u{1F93A}",
            pouting_woman: "\u{1F64E}",
            phone: "\u260E\uFE0F",
            pick: "\u26CF",
            pig: "\u{1F437}",
            pig2: "\u{1F416}",
            pig_nose: "\u{1F43D}",
            pill: "\u{1F48A}",
            pineapple: "\u{1F34D}",
            ping_pong: "\u{1F3D3}",
            pisces: "\u2653\uFE0F",
            pizza: "\u{1F355}",
            place_of_worship: "\u{1F6D0}",
            plate_with_cutlery: "\u{1F37D}",
            play_or_pause_button: "\u23EF",
            point_down: "\u{1F447}",
            point_left: "\u{1F448}",
            point_right: "\u{1F449}",
            point_up: "\u261D\uFE0F",
            point_up_2: "\u{1F446}",
            police_car: "\u{1F693}",
            policewoman: "\u{1F46E}&zwj;\u2640\uFE0F",
            poodle: "\u{1F429}",
            popcorn: "\u{1F37F}",
            post_office: "\u{1F3E3}",
            postal_horn: "\u{1F4EF}",
            postbox: "\u{1F4EE}",
            potable_water: "\u{1F6B0}",
            potato: "\u{1F954}",
            pouch: "\u{1F45D}",
            poultry_leg: "\u{1F357}",
            pound: "\u{1F4B7}",
            rage: "\u{1F621}",
            pouting_cat: "\u{1F63E}",
            pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F",
            pray: "\u{1F64F}",
            prayer_beads: "\u{1F4FF}",
            pregnant_woman: "\u{1F930}",
            previous_track_button: "\u23EE",
            prince: "\u{1F934}",
            princess: "\u{1F478}",
            printer: "\u{1F5A8}",
            purple_heart: "\u{1F49C}",
            purse: "\u{1F45B}",
            pushpin: "\u{1F4CC}",
            put_litter_in_its_place: "\u{1F6AE}",
            question: "\u2753",
            rabbit: "\u{1F430}",
            rabbit2: "\u{1F407}",
            racehorse: "\u{1F40E}",
            racing_car: "\u{1F3CE}",
            radio: "\u{1F4FB}",
            radio_button: "\u{1F518}",
            radioactive: "\u2622\uFE0F",
            railway_car: "\u{1F683}",
            railway_track: "\u{1F6E4}",
            rainbow: "\u{1F308}",
            rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}",
            raised_back_of_hand: "\u{1F91A}",
            raised_hand_with_fingers_splayed: "\u{1F590}",
            raised_hands: "\u{1F64C}",
            raising_hand_woman: "\u{1F64B}",
            raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F",
            ram: "\u{1F40F}",
            ramen: "\u{1F35C}",
            rat: "\u{1F400}",
            record_button: "\u23FA",
            recycle: "\u267B\uFE0F",
            red_circle: "\u{1F534}",
            registered: "\xAE\uFE0F",
            relaxed: "\u263A\uFE0F",
            relieved: "\u{1F60C}",
            reminder_ribbon: "\u{1F397}",
            repeat: "\u{1F501}",
            repeat_one: "\u{1F502}",
            rescue_worker_helmet: "\u26D1",
            restroom: "\u{1F6BB}",
            revolving_hearts: "\u{1F49E}",
            rewind: "\u23EA",
            rhinoceros: "\u{1F98F}",
            ribbon: "\u{1F380}",
            rice: "\u{1F35A}",
            rice_ball: "\u{1F359}",
            rice_cracker: "\u{1F358}",
            rice_scene: "\u{1F391}",
            right_anger_bubble: "\u{1F5EF}",
            ring: "\u{1F48D}",
            robot: "\u{1F916}",
            rocket: "\u{1F680}",
            rofl: "\u{1F923}",
            roll_eyes: "\u{1F644}",
            roller_coaster: "\u{1F3A2}",
            rooster: "\u{1F413}",
            rose: "\u{1F339}",
            rosette: "\u{1F3F5}",
            rotating_light: "\u{1F6A8}",
            round_pushpin: "\u{1F4CD}",
            rowing_man: "\u{1F6A3}",
            rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F",
            rugby_football: "\u{1F3C9}",
            running_man: "\u{1F3C3}",
            running_shirt_with_sash: "\u{1F3BD}",
            running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F",
            sa: "\u{1F202}\uFE0F",
            sagittarius: "\u2650\uFE0F",
            sake: "\u{1F376}",
            sandal: "\u{1F461}",
            santa: "\u{1F385}",
            satellite: "\u{1F4E1}",
            saxophone: "\u{1F3B7}",
            school: "\u{1F3EB}",
            school_satchel: "\u{1F392}",
            scissors: "\u2702\uFE0F",
            scorpion: "\u{1F982}",
            scorpius: "\u264F\uFE0F",
            scream: "\u{1F631}",
            scream_cat: "\u{1F640}",
            scroll: "\u{1F4DC}",
            seat: "\u{1F4BA}",
            secret: "\u3299\uFE0F",
            see_no_evil: "\u{1F648}",
            seedling: "\u{1F331}",
            selfie: "\u{1F933}",
            shallow_pan_of_food: "\u{1F958}",
            shamrock: "\u2618\uFE0F",
            shark: "\u{1F988}",
            shaved_ice: "\u{1F367}",
            sheep: "\u{1F411}",
            shell: "\u{1F41A}",
            shield: "\u{1F6E1}",
            shinto_shrine: "\u26E9",
            ship: "\u{1F6A2}",
            shirt: "\u{1F455}",
            shopping: "\u{1F6CD}",
            shopping_cart: "\u{1F6D2}",
            shower: "\u{1F6BF}",
            shrimp: "\u{1F990}",
            signal_strength: "\u{1F4F6}",
            six_pointed_star: "\u{1F52F}",
            ski: "\u{1F3BF}",
            skier: "\u26F7",
            skull: "\u{1F480}",
            skull_and_crossbones: "\u2620\uFE0F",
            sleeping: "\u{1F634}",
            sleeping_bed: "\u{1F6CC}",
            sleepy: "\u{1F62A}",
            slightly_frowning_face: "\u{1F641}",
            slightly_smiling_face: "\u{1F642}",
            slot_machine: "\u{1F3B0}",
            small_airplane: "\u{1F6E9}",
            small_blue_diamond: "\u{1F539}",
            small_orange_diamond: "\u{1F538}",
            small_red_triangle: "\u{1F53A}",
            small_red_triangle_down: "\u{1F53B}",
            smile: "\u{1F604}",
            smile_cat: "\u{1F638}",
            smiley: "\u{1F603}",
            smiley_cat: "\u{1F63A}",
            smiling_imp: "\u{1F608}",
            smirk: "\u{1F60F}",
            smirk_cat: "\u{1F63C}",
            smoking: "\u{1F6AC}",
            snail: "\u{1F40C}",
            snake: "\u{1F40D}",
            sneezing_face: "\u{1F927}",
            snowboarder: "\u{1F3C2}",
            snowflake: "\u2744\uFE0F",
            snowman: "\u26C4\uFE0F",
            snowman_with_snow: "\u2603\uFE0F",
            sob: "\u{1F62D}",
            soccer: "\u26BD\uFE0F",
            soon: "\u{1F51C}",
            sos: "\u{1F198}",
            sound: "\u{1F509}",
            space_invader: "\u{1F47E}",
            spades: "\u2660\uFE0F",
            spaghetti: "\u{1F35D}",
            sparkle: "\u2747\uFE0F",
            sparkler: "\u{1F387}",
            sparkles: "\u2728",
            sparkling_heart: "\u{1F496}",
            speak_no_evil: "\u{1F64A}",
            speaker: "\u{1F508}",
            speaking_head: "\u{1F5E3}",
            speech_balloon: "\u{1F4AC}",
            speedboat: "\u{1F6A4}",
            spider: "\u{1F577}",
            spider_web: "\u{1F578}",
            spiral_calendar: "\u{1F5D3}",
            spiral_notepad: "\u{1F5D2}",
            spoon: "\u{1F944}",
            squid: "\u{1F991}",
            stadium: "\u{1F3DF}",
            star: "\u2B50\uFE0F",
            star2: "\u{1F31F}",
            star_and_crescent: "\u262A\uFE0F",
            star_of_david: "\u2721\uFE0F",
            stars: "\u{1F320}",
            station: "\u{1F689}",
            statue_of_liberty: "\u{1F5FD}",
            steam_locomotive: "\u{1F682}",
            stew: "\u{1F372}",
            stop_button: "\u23F9",
            stop_sign: "\u{1F6D1}",
            stopwatch: "\u23F1",
            straight_ruler: "\u{1F4CF}",
            strawberry: "\u{1F353}",
            stuck_out_tongue: "\u{1F61B}",
            stuck_out_tongue_closed_eyes: "\u{1F61D}",
            stuck_out_tongue_winking_eye: "\u{1F61C}",
            studio_microphone: "\u{1F399}",
            stuffed_flatbread: "\u{1F959}",
            sun_behind_large_cloud: "\u{1F325}",
            sun_behind_rain_cloud: "\u{1F326}",
            sun_behind_small_cloud: "\u{1F324}",
            sun_with_face: "\u{1F31E}",
            sunflower: "\u{1F33B}",
            sunglasses: "\u{1F60E}",
            sunny: "\u2600\uFE0F",
            sunrise: "\u{1F305}",
            sunrise_over_mountains: "\u{1F304}",
            surfing_man: "\u{1F3C4}",
            surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F",
            sushi: "\u{1F363}",
            suspension_railway: "\u{1F69F}",
            sweat: "\u{1F613}",
            sweat_drops: "\u{1F4A6}",
            sweat_smile: "\u{1F605}",
            sweet_potato: "\u{1F360}",
            swimming_man: "\u{1F3CA}",
            swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F",
            symbols: "\u{1F523}",
            synagogue: "\u{1F54D}",
            syringe: "\u{1F489}",
            taco: "\u{1F32E}",
            tada: "\u{1F389}",
            tanabata_tree: "\u{1F38B}",
            taurus: "\u2649\uFE0F",
            taxi: "\u{1F695}",
            tea: "\u{1F375}",
            telephone_receiver: "\u{1F4DE}",
            telescope: "\u{1F52D}",
            tennis: "\u{1F3BE}",
            tent: "\u26FA\uFE0F",
            thermometer: "\u{1F321}",
            thinking: "\u{1F914}",
            thought_balloon: "\u{1F4AD}",
            ticket: "\u{1F3AB}",
            tickets: "\u{1F39F}",
            tiger: "\u{1F42F}",
            tiger2: "\u{1F405}",
            timer_clock: "\u23F2",
            tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F",
            tired_face: "\u{1F62B}",
            tm: "\u2122\uFE0F",
            toilet: "\u{1F6BD}",
            tokyo_tower: "\u{1F5FC}",
            tomato: "\u{1F345}",
            tongue: "\u{1F445}",
            top: "\u{1F51D}",
            tophat: "\u{1F3A9}",
            tornado: "\u{1F32A}",
            trackball: "\u{1F5B2}",
            tractor: "\u{1F69C}",
            traffic_light: "\u{1F6A5}",
            train: "\u{1F68B}",
            train2: "\u{1F686}",
            tram: "\u{1F68A}",
            triangular_flag_on_post: "\u{1F6A9}",
            triangular_ruler: "\u{1F4D0}",
            trident: "\u{1F531}",
            triumph: "\u{1F624}",
            trolleybus: "\u{1F68E}",
            trophy: "\u{1F3C6}",
            tropical_drink: "\u{1F379}",
            tropical_fish: "\u{1F420}",
            truck: "\u{1F69A}",
            trumpet: "\u{1F3BA}",
            tulip: "\u{1F337}",
            tumbler_glass: "\u{1F943}",
            turkey: "\u{1F983}",
            turtle: "\u{1F422}",
            tv: "\u{1F4FA}",
            twisted_rightwards_arrows: "\u{1F500}",
            two_hearts: "\u{1F495}",
            two_men_holding_hands: "\u{1F46C}",
            two_women_holding_hands: "\u{1F46D}",
            u5272: "\u{1F239}",
            u5408: "\u{1F234}",
            u55b6: "\u{1F23A}",
            u6307: "\u{1F22F}\uFE0F",
            u6708: "\u{1F237}\uFE0F",
            u6709: "\u{1F236}",
            u6e80: "\u{1F235}",
            u7121: "\u{1F21A}\uFE0F",
            u7533: "\u{1F238}",
            u7981: "\u{1F232}",
            u7a7a: "\u{1F233}",
            umbrella: "\u2614\uFE0F",
            unamused: "\u{1F612}",
            underage: "\u{1F51E}",
            unicorn: "\u{1F984}",
            unlock: "\u{1F513}",
            up: "\u{1F199}",
            upside_down_face: "\u{1F643}",
            v: "\u270C\uFE0F",
            vertical_traffic_light: "\u{1F6A6}",
            vhs: "\u{1F4FC}",
            vibration_mode: "\u{1F4F3}",
            video_camera: "\u{1F4F9}",
            video_game: "\u{1F3AE}",
            violin: "\u{1F3BB}",
            virgo: "\u264D\uFE0F",
            volcano: "\u{1F30B}",
            volleyball: "\u{1F3D0}",
            vs: "\u{1F19A}",
            vulcan_salute: "\u{1F596}",
            walking_man: "\u{1F6B6}",
            walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F",
            waning_crescent_moon: "\u{1F318}",
            waning_gibbous_moon: "\u{1F316}",
            warning: "\u26A0\uFE0F",
            wastebasket: "\u{1F5D1}",
            watch: "\u231A\uFE0F",
            water_buffalo: "\u{1F403}",
            watermelon: "\u{1F349}",
            wave: "\u{1F44B}",
            wavy_dash: "\u3030\uFE0F",
            waxing_crescent_moon: "\u{1F312}",
            wc: "\u{1F6BE}",
            weary: "\u{1F629}",
            wedding: "\u{1F492}",
            weight_lifting_man: "\u{1F3CB}\uFE0F",
            weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F",
            whale: "\u{1F433}",
            whale2: "\u{1F40B}",
            wheel_of_dharma: "\u2638\uFE0F",
            wheelchair: "\u267F\uFE0F",
            white_check_mark: "\u2705",
            white_circle: "\u26AA\uFE0F",
            white_flag: "\u{1F3F3}\uFE0F",
            white_flower: "\u{1F4AE}",
            white_large_square: "\u2B1C\uFE0F",
            white_medium_small_square: "\u25FD\uFE0F",
            white_medium_square: "\u25FB\uFE0F",
            white_small_square: "\u25AB\uFE0F",
            white_square_button: "\u{1F533}",
            wilted_flower: "\u{1F940}",
            wind_chime: "\u{1F390}",
            wind_face: "\u{1F32C}",
            wine_glass: "\u{1F377}",
            wink: "\u{1F609}",
            wolf: "\u{1F43A}",
            woman: "\u{1F469}",
            woman_artist: "\u{1F469}&zwj;\u{1F3A8}",
            woman_astronaut: "\u{1F469}&zwj;\u{1F680}",
            woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F",
            woman_cook: "\u{1F469}&zwj;\u{1F373}",
            woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F",
            woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}",
            woman_farmer: "\u{1F469}&zwj;\u{1F33E}",
            woman_firefighter: "\u{1F469}&zwj;\u{1F692}",
            woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F",
            woman_judge: "\u{1F469}&zwj;\u2696\uFE0F",
            woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F",
            woman_mechanic: "\u{1F469}&zwj;\u{1F527}",
            woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}",
            woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F",
            woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F",
            woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F",
            woman_scientist: "\u{1F469}&zwj;\u{1F52C}",
            woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F",
            woman_singer: "\u{1F469}&zwj;\u{1F3A4}",
            woman_student: "\u{1F469}&zwj;\u{1F393}",
            woman_teacher: "\u{1F469}&zwj;\u{1F3EB}",
            woman_technologist: "\u{1F469}&zwj;\u{1F4BB}",
            woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F",
            womans_clothes: "\u{1F45A}",
            womans_hat: "\u{1F452}",
            women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F",
            womens: "\u{1F6BA}",
            world_map: "\u{1F5FA}",
            worried: "\u{1F61F}",
            wrench: "\u{1F527}",
            writing_hand: "\u270D\uFE0F",
            x: "\u274C",
            yellow_heart: "\u{1F49B}",
            yen: "\u{1F4B4}",
            yin_yang: "\u262F\uFE0F",
            yum: "\u{1F60B}",
            zap: "\u26A1\uFE0F",
            zipper_mouth_face: "\u{1F910}",
            zzz: "\u{1F4A4}",
            octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
            showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
        },
        n.Converter = function(o) {
            var p = {}
              , f = []
              , x = []
              , E = {}
              , j = l
              , C = {
                parsed: {},
                raw: "",
                format: ""
            };
            S();
            function S() {
                o = o || {};
                for (var y in c)
                    c.hasOwnProperty(y) && (p[y] = c[y]);
                if (typeof o == "object")
                    for (var O in o)
                        o.hasOwnProperty(O) && (p[O] = o[O]);
                else
                    throw Error("Converter expects the passed parameter to be an object, but " + typeof o + " was passed instead.");
                p.extensions && n.helper.forEach(p.extensions, T)
            }
            function T(y, O) {
                if (O = O || null,
                n.helper.isString(y))
                    if (y = n.helper.stdExtName(y),
                    O = y,
                    n.extensions[y]) {
                        console.warn("DEPRECATION WARNING: " + y + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),
                        P(n.extensions[y], y);
                        return
                    } else if (!n.helper.isUndefined(a[y]))
                        y = a[y];
                    else
                        throw Error('Extension "' + y + '" could not be loaded. It was either not found or is not a valid extension.');
                typeof y == "function" && (y = y()),
                n.helper.isArray(y) || (y = [y]);
                var A = m(y, O);
                if (!A.valid)
                    throw Error(A.error);
                for (var L = 0; L < y.length; ++L) {
                    switch (y[L].type) {
                    case "lang":
                        f.push(y[L]);
                        break;
                    case "output":
                        x.push(y[L]);
                        break
                    }
                    if (y[L].hasOwnProperty("listeners"))
                        for (var z in y[L].listeners)
                            y[L].listeners.hasOwnProperty(z) && R(z, y[L].listeners[z])
                }
            }
            function P(y, O) {
                typeof y == "function" && (y = y(new n.Converter)),
                n.helper.isArray(y) || (y = [y]);
                var A = m(y, O);
                if (!A.valid)
                    throw Error(A.error);
                for (var L = 0; L < y.length; ++L)
                    switch (y[L].type) {
                    case "lang":
                        f.push(y[L]);
                        break;
                    case "output":
                        x.push(y[L]);
                        break;
                    default:
                        throw Error("Extension loader error: Type unrecognized!!!")
                    }
            }
            function R(y, O) {
                if (!n.helper.isString(y))
                    throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof y + " given");
                if (typeof O != "function")
                    throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof O + " given");
                E.hasOwnProperty(y) || (E[y] = []),
                E[y].push(O)
            }
            function N(y) {
                var O = y.match(/^\s*/)[0].length
                  , A = new RegExp("^\\s{0," + O + "}","gm");
                return y.replace(A, "")
            }
            this._dispatch = function(y, O, A, L) {
                if (E.hasOwnProperty(y))
                    for (var z = 0; z < E[y].length; ++z) {
                        var F = E[y][z](y, O, this, A, L);
                        F && typeof F < "u" && (O = F)
                    }
                return O
            }
            ,
            this.listen = function(y, O) {
                return R(y, O),
                this
            }
            ,
            this.makeHtml = function(y) {
                if (!y)
                    return y;
                var O = {
                    gHtmlBlocks: [],
                    gHtmlMdBlocks: [],
                    gHtmlSpans: [],
                    gUrls: {},
                    gTitles: {},
                    gDimensions: {},
                    gListLevel: 0,
                    hashLinkCounts: {},
                    langExtensions: f,
                    outputModifiers: x,
                    converter: this,
                    ghCodeBlocks: [],
                    metadata: {
                        parsed: {},
                        raw: "",
                        format: ""
                    }
                };
                return y = y.replace(/¨/g, "\xA8T"),
                y = y.replace(/\$/g, "\xA8D"),
                y = y.replace(/\r\n/g, `
`),
                y = y.replace(/\r/g, `
`),
                y = y.replace(/\u00A0/g, "&nbsp;"),
                p.smartIndentationFix && (y = N(y)),
                y = `

` + y + `

`,
                y = n.subParser("detab")(y, p, O),
                y = y.replace(/^[ \t]+$/mg, ""),
                n.helper.forEach(f, function(A) {
                    y = n.subParser("runExtension")(A, y, p, O)
                }),
                y = n.subParser("metadata")(y, p, O),
                y = n.subParser("hashPreCodeTags")(y, p, O),
                y = n.subParser("githubCodeBlocks")(y, p, O),
                y = n.subParser("hashHTMLBlocks")(y, p, O),
                y = n.subParser("hashCodeTags")(y, p, O),
                y = n.subParser("stripLinkDefinitions")(y, p, O),
                y = n.subParser("blockGamut")(y, p, O),
                y = n.subParser("unhashHTMLSpans")(y, p, O),
                y = n.subParser("unescapeSpecialChars")(y, p, O),
                y = y.replace(/¨D/g, "$$"),
                y = y.replace(/¨T/g, "\xA8"),
                y = n.subParser("completeHTMLDocument")(y, p, O),
                n.helper.forEach(x, function(A) {
                    y = n.subParser("runExtension")(A, y, p, O)
                }),
                C = O.metadata,
                y
            }
            ,
            this.makeMarkdown = this.makeMd = function(y, O) {
                if (y = y.replace(/\r\n/g, `
`),
                y = y.replace(/\r/g, `
`),
                y = y.replace(/>[ \t]+</, ">\xA8NBSP;<"),
                !O)
                    if (window && window.document)
                        O = window.document;
                    else
                        throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
                var A = O.createElement("div");
                A.innerHTML = y;
                var L = {
                    preList: V(A)
                };
                U(A);
                for (var z = A.childNodes, F = "", B = 0; B < z.length; B++)
                    F += n.subParser("makeMarkdown.node")(z[B], L);
                function U($) {
                    for (var W = 0; W < $.childNodes.length; ++W) {
                        var K = $.childNodes[W];
                        K.nodeType === 3 ? !/\S/.test(K.nodeValue) && !/^[ ]+$/.test(K.nodeValue) ? ($.removeChild(K),
                        --W) : (K.nodeValue = K.nodeValue.split(`
`).join(" "),
                        K.nodeValue = K.nodeValue.replace(/(\s)+/g, "$1")) : K.nodeType === 1 && U(K)
                    }
                }
                function V($) {
                    for (var W = $.querySelectorAll("pre"), K = [], Q = 0; Q < W.length; ++Q)
                        if (W[Q].childElementCount === 1 && W[Q].firstChild.tagName.toLowerCase() === "code") {
                            var ve = W[Q].firstChild.innerHTML.trim()
                              , Me = W[Q].firstChild.getAttribute("data-language") || "";
                            if (Me === "")
                                for (var ze = W[Q].firstChild.className.split(" "), Qe = 0; Qe < ze.length; ++Qe) {
                                    var Oe = ze[Qe].match(/^language-(.+)$/);
                                    if (Oe !== null) {
                                        Me = Oe[1];
                                        break
                                    }
                                }
                            ve = n.helper.unescapeHTMLEntities(ve),
                            K.push(ve),
                            W[Q].outerHTML = '<precode language="' + Me + '" precodenum="' + Q.toString() + '"></precode>'
                        } else
                            K.push(W[Q].innerHTML),
                            W[Q].innerHTML = "",
                            W[Q].setAttribute("prenum", Q.toString());
                    return K
                }
                return F
            }
            ,
            this.setOption = function(y, O) {
                p[y] = O
            }
            ,
            this.getOption = function(y) {
                return p[y]
            }
            ,
            this.getOptions = function() {
                return p
            }
            ,
            this.addExtension = function(y, O) {
                O = O || null,
                T(y, O)
            }
            ,
            this.useExtension = function(y) {
                T(y)
            }
            ,
            this.setFlavor = function(y) {
                if (!u.hasOwnProperty(y))
                    throw Error(y + " flavor was not found");
                var O = u[y];
                j = y;
                for (var A in O)
                    O.hasOwnProperty(A) && (p[A] = O[A])
            }
            ,
            this.getFlavor = function() {
                return j
            }
            ,
            this.removeExtension = function(y) {
                n.helper.isArray(y) || (y = [y]);
                for (var O = 0; O < y.length; ++O) {
                    for (var A = y[O], L = 0; L < f.length; ++L)
                        f[L] === A && f.splice(L, 1);
                    for (var z = 0; z < x.length; ++z)
                        x[z] === A && x.splice(z, 1)
                }
            }
            ,
            this.getAllExtensions = function() {
                return {
                    language: f,
                    output: x
                }
            }
            ,
            this.getMetadata = function(y) {
                return y ? C.raw : C.parsed
            }
            ,
            this.getMetadataFormat = function() {
                return C.format
            }
            ,
            this._setMetadataPair = function(y, O) {
                C.parsed[y] = O
            }
            ,
            this._setMetadataFormat = function(y) {
                C.format = y
            }
            ,
            this._setMetadataRaw = function(y) {
                C.raw = y
            }
        }
        ,
        n.subParser("anchors", function(o, p, f) {
            o = f.converter._dispatch("anchors.before", o, p, f);
            var x = function(E, j, C, S, T, P, R) {
                if (n.helper.isUndefined(R) && (R = ""),
                C = C.toLowerCase(),
                E.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
                    S = "";
                else if (!S)
                    if (C || (C = j.toLowerCase().replace(/ ?\n/g, " ")),
                    S = "#" + C,
                    !n.helper.isUndefined(f.gUrls[C]))
                        S = f.gUrls[C],
                        n.helper.isUndefined(f.gTitles[C]) || (R = f.gTitles[C]);
                    else
                        return E;
                S = S.replace(n.helper.regexes.asteriskDashAndColon, n.helper.escapeCharactersCallback);
                var N = '<a href="' + S + '"';
                return R !== "" && R !== null && (R = R.replace(/"/g, "&quot;"),
                R = R.replace(n.helper.regexes.asteriskDashAndColon, n.helper.escapeCharactersCallback),
                N += ' title="' + R + '"'),
                p.openLinksInNewWindow && !/^#/.test(S) && (N += ' rel="noopener noreferrer" target="\xA8E95Eblank"'),
                N += ">" + j + "</a>",
                N
            };
            return o = o.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, x),
            o = o.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, x),
            o = o.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, x),
            o = o.replace(/\[([^\[\]]+)]()()()()()/g, x),
            p.ghMentions && (o = o.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(E, j, C, S, T) {
                if (C === "\\")
                    return j + S;
                if (!n.helper.isString(p.ghMentionsLink))
                    throw new Error("ghMentionsLink option must be a string");
                var P = p.ghMentionsLink.replace(/\{u}/g, T)
                  , R = "";
                return p.openLinksInNewWindow && (R = ' rel="noopener noreferrer" target="\xA8E95Eblank"'),
                j + '<a href="' + P + '"' + R + ">" + S + "</a>"
            })),
            o = f.converter._dispatch("anchors.after", o, p, f),
            o
        });
        var w = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi
          , k = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi
          , b = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi
          , g = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi
          , _ = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi
          , I = function(o) {
            return function(p, f, x, E, j, C, S) {
                x = x.replace(n.helper.regexes.asteriskDashAndColon, n.helper.escapeCharactersCallback);
                var T = x
                  , P = ""
                  , R = ""
                  , N = f || ""
                  , y = S || "";
                return /^www\./i.test(x) && (x = x.replace(/^www\./i, "http://www.")),
                o.excludeTrailingPunctuationFromURLs && C && (P = C),
                o.openLinksInNewWindow && (R = ' rel="noopener noreferrer" target="\xA8E95Eblank"'),
                N + '<a href="' + x + '"' + R + ">" + T + "</a>" + P + y
            }
        }
          , M = function(o, p) {
            return function(f, x, E) {
                var j = "mailto:";
                return x = x || "",
                E = n.subParser("unescapeSpecialChars")(E, o, p),
                o.encodeEmails ? (j = n.helper.encodeEmailAddress(j + E),
                E = n.helper.encodeEmailAddress(E)) : j = j + E,
                x + '<a href="' + j + '">' + E + "</a>"
            }
        };
        n.subParser("autoLinks", function(o, p, f) {
            return o = f.converter._dispatch("autoLinks.before", o, p, f),
            o = o.replace(b, I(p)),
            o = o.replace(_, M(p, f)),
            o = f.converter._dispatch("autoLinks.after", o, p, f),
            o
        }),
        n.subParser("simplifiedAutoLinks", function(o, p, f) {
            return p.simplifiedAutoLink && (o = f.converter._dispatch("simplifiedAutoLinks.before", o, p, f),
            p.excludeTrailingPunctuationFromURLs ? o = o.replace(k, I(p)) : o = o.replace(w, I(p)),
            o = o.replace(g, M(p, f)),
            o = f.converter._dispatch("simplifiedAutoLinks.after", o, p, f)),
            o
        }),
        n.subParser("blockGamut", function(o, p, f) {
            return o = f.converter._dispatch("blockGamut.before", o, p, f),
            o = n.subParser("blockQuotes")(o, p, f),
            o = n.subParser("headers")(o, p, f),
            o = n.subParser("horizontalRule")(o, p, f),
            o = n.subParser("lists")(o, p, f),
            o = n.subParser("codeBlocks")(o, p, f),
            o = n.subParser("tables")(o, p, f),
            o = n.subParser("hashHTMLBlocks")(o, p, f),
            o = n.subParser("paragraphs")(o, p, f),
            o = f.converter._dispatch("blockGamut.after", o, p, f),
            o
        }),
        n.subParser("blockQuotes", function(o, p, f) {
            o = f.converter._dispatch("blockQuotes.before", o, p, f),
            o = o + `

`;
            var x = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
            return p.splitAdjacentBlockquotes && (x = /^ {0,3}>[\s\S]*?(?:\n\n)/gm),
            o = o.replace(x, function(E) {
                return E = E.replace(/^[ \t]*>[ \t]?/gm, ""),
                E = E.replace(/¨0/g, ""),
                E = E.replace(/^[ \t]+$/gm, ""),
                E = n.subParser("githubCodeBlocks")(E, p, f),
                E = n.subParser("blockGamut")(E, p, f),
                E = E.replace(/(^|\n)/g, "$1  "),
                E = E.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(j, C) {
                    var S = C;
                    return S = S.replace(/^  /mg, "\xA80"),
                    S = S.replace(/¨0/g, ""),
                    S
                }),
                n.subParser("hashBlock")(`<blockquote>
` + E + `
</blockquote>`, p, f)
            }),
            o = f.converter._dispatch("blockQuotes.after", o, p, f),
            o
        }),
        n.subParser("codeBlocks", function(o, p, f) {
            o = f.converter._dispatch("codeBlocks.before", o, p, f),
            o += "\xA80";
            var x = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
            return o = o.replace(x, function(E, j, C) {
                var S = j
                  , T = C
                  , P = `
`;
                return S = n.subParser("outdent")(S, p, f),
                S = n.subParser("encodeCode")(S, p, f),
                S = n.subParser("detab")(S, p, f),
                S = S.replace(/^\n+/g, ""),
                S = S.replace(/\n+$/g, ""),
                p.omitExtraWLInCodeBlocks && (P = ""),
                S = "<pre><code>" + S + P + "</code></pre>",
                n.subParser("hashBlock")(S, p, f) + T
            }),
            o = o.replace(/¨0/, ""),
            o = f.converter._dispatch("codeBlocks.after", o, p, f),
            o
        }),
        n.subParser("codeSpans", function(o, p, f) {
            return o = f.converter._dispatch("codeSpans.before", o, p, f),
            typeof o > "u" && (o = ""),
            o = o.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(x, E, j, C) {
                var S = C;
                return S = S.replace(/^([ \t]*)/g, ""),
                S = S.replace(/[ \t]*$/g, ""),
                S = n.subParser("encodeCode")(S, p, f),
                S = E + "<code>" + S + "</code>",
                S = n.subParser("hashHTMLSpans")(S, p, f),
                S
            }),
            o = f.converter._dispatch("codeSpans.after", o, p, f),
            o
        }),
        n.subParser("completeHTMLDocument", function(o, p, f) {
            if (!p.completeHTMLDocument)
                return o;
            o = f.converter._dispatch("completeHTMLDocument.before", o, p, f);
            var x = "html"
              , E = `<!DOCTYPE HTML>
`
              , j = ""
              , C = `<meta charset="utf-8">
`
              , S = ""
              , T = "";
            typeof f.metadata.parsed.doctype < "u" && (E = "<!DOCTYPE " + f.metadata.parsed.doctype + `>
`,
            x = f.metadata.parsed.doctype.toString().toLowerCase(),
            (x === "html" || x === "html5") && (C = '<meta charset="utf-8">'));
            for (var P in f.metadata.parsed)
                if (f.metadata.parsed.hasOwnProperty(P))
                    switch (P.toLowerCase()) {
                    case "doctype":
                        break;
                    case "title":
                        j = "<title>" + f.metadata.parsed.title + `</title>
`;
                        break;
                    case "charset":
                        x === "html" || x === "html5" ? C = '<meta charset="' + f.metadata.parsed.charset + `">
` : C = '<meta name="charset" content="' + f.metadata.parsed.charset + `">
`;
                        break;
                    case "language":
                    case "lang":
                        S = ' lang="' + f.metadata.parsed[P] + '"',
                        T += '<meta name="' + P + '" content="' + f.metadata.parsed[P] + `">
`;
                        break;
                    default:
                        T += '<meta name="' + P + '" content="' + f.metadata.parsed[P] + `">
`
                    }
            return o = E + "<html" + S + `>
<head>
` + j + C + T + `</head>
<body>
` + o.trim() + `
</body>
</html>`,
            o = f.converter._dispatch("completeHTMLDocument.after", o, p, f),
            o
        }),
        n.subParser("detab", function(o, p, f) {
            return o = f.converter._dispatch("detab.before", o, p, f),
            o = o.replace(/\t(?=\t)/g, "    "),
            o = o.replace(/\t/g, "\xA8A\xA8B"),
            o = o.replace(/¨B(.+?)¨A/g, function(x, E) {
                for (var j = E, C = 4 - j.length % 4, S = 0; S < C; S++)
                    j += " ";
                return j
            }),
            o = o.replace(/¨A/g, "    "),
            o = o.replace(/¨B/g, ""),
            o = f.converter._dispatch("detab.after", o, p, f),
            o
        }),
        n.subParser("ellipsis", function(o, p, f) {
            return p.ellipsis && (o = f.converter._dispatch("ellipsis.before", o, p, f),
            o = o.replace(/\.\.\./g, "\u2026"),
            o = f.converter._dispatch("ellipsis.after", o, p, f)),
            o
        }),
        n.subParser("emoji", function(o, p, f) {
            if (!p.emoji)
                return o;
            o = f.converter._dispatch("emoji.before", o, p, f);
            var x = /:([\S]+?):/g;
            return o = o.replace(x, function(E, j) {
                return n.helper.emojis.hasOwnProperty(j) ? n.helper.emojis[j] : E
            }),
            o = f.converter._dispatch("emoji.after", o, p, f),
            o
        }),
        n.subParser("encodeAmpsAndAngles", function(o, p, f) {
            return o = f.converter._dispatch("encodeAmpsAndAngles.before", o, p, f),
            o = o.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"),
            o = o.replace(/<(?![a-z\/?$!])/gi, "&lt;"),
            o = o.replace(/</g, "&lt;"),
            o = o.replace(/>/g, "&gt;"),
            o = f.converter._dispatch("encodeAmpsAndAngles.after", o, p, f),
            o
        }),
        n.subParser("encodeBackslashEscapes", function(o, p, f) {
            return o = f.converter._dispatch("encodeBackslashEscapes.before", o, p, f),
            o = o.replace(/\\(\\)/g, n.helper.escapeCharactersCallback),
            o = o.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, n.helper.escapeCharactersCallback),
            o = f.converter._dispatch("encodeBackslashEscapes.after", o, p, f),
            o
        }),
        n.subParser("encodeCode", function(o, p, f) {
            return o = f.converter._dispatch("encodeCode.before", o, p, f),
            o = o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, n.helper.escapeCharactersCallback),
            o = f.converter._dispatch("encodeCode.after", o, p, f),
            o
        }),
        n.subParser("escapeSpecialCharsWithinTagAttributes", function(o, p, f) {
            o = f.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", o, p, f);
            var x = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi
              , E = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
            return o = o.replace(x, function(j) {
                return j.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, n.helper.escapeCharactersCallback)
            }),
            o = o.replace(E, function(j) {
                return j.replace(/([\\`*_~=|])/g, n.helper.escapeCharactersCallback)
            }),
            o = f.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", o, p, f),
            o
        }),
        n.subParser("githubCodeBlocks", function(o, p, f) {
            return p.ghCodeBlocks ? (o = f.converter._dispatch("githubCodeBlocks.before", o, p, f),
            o += "\xA80",
            o = o.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(x, E, j, C) {
                var S = p.omitExtraWLInCodeBlocks ? "" : `
`;
                return C = n.subParser("encodeCode")(C, p, f),
                C = n.subParser("detab")(C, p, f),
                C = C.replace(/^\n+/g, ""),
                C = C.replace(/\n+$/g, ""),
                C = "<pre><code" + (j ? ' class="' + j + " language-" + j + '"' : "") + ">" + C + S + "</code></pre>",
                C = n.subParser("hashBlock")(C, p, f),
                `

\xA8G` + (f.ghCodeBlocks.push({
                    text: x,
                    codeblock: C
                }) - 1) + `G

`
            }),
            o = o.replace(/¨0/, ""),
            f.converter._dispatch("githubCodeBlocks.after", o, p, f)) : o
        }),
        n.subParser("hashBlock", function(o, p, f) {
            return o = f.converter._dispatch("hashBlock.before", o, p, f),
            o = o.replace(/(^\n+|\n+$)/g, ""),
            o = `

\xA8K` + (f.gHtmlBlocks.push(o) - 1) + `K

`,
            o = f.converter._dispatch("hashBlock.after", o, p, f),
            o
        }),
        n.subParser("hashCodeTags", function(o, p, f) {
            o = f.converter._dispatch("hashCodeTags.before", o, p, f);
            var x = function(E, j, C, S) {
                var T = C + n.subParser("encodeCode")(j, p, f) + S;
                return "\xA8C" + (f.gHtmlSpans.push(T) - 1) + "C"
            };
            return o = n.helper.replaceRecursiveRegExp(o, x, "<code\\b[^>]*>", "</code>", "gim"),
            o = f.converter._dispatch("hashCodeTags.after", o, p, f),
            o
        }),
        n.subParser("hashElement", function(o, p, f) {
            return function(x, E) {
                var j = E;
                return j = j.replace(/\n\n/g, `
`),
                j = j.replace(/^\n/, ""),
                j = j.replace(/\n+$/g, ""),
                j = `

\xA8K` + (f.gHtmlBlocks.push(j) - 1) + `K

`,
                j
            }
        }),
        n.subParser("hashHTMLBlocks", function(o, p, f) {
            o = f.converter._dispatch("hashHTMLBlocks.before", o, p, f);
            var x = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"]
              , E = function(y, O, A, L) {
                var z = y;
                return A.search(/\bmarkdown\b/) !== -1 && (z = A + f.converter.makeHtml(O) + L),
                `

\xA8K` + (f.gHtmlBlocks.push(z) - 1) + `K

`
            };
            p.backslashEscapesHTMLTags && (o = o.replace(/\\<(\/?[^>]+?)>/g, function(y, O) {
                return "&lt;" + O + "&gt;"
            }));
            for (var j = 0; j < x.length; ++j)
                for (var C, S = new RegExp("^ {0,3}(<" + x[j] + "\\b[^>]*>)","im"), T = "<" + x[j] + "\\b[^>]*>", P = "</" + x[j] + ">"; (C = n.helper.regexIndexOf(o, S)) !== -1; ) {
                    var R = n.helper.splitAtIndex(o, C)
                      , N = n.helper.replaceRecursiveRegExp(R[1], E, T, P, "im");
                    if (N === R[1])
                        break;
                    o = R[0].concat(N)
                }
            return o = o.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, n.subParser("hashElement")(o, p, f)),
            o = n.helper.replaceRecursiveRegExp(o, function(y) {
                return `

\xA8K` + (f.gHtmlBlocks.push(y) - 1) + `K

`
            }, "^ {0,3}<!--", "-->", "gm"),
            o = o.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, n.subParser("hashElement")(o, p, f)),
            o = f.converter._dispatch("hashHTMLBlocks.after", o, p, f),
            o
        }),
        n.subParser("hashHTMLSpans", function(o, p, f) {
            o = f.converter._dispatch("hashHTMLSpans.before", o, p, f);
            function x(E) {
                return "\xA8C" + (f.gHtmlSpans.push(E) - 1) + "C"
            }
            return o = o.replace(/<[^>]+?\/>/gi, function(E) {
                return x(E)
            }),
            o = o.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(E) {
                return x(E)
            }),
            o = o.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(E) {
                return x(E)
            }),
            o = o.replace(/<[^>]+?>/gi, function(E) {
                return x(E)
            }),
            o = f.converter._dispatch("hashHTMLSpans.after", o, p, f),
            o
        }),
        n.subParser("unhashHTMLSpans", function(o, p, f) {
            o = f.converter._dispatch("unhashHTMLSpans.before", o, p, f);
            for (var x = 0; x < f.gHtmlSpans.length; ++x) {
                for (var E = f.gHtmlSpans[x], j = 0; /¨C(\d+)C/.test(E); ) {
                    var C = RegExp.$1;
                    if (E = E.replace("\xA8C" + C + "C", f.gHtmlSpans[C]),
                    j === 10) {
                        console.error("maximum nesting of 10 spans reached!!!");
                        break
                    }
                    ++j
                }
                o = o.replace("\xA8C" + x + "C", E)
            }
            return o = f.converter._dispatch("unhashHTMLSpans.after", o, p, f),
            o
        }),
        n.subParser("hashPreCodeTags", function(o, p, f) {
            o = f.converter._dispatch("hashPreCodeTags.before", o, p, f);
            var x = function(E, j, C, S) {
                var T = C + n.subParser("encodeCode")(j, p, f) + S;
                return `

\xA8G` + (f.ghCodeBlocks.push({
                    text: E,
                    codeblock: T
                }) - 1) + `G

`
            };
            return o = n.helper.replaceRecursiveRegExp(o, x, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"),
            o = f.converter._dispatch("hashPreCodeTags.after", o, p, f),
            o
        }),
        n.subParser("headers", function(o, p, f) {
            o = f.converter._dispatch("headers.before", o, p, f);
            var x = isNaN(parseInt(p.headerLevelStart)) ? 1 : parseInt(p.headerLevelStart)
              , E = p.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm
              , j = p.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
            o = o.replace(E, function(T, P) {
                var R = n.subParser("spanGamut")(P, p, f)
                  , N = p.noHeaderId ? "" : ' id="' + S(P) + '"'
                  , y = x
                  , O = "<h" + y + N + ">" + R + "</h" + y + ">";
                return n.subParser("hashBlock")(O, p, f)
            }),
            o = o.replace(j, function(T, P) {
                var R = n.subParser("spanGamut")(P, p, f)
                  , N = p.noHeaderId ? "" : ' id="' + S(P) + '"'
                  , y = x + 1
                  , O = "<h" + y + N + ">" + R + "</h" + y + ">";
                return n.subParser("hashBlock")(O, p, f)
            });
            var C = p.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
            o = o.replace(C, function(T, P, R) {
                var N = R;
                p.customizedHeaderId && (N = R.replace(/\s?\{([^{]+?)}\s*$/, ""));
                var y = n.subParser("spanGamut")(N, p, f)
                  , O = p.noHeaderId ? "" : ' id="' + S(R) + '"'
                  , A = x - 1 + P.length
                  , L = "<h" + A + O + ">" + y + "</h" + A + ">";
                return n.subParser("hashBlock")(L, p, f)
            });
            function S(T) {
                var P, R;
                if (p.customizedHeaderId) {
                    var N = T.match(/\{([^{]+?)}\s*$/);
                    N && N[1] && (T = N[1])
                }
                return P = T,
                n.helper.isString(p.prefixHeaderId) ? R = p.prefixHeaderId : p.prefixHeaderId === !0 ? R = "section-" : R = "",
                p.rawPrefixHeaderId || (P = R + P),
                p.ghCompatibleHeaderId ? P = P.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : p.rawHeaderId ? P = P.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : P = P.replace(/[^\w]/g, "").toLowerCase(),
                p.rawPrefixHeaderId && (P = R + P),
                f.hashLinkCounts[P] ? P = P + "-" + f.hashLinkCounts[P]++ : f.hashLinkCounts[P] = 1,
                P
            }
            return o = f.converter._dispatch("headers.after", o, p, f),
            o
        }),
        n.subParser("horizontalRule", function(o, p, f) {
            o = f.converter._dispatch("horizontalRule.before", o, p, f);
            var x = n.subParser("hashBlock")("<hr />", p, f);
            return o = o.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, x),
            o = o.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, x),
            o = o.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, x),
            o = f.converter._dispatch("horizontalRule.after", o, p, f),
            o
        }),
        n.subParser("images", function(o, p, f) {
            o = f.converter._dispatch("images.before", o, p, f);
            var x = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g
              , E = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g
              , j = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g
              , C = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g
              , S = /!\[([^\[\]]+)]()()()()()/g;
            function T(R, N, y, O, A, L, z, F) {
                return O = O.replace(/\s/g, ""),
                P(R, N, y, O, A, L, z, F)
            }
            function P(R, N, y, O, A, L, z, F) {
                var B = f.gUrls
                  , U = f.gTitles
                  , V = f.gDimensions;
                if (y = y.toLowerCase(),
                F || (F = ""),
                R.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
                    O = "";
                else if (O === "" || O === null)
                    if ((y === "" || y === null) && (y = N.toLowerCase().replace(/ ?\n/g, " ")),
                    O = "#" + y,
                    !n.helper.isUndefined(B[y]))
                        O = B[y],
                        n.helper.isUndefined(U[y]) || (F = U[y]),
                        n.helper.isUndefined(V[y]) || (A = V[y].width,
                        L = V[y].height);
                    else
                        return R;
                N = N.replace(/"/g, "&quot;").replace(n.helper.regexes.asteriskDashAndColon, n.helper.escapeCharactersCallback),
                O = O.replace(n.helper.regexes.asteriskDashAndColon, n.helper.escapeCharactersCallback);
                var $ = '<img src="' + O + '" alt="' + N + '"';
                return F && n.helper.isString(F) && (F = F.replace(/"/g, "&quot;").replace(n.helper.regexes.asteriskDashAndColon, n.helper.escapeCharactersCallback),
                $ += ' title="' + F + '"'),
                A && L && (A = A === "*" ? "auto" : A,
                L = L === "*" ? "auto" : L,
                $ += ' width="' + A + '"',
                $ += ' height="' + L + '"'),
                $ += " />",
                $
            }
            return o = o.replace(C, P),
            o = o.replace(j, T),
            o = o.replace(E, P),
            o = o.replace(x, P),
            o = o.replace(S, P),
            o = f.converter._dispatch("images.after", o, p, f),
            o
        }),
        n.subParser("italicsAndBold", function(o, p, f) {
            o = f.converter._dispatch("italicsAndBold.before", o, p, f);
            function x(E, j, C) {
                return j + E + C
            }
            return p.literalMidWordUnderscores ? (o = o.replace(/\b___(\S[\s\S]*?)___\b/g, function(E, j) {
                return x(j, "<strong><em>", "</em></strong>")
            }),
            o = o.replace(/\b__(\S[\s\S]*?)__\b/g, function(E, j) {
                return x(j, "<strong>", "</strong>")
            }),
            o = o.replace(/\b_(\S[\s\S]*?)_\b/g, function(E, j) {
                return x(j, "<em>", "</em>")
            })) : (o = o.replace(/___(\S[\s\S]*?)___/g, function(E, j) {
                return /\S$/.test(j) ? x(j, "<strong><em>", "</em></strong>") : E
            }),
            o = o.replace(/__(\S[\s\S]*?)__/g, function(E, j) {
                return /\S$/.test(j) ? x(j, "<strong>", "</strong>") : E
            }),
            o = o.replace(/_([^\s_][\s\S]*?)_/g, function(E, j) {
                return /\S$/.test(j) ? x(j, "<em>", "</em>") : E
            })),
            p.literalMidWordAsterisks ? (o = o.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(E, j, C) {
                return x(C, j + "<strong><em>", "</em></strong>")
            }),
            o = o.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(E, j, C) {
                return x(C, j + "<strong>", "</strong>")
            }),
            o = o.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(E, j, C) {
                return x(C, j + "<em>", "</em>")
            })) : (o = o.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(E, j) {
                return /\S$/.test(j) ? x(j, "<strong><em>", "</em></strong>") : E
            }),
            o = o.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(E, j) {
                return /\S$/.test(j) ? x(j, "<strong>", "</strong>") : E
            }),
            o = o.replace(/\*([^\s*][\s\S]*?)\*/g, function(E, j) {
                return /\S$/.test(j) ? x(j, "<em>", "</em>") : E
            })),
            o = f.converter._dispatch("italicsAndBold.after", o, p, f),
            o
        }),
        n.subParser("lists", function(o, p, f) {
            function x(C, S) {
                f.gListLevel++,
                C = C.replace(/\n{2,}$/, `
`),
                C += "\xA80";
                var T = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm
                  , P = /\n[ \t]*\n(?!¨0)/.test(C);
                return p.disableForced4SpacesIndentedSublists && (T = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm),
                C = C.replace(T, function(R, N, y, O, A, L, z) {
                    z = z && z.trim() !== "";
                    var F = n.subParser("outdent")(A, p, f)
                      , B = "";
                    return L && p.tasklists && (B = ' class="task-list-item" style="list-style-type: none;"',
                    F = F.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                        var U = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                        return z && (U += " checked"),
                        U += ">",
                        U
                    })),
                    F = F.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(U) {
                        return "\xA8A" + U
                    }),
                    N || F.search(/\n{2,}/) > -1 ? (F = n.subParser("githubCodeBlocks")(F, p, f),
                    F = n.subParser("blockGamut")(F, p, f)) : (F = n.subParser("lists")(F, p, f),
                    F = F.replace(/\n$/, ""),
                    F = n.subParser("hashHTMLBlocks")(F, p, f),
                    F = F.replace(/\n\n+/g, `

`),
                    P ? F = n.subParser("paragraphs")(F, p, f) : F = n.subParser("spanGamut")(F, p, f)),
                    F = F.replace("\xA8A", ""),
                    F = "<li" + B + ">" + F + `</li>
`,
                    F
                }),
                C = C.replace(/¨0/g, ""),
                f.gListLevel--,
                S && (C = C.replace(/\s+$/, "")),
                C
            }
            function E(C, S) {
                if (S === "ol") {
                    var T = C.match(/^ *(\d+)\./);
                    if (T && T[1] !== "1")
                        return ' start="' + T[1] + '"'
                }
                return ""
            }
            function j(C, S, T) {
                var P = p.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm
                  , R = p.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm
                  , N = S === "ul" ? P : R
                  , y = "";
                if (C.search(N) !== -1)
                    (function A(L) {
                        var z = L.search(N)
                          , F = E(C, S);
                        z !== -1 ? (y += `

<` + S + F + `>
` + x(L.slice(0, z), !!T) + "</" + S + `>
`,
                        S = S === "ul" ? "ol" : "ul",
                        N = S === "ul" ? P : R,
                        A(L.slice(z))) : y += `

<` + S + F + `>
` + x(L, !!T) + "</" + S + `>
`
                    }
                    )(C);
                else {
                    var O = E(C, S);
                    y = `

<` + S + O + `>
` + x(C, !!T) + "</" + S + `>
`
                }
                return y
            }
            return o = f.converter._dispatch("lists.before", o, p, f),
            o += "\xA80",
            f.gListLevel ? o = o.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(C, S, T) {
                var P = T.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return j(S, P, !0)
            }) : o = o.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(C, S, T, P) {
                var R = P.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return j(T, R, !1)
            }),
            o = o.replace(/¨0/, ""),
            o = f.converter._dispatch("lists.after", o, p, f),
            o
        }),
        n.subParser("metadata", function(o, p, f) {
            if (!p.metadata)
                return o;
            o = f.converter._dispatch("metadata.before", o, p, f);
            function x(E) {
                f.metadata.raw = E,
                E = E.replace(/&/g, "&amp;").replace(/"/g, "&quot;"),
                E = E.replace(/\n {4}/g, " "),
                E.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(j, C, S) {
                    return f.metadata.parsed[C] = S,
                    ""
                })
            }
            return o = o.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(E, j, C) {
                return x(C),
                "\xA8M"
            }),
            o = o.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(E, j, C) {
                return j && (f.metadata.format = j),
                x(C),
                "\xA8M"
            }),
            o = o.replace(/¨M/g, ""),
            o = f.converter._dispatch("metadata.after", o, p, f),
            o
        }),
        n.subParser("outdent", function(o, p, f) {
            return o = f.converter._dispatch("outdent.before", o, p, f),
            o = o.replace(/^(\t|[ ]{1,4})/gm, "\xA80"),
            o = o.replace(/¨0/g, ""),
            o = f.converter._dispatch("outdent.after", o, p, f),
            o
        }),
        n.subParser("paragraphs", function(o, p, f) {
            o = f.converter._dispatch("paragraphs.before", o, p, f),
            o = o.replace(/^\n+/g, ""),
            o = o.replace(/\n+$/g, "");
            for (var x = o.split(/\n{2,}/g), E = [], j = x.length, C = 0; C < j; C++) {
                var S = x[C];
                S.search(/¨(K|G)(\d+)\1/g) >= 0 ? E.push(S) : S.search(/\S/) >= 0 && (S = n.subParser("spanGamut")(S, p, f),
                S = S.replace(/^([ \t]*)/g, "<p>"),
                S += "</p>",
                E.push(S))
            }
            for (j = E.length,
            C = 0; C < j; C++) {
                for (var T = "", P = E[C], R = !1; /¨(K|G)(\d+)\1/.test(P); ) {
                    var N = RegExp.$1
                      , y = RegExp.$2;
                    N === "K" ? T = f.gHtmlBlocks[y] : R ? T = n.subParser("encodeCode")(f.ghCodeBlocks[y].text, p, f) : T = f.ghCodeBlocks[y].codeblock,
                    T = T.replace(/\$/g, "$$$$"),
                    P = P.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, T),
                    /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(P) && (R = !0)
                }
                E[C] = P
            }
            return o = E.join(`
`),
            o = o.replace(/^\n+/g, ""),
            o = o.replace(/\n+$/g, ""),
            f.converter._dispatch("paragraphs.after", o, p, f)
        }),
        n.subParser("runExtension", function(o, p, f, x) {
            if (o.filter)
                p = o.filter(p, x.converter, f);
            else if (o.regex) {
                var E = o.regex;
                E instanceof RegExp || (E = new RegExp(E,"g")),
                p = p.replace(E, o.replace)
            }
            return p
        }),
        n.subParser("spanGamut", function(o, p, f) {
            return o = f.converter._dispatch("spanGamut.before", o, p, f),
            o = n.subParser("codeSpans")(o, p, f),
            o = n.subParser("escapeSpecialCharsWithinTagAttributes")(o, p, f),
            o = n.subParser("encodeBackslashEscapes")(o, p, f),
            o = n.subParser("images")(o, p, f),
            o = n.subParser("anchors")(o, p, f),
            o = n.subParser("autoLinks")(o, p, f),
            o = n.subParser("simplifiedAutoLinks")(o, p, f),
            o = n.subParser("emoji")(o, p, f),
            o = n.subParser("underline")(o, p, f),
            o = n.subParser("italicsAndBold")(o, p, f),
            o = n.subParser("strikethrough")(o, p, f),
            o = n.subParser("ellipsis")(o, p, f),
            o = n.subParser("hashHTMLSpans")(o, p, f),
            o = n.subParser("encodeAmpsAndAngles")(o, p, f),
            p.simpleLineBreaks ? /\n\n¨K/.test(o) || (o = o.replace(/\n+/g, `<br />
`)) : o = o.replace(/  +\n/g, `<br />
`),
            o = f.converter._dispatch("spanGamut.after", o, p, f),
            o
        }),
        n.subParser("strikethrough", function(o, p, f) {
            function x(E) {
                return p.simplifiedAutoLink && (E = n.subParser("simplifiedAutoLinks")(E, p, f)),
                "<del>" + E + "</del>"
            }
            return p.strikethrough && (o = f.converter._dispatch("strikethrough.before", o, p, f),
            o = o.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(E, j) {
                return x(j)
            }),
            o = f.converter._dispatch("strikethrough.after", o, p, f)),
            o
        }),
        n.subParser("stripLinkDefinitions", function(o, p, f) {
            var x = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm
              , E = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
            o += "\xA80";
            var j = function(C, S, T, P, R, N, y) {
                return S = S.toLowerCase(),
                o.toLowerCase().split(S).length - 1 < 2 ? C : (T.match(/^data:.+?\/.+?;base64,/) ? f.gUrls[S] = T.replace(/\s/g, "") : f.gUrls[S] = n.subParser("encodeAmpsAndAngles")(T, p, f),
                N ? N + y : (y && (f.gTitles[S] = y.replace(/"|'/g, "&quot;")),
                p.parseImgDimensions && P && R && (f.gDimensions[S] = {
                    width: P,
                    height: R
                }),
                ""))
            };
            return o = o.replace(E, j),
            o = o.replace(x, j),
            o = o.replace(/¨0/, ""),
            o
        }),
        n.subParser("tables", function(o, p, f) {
            if (!p.tables)
                return o;
            var x = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm
              , E = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
            function j(R) {
                return /^:[ \t]*--*$/.test(R) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(R) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(R) ? ' style="text-align:center;"' : ""
            }
            function C(R, N) {
                var y = "";
                return R = R.trim(),
                (p.tablesHeaderId || p.tableHeaderId) && (y = ' id="' + R.replace(/ /g, "_").toLowerCase() + '"'),
                R = n.subParser("spanGamut")(R, p, f),
                "<th" + y + N + ">" + R + `</th>
`
            }
            function S(R, N) {
                var y = n.subParser("spanGamut")(R, p, f);
                return "<td" + N + ">" + y + `</td>
`
            }
            function T(R, N) {
                for (var y = `<table>
<thead>
<tr>
`, O = R.length, A = 0; A < O; ++A)
                    y += R[A];
                for (y += `</tr>
</thead>
<tbody>
`,
                A = 0; A < N.length; ++A) {
                    y += `<tr>
`;
                    for (var L = 0; L < O; ++L)
                        y += N[A][L];
                    y += `</tr>
`
                }
                return y += `</tbody>
</table>
`,
                y
            }
            function P(R) {
                var N, y = R.split(`
`);
                for (N = 0; N < y.length; ++N)
                    /^ {0,3}\|/.test(y[N]) && (y[N] = y[N].replace(/^ {0,3}\|/, "")),
                    /\|[ \t]*$/.test(y[N]) && (y[N] = y[N].replace(/\|[ \t]*$/, "")),
                    y[N] = n.subParser("codeSpans")(y[N], p, f);
                var O = y[0].split("|").map(function($) {
                    return $.trim()
                })
                  , A = y[1].split("|").map(function($) {
                    return $.trim()
                })
                  , L = []
                  , z = []
                  , F = []
                  , B = [];
                for (y.shift(),
                y.shift(),
                N = 0; N < y.length; ++N)
                    y[N].trim() !== "" && L.push(y[N].split("|").map(function($) {
                        return $.trim()
                    }));
                if (O.length < A.length)
                    return R;
                for (N = 0; N < A.length; ++N)
                    F.push(j(A[N]));
                for (N = 0; N < O.length; ++N)
                    n.helper.isUndefined(F[N]) && (F[N] = ""),
                    z.push(C(O[N], F[N]));
                for (N = 0; N < L.length; ++N) {
                    for (var U = [], V = 0; V < z.length; ++V)
                        n.helper.isUndefined(L[N][V]),
                        U.push(S(L[N][V], F[V]));
                    B.push(U)
                }
                return T(z, B)
            }
            return o = f.converter._dispatch("tables.before", o, p, f),
            o = o.replace(/\\(\|)/g, n.helper.escapeCharactersCallback),
            o = o.replace(x, P),
            o = o.replace(E, P),
            o = f.converter._dispatch("tables.after", o, p, f),
            o
        }),
        n.subParser("underline", function(o, p, f) {
            return p.underline && (o = f.converter._dispatch("underline.before", o, p, f),
            p.literalMidWordUnderscores ? (o = o.replace(/\b___(\S[\s\S]*?)___\b/g, function(x, E) {
                return "<u>" + E + "</u>"
            }),
            o = o.replace(/\b__(\S[\s\S]*?)__\b/g, function(x, E) {
                return "<u>" + E + "</u>"
            })) : (o = o.replace(/___(\S[\s\S]*?)___/g, function(x, E) {
                return /\S$/.test(E) ? "<u>" + E + "</u>" : x
            }),
            o = o.replace(/__(\S[\s\S]*?)__/g, function(x, E) {
                return /\S$/.test(E) ? "<u>" + E + "</u>" : x
            })),
            o = o.replace(/(_)/g, n.helper.escapeCharactersCallback),
            o = f.converter._dispatch("underline.after", o, p, f)),
            o
        }),
        n.subParser("unescapeSpecialChars", function(o, p, f) {
            return o = f.converter._dispatch("unescapeSpecialChars.before", o, p, f),
            o = o.replace(/¨E(\d+)E/g, function(x, E) {
                var j = parseInt(E);
                return String.fromCharCode(j)
            }),
            o = f.converter._dispatch("unescapeSpecialChars.after", o, p, f),
            o
        }),
        n.subParser("makeMarkdown.blockquote", function(o, p) {
            var f = "";
            if (o.hasChildNodes())
                for (var x = o.childNodes, E = x.length, j = 0; j < E; ++j) {
                    var C = n.subParser("makeMarkdown.node")(x[j], p);
                    C !== "" && (f += C)
                }
            return f = f.trim(),
            f = "> " + f.split(`
`).join(`
> `),
            f
        }),
        n.subParser("makeMarkdown.codeBlock", function(o, p) {
            var f = o.getAttribute("language")
              , x = o.getAttribute("precodenum");
            return "```" + f + `
` + p.preList[x] + "\n```"
        }),
        n.subParser("makeMarkdown.codeSpan", function(o) {
            return "`" + o.innerHTML + "`"
        }),
        n.subParser("makeMarkdown.emphasis", function(o, p) {
            var f = "";
            if (o.hasChildNodes()) {
                f += "*";
                for (var x = o.childNodes, E = x.length, j = 0; j < E; ++j)
                    f += n.subParser("makeMarkdown.node")(x[j], p);
                f += "*"
            }
            return f
        }),
        n.subParser("makeMarkdown.header", function(o, p, f) {
            var x = new Array(f + 1).join("#")
              , E = "";
            if (o.hasChildNodes()) {
                E = x + " ";
                for (var j = o.childNodes, C = j.length, S = 0; S < C; ++S)
                    E += n.subParser("makeMarkdown.node")(j[S], p)
            }
            return E
        }),
        n.subParser("makeMarkdown.hr", function() {
            return "---"
        }),
        n.subParser("makeMarkdown.image", function(o) {
            var p = "";
            return o.hasAttribute("src") && (p += "![" + o.getAttribute("alt") + "](",
            p += "<" + o.getAttribute("src") + ">",
            o.hasAttribute("width") && o.hasAttribute("height") && (p += " =" + o.getAttribute("width") + "x" + o.getAttribute("height")),
            o.hasAttribute("title") && (p += ' "' + o.getAttribute("title") + '"'),
            p += ")"),
            p
        }),
        n.subParser("makeMarkdown.links", function(o, p) {
            var f = "";
            if (o.hasChildNodes() && o.hasAttribute("href")) {
                var x = o.childNodes
                  , E = x.length;
                f = "[";
                for (var j = 0; j < E; ++j)
                    f += n.subParser("makeMarkdown.node")(x[j], p);
                f += "](",
                f += "<" + o.getAttribute("href") + ">",
                o.hasAttribute("title") && (f += ' "' + o.getAttribute("title") + '"'),
                f += ")"
            }
            return f
        }),
        n.subParser("makeMarkdown.list", function(o, p, f) {
            var x = "";
            if (!o.hasChildNodes())
                return "";
            for (var E = o.childNodes, j = E.length, C = o.getAttribute("start") || 1, S = 0; S < j; ++S)
                if (!(typeof E[S].tagName > "u" || E[S].tagName.toLowerCase() !== "li")) {
                    var T = "";
                    f === "ol" ? T = C.toString() + ". " : T = "- ",
                    x += T + n.subParser("makeMarkdown.listItem")(E[S], p),
                    ++C
                }
            return x += `
<!-- -->
`,
            x.trim()
        }),
        n.subParser("makeMarkdown.listItem", function(o, p) {
            for (var f = "", x = o.childNodes, E = x.length, j = 0; j < E; ++j)
                f += n.subParser("makeMarkdown.node")(x[j], p);
            return /\n$/.test(f) ? f = f.split(`
`).join(`
    `).replace(/^ {4}$/gm, "").replace(/\n\n+/g, `

`) : f += `
`,
            f
        }),
        n.subParser("makeMarkdown.node", function(o, p, f) {
            f = f || !1;
            var x = "";
            if (o.nodeType === 3)
                return n.subParser("makeMarkdown.txt")(o, p);
            if (o.nodeType === 8)
                return "<!--" + o.data + `-->

`;
            if (o.nodeType !== 1)
                return "";
            var E = o.tagName.toLowerCase();
            switch (E) {
            case "h1":
                f || (x = n.subParser("makeMarkdown.header")(o, p, 1) + `

`);
                break;
            case "h2":
                f || (x = n.subParser("makeMarkdown.header")(o, p, 2) + `

`);
                break;
            case "h3":
                f || (x = n.subParser("makeMarkdown.header")(o, p, 3) + `

`);
                break;
            case "h4":
                f || (x = n.subParser("makeMarkdown.header")(o, p, 4) + `

`);
                break;
            case "h5":
                f || (x = n.subParser("makeMarkdown.header")(o, p, 5) + `

`);
                break;
            case "h6":
                f || (x = n.subParser("makeMarkdown.header")(o, p, 6) + `

`);
                break;
            case "p":
                f || (x = n.subParser("makeMarkdown.paragraph")(o, p) + `

`);
                break;
            case "blockquote":
                f || (x = n.subParser("makeMarkdown.blockquote")(o, p) + `

`);
                break;
            case "hr":
                f || (x = n.subParser("makeMarkdown.hr")(o, p) + `

`);
                break;
            case "ol":
                f || (x = n.subParser("makeMarkdown.list")(o, p, "ol") + `

`);
                break;
            case "ul":
                f || (x = n.subParser("makeMarkdown.list")(o, p, "ul") + `

`);
                break;
            case "precode":
                f || (x = n.subParser("makeMarkdown.codeBlock")(o, p) + `

`);
                break;
            case "pre":
                f || (x = n.subParser("makeMarkdown.pre")(o, p) + `

`);
                break;
            case "table":
                f || (x = n.subParser("makeMarkdown.table")(o, p) + `

`);
                break;
            case "code":
                x = n.subParser("makeMarkdown.codeSpan")(o, p);
                break;
            case "em":
            case "i":
                x = n.subParser("makeMarkdown.emphasis")(o, p);
                break;
            case "strong":
            case "b":
                x = n.subParser("makeMarkdown.strong")(o, p);
                break;
            case "del":
                x = n.subParser("makeMarkdown.strikethrough")(o, p);
                break;
            case "a":
                x = n.subParser("makeMarkdown.links")(o, p);
                break;
            case "img":
                x = n.subParser("makeMarkdown.image")(o, p);
                break;
            default:
                x = o.outerHTML + `

`
            }
            return x
        }),
        n.subParser("makeMarkdown.paragraph", function(o, p) {
            var f = "";
            if (o.hasChildNodes())
                for (var x = o.childNodes, E = x.length, j = 0; j < E; ++j)
                    f += n.subParser("makeMarkdown.node")(x[j], p);
            return f = f.trim(),
            f
        }),
        n.subParser("makeMarkdown.pre", function(o, p) {
            var f = o.getAttribute("prenum");
            return "<pre>" + p.preList[f] + "</pre>"
        }),
        n.subParser("makeMarkdown.strikethrough", function(o, p) {
            var f = "";
            if (o.hasChildNodes()) {
                f += "~~";
                for (var x = o.childNodes, E = x.length, j = 0; j < E; ++j)
                    f += n.subParser("makeMarkdown.node")(x[j], p);
                f += "~~"
            }
            return f
        }),
        n.subParser("makeMarkdown.strong", function(o, p) {
            var f = "";
            if (o.hasChildNodes()) {
                f += "**";
                for (var x = o.childNodes, E = x.length, j = 0; j < E; ++j)
                    f += n.subParser("makeMarkdown.node")(x[j], p);
                f += "**"
            }
            return f
        }),
        n.subParser("makeMarkdown.table", function(o, p) {
            var f = "", x = [[], []], E = o.querySelectorAll("thead>tr>th"), j = o.querySelectorAll("tbody>tr"), C, S;
            for (C = 0; C < E.length; ++C) {
                var T = n.subParser("makeMarkdown.tableCell")(E[C], p)
                  , P = "---";
                if (E[C].hasAttribute("style")) {
                    var R = E[C].getAttribute("style").toLowerCase().replace(/\s/g, "");
                    switch (R) {
                    case "text-align:left;":
                        P = ":---";
                        break;
                    case "text-align:right;":
                        P = "---:";
                        break;
                    case "text-align:center;":
                        P = ":---:";
                        break
                    }
                }
                x[0][C] = T.trim(),
                x[1][C] = P
            }
            for (C = 0; C < j.length; ++C) {
                var N = x.push([]) - 1
                  , y = j[C].getElementsByTagName("td");
                for (S = 0; S < E.length; ++S) {
                    var O = " ";
                    typeof y[S] < "u" && (O = n.subParser("makeMarkdown.tableCell")(y[S], p)),
                    x[N].push(O)
                }
            }
            var A = 3;
            for (C = 0; C < x.length; ++C)
                for (S = 0; S < x[C].length; ++S) {
                    var L = x[C][S].length;
                    L > A && (A = L)
                }
            for (C = 0; C < x.length; ++C) {
                for (S = 0; S < x[C].length; ++S)
                    C === 1 ? x[C][S].slice(-1) === ":" ? x[C][S] = n.helper.padEnd(x[C][S].slice(-1), A - 1, "-") + ":" : x[C][S] = n.helper.padEnd(x[C][S], A, "-") : x[C][S] = n.helper.padEnd(x[C][S], A);
                f += "| " + x[C].join(" | ") + ` |
`
            }
            return f.trim()
        }),
        n.subParser("makeMarkdown.tableCell", function(o, p) {
            var f = "";
            if (!o.hasChildNodes())
                return "";
            for (var x = o.childNodes, E = x.length, j = 0; j < E; ++j)
                f += n.subParser("makeMarkdown.node")(x[j], p, !0);
            return f.trim()
        }),
        n.subParser("makeMarkdown.txt", function(o) {
            var p = o.nodeValue;
            return p = p.replace(/ +/g, " "),
            p = p.replace(/¨NBSP;/g, " "),
            p = n.helper.unescapeHTMLEntities(p),
            p = p.replace(/([*_~|`])/g, "\\$1"),
            p = p.replace(/^(\s*)>/g, "\\$1>"),
            p = p.replace(/^#/gm, "\\#"),
            p = p.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3"),
            p = p.replace(/^( {0,3}\d+)\./gm, "$1\\."),
            p = p.replace(/^( {0,3})([+-])/gm, "$1\\$2"),
            p = p.replace(/]([\s]*)\(/g, "\\]$1\\("),
            p = p.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:"),
            p
        });
        var D = this;
        e.exports ? e.exports = n : D.showdown = n
    }
    ).call(ae)
}
)(js);
var Yh = js.exports;
const Ss = cr(Yh)
  , Kh = async e => {
    if (!e)
        return;
    const t = e.join("");
    try {
        await navigator.clipboard.writeText(t)
    } catch (r) {
        console.error("Failed to copy text: ", r)
    }
}
  , Zh = ({guideMePin: e, onNextClick: t, autoFillInput: r, isAiFallbackElement: n, canEdit: i, showRecaptureButton: a, ...c}) => {
    var D;
    const [l,u] = d.useState(!1)
      , m = d.useRef(null)
      , {guideMePinRecapture: h} = De(ce.getState())
      , v = new Ss.Converter
      , w = o => o.replace(/\[\[(.*?)\]\]/g, "`$1`")
      , k = v.makeHtml(w(((D = e == null ? void 0 : e.document_metadata) == null ? void 0 : D.name) || ""))
      , b = fi.sanitize(k);
    d.useLayoutEffect( () => {
        const o = () => {
            m.current && requestAnimationFrame( () => {
                if (!m.current)
                    return;
                const p = m.current.getBoundingClientRect()
                  , f = window.innerWidth < Math.ceil(p.right) + 12
                  , x = window.innerWidth - Math.ceil(p.x) - Math.ceil(p.width) * 2 - 32 - 12 > 36;
                !l && f && u(!0),
                l && x && u(!1)
            }
            )
        }
        ;
        return o(),
        window.addEventListener("resize", o),
        () => {
            window.removeEventListener("resize", o)
        }
    }
    , [l, e]);
    const g = d.useRef(null)
      , _ = () => {
        const {activeElement: o} = document;
        o && o.tagName === "INPUT" && o.blur(),
        J("next_type_step_guide_me", {
            actionId: e.actionExternalId
        }),
        t == null || t()
    }
      , I = (e == null ? void 0 : e.actionType) === "keyboard_sequence_action"
      , M = !(e != null && e.recaptureEnabledForPublishing);
    return s.jsx(qe, {
        children: s.jsx("div", {
            ref: m,
            className: re("step-description container z-10 flex w-max max-w-[450px] items-center justify-center rounded-[11px] p-[1px] transition-opacity -mt-0.5 backdrop-blur-sm", {
                "mt-3": I,
                "relative right-full -mr-8": l && I,
                "mx-3": (e == null ? void 0 : e.actionType) !== "keyboard_sequence_action",
                "relative right-full": (e == null ? void 0 : e.actionType) !== "keyboard_sequence_action" && l,
                "pointer-events-auto": !c.targetHovered || I,
                "opacity-0": c.targetHovered && (e == null ? void 0 : e.actionType) !== "keyboard_sequence_action"
            }),
            children: s.jsxs("div", {
                className: "flex h-full w-full items-start justify-center rounded-lg bg-slate-950/75 ring-1 ring-slate-950/75 border border-white/25 px-4 py-2 shadow-lg relative",
                children: [s.jsxs("div", {
                    className: re("guide-me-modal-html max-w-[330px] cursor-text text-sm font-medium leading-5 text-slate-100 group h-fit overflow-hidden", {
                        "mt-1.5": I
                    }),
                    children: [s.jsxs("div", {
                        className: "flex flex-row gap-1 align-content-center items-center guide-me-tooltip",
                        children: [Kn(b), h && !I && i && a && s.jsx("div", {
                            className: "flex justify-center items-center gap-1",
                            children: s.jsxs(de, {
                                children: [s.jsx(pe, {
                                    children: s.jsx(oe, {
                                        disabled: M,
                                        variant: "secondary",
                                        theme: "dark",
                                        icon: Fc,
                                        "aria-label": "Recapture step",
                                        onClick: () => {
                                            chrome.runtime.sendMessage({
                                                messageType: "recapture"
                                            })
                                        }
                                    })
                                }), s.jsx(se, {
                                    side: "bottom",
                                    children: M ? "Publish changes before recapturing." : "Recapture"
                                })]
                            })
                        })]
                    }), n && s.jsx(vr, {
                        className: "mb-1"
                    })]
                }), I && s.jsxs("div", {
                    className: "ml-3 flex items-center gap-2",
                    children: [s.jsx("div", {
                        children: s.jsxs(de, {
                            children: [s.jsx(pe, {
                                children: s.jsx(oe, {
                                    ref: g,
                                    variant: "secondary",
                                    theme: "dark",
                                    icon: zc,
                                    "aria-label": "Copy input text",
                                    onClick: () => {
                                        var o;
                                        Kh(e == null ? void 0 : e.keys),
                                        J("copy_type_step_guide_me", {
                                            actionId: e.actionExternalId
                                        }),
                                        (o = g.current) == null || o.blur()
                                    }
                                })
                            }), s.jsx(se, {
                                side: "bottom",
                                children: s.jsx("div", {
                                    className: "flex items-center",
                                    children: s.jsx("span", {
                                        children: "Copy Text"
                                    })
                                })
                            })]
                        })
                    }), s.jsx("div", {
                        children: s.jsxs(de, {
                            children: [s.jsx(pe, {
                                children: s.jsx(oe, {
                                    ref: g,
                                    variant: "secondary",
                                    theme: "dark",
                                    icon: Bc,
                                    "aria-label": "Insert input text",
                                    onClick: () => {
                                        r && r((e == null ? void 0 : e.keys) || []),
                                        J("insert_type_step_guide_me", {
                                            actionId: e.actionExternalId
                                        })
                                    }
                                })
                            }), s.jsx(se, {
                                side: "bottom",
                                children: s.jsx("div", {
                                    className: "flex items-center",
                                    children: s.jsx("span", {
                                        children: "Fill Input"
                                    })
                                })
                            })]
                        })
                    }), s.jsx("div", {
                        children: s.jsx(oe, {
                            variant: "secondary",
                            theme: "dark",
                            icon: Hc,
                            onMouseDown: _,
                            children: "Next"
                        })
                    })]
                })]
            })
        })
    })
}
  , Qh = async e => {
    if (!e)
        return;
    const t = e.join("");
    try {
        await navigator.clipboard.writeText(t)
    } catch (r) {
        console.error("Failed to copy text: ", r)
    }
}
  , Jh = ({sanitizedHTML: e, isLarge: t}) => {
    const r = d.useRef(null)
      , n = () => {
        const i = document.createElement("div");
        i.innerHTML = e;
        const a = i.querySelector("p");
        return a ? a.outerHTML : ""
    }
    ;
    return s.jsx("div", {
        ref: r,
        className: "guide-me-tooltip transition-all duration-200 ease-in-out overflow-hidden break-all",
        style: {
            maxHeight: "20px"
        },
        children: s.jsxs("div", {
            className: "guide-me-tooltip flex justify-center",
            children: [s.jsx("div", {
                className: "guide-me-tooltip",
                children: Kn(n())
            }), t && s.jsx("p", {
                className: "ml-1",
                children: "..."
            })]
        })
    })
}
  , eg = ({sanitizedHTML: e}) => {
    var r;
    const t = d.useRef(null);
    return s.jsx("div", {
        ref: t,
        className: "guide-me-tooltip transition-all duration-200 ease-in-out overflow-hidden",
        style: {
            maxHeight: `${(r = t == null ? void 0 : t.current) == null ? void 0 : r.scrollHeight}px`
        },
        children: Kn(e)
    })
}
  , tg = ({sanitizedHTML: e, ghostRef: t}) => s.jsx("div", {
    ref: t,
    style: {
        position: "absolute",
        visibility: "hidden",
        height: "auto",
        overflow: "visible",
        maxHeight: "none"
    },
    children: Kn(e)
})
  , Ts = ({guideMePinRecapture: e, keyboardSequenceAction: t, canEdit: r, showRecaptureButton: n, guideMePin: i}) => {
    const a = e && !t && r && n
      , c = !(i != null && i.recaptureEnabledForPublishing);
    return a ? s.jsx("div", {
        className: "flex justify-center items-center gap-1",
        children: s.jsxs(de, {
            children: [s.jsx(pe, {
                children: s.jsx(oe, {
                    disabled: c,
                    className: `
            guide-me-tooltip-button
          `,
                    variant: "ghost",
                    size: "small",
                    theme: "dark",
                    icon: Sl,
                    "aria-label": "Recapture step",
                    onClick: () => {
                        chrome.runtime.sendMessage({
                            messageType: "recapture"
                        })
                    }
                })
            }), s.jsx(se, {
                side: "bottom",
                children: c ? "Publish changes before recapturing." : "Recapture"
            })]
        })
    }) : null
}
  , ng = ({guideMePin: e, onNextClick: t, handleAutoFillInput: r, isAiFallbackElement: n, canEdit: i, showRecaptureButton: a, ...c}) => {
    var S;
    const [l,u] = d.useState(!1)
      , [m,h] = d.useState(!1)
      , v = d.useRef(null)
      , {guideMePinRecapture: w} = De(ce.getState())
      , k = d.useRef(null)
      , [b,g] = d.useState(!1)
      , [_,I] = d.useState(!1)
      , M = new Ss.Converter
      , D = T => T.replace(/\[\[(.*?)\]\]/g, "`$1`")
      , o = M.makeHtml(D(((S = e == null ? void 0 : e.document_metadata) == null ? void 0 : S.name) || ""));
    let p = fi.sanitize(o);
    p.includes("<code>enter</code>") && (p = p.replace(/<code>enter<\/code>/g, "")),
    d.useEffect( () => {
        g(!1)
    }
    , [e.actionExternalId]),
    d.useLayoutEffect( () => {
        const T = k.current;
        if (!T)
            return;
        const P = new ResizeObserver(R => {
            const {height: N} = R[0].contentRect
              , y = N > 60;
            I(O => O !== y ? y : O)
        }
        );
        return P.observe(T),
        () => {
            P.disconnect()
        }
    }
    , [e.actionExternalId]),
    d.useLayoutEffect( () => {
        const T = () => {
            v.current && requestAnimationFrame( () => {
                if (!v.current)
                    return;
                const P = v.current.getBoundingClientRect()
                  , R = window.innerWidth < Math.ceil(P.right) + 12
                  , N = window.innerWidth - Math.ceil(P.x) - Math.ceil(P.width) * 2 - 32 - 12 > 36
                  , y = window.innerHeight < Math.ceil(P.bottom) + (_ ? 12 : 0);
                !l && R && u(!0),
                l && N && u(!1),
                !m && y && h(!0),
                m && !y && h(!1)
            }
            )
        }
        ;
        return T(),
        window.addEventListener("resize", T),
        () => {
            window.removeEventListener("resize", T)
        }
    }
    , [l, e, e.document_metadata.id, _, m]);
    const f = d.useRef(null)
      , x = () => {
        const {activeElement: T} = document;
        T && T.tagName === "INPUT" && T.blur(),
        J("next_type_step_guide_me", {
            actionId: e.actionExternalId
        }),
        t == null || t()
    }
      , E = (e == null ? void 0 : e.actionType) === "keyboard_sequence_action"
      , j = E || _ || n
      , C = () => {
        var T;
        return m ? b ? `-${Number((T = k.current) == null ? void 0 : T.scrollHeight) - 20}px` : "-30px" : "0px"
    }
    ;
    return s.jsx(qe, {
        children: s.jsx("div", {
            ref: v,
            style: {
                marginTop: C()
            },
            className: re("step-description container z-10 flex w-max max-w-[450px] items-center justify-center rounded-[11px] p-[1px] transition-opacity -mt-0.5 backdrop-blur-sm", {
                "mt-3": E,
                "relative right-full -mr-8": l && E,
                "mx-3": (e == null ? void 0 : e.actionType) !== "keyboard_sequence_action",
                "relative right-full": (e == null ? void 0 : e.actionType) !== "keyboard_sequence_action" && l,
                "pointer-events-auto": !c.targetHovered || E,
                "opacity-0": c.targetHovered && (e == null ? void 0 : e.actionType) !== "keyboard_sequence_action"
            }),
            children: s.jsx("div", {
                className: "flex h-full w-full items-start justify-center rounded-lg bg-slate-950/75 ring-1 ring-slate-950/75 border border-white/25 px-4 py-2 shadow-lg relative",
                children: s.jsxs("div", {
                    className: re("guide-me-modal-html max-w-[330px] cursor-text text-sm font-medium leading-5 text-slate-100 group h-fit overflow-hidden", {
                        "mt-1.5": E
                    }),
                    children: [s.jsx(tg, {
                        sanitizedHTML: p,
                        ghostRef: k
                    }), s.jsxs("div", {
                        className: "flex flex-row gap-1 align-content-center items-center guide-me-tooltip",
                        children: [!b && s.jsx(Jh, {
                            sanitizedHTML: p,
                            isLarge: _
                        }), b && s.jsx(eg, {
                            sanitizedHTML: p
                        }), !j && s.jsx(Ts, {
                            guideMePinRecapture: w,
                            keyboardSequenceAction: E,
                            canEdit: i,
                            showRecaptureButton: a,
                            guideMePin: e
                        })]
                    }), j && s.jsxs("div", {
                        className: "flex flex-row pt-1 gap-2 align-content-center items-center",
                        children: [_ && s.jsxs(de, {
                            children: [s.jsx(pe, {
                                children: s.jsx(oe, {
                                    className: "guide-me-tooltip-button",
                                    variant: "ghost",
                                    theme: "dark",
                                    icon: b ? $c : Uc,
                                    size: "small",
                                    "aria-label": "Show more",
                                    onClick: () => {
                                        g(T => !T)
                                    }
                                })
                            }), s.jsx(se, {
                                side: "bottom",
                                children: b ? "Show less" : "Show more"
                            })]
                        }), s.jsx(Ts, {
                            guideMePinRecapture: w,
                            keyboardSequenceAction: E,
                            canEdit: i,
                            showRecaptureButton: a,
                            guideMePin: e
                        }), n && s.jsx(vr, {}), E && s.jsxs(s.Fragment, {
                            children: [s.jsxs(de, {
                                children: [s.jsx(pe, {
                                    children: s.jsx(oe, {
                                        className: "guide-me-tooltip-button",
                                        ref: f,
                                        variant: "ghost",
                                        size: "small",
                                        theme: "dark",
                                        icon: El,
                                        "aria-label": "Copy input text",
                                        onClick: () => {
                                            var T;
                                            Qh(e == null ? void 0 : e.keys),
                                            J("copy_type_step_guide_me", {
                                                actionId: e.actionExternalId
                                            }),
                                            (T = f.current) == null || T.blur()
                                        }
                                    })
                                }), s.jsx(se, {
                                    side: "bottom",
                                    children: s.jsx("div", {
                                        className: "flex items-center",
                                        children: s.jsx("span", {
                                            children: "Copy Text"
                                        })
                                    })
                                })]
                            }), s.jsx("div", {
                                children: s.jsxs(de, {
                                    children: [s.jsx(pe, {
                                        children: s.jsx(oe, {
                                            className: "guide-me-tooltip-button",
                                            ref: f,
                                            variant: "ghost",
                                            theme: "dark",
                                            size: "small",
                                            icon: Cl,
                                            "aria-label": "Insert input text",
                                            onClick: () => {
                                                r(),
                                                J("insert_type_step_guide_me", {
                                                    actionId: e.actionExternalId
                                                })
                                            }
                                        })
                                    }), s.jsx(se, {
                                        side: "bottom",
                                        children: s.jsx("div", {
                                            className: "flex items-center",
                                            children: s.jsx("span", {
                                                children: "Fill Input"
                                            })
                                        })
                                    })]
                                })
                            }), s.jsx("div", {
                                children: s.jsxs(de, {
                                    children: [s.jsx(pe, {
                                        children: s.jsx(oe, {
                                            className: "guide-me-tooltip-button",
                                            variant: "ghost",
                                            theme: "dark",
                                            size: "small",
                                            icon: jl,
                                            onMouseDown: x
                                        })
                                    }), s.jsx(se, {
                                        side: "bottom",
                                        children: s.jsx("div", {
                                            className: "flex items-center",
                                            children: s.jsx("span", {
                                                children: "Next"
                                            })
                                        })
                                    })]
                                })
                            })]
                        })]
                    })]
                })
            })
        })
    })
}
  , Ps = (e, t) => {
    var n, i, a, c;
    ((n = t == null ? void 0 : t.keys) == null ? void 0 : n[t.keys.length - 1]) === "enter" && t.keys.pop();
    const r = ((i = t == null ? void 0 : t.keys) == null ? void 0 : i.join("")) || "";
    (c = (a = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), "value")) == null ? void 0 : a.set) == null || c.call(e, r),
    e == null || e.dispatchEvent(new Event("input",{
        bubbles: !0
    })),
    e == null || e.dispatchEvent(new Event("change",{
        bubbles: !0
    }))
}
  , rg = ({guideMePin: e, aiFallbackElementId: t, description: r, onTargetClick: n, onOtherTargetClick: i, actionType: a, onSelectorNotFound: c, onSelectorFound: l, canEdit: u, liveActionNumber: m}) => {
    var y, O, A, L;
    const [h,v] = d.useState(!1)
      , [w,k] = d.useState(0)
      , {element: b, matchMethod: g, parentIframe: _, algorithm: I} = Qi({
        aiFallbackElementId: t,
        selector: e.selector,
        xpath: e.xpath,
        tag: e.tag,
        text: e.text,
        attributes: e.attributes,
        debounceMs: 200,
        retryCount: w,
        timestamp: e == null ? void 0 : e.timestamp,
        actionType: e == null ? void 0 : e.actionType,
        actionId: (e == null ? void 0 : e.actionExternalId) ?? "",
        wasInIframe: e ? e.was_in_iframe : null,
        iframeAttributes: (e == null ? void 0 : e.iframe_attributes) || null,
        parentAttributes: (e == null ? void 0 : e.target_parent_attributes) || null,
        parentTag: (e == null ? void 0 : e.target_parent_tag) || ""
    })
      , M = (O = (y = ce.getState()) == null ? void 0 : y.extension) == null ? void 0 : O.status
      , D = (L = (A = ce.getState()) == null ? void 0 : A.guideMe) == null ? void 0 : L.autoPilotAction
      , {guideMeTooltipSizing: o} = De(ce.getState())
      , {isVisible: p} = br({
        element: b,
        subtreeEnabled: !0
    })
      , f = rc(b, _)
      , x = d.useCallback( () => {
        a !== "keyboard_sequence_action" && (n == null || n(),
        b == null || b.removeEventListener("pointerdown", x))
    }
    , [a, n, b])
      , E = oc({
        pin: e,
        pinTarget: b,
        parentIframe: _
    })
      , j = d.useCallback(z => {
        const F = z.join("");
        b && b instanceof HTMLInputElement && (b.value = F)
    }
    , [b])
      , C = () => v(!0)
      , S = () => v(!1);
    function T(z) {
        z.isTrusted && x()
    }
    d.useEffect( () => (b == null || b.addEventListener("mouseenter", C),
    b == null || b.addEventListener("mouseleave", S),
    b == null || b.addEventListener("pointerdown", T),
    () => {
        b == null || b.removeEventListener("mouseenter", C),
        b == null || b.removeEventListener("mouseleave", S),
        b == null || b.removeEventListener("pointerdown", T)
    }
    ), [x, b]),
    d.useEffect( () => {
        D && D === "click" && b && (b.dispatchEvent(new MouseEvent("click",{
            bubbles: !0,
            cancelable: !0,
            clientX: E.x,
            clientY: E.y
        })),
        x()),
        D && D === "autofill" && (((b == null ? void 0 : b.tagName) === "INPUT" || (b == null ? void 0 : b.tagName) === "TEXTAREA" || (b == null ? void 0 : b.getAttribute("contenteditable")) === "true") && Ps(b, e),
        n == null || n()),
        ce.dispatch(ao(null))
    }
    , [j, D, x, n, e == null ? void 0 : e.keys, E.x, E.y]),
    d.useEffect( () => {
        S(),
        k(0)
    }
    , [e]);
    const P = ( () => b && f.width && f.height)();
    d.useEffect( () => {
        let z;
        if (P) {
            k(0),
            l == null || l({
                matchMethod: g,
                centerCoordinates: ic(f),
                algorithm: I
            }),
            mi({
                actionId: e.actionExternalId,
                matchMethod: g,
                url: e.original_url,
                algorithm: I
            });
            const F = b;
            F.style.transform = "scale(1)",
            F.offsetHeight,
            F.style.transform = ""
        } else
            w < 10 && (z = setTimeout( () => {
                P || k(F => F + 1)
            }
            , 1e3));
        return (w === 1 && (!b || b && !P) || t && (!b || b && !P)) && (c == null || c()),
        w === 10 && mi({
            actionId: e.actionExternalId,
            matchMethod: g,
            url: e.original_url,
            algorithm: I
        }),
        () => clearTimeout(z)
    }
    , [b, w]);
    const R = () => {
        const {top: z, left: F, height: B, width: U} = f
          , {innerHeight: V, innerWidth: $} = window;
        return z < 0 || F < 0 || z + B > V || F + U > $
    }
      , N = () => {
        P && R() && (b == null || b.scrollIntoView({
            behavior: "smooth",
            block: "center"
        }))
    }
    ;
    return d.useEffect( () => {
        const z = F => {
            var Q;
            const B = F.target
              , U = b == null ? void 0 : b.contains(B)
              , V = B == null ? void 0 : B.contains(b)
              , $ = nu(B, {
                ignoreId: !0
            })
              , W = yi(B)
              , K = {
                documentId: (Q = e == null ? void 0 : e.document_metadata) == null ? void 0 : Q.id,
                actionId: e == null ? void 0 : e.actionExternalId,
                actionSelector: e == null ? void 0 : e.selector,
                actionXpath: e == null ? void 0 : e.xpath,
                actionDescription: r,
                userScrollPosition: {
                    x: window == null ? void 0 : window.scrollX,
                    y: window == null ? void 0 : window.scrollY
                },
                userClickCoordinates: {
                    x: F.clientX,
                    y: F.clientY
                },
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                clickedText: Js((B.innerText || B.textContent || "").substring(0, 2048)),
                clickedXpath: $,
                clickedSelector: W
            };
            B !== b && !U && !V && P && (i(F.clientX, F.clientY),
            ar("click_other_element_guide_me", K)),
            b || ar("click_refer_to_screenshot_other_element_guide_me", K)
        }
        ;
        return document.addEventListener("pointerdown", z),
        () => {
            document.removeEventListener("pointerdown", z)
        }
    }
    , [b, n, P]),
    d.useEffect( () => {
        N()
    }
    , [b]),
    d.useEffect( () => {
        const z = async F => {
            F.messageType === "currentTabChanged" && k(0)
        }
        ;
        return chrome.runtime.onMessage.addListener(z),
        () => {
            chrome.runtime.onMessage.removeListener(z)
        }
    }
    , []),
    !P || M === me.RECORDING ? null : s.jsx("div", {
        className: "group pointer-events-none absolute z-[999999] cursor-pointer opacity-100 transition-opacity",
        style: {
            position: "absolute",
            top: E.y - 16,
            left: E.x - 16,
            zIndex: 999999
        },
        children: p && s.jsxs("div", {
            id: "click-target",
            className: re("relative flex items-start", {
                "flex-col": e.actionType === "keyboard_sequence_action"
            }),
            children: [s.jsx(Ni, {
                clickTargetColor: e.clickTargetColor
            }), o ? s.jsx(ng, {
                isAiFallbackElement: g === "ai_fallback",
                guideMePin: e,
                targetHovered: h,
                onNextClick: n,
                handleAutoFillInput: () => Ps(b, e),
                canEdit: u,
                showRecaptureButton: !String(m).includes(".")
            }) : s.jsx(Zh, {
                isAiFallbackElement: g === "ai_fallback",
                guideMePin: e,
                targetHovered: h,
                onNextClick: n,
                autoFillInput: j,
                canEdit: u,
                showRecaptureButton: !String(m).includes(".")
            })]
        })
    })
}
  , og = ({liveAction: e}) => {
    var m, h;
    const [t,r] = d.useState(!1)
      , [n,i] = d.useState({
        x: 0,
        y: 0
    })
      , a = (h = (m = ce.getState()) == null ? void 0 : m.extension) == null ? void 0 : h.status
      , c = d.useRef(null)
      , l = `#${e == null ? void 0 : e.clickTargetColor}` || "#3C2EDD"
      , u = ({x: v, y: w}) => {
        const k = document.elementFromPoint(v, w);
        if (k && c.current) {
            const b = k.getBoundingClientRect();
            Object.assign(c.current.style, {
                display: "block",
                top: `${b.top}px`,
                left: `${b.left}px`,
                width: `${b.width}px`,
                height: `${b.height}px`
            })
        }
    }
    ;
    return d.useEffect( () => {
        ir().then(v => {
            v && a === me.RECORDING ? r(!0) : r(!1)
        }
        ).catch( () => {
            r(!1)
        }
        )
    }
    , [a]),
    d.useEffect( () => {
        if (!t)
            return;
        const v = g => {
            i({
                x: g.clientX,
                y: g.clientY
            }),
            u({
                x: g.clientX,
                y: g.clientY
            })
        }
          , w = g => _ => {
            var o, p;
            let I = _.clientX
              , M = _.clientY
              , D = g;
            for (; D; ) {
                const f = D.getBoundingClientRect();
                I += f.left,
                M += f.top,
                D = (p = (o = D.ownerDocument) == null ? void 0 : o.defaultView) == null ? void 0 : p.frameElement
            }
            i({
                x: I,
                y: M
            })
        }
          , k = []
          , b = g => {
            g.querySelectorAll("iframe").forEach(_ => {
                try {
                    const I = _.contentWindow;
                    if (I && I.document) {
                        const M = w(_);
                        I.document.addEventListener("mousemove", M),
                        k.push({
                            iframeWindow: I,
                            handler: M
                        }),
                        b(I.document)
                    }
                } catch (I) {
                    console.warn("Cross-origin iframe, skipping mouse tracking:", I)
                }
            }
            )
        }
        ;
        return window.addEventListener("mousemove", v),
        b(document),
        () => {
            window.removeEventListener("mousemove", v),
            c.current && (c.current.style.display = "none"),
            k.forEach( ({iframeWindow: g, handler: _}) => {
                try {
                    g.document.removeEventListener("mousemove", _)
                } catch (I) {
                    console.warn("Error cleaning up iframe listener:", I)
                }
            }
            )
        }
    }
    , [t]),
    d.useEffect( () => {
        const v = () => {
            r(!1)
        }
          , w = () => {
            ir().then(k => {
                k && a === me.RECORDING && r(!0)
            }
            ).catch( () => {
                r(!1)
            }
            )
        }
        ;
        return window.addEventListener("scroll", v),
        window.addEventListener("scrollend", w),
        () => {
            window.removeEventListener("scroll", v),
            window.removeEventListener("scrollend", w)
        }
    }
    , [t]),
    t ? s.jsxs("div", {
        id: "guide-click-target",
        children: [s.jsx("div", {
            className: "z-9999 absolute text-white p-2 rounded-md text-xs",
            style: {
                left: n.x + 12,
                top: n.y + 12,
                backgroundColor: `${l}`,
                width: "max-content"
            },
            children: "Click to capture"
        }), s.jsx("div", {
            className: "border-rounded-sm",
            ref: c,
            style: {
                position: "absolute",
                border: `solid 2px ${l}`,
                pointerEvents: "none"
            }
        })]
    }) : null
}
  , Co = ["Scanning the page...", "Peeking behind the DOM curtain.", "Thinking...", "Mapping out the elements.", "Looking for just the right spot.", "Discombobulating the DOM.", "Thinking...", "Cross-referencing the layout.", "Untangling the HTML web.", "Following the selectors.", "Zooming in on potential targets.", "Thinking...", "Double-checking attributes.", "Almost there \u2014 element in sight!"]
  , ig = () => {
    const [e,t] = d.useState([])
      , r = d.useRef(0)
      , n = d.useRef(0)
      , [i,a] = d.useState(0)
      , [c,l] = d.useState(2 * 22)
      , [u,m] = d.useState(!0)
      , h = d.useRef(null)
      , v = d.useRef(null)
      , w = d.useRef()
      , [k,b] = d.useState(null)
      , [g,_] = d.useState(0)
      , I = d.useMemo( () => {
        try {
            return (window == null ? void 0 : window.matchMedia) && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        } catch {
            return !1
        }
    }
    , []);
    return d.useEffect( () => {
        if (v.current && (window.clearInterval(v.current),
        v.current = null),
        I)
            return () => {}
            ;
        const M = () => {
            m(!1),
            t(D => {
                const o = r.current % Co.length
                  , p = Co[o];
                r.current = o + 1;
                const f = n.current + 1;
                n.current = f;
                const x = [{
                    id: f,
                    text: p
                }, ...D].slice(0, 2 + 5);
                return b(f),
                _(0),
                x
            }
            ),
            requestAnimationFrame( () => {
                const D = h.current
                  , o = (D ? Array.from(D.children) : []).slice(0, 2).map(x => x.offsetHeight)
                  , p = o[0] ?? 22
                  , f = o.reduce( (x, E) => x + E, 0) || 2 * 22;
                if (l(f),
                a(-p),
                D) {
                    const x = D.offsetHeight;
                    D.dataset.reflow = String(x),
                    delete D.dataset.reflow
                }
                requestAnimationFrame( () => {
                    m(!0),
                    a(0)
                }
                )
            }
            ),
            window.setTimeout( () => {
                v.current && (window.clearInterval(v.current),
                v.current = null),
                v.current = window.setInterval( () => {
                    _(D => D + 1)
                }
                , 35)
            }
            , 50)
        }
        ;
        return w.current = M,
        M(),
        () => {
            v.current && (window.clearInterval(v.current),
            v.current = null)
        }
    }
    , [I, Co, 2, 35]),
    d.useEffect( () => {
        if (I || k === null)
            return;
        const M = e.find(o => o.id === k)
          , D = M ? M.text.length : 0;
        if (D > 0 && g >= D) {
            v.current && (window.clearInterval(v.current),
            v.current = null);
            const o = w.current;
            o && window.setTimeout( () => {
                o()
            }
            , 800)
        }
    }
    , [g, k, I, e, 800]),
    d.useEffect( () => {
        if (I)
            return;
        const M = h.current;
        if (!M)
            return;
        const D = Array.from(M.children).slice(0, 2).map(o => o.offsetHeight).reduce( (o, p) => o + p, 0) || 2 * 22;
        l(D)
    }
    , [g, I, 2]),
    s.jsx("div", {
        "aria-hidden": "true",
        role: "presentation",
        className: "overflow-hidden min-h-8",
        style: {
            height: `${c}px`,
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0))",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0))",
            width: "200px"
        },
        children: s.jsx("ul", {
            ref: h,
            className: "will-change-transform p-0 m-0 w-full list-none",
            style: {
                transform: `translateY(${i}px)`,
                transition: u ? "transform 500ms ease-out" : "none"
            },
            children: e.map(M => {
                const D = M.id === k ? M.text.slice(0, Math.min(g, M.text.length)) : M.text;
                return s.jsx("li", {
                    className: "leading-2 text-xs w-full text-slate-300",
                    style: {
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        whiteSpace: "normal"
                    },
                    children: D || "\xA0"
                }, M.id)
            }
            )
        })
    })
}
  , ag = ({visible: e}) => s.jsxs(s.Fragment, {
    children: [e && s.jsx(Oi, {}), s.jsxs(gc, {
        children: [s.jsx(bc, {
            className: "fixed bottom-4 right-4 top-auto left-auto z-[9999999] w-auto p-4"
        }), s.jsx(vc, {
            open: e,
            duration: 864e5,
            variant: "info",
            icon: Tl,
            title: "Locating element\u2026",
            className: "w-[240px] max-w-[240px] [&_[toast-close]]:hidden",
            description: s.jsx(ig, {})
        })]
    })]
})
  , sg = e => {
    const t = e.kind === "instruction" && !e.instruction_type
      , r = e.kind === "mouse_click_action" || e.kind === "keyboard_action" || e.kind === "keyboard_combination_action" || e.kind === "keyboard_sequence_action";
    return t || r
}
  , lg = () => {
    var e, t, r, n;
    try {
        return window && window.self !== window.top ? (t = (e = window.top) == null ? void 0 : e.location) == null ? void 0 : t.href : (r = window.location) == null ? void 0 : r.href
    } catch {
        return (n = window.location) == null ? void 0 : n.href
    }
}
  , cg = ({liveAction: e}) => {
    var N, y, O, A, L, z, F;
    const [t,r] = d.useState(void 0)
      , [n,i] = d.useState(!1)
      , [a,c] = d.useState(!1)
      , [l,u] = d.useState(!1)
      , [m,h] = d.useState(void 0)
      , [v,w] = d.useState(!1)
      , {guideMePinRecapture: k, guideMeSaveIframeDoms: b, guideMeAiFallback: g, guideMeLoader: _} = De(ce.getState())
      , I = (y = (N = ce.getState()) == null ? void 0 : N.extension) == null ? void 0 : y.status
      , M = (A = (O = ce.getState()) == null ? void 0 : O.auth) == null ? void 0 : A.userData
      , D = el((L = M == null ? void 0 : M.active_organization) == null ? void 0 : L.super_organization)
      , o = ((F = (z = M == null ? void 0 : M.active_organization) == null ? void 0 : z.super_organization) == null ? void 0 : F.allow_openai) && g && D;
    d.useEffect( () => {
        if (!e)
            return;
        const B = ki();
        h(B),
        chrome.runtime.sendMessage({
            messageType: "guideMeCaptureFreshPageScreenshot",
            data: {
                sessionId: t,
                requestId: B
            }
        })
    }
    , [e == null ? void 0 : e.id]);
    const p = () => {
        var V, $;
        const B = io(e == null ? void 0 : e.url, lg())
          , U = (V = e == null ? void 0 : e.screenshot) != null && V.id ? $t.NotFoundScreenshot : $t.NotFoundStep;
        if (!(e != null && e.aiFallbackElementId) && window.self === window.top && o)
            setTimeout( () => {
                var K;
                Mi();
                const W = (K = document == null ? void 0 : document.body) == null ? void 0 : K.outerHTML;
                tt({
                    showMessage: !0,
                    message: U,
                    url: window.location.href,
                    dom: W,
                    sessionId: t,
                    requestId: m
                })
            }
            , 250);
        else {
            w(!1),
            tt({
                showMessage: !0,
                message: U,
                sessionId: t,
                requestId: m
            });
            const W = b ? hi() : ($ = Ei(document == null ? void 0 : document.body)) == null ? void 0 : $.outerHTML;
            chrome.runtime.sendMessage({
                messageType: "trackGuideMeDom",
                documentId: e == null ? void 0 : e.document_id,
                actionId: e == null ? void 0 : e.id,
                type: B ? "selector_not_found" : "url_mismatch",
                domString: W
            })
        }
    }
      , f = () => {
        tt({
            showMessage: !1,
            message: void 0
        })
    }
      , x = ({matchMethod: B, centerCoordinates: U, algorithm: V}) => {
        var W;
        if (f(),
        w(!1),
        !e || !e.id || !e.document_id)
            return;
        const $ = b ? hi() : (W = Ei(document == null ? void 0 : document.body)) == null ? void 0 : W.outerHTML;
        chrome.runtime.sendMessage({
            messageType: "trackGuideMeDom",
            documentId: e.document_id,
            actionId: e.id,
            type: "selector_found",
            domString: $,
            trackingDetails: {
                matchMethod: B,
                algorithm: V,
                ...B === "ai_fallback" && {
                    modelResponseClickCoordinates: U
                }
            }
        })
    }
      , E = () => {
        ar("click_element_guide_me", {
            documentId: e == null ? void 0 : e.document_id,
            actionId: e == null ? void 0 : e.id
        }),
        f(),
        chrome.runtime.sendMessage({
            messageType: "liveTargetClicked"
        })
    }
      , j = (B, U) => {
        chrome.runtime.sendMessage({
            messageType: "guideMeOtherElementClicked",
            data: {
                sessionId: t,
                requestId: m,
                coordinates: {
                    x: B,
                    y: U
                }
            }
        })
    }
      , C = async () => {
        const B = await Yc();
        u(B)
    }
    ;
    d.useEffect( () => {
        pi( () => {
            i(!0)
        }
        )
    }
    , []);
    const S = async () => {
        C();
        const B = await Xc();
        B && r(B)
    }
    ;
    d.useEffect( () => {
        S()
    }
    , []);
    const T = () => {
        switch (e == null ? void 0 : e.kind) {
        case "mouse_click_action":
            ce.dispatch(ao("click"));
            break;
        case "keyboard_sequence_action":
            ce.dispatch(ao("autofill"));
            break;
        default:
            E()
        }
    }
    ;
    d.useEffect( () => {
        const B = U => {
            U.messageType === "guideMeStepForward" && T(),
            U.messageType === "setIsAutopilot" && c(U.isAutopilot),
            U.messageType === "userEditPermission" && u(!!(U != null && U.canEdit)),
            U.messageType === "showGuideMeLoading" && _ && w(!0),
            U.messageType === "hideGuideMeLoading" && w(!1)
        }
        ;
        return chrome.runtime.onMessage.addListener(B),
        () => {
            chrome.runtime.onMessage.removeListener(B)
        }
    }
    , [e]),
    d.useEffect( () => {
        const B = U => {
            U.key === "Enter" && T(),
            U.key === "ArrowLeft" && chrome.runtime.sendMessage({
                messageType: "guideMePreviousStepToSidepanel"
            }),
            U.key === "ArrowRight" && chrome.runtime.sendMessage({
                messageType: "liveTargetClicked"
            })
        }
        ;
        return a && window.addEventListener("keydown", B),
        () => {
            window.removeEventListener("keydown", B)
        }
    }
    , [a, T]);
    const P = d.useMemo( () => {
        var B, U, V;
        if (e)
            return {
                id: "live-target",
                selector: (B = e == null ? void 0 : e.domain) != null && B.includes("dynamics.com") ? ac(e == null ? void 0 : e.target_selector) : e == null ? void 0 : e.target_selector,
                xpath: (e == null ? void 0 : e.target_xpath) || "",
                tag: (e == null ? void 0 : e.target_tag) || "",
                text: (e == null ? void 0 : e.target_text) || "",
                attributes: (e == null ? void 0 : e.target_element_attributes) || null,
                domain: window.location.hostname,
                path: window.location.href,
                original_url: window.location.href,
                document_metadata: {
                    id: (e == null ? void 0 : e.document_id) ?? "live-target-meta",
                    name: (e == null ? void 0 : e.transcribed_description) || (e == null ? void 0 : e.description),
                    type: "scribe",
                    icon_color: "gray"
                },
                user_owner: {
                    id: "live-owner",
                    author_name: "live-author"
                },
                actionType: e == null ? void 0 : e.kind,
                keys: e == null ? void 0 : e.keys,
                timestamp: e == null ? void 0 : e.timestamp,
                actionExternalId: e == null ? void 0 : e.id,
                clickTargetColor: e == null ? void 0 : e.clickTargetColor,
                clickPosition: {
                    x: ((U = e == null ? void 0 : e.position_within_element) == null ? void 0 : U.x) || null,
                    y: ((V = e == null ? void 0 : e.position_within_element) == null ? void 0 : V.y) || null
                },
                recaptureEnabledForPublishing: e == null ? void 0 : e.recaptureEnabledForPublishing,
                was_in_iframe: e ? e.was_in_iframe : null,
                iframe_attributes: (e == null ? void 0 : e.iframe_attributes) || null,
                target_parent_attributes: (e == null ? void 0 : e.target_parent_attributes) || null,
                target_parent_tag: (e == null ? void 0 : e.target_parent_tag) || ""
            }
    }
    , [e]);
    if (e && !sg(e))
        return null;
    const R = P && ((P == null ? void 0 : P.selector) || (P == null ? void 0 : P.text) || (P == null ? void 0 : P.attributes) || (P == null ? void 0 : P.xpath)) && n && I !== me.RECORDING && I !== me.STARTING_RECORDING && I !== me.ENDING_RECORDING;
    return s.jsxs(s.Fragment, {
        children: [_ && s.jsx(ag, {
            visible: v
        }), R && s.jsx(rg, {
            guideMePin: P,
            aiFallbackElementId: e == null ? void 0 : e.aiFallbackElementId,
            onTargetClick: E,
            onOtherTargetClick: j,
            onSelectorNotFound: p,
            onSelectorFound: x,
            actionType: e == null ? void 0 : e.kind,
            description: e == null ? void 0 : e.description,
            liveActionNumber: e == null ? void 0 : e.ordinal,
            canEdit: l
        }), k && l && s.jsx(og, {
            liveAction: e
        })]
    })
}
  , Is = () => {
    var e, t, r, n;
    try {
        return window && window.self !== window.top ? (t = (e = window.top) == null ? void 0 : e.location) == null ? void 0 : t.href : (r = window.location) == null ? void 0 : r.href
    } catch {
        return (n = window.location) == null ? void 0 : n.href
    }
}
  , ug = () => {
    const [e,t] = d.useState(!1)
      , [r,n] = d.useState(void 0)
      , [i,a] = d.useState(!1)
      , c = d.useRef(void 0);
    d.useEffect( () => {
        c.current = r
    }
    , [r]);
    const l = u => {
        var m, h, v;
        if (u != null && u.isGuiding) {
            if (!u.isGuiding.newValue)
                return;
            const w = u.isGuiding.newValue === "true";
            t(w)
        }
        if (u != null && u.liveAction) {
            if (!u.liveAction.newValue)
                return;
            const w = JSON.parse(u.liveAction.newValue) ?? void 0
              , k = ((m = c.current) == null ? void 0 : m.id) === w.id && ((h = c.current) == null ? void 0 : h.timestamp) === w.timestamp && ((v = c.current) == null ? void 0 : v.aiFallbackElementId) === w.aiFallbackElementId;
            w && !k && n(w)
        }
    }
    ;
    return d.useEffect( () => (chrome.storage.local.get("isGuiding", u => {
        t(u.isGuiding === "true")
    }
    ),
    chrome.storage.local.get("liveAction", u => {
        n(u.liveAction ? JSON.parse(u.liveAction) : void 0)
    }
    ),
    chrome.storage.local.onChanged.addListener(l),
    () => {
        chrome.storage.local.onChanged.removeListener(l)
    }
    ), []),
    d.useEffect( () => {
        r && (io(r == null ? void 0 : r.url, Is()) ? (a(!1),
        tt({
            showMessage: !1,
            message: void 0
        })) : (tt({
            showMessage: !0,
            message: $t.UrlMismatch
        }),
        a(!0)))
    }
    , [r]),
    d.useEffect( () => {
        const u = async m => {
            if (m.messageType === "currentTabChanged") {
                const h = await Kc();
                io(h == null ? void 0 : h.url, Is()) ? tt({
                    showMessage: !1,
                    message: void 0
                }) : tt({
                    showMessage: !0,
                    message: $t.UrlMismatch
                })
            }
        }
        ;
        return chrome.runtime.onMessage.addListener(u),
        () => {
            chrome.runtime.onMessage.removeListener(u)
        }
    }
    , []),
    !e || !r || i ? null : s.jsx(cg, {
        liveAction: r
    })
}
  , dg = () => {
    const {sidepanelFob: e} = De(ce.getState())
      , {showSidepanelFob: t} = X(hn)
      , [r,n] = d.useState(!0)
      , [i,a] = d.useState(!1);
    return d.useEffect( () => {
        (async () => {
            var c;
            (c = await chrome.storage.local.get("hasSeenExtensionFob")) != null && c.hasSeenExtensionFob && a(!0),
            Ht.send("isExtensionPinned").then(l => {
                n(l)
            }
            )
        }
        )()
    }
    , []),
    d.useEffect( () => {
        t && (i || !r && e) && tl("sidekick_button", e)
    }
    , [t, i, r, e]),
    {
        isExtensionPinned: r,
        hasSeenExtensionFob: i
    }
}
  , pg = e => d.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...e
}, d.createElement("g", {
    id: "Logo Mark"
}, d.createElement("g", {
    id: "Vector"
}, d.createElement("path", {
    d: "M8.00004 11.284C8.00004 11.1521 8.09191 11.0378 8.22129 11.0087L15.6534 9.33645C15.831 9.29649 16 9.43074 16 9.61179V12.2953C16 12.4272 15.9081 12.5416 15.7788 12.5707L8.3466 14.2429C8.16902 14.2829 8.00004 14.1486 8.00004 13.9676V11.284Z",
    fill: "white"
}), d.createElement("path", {
    d: "M0 8.39425C0 8.26234 0.0918627 8.14801 0.221246 8.1189L15.6534 4.64663C15.8309 4.60668 15.9999 4.74093 15.9999 4.92198V7.6055C15.9999 7.73741 15.908 7.85174 15.7787 7.88085L0.34656 11.3531C0.168973 11.3931 0 11.2588 0 11.0778V8.39425Z",
    fill: "white"
}), d.createElement("path", {
    d: "M0 3.70468C0 3.57277 0.0918627 3.45845 0.221246 3.42933L7.6534 1.75708C7.83098 1.71712 7.99996 1.85137 7.99996 2.03242V4.71595C7.99996 4.84786 7.90809 4.96218 7.77871 4.99129L0.34656 6.66355C0.168973 6.70351 0 6.56926 0 6.3882V3.70468Z",
    fill: "white"
}))))
  , fg = ({browserContext: e}) => {
    const [t,r] = d.useState(window.innerWidth)
      , [n,i] = d.useState(window.innerHeight * (43 / 100))
      , [a,c] = d.useState(50)
      , [l,u] = d.useState(0)
      , m = d.useRef(0)
      , h = d.useRef(0)
      , v = d.useRef(!1)
      , [w,k] = d.useState(!1)
      , [b,g] = d.useState(!1)
      , [_,I] = d.useState(!1)
      , [M,D] = d.useState(!1)
      , {tab: o} = e
      , p = nl(o == null ? void 0 : o.url)
      , f = () => {
        I(!0),
        J("sidekick_opened", {
            location: "sidekick_button"
        }),
        chrome.runtime.sendMessage({
            messageType: "openSidePanel",
            route: gn.Home
        })
    }
      , x = async (y="right_click") => {
        D(!0),
        J("sidekick_button_hide_clicked", {
            domainName: p,
            location: y
        });
        const O = await Ci() || [];
        iu([...O, {
            domain: p,
            timeHidden: Date.now()
        }])
    }
      , E = () => {
        J("sidekick_button_hover"),
        g(!0)
    }
      , j = () => {
        w || g(!1)
    }
      , C = y => {
        y.button === 0 && (g(!1),
        k(!1),
        f())
    }
      , S = y => {
        if (!(v != null && v.current))
            return;
        const O = y.clientY - m.current
          , A = h.current + O
          , L = Math.max(0, Math.min(A, window.innerHeight));
        i(L),
        c(L / window.innerHeight * 100)
    }
      , T = () => {
        v.current = !1,
        k(!1),
        g(!1),
        document.body.style.cursor = "",
        document.body.style.userSelect = "",
        window.removeEventListener("pointermove", S),
        window.removeEventListener("pointerup", T)
    }
      , P = y => {
        J("sidekick_button_drag"),
        v.current = !0,
        k(!0),
        m.current = y.clientY,
        h.current = n,
        document.body.style.cursor = "grabbing",
        document.body.style.userSelect = "none",
        window.addEventListener("pointermove", S),
        window.addEventListener("pointerup", T)
    }
    ;
    if (d.useEffect( () => {
        const y = () => {
            r(window.innerWidth),
            i(window.innerHeight * (a / 100)),
            u(au())
        }
        ;
        return y(),
        window.addEventListener("resize", y),
        () => {
            window.removeEventListener("resize", y)
        }
    }
    , [a]),
    d.useEffect( () => {
        chrome.storage.local.set({
            hasSeenExtensionFob: !0
        }),
        chrome.storage.local.get("sidepanelActive", O => {
            I(O.sidepanelActive)
        }
        );
        const y = O => {
            var A;
            if (O.messageType === "sidepanelOpened" && I(!0),
            O.messageType === "sidepanelClosed" && I(!1),
            O.messageType === "hiddenFobDomainsUpdated") {
                const L = ((A = O.hiddenDomains) == null ? void 0 : A.some( ({domain: z}) => z === p)) || !1;
                D(L)
            }
        }
        ;
        return chrome.runtime.onMessage.addListener(y),
        () => chrome.runtime.onMessage.removeListener(y)
    }
    , []),
    d.useEffect( () => {
        (async () => {
            const y = (await Ci() || []).some(O => O.domain === p);
            D(y)
        }
        )()
    }
    , [p]),
    _ || M || window !== window.top)
        return null;
    const R = b ? 22 : 0
      , N = 18 + l + R;
    return s.jsx(qe, {
        children: s.jsx("div", {
            className: "group flex flex-col items-end pointer-events-none",
            style: {
                position: "absolute",
                top: n,
                left: t - N,
                zIndex: 999999,
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)"
            },
            id: "sidepanel-fob",
            children: s.jsxs("div", {
                className: "group flex flex-col items-center justify-center pointer-events-auto",
                onPointerEnter: E,
                onPointerLeave: j,
                children: [s.jsxs(de, {
                    children: [s.jsx(pe, {
                        children: s.jsx(oe, {
                            variant: "link",
                            onClick: () => x("x_button"),
                            icon: Vc,
                            iconProps: {
                                className: "text-slate-400"
                            },
                            size: "small",
                            className: re("text-slate-400 w-3.5 h-3.5 opacity-0 group-hover:opacity-100 mb-1", {
                                "opacity-100": b
                            }),
                            "aria-label": "Hide for this site"
                        })
                    }), s.jsx(se, {
                        side: "left",
                        sideOffset: 8,
                        className: "text-xs",
                        variant: "compact",
                        children: "Hide for this site"
                    })]
                }), s.jsx("div", {
                    className: "p-1 bg-slate-100/80 rounded-full shadow-[0px_0px_1px_0px_rgba(15,23,42,0.20),0px_5px_11px_0px_rgba(2,6,23,0.06),0px_2px_4px_0px_rgba(2,6,23,0.10)] outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[3px] inline-flex flex-col justify-center items-center gap-1",
                    style: {
                        cursor: w ? "grabbing" : "pointer"
                    },
                    onPointerDown: C,
                    children: s.jsxs("div", {
                        className: "p-2 relative bg-gradient-to-tr from-[#3ac2ff] to-[#3c2edd] to-50% rounded-full shadow-[0px_0px_1.5px_0px_rgba(2,6,23,0.10)] outline outline-1 outline-offset-[-1px] outline-black/5 inline-flex justify-center items-center gap-2 overflow-hidden",
                        children: [s.jsx("div", {
                            className: " flex items-center z-10",
                            children: s.jsx(pg, {})
                        }), s.jsx("div", {
                            className: "w-[32.56px] h-8 left-[28.02px] top-[20.65px] absolute origin-top-left rotate-[-125deg] bg-blend-overlay bg-gradient-to-br from-[#f45397] to-[#ffb425] to-60% blur-[5px] z-2"
                        })]
                    })
                }), s.jsx("div", {
                    style: {
                        cursor: w ? "grabbing" : "grab"
                    },
                    onPointerDown: P,
                    className: "mt-[2px]",
                    children: s.jsx(le, {
                        icon: Pl,
                        className: re("text-slate-400 w-3.5 h-3.5 opacity-0 group-hover:opacity-100", {
                            "opacity-100": b
                        })
                    })
                })]
            })
        })
    })
}
  , mg = "scribe-by://scribehow.com/signin"
  , hg = "scribehow://scribehow.com/signin"
  , gg = ({onCancel: e, hasPaidSubscription: t, installedDesktopRecorder: r}) => {
    const [n,i] = d.useState(t);
    return d.useEffect( () => {
        const a = s.jsxs(s.Fragment, {
            children: [s.jsx("div", {
                className: "mb-3",
                children: t ? "No problem! Use the desktop app." : "No problem! To capture guides for other applications, use Scribe Pro's desktop app."
            }), s.jsx(su, {
                theme: "dark",
                id: "dnsa",
                checked: n,
                onCheckedChange: l => i(l === !0),
                label: "Don't remind me again"
            })]
        });
        let c;
        t && r ? c = s.jsx(bn, {
            altText: "Switch to Desktop",
            onClick: () => {
                J("switch_to_desktop", {
                    location: "web_only_notification"
                }),
                rl() === ol.MacOS ? window.open(hg) : window.open(mg)
            }
            ,
            className: "!mt-2",
            children: "Switch to Desktop"
        }) : t && !r ? c = s.jsx(bn, {
            altText: "Install Desktop App",
            onClick: () => {
                J("get_scribe_desktop", {
                    location: "web_only_notification"
                }),
                window.open("https://scribehow.com/get-desktop")
            }
            ,
            className: "!mt-2",
            children: "Install Desktop App"
        }) : c = s.jsx(bn, {
            altText: "Get Scribe Pro",
            onClick: () => {
                J("show_pro_features_workspace_page", {
                    location: "web_only_notification"
                });
                const l = wi({
                    location: "web_only_notification",
                    frontendUrl: $o.FRONTEND_URL,
                    variant: _i.FREE_TO_PRO
                });
                window.open(l)
            }
            ,
            className: "!mt-2",
            children: "Get Scribe Pro"
        }),
        xc({
            title: "Capturing outside the browser?",
            description: a,
            onOpenChange: l => {
                l || (e == null || e(n))
            }
            ,
            action: s.jsxs(yc, {
                children: [c, s.jsx(bn, {
                    altText: "Dismiss",
                    variant: "secondary",
                    onClick: () => e == null ? void 0 : e(n),
                    className: "!mt-2",
                    children: "Dismiss"
                })]
            })
        })
    }
    , [n, t, r, e]),
    null
}
  , jo = "won-dnsa"
  , bg = ({isPlanFree: e}) => {
    const {userData: t} = X(zt)
      , {installed_desktop_recorder: r} = t || {}
      , [n,i] = d.useState(!1);
    return d.useEffect( () => {
        const a = async (c, l, u) => {
            c.messageType === "switchedAwayFromBrowser" && (localStorage.getItem("userSwitchedAwayFromBrowser") === null && localStorage.setItem("userSwitchedAwayFromBrowser", "true"),
            chrome.storage.sync.get([jo], m => {
                m[jo] !== !0 ? (J("switched_away_from_browser", {
                    show_web_only_notification: !0,
                    installed_desktop_recorder: r
                }, Wo),
                i(!0)) : J("switched_away_from_browser", {
                    show_web_only_notification: !1,
                    installed_desktop_recorder: r
                }, Wo)
            }
            ))
        }
        ;
        return chrome.runtime.onMessage.addListener(a),
        () => chrome.runtime.onMessage.removeListener(a)
    }
    , []),
    n ? s.jsx(gg, {
        hasPaidSubscription: !e,
        installedDesktopRecorder: !!r,
        onCancel: a => {
            i(!1),
            J("dismiss_web_only_notification", {
                do_not_show_again: a,
                is_plan_free: e
            }),
            chrome.storage.sync.set({
                [jo]: a
            })
        }
    }) : null
}
  , vg = () => {
    const {workspaceScribes: e, galleryScribes: t, scribeCountOnDomain: r} = X(Ho)
      , {userData: n, userGrowthState: i} = X(zt)
      , {selectModalVisible: a, recordModalVisible: c} = X(Go)
      , {dropdownOpen: l} = X(Vo)
      , u = X(il)
      , {isMissingPermissions: m} = X(sc)
      , h = X(qo)
      , v = X(al)
      , w = X(sl)
      , k = X(ll)
      , b = d.useRef(null)
      , g = () => chrome.runtime.sendMessage({
        messageType: "closeDropdown"
    })
      , {copilot: _, scribeLivePhoenix2023q3: I, sidepanelFob: M, pinTreasures: D} = De(ce.getState())
      , {showSidepanelFob: o} = X(hn)
      , {hasSeenExtensionFob: p} = dg();
    ku(g, b),
    wc(),
    uc(),
    dc(),
    pc(),
    lc(D);
    const {pins: f} = X(cl);
    return d.useEffect( () => {
        D && chrome.runtime.sendMessage({
            messageType: "fetchViewedPins"
        })
    }
    , [D]),
    u ? s.jsxs(s.Fragment, {
        children: [o && (p || M === "experiment") && s.jsx(fg, {
            browserContext: w
        }), D && k && s.jsx(md, {
            pins: f
        }), _ && v && s.jsx(wu, {}), _ && v && s.jsx(_u, {}), I && s.jsx(bu, {
            children: s.jsx(ug, {})
        }), s.jsx(lu, {}), h && s.jsx(Um, {
            isPlanFree: vn(n)
        }), h && !v && s.jsx(bg, {
            isPlanFree: vn(n)
        }), s.jsx(gu, {
            in: l,
            nodeRef: b,
            timeout: 300,
            classNames: "Widget",
            unmountOnExit: !0,
            children: s.jsx("div", {
                id: "ScribeApp",
                ref: b,
                children: s.jsx(cc, {
                    scribeCountOnDomain: r,
                    workspaceScribes: e,
                    galleryScribes: t,
                    user: n,
                    onClose: g,
                    missingPermissions: m,
                    userGrowthState: i
                })
            })
        }), a && s.jsx(Ru, {}), c && s.jsx(Eu, {})]
    }) : (l && document.hasFocus() && chrome.runtime.sendMessage({
        messageType: "trackNewRelicLog",
        name: "extension_content_not_displayed",
        details: {
            ...w,
            url: window.location.href
        }
    }),
    null)
}
;
var xg = typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
xg.SENTRY_RELEASE = {
    id: "8effd506599f6fafb1a48c2ce96f05fa857d4332"
};
let dn;
function yg() {
    document.body.addEventListener("click", () => {
        var e, t, r;
        (e = document.body.dataset) != null && e.openSidepanelDocsOnBodyClick && (chrome.runtime.connect({
            name: "sidePanelPort"
        }).postMessage({
            messageType: "openSidePanel",
            route: gn.Assistant
        }),
        document.body.removeAttribute("data-open-sidepanel-docs-on-body-click")),
        (t = document.body.dataset) != null && t.openSidepanelHomeOnBodyClick && (chrome.runtime.connect({
            name: "sidePanelPort"
        }).postMessage({
            messageType: "openSidePanel",
            route: gn.Home
        }),
        document.body.removeAttribute("data-open-sidepanel-home-on-body-click")),
        (r = document.body.dataset) != null && r.openSidepanelRecorderOnBodyClick && (chrome.runtime.connect({
            name: "sidePanelPort"
        }).postMessage({
            messageType: "openSidePanel",
            route: gn.Recorder
        }),
        document.body.removeAttribute("data-open-sidepanel-recorder-on-body-click"))
    }
    , !0)
}
ul && yg();
try {
    if ((Rs = window.document.documentElement) != null && Rs.getAttribute("data-html2canvasroot"))
        throw new Error("injecting into html2canvas frame, skipping init");
    const e = document.getElementById(Ut);
    e && e.remove();
    const t = document.createElement("scribe-shadow");
    t.id = Ut,
    t.style.cssText = "position: fixed; width: 0; height: 0;  top: 0; left: 0; z-index: 2147483647; overflow: visible; visibility: visible;",
    t.setAttribute("data-crx", chrome.runtime.id),
    document.body.appendChild(t);
    const r = t.attachShadow({
        mode: "open"
    })
      , n = new FontFace("Public Sans",`url('${chrome.runtime.getURL(pl)}')`);
    document.fonts.add(n);
    const i = document.createElement("div");
    i.id = "root-scribe-elem",
    i.style.cssText = "position: fixed; width: 0; height: 0; top: 0; left: 0; overflow: visible; color: #0f172a;",
    r.appendChild(i),
    dn = () => {
        Lt.render(s.jsxs(G.StrictMode, {
            children: [void 0, s.jsx(fl, {
                store: ce,
                children: s.jsx(vg, {})
            })]
        }), i)
    }
    ,
    cu().then(a => {
        a === Ft.Arc && (ml("recordingControlsPreference", "floating-button"),
        chrome.runtime.sendMessage({
            messageType: "optionsChanged"
        })),
        dl("detectedBrowser", a),
        chrome.storage.local.set({
            detectedBrowser: a
        })
    }
    );
    {
        const a = document.createElement("link");
        a.setAttribute("rel", "stylesheet"),
        a.setAttribute("href", chrome.runtime.getURL("/assets/style.css")),
        a.onload = dn,
        r.appendChild(a)
    }
} catch {}
const wg = () => {
    dn == null || dn()
}
;
export {wg as onExecute};
