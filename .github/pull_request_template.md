## ¿Utilizaste alguna librería externa para hacer la petición HTTP?¿Por qué?

Escribe tu respuesta aquí

## ¿Qué estrategia utilizaste para la manipulación de datos?

Comence con la manera mas antigua de obtener los datos y es por medio del XMLHttpRequest me parecio muy largo y hubo otra
forma de hacerlo mas sencillo, entendible y moderno es por medio del Async Await ya que por medio de ella se implementan
funciones asincronas y por medio de eso puedo obtener los datos solicitados con el fetch que es otra forma de obtener datos,
lo que me gusta de las funciones asincronas es que se carga el codigo en segundo plano por el cual el codigo no se va a bloquear
mientras se carga la pagina, algo muy importe que hay que tener en cuenta, mi estrategia como tal es transformar los problemas en
sub problemas y asi desarrollar poco a poco el proyecto, utilice mucho la transformacion de datos con la programacion funcional es
mas rapido y sencillo lo hice con funciones declarativas (algo que ya esta desarrollado y puede usarse osea la abstraccion).

## ¿Qué ha sido lo más difícil de esta prueba para ti?

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

Esta parte, las fechas estaban en formato largo ["string"] pero poco a poco fui buscando la manera de obtener los resultados.
años = [2016, 2017, 2018, 2019, 2020, NaN] -> En esta parte habia un dato que no coincidia con un año y al momento de mostra el chart me mostraba el NaN
lo solucione validando si todos los datos eran enteros recorriendo esos datos con el .filter

## ¿Qué ha sido lo más fácil?

Lo mas facil para mi a sido obtener los datos y ver esos datos por consola, tambien lo del CSS y la primera parte del ejercicio en donde nos pedia que mostraramos
el numero de lideres sociales asesinados en el HTML

## En base a los datos, ¿qué otro tipo de visualizaciones crees pertinentes para comunicar?

1- Una API geolocalizadora en donde ubique las ciudades con el numero de lideres sociales asesinados.
