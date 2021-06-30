import Chart from 'chart.js/auto'
import moment from 'moment'
import { plotByGenderCtx, plotByYearCtxLine } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

const dataApi = async () => {
  const api = await fetch(endpoint);
  const data = await api.json();

  return data;
}

const result = await dataApi();

const lideres = document.querySelector('#lideres');
lideres.innerHTML = result.length;

const lideresFemenino = result.filter(lider => lider.genero == 'Femenino');
const lideresMasculino = result.filter(lider => lider.genero == 'Masculino');
const lideresTransgenero = result.filter(lider => lider.genero != 'Masculino' && lider.genero != 'Femenino');

const data = {
  'Femenino': lideresFemenino.length,
  'Masculino': lideresMasculino.length,
  'Transgénero': lideresTransgenero.length
}

const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    datasets: [
      {
        label: 'Líderes sociales asesinados por género',
        data,
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

const years = []
const yearsData = result.forEach(year => {
  years.push(new moment(year.fecha).format('YYYY'))
});

const labelsFiltrado = years.filter((year, index) => years.indexOf(year) == index)

const lideresPorAnio = labelsFiltrado.map(lider => result.filter(result => new moment(result.fecha).format('YYYY') == lider).length)

const plotByYearChartLine = new Chart(plotByYearCtxLine, {
  type: 'line',
  data: {
    labels: labelsFiltrado,
    datasets: [
      {
        label: 'Líderes sociales asesinados por año',
        data: lideresPorAnio,
        borderColor: 'rgb(75, 192, 192)',
      }
    ]
  }
})
