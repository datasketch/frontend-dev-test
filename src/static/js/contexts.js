const plotByGenderCtx = document
  .getElementById("plot-by-gender")
  .getContext("2d");
const plotByYearCtx = document.getElementById("plot-by-year").getContext("2d");

const canvaElement = {
  plot_gender: plotByGenderCtx,
  plot_year: plotByYearCtx,
};

export default canvaElement;
