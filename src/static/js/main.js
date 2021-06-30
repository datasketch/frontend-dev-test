import Chart from 'chart.js/auto';
import Plot from './contexts';



const endpoint = "https://raw.githubusercontent.com/datasketch/frontend-dev-test/master/data/lideres-sociales.json"

// TODO: Haz una petición HTTP al endpoint declarado para obtener los datos
let json_ls;

await fetch(endpoint)
  .then(response => response.json())
  .then(data=>json_ls= data)
  .catch(e=>{
    console.error(e);
  })
  // Objeto Json
  // console.log(json_ls); 
  // Total de datos recibidos
  // console.log( Object.keys(json_ls).length); 

// TODO: Actualiza el HTML con el número de líderes sociales asesinados

//Limpieza de datos vacios en el objeto
function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || Object.keys(obj[propName]).length === 0) {
      delete obj[propName];
    }
  }
  return obj
}
// Limpieza de resultados vacios o nulos
let clean_ls = clean(json_ls);
// Conteo limpio de lideres
let count_ls = Object.keys(clean_ls).length;
// console.log(count_ls);

// Actualizacion de lideres sociales en header
let count_header = document.getElementById("count_ls");
count_header.innerHTML = count_ls;



// TODO: Lee la documentación de Chart.js y actualiza las propiedades marcadas con FIXME en el snippet para tener un bar chart de líderes sociales asesinados por género
// Contador por generos
function counter_gender(obj) {
  let [count_man,count_woman,count_trans] = Array(3).fill(0);
  for (var propName in obj) {
    if (obj[propName].genero === 'Masculino' ) {
      count_man++;
    }else if (obj[propName].genero === 'Femenino'){
      count_woman++;
    }else if (obj[propName].genero === 'Transgénero'){
      count_trans++;
    }
  }
  return {
    'Masculino':count_man,
    'Femenino':count_woman,
    'Transgénero':count_trans
  };
}


// Objeto de conteo 
let count_gender = counter_gender(json_ls);
// console.log("Conteo por genero",count_gender);




 const plotByGenderChart = new Chart(Plot.plotByGenderCtx, {
  type: 'bar',
  data: {
    // FIXME: Actualiza esta propiedad
    labels: ['Masculino','Femenino','Transgénero'],
    datasets: [
      {
        label: 'Líderes sociales asesinados por género',
        // FIXME: Actualiza esta propiedad
        data: [count_gender['Masculino'],count_gender['Femenino'],count_gender['Transgénero']],
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

//Retorno por fecha
function get_year(year){
  return new Date(year).getFullYear().toString();
}


// Funcion tipo objeto de victimas por año
function counter_year(obj) {
  let count_2016 = 0;
  let count_2017 = 0;
  let count_2018 = 0;
  let count_2019 = 0;
  let count_2020 = 0;
  

  for (var propName in obj) {
    if (get_year(obj[propName].fecha)==="2016") {
      count_2016++;
    }else if (get_year(obj[propName].fecha)==="2017"){
      count_2017++;
    }else if (get_year(obj[propName].fecha)==="2018"){
      count_2018++;
    }else if (get_year(obj[propName].fecha)==="2019"){
      count_2019++;
    }else if (get_year(obj[propName].fecha)==="2020"){
      count_2020++;
    }
  }
  return {
    '2016':count_2016,
    '2017':count_2017,
    '2018':count_2018,
    '2019':count_2019,
    '2020':count_2020,
  }
}

// Objetos tipo años y totales
let years = Object.keys(counter_year(clean_ls));
let count_for_years = Object.values(counter_year(clean_ls));

// console.log(typeof years);
// console.log(Object.values(counter_year(clean_ls)));

// Object.keys(counter_year(clean_ls)).toString()

const plotByYearChart = new Chart (Plot.plotByYearCtx,{
  type:'line',
  data:{
    labels:years,
    datasets:[{
        label:'Lideres sociales asesinador por año',
        data:count_for_years,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }] 
  },
  options:{
    responsive:true
  }
})