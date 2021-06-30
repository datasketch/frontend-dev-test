import Chart from "chart.js/auto";
import canvaElement from "./contexts";

const endpoint =
  "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json";

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

function makeRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getData(xhttp.responseText);
    }
  };
  xhttp.open("GET", endpoint, true);
  xhttp.send();
}

// TODO: Actualiza el HTML con el número de líderes sociales asesinados
function getData(data) {
  let h1Tag = document.getElementById("leaders_assassinated");
  let started_date = new Date("2016-01-01").toLocaleDateString();
  if (data) {
    const dataLideres = JSON.parse(data);
    let length = 0;
    dataLideres.map((item) => {
      if (
        Object.keys(item).length !== 0 &&
        new Date(item.fecha).toLocaleDateString() >= started_date
      ) {
        length++;
      }
      return length;
    });

    h1Tag.innerHTML = length;
    countByGender(dataLideres);
    countByYear(dataLideres);
  }
}

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

const countByGender = (data) => {
  if (data) {
    let genders = [];

    data.map((item) => {
      if (!genders.includes(item.genero) && Object.keys(item).length !== 0) {
        genders.push(item.genero);
      }
      return genders;
    });

    let count_murders = [];
    genders.forEach((gender) =>
      count_murders.push(data.filter((item) => item.genero === gender).length)
    );
    dataChartGender(genders, count_murders);
  }
};

function dataChartGender(gender, count) {
  if (gender && count) {
    const plotByGenderChart = new Chart(canvaElement.plot_gender, {
      type: "bar",
      data: {
        labels: gender,
        datasets: [
          {
            label: "Líderes sociales asesinados por género",
            data: count,
            backgroundColor: ["#086788", "#07A0C3", "#ef798a", "#f0c808"],
          },
        ],
      },
    });
  }
}

// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
const countByYear = (data) => {
  if (data) {
    let dates = [];
    data.map((item) => {
      let date = new Date(item.fecha).getFullYear();
      if (!dates.includes(date) && !isNaN(date)) {
        dates.push(date);
      }
      return dates.sort((a, b) => a - b);
    });

    let count_murders = [];
    dates.forEach((year) =>
      count_murders.push(
        data.filter((item) => new Date(item.fecha).getFullYear() === year)
          .length
      )
    );
    dataChartYear(dates, count_murders);
  }
};

function dataChartYear(dates, count_murders) {
  const plotByYearChart = new Chart(canvaElement.plot_year, {
    type: "line",
    data: {
      // FIXME: Actualiza esta propiedad
      labels: dates,
      datasets: [
        {
          label: "Líderes sociales asesinados por año",
          // FIXME: Actualiza esta propiedad
          data: count_murders,
          backgroundColor: ["#64917e", "#07A0C3", "#f0c808", "#ef798a"],
        },
      ],
    },
  });
}
document.addEventListener("DOMContentLoaded", makeRequest());
