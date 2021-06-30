import Chart from 'chart.js/auto'
import { plotByGenderCtx, plotByYearCtx } from './contexts'


const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos

async function fetchSocialLiders () {
  try{
    const fetchedData = await fetch(endpoint);
    const result = await fetchedData.json();
    return result;
  } catch (error) {
    if (error) throw error;
  };
};
const lidersArray = await fetchSocialLiders();

// TODO: Actualiza el HTML con el número de líderes sociales asesinados


window.addEventListener("load", onPageLoad);

async function onPageLoad () {
  //modifying the liders amount contained in the html <H1> tag
  const lidersNumber = document.getElementsByClassName("section-title")[0];
  lidersNumber.innerHTML = lidersArray.length -1;
  //extracting the amount of liders by genres
  let genres = {male: 0, female: 0, transgender: 0};
  genres.male = await lidersArray.filter(lider => lider.genero === "Masculino").length;
  genres.female = await lidersArray.filter(lider => lider.genero === "Femenino").length;
  genres.transgender = await lidersArray.filter(lider => lider.genero === "Transgénero").length;
  //extracting the years where the lidders were killed in
  //extracting the  kills amount per year
  return {genres};
};
const {genres} = await onPageLoad();

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ["Masculino", "Femenino", "Transgenero"],
    datasets: [
      {
        label: 'Líderes sociales asesinados por género',
        // FIXME: Actualiza esta propiedad
        data: [genres.male, genres.female, genres.transgender],
        backgroundColor: [
          '#086788',
          '#07A0C3',
          '#f0c808',
          '#ef798a'
        ]
      }
    ]
  }
}) 


// TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año


const plotByYearChart = new Chart(plotByYearCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: 'Líderes sociales asesinados por año',
        data: [],
        borderColor: ["#348F6C"],
        borderWidth: 4,
      },
    ],
  },
  options: {
    
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
      },
    },
    elements: {
      point: {
        radius: 7,
        pointStyle: "cros",
        backgroundColor: "#46C292",
        hoverRadius: 10,
        hoverBorderWidth: 3
      },
      line: {
        tension: 0,
        backgroundColor: "rgb(70, 194, 146, 0.5)",
        fill: true
      }
    },
  },
}); 