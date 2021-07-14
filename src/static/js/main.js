import Chart from "chart.js/auto";
import { plotByGenderCtx } from "./contexts";
import { plotByYearCtx } from "./contexts";

const endpoint =
  "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json";

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

const getData = async (api) => {
  let response = await fetch(api);
  let data = await response.json();
  return data;
};

const res = await getData(endpoint);

// TODO: Actualiza el HTML con el número de líderes sociales asesinados

let leaderAccount = res.length;
const HTMLResponse = document.querySelector(".section-title");
HTMLResponse.innerHTML = leaderAccount;

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

let maleCount = res.filter((res) => res.genero === "Masculino").length;

let femaleCount = res.filter((res) => res.genero === "Femenino").length;

let transCount = res.filter((res) => res.genero === "Transgénero").length;

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: "bar",
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ["Masculino", "Femenino", "Transgenero"],
    datasets: [
      {
        label: "Líderes sociales asesinados por género",
        // FIXME: Actualiza esta propiedad
        data: [femaleCount, maleCount, transCount],
        backgroundColor: ["#086788", "#07A0C3", "#f0c808", "#ef798a"],
      },
    ],
  },
});

// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
let count2016 = 0;
let count2017 = 0;
let count2018 = 0;
let count2019 = 0;
let count2020 = 0;
let otherYears = 0;

function getYear() {
  res.filter((res) => {
    let date = new String(res.fecha);
    let year = date.substr(0, 4);

    if (year === "2016") {
      count2016++;
      return count2016;
    } else if (year === "2017") {
      count2017++;
      return count2017;
    } else if (year === "2018") {
      count2018++;
      return count2018;
    } else if (year === "2019") {
      count2019++;
      return count2019;
    } else if (year === "2020") {
      count2020++;
      return count2020;
    } else {
      otherYears++;
      return otherYears;
    }
  });
}

getYear();

const plotByYearChart = new Chart(plotByYearCtx, {
  type: "doughnut",
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ["2016", "2017", "2018", "2019", "2020", "Other years"],
    datasets: [
      {
        label: "Líderes sociales asesinados por año",
        // FIXME: Actualiza esta propiedad
        data: [
          count2016,
          count2017,
          count2018,
          count2019,
          count2020,
          otherYears,
        ],
        backgroundColor: [
          "#086788",
          "#07A0C3",
          "#f0c808",
          "#ef798a",
          "#3EDBF0",
          "#ef750a",
        ],
      },
    ],
  },
});
