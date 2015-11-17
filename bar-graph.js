var data1 = [
	{time: "14:20", data:	10, units: "kWh"},
	{time: "14:21", data:	20, units: "kWh"},
	{time: "14:22", data:	30, units: "kWh"},
	{time: "14:23", data:	40, units: "kWh"},
	{time: "14:24", data:	50, units: "kWh"},
	{time: "14:25", data:	60, units: "kWh"},
	{time: "14:26", data:	70, units: "kWh"},
	{time: "14:27", data:	80, units: "kWh"},
	{time: "14:28", data:	90, units: "kWh"},
	{time: "14:29", data: 100, units: "kWh"},
	{time: "14:30", data:	10, units: "kWh"},
	{time: "14:31", data:	20, units: "kWh"},
	{time: "14:32", data:	30, units: "kWh"},
	{time: "14:33", data:	40, units: "kWh"},
	{time: "14:34", data:	50, units: "kWh"},
	{time: "14:35", data:	60, units: "kWh"},
	{time: "14:36", data:	70, units: "kWh"},
	{time: "14:37", data:	80, units: "kWh"},
	{time: "14:38", data:	90, units: "kWh"},
	{time: "14:39", data: 100, units: "kWh"},
	{time: "14:40", data:	10, units: "kWh"},
	{time: "14:41", data:	20, units: "kWh"},
	{time: "14:42", data:	30, units: "kWh"},
	{time: "14:43", data:	40, units: "kWh"},
	{time: "14:44", data:	50, units: "kWh"},
	{time: "14:45", data:	60, units: "kWh"},
	{time: "14:46", data:	70, units: "kWh"},
	{time: "14:47", data:	80, units: "kWh"},
	{time: "14:48", data:	90, units: "kWh"},
	{time: "14:49", data: 100, units: "kWh"}
];

var data2 = [
	{time: "14:20", data: 100, units: "kW"},
	{time: "14:21", data:	90, units: "kW"},
	{time: "14:22", data:	80, units: "kW"},
	{time: "14:23", data:	70, units: "kW"},
	{time: "14:24", data:	60, units: "kW"},
	{time: "14:25", data:	70, units: "kW"},
	{time: "14:26", data:	60, units: "kW"},
	{time: "14:27", data:	65, units: "kW"},
	{time: "14:28", data:	62, units: "kW"},
	{time: "14:29", data:	50, units: "kW"},
	{time: "14:30", data: 48, units: "kW"},
	{time: "14:31", data:	60, units: "kW"},
	{time: "14:32", data:	63, units: "kW"},
	{time: "14:33", data:	70, units: "kW"},
	{time: "14:34", data:	64, units: "kW"},
	{time: "14:35", data:	70, units: "kW"},
	{time: "14:36", data:	40, units: "kW"},
	{time: "14:37", data:	30, units: "kW"},
	{time: "14:38", data:	20, units: "kW"},
	{time: "14:39", data:	10, units: "kW"},
	{time: "14:40", data: 25, units: "kW"},
	{time: "14:41", data:	32, units: "kW"},
	{time: "14:42", data: 44, units: "kW"},
	{time: "14:43", data:	60, units: "kW"},
	{time: "14:44", data:	52, units: "kW"},
	{time: "14:45", data:	30, units: "kW"},
	{time: "14:46", data:	44, units: "kW"},
	{time: "14:47", data:	35, units: "kW"},
	{time: "14:48", data:	60, units: "kW"},
	{time: "14:49", data: 83, units: "kW"}
];

var barData = [];

var width = d3.select("#bar-graph").style("width");
var height = d3.select("#bar-graph").style("height");

var svgContainer = d3.select("#bar-graph");

// svgContainer.append('g').attr('class', 'bars');
var gBars = d3.select("#bar-graph").selectAll('.bars');

var findMax = function (data) {
	var max = Number.NEGATIVE_INFINITY;
	for (var i = 0; i < data.length; i++) {
		if (data[i].data > max) {
			max = data[i].data;
		}
	}
	return max;
}

var drawBars = function (data, cssClass) {
	var dataMax = findMax(data);
	var units;

	cssClass = cssClass || "bar";
	for (var i = 0; i < data.length; i++) {
	  gBars.data(data).enter().append("rect")
		.attr("class", cssClass)
	  .attr("x", i * 10 + 100)
	  .attr("y", 160 )
	  .attr("width", 6)
	  .attr("height", 0)
  	.transition().duration(200).ease("poly(4)")
  	.delay(function() { return i * 200; })
	  .attr("height", function () { return data[i].data; })
	  .attr("y", 160 - data[i].data)
	  .transition().duration(200).ease("poly(4)")
  	.delay(function() { return i * 200 + 6000; })
	  .attr("height", 0)
	  .attr("y", 160 );

	  // x-axis
		if (i % 10 === 0 || i === data.length - 1) {
			gBars.data(data).enter().append("text")
			.attr("fill", "white")
		  .attr("x", i * 10 + 90)
		  .attr("y", 180)
		  .text(function () { return data[i].time})
		  .attr("class", "axis");
		}
	}

	// y-axis top
	gBars.data(data).enter().append("text")
			.attr("fill", "white")
		  .attr("x", 80)
		  .attr("y", 60)
		  .text(function () { return dataMax + " " + data[0].units})
		  .attr("class", "yaxis");

	// y-axis mid
	gBars.data(data).enter().append("text")
			.attr("fill", "white")
		  .attr("x", 80)
		  .attr("y", 110)
		  .text(function () { return dataMax / 2 + " " + data[0].units})
		  .attr("class", "yaxis");

	// y-axis bottom
	gBars.data(data).enter().append("text")
			.attr("fill", "white")
		  .attr("x", 80)
		  .attr("y", 160)
		  .text(function () { return 0 + " " + data[0].units})
		  .attr("class", "yaxis");

  // graph title
  var titleString = "";
  if (cssClass === "bar") {
  	titleString = "Energy";
  } else {
  	titleString = "Power";
  }
  gBars.data(data).enter().append("text")
		  .attr("x", 600)
		  .attr("y", 40)
		  .text(function () { return titleString + " (" + data[0].units + " per minute)"})
		  .attr("class", cssClass);
}

var removeBars = function () {
	d3.selectAll(".bar").remove();
	d3.selectAll(".bar2").remove();
	d3.selectAll(".axis").remove();
	d3.selectAll(".yaxis").remove();
}

barData = data1;
drawBars(barData);
setInterval(function () {
	removeBars();
	var cssClass = "bar";
	if (barData === data1) {
		barData = data2;
		cssClass = "bar2";
	} else {
		barData = data1;
	}

	drawBars(barData, cssClass);
}, 12000);
