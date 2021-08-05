import Chart from 'chart.js/auto'
import { plotByGenderCtx } from './contexts'
import { plotByYearCtx } from './contexts'

const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
const getDatos = async () => {
  const response = await fetch(endpoint);
  const dato = await response.json();
  return dato;
}
const dato = await getDatos();
console.log(dato); //Datos de la api

/* ==* Función que llama otras funciones *== */
const datos = () => {
  mostrarNum();
  byGenre();
  byYear();
}

// TODO: Actualiza el HTML con el número de líderes sociales asesinados
const mostrarNum = () => {
  let num_total = 0;
  dato.map(element => {
    if (element.genero) {
      num_total++;
    }
    return num_total;
  })

  let num_print = document.getElementById('num')
  num_print.innerHTML = `${num_total}`;
}

// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

/* ==* Por género *== */
const byGenre = () => {
  let x = [], numByGenre = [];
  dato.map(element => {
    if (!x.includes(element.genero) && element.genero) {
      x.push(element.genero);
    }
    return x
  });

  /* ACTUALIZACIÓN DE LOS LABELS */
  for (let i = 0; i < x.length; i++) {
    plotByGenderChart.data.labels[i] = x[i];
  }

  /* # DE ASESINADOS MASCULINOS */
  let numMasculino = dato.filter(element => element.genero === x[0]);
  numByGenre.push(numMasculino.length);

  /* # DE ASESINADOS FEMENINOS */
  let numFemenino = dato.filter(element => element.genero === x[1]);
  numByGenre.push(numFemenino.length);

  /* # DE ASESINADOS TRANSGENERO */
  let numTrans = dato.filter(element => element.genero === x[2]);
  numByGenre.push(numTrans.length);

  /* ACTUALIZACIÓN DE DATA */
  for (let i = 0; i < x.length; i++) {
    plotByGenderChart.data.datasets[0].data[i] = numByGenre[i];
  }

  plotByGenderChart.update();
}

/* ==* Gráfica por género *== */
const plotByGenderChart = new Chart(plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: [],
    datasets: [
      {
        label: 'Líderes sociales asesinados por género',
        // FIXME: Actualiza esta propiedad
        data: [],
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

/* ==* Por año *== */
const byYear = () => {
  let x = [], u = [], v = [], anios = [], numPorAnios = [];

  dato.map(element => {
    if (!x.includes(element.fecha) && element.fecha) {
      x.push(element.fecha);
    }
    return x;
  });

  /* Divide el string y lo almacena en un array */
  x.forEach(element => {
    u = element.split("-", 1);
    v.push(u);
  });

  /* Busca los repetidos */
  var repetidos = v.reduce((contador, valor) => {
    if (!contador[valor]) {
      contador[valor] = 1;
    } else {
      contador[valor]++;
    }
    return contador
  }, []);

  /* Los almacena en distintos arrays */
  repetidos.forEach((repeticiones, v) => {
    anios.push(v);
    numPorAnios.push(repeticiones);
  })

  /* Actualiza los datos en la gráfica */
  for (let i = 0; i < anios.length; i++) {
    plotByYearChart.data.labels[i] = anios[i];
    plotByYearChart.data.datasets[0].data[i] = numPorAnios[i];
  }

  plotByYearChart.update();
}

/* ==* Gráfica por año *== */

const plotByYearChart = new Chart(plotByYearCtx, {
  type: 'line',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: [],
    datasets: [
      {
        label: 'Líderes sociales asesinados por año',
        // FIXME: Actualiza esta propiedad
        data: [],
        borderColor: '#086788',
        tension: 0.2,
        borderWidth: 3
      }
    ]
  }
})

datos(dato)