let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

//Create request variable
let request = new XMLHttpRequest();

//Variable to store data from API
let dataObj;
let data = [];

//Create variable Linear scales
let yScale; //height scale
let xScale; //width scale

//Create Variable for Axis scale
let xAxisScale;
let yAxisScale;

//Canvas Dimnension
let canvasDimension = {
    width : 900,
    height : 500,
}

//Create padding for axis
let padding = {
    width: 80,
    height: 70,
}

//Create main container
let svg = d3.select('svg');


//Rendering the container
function drawCanvas() {
    svg.attr('width', canvasDimension.width)
       .attr('height', canvasDimension.height);
    

    //User story 01: Id title
    const subtitle = d3.select('svg')
    .append('text')
    .attr('class', 'subtitle')
    .attr('x', 360)
    .attr('y', 30)
    .text('United States GDP');

    const info = d3.select('svg')
    .append('text')
    .attr('class', 'info')
    .attr('x', 725)
    .attr('y', 475)
    .text('Made by Venom Cocytus')
       

    const dataname = d3.select('svg')
    .append('text')
    .attr('class', 'info')
    .attr('transform', 'rotate(-90)')
    .attr('x', -300)
    .attr('y', 30)
    .text('United States GDP')
    
}


//Generate Scales
function generateScales(){
    
    //Height Scale
    yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => {
        return d[1];
    })])
    .range([0, canvasDimension.height - (2 * padding.height)]);

    //Width Scale
    xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([padding.width, canvasDimension.width - padding.width]);

    //xAxis Scale for Dates

        //Transform string to dates contain in an array
        let datesArray = data.map((d) => {
            return new Date(d[0]);
        })
    
    xAxisScale = d3.scaleTime()
    .domain([d3.min(datesArray), d3.max(datesArray)])
    .range([padding.width, canvasDimension.width - padding.width]);

    //yAxis Scale for Date
    yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => {
        return d[1];
    })])
    .range([canvasDimension.height - padding.height, padding.height]);
}


//Draw bar of canvas
//User story 5
let drawBars =() => {

    //Create a tooltip
    //User Story 12
    let tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('class', 'tooltip');
    
    //Specify bar's width
    let barWidth = (canvasDimension.width - (2 * padding.width)) / data.length;

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar') //User Story 5
    .attr('width', barWidth)
    .attr('data-date', (d) => {
       return d[0];
    }) //User Story 6 & 7
    .attr('data-gdp', (d) => {
       return d[1];
    }) //User Story 6 & 8
    .attr('x', (d, i) => {
        return xScale(i); //User Story 10
    })
    .attr('height', (d) => {
        return yScale(d[1]); //User Story 9
    })
    .attr('y', (d) => {
        return (canvasDimension.height - padding.height) - yScale(d[1]); //User Story 11
    })
    //Define a Mouse Over method in javascript
    //User Story 12 
    .on('mouseover', (d, i) => {
        
        tooltip.transition()
                    .duration(200)
                    .attr('data-date', d[0])
                    .style('opacity', 0.9);

        tooltip.html("" + "Date: " + d[0] + "<br/>" +
                     "$ " + d[1] + " Billion")

        tooltip.style("left", (d3.event.pageX+10) + 'px')
               .style("top", (d3.event.pageY-30) + 'px')
               
        document.querySelector('#tooltip').setAttribute('data-date', d[0]);
    })
    .on('mouseout', (d) => {
        tooltip.transition(200)
                   .style('opacity', 0);
    })        
}

//Generate Axis
//User story 2 & 3 & 4
function generateAxes(){

    //Generate Axis
    let xAxis = d3.axisBottom(xAxisScale);
    let yAxis = d3.axisLeft(yAxisScale);

    //Render xAxis
    svg.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0, ' + (canvasDimension.height - padding.height) + ')');

    //Render yAxis
    svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + (padding.width) + ', 0)');
}


//Request initialization
request.open('GET', url, true);
request.onload = function(){
    dataObj = JSON.parse(request.responseText)
    data = dataObj.data
    drawCanvas();
    generateScales();
    drawBars();
    generateAxes();  
};
request.send();
