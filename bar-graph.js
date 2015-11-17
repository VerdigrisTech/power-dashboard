// BAR CHART DEALIO
// 
// X draw bars based on generated data
// draw axis
// X draw alternate table (blue)
// X switch between tables every other second


// make this into 20 data points
var data1 = [
	{time: "14:20", data:	10},
	{time: "14:21", data:	20},
	{time: "14:22", data:	30},
	{time: "14:23", data:	40},
	{time: "14:24", data:	50},
	{time: "14:25", data:	60},
	{time: "14:26", data:	70},
	{time: "14:27", data:	80},
	{time: "14:28", data:	90},
	{time: "14:29", data:100},
	{time: "14:30", data:	10},
	{time: "14:31", data:	20},
	{time: "14:32", data:	30},
	{time: "14:33", data:	40},
	{time: "14:34", data:	50},
	{time: "14:35", data:	60},
	{time: "14:36", data:	70},
	{time: "14:37", data:	80},
	{time: "14:38", data:	90},
	{time: "14:39", data:100},
	{time: "14:40", data:	10},
	{time: "14:41", data:	20},
	{time: "14:42", data:	30},
	{time: "14:43", data:	40},
	{time: "14:44", data:	50},
	{time: "14:45", data:	60},
	{time: "14:46", data:	70},
	{time: "14:47", data:	80},
	{time: "14:48", data:	90},
	{time: "14:49", data: 100}
];

var data2 = [
	{time: "14:20", data:100},
	{time: "14:21", data:	90},
	{time: "14:22", data:	80},
	{time: "14:23", data:	70},
	{time: "14:24", data:	60},
	{time: "14:25", data:	70},
	{time: "14:26", data:	40},
	{time: "14:27", data:	30},
	{time: "14:28", data:	20},
	{time: "14:29", data:	10},
	{time: "14:30", data:100},
	{time: "14:31", data:	90},
	{time: "14:32", data:	80},
	{time: "14:33", data:	70},
	{time: "14:34", data:	60},
	{time: "14:35", data:	70},
	{time: "14:36", data:	40},
	{time: "14:37", data:	30},
	{time: "14:38", data:	20},
	{time: "14:39", data:	10},
	{time: "14:40", data:100},
	{time: "14:41", data:	90},
	{time: "14:42", data:	80},
	{time: "14:43", data:	70},
	{time: "14:44", data:	60},
	{time: "14:45", data:	70},
	{time: "14:46", data:	40},
	{time: "14:47", data:	30},
	{time: "14:48", data:	20},
	{time: "14:49", data: 10}
];

var barData = [];

var width = d3.select("#bar-graph").style("width");
var height = d3.select("#bar-graph").style("height");

// var x = d3.scale.ordinal()
//   .domain(d3.range(data.length))
//   .rangeRoundBands([0, width], 0);
// var y = d3.scale.linear()
//         .domain([0, 100])
//         .range([height, 0]);

// var xScale = d3.scale.linear().
//   domain([0, 100]). // your data minimum and maximum
  // range([0, 300]); // the pixels to map to, e.g., the width of the diagram.

var svgContainer = d3.select("#bar-graph");

// svgContainer.append('g').attr('class', 'bars');
var gBars = d3.select("#bar-graph").selectAll('.bars');

var drawBars = function (data, cssClass) {
	cssClass = cssClass || "bar";
	for (var i = 0; i < data.length; i++) {
	  gBars.data(data).enter().append("rect")
		.attr("class", cssClass)
	  .attr("x", i * 10 + 100)
	  .attr("y", 10)
	  .attr("width", 6)
	  .attr("height", 0)
  	.transition().duration(100).ease("linear")
  	.delay(function() { return i * 100; })
	  .attr("height", data[i].data);

		if (i % 10 === 0 || i === data.length - 1) {
			console.log('drawing for i:', i);
			gBars.data(data).enter().append("text")
			.attr("fill", "white")
		  .attr("x", i * 10 + 90)
		  .attr("y", 150)
		  .text(function () { return data[i].time})
		  .attr("class", "axis");
		}
	}
}

var removeBars = function () {
	d3.selectAll(".bar").remove();
	d3.selectAll(".bar2").remove();
	d3.selectAll(".axis").remove();
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
}, 5000);
