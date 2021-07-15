// ESS6 MODULES
import Chart from 'chart.js/auto';
import { plotByGenderCtx, plotByYearCtx } from './contexts';

// ELEMENTOS
const numeroLideres = document.querySelector('.section-title');

const endpoint =
  'https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json';

// Modern Javascript Asincron AJAX - Async Await - Api Rest
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const init = async function () {
  try {
    // // TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
    const res = await fetch(endpoint);
    // console.log(res);

    // Clausure protection
    if (!res.ok) return alert(new Error(`No se pudo obtener los datos`)); // En caso de que hubo una falla en el consumo de los datos

    // Obtengo datos

    // 1- datos de todos los lideres sociales en colombia asesinados
    const data = await res.json();
    // console.log(data);

    // TODO: Actualiza el HTML con el número de líderes sociales asesinados
    numeroLideres.textContent = data.length;

    // TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

    // Set -> Obtengo los datos de generos sin repetirse
    const generos = [
      ...new Set(
        data.map(data => data.genero).filter(gender => gender !== undefined)
      ),
    ];
    // console.log(generos);

    // líderes sociales asesinados por género
    const lideresAsesinadosGenero = generos.map(
      gender => data.filter(data => data.genero === gender).length
    );
    // console.log(lideresAsesinadosGenero);

    const plotByGenderChart = new Chart(plotByGenderCtx, {
      type: 'bar',
      data: {
        // FIXME: Actualiza esta propiedad
        labels: [...generos],
        datasets: [
          {
            label: 'Líderes sociales asesinados por género',
            // FIXME: Actualiza esta propiedad
            data: [...lideresAsesinadosGenero],
            backgroundColor: ['#086788', '#07A0C3', '#f0c808', '#ef798a'],
          },
        ],
      },
    });

    // Datos lideres sociales asesinados por año
    const años = [
      ...new Set(
        data
          .map(data => new Date(data.fecha).getFullYear())
          .filter(year => Number.isInteger(year))
      ),
    ];
    // console.log(años);

    const lideresAsesinadosAño = años.map(
      año =>
        data.filter(data => new Date(data.fecha).getFullYear() === año).length
    );
    // console.log(lideresAsesinadosAño);

    // TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
    const plotByYearChart = new Chart(plotByYearCtx, {
      type: 'bar',
      data: {
        // FIXME: Actualiza esta propiedad
        labels: [...años],
        datasets: [
          {
            label: 'Líderes sociales asesinados por año',
            // FIXME: Actualiza esta propiedad
            data: [...lideresAsesinadosAño],
            backgroundColor: ['#086788', '#07A0C3', '#f0c808', '#ef798a'],
          },
        ],
      },
    });
  } catch (err) {
    alert(`El navegador no tiene conexion detalle del error: ${err.message}`); // Puedo mostrar un popup o modal informando el error, pero quize hacerlo sencillo
  }
};
// Segundos para cargar los datos en el HTML
wait(1).then(init);

// Forma antigua de obtener datos - Mucho codigo mayor complejitud

// // TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
// const request = new XMLHttpRequest();
// request.open('GET', endpoint);
// request.send();

// request.addEventListener('load', function () {
//   // Obtendo los datos
//   const data = JSON.parse(this.responseText);
//   console.log(data);

//   // TODO: Actualiza el HTML con el número de líderes sociales asesinados
//   numeroLideres.textContent = data.length;

//   // TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género

//   // Valores unicos
//   const generos = [
//     ...new Set(
//       data.map(data => data.genero).filter(gender => gender !== undefined)
//     ),
//   ];
//   console.log(generos);

//   // Datos para cada genero

//   // Masculino
//   // const generoMasculino = data.filter(data => data.genero === 'Masculino');
//   // console.log(generoMasculino);

//   // // Femenino
//   // const generoFemenino = data.filter(data => data.genero === 'Femenino');
//   // console.log(generoFemenino);

//   // // Femenino
//   // const generoTrans = data.filter(data => data.genero === 'Transgénero');
//   // console.log(generoTrans);

//   // líderes sociales asesinados por género
//   // const estadisticaAsesinatoGenero = [
//   //   generoMasculino.length,
//   //   generoFemenino.length,
//   //   generoTrans.length,
//   // ];
//   // console.log(estadisticaAsesinatoGenero);

//   // Quize hacerlo mas dinamico
//   const lideresAsesinadosGenero = generos.map(
//     gender => data.filter(data => data.genero === gender).length
//   );
//   console.log(lideresAsesinadosGenero);

//   const plotByGenderChart = new Chart(plotByGenderCtx, {
//     type: 'bar',
//     data: {
//       // FIXME: Actualiza esta propiedad
//       labels: [...generos],
//       datasets: [
//         {
//           label: 'Líderes sociales asesinados por género',
//           // FIXME: Actualiza esta propiedad
//           data: [...lideresAsesinadosGenero],
//           backgroundColor: ['#086788', '#07A0C3', '#f0c808', '#ef798a'],
//         },
//       ],
//     },
//   });
//   // Datos lideres sociales asesinados por año
//   const años = [
//     ...new Set(
//       data
//         .map(data => new Date(data.fecha).getFullYear())
//         .filter(year => Number.isInteger(year))
//     ),
//   ];
//   console.log(años);

//   const lideresAsesinadosAño = años.map(
//     año =>
//       data.filter(data => new Date(data.fecha).getFullYear() === año).length
//   );
//   console.log(lideresAsesinadosAño);

//   // TODO: Siguiendo la misma lógica, haz un line chart que muestre el número de líderes sociales asesinados por año
//   const plotByYearChart = new Chart(plotByYearCtx, {
//     type: 'bar',
//     data: {
//       // FIXME: Actualiza esta propiedad
//       labels: [...años],
//       datasets: [
//         {
//           label: 'Líderes sociales asesinados por año',
//           // FIXME: Actualiza esta propiedad
//           data: [...lideresAsesinadosAño],
//           backgroundColor: ['#086788', '#07A0C3', '#f0c808', '#ef798a'],
//         },
//       ],
//     },
//   });
// });

// request.addEventListener('error', function () {
//   alert('No se pudo obtener los datos');
// });
