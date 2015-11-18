aData = [{name: "Amazing Thing", data: 234},
	{name: "Something Else", data: 523},
	{name: "Stock Market Simulator", data: 123}
];

var aText = d3.select('#analytics').selectAll(".donut-text")
  .append('g');

var aRect = d3.select('#analytics').selectAll(".divider")
  .append('g');

for (var k = 0; k < aData.length; k++) {
	aText
	  .data(aData).enter().append("text")
	  .attr("fill", "white")
	  .attr("x", k * 200 + 30)
	  .attr("y", 100)
	  .text(aData[k].data + "%")
	  .attr("class", "aText");

	aText
	  .data(aData).enter().append("text")
	  .attr("fill", "white")
	  .attr("x", k * 200 + 30)
	  .attr("y", 120)
	  .text(aData[k].name)
	  .attr("class", "donut-text");

	if (k < aData.length - 1) {
		aRect.data(aData).enter().append('rect')
			.attr('class', 'divier')
			.attr('x', k * 200 + 170)
			.attr('y', 55)
			.attr('width', 1)
			.attr('height', 100)
			.style('stroke', '#717171');
	}
}
