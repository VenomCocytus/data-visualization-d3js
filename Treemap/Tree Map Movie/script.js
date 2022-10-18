// Vaeriables declaration 


//Fetching variable
var movieUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';
var videoGameUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';
var kickstater ='https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json';

var method ='GET';

//Storing Data
var movieData;

//Canvas Dimension
canvasDimension = {
    width: 1300,
    height: 600
}

//Legend Dimension
legendDimension = {
    width: 500,
    height: 400
}

//Tiles
var dataTile;

//Create Canvas
var canvas = d3.select('#canvas');

//Create Legend
var legendCanvas = d3.select('#legend');

//Create tooltip
var tooltip = d3.select('body')
                .select('div')
                .attr('id', 'tooltip')
                .attr('class', 'tooltip')


//Draw Canvas
function drawCanvas() {

    canvas.attr('width', canvasDimension.width)
          .attr('height', canvasDimension.height)
}

//Draw description
function drawDescription() {
     var description = d3.select('body')
                            .append('div')
                            .attr('id', 'description')

          description.append('text')
                        .text('description')
                        .attr('x', 10)
                        .attr('y', 50)
                        .style('color', 'white')                  
}

//Draw Legend
function drawLegend() {

    var legend = d3.select('#legend')
                   .attr('width', legendDimension.width)
                   .attr('height', legendDimension.height);

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 0)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#330000');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 20)
          .attr('fill', 'white')
          .text('Less than 3%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 40)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#CC0000');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 60)
          .attr('fill', 'white')
          .text('Less than 12%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 80)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#6666FF');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 100)
          .attr('fill', 'white')
          .text('Less than 21%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 120)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', 'red')
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 140)
          .attr('fill', 'white')
          .text('Less than 30%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 160)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#00CCCC')
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 180)
          .attr('fill', 'white')
          .text('Less than 39%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 200)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#CC0066')
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 220)
          .attr('fill', 'white')
          .text('Less than 45%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 240)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#CC6600')
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 260)
          .attr('fill', 'white')
          .text('Less than 57%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', 280)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', '#CCCC00')
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 300)
          .attr('fill', 'white')
          .text('Above 57%')
          .attr('class', 'legendText');
}

//Draw Tree Map
function drawTreeMap() {

    var hierachy = d3.hierarchy(movieData, (d) => {
        return d.children;
    }).sum((d) => {
        return d.value;
    }).sort((d1, d2) => {
        return d2.value - d1.value;
    });

    var createTreeMap = d3.treemap()
                          .size([canvasDimension.width, canvasDimension.height]);

    createTreeMap(hierachy);

    dataTiles = hierachy.leaves();
    console.log(dataTiles);

    var block = canvas.selectAll('g')
                    .data(dataTiles)
                    .enter()
                    .append('g')
                    .attr('transform', (d) => {
                        return 'translate (' + d.x0 + ', ' + d.y0 + ')'
                    });

        block.append('rect')
             .attr('class', 'tile')
             .attr('fill', (d) => {
                var category = d.data.category;

                if(category === 'Action'){
                    return 'orange'
                }else if(category === 'Drama'){
                    return 'lightgreen'
                }else if(category === 'Adventure'){
                    return 'crimson'
                }else if(category === 'Family'){
                    return 'steelblue'
                }else if(category === 'Animation'){
                    return 'pink'
                }else if(category === 'Comedy'){
                    return 'khaki'
                }else if(category === 'Biography'){
                    return 'tan'
                }
             })
             .attr('data-name', (d) => {
                return d.data.name;
             })
             .attr('data-category', (d) => {
                return d.data.category;
             })
             .attr('data-value', (d) => {
                return d.data.value;
             })
             .attr('width', (d) => {
                return d.x1 - d.x0;
             })
             .attr('height', (d) => {
                return d.y1 - d.y0;
             })
             .attr('stroke', 'white')
             .attr('x', 5)
             .attr('y', 20)

             .on('mouseover', (d, i) => {

                tooltip.transition()
                        .duration(200)
                         .style('opacity', 0.9);

                tooltip.html("" + "Name: " + d.data.name + "<br/>" +
                            "Value: " + d.data.value + "<br/>" + 
                            "Category: " + d.data.category + "<br/>")

                tooltip.style('left', (d3.event.pageX + 10) + 'px')
                       .style('top', (d3.event.pageY - 30) + 'px');

                tooltip.attr('data-value', d.data.value);

                
             })
             .on('mouseout', (d) => {
                tooltip.transition()
                        .duration(50)
                        .style('opacity', 0)
             });

        block.append('text')
             .text((d) => {
                return d.data.name;
             })
}

//Main
d3.json(movieUrl).then(
    (data, error) => {
        if(error) {
            console.log(error);
        } else {
            movieData = data;
            console.log('Movie Data')
            console.log(movieData);
            console.log('Hierarchy Leaves');

            drawDescription();
            drawCanvas();
            drawLegend();
            drawTreeMap();
        }
    }
)