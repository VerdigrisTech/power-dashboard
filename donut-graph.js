var dataset = [
  { label: 'Office Equipment', percent: 10 }, 
  { label: 'Lighting', percent: 20 },
  { label: 'Other', percent: 30 },
  { label: 'HVAC', percent: 40 }
];

var width = 200;
var height = 200;
var radius = Math.min(width, height) / 2;
var donutWidth = 20;

var color = d3.scale.category20b();

var svg = d3.select('#donut-graph')
  .append('g')
  .attr('transform', 'translate(' + (width / 2 +  200) + 
    ',' + (height / 2 + 50) + ')');

var svgText = d3.select('#donut-graph').selectAll(".donut-text")
  .append('g');

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);
  
var pie = d3.layout.pie()
  .value(function(d) { return d.percent; })
  .sort(null);

var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    return color(d.data.label);
  });

for (var j = 0; j < dataset.length; j++) {
  var percent = dataset[j].percent;
  svgText
    .data(dataset).enter().append("text")
    .attr("fill", "white")
    .attr("x", -10 * percent * Math.cos(j / 8) + 490)
    .attr("y", 8.5 * percent * Math.sin(j) + 40)
    .text(dataset[j].label + " " + percent + "%")
    .attr("class", "donut-text");
}
