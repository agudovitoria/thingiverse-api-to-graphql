(this["webpackJsonpthingiverse-api-to-graphql-client"]=this["webpackJsonpthingiverse-api-to-graphql-client"]||[]).push([[0],{50:function(e,t,n){e.exports=n(82)},55:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(16),o=n.n(r),l=(n(55),n(43)),i=n(6),s=n(88),m=n(89),u=n(20),E=n(41),f=n.n(E),v=n(42),d=function e(){Object(v.a)(this,e)};d.loginUri="".concat(d.base="http://localhost:8080/api","/login"),d.codeToTokenUri="/exchange";var h=f.a.create({baseURL:d.base}),g=function(){if(!sessionStorage.getItem("access_token"))return window.location.href=d.loginUri;window.location.href="/"},p=function(e){var t=new URLSearchParams;t.append("code",e);var n="".concat(d.codeToTokenUri,"?").concat(t.toString());return h.get(n).then((function(e){return e.data})).then((function(e){if(!e)throw new Error("Invalid access token response");return function(e){var t=e.access_token;sessionStorage.removeItem("access_token"),sessionStorage.setItem("access_token",t)}(e),e}))},k=n(84),b=n(85),w=n(86),N=n(87),O=function(){var e=Object(u.a)({title:{fontSize:"48px",textAlign:"center"}})();return c.a.createElement(k.a,null,c.a.createElement(b.a,null,c.a.createElement(w.a,null,c.a.createElement(b.a,null,c.a.createElement(w.a,null,c.a.createElement("span",{className:e.title},"Thingiverse Graphql"))),c.a.createElement(b.a,null,c.a.createElement(w.a,null,c.a.createElement(N.a,{variant:"outline-primary",onClick:function(){return g()}},"LOGIN"))))))},j=function(e){var t=e.title,n=Object(u.a)({title:{fontSize:"48px",textAlign:"center"}})();return c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("span",{className:n.title},t||"untitled")))},x=function(){return c.a.createElement("div",{className:"row centered"},c.a.createElement("div",{className:"col centered flex-50"},c.a.createElement("div",{className:"box"},c.a.createElement(j,{title:"Home page"}))))},S=n(17),T=function(e){var t=e.message;return c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("span",{className:"error-message"},t||"No message")))},L=function(e){var t=e.content;return c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("span",null,t)))},U=n(28),I=Object(a.createContext)({token:"",setToken:function(e){}}),R=function(e){var t={token:"",setToken:function(e){var t=e.access_token;return l(Object(U.a)(Object(U.a)({},o),{},{token:t}))}},n=Object(a.useState)(t),r=Object(S.a)(n,2),o=r[0],l=r[1];return c.a.createElement(I.Provider,{value:t},e.children)},_=function(e){var t=Object(a.useContext)(I),n=t.token,r=t.setToken,o=Object(a.useState)(!1),l=Object(S.a)(o,2),i=l[0],s=l[1],m=Object(a.useState)(""),u=Object(S.a)(m,2),E=u[0],f=u[1],v=Object(a.useState)(""),d=Object(S.a)(v,2),h=d[0],g=d[1];Object(a.useEffect)((function(){k(),p(h).then((function(e){r(e)})).then((function(){window.location.href="/"})).catch(w).finally((function(){return b()}))}),[h]);var k=function(){return s(!0)},b=function(){return s(!1)},w=function(e){var t=e.message;return f(t)};return function(e){var t=new URLSearchParams(e.search).get("code")||"";!!t&&(!h||t!==h)&&g(t)}(e.location),c.a.createElement("div",{className:"row centered"},c.a.createElement("div",{className:"col centered flex-50"},c.a.createElement("div",{className:"box"},c.a.createElement(j,{title:"Callback page"}),!!E&&c.a.createElement(T,{message:E}),i&&c.a.createElement(L,{content:"Retrieving token from code ".concat(h)}),!!n&&c.a.createElement(L,{content:"Received token: ".concat(n)}))))},y=function(){return c.a.createElement(R,null,c.a.createElement(l.a,null,c.a.createElement(s.a,null,c.a.createElement(m.a.Link,{href:"/"},"Home"),c.a.createElement(m.a.Link,{href:"/login"},"Login")),c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"/"},c.a.createElement(x,null)),c.a.createElement(i.a,{exact:!0,path:"/login"},c.a.createElement(O,null)),c.a.createElement(i.a,{path:"/callback",component:_}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.b096f444.chunk.js.map