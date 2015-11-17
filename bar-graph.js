// BAR CHART DEALIO
// 
// draw bars based on generated data
// draw axis
// draw alternate table (blue)
// switch between tables every other second

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
	50,
	40,
	30,
	20,
	10
];

var svgContainer = d3.select("body").append("svg")
																		.attr("id", "bar-graph")
                                    .attr("width", 200)
                                    .attr("height", 200);

svgContainer.append('g').attr('class', 'bars');
var gBars = d3.select("#bar-graph").selectAll('.bars');

var drawBars = function (data) {
	for (var i = 0; i < data.length; i++) {
		  gBars.data(data).enter().append("rect")
			.attr("class", "bar")
		  .attr("x", i * 10 + 10)
		  .attr("y", 10)
		  .attr("width", 2)
		  .attr("height", data[i]);
	}
}

var removeBars = function () {
	d3.selectAll(".bar").remove();
}

drawBars(data1);
setInterval(function () {
	removeBars();
	drawBars(data2);
}, 2000);
