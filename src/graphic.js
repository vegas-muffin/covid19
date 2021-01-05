import {
  
  ChangeSwitcher,
  changeMapMode
  
} from "./map";
class graph {
  constructor(mode, country, proportion, callback) {
    this.country = country;
    this.proportion = proportion;
    this.mode = mode; //cases, deaths, recovered
  }
  draw(mode, country, proportion) {
    this.country = params.country;
    if (
      this.mode !== mode ||
      this.country !== country ||
      this.proportion !== proportion
    ) {
      this.drawChart(mode, country, proportion);
      this.mode = mode;
      this.country = country;
      this.proportion = proportion;
    }
  }
  drawCheck(mode, country, proportion) {
   
    this.createContainer();

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() =>
      this.drawChart(mode, country, proportion)
    );

    this.mode = mode;
    this.country = country;
    this.proportion = proportion;
  }

  onChange() {
    this.callback(params);
    this.draw(params);
    console.log("works")
  }

  createContainer() {
    let cont = document.createElement("div");
    cont.setAttribute("id", "columnchart_values");
    let butCont = document.createElement("div");
    butCont.style.height = "20%";
    butCont.style.maxWidth = "100%";
    butCont.style.flexGrow = "1";
    butCont.style.display = "flex";
    butCont.style.justifyContent = "center";

    let allCases = document.createElement("button");
    allCases.style.flexGrow = "1";
    allCases.innerHTML = "Cases/Deaths\n/Recovered";

    //getting hold on the table
    let arrTabs = document.querySelectorAll('.nav-link');
    let cases =  document.querySelector('#nav-cases');
    let deaths =  document.querySelector('#nav-deaths');
    let recovered =  document.querySelector('#nav-recovered');

    allCases.addEventListener("click", () => {
      if (this.mode === "cases") {
        this.drawChart("deaths", this.country, this.proportion);
        arrTabs[0].classList.remove('active');
        arrTabs[1].classList.add('active');
        cases.classList.remove('active','show');
        deaths.classList.add('active','show');
        changeMapMode("deaths");
        this.mode = "deaths";
      } else if (this.mode === "deaths") {
        this.drawChart("recovered", this.country, this.proportion);
        arrTabs[1].classList.remove('active'); 
        arrTabs[2].classList.add('active');
        deaths.classList.remove('active','show');
        recovered.classList.add('active','show');
        changeMapMode("recovered");
        this.mode = "recovered";
      } else {
        this.drawChart("cases", this.country, this.proportion);
        arrTabs[2].classList.remove('active');
        arrTabs[0].classList.add('active');
        recovered.classList.remove('active','show');
        cases.classList.add('active','show');
        changeMapMode("cases");
        this.mode = "cases";
      }
    });

    let total = document.createElement("button");
    total.style.flexGrow = "1";
    total.innerHTML = `Among All Population`;
    total.addEventListener("click", () => {
      this.drawChart(this.mode, this.country, "all");
      document.querySelector("#switch_count").setAttribute("value", "absolute");

      let inp =  document.querySelector(".form-check-input");
      inp.checked=true;
      ChangeSwitcher('absolute', 'alldays');
      this.proportion = "all";
    });

    let hundred = document.createElement("button");
    hundred.style.flexGrow = "1";
    hundred.innerHTML = `Per 100th`;
    hundred.addEventListener("click", () => {
      this.drawChart(this.mode, this.country, "100");

      document.querySelector("#switch_count").setAttribute("value", "permillion");

      let inp =  document.querySelector(".form-check-input");
      inp.checked=false;
      ChangeSwitcher('permillion', 'alldays');
      this.proportion = "100";
    });

    let bigCont = document.getElementById("graphContainer");
    
    while (bigCont.childNodes.length) {
      bigCont.removeChild(bigCont.firstChild);
    }
    butCont.appendChild(allCases);
    butCont.appendChild(total);
    butCont.appendChild(hundred);

    bigCont.appendChild(cont);
    bigCont.appendChild(butCont);
  }

  async drawChart(mode, country, proportion) {

    this.mode = mode;
    this.country = country;
    this.proportion = proportion;
    let obj = {};
    let cumulativeUrl =
      "https://disease.sh/v3/covid-19/historical/all?lastdays=400";
    let countryUrl = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=400`;
    let url;
    let worldPopStart = 7763035303;
    let worldPopNow = 7855208954;
    let diff = 92173651;
    let everyDay = 252530;
    //////////////////////////////////////////////

    if (country === "The World") {
      url = cumulativeUrl;
    } else {
      url = countryUrl;
    }
    ////////////////////////////////////////////////////

    obj = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return JSON.parse(JSON.stringify(data));
      })
      .catch((error) => console.log(error));

    //////////////////////////////////////////////////////////
    let arr;
    if (country !== "The World") {
      obj = obj.timeline;
    }

    if (mode === "deaths") {
      arr = Object.entries(obj.deaths);
    } else if (mode === "cases") {
      arr = Object.entries(obj.cases);
    } else if (mode === "recovered") {
      arr = Object.entries(obj.recovered);
    } else {
      arr = Object.entries(obj.cases);
    }
    ///////////////////////////////////////
    let arrInside = [];
    let arrChanged = [];
    //hundred thousand proportion
    if (proportion === "100") {
      arrChanged = arr.map((entry, index) => {
        entry[1] = entry[1] / ((worldPopStart + everyDay * index) / 100000);
        return entry;
      });
      arrInside = arrChanged.slice();
    } else {
      arrInside = arr.slice();
    }
    //////////////////////////////////////
    arrInside.unshift(["date", "number"]);

    var data = google.visualization.arrayToDataTable(arrInside);

    var options = {
      title: `${this.country} Total number of cases by day from the beginning`,

     // width: 800,
      //height: 400,
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
      vAxis: { logScale: "true" },
    };
    ///////////////////////////////////////////////////////////////////
    if (mode === "deaths") {
      options.title = `${this.country}: Total number of deaths`;
      options.colors = ["black"];
    } else if (mode === "cases") {
      options.title = `${this.country}: All Cases Among the Whole Population`;
      options.colors = ["blue"];
    } else if (mode === "recovered") {
      options.title = `${this.country}: Recovered Among the Whole Population`;
      options.colors = ["#339911"];
    } else {
      options.title = `${this.country}: All Cases Among the Whole Population`;
      options.colors = ["blue"];
    }
    ////////////////////////////////////////////////////////////
    if (proportion === "100") {
      options.title = `${this.country}: ${this.mode} Per 100 thousand`;
      options.vAxis.logScale = "true";
      //options.colors=['yellow'];
      options.chartArea = { backgroundColor: "yellow" };
    } else if (proportion !== "100") {
      //options.title='Per 100 thousand';
      options.vAxis.logScale = "true";
    }
    ////////////////////////////////////////////////////////
    var chart = new google.visualization.ColumnChart(
      document.getElementById("columnchart_values")
    );
    chart.draw(data, options);
  }
}

export default graph;