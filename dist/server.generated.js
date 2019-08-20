module.exports=function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/dist/",r(r.s=5)}([function(e,n){e.exports=require("express")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("xlsx")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("formidable")},function(e,n,r){r(6),e.exports=r(7)},function(e,n){e.exports=require("babel-polyfill")},function(e,n,r){"use strict";r.r(n);var t=r(0),o=r.n(t),i=r(3),a=r.n(i),c=r(1),f=r.n(c),l=r(4),u=r.n(l),s=r(2),d=r.n(s);const p=r(8).pd,g=o()();g.use(f.a.urlencoded({extended:!1})),g.use(f.a.json());const b=process.cwd();function m(e){var n={};n.paramsArr=[];var r="",t="",o="",i="",a="";n.prob_tmp_name="zzzzzz";for(let n of e)try{if(n.A.includes("Error Table")){var c=n.C;if("D"in n&&"string"==typeof n.D){var f=n.D;if("number"!=typeof n.D)var l=f.replace(/\s/g,"").split(",")}"D"in n&&"number"==typeof n.D&&(l=n.D)}if(n.A.includes("Tutelage ID")&&(r=`<tutelage_tmpl name="${n.B}">`,t=`<tutelage_ref name="${n.B}">`,a=n.B),n.A.includes("Tutelage Variables")&&"B"in n){var u=n.B.replace(/\s/g,"").split(",");o="<params>";for(let e of u)o+=`<param name="${e}" type="int"/>`,i+=`<bind name="${e}" val="${e}"/>`;o+="</params>"}}catch(e){console.log(e)}return`${r}${o}${function(e,n,r,t){var o="";for(let i of e)"FIB"==r&&"E"in i&&(o+=`${$(i,n)}`),"MCQ"==r&&"E"in i&&(o+=`${y(i)}`),"FIB/MCQ"==r&&"E"in i&&t.includes("M",0)&&(console.log("Valid"),o+=`${y(i)}`),"FIB/MCQ"==r&&"E"in i&&!t.includes("M",0)&&(o+=`${$(i,n)}`),"SLOT"==r&&"E"in i&&(o+=`${v(i)}`),"NBL"==r&&"E"in i&&(o+=`${_(i)}`);return o}(e,l,c,a)}</tutelage_tmpl>${t}${i}</tutelage_ref>`}function $(e,n){var r="";if("NA"!==e.B){if(r+=`<feedback name="${e.B}"><trigger>`,e.A.includes("Other"))return`${r}</trigger></feedback>`;if("number"!=typeof e.A)var t=e.A.replace(/\s/g,"").split(/[,;]/);if(void 0!==t){if(t.length>=2&&"object"==typeof n&&"object"==typeof t)for(var o=0;o<t.length;o++)o<n.length?r+=`<cond><fib_ref name="fib${n[o]}"/>==${t[o]}</cond>`:r+=`<cond>${t[o]}</cond>`;if("number"==typeof n&&"object"==typeof t){r+=`<cond><fib_ref name="fib${n}"/>==${t[0]}</cond>`;for(o=1;o<t.length;o++)r+=`<cond>${t[o]}</cond>`}}else r+="number"==typeof n?`<cond><fib_ref name="fib${n}"/>==${t}</cond>`:`<cond>${t}</cond>`;return`${r}</trigger></feedback>`}return""}function y(e){var n="";return"NA"!==e.B?`${n+=`<feedback name = "${e.B}"><trigger><cond><choice_ref name ="${e.A}"/>==1</cond>`}</trigger></feedback>`:""}function v(e){var n="";if("NA"!==e.B){var r=e.A.split("≠");return`${n+=`<feedback name = "${e.B}"><trigger><cond>!<slot_ref name="${r[0].replace(/\s/g,"")}"/>.contains("${r[1].replace(/\s/g,"")}")</cond>`}</trigger></feedback>`}return""}function _(e){var n="";return"NA"!==e.B||"Other"!==e.A?(n+=`<feedback name = "${e.B}"><trigger><cond>!<number_line_ref name="nbl1"/>.contains("${e.A}")</cond>`,console.log("Function",e.A),`${n}</trigger></feedback>`):"Other"==e.A?(n+=`<feedback name = "${e.B}">`,console.log("Function",n),`${n}</feedback>`):""}g.use(o.a.static(a.a.join(b,"public"))),g.get("/test",(e,n)=>{n.send("My page")}),g.get("/test1",(e,n)=>{n.send("My page 2")}),g.get("/getfile",(e,n)=>{console.log(e.query),n.send("My page 2")}),g.post("/getfile",(e,n)=>{(new u.a.IncomingForm).parse(e).on("file",function(e,r){let t=d.a.readFile(`${r.path}`),o="",i="",a=t.SheetNames;for(let e of a){o=d.a.utils.sheet_to_json(t.Sheets[e],{defVal:""}),console.log(o);let n=m(o);console.log(p.xml(n)),i+=m(o)}return n.send(p.xml(i))})}),g.get("*",(e,n)=>{n.send("My web page")});const x=process.env.PORT||3e3;g.listen(x)},function(e,n){e.exports=require("pretty-data")}]);