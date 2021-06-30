## ¿Utilizaste alguna librería externa para hacer la petición HTTP?¿Por qué?

No, la peticion http la hice con fetch que es un recurso que nos provee vanilla js.

## ¿Qué estrategia utilizaste para la manipulación de datos?

Despues de hacer la peticion http y convertir todos los datos de json a un array para proceder con la manipulacion de datos se puede decir que lo hice en dos partes, en la primera parte que tuve que contar cuantos eran hombres y mujeres, fue bastante sencillo era unicamente acceder a cada objeto y por su genero clasificarlos, sin embarlo el objeto del array en la posicion 698 es un objeto vacio y por esta razon hay que agregarle una restriccion mas, para no tener datos erroneos cuando se presentan.

En la segunda parte en la cual tengo que clasificarlos por año es un poco mas complejo, para este cree un objeto en el cual guarde los años y con este empece a contar por cada registro, para hacer esto me ayude de una opcion muy comoda que tiene js que es el spread operator y es que este me permite traer lo que ya tenia el objeto y unirlo con algo más, sin embargo si la propiedad ya esta en el objeto lo que hace es que esta propiedad se actualiza dependiendo de los parametros que yo le otorgue, esto me permitio evitar el hecho de estar haciendo condicionales para cada año, en este punto tambien hay un objeto del array en la posicion 697 que no tiene año y por lo tanto no hizo parte de la grafica, en este caso si se cuentan los datos habrian un total de 697

## ¿Qué ha sido lo más difícil de esta prueba para ti?

En mi opinión el apartado mas complejo seria cuando se organizaron los datos para graficar la tabla en la que observamos los asesinatos de los lideres sociales por año.

## ¿Qué ha sido lo más fácil?

Lo mas facil seria cuando actualizo el HTML con los lideres sociales asesinados.

## En base a los datos, ¿qué otro tipo de visualizaciones crees pertinentes para comunicar?

Tambien podemos graficar las muertes de los lideres sociales por cada departamento, de esta manera se puede hacer visible en cual de estos es mayor la mortalidad para los lideres sociales.

Partiendo del punto anterior podemos graficar las muertes por cada municipio que pertenece a un departamento, de esta manera podemos observar en un nivel mucho mas profundo las zonas en donde la violencia es mucho mas marcada.
