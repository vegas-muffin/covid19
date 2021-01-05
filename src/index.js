import "bootstrap";
import "./styles/scss.scss";
import "./graphic.js";
import {
  createMap,
  ChangeSwitcher,
  changeMapMode,
  NavigateToCountry,
  NavigateToDefault,
} from "./map";
import graph from "./graphic.js";
createMap();

const LASTDAY = "Last Day";
let INITIAL_DATASET = [];

//Graph initiation and management
const gr = new graph("allCases", "The World", "all");
gr.drawCheck("allCases", "The World", "all");
window.onresize = () => gr.drawCheck(gr.mode, gr.country, gr.proportion);
function onchange() {
  gr.drawCheck("allCases", "The World", "all");
}
//Fullscreen handling
let fullscr = document.querySelectorAll(".fullscreen");
let map = document.querySelector(".map");
let tab = document.querySelector(".main__info-inner");
let gra = document.querySelector(".main__graphic");
//map
fullscr[0].addEventListener("click", () => {
  if (!document.fullscreenElement) {
    map.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});
//tab
fullscr[1].addEventListener("click", () => {
  if (!document.fullscreenElement) {
    tab.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});
//graph
fullscr[2].addEventListener("click", () => {
  if (!document.fullscreenElement) {
    gra.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});
//
const CASESLIST = document.querySelector(".cases__list");
const DEATHSLIST = document.querySelector(".deaths__list");
const RECOVEREDLIST = document.querySelector(".recovered__list");

const CASESGLOBAL = document.querySelector(".cases__global");
const DEATHSGLOBAL = document.querySelector(".deaths__global");
const RECOVEREDGLOBAL = document.querySelector(".recovered__global");

const CASESTITLE = document.querySelector(".cases__title");
const DEATHSTITLE = document.querySelector(".deaths__title");
const RECOVEREDTITLE = document.querySelector(".recovered__title");

const CASESTABLEBODY = document.querySelector(".cases__table-body");

const DATALISTOPTIONS = document.getElementById("datalistOptions");
const FLAGIMG = document.querySelectorAll(".flag-img");
//
// OPTIONS OF DATE
let options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
// CHANGE NUMBER, ADD SPACE BETWEEN NUMBERS
function changeNumberAddSpace(n, symbol) {
  return Number(n)
    .toString()
    .replace(/(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${symbol}`);
}

// CREATE ARRAY OF LIST
function convertToListItem(country, property, classItem, badgeColor) {
  return `<a href="javascript:void(0)" class="list-group-item list-group-item-action ${classItem}" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${country.country}</h5>
      <span class="cases__count badge ${badgeColor} text-light fs-5 badge-pill">${changeNumberAddSpace(
    country[property],
    " "
  )}</span>
    </div>
    <p class="mb-1"><img src="${country.countryInfo.flag}" alt="${
    country.country
  }" class="flag-img">
    </p>
    <div class="d-flex w-100 justify-content-between"> 
     <small class="text-info wrap-normal">Population: ${changeNumberAddSpace(
       country.population,
       ","
     )}</small>                        <small class="text-muted">${new Date(
    country.updated
  ).toLocaleString("en-US", options)}</small>
                      </div>
  </a>`;
}

// CREATE ARRAY OF 100 000 LIST ALL PERIOD
function convertToListItemAllPeriod(country, property, classItem, badgeColor) {
  return `<a href="javascript:void(0)" class="list-group-item list-group-item-action ${classItem}" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${country.country}</h5>
      <span class="cases__count badge ${badgeColor} text-light fs-5 badge-pill">${changeNumberAddSpace(
    Math.round(country[property] / (country.population / 100000)),
    " "
  )}</span>
    </div>
    <p class="mb-1"><img src="${country.countryInfo.flag}" alt="${
    country.country
  }" class="flag-img">
    </p>
    <div class="d-flex w-100 justify-content-between"> 
     <small class="text-info wrap-normal">Population: ${changeNumberAddSpace(
       country.population,
       ","
     )}</small>                        <small class="text-muted">${new Date(
    country.updated
  ).toLocaleString("en-US", options)}</small>
                      </div>
  </a>`;
}

// get DATA BASE
async function getDataBase() {
  const url = `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// GET ONE COUNTRY
async function getOneCountry(oneCountry) {
  let data = await getDataBase();
  INITIAL_DATASET = data;
  draw(`${oneCountry}`, "cases", "absolute", "alldays");
  return;
}

function clearLists() {
  // CLEAR LIST BLOCK
  CASESLIST.innerHTML = "";
  DEATHSLIST.innerHTML = "";
  RECOVEREDLIST.innerHTML = "";
}

async function getCasesDeathsRecoverd() {
  let data = await getDataBase();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;
  let listOptionValue = ``;

  clearLists();

  // ADD TITLE
  CASESTITLE.textContent = "";
  DEATHSTITLE.textContent = "";
  RECOVEREDTITLE.textContent = "";

  // CREATE CASES LIST
  const casesArray = data
    .sort((country1, country2) => {
      return country1.cases < country2.cases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "cases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.deaths < country2.deaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(country, "deaths", "deaths__item", "badge-dark");
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.recovered < country2.recovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "recovered",
        "recovered__item",
        "badge-success"
      );
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);

  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].cases);
    globalDeaths += Number(data[i].deaths);
    globalRecovered += Number(data[i].recovered);

    // CREATE TAGS OPTION IN DATALIST
    listOptionValue += `<option class="search__item" value="${data[i].country}">`;
  }

  // DATA LIST OPTIONS

  // DATA LIST OPTIONS
  DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);

  CASESGLOBAL.textContent = changeNumberAddSpace(globalCases, ",");
  DEATHSGLOBAL.textContent = changeNumberAddSpace(globalDeaths, ",");
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(globalRecovered, ",");

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}

// Get for the one Day ***********************************************
async function getCasesDeathsRecoverdOneDay() {
  let data = await getDataBase();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;

  // ADD TITLE
  CASESTITLE.textContent = LASTDAY;
  DEATHSTITLE.textContent = LASTDAY;
  RECOVEREDTITLE.textContent = LASTDAY;
  // CLEAR LIST BLOCK
  clearLists();

  // CREATE CASES LIST

  const casesArray = data
    .sort((country1, country2) => {
      return country1.todayCases < country2.todayCases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "todayCases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.todayDeaths < country2.todayDeaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "todayDeaths",
        "deaths__item",
        "badge-dark"
      );
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.todayRecovered < country2.todayRecovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "todayRecovered",
        "recovered__item",
        "badge-success"
      );
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);

  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].todayCases);
    globalDeaths += Number(data[i].todayDeaths);
    globalRecovered += Number(data[i].todayRecovered);
  }

  // DATA LIST OPTIONS

  CASESGLOBAL.textContent = changeNumberAddSpace(globalCases, ",");
  DEATHSGLOBAL.textContent = changeNumberAddSpace(globalDeaths, ",");
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(globalRecovered, ",");

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}

// GET ALL PERIOD 100 000**************************
async function getAllPeriod() {
  let data = await getDataBase();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;

  clearLists();

  // ADD TITLE
  CASESTITLE.textContent = "Per 100th World";
  DEATHSTITLE.textContent = "Per 100th World";
  RECOVEREDTITLE.textContent = "Per 100th World";

  // CREATE CASES LIST
  const casesArray = data
    .sort((country1, country2) => {
      return country1.cases < country2.cases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItemAllPeriod(
        country,
        "cases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.deaths < country2.deaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItemAllPeriod(
        country,
        "deaths",
        "deaths__item",
        "badge-dark"
      );
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.recovered < country2.recovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItemAllPeriod(
        country,
        "recovered",
        "recovered__item",
        "badge-success"
      );
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);
  let population = 0;
  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].cases);
    globalDeaths += Number(data[i].deaths);
    globalRecovered += Number(data[i].recovered);
    population += Number(data[i].population);
  }
  // DATA LIST OPTIONS
  CASESGLOBAL.textContent = changeNumberAddSpace(
    Math.round(globalCases / (population / 100000)),
    ","
  );
  DEATHSGLOBAL.textContent = changeNumberAddSpace(
    Math.round(globalDeaths / (population / 100000)),
    ","
  );
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(
    Math.round(globalRecovered / (population / 100000)),
    ","
  );

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}

// GET ALL DAY 100 000**************************
async function getAllDay() {
  let data = await getDataBase();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;

  clearLists();

  // ADD TITLE
  CASESTITLE.textContent = "Per 100th Last Day";
  DEATHSTITLE.textContent = "Per 100th Last Day";
  RECOVEREDTITLE.textContent = "Per 100th Last Day";

  // CREATE CASES LIST
  const casesArray = data
    .sort((country1, country2) => {
      return country1.todayCases < country2.todayCases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItemAllPeriod(
        country,
        "todayCases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.todayDeaths < country2.todayDeaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItemAllPeriod(
        country,
        "todayDeaths",
        "deaths__item",
        "badge-dark"
      );
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.todayRecovered < country2.todayRecovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItemAllPeriod(
        country,
        "todayRecovered",
        "recovered__item",
        "badge-success"
      );
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);
  let population = 0;
  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].todayCases);
    globalDeaths += Number(data[i].todayDeaths);
    globalRecovered += Number(data[i].todayRecovered);
    population += Number(data[i].population);
  }
  // DATA LIST OPTIONS
  CASESGLOBAL.textContent = changeNumberAddSpace(
    Math.round(globalCases / (population / 100000)),
    ","
  );
  DEATHSGLOBAL.textContent = changeNumberAddSpace(
    Math.round(globalDeaths / (population / 100000)),
    ","
  );
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(
    Math.round(globalRecovered / (population / 100000)),
    ","
  );

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}

//mode switchers**************************************
document.querySelector("#nav-home-tab").addEventListener("click", function() {
  changeMapMode("cases");
  gr.drawChart("cases", gr.country, gr.proportion);
});

document
  .querySelector("#nav-profile-tab")
  .addEventListener("click", function() {
    changeMapMode("deaths");
    gr.drawChart("deaths", gr.country, gr.proportion);
  });

document
  .querySelector("#nav-contact-tab")
  .addEventListener("click", function() {
    changeMapMode("recovered");
    gr.drawChart("recovered", gr.country, gr.proportion);
  });

getCasesDeathsRecoverd();

// FOR TOP SWITCHER START********************
document
  .querySelector("#flexSwitchCheckChecked")
  .addEventListener("click", function() {
    if (this.getAttribute("value") === "absolute") {
      this.setAttribute("value", "permillion");
      gr.drawCheck(gr.mode, gr.country, "100");
      getAllPeriod();
    } else {
      this.setAttribute("value", "absolute");
      gr.drawCheck(gr.mode, gr.country, "all");
      getAllDay();
    }
    let switchdays = document
      .querySelector("#switch_day")
      .getAttribute("value");
    ChangeSwitcher(this.getAttribute("value"), switchdays);
  });

document.querySelector("#switch_day").addEventListener("click", function() {
  if (this.getAttribute("value") === "alldays") {
    this.setAttribute("value", "oneday");
    getCasesDeathsRecoverd();
  } else {
    this.setAttribute("value", "alldays");
    getCasesDeathsRecoverdOneDay();
  }
  let switchcount = document
    .querySelector("#flexSwitchCheckChecked")
    .getAttribute("value");
  ChangeSwitcher(switchcount, this.getAttribute("value"));
});

// One Country

function draw(currentCountry, proportion, period) {
  let data = INITIAL_DATASET.filter((country) => {
    return currentCountry ? country.country === currentCountry : true;
  }).map((country) => {
    if (proportion === "absolute") {
      country.displayValuecases = country.cases;
      country.displayValuedeaths = country.deaths;
      country.displayValuerecovered = country.recovered;
    } else {
      country.displayValuecases = country.population
        ? Math.round(country.cases / (country.population / 100000))
        : 0;
      country.displayValuedeaths = country.population
        ? Math.round(country.deaths / (country.population / 100000))
        : 0;
      country.displayValuerecovered = country.population
        ? Math.round(country.recovered / (country.population / 100000))
        : 0;
    }
    return country;
  });

  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;

  // CLEAR LIST BLOCK
  CASESLIST.innerHTML = "";
  DEATHSLIST.innerHTML = "";
  RECOVEREDLIST.innerHTML = "";
  // ADD TITLE
  CASESTITLE.textContent = "";
  DEATHSTITLE.textContent = "";
  RECOVEREDTITLE.textContent = "";

  // CREATE CASES LIST
  const casesArray = data
    .sort((country1, country2) => {
      return country1.displayValuecases < country2.displayValuecases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "cases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.displayValuedeaths < country2.displayValuedeaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(country, "deaths", "deaths__item", "badge-dark");
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.displayValuerecovered < country2.displayValuerecovered
        ? 1
        : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "recovered",
        "recovered__item",
        "badge-success"
      );
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);

  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].cases);
    globalDeaths += Number(data[i].deaths);
    globalRecovered += Number(data[i].recovered); 
  }

  // DATA LIST OPTIONS

  // DATA LIST OPTIONS
  DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);

  CASESGLOBAL.textContent = changeNumberAddSpace(globalCases, ",");
  DEATHSGLOBAL.textContent = changeNumberAddSpace(globalDeaths, ",");
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(globalRecovered, ",");

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}

// ******

const mapTabs = document.querySelectorAll(".tab__links");
mapTabs.forEach((item) => {
  item.addEventListener("click", function() {
    document.querySelectorAll(".nav-link").forEach((item) => {
      if (item.getAttribute("href") === `#nav-${this.id}`) {
        item.className = "nav-link text-dark active";
        item.setAttribute("aria-selected", true);
      } else {
        item.className = "nav-link text-dark";
        item.setAttribute("aria-selected", false);
      }
    });
    document.querySelectorAll(".tab-pane").forEach((item) => {
      if (item.getAttribute("id") === `nav-${this.id}`) {
        item.className = "tab-pane fade active show";
      } else {
        item.className = "tab-pane fade";
      }
    });
    gr.drawChart(this.id, gr.country, gr.proportion);
    changeMapMode(this.id);
  });
});


let inputs = document.querySelectorAll("input[list]");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("change", function() {
    var optionFound = false,
      datalist = this.list;
    for (var j = 0; j < datalist.options.length; j++) {
      getOneCountry(this.value);
      if (this.value == datalist.options[j].value) {
        optionFound = true;
        break;
      }
    }
    if (optionFound) {
      NavigateToCountry(this.value);
      gr.drawChart(gr.mode, this.value, gr.proportion);
    } else {
      NavigateToDefault();
      gr.drawCheck("allCases", "The World", "all");
    }
  });
}
