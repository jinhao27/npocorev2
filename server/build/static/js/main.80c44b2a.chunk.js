(this["webpackJsonpnpocore-client"]=this["webpackJsonpnpocore-client"]||[]).push([[0],{32:function(e,a,t){e.exports=t(41)},41:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(11),o=t.n(r),c=t(9),i=t(10),s=t(22),m=t(23),u=t(31),E=t(30),v=(t(17),t(7)),p=t(12);t(15);var d=function(){var e=Object(n.useState)(!1),a=Object(v.a)(e,2),t=a[0],r=a[1],o=Object(n.useState)([]),i=Object(v.a)(o,2),s=(i[0],i[1],Object(n.useState)("")),m=Object(v.a)(s,2),u=(m[0],m[1],Object(n.useState)("")),E=Object(v.a)(u,2),d=(E[0],E[1],Object(n.useState)("")),g=Object(v.a)(d,2),b=(g[0],g[1],Object(n.useState)("")),f=Object(v.a)(b,2),h=(f[0],f[1],Object(n.useState)("")),N=Object(v.a)(h,2),O=(N[0],N[1],Object(n.useState)("")),C=Object(v.a)(O,2),y=(C[0],C[1],function(){r(!1)});return Object(n.useEffect)((function(){console.log("hi")})),l.a.createElement("div",null,l.a.createElement("button",{class:"btn btn-info npo-button",onClick:function(){r(!0)}},"Add your NPO!"),l.a.createElement(p.a,{show:t,onHide:y},l.a.createElement(p.a.Header,null,l.a.createElement("h3",null,"Our Database is Down!")),l.a.createElement(p.a.Body,null,l.a.createElement("p",null,"We're sorry! We've recently received a DoS (Denial of Service) attack on our database, so our database is temporarily shut down. If you'd like to add your nonprofit organization, please ",l.a.createElement(c.b,{onClick:y,to:"/contact"},"contact us"),".",l.a.createElement("br",null),l.a.createElement("br",null),"Sorry for the inconvenience.")),l.a.createElement(p.a.Footer,null,l.a.createElement(c.b,{class:"btn btn-info",onClick:y,to:"/contact"},"Contact us!"),".")))},g=function(e){Object(u.a)(t,e);var a=Object(E.a)(t);function t(){return Object(s.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){return l.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-light"},l.a.createElement("div",{className:"container"},l.a.createElement("a",{className:"navbar-brand",href:"/"},l.a.createElement("img",{className:"npocore-logo",src:"img/npocore.png",alt:""})),l.a.createElement("button",{className:"navbar-toggler","data-toggle":"collapse","data-target":"#navbar-target"},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbar-target"},l.a.createElement("ul",{className:"navbar-nav ml-auto"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/"},"Home")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"/contact"},"Contact")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(c.b,{className:"nav-link",to:"/organizations"},"Organizations")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(d,null))))))}}]),t}(l.a.Component),b=t(27);var f=function(){var e=Object(n.useState)([]),a=Object(v.a)(e,2),t=a[0],r=(a[1],Object(n.useState)([])),o=Object(v.a)(r,2),i=o[0],s=o[1],m=function(){console.log("save")};Object(n.useEffect)((function(){document.title="NPO Core - Organizations",m()}),[]);var u=function(e){var a=e.target;a.parentNode.style.display="none",a.parentNode.parentNode.parentNode.querySelector("p").className=""};return l.a.createElement("div",null,l.a.createElement(b.a,null,l.a.createElement("title",null,"NPO Core - A List of Nonprofit Organizations for High School & College Students"),l.a.createElement("meta",{name:"description",content:"Look at our huge, curated list of nonprofit organizations that we've built up! Find a nonprofit organization to join, partner with, or simply get in contact with here on NPO Core!"})),l.a.createElement("div",{className:"pb-5"},l.a.createElement("h1",{className:"mt-4"},"Organizations"),l.a.createElement("small",null,"If you would like your nonprofit organization removed from NPO Core, please ",l.a.createElement(c.b,{to:"/contact"},"contact us"),"."),l.a.createElement("div",{className:"filters mt-3"},l.a.createElement("input",{className:"form-control search-bar",type:"text",placeholder:"Filter",onChange:function(e){var a=e.target.value.toLowerCase();if(""===a)m();else{var n=t.filter((function(e){return e.name.toLowerCase().includes(a)}));s(n)}}}),l.a.createElement("select",{onChange:function(e){var a=e.target.value;a?s(t.filter((function(e){return e.gender===a}))):m()},required:!0},l.a.createElement("option",{value:""},"Gender"),l.a.createElement("option",{value:"Everyone"},"Everyone"),l.a.createElement("option",{value:"Male"},"Male"),l.a.createElement("option",{value:"Female"},"Female"),l.a.createElement("option",{value:"Non-binary"},"Non-binary")),l.a.createElement("select",{onChange:function(e){var a=e.target.value;a?s(t.filter((function(e){return e.cause===a}))):m()},required:!0},l.a.createElement("option",{value:""},"Cause"),l.a.createElement("option",{value:"Animal Welfare"},"Animal Welfare"),l.a.createElement("option",{value:"Arts and Culture"},"Arts and Culture"),l.a.createElement("option",{value:"Children"},"Children"),l.a.createElement("option",{value:"Civil Rights and Social Action"},"Civil Rights and Social Action"),l.a.createElement("option",{value:"Disaster Relief"},"Disaster Relief"),l.a.createElement("option",{value:"Economic Empowerment"},"Economic Empowerment"),l.a.createElement("option",{value:"Education"},"Education"),l.a.createElement("option",{value:"Environment"},"Environment"),l.a.createElement("option",{value:"Health"},"Health"),l.a.createElement("option",{value:"Human Rights"},"Human Rights"),l.a.createElement("option",{value:"Politics"},"Politics"),l.a.createElement("option",{value:"Poverty Alleviation"},"Poverty Alleviation"),l.a.createElement("option",{value:"Science and Technology"},"Science and Technology"),l.a.createElement("option",{value:"Social Services"},"Social Services")),l.a.createElement("select",{onChange:function(e){var a=e.target.value;a?s(t.filter((function(e){return e.interests.includes(a)}))):m()},required:!0},l.a.createElement("option",{value:""},"Interest"),l.a.createElement("option",{value:"Members"},"Members"),l.a.createElement("option",{value:"Partnerships"},"Partnerships"),l.a.createElement("option",{value:"Sponsors"},"Sponsors"),l.a.createElement("option",{value:"Clients"},"Clients"),l.a.createElement("option",{value:"Opportunities"},"Opportunities")),l.a.createElement("button",{class:"refresh-organizations",onClick:m},l.a.createElement("img",{src:"/img/refresh.svg",alt:""}))),l.a.createElement("div",{className:"organizations mt-5"},i.map((function(e,a){return l.a.createElement("div",{className:"organization",key:a},l.a.createElement("div",{className:"organization-header"},l.a.createElement("h5",null,e.name),l.a.createElement("div",{className:"organization-resources"},l.a.createElement("a",{href:"mailto:{organization.email}",target:"_"},e.email?l.a.createElement("img",{src:"/img/email.svg",alt:"{organization.name} Email Address"}):null),l.a.createElement("a",{href:e.website,target:"_"},l.a.createElement("img",{src:"/img/link.svg",alt:"{organization.name} Website"})))),l.a.createElement("div",null,l.a.createElement("strong",null,"Gender:")," ",e.gender),l.a.createElement("div",null,l.a.createElement("strong",null,"Cause:")," ",e.cause),l.a.createElement("p",{className:"organization-description"},l.a.createElement("strong",null,"Description:")," ",e.description),l.a.createElement("div",{className:"text-right mb-2"},l.a.createElement("button",{className:"btn btn-link p-0",onClick:u},l.a.createElement("small",null,"Read More"))),l.a.createElement("div",{className:"organization-interests"},(e.interests||[]).map((function(e,a){return l.a.createElement("small",null,e)}))))})))))};var h=function(){return l.a.createElement("div",null,l.a.createElement(c.a,null,l.a.createElement("div",null,l.a.createElement(g,null),l.a.createElement(i.c,null,l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"hover-container"},l.a.createElement(i.a,{path:"/organizations",component:f})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[32,1,2]]]);
//# sourceMappingURL=main.80c44b2a.chunk.js.map