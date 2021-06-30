import Chart from "chart.js/auto";
import { plotByGenderCtx } from "./contexts";
import { plotByYearCtx } from "./contexts";

const endpoint =
  "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json";

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

function makeRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getData(xhttp.responseText);
      countByGender(xhttp.responseText);
    }
  };
  xhttp.open("GET", endpoint, true);
  xhttp.send();
}

// TODO: Actualiza el HTML con el número de líderes sociales asesinados
function getData(data) {
  var h1Tag = document.getElementsByClassName("section-title");
  if (data) {
    let dataLideres = JSON.parse(data);
    var length = 0;
    dataLideres.map((item) => {
      if (item.nombre) {
        length++;
      }
      return length;
    });

    h1Tag[0].innerHTML = length;
  }
}

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

const countByGender = (data) => {
  if (data) {
    let dataLideres = JSON.parse(data);
    let generos = [];

    dataLideres.map((item) => {
      if (!generos.includes(item.genero) && item.genero) {
        generos.push(item.genero);
      }
      return generos;
    });

    let count = [];
    generos.forEach((gender) =>
      count.push(dataLideres.filter((item) => item.genero === gender).length)
    );
    dataChartGender(generos, count);
    dataChartYear(dataLideres);
  }
};

function dataChartGender(gender, count) {
  if (gender && count) {
    const plotByGenderChart = new Chart(plotByGenderCtx, {
      type: "bar",
      data: {
        labels: gender,
        datasets: [
          {
            label: "Líderes sociales asesinados por género",
            data: count,
            backgroundColor: ["#086788", "#07A0C3", "#f0c808", "#ef798a"],
          },
        ],
      },
    });
  }
}

// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
function dataChartYear(data) {
  if (data) {
    let dates = [];
    data.map((item) => {
      let date = new Date(item.fecha).getFullYear();
      if (!dates.includes(date) && !isNaN(date)) {
        dates.push(date);
      }
      return dates.sort((a, b) => a - b);
    });

    let count_by_year = [];
    dates.forEach((year) =>
      count_by_year.push(
        data.filter((item) => new Date(item.fecha).getFullYear() === year)
          .length
      )
    );

    const plotByYearChart = new Chart(plotByYearCtx, {
      type: "line",
      data: {
        // FIXME: Actualiza esta propiedad
        labels: dates,
        datasets: [
          {
            label: "Líderes sociales asesinados por año",
            // FIXME: Actualiza esta propiedad
            data: count_by_year,
            backgroundColor: ["#64917e", "#07A0C3", "#f0c808", "#ef798a"],
            fontSize: ["15px"],
          },
        ],
      },
    });
  }
}
document.addEventListener("DOMContentLoaded", makeRequest());
