// Make sure JS works without reloading.
document.addEventListener('turbolinks:load', function() {
  removeGraph();
  data = $('.user-profile').data("user-posts");
  d = parseData(data);
  drawGraph(d);
});

// Remove SVG and graphs.
function removeGraph() {
  d3.select('svg').remove();
}

// Parse data for the sake of tractability.
function parseData(d) {
  // e.g.) 2018-12-09T20:04:48.000Z (rails' applicationrecord) --> 2018-12-09 (more tractable format)
  data_created_at = d.map(function(d) {
    return d.created_at.split("T")[0];
  });

  // e.g. 2018-12-09 --> 12-09
  data_created_at_simplified = data_created_at.map(function(d) {
    return d.slice(-5);
  });

  var dOne = new Date();
  var dTwo = new Date();
  var dThree = new Date();
  var dFour = new Date();
  var dFive = new Date();
  var dSix = new Date();
  var dSeven = new Date();

  dOne.setDate(dSeven.getDate()-6);
  dTwo.setDate(dSeven.getDate()-5);
  dThree.setDate(dSeven.getDate()-4);
  dFour.setDate(dSeven.getDate()-3);
  dFive.setDate(dSeven.getDate()-2);
  dSix.setDate(dSeven.getDate()-1);

  dOne = parseTime(dOne);
  dTwo = parseTime(dTwo);
  dThree = parseTime(dThree);
  dFour = parseTime(dFour);
  dFive = parseTime(dFive);
  dSix = parseTime(dSix);
  dSeven = parseTime(dSeven);

  week = [dOne, dTwo, dThree, dFour, dFive, dSix, dSeven];
  week_simplified = week.map(function(d) {
    return d.slice(-5);
  });

  // Create a dictionary that stores {date: count of posts on that date} pairs.
  var postCounts = {};
  data_created_at_simplified.forEach(function(c) {
    postCounts[c] = (postCounts[c] || 0) + 1;
  });

  // Get the number of posts in each day for the most recent week.
  var dataGraph = [];
  week_simplified.forEach(function(d) {
    if (postCounts[d] != null) {
      dataGraph.push({
        date: d,
        count: postCounts[d]
      });
    } else {
      dataGraph.push({
        date: d,
        count: 0
      });
    }});

  return dataGraph;
}

// e.g.) Sat Dec 08 2018 06:49:56 GMT-0500 (Eastern Standard Time) --> 2018-12-08
function parseTime(d) {
  d = d.toLocaleDateString();
  d_temp = d.split("/");
  if (d_temp[0].length == 1) {
    temp = "0".concat(d_temp[0]);
  } else {
    temp = d_temp[0];
  }
  if (d_temp[1].length == 1) {
    temp_2 = "0".concat(d_temp[1]);
  } else {
    temp_2 = d_temp[1];
  }
  d_temp[0] = d_temp[2];
  d_temp[1] = temp;
  d_temp[2] = temp_2;
  d = d_temp.join("-");
  return d;
}

// Add SVG and graphs.
function drawGraph(dataGraph) {
  // Set margin, width and height of SVG
  const margin = {top: 10, right: 20, bottom: 20, left:35};
  const width = 350 - margin.left - margin.right;
  const height = 360 - margin.top - margin.bottom;

  var svg = d3.select('.user-activity-graph')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // 0 --> 0, Max number of posts --> width
  var x = d3.scaleLinear()
            .domain([0, d3.max(dataGraph, function(d) {
              return d.count;
            })])
            .range([0, width-50]);

  // Oldest date --> 0, Newest date --> height
  var y = d3.scaleBand()
            .rangeRound([height, 0])
            .padding(0.4)
            .domain(dataGraph.map(function(d) {
              return d.date;
          }));

  yAxis = d3.axisLeft(y).tickSize(0);

  var gy = svg.append('g')
              .classed('yAxis', true)
              .call(yAxis);

  var bars = svg.selectAll('.bar')
                .data(dataGraph)
                .enter()
                .append('g');

  bars.append('rect')
      .classed('bar', true)
      .attr('y', function (d) {
        return y(d.date);
      })
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', function (d) {
        return x(d.count);
      })
      .attr();

  bars.append('text')
      .classed('label', true)
      .attr('y', function (d) {
        return y(d.date) + y.bandwidth() / 2 + 4;
      })
      .attr('x', function (d) {
        return x(d.count) + 5;
      })
      .text(function (d) {
        return d.count;
      });
}
