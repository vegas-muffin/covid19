import { getTotalByAllCountries } from "./api";
const groupPerMillion = L.featureGroup();
const groupTotalCases = L.featureGroup();
const todayTotal = L.featureGroup();
const toDayPerThousand = L.featureGroup();
let mymap = "";
const arrayOfSpots = [];
let countryMap = new Map();
export function createMap() {
  mymap = L.map("mapid").setView([51.505, -0.09], 3);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "yupashintseva/ckioco3iw4nro17p9d1vxbr14",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg",
    }
  ).addTo(mymap);
  let totalCases = "";
  getTotalByAllCountries().then((data) => {
    totalCases = data;
    totalCases.map((countryItem) => {
      countryMap.set(countryItem.country, [countryItem.countryInfo.lat, countryItem.countryInfo.long]);
      makeCircle(
        countryItem.countryInfo.lat,
        countryItem.countryInfo.long,
        defineRadius(countryItem.casesPerOneMillion),
        countryItem.countryInfo.flag,
        countryItem.country,
        [
          Math.round(countryItem.casesPerOneMillion / 10),
          Math.round(countryItem.deathsPerOneMillion / 10),
          Math.round(countryItem.activePerOneMillion / 10),
          Math.round(countryItem.recoveredPerOneMillion / 10),
        ],
        [
          countryItem.cases,
          countryItem.deaths,
          countryItem.active,
          countryItem.recovered,
        ],
        [
          countryItem.todayCases,
          countryItem.todayDeaths,
          countryItem.active,
          countryItem.todayRecovered
        ],
        [
          Math.round(countryItem.todayCases/(countryItem.population/100000)),
          Math.round(countryItem.todayDeaths/(countryItem.population/100000)),
          Math.round(countryItem.active/(countryItem.population/100000)),
          Math.round(countryItem.todayRecovered/(countryItem.population/100000))
        ]
      );
      return countryItem;
    });
  });

// all cases all days

function makeCircle(lat, lon, rad, flag, countryName, statistic, statisticTotal, todayStatistic, todayPerThousand1) {
  var circle = L.circle([lat, lon], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: rad,
  }).addTo(groupPerMillion);
  const localArr = [];
  localArr.push(circle);
  localArr.push(statistic);
  arrayOfSpots.push(localArr);
  circle.addEventListener("mouseover", function() {
    var popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(
        `<div style="font-size: 20px;">${countryName}</div>
         <img class="country_flag" src=${flag}>         
                  <table>    
                    <tr><th style="color: red">Cases: ${statistic[0]}</th></tr>
                    <tr><th style="color: orange">Active cases: ${statistic[2]}</th></tr>
                    <tr><th style="color: green">Recovered: ${statistic[3]}</th></tr>
                    <tr><th style="color: grey">Fatality ratio: ${statistic[1]}</th></tr>
                  </table>`
      )
      .openOn(mymap);
  });
  circle.addEventListener("click", function() {
    NavigateToPoint(lat, lon);
  });
  //mymap.addLayer(groupPerMillion);

 // per 100 thousands all cases START
  var circle2 = L.circle([lat, lon], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: rad,
  }).addTo(groupTotalCases);
  const localArr2 = [];
  localArr2.push(circle2);
  localArr2.push(statisticTotal);
  arrayOfSpots.push(localArr2);
  circle2.addEventListener("mouseover", function() {
    var popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(
        `<div style="font-size: 20px;">${countryName}</div>
         <img class="country_flag" src=${flag}>
                  <table>
                    <tr><th style="color: red">Cases: ${statisticTotal[0]}</th></tr>
                    <tr><th style="color: orange">Active cases: ${statisticTotal[2]}</th></tr>
                    <tr><th style="color: green">Recovered: ${statisticTotal[3]}</th></tr>
                    <tr><th style="color: grey">Fatality ratio: ${statisticTotal[1]}</th></tr>
                  </table>`
      )
      .openOn(mymap);
  });
  circle2.addEventListener("click", function() {
    NavigateToPoint(lat, lon);
  });
  mymap.addLayer(groupTotalCases);
  // per 100 thousands all cases END

 // Today all cases START
  var circle3 = L.circle([lat, lon], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: rad,
  }).addTo(todayTotal);
  const localArr3 = [];
  localArr3.push(circle3);
  localArr3.push(todayStatistic);
  arrayOfSpots.push(localArr3);
  circle3.addEventListener("mouseover", function() {
    var popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(
        `<div style="font-size: 20px;">${countryName}</div>
         <img class="country_flag" src=${flag}>
                  <table>
                    <tr><th style="color: red">Cases: ${todayStatistic[0]}</th></tr>
                    <tr><th style="color: orange">Active cases: ${todayStatistic[2]}</th></tr>
                    <tr><th style="color: green">Recovered: ${todayStatistic[3]}</th></tr>
                    <tr><th style="color: grey">Fatality ratio: ${todayStatistic[1]}</th></tr>
                  </table>`
      )
      .openOn(mymap);
  });
  circle3.addEventListener("click", function() {
    NavigateToPoint(lat, lon);
  });
 // mymap.addLayer(todayTotal);
  // Today all cases END

  // Today per thousand START
  var circle4 = L.circle([lat, lon], {
    color: "black",
    fillColor: "black",
    fillOpacity: 0.5,
    radius: rad,
  }).addTo(toDayPerThousand);
  const localArr4 = [];
  localArr4.push(circle4);
  localArr4.push(todayPerThousand1);
  arrayOfSpots.push(localArr4);
  circle4.addEventListener("mouseover", function() {
    var popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(
        `<div style="font-size: 20px;">${countryName}</div>
         <img class="country_flag" src=${flag}>
                  <table>
                    <tr><th style="color: red">Cases: ${todayPerThousand1[0]}</th></tr>
                    <tr><th style="color: orange">Active cases: ${todayPerThousand1[2]}</th></tr>
                    <tr><th style="color: green">Recovered: ${todayPerThousand1[3]}</th></tr>
                    <tr><th style="color: grey">Fatality ratio: ${todayPerThousand1[1]}</th></tr>

                  </table>`
      )
      .openOn(mymap);
  });
  circle4.addEventListener("click", function() {
    NavigateToPoint(lat, lon);
  });
 // mymap.addLayer(toDayPerThousand);
  // Today per thousand END
  changeMapMode("cases");
  
}

  /*const mapTabs = document.querySelectorAll(".tab__links");
  mapTabs.forEach((item) => {
    item.addEventListener("click", function() {
      changeMapMode(this.id);
    });
  });*/
}

export function ChangeSwitcher(amount, days) {
  if ((amount === "absolute") && (days === "alldays")) {
    mymap.removeLayer(groupPerMillion);
    mymap.removeLayer(todayTotal);
    mymap.removeLayer(toDayPerThousand);
    mymap.addLayer(groupTotalCases);
  } else if ((amount === "permillion") && (days === "alldays")) {
    mymap.removeLayer(groupTotalCases);
    mymap.removeLayer(todayTotal);
    mymap.removeLayer(toDayPerThousand);
    mymap.addLayer(groupPerMillion);
  } else if ((amount === "absolute") && (days === "oneday")) {
    mymap.removeLayer(groupTotalCases);
    mymap.removeLayer(groupPerMillion);
    mymap.removeLayer(toDayPerThousand);
    mymap.addLayer(todayTotal); 
  } else if ((amount === "permillion") && (days === "oneday")) {
    mymap.removeLayer(groupPerMillion);
    mymap.removeLayer(todayTotal);
    mymap.removeLayer(groupTotalCases);
    mymap.addLayer(toDayPerThousand);
  }
}

export function changeMapMode(cases) {
  let spotColor = "red";
  let statisticIdx = 0;
  if (cases === "active_cases") {
    spotColor = "orange";
    statisticIdx = 2;
  } else if (cases === "recovered") {
    spotColor = "green";
    statisticIdx = 3;
    document.querySelector('#recovered').className = "tab__links active_tab";
    document.querySelector('#deaths').className = "tab__links";
    document.querySelector('#cases').className = "tab__links";
  } else if (cases === "deaths") {
    spotColor = "white";
    statisticIdx = 1;
    document.querySelector('#recovered').className = "tab__links";
    document.querySelector('#deaths').className = "tab__links active_tab";
    document.querySelector('#cases').className = "tab__links";
  } else  {
    spotColor = "red"; 
    statisticIdx = 0;
    document.querySelector('#recovered').className = "tab__links";
    document.querySelector('#deaths').className = "tab__links";
    document.querySelector('#cases').className = "tab__links active_tab";
  }

  arrayOfSpots.forEach((spot) => {
    spot[0].setStyle({
      color: spotColor,
      fillColor: spotColor,
    });

    let radius = 0;
    spot[1][statisticIdx] !== null
      ? (radius = defineRadius(spot[1][statisticIdx]))
      : (radius = 0);
    spot[0].setRadius(radius);
  });
}

function defineRadius(cases) {
  let radius = 0;
  if (cases >= 1 && cases < 1000) {
    radius = 10000;
  } else if (cases >= 1000 && cases < 3000) {
    radius = 40000;
  } else if (cases >= 3000 && cases < 20000) {
    radius = 80000;
  } else if (cases >= 20000 && cases < 50000) {
    radius = 120000;
  } else if (cases >= 50000 && cases < 100000) {
    radius = 160000;
  } else if (cases >= 100000 && cases < 250000) {
    radius = 200000;
  } else if (cases >= 250000 && cases < 400000) {
    radius = 240000;
  } else if (cases >= 400000 && cases < 500000) {
    radius = 280000;
  } else if (cases >= 500000 && cases < 1000000) {
    radius = 320000;
  } else if (cases >= 1000000 && cases < 5000000) {
    radius = 360000;
  }
  return radius;
}
 
export function NavigateToPoint(lat, lon) {
  mymap.setView([lat, lon], 5);
}

export function NavigateToDefault() {
  mymap.setView([51.505, -0.09], 3);
}

export function NavigateToCountry(name) {
  const coords = countryMap.get(name);
  if (coords.length > 0) {
    mymap.setView(coords, 5);
  }
}
