
var textGroup = d3.select("#analytics").data(data).enter().append("g");

textGroup.append("text")
	.attr("x", 10)
	.attr("y", 10)
	.attr("color", "white")
	.text(function (d) {
		// console.log(d);
		return d.name;
	});
