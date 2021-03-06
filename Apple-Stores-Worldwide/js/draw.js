function draw(geo_data) {
  //draw map
  "use strict";
  //debugger; //check data

  var width = 1470;
  var height = 500;


  var svg = d3.select('.svg-container')
      .append('svg')
      .attr('width', '100%' )
      .attr('height', '100%')
      .call(d3.zoom()
          .scaleExtent([1, 50])
          .on('zoom', function(){
            d3.select('.paths').attr('transform',
              'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
            d3.select('.circles').attr('transform',
              'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
            d3.selectAll('circle').attr("r", 6/d3.event.transform.k)
              .attr("stroke-width", 1/d3.event.transform.k);

          }))//.on('dblclick.zoom', null)
      .append('g')
      .attr('class','map');


  var projection = d3.geoMercator()
      .scale(190)
      .translate([width/2, height/2]);

  var path = d3.geoPath().projection(projection);

  var map = svg.append('g').attr('class', 'paths')
      .selectAll('path')
      .data(geo_data.features)
      .enter().append('path')
      .attr('d', path)
      .on('mouseenter', function(){
        this.classList.add('selected');
      })
      .on('mouseleave', function(){
        this.classList.remove('selected');
      });




  function draw_point(point_data) {
    //draw circles

    svg.append('g')
        .attr('class','circles')
        .selectAll('circle')
        .data(point_data.sort( function(a, b){return a.Num - b.Num;}))//sort by Num
        .enter()
        .append('circle')
        .on("mouseover", function(d){
              d3.select("#store_name").text(d.NameFull);
              d3.select("#store_addr").text(d.Address);
              d3.select('#store_date').text('Open: '+ d.Date);
              d3.select('#store_num').text('ID: '+ d.Num);
              d3.select('#store_img').attr('src',d.Photo);
              //d3.select('.store_info').attr('style','display:block');
              d3.select(this).attr("class","incident hover");
            })
        .on("mouseout", function(d){
              d3.select("#store_name").text('移动鼠标查看门店信息');
              d3.select("#store_addr").text('可用鼠标滚轮或双击缩放地图');
              d3.select('#store_date').text('');
              d3.select('#store_num').text('');
              //d3.select('.store_info').attr('style','display:none');
              d3.select('#store_img').attr('src','');
              d3.select(this).attr("class","incident");
            })
        .transition()
            .delay(200)
            .duration(10)
            .ease(Math.sqrt)
            .attr('r', 6)//zoomIdent
            .attr('stroke-width', 0.5)
            .attr('cx', function(d) {
              return projection([ +d.Long, +d.Lat ])[0];})
            .attr('cy', function(d) {
              return projection([ +d.Long, +d.Lat ])[1];});

    svg.attr("transform", "translate(" + [0,0] + ") scale(" + 1 + ")");


  }


  //click first_play button and then load store data

  var applestore_data = [];

  var parseTime = d3.timeParse('%B %d, %Y');//format date

  d3.csv('data/apple_store_list_v2.0.csv', function(d){
    d.Date = parseTime(d.Date);
    applestore_data = d;
  });

  function hide_start_screen(){
    document.getElementById('screen').style.display="none";
    draw_point(applestore_data);
  }

  d3.select('#first_play').on('click',hide_start_screen);

}
