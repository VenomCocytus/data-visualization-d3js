//Variable's declaration

//Fetching data from the Api
var videoGameUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
var videoGameData;

//Create Canvas
var canvas = d3.select('#canvas');
var canvasDimension = {
    width: 1200,
    height: 600
};

//Create Legend
var legendContainer = d3.select('#legend');
var legendDimension = {
    width: 200,
    height: 700
}

//Color Array
var color = {
    color: ['orange' , 'yellow', 'red', 'pink', 'indigo', 'crimson',
            'brown', 'lightgreen', 'green', 'darkblue', 'steelblue',
            'darkcyan', 'darkviolet', 'firebrick', 'pink', 'gold', 'khaki',
            'tan'],
    console: ['Atari 2600', 'Nintendo 64', 'Wii', 'NES', 'Super NES', 'GameBoy',
            'GameBoy Advance', 'Nintendo DS', 'Nintendo 3DS', 'XBOX', 'XBOX One',
            'XBOX 360', 'Playstation One', 'Playstation 2', 'Playstation 3', 'Playstation 4',
            'PC', 'Playstation Portable'],
    atari: 'orange',
    nintendo64: 'yellow',
    wii: 'red',
    nes: 'pink',
    snes: 'indigo',
    gb: 'crimson',
    gba: 'brown',
    ds: 'lightgreen',
    ds3: 'green' ,
    xbox: 'darkblue',
    xone: 'steelBlue',
    xbox360: 'darkcyan',
    ps: 'darkviolet',
    ps2: 'firebrick',
    ps3: 'pink',
    ps4: 'gold',
    pc: 'khaki',
    psp:'tan',
}

//DrawCanvas
function drawCanvas() {

    canvas.attr('width', canvasDimension.width)
          .attr('height', canvasDimension.height);
}

//Draw Legend
function drawLegend() {

    legendContainer.attr('width', legendDimension.width)
                   .attr('height', legendDimension.height);

    var legend = legendContainer.selectAll('g')
                                .data(color.color)
                                .enter()
                                .append('g')
                                .attr('class', 'legend-box');

    legend.append('rect')
          .attr('class', 'legend-item')
          .attr('x', 10)
          .attr('y', (d, i) => {
            return i*40;
          })
          .attr('width', 40)
          .attr('height', 20)
          .attr('fill', (d) => {
            return d;
          })
    
    legend.append('text')
          .attr('x', 60)
          .attr('y', (d, i) => {
            return 15 + i*40;
          })
          .attr('fill', 'white')
          .attr('class', 'legend-text')
          .text((d, i) => {
            return color.console[i];
          })
}

//Draw Tree Map
function drawTreeMap() {

    //Create the treemap
    var treeMap = d3.treemap()
                    .size([canvasDimension.width, canvasDimension.height])
                    .paddingInner(2);

    //Define a hierarchy for the data
    var hierarchy = d3.hierarchy(videoGameData, (data) => {
        return data['children'];
    }).sum((data) => {
        return data.value;
    }).sort((node1, node2) => {
        return node2.value - node1.value;
    })

    //Initialize treemap
    treeMap(hierarchy);

    //Store sorted data
    videoGameTiles = hierarchy.leaves();
    console.log(videoGameTiles);

    //Render Tiles
        var tile = canvas.selectAll('g')
                         .data(videoGameTiles)
                         .enter()
                         .append('g')
                         .attr('transform', (d) => {
                            return 'translate (' + d.x0 + ', ' + d.y0 + ')';
                         })
                         .on('mouseover', (d, i) => {

                            //Create Tooltip
                            var tooltip = d3.select('#tooltip');
                            
                            tooltip.transition()
                                    .duration(200)
                                    .style('opacity', 0.8);

                            tooltip.html("" + "Name: " + d.data.name + "<br/>" +
                                        "Value: " + d.data.value + "<br/>" +
                                        "Category: " + d.data.category + "<br/>");

                            tooltip.style('left', (d3.event.pageX + 10) + 'px')
                                   .style('top', (d3.event.pageY - 28) + 'px');

                            tooltip.attr('data-value', d.data.value);
                         })
                         .on('mouseout', (d) => {
                            tooltip.transition()
                                    .duration(200)
                                    .style('opacity', 0)
                         });

        tile.append('rect')
            .attr('class', 'tile')
            .attr('data-name', (d) => {
                return d.data.name;
            })
            .attr('data-category', (d) => {
                return d.data.category;
            })
            .attr('data-value', (d) => {
                return d.data.value;
            })
            .attr('fill', (d) => {
                
                var category = d.data.category;

                if(category === '2600'){
                    return color.atari;
                } else if(category === 'Wii'){
                    return color.wii;
                } else if(category === 'NES'){
                    return color.nes;
                } else if(category === 'GB'){
                    return color.gb;
                } else if(category === 'DS'){
                    return color.ds;
                } else if(category === 'X360'){
                    return color.xbox360;
                } else if(category === 'PS3'){
                    return color.ps3;
                } else if(category === 'PS2'){
                    return color.ps2;
                } else if(category === 'SNES'){
                    return color.snes;
                } else if(category === 'GBA'){
                    return color.gba;
                } else if(category === '3DS'){
                    return color.ds3;
                } else if(category === 'N64'){
                    return color.nintendo64;
                } else if(category === 'PS4'){
                    return color.ps4;
                } else if(category === 'PS'){
                    return color.ps;
                } else if(category === 'XB'){
                    return color.xbox;
                } else if(category === 'PC'){
                    return color.pc;
                } else if(category === 'PSP'){
                    return color.psp;
                } else if(category === 'XOne'){
                    return color.xone;
                } 
            })
            .attr('width', (d) => {
                return d.x1 - d.x0;
            })
            .attr('height', (d) => {
                return d.y1 - d.y0;
            })
            // .attr('stroke', 'white');

        tile.append('text')
            .attr('class', 'game-title')
            .selectAll('tspan')
            .data(function (d) {
              return d.data.name.split(/(?=[A-Z][^A-Z])/g);
            })
            .enter()
            .append('tspan')
            .attr('x', 4)
            .attr('y', function (d, i) {
              return 13 + i * 10;
            })
            .text(function (d) {
              return d;
            });   
}


//Main
d3.json(videoGameUrl).then(
    (data, error) => {
        if(error){
            console.log(error);
        } else {

            videoGameData = data;
            console.log('Video Games Data')
            console.log(videoGameData);

            drawCanvas();
            drawLegend();
            drawTreeMap();
        }
    }
)