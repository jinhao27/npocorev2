(this["webpackJsonpnpocore-client"]=this["webpackJsonpnpocore-client"]||[]).push([[0],{31:function(e,a,t){e.exports=t(41)},41:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(11),o=t.n(l),c=t(10),i=t(9),s=t(12),m=t.n(s),u=t(16),E=t(4),p=t(44);t(20),t(15),t(18);var g=function(){var e=Object(n.useState)({}),a=Object(E.a)(e,2),t=a[0],l=a[1],o=Object(p.a)(["name"]),c=Object(E.a)(o,2),i=c[0];return c[1],Object(n.useEffect)(Object(u.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l(i.organization);case 2:case"end":return e.stop()}}),e)}))),[]),r.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-light"},r.a.createElement("div",{className:"container"},r.a.createElement("a",{className:"navbar-brand",href:"/"},r.a.createElement("img",{src:"/static/img/npocore.png",alt:"NPO Core Logo"})),r.a.createElement("button",{className:"navbar-toggler","data-toggle":"collapse","data-target":"#navbar-target"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbar-target"},r.a.createElement("ul",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/contact"},"Contact")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/organizations"},"Organizations")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/opportunities"},"Opportunities")),void 0==t?r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"btn btn-info npo-button",href:"/login"},"Login/Register")):r.a.createElement("li",{className:"nav-item dropdown"},r.a.createElement("a",{className:"nav-link",href:"#",id:"navbarDropdown",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},t.logo?r.a.createElement("div",{className:"image-cropper"},r.a.createElement("img",{className:"nav-logo",src:"https://npocore.s3-us-west-2.amazonaws.com/"+t.logo,alt:""})):r.a.createElement("div",{className:"image-cropper"},r.a.createElement("img",{className:"nav-logo",src:"/static/img/no-logo.png",alt:""}))),r.a.createElement("div",{className:"dropdown-menu","aria-labelledby":"navbarDropdown"},r.a.createElement("a",{className:"dropdown-item",href:"/@"+t.idName},"View my organization"),r.a.createElement("div",{className:"dropdown-divider"}),r.a.createElement("a",{className:"dropdown-item",href:"/logout"},"Logout")))))))},d=t(28);var v=function(){var e=Object(n.useState)([]),a=Object(E.a)(e,2),t=a[0],l=a[1],o=Object(n.useState)([]),c=Object(E.a)(o,2),i=c[0],s=c[1],p=Object(n.useState)([]),g=Object(E.a)(p,2),v=g[0],f=g[1],h=Object(n.useState)(!1),N=Object(E.a)(h,2),b=N[0],y=N[1],w=Object(n.useState)(""),z=Object(E.a)(w,2),O=z[0],C=z[1],j=Object(n.useState)(""),S=Object(E.a)(j,2),k=S[0],A=S[1],x=Object(n.useState)(""),R=Object(E.a)(x,2),L=R[0],P=R[1],T=Object(n.useState)(""),F=Object(E.a)(T,2),H=F[0],M=F[1],D=function(){var e=Object(u.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("/api/get-organizations",{method:"GET",mode:"no-cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){s(e),l(e);var a=e.filter((function(e){return 1==e.featured}));f(a)})).catch((function(e){console.log("Exception:",e)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){D()}),[]),Object(n.useEffect)((function(){G()}),[O,k,L,H]);var G=function(){var e=t;e=W(e),e=q(e),e=B(e),e=Y(e),s(e)},W=function(e){var a=O.toLowerCase();return""===a?e:e.filter((function(e){return e.name.toLowerCase().includes(a)}))},q=function(e){return k?e.filter((function(e){return e.targetAudience===k})):e},B=function(e){return L?e.filter((function(e){return e.cause===L})):e},Y=function(e){return H?e.filter((function(e){return!!e.interests&&e.interests.includes(H)})):e},V=function(e){var a=e.target;a.parentNode.style.display="none",a.parentNode.parentNode.parentNode.querySelector("p").className=""},I=function(e){y(!b)};return r.a.createElement("div",null,r.a.createElement(d.a,null,r.a.createElement("title",null,"NPO Core - Nonprofit Organizations"),r.a.createElement("meta",{name:"description",content:"Look at our huge, curated list of nonprofit organizations that we've built up! Find a nonprofit organization to join, partner with, or simply get in contact with here on NPO Core!"})),r.a.createElement("div",{className:"pb-5"},r.a.createElement("div",{className:"options"},r.a.createElement("h1",{className:"mt-4"},"Organizations"),r.a.createElement("a",{class:"solid-cta-button",href:"/organizations/map"},"Check out our organization map!")),v.length?r.a.createElement("h3",null,"Featured Organizations"):r.a.createElement("span",null),r.a.createElement("div",{className:"organizations mt-5"},v?v.map((function(e,a){return r.a.createElement("div",{className:"organization",key:a},r.a.createElement("div",{className:"image-cropper-container"},r.a.createElement("div",{style:{height:"50px"},className:"image-cropper"},e.logo?r.a.createElement("img",{src:"https://npocore.s3-us-west-2.amazonaws.com/"+e.logo,alt:""}):r.a.createElement("img",{src:"/static/img/no-logo.png",alt:""})),e.verifiedNonprofit?r.a.createElement("img",{class:"nonprofit-badge",src:"/static/img/icons/501c3.svg",alt:""}):r.a.createElement("span",null)),r.a.createElement("div",null,r.a.createElement("div",{className:"organization-header"},r.a.createElement("h4",null,e.name),r.a.createElement("div",{className:"organization-resources"},r.a.createElement("a",{href:"mailto:{organization.email}",target:"_"},e.email?r.a.createElement("img",{src:"/img/email.svg",alt:"{organization.name} Email Address"}):null),r.a.createElement("a",{href:"/@"+e.idName},r.a.createElement("img",{style:{transform:"translateY(-2px)"},src:"/img/link.svg",alt:"{organization.name}"})))),e.location.name?r.a.createElement("div",null,r.a.createElement("strong",null,"Location:")," ",e.location.name):r.a.createElement("span",null),r.a.createElement("div",null,r.a.createElement("strong",null,"Target Audience:")," ",e.targetAudience),r.a.createElement("div",null,r.a.createElement("strong",null,"Cause:")," ",e.cause),r.a.createElement("p",{className:"organization-description"},r.a.createElement("strong",null,"Description:")," ",e.description),r.a.createElement("div",{className:"text-right mb-2"},r.a.createElement("button",{className:"btn btn-link p-0",onClick:V},r.a.createElement("small",null,"Read More"))),r.a.createElement("div",{className:"organization-interests"},(e.interests||[]).map((function(e,a){return r.a.createElement("small",null,e)})))))})):r.a.createElement("div",{className:"text-center"},r.a.createElement("small",null,"No featured organizations yet!"))),r.a.createElement("div",{className:"mt-4 text-right"},b?r.a.createElement("button",{class:"toggle-filter",onClick:I},"Filters \u2191"):r.a.createElement("button",{class:"toggle-filter",onClick:I},"Filters \u2193")),b?r.a.createElement("div",{className:"filters mt-3"},r.a.createElement("input",{className:"form-control search-bar",type:"text",placeholder:"Filter",onChange:function(e){return C(e.target.value)}}),r.a.createElement("select",{onChange:function(e){return A(e.target.value)},required:!0},r.a.createElement("option",{value:""},"Target Audience"),r.a.createElement("option",{value:"Everyone"},"Everyone"),r.a.createElement("option",{value:"Kids"},"Kids"),r.a.createElement("option",{value:"Teens"},"Teens"),r.a.createElement("option",{value:"Adults"},"Adults"),r.a.createElement("option",{value:"Seniors"},"Seniors"),r.a.createElement("option",{value:"Groups"},"Groups")),r.a.createElement("select",{onChange:function(e){return P(e.target.value)},required:!0},r.a.createElement("option",{value:""},"Cause"),r.a.createElement("option",{value:"Advocacy and Human Rights"},"Advocacy and Human Rights"),r.a.createElement("option",{value:"Animal Welfare"},"Animal Welfare"),r.a.createElement("option",{value:"Arts and Culture"},"Arts and Culture"),r.a.createElement("option",{value:"Children and Youth"},"Children and Youth"),r.a.createElement("option",{value:"Civil Rights and Social Action"},"Civil Rights and Social Action"),r.a.createElement("option",{value:"Crisis Support"},"Crisis Support"),r.a.createElement("option",{value:"Disaster Relief"},"Disaster Relief"),r.a.createElement("option",{value:"Emergency and Safety"},"Emergency and Safety"),r.a.createElement("option",{value:"Education"},"Education"),r.a.createElement("option",{value:"Environment"},"Environment"),r.a.createElement("option",{value:"Female Empowerment"},"Female Empowerment"),r.a.createElement("option",{value:"Health"},"Health"),r.a.createElement("option",{value:"Homeless and Housing"},"Homeless and Housing"),r.a.createElement("option",{value:"Politics"},"Politics"),r.a.createElement("option",{value:"LGBTQ+"},"LGBTQ+"),r.a.createElement("option",{value:"Race and Ethnicity"},"Race and Ethnicity"),r.a.createElement("option",{value:"Poverty Alleviation"},"Poverty Alleviation"),r.a.createElement("option",{value:"Science and Technology"},"Science and Technology"),r.a.createElement("option",{value:"Social Services"},"Social Services"),r.a.createElement("option",{value:"Veterans and Military Families"},"Veterans and Military Families")),r.a.createElement("select",{onChange:function(e){return M(e.target.value)},required:!0},r.a.createElement("option",{value:""},"Interest"),r.a.createElement("option",{value:"Members"},"Members"),r.a.createElement("option",{value:"Partnerships"},"Partnerships"),r.a.createElement("option",{value:"Sponsors"},"Sponsors"),r.a.createElement("option",{value:"Clients"},"Clients"),r.a.createElement("option",{value:"Opportunities"},"Opportunities"))):r.a.createElement("span",null),r.a.createElement("div",{className:"organizations mt-5"},i?i.map((function(e,a){return r.a.createElement("div",{className:"organization",key:a},r.a.createElement("div",{className:"image-cropper-container"},r.a.createElement("div",{style:{height:"50px"},className:"image-cropper"},e.logo?r.a.createElement("img",{src:"https://npocore.s3-us-west-2.amazonaws.com/"+e.logo,alt:""}):r.a.createElement("img",{src:"/static/img/no-logo.png",alt:""})),e.verifiedNonprofit?r.a.createElement("img",{class:"nonprofit-badge",src:"/static/img/icons/501c3.svg",alt:""}):r.a.createElement("span",null)),r.a.createElement("div",null,r.a.createElement("div",{className:"organization-header"},r.a.createElement("h4",null,e.name),r.a.createElement("div",{className:"organization-resources"},r.a.createElement("a",{href:"mailto:{organization.email}",target:"_"},e.email?r.a.createElement("img",{src:"/img/email.svg",alt:"{organization.name} Email Address"}):null),r.a.createElement("a",{href:"/@"+e.idName},r.a.createElement("img",{style:{transform:"translateY(-2px)"},src:"/img/link.svg",alt:"{organization.name}"})))),e.location.name?r.a.createElement("div",null,r.a.createElement("strong",null,"Location:")," ",e.location.name):r.a.createElement("span",null),r.a.createElement("div",null,r.a.createElement("strong",null,"Target Audience:")," ",e.targetAudience),r.a.createElement("div",null,r.a.createElement("strong",null,"Cause:")," ",e.cause),r.a.createElement("p",{className:"organization-description"},r.a.createElement("strong",null,"Description:")," ",e.description),r.a.createElement("div",{className:"text-right mb-2"},r.a.createElement("button",{className:"btn btn-link p-0",onClick:V},r.a.createElement("small",null,"Read More"))),r.a.createElement("div",{className:"organization-interests"},(e.interests||[]).map((function(e,a){return r.a.createElement("small",null,e)})))))})):r.a.createElement("div",{className:"text-center"},r.a.createElement("small",null,"No organizations yet!")))))};var f=function(){return r.a.createElement("div",{className:"float-container"},r.a.createElement("h1",null,"404 - Page not found!"),r.a.createElement("p",null,"We're sorry, but we couldn't find the page you were looking for! Please make sure you were given or typed in the URL you were looking for correctly, or please ",r.a.createElement("a",{href:"/contact"},"contact us")," if you believe this is a true issue. So sorry for the inconvenience!"),r.a.createElement("div",{className:"cta-buttons"},r.a.createElement("a",{className:"ghost-cta-button",href:"/contact"},"Contact us"),r.a.createElement("a",{className:"solid-cta-button",href:"/"},"Return to home page")))};var h=function(){return r.a.createElement("div",null,r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(g,null),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"hover-container"},r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/organizations",component:v}),r.a.createElement(i.a,{component:f})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.2c04bf35.chunk.js.map