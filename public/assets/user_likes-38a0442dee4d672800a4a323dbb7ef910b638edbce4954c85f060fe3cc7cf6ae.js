function removeGraph(){d3.select("svg").remove()}function parseData(t){data_created_at=t.map(function(t){return t.created_at.split("T")[0]}),data_created_at_simplified=data_created_at.map(function(t){return t.slice(-5)});var e=new Date,a=new Date,n=new Date,r=new Date,d=new Date,i=new Date,p=new Date;e.setDate(p.getDate()-6),a.setDate(p.getDate()-5),n.setDate(p.getDate()-4),r.setDate(p.getDate()-3),d.setDate(p.getDate()-2),i.setDate(p.getDate()-1),e=parseTime(e),a=parseTime(a),n=parseTime(n),r=parseTime(r),d=parseTime(d),i=parseTime(i),p=parseTime(p),week=[e,a,n,r,d,i,p],week_simplified=week.map(function(t){return t.slice(-5)});var s={};data_created_at_simplified.forEach(function(t){s[t]=(s[t]||0)+1});var c=[];return week_simplified.forEach(function(t){null!=s[t]?c.push({date:t,count:s[t]}):c.push({date:t,count:0})}),c}function parseTime(t){return t=t.toLocaleDateString(),d_temp=t.split("/"),1==d_temp[0].length?temp="0".concat(d_temp[0]):temp=d_temp[0],1==d_temp[1].length?temp_2="0".concat(d_temp[1]):temp_2=d_temp[1],d_temp[0]=d_temp[2],d_temp[1]=temp,d_temp[2]=temp_2,t=d_temp.join("-")}function drawGraph(t){const e={top:10,right:20,bottom:20,left:35},a=350-e.left-e.right,n=360-e.top-e.bottom;var r=d3.select(".user-activity-graph").append("svg").attr("width",a).attr("height",n).append("g").attr("transform","translate("+e.left+","+e.top+")"),d=d3.scaleLinear().domain([0,d3.max(t,function(t){return t.count})]).range([0,a-50]),i=d3.scaleBand().rangeRound([n,0]).padding(.4).domain(t.map(function(t){return t.date}));yAxis=d3.axisLeft(i).tickSize(0);r.append("g").classed("yAxis",!0).call(yAxis);var p=r.selectAll(".bar").data(t).enter().append("g");p.append("rect").classed("bar",!0).attr("y",function(t){return i(t.date)}).attr("height",i.bandwidth()).attr("x",0).attr("width",function(t){return d(t.count)}).attr(),p.append("text").classed("label",!0).attr("y",function(t){return i(t.date)+i.bandwidth()/2+4}).attr("x",function(t){return d(t.count)+5}).text(function(t){return t.count})}removeGraph(),data=$(".user-profile").data("user-likes"),d=parseData(data),drawGraph(d);