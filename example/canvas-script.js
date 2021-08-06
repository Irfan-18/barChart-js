window.onload = function () {
  const min = 1,
    max = 200 + 1;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  //chart data

  const data = [
    { label: "Jan", value: getRandomInt(min, max) },
    { label: "Feb", value: getRandomInt(min, max) },
    { label: "March", value: getRandomInt(min, max) },
    { label: "April", value: getRandomInt(min, max) },
    { label: "May", value: getRandomInt(min, max) },
  ];

  //chart specification

  const targetId = "barChart";
  const canvasWidth = 600;
  const canvasHeight = 450;

  //creating chart object

  const chart = new BarChart(targetId, canvasWidth, canvasHeight, data);
};
