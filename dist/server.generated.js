module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=5)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("xlsx")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("formidable")},function(e,t,n){n(6),e.exports=n(7)},function(e,t){e.exports=require("babel-polyfill")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(3),a=n.n(i),f=n(1),u=n.n(f),c=n(4),l=n.n(c),s=n(2),p=n.n(s);const d=n(8).pd,g=o()();g.use(u.a.urlencoded({extended:!1})),g.use(u.a.json());const b=process.cwd();function m(e){var t={};t.paramsArr=[];var n="",r="",o="",i="";t.prob_tmp_name="zzzzzz";for(let t of e)try{if(t.A.includes("Error Table")){var a=t.C;if("D"in t&&"string"==typeof t.D){var f=t.D;if("number"!=typeof t.D)var u=f.replace(/\s/g,"").split(",")}"D"in t&&"number"==typeof t.D&&(u=t.D)}if(t.A.includes("Tutelage ID")&&(n=`<tutelage_tmpl name="${t.B}">`,r=`<tutelage_ref name="${t.B}">`),t.A.includes("Tutelage Variables")&&"B"in t){var c=t.B.replace(/\s/g,"").split(",");o="<params>";for(let e of c)o+=`<param name="${e}" type="int"/>`,i+=`<bind name="${e}" val="${e}"/>`;o+="</params>"}}catch(e){console.log(e)}return`${n}${o}${function(e,t,n){var r="";for(let o of e)"FIB"==n&&"E"in o&&(r+=`${y(o,t)}`),"MCQ"==n&&"E"in o&&(r+=`${$(o)}`);return r}(e,u,a)}</tutelage_tmpl>${r}${i}</tutelage_ref>`}function y(e,t){var n="";if("NA"!==e.B){if(n+=`<feedback name="${e.B}"><trigger>`,"number"!=typeof e.A)var r=e.A.replace(/\s/g,"").split(/[,;]/);if(r.length>=2){if("object"==typeof t&&"object"==typeof r)for(var o=0;o<r.length;o++)o<t.length?n+=`<cond><fib_ref name="fib${t[o]}"/>==${r[o]}</cond>`:n+=`<cond>${r[o]}</cond>`;if("number"==typeof t&&"object"==typeof r){n+=`<cond><fib_ref name="fib${t}"/>==${r[0]}</cond>`;for(o=1;o<r.length;o++)n+=`<cond>${r[o]}</cond>`}}else n+="number"==typeof t?`<cond><fib_ref name="fib${t}"/>==${r}</cond>`:`<cond>${r}</cond>`;return`${n}</trigger></feedback>`}return""}function $(e){var t="";return"NA"!==e.B?`${t+=`<feedback name = "${e.B}"><trigger><cond><choice_ref name ="${e.A}"/>==1</cond>`}</trigger></feedback>`:""}g.use(o.a.static(a.a.join(b,"public"))),g.get("/test",(e,t)=>{t.send("My page")}),g.get("/test1",(e,t)=>{t.send("My page 2")}),g.get("/getfile",(e,t)=>{console.log(e.query),t.send("My page 2")}),g.post("/getfile",(e,t)=>{(new l.a.IncomingForm).parse(e).on("file",function(e,n){let r=p.a.readFile(`${n.path}`),o="",i="",a=r.SheetNames;for(let e of a){o=p.a.utils.sheet_to_json(r.Sheets[e],{defVal:""}),console.log(o);let t=m(o);console.log(d.xml(t)),i+=m(o)}return t.send(d.xml(i))})}),g.get("*",(e,t)=>{t.send("My web page")});const v=process.env.PORT||3e3;g.listen(v)},function(e,t){e.exports=require("pretty-data")}]);