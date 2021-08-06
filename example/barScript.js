/*
 *
 *barScript.js
 *simple bar chart library
 *06/08/2021
 *{url}
 *
 *Copyright 2021 {Irfan Tagala}
 *Released under the MIT license
 *{license url}
 *
 *
 */

"use strict";

function BarChart(taregtID, width, height, data) {
  const chart = this;
  //specifying configuration
  chart.configureChart(taregtID, width, height, data);

  //creating canvas ,storing data
  chart.performPreOperations();

  console.log(chart);

  //draw chart

  chart.drawChart();
}

BarChart.prototype.configureChart = function (taregtID, width, height, data) {
  const chart = this;

  //canvas specifications coming from outside
  chart.setCanvasSpecification(taregtID, width, height, data);

  //chart specifications
  chart.setChartSpecs();
};

BarChart.prototype.setCanvasSpecification = function (
  taregtID,
  width,
  height,
  data
) {
  const chart = this;
  chart.id = taregtID;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartSpecs = function () {
  const chart = this;
  //chart specifications
  chart.axisRatio = 10; //in percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = "#334257";
  chart.axisWidth = 1;

  //Label configuration

  chart.fontRatio = 3;
  chart.fontFamily = "times";
  chart.fontStyle = "normal";
  chart.fontWeight = "300";
  chart.fontColor = "black";
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;

  chart.guidelineColor = "#515E63";
  chart.guidelineWidth = 0.5;
};

BarChart.prototype.performPreOperations = function () {
  const chart = this;

  //create canvas
  chart.createCanvas();

  //get data
  chart.handleData();

  //prepare data
  chart.prepareData();
};

BarChart.prototype.createCanvas = function () {
  const chart = this;
  const canvas = document.createElement("canvas");
  canvas.id = chart.id + "-" + Math.random();
  canvas.height = chart.height;
  canvas.width = chart.width;
  document.getElementById(chart.id).innerHTML = "";
  document.getElementById(chart.id).appendChild(canvas);

  chart.canvas = canvas;
  chart.context = canvas.getContext("2d");
};

BarChart.prototype.handleData = function () {
  const chart = this;
  chart.labels = [];
  chart.values = [];

  chart.data.forEach((item) => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.prepareData = function () {
  const chart = this;

  // global variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  //Axis specification
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin;
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin;

  //Label specs

  //consider max value is 124 then we do this calculation

  // 124/10 => 12.4 =>ceil(12.4)=>13=>13*10 =>130

  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFrequency = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFrequency = chart.horizontalAxisWidth / chart.itemsNum;
};

BarChart.prototype.drawChart = function () {
  const chart = this;

  // vertical axis
  chart.drawVerticalAxis();

  //horizontal axis
  chart.drawHorizontalAxis();

  // vertical label
  chart.drawVerticalLabel();

  // horizontal  label
  chart.drawHorizontalLabel();

  // horizontal Guideline
  chart.horizontalGuideline();

  //draw Bars
  chart.drawBar();
};
BarChart.prototype.drawVerticalAxis = function () {
  const chart = this;
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawHorizontalAxis = function () {
  const chart = this;

  //  horizontal
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.lineTo(
    chart.width - chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawVerticalLabel = function () {
  const chart = this;

  // text specifications
  const labelFont =
    chart.fontStyle +
    " " +
    chart.fontWeight +
    " " +
    chart.verticalFontSize +
    " " +
    chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = "right";
  chart.context.fillStyle = chart.fontColor;

  const scaledVerticalLabelfreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFrequency;
  //draw Labels

  for (let i = 0; i <= chart.itemsNum; i++) {
    const labelText =
      chart.verticalUpperBound - i * chart.verticalLabelFrequency;
    const verticalLabelX =
      chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    const verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelfreq;

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};

BarChart.prototype.drawHorizontalLabel = function () {
  const chart = this;

  // text specifications
  const labelFont =
    chart.fontStyle +
    " " +
    chart.fontWeight +
    " " +
    chart.verticalFontSize +
    " " +
    chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = "center";
  chart.context.textBaseline = "top";
  chart.context.fillStyle = chart.fontColor;

  //draw Labels

  for (let i = 0; i < chart.itemsNum; i++) {
    const horizontalLabelX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFrequency +
      chart.horizontalLabelFrequency / 2;
    const horizontalLabelY =
      chart.height -
      chart.verticalMargin +
      chart.verticalMargin / chart.axisRatio;
    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.horizontalGuideline = function () {
  const chart = this;
  const scaledVerticalLabelfreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFrequency;

  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;
  //draw Labels

  for (let i = 0; i <= chart.itemsNum; i++) {
    const horizontalGuidelineStartX = chart.horizontalMargin;
    const horizontalGuidelineStartY =
      chart.verticalMargin + i * scaledVerticalLabelfreq;

    const horizontalGuidelineEndX =
      chart.horizontalMargin + chart.horizontalAxisWidth;
    const horizontalGuidelineEndY =
      chart.verticalMargin + i * scaledVerticalLabelfreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawBar = function () {
  const chart = this;

  for (let i = 0; i < chart.itemsNum; i++) {
    const barColor = chart.randomColorGenerator();
    const fillOpacity = "0.4";
    const fillColor = `rgba(${barColor.r},${barColor.g},${barColor.b},${fillOpacity})`;
    console.log(fillColor);
    const barBorderColor = `rgba(${barColor.r},${barColor.g},${barColor.b})`;

    const barX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFrequency +
      (2 * chart.horizontalLabelFrequency) / chart.axisRatio;
    const barY = chart.height - chart.verticalMargin;

    const barWidth =
      chart.horizontalLabelFrequency -
      (2 * chart.horizontalLabelFrequency) / chart.axisRatio;
    const barHeight =
      (-1 * chart.verticalAxisWidth * chart.values[i]) / chart.maxValue;

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = barBorderColor;
    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
};

BarChart.prototype.randomColorGenerator = function () {
  const red = getRandomInt(0, 257);
  const green = getRandomInt(0, 257);
  const blue = getRandomInt(0, 257);
  return { r: red, g: green, b: blue };
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
