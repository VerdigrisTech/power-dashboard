// d3 code for Top Detail directive



// var width = window.innerWidth * 0.75; //960;
// var height = 560;
var width = 500;
var height = 800;
// Padding variable for separation between same-color nodes.
var padding = 10;
// Cluster padding variable for separation between different-color nodes.
var clusterPadding = 10;
var maxRadius = 5;

var data = { data:
  [{
    name: "Main Switchboard",
    circuits: [
      {
        name: "All Lighting (phase A)",
        power: 557
      },
      {
        name: "All Lighting (phase B)",
        power: 507
      },
      {
        name: "All Lighting (phase C)",
        power: 499
      }
    ]
  }, {
    name: "Dist. Panel A",
    circuits: [{
      name: "L7 (phase A)",
      power: 435
    },
    {
      name: "L7 (phase B)",
      power: 405
    },
    {
      name: "L7 (phase C)",
      power: 421
    }]
  }]
};

var circuitCount = 0;
var nodeArr = [];

// sum up the power per circuit
var panelSum = {};
for (var i = 0; i < data.data.length; i++) {
  var name = data.data[i].name;
  panelSum[name] = 0;
  for (var j = 0; j < data.data[i].circuits.length; j++) {
    var circuitPower = data.data[i].circuits[j].power;
    panelSum[name] += circuitPower;
    circuitCount++;

    // add circuit to node array
    var d = {
      cluster: i,
      r: circuitPower,
      rw: 999.9
    }
    nodeArr.push(d);
  }

  // add panel to node array
  var d = {
    cluster: i,
    r: panelSum[name],
    rw: 999.9
  }
  nodeArr.push(d);
}

// add circuits to node array


var panelCount = data.data.length;

var nodeCount = panelCount + circuitCount;

// Variable n is the total number of nodes.
var n = nodeCount;
// Variable m is the number of distinct clusters
var m = panelCount;

var color = d3.scale.category20c()
    .domain(d3.range(m));

// The largest node for each cluster.
var clusters = new Array(m);

// transfer object properties into an array
var panelArray = [];
for (var key in panelSum) {
  panelArray.push({name: key, power: panelSum[key]});
}

var nodes = d3.range(nodeCount).map(function(index) {
  var i = nodeArr[index].cluster;
  var r = nodeArr[index].r / 50;
  var d = {cluster: i, radius: r, rw: 999.9};
  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
  return d;
});

// also want to map based on circuits
// assign circuit to appropriate panel cluster
// set radius that is the panel's power
// name is circuit name
// d = asdlfjsal;fsadjfkl;jl


// put data into nodes
// for (var i = 0; i < nodes.length; i++) {
//   if(i === 0) {
//     nodes[i].radius = 95;
//   }
//   nodes[i].id = data[i].id;
//   nodes[i].channelId = data[i].channelId;
//   nodes[i].name = data[i].name;
//   nodes[i].createdAt = data[i].createdAt;
//   nodes[i].updatedAt = data[i].updatedAt;
// }

// Use d3's pack layout to initialize node positions.
d3.layout.pack()
    // .sort(null)
    .size([width, height])
    .children(function(d) { return d.values; })
    .value(function(d) { return d.radius * d.radius; })
    .nodes({values: d3.nest()
      .key(function(d) { return d.cluster; })
      .entries(nodes)});

// Apply force to each node.
var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.02)
    .charge(-50)
    .on("tick", tick)
    .start();

setInterval(function(){force.alpha(0.08);}, 250);

// Create SVG containing element for graph nodes.
var svg = d3.select("svg");
// var svg = d3.select(el).append('svg')
//     .attr('class', 'd3')
//     .attr('width', window.innerWidth * 0.75)
//     .attr('height', height)
//     .attr('style', 'background: AliceBlue');

// Create a group for node circles.
svg.append('g')
    .attr('class', 'd3-points');

// Create a group for node text links.
// svg.append('g')
//     .attr('class', 'd3-texts');

// Create selectors for respective groups.
// var g = d3.select(el).selectAll('.d3-points');
var g = d3.select("svg").selectAll('.d3-points');
// var gt = d3.select(el).selectAll('.d3-texts');

// var text = gt.selectAll('.d3-text');

var node = g.selectAll(".d3-points")
    .data(nodes)
    .enter().append("circle")
    .style("fill", function(d) { return color(d.cluster); }) // set color with this
    .call(force.drag);

// Add text and link to circles
// var texts = text
//   .data(nodes)
//   .enter()
//   .append("text")
//   .attr("x", function(d) { return d.x; })
//   .attr("y", function(d) { return d.y; })
//   .attr("z", 11)
//   .attr('class', 'd3-text')
//   .text( function (d) { return d.name; })
//   .attr("font-family", "roboto")
//   .attr("font-size", "25px")
//   .attr("fill", "#ECF0F1")
//   .attr("stroke", "#333333")
//   .attr("stroke-width", "0.5px")
//   .attr("cursor", "pointer")
//   .attr("id", function(d) {return d.id})
//   .style("text-anchor", "middle")
//   .on("click", function(d) {
//     NodeResourceActions.setNodeId(d.id);
//   })
//   .call(force.drag);

node.transition()
    .duration(750)
    .delay(function(d, i) { return i * 5; })
    .attrTween("r", function(d) {
      var i = d3.interpolate(0, d.radius);
      return function(t) { return d.radius = i(t); };
    });

// texts.transition()
//     .duration(750)
//     .delay(function(d, i) { return i * 5; });

function tick(e) {
  node
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  // texts
  //     .each(cluster(10 * e.alpha * e.alpha))
  //     .each(collide(.5))
  //     .attr("x", function(d) { return d.x; })
  //     .attr("y", function(d) { return d.y; });
};

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  return function(d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x;
    var y = d.y - cluster.y;
    var l = Math.sqrt(x * x + y * y);
    var r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
};

// Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
};
