var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

function open_web_page(selected_node){
}

d3.json("data/sample.json", function(error, graph) {
  //console.log(graph)


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
   
  d3.selectAll(".node")
      .style("fill","gray")
      .transition().duration(1000).delay(2500)
        .style("fill","yellow");

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
      if (!element.classed("clicked")){
          element.classed("clicked",true)
          graph.links.forEach(function(d,i){
            if (d.source.name == source && d.target.color_group == "1"){
                    d3.select("#ID"+d.target.name)
                      .transition().duration(1000).delay(0)
                      .style("fill","blue");
            }
          });      
      }else{
          element.classed("clicked",false)
          graph.links.forEach(function(d,i){
            if (d.source.name == source && d.target.color_group == "1"){
                d3.select("#ID"+d.target.name)
                    .transition().duration(1000).delay(0)
                    .style("fill","yellow");
            }
      });
      }
  });
});

