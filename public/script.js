window.addEventListener('load',function(){
//Build a table for our location data
//use Golocation API to determine where we are.
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(function(position){
    d3.select('body')
    .insert('div',':first-child')
    .text("you are here: "+ position.coords.latitude +","+ position.coords.longitude)
    console.log(position);

  })
}
d3.json('/locations.json',function(err,locations){
  if(err) return console.log(err);
  console.log(locations);

var table=  d3.select('body').append('table');
table.append('thread')
  .append('tr')
    .selectAll('th')
    .data(['adress','latitude','lonitube'])
      .enter()
          .append('th')
          .text(function(d){return d;})

table.append('tbody')
.selectAll('th')
.data(locations)
.enter()
.append('tr')
.each(function(d){
  d3.select(this).append('td').text(d.adress);
    d3.select(this).append('td').text(d.latitude);
      d3.select(this).append('td').text(d.longitude);
  //d3.select(this).append('td').text(d.adress);
  //d3.select(this).append('td').text(d.adress);
});
//Draw a mao with locations marked with pins
d3.json('/united-states.json',function(err,usa){
  if(err)return console.log(err);
  var width=760;
  var height=480;
  //create an svg to render into
  var svg= d3.select('body').append('svg')
  .attr('width',width)
  .attr('height',height)
//create a projection to translate
var projection = d3.geoAlbersUsa()
.scale(1000)
.translate([width/2],[height/2]);

var path= d3.geoPath()
.projection(projection);

svg.insert('path','.land-borders')
.datum(topojson.feature(usa,usa.objects.land))
.attr('class','land')
.attr('d',path);

  svg.insert('path','.state-borders')
  .datum(topojson.feature(usa,usa.objects.state))
  .attr('class','state')
  .attr('d',path);
  d3.json('/locations.json',function(err,locations){
    if(err) return console.log(err);
  });
  svg.selectAll('.pin')
    .data(locations)
    .enter()
      .append('image')
      attr('xlink:href','lin.png')
      .attr('class','pin')
      .attr('width',20)
      .attr('height'20)
      .attr('transform',function(d))
      
});

});

});
