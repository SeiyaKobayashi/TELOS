data = $('.user-profile').data("user-posts");
// e.g.) 2018-12-09T20:04:48.000Z (rails' applicationrecord) --> 2018-12-09 (more tractable format)
data_created_at = data.map(function(d) {
  return d.created_at.split("T")[0];
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

dOne = parseTime(dOne);
dTwo = parseTime(dTwo);
dThree = parseTime(dThree);
dFour = parseTime(dFour);
dFive = parseTime(dFive);
dSix = parseTime(dSix);
dSeven = parseTime(dSeven);

week = [];
week.push(dOne);
week.push(dTwo);
week.push(dThree);
week.push(dFour);
week.push(dFive);
week.push(dSix);
week.push(dSeven);

// Create a dictionary that stores {date: count of posts on that date} pairs.
var postCounts = {};
data_created_at.forEach(function(c) {
  postCounts[c] = (postCounts[c] || 0) + 1;
});

// Get the number of posts in each day for the most recent week.
var dataGraph = {};
week.forEach(function(d) {
  if (postCounts[d] != null) {
    dataGraph[d] = postCounts[d];
  } else {
    dataGraph[d] = 0;
  }});

//------ d3 starts from here -------//
// Set margin, width and height of SVG
const margin = {top: 20, right: 10, bottom: 20, left:37};
const width = 250 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

function findMaxValue(d) {
  dList = [];
  for (var k in d) {
    dList.push(d[k]);
  }
  return Math.max.apply(null, dList);
}

var maxNumOfPosts = findMaxValue(dataGraph);

// 0 --> 0, Max number of posts --> width
var x = d3.scale.linear()
                .domain([0, maxNumOfPosts+2])
                .range([0, width]);

xAxis = d3.axisTop(x).ticks(maxNumOfPosts+1);

dOneParsed = new Date(dOne);
dSevenParsed = new Date(dSeven);

// Oldest date --> 0, Newest date --> height
var y = d3.scaleTime()
          .domain([dOneParsed, dSevenParsed])
          .range([0, height]);

yAxis = d3.axisLeft(y).tickFormat(d3.timeFormat("%m/%e")).ticks(8);

var svg = d3.select('.user-activity-graph')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

var chart = svg.append('g')
               .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

chart.append("g")
   .classed("x axis", true)
   .call(xAxis);

chart.append("g")
     .classed("y axis", true)
     .call(yAxis);

// var bars = chart.selectAll('rect.bar')
//                 .data(data);
// bars.enter()
//     .append('rect')
//     .attr('class', 'bar');
//
// bars.attr('x', 0)
//     .attr('y', function(d) {
//       return y(d);
//     })
//     .attr('height', y.rangeBand())
//     .attr('width', function(d) {
//       return x(d);
//     });
