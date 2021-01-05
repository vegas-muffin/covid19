(()=>{"use strict";var e={318:(e,t,o)=>{async function r(){let e=await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true");return await e.json()}o.d(t,{s:()=>r})},953:(e,t,o)=>{o.d(t,{Z:()=>n});var r=o(884);const n=class{constructor(e,t,o,r){this.country=t,this.proportion=o,this.mode=e}draw(e,t,o){this.country=params.country,this.mode===e&&this.country===t&&this.proportion===o||(this.drawChart(e,t,o),this.mode=e,this.country=t,this.proportion=o)}drawCheck(e,t,o){this.createContainer(),google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback((()=>this.drawChart(e,t,o))),this.mode=e,this.country=t,this.proportion=o}onChange(){this.callback(params),this.draw(params),console.log("works")}createContainer(){let e=document.createElement("div");e.setAttribute("id","columnchart_values");let t=document.createElement("div");t.style.height="20%",t.style.maxWidth="100%",t.style.flexGrow="1",t.style.display="flex",t.style.justifyContent="center";let o=document.createElement("button");o.style.flexGrow="1",o.innerHTML="Cases/Deaths\n/Recovered";let n=document.querySelectorAll(".nav-link"),a=document.querySelector("#nav-cases"),s=document.querySelector("#nav-deaths"),c=document.querySelector("#nav-recovered");o.addEventListener("click",(()=>{"cases"===this.mode?(this.drawChart("deaths",this.country,this.proportion),n[0].classList.remove("active"),n[1].classList.add("active"),a.classList.remove("active","show"),s.classList.add("active","show"),(0,r.Dx)("deaths"),this.mode="deaths"):"deaths"===this.mode?(this.drawChart("recovered",this.country,this.proportion),n[1].classList.remove("active"),n[2].classList.add("active"),s.classList.remove("active","show"),c.classList.add("active","show"),(0,r.Dx)("recovered"),this.mode="recovered"):(this.drawChart("cases",this.country,this.proportion),n[2].classList.remove("active"),n[0].classList.add("active"),c.classList.remove("active","show"),a.classList.add("active","show"),(0,r.Dx)("cases"),this.mode="cases")}));let l=document.createElement("button");l.style.flexGrow="1",l.innerHTML="Among All Population",l.addEventListener("click",(()=>{this.drawChart(this.mode,this.country,"all"),document.querySelector("#switch_count").setAttribute("value","absolute"),document.querySelector(".form-check-input").checked=!0,(0,r._B)("absolute","alldays"),this.proportion="all"}));let i=document.createElement("button");i.style.flexGrow="1",i.innerHTML="Per 100th",i.addEventListener("click",(()=>{this.drawChart(this.mode,this.country,"100"),document.querySelector("#switch_count").setAttribute("value","permillion"),document.querySelector(".form-check-input").checked=!1,(0,r._B)("permillion","alldays"),this.proportion="100"}));let d=document.getElementById("graphContainer");for(;d.childNodes.length;)d.removeChild(d.firstChild);t.appendChild(o),t.appendChild(l),t.appendChild(i),d.appendChild(e),d.appendChild(t)}async drawChart(e,t,o){this.mode=e,this.country=t,this.proportion=o;let r,n,a={};r="The World"===t?"https://disease.sh/v3/covid-19/historical/all?lastdays=400":`https://disease.sh/v3/covid-19/historical/${t}?lastdays=400`,a=await fetch(r).then((e=>e.json())).then((e=>JSON.parse(JSON.stringify(e)))).catch((e=>console.log(e))),"The World"!==t&&(a=a.timeline),n="deaths"===e?Object.entries(a.deaths):"cases"===e?Object.entries(a.cases):"recovered"===e?Object.entries(a.recovered):Object.entries(a.cases);let s=[],c=[];"100"===o?(c=n.map(((e,t)=>(e[1]=e[1]/((7763035303+252530*t)/1e5),e))),s=c.slice()):s=n.slice(),s.unshift(["date","number"]);var l=google.visualization.arrayToDataTable(s),i={title:`${this.country} Total number of cases by day from the beginning`,bar:{groupWidth:"95%"},legend:{position:"none"},vAxis:{logScale:"true"}};"deaths"===e?(i.title=`${this.country}: Total number of deaths`,i.colors=["black"]):"cases"===e?(i.title=`${this.country}: All Cases Among the Whole Population`,i.colors=["blue"]):"recovered"===e?(i.title=`${this.country}: Recovered Among the Whole Population`,i.colors=["#339911"]):(i.title=`${this.country}: All Cases Among the Whole Population`,i.colors=["blue"]),"100"===o?(i.title=`${this.country}: ${this.mode} Per 100 thousand`,i.vAxis.logScale="true",i.chartArea={backgroundColor:"yellow"}):"100"!==o&&(i.vAxis.logScale="true"),new google.visualization.ColumnChart(document.getElementById("columnchart_values")).draw(l,i)}}},10:(e,t,o)=>{o(312);var r=o(953),n=o(884);(0,n.df)();const a="Last Day";let s=[];const c=new r.Z("allCases","The World","all");c.drawCheck("allCases","The World","all"),window.onresize=()=>c.drawCheck(c.mode,c.country,c.proportion);let l=document.querySelectorAll(".fullscreen"),i=document.querySelector(".map"),d=document.querySelector(".main__info-inner"),u=document.querySelector(".main__graphic");l[0].addEventListener("click",(()=>{document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():i.requestFullscreen()})),l[1].addEventListener("click",(()=>{document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():d.requestFullscreen()})),l[2].addEventListener("click",(()=>{document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():u.requestFullscreen()}));const h=document.querySelector(".cases__list"),m=document.querySelector(".deaths__list"),y=document.querySelector(".recovered__list"),p=document.querySelector(".cases__global"),v=document.querySelector(".deaths__global"),f=document.querySelector(".recovered__global"),b=document.querySelector(".cases__title"),g=document.querySelector(".deaths__title"),C=document.querySelector(".recovered__title"),_=(document.querySelector(".cases__table-body"),document.getElementById("datalistOptions"));document.querySelectorAll(".flag-img");let L={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"};function x(e,t){return Number(e).toString().replace(/(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,`$1${t}`)}function w(e,t,o,r){return`<a href="javascript:void(0)" class="list-group-item list-group-item-action ${o}" aria-current="true">\n    <div class="d-flex w-100 justify-content-between">\n      <h5 class="mb-1">${e.country}</h5>\n      <span class="cases__count badge ${r} text-light fs-5 badge-pill">${x(e[t]," ")}</span>\n    </div>\n    <p class="mb-1"><img src="${e.countryInfo.flag}" alt="${e.country}" class="flag-img">\n    </p>\n    <div class="d-flex w-100 justify-content-between"> \n     <small class="text-info wrap-normal">Population: ${x(e.population,",")}</small>                        <small class="text-muted">${new Date(e.updated).toLocaleString("en-US",L)}</small>\n                      </div>\n  </a>`}function S(e,t,o,r){return`<a href="javascript:void(0)" class="list-group-item list-group-item-action ${o}" aria-current="true">\n    <div class="d-flex w-100 justify-content-between">\n      <h5 class="mb-1">${e.country}</h5>\n      <span class="cases__count badge ${r} text-light fs-5 badge-pill">${x(Math.round(e[t]/(e.population/1e5))," ")}</span>\n    </div>\n    <p class="mb-1"><img src="${e.countryInfo.flag}" alt="${e.country}" class="flag-img">\n    </p>\n    <div class="d-flex w-100 justify-content-between"> \n     <small class="text-info wrap-normal">Population: ${x(e.population,",")}</small>                        <small class="text-muted">${new Date(e.updated).toLocaleString("en-US",L)}</small>\n                      </div>\n  </a>`}async function q(){const e=await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true");return await e.json()}async function k(e){let t=await q();s=t,function(e,t,o){let r=s.filter((t=>!e||t.country===e)).map((e=>("absolute"===t?(e.displayValuecases=e.cases,e.displayValuedeaths=e.deaths,e.displayValuerecovered=e.recovered):(e.displayValuecases=e.population?Math.round(e.cases/(e.population/1e5)):0,e.displayValuedeaths=e.population?Math.round(e.deaths/(e.population/1e5)):0,e.displayValuerecovered=e.population?Math.round(e.recovered/(e.population/1e5)):0),e))),a=0,l=0,i=0;h.innerHTML="",m.innerHTML="",y.innerHTML="",b.textContent="",g.textContent="",C.textContent="";const d=r.sort(((e,t)=>e.displayValuecases<t.displayValuecases?1:-1)).map((e=>w(e,"cases","cases__item","badge-warning"))).join(" "),u=r.sort(((e,t)=>e.displayValuedeaths<t.displayValuedeaths?1:-1)).map((e=>w(e,"deaths","deaths__item","badge-dark"))).join(" "),L=r.sort(((e,t)=>e.displayValuerecovered<t.displayValuerecovered?1:-1)).map((e=>w(e,"recovered","recovered__item","badge-success"))).join(" ");h.insertAdjacentHTML("beforeend",d),m.insertAdjacentHTML("beforeend",u),y.insertAdjacentHTML("beforeend",L);for(let e=0;e<r.length;e+=1)a+=Number(r[e].cases),l+=Number(r[e].deaths),i+=Number(r[e].recovered);_.insertAdjacentHTML("beforeend",listOptionValue),p.textContent=x(a,","),v.textContent=x(l,","),f.textContent=x(i,","),document.querySelectorAll(".cases__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".deaths__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawCheck(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".recovered__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))}))}(`${e}`,"cases")}function A(){h.innerHTML="",m.innerHTML="",y.innerHTML=""}async function E(){let e=await q(),t=0,o=0,r=0,a="";A(),b.textContent="",g.textContent="",C.textContent="";const s=e.sort(((e,t)=>e.cases<t.cases?1:-1)).map((e=>w(e,"cases","cases__item","badge-warning"))).join(" "),l=e.sort(((e,t)=>e.deaths<t.deaths?1:-1)).map((e=>w(e,"deaths","deaths__item","badge-dark"))).join(" "),i=e.sort(((e,t)=>e.recovered<t.recovered?1:-1)).map((e=>w(e,"recovered","recovered__item","badge-success"))).join(" ");h.insertAdjacentHTML("beforeend",s),m.insertAdjacentHTML("beforeend",l),y.insertAdjacentHTML("beforeend",i);for(let n=0;n<e.length;n+=1)t+=Number(e[n].cases),o+=Number(e[n].deaths),r+=Number(e[n].recovered),a+=`<option class="search__item" value="${e[n].country}">`;_.insertAdjacentHTML("beforeend",a),p.textContent=x(t,","),v.textContent=x(o,","),f.textContent=x(r,","),document.querySelectorAll(".cases__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".deaths__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawCheck(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".recovered__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))}))}document.querySelector("#nav-home-tab").addEventListener("click",(function(){(0,n.Dx)("cases"),c.drawChart("cases",c.country,c.proportion)})),document.querySelector("#nav-profile-tab").addEventListener("click",(function(){(0,n.Dx)("deaths"),c.drawChart("deaths",c.country,c.proportion)})),document.querySelector("#nav-contact-tab").addEventListener("click",(function(){(0,n.Dx)("recovered"),c.drawChart("recovered",c.country,c.proportion)})),E(),document.querySelector("#flexSwitchCheckChecked").addEventListener("click",(function(){"absolute"===this.getAttribute("value")?(this.setAttribute("value","permillion"),c.drawCheck(c.mode,c.country,"100"),async function(){let e=await q(),t=0,o=0,r=0;A(),b.textContent="Per 100th World",g.textContent="Per 100th World",C.textContent="Per 100th World";const a=e.sort(((e,t)=>e.cases<t.cases?1:-1)).map((e=>S(e,"cases","cases__item","badge-warning"))).join(" "),s=e.sort(((e,t)=>e.deaths<t.deaths?1:-1)).map((e=>S(e,"deaths","deaths__item","badge-dark"))).join(" "),l=e.sort(((e,t)=>e.recovered<t.recovered?1:-1)).map((e=>S(e,"recovered","recovered__item","badge-success"))).join(" ");h.insertAdjacentHTML("beforeend",a),m.insertAdjacentHTML("beforeend",s),y.insertAdjacentHTML("beforeend",l);let i=0;for(let n=0;n<e.length;n+=1)t+=Number(e[n].cases),o+=Number(e[n].deaths),r+=Number(e[n].recovered),i+=Number(e[n].population);p.textContent=x(Math.round(t/(i/1e5)),","),v.textContent=x(Math.round(o/(i/1e5)),","),f.textContent=x(Math.round(r/(i/1e5)),","),document.querySelectorAll(".cases__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".deaths__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawCheck(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".recovered__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))}))}()):(this.setAttribute("value","absolute"),c.drawCheck(c.mode,c.country,"all"),async function(){let e=await q(),t=0,o=0,r=0;A(),b.textContent="Per 100th Last Day",g.textContent="Per 100th Last Day",C.textContent="Per 100th Last Day";const a=e.sort(((e,t)=>e.todayCases<t.todayCases?1:-1)).map((e=>S(e,"todayCases","cases__item","badge-warning"))).join(" "),s=e.sort(((e,t)=>e.todayDeaths<t.todayDeaths?1:-1)).map((e=>S(e,"todayDeaths","deaths__item","badge-dark"))).join(" "),l=e.sort(((e,t)=>e.todayRecovered<t.todayRecovered?1:-1)).map((e=>S(e,"todayRecovered","recovered__item","badge-success"))).join(" ");h.insertAdjacentHTML("beforeend",a),m.insertAdjacentHTML("beforeend",s),y.insertAdjacentHTML("beforeend",l);let i=0;for(let n=0;n<e.length;n+=1)t+=Number(e[n].todayCases),o+=Number(e[n].todayDeaths),r+=Number(e[n].todayRecovered),i+=Number(e[n].population);p.textContent=x(Math.round(t/(i/1e5)),","),v.textContent=x(Math.round(o/(i/1e5)),","),f.textContent=x(Math.round(r/(i/1e5)),","),document.querySelectorAll(".cases__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".deaths__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawCheck(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".recovered__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))}))}());let e=document.querySelector("#switch_day").getAttribute("value");(0,n._B)(this.getAttribute("value"),e)})),document.querySelector("#switch_day").addEventListener("click",(function(){"alldays"===this.getAttribute("value")?(this.setAttribute("value","oneday"),E()):(this.setAttribute("value","alldays"),async function(){let e=await q(),t=0,o=0,r=0;b.textContent=a,g.textContent=a,C.textContent=a,A();const s=e.sort(((e,t)=>e.todayCases<t.todayCases?1:-1)).map((e=>w(e,"todayCases","cases__item","badge-warning"))).join(" "),l=e.sort(((e,t)=>e.todayDeaths<t.todayDeaths?1:-1)).map((e=>w(e,"todayDeaths","deaths__item","badge-dark"))).join(" "),i=e.sort(((e,t)=>e.todayRecovered<t.todayRecovered?1:-1)).map((e=>w(e,"todayRecovered","recovered__item","badge-success"))).join(" ");h.insertAdjacentHTML("beforeend",s),m.insertAdjacentHTML("beforeend",l),y.insertAdjacentHTML("beforeend",i);for(let n=0;n<e.length;n+=1)t+=Number(e[n].todayCases),o+=Number(e[n].todayDeaths),r+=Number(e[n].todayRecovered);p.textContent=x(t,","),v.textContent=x(o,","),f.textContent=x(r,","),document.querySelectorAll(".cases__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".deaths__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))})),document.querySelectorAll(".recovered__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent);let e=this.querySelector(".mb-1").textContent;c.drawChart(c.mode,e,c.proportion),(0,n.OI)(e)}))}))}());let e=document.querySelector("#flexSwitchCheckChecked").getAttribute("value");(0,n._B)(e,this.getAttribute("value"))}));document.querySelectorAll(".tab__links").forEach((e=>{e.addEventListener("click",(function(){document.querySelectorAll(".nav-link").forEach((e=>{e.getAttribute("href")===`#nav-${this.id}`?(e.className="nav-link text-dark active",e.setAttribute("aria-selected",!0)):(e.className="nav-link text-dark",e.setAttribute("aria-selected",!1))})),document.querySelectorAll(".tab-pane").forEach((e=>{e.getAttribute("id")===`nav-${this.id}`?e.className="tab-pane fade active show":e.className="tab-pane fade"})),c.drawChart(this.id,c.country,c.proportion),(0,n.Dx)(this.id)}))}));let M=document.querySelectorAll("input[list]");for(var j=0;j<M.length;j++)M[j].addEventListener("change",(function(){for(var e=!1,t=this.list,o=0;o<t.options.length;o++)if(k(this.value),this.value==t.options[o].value){e=!0;break}e?((0,n.OI)(this.value),c.drawChart(c.mode,this.value,c.proportion)):((0,n.tj)(),c.drawCheck("allCases","The World","all"))}))},884:(e,t,o)=>{o.d(t,{df:()=>u,_B:()=>h,Dx:()=>m,tj:()=>v,OI:()=>f});var r=o(318);const n=L.featureGroup(),a=L.featureGroup(),s=L.featureGroup(),c=L.featureGroup();let l="";const i=[];let d=new Map;function u(){l=L.map("mapid").setView([51.505,-.09],3),L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"yupashintseva/ckioco3iw4nro17p9d1vxbr14",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg"}).addTo(l);let e="";(0,r.s)().then((t=>{e=t,e.map((e=>(d.set(e.country,[e.countryInfo.lat,e.countryInfo.long]),function(e,t,o,r,d,u,h,y,v){var f=L.circle([e,t],{color:"red",fillColor:"#f03",fillOpacity:.5,radius:o}).addTo(n);const b=[];b.push(f),b.push(u),i.push(b),f.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${r}>         \n                  <table>    \n                    <tr><th style="color: red">Cases: ${u[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${u[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${u[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${u[1]}</th></tr>\n                  </table>`).openOn(l)})),f.addEventListener("click",(function(){p(e,t)}));var g=L.circle([e,t],{color:"red",fillColor:"#f03",fillOpacity:.5,radius:o}).addTo(a);const C=[];C.push(g),C.push(h),i.push(C),g.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${r}>\n                  <table>\n                    <tr><th style="color: red">Cases: ${h[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${h[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${h[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${h[1]}</th></tr>\n                  </table>`).openOn(l)})),g.addEventListener("click",(function(){p(e,t)})),l.addLayer(a);var _=L.circle([e,t],{color:"red",fillColor:"#f03",fillOpacity:.5,radius:o}).addTo(s);const x=[];x.push(_),x.push(y),i.push(x),_.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${r}>\n                  <table>\n                    <tr><th style="color: red">Cases: ${y[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${y[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${y[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${y[1]}</th></tr>\n                  </table>`).openOn(l)})),_.addEventListener("click",(function(){p(e,t)}));var w=L.circle([e,t],{color:"black",fillColor:"black",fillOpacity:.5,radius:o}).addTo(c);const S=[];S.push(w),S.push(v),i.push(S),w.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${r}>\n                  <table>\n                    <tr><th style="color: red">Cases: ${v[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${v[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${v[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${v[1]}</th></tr>\n\n                  </table>`).openOn(l)})),w.addEventListener("click",(function(){p(e,t)})),m("cases")}(e.countryInfo.lat,e.countryInfo.long,y(e.casesPerOneMillion),e.countryInfo.flag,e.country,[Math.round(e.casesPerOneMillion/10),Math.round(e.deathsPerOneMillion/10),Math.round(e.activePerOneMillion/10),Math.round(e.recoveredPerOneMillion/10)],[e.cases,e.deaths,e.active,e.recovered],[e.todayCases,e.todayDeaths,e.active,e.todayRecovered],[Math.round(e.todayCases/(e.population/1e5)),Math.round(e.todayDeaths/(e.population/1e5)),Math.round(e.active/(e.population/1e5)),Math.round(e.todayRecovered/(e.population/1e5))]),e)))}))}function h(e,t){"absolute"===e&&"alldays"===t?(l.removeLayer(n),l.removeLayer(s),l.removeLayer(c),l.addLayer(a)):"permillion"===e&&"alldays"===t?(l.removeLayer(a),l.removeLayer(s),l.removeLayer(c),l.addLayer(n)):"absolute"===e&&"oneday"===t?(l.removeLayer(a),l.removeLayer(n),l.removeLayer(c),l.addLayer(s)):"permillion"===e&&"oneday"===t&&(l.removeLayer(n),l.removeLayer(s),l.removeLayer(a),l.addLayer(c))}function m(e){let t="red",o=0;"active_cases"===e?(t="orange",o=2):"recovered"===e?(t="green",o=3,document.querySelector("#recovered").className="tab__links active_tab",document.querySelector("#deaths").className="tab__links",document.querySelector("#cases").className="tab__links"):"deaths"===e?(t="white",o=1,document.querySelector("#recovered").className="tab__links",document.querySelector("#deaths").className="tab__links active_tab",document.querySelector("#cases").className="tab__links"):(t="red",o=0,document.querySelector("#recovered").className="tab__links",document.querySelector("#deaths").className="tab__links",document.querySelector("#cases").className="tab__links active_tab"),i.forEach((e=>{e[0].setStyle({color:t,fillColor:t});let r=0;r=null!==e[1][o]?y(e[1][o]):0,e[0].setRadius(r)}))}function y(e){let t=0;return e>=1&&e<1e3?t=1e4:e>=1e3&&e<3e3?t=4e4:e>=3e3&&e<2e4?t=8e4:e>=2e4&&e<5e4?t=12e4:e>=5e4&&e<1e5?t=16e4:e>=1e5&&e<25e4?t=2e5:e>=25e4&&e<4e5?t=24e4:e>=4e5&&e<5e5?t=28e4:e>=5e5&&e<1e6?t=32e4:e>=1e6&&e<5e6&&(t=36e4),t}function p(e,t){l.setView([e,t],5)}function v(){l.setView([51.505,-.09],3)}function f(e){const t=d.get(e);t.length>0&&l.setView(t,5)}}},t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,o),n.exports}o.m=e,o.x=e=>{},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0,74:0,842:0},t=[[10,312]],r=e=>{},n=(n,a)=>{for(var s,c,[l,i,d,u]=a,h=0,m=[];h<l.length;h++)c=l[h],o.o(e,c)&&e[c]&&m.push(e[c][0]),e[c]=0;for(s in i)o.o(i,s)&&(o.m[s]=i[s]);for(d&&d(o),n&&n(a);m.length;)m.shift()();return u&&t.push.apply(t,u),r()},a=self.webpackChunk=self.webpackChunk||[];function s(){for(var r,n=0;n<t.length;n++){for(var a=t[n],s=!0,c=1;c<a.length;c++){var l=a[c];0!==e[l]&&(s=!1)}s&&(t.splice(n--,1),r=o(o.s=a[0]))}return 0===t.length&&(o.x(),o.x=e=>{}),r}a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a));var c=o.x;o.x=()=>(o.x=c||(e=>{}),(r=s)())})(),o.x()})();