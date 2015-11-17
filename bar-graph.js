// BAR CHART DEALIO
// 
// draw bars based on generated data
// draw axis
// draw alternate table (blue)
// switch between tables every other second


// make this into 20 data points
var data1 = [
	10,
	20,
	30,
	40,
	50,
	60,
	70,
	80,
	90,
	100
];

var data2 = [
	100,
	90,
	80,
	70,
	60,
	70,
	40,
	30,
	20,
	10
];

var barData = [];

var svgContainer = d3.select("#bar-graph");

svgContainer.append('g').attr('class', 'bars');
var gBars = d3.select("#bar-graph").selectAll('.bars');

var drawBars = function (data, cssClass) {
	cssClass = cssClass || "bar";
	for (var i = 0; i < data.length; i++) {
		  gBars.data(data).enter().append("rect")
			.attr("class", cssClass)
		  .attr("x", i * 10 + 10)
		  .attr("y", 10)
		  .attr("width", 2)
		  .attr("height", 0)
    	.transition().duration(200).ease("linear")
    	.delay(function() { return i * 200; })
		  .attr("height", data[i]);
	}
}

var removeBars = function () {
	d3.selectAll(".bar").remove();
	d3.selectAll(".bar2").remove();
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
}, 3000);
