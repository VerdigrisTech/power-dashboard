 var dataset = [
  { label: 'Abulia', count: 10 }, 
  { label: 'Betelgeuse', count: 20 },
  { label: 'Cantaloupe', count: 30 },
  { label: 'Dijkstra', count: 40 }
];

var width = 200;
var height = 200;
var radius = Math.min(width, height) / 2;
var donutWidth = 20;

var color = d3.scale.category20b();

var svg = d3.select('#donut-graph')
  .append('g')
  .attr('transform', 'translate(' + (width / 2) + 
    ',' + (height / 2) + ')');

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);
  
var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    return color(d.data.label);
  });
