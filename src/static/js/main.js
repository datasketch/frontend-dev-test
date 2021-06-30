import Chart from "chart.js/auto";
import { plotByGenderCtx, plotByYearCtx } from "./contexts";
import getData from "./utils/getData";

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
const socialLeaders = await getData();

// TODO: Actualiza el HTML con el número de líderes sociales asesinados

const numberOfLeaders = socialLeaders.filter(
  (item) => item.nombre != undefined
);

const Leader = null || document.getElementById("leader");
Leader.textContent = numberOfLeaders.length;

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

const leaderMen = socialLeaders.filter(
  (item) => item.genero === "Masculino"
).length;
const leadersFemale = socialLeaders.filter(
  (item) => item.genero === "Femenino"
).length;
const leadersTransgender = socialLeaders.filter(
  (item) => item.genero === "Transgénero"
).length;

const generos = socialLeaders
  .reduce((generos, item) => {
    return [...generos, item.genero];
  }, [])
  .filter(
    (item, index, self) =>
      index === self.indexOf(item) && index != self.indexOf(undefined)
  );

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: "bar",
  data: {
    // FIXME: Actualiza esta propiedad
    labels: [...generos],
    datasets: [
      {
        label: "Líderes sociales asesinados por generos",
        // FIXME: Actualiza esta propiedad
        data: [leaderMen, leadersFemale, leadersTransgender],
        backgroundColor: ["#086788", "#f061bb", "#1db90c"],
        borderWidth: 5,
        barPercentage: 0.4,
        responsive: true,
      },
    ],
  },
});

// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año

const leadersForYears = socialLeaders.map((item) =>
  new Date(item.fecha).getFullYear().toString().split()
);

const year = [];
const allYears = year.concat(...leadersForYears);

const year2016 = allYears.filter((item) => item === "2016").length;

const year2017 = allYears.filter((item) => item === "2017").length;

const year2018 = allYears.filter((item) => item === "2018").length;

const year2019 = allYears.filter((item) => item === "2019").length;

const year2020 = allYears.filter((item) => item === "2020").length;

const years = allYears.filter(
  (item, index, self) =>
    index === self.indexOf(item) && index != self.indexOf("NaN")
);

const plotByYearsChart = new Chart(plotByYearCtx, {
  type: "line",
  data: {
    // FIXME: Actualiza esta propiedad
    labels: years,
    datasets: [
      {
        label: "Líderes sociales asesinados por generos",
        // FIXME: Actualiza esta propiedad
        data: [year2016, year2017, year2018, year2019, year2020],
        backgroundColor: [
          "#d6181f",
          "#086788",
          "#f061bb",
          "#1db90c",
          "#ffcb00",
        ],
        tension: 0.5,
        pointRadius: 5,
        pointHoverRadius: 10,
        responsive: true,
      },
    ],
  },
});
