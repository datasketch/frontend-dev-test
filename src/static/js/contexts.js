const plotByGenderCtx = document.getElementById('plot-by-gender').getContext('2d')
const plotByYearCtx = document.getElementById('plot-by-year').getContext('2d')

const estadisticas = {
 genero : plotByGenderCtx,
 anual : plotByYearCtx
}

export default estadisticas