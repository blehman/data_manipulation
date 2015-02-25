var width = 960,
    height = 500;

var width = 3000,
    height = 2000;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width-1000, height-1000]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

function color_source_nodes(graph){
    var links = graph.links
    links.forEach(function(d,i){
      
      d3.select("#ID"+d.source.name)
        .transition().duration(1000).delay(0)
        .style("fill","yellow");
      
      d3.select("#ID"+d.target.name)
        .transition().duration(1000).delay(0)
        .style("fill","red");
    });
}

function color_nodes(source,graph,bool){
    var col = {true:"yellow",false:"blue"}
    if (bool){
        graph.links.forEach(function(d,i){
          if (d.source.name == source && d.target.color_group == "1"){
          d3.select("#ID"+d.target.name)
          .transition().duration(1000).delay(0)
          .style("fill","white");
          }
        });
    }else{
      color_source_nodes(graph)
    };
}

d3.json("data/sample.json", function(error, graph) {
  console.log(graph)


  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link");
      //.style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("id",function(d) {return "ID"+d.name})
      .attr("class", "node")
      .attr("r", 5)
      .call(force.drag);

  // color nodes
  color_source_nodes(graph);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

  });

  node.on("click",function(event){
      var source = event.name
      var element = d3.select(this)
      //console.log(graph.links)
      color_nodes(source,graph, element.classed("clicked"));
      element.classed("clicked", !element.classed("clicked"));
  });

});

