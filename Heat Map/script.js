// Declaration of variables

//Fetch data from the API
var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
var method = 'GET';
var xmlrequest = new XMLHttpRequest();

//Variables to store fetched data
let baseTemp;
let dataset;
let data = [];

//Create Scales
var xScale;
var yScale;

//Time format
var yearFormat = d3.format('d');
var monthFormat = d3.timeFormat('%B');

//Max and Min
var minYear;
var maxYear;
var minMonth;
var maxMonth;

//Create a tooltip
var tooltip = d3.select('body')
                .append('div');

//Create a Canvas
var canvas = d3.select('#canvas')

//Canvas Dimensions
var canvasDimension = {
    width: 1300,
    height: 600
}

//Legend Dimensions
var legendDimension = {
    width: 220,
    height: 200
}

//Canvas padding
var padding = {
    width: 120,
    height: 80
}


//Drawing Canvas
function drawCanvas() {

    canvas.attr('width', canvasDimension.width)
          .attr('height', canvasDimension.height);
}

//Generating Scale
function generateScale(){

    //Minimum and Maximum
    minYear = d3.min(data, (d) => {
        return d.year;
    });
    maxYear = d3.max(data, (d) => {
        return d.year;
    });
    minMonth = new Date(0, 0, 0, 0, 0, 0, 0);
    maxMonth = new Date(0, 12, 0, 0, 0, 0, 0);


    //Scale for xAxis representating the years
    xScale = d3.scaleLinear()
               .domain([minYear, maxYear + 1])
               .range([padding.width, canvasDimension.width - padding.width]);

    //Scale for the yAxis representating the months
    yScale = d3.scaleTime()
               .domain([minMonth, maxMonth])
               .range([padding.height, canvasDimension.height - padding.height]);
}

//Generate Axis with tick
function generateAxis() {

    //Initialise Axis
    var xAxis = d3.axisBottom(xScale)
                  .tickFormat(yearFormat);
    
    var yAxis = d3.axisLeft(yScale)
                  .tickFormat(monthFormat);

    //Render Axis
        //xAxis
    canvas.append('g')
          .attr('id', 'x-axis')
          .call(xAxis)
          .attr('transform', 'translate(0, ' + (canvasDimension.height - padding.height ) + ')');
        
        //yAxis
    canvas.append('g')
          .attr('id', 'y-axis')
          .call(yAxis)
          .attr('transform', 'translate(' + (padding.width) + ', 0)');
}

function drawHeatMap() {
    
    var numberOfYears = maxYear - minYear;

    //Draw Cells
    canvas.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'cell')
          .attr('fill', (d) => {
            variance = d['variance'];

            if (variance <= -1) {
                return 'SteelBlue';
            } else if (variance <= 0) {
                return 'LightSteelBlue';
            } else if (variance <= 1) {
                return 'Orange';
            } else {
                return 'Crimson';
            }
          })
          .attr('data-month', (d) => {
            return d.month - 1;
          })
          .attr('data-year', (d) => {
            return d.year;
          })
          .attr('data-temp', (d) => {
            return (baseTemp + d.variance);
          })
          .attr('x', (d) => {
            return xScale(d.year)
          })
          .attr('y', (d) => {
            return yScale(new Date(0, (d.month - 1), 0, 0, 0, 0, 0, 0));
          })
          .attr('height', (canvasDimension.height - (2*padding.height)) / 12 )
          .attr('width', (d) => {
            return (canvasDimension.width - (2*padding.width)) / numberOfYears ;
          })
          .on('mouseover', (d, i) => {

            tooltip.attr('id', 'tooltip')
                   .attr('class', 'tooltip')
                   .attr('data-year', d.year);

            tooltip.transition()
                   .duration(200)
                   .style('opacity', 0.9);
            
            let months = [
                'January',
                'Febuary',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]

            tooltip.html("" + "Year: " + d.year + ' - ' + months[d.month - 1] + "<br/>" +
                    "Temperature: " + (baseTemp + d.variance) + " &#8451;" + "<br/>" +
                    "Variance: " + d.variance + " &#8451;" + "<br/>");

            tooltip.style('left', (d3.event.pageX + 10) + 'px')
                   .style('top', (d3.event.pageY + 10) + 'px');

          })
          .on('mouseout', (d, i) => {
            tooltip.transition()
                   .duration(200)
                   .style('opacity', 0);
          })
}

//Draw Legend
function drawLegend() {

    var legend = d3.select('#legend')
                   .attr('width', legendDimension.width)
                   .attr('height', legendDimension.height);

    legend.append('g')
          .append('rect')
          .attr('class', 'legendCell')
          .attr('x', 10)
          .attr('y', 0)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', 'SteelBlue');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 20)
          .attr('fill', 'white')
          .text('Variance of -1 or less')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legendCell')
          .attr('x', 10)
          .attr('y', 40)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', 'LightSteelBlue');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 60)
          .attr('fill', 'white')
          .text('On or below Average')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legendCell')
          .attr('x', 10)
          .attr('y', 80)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', 'Orange');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 100)
          .attr('fill', 'white')
          .text('Above Average')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legendCell')
          .attr('x', 10)
          .attr('y', 120)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', 'Crimson')
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 140)
          .attr('fill', 'white')
          .text('Variance of +1 or more')
          .attr('class', 'legendText');
}

function drawHint() {

    var monthHint = d3.select('#canvas')
                      .append('text')
                      .attr('class', 'info')
                      .attr('x', -300)
                      .attr('y', 40)
                      .attr('transform', 'rotate(-90)')
                      .text('Months')
                      .style('fill', 'white');

    var owner = d3.select('#canvas')
                      .append('text')
                      .attr('class', 'info')
                      .attr('font-size', 14)
                      .attr('x', 1135)
                      .attr('y', 590)
                      .text('Made by Venom Cocytus')
                      .style('fill', 'white');

    var yearHint = d3.select('#canvas')
                      .append('text')
                      .attr('class', 'info')
                      .attr('x', 620)
                      .attr('y', 565)
                      .text('Years')
                      .style('fill', 'white');

    var legendInfo = d3.select('#legend')
                       .append('text')
                       .attr('class', 'info')
                       .attr('x', 90)
                       .attr('y', 190)
                       .text('Legend')
                       .style('fill', 'white');
}

//Main function
    //Fetch Request
    xmlrequest.open(method, url, true);
    xmlrequest.onload = function(){

        dataset = JSON.parse(xmlrequest.responseText);
        data = dataset.monthlyVariance;
        baseTemp = dataset.baseTemperature;
        
        console.log(data);
        console.log(baseTemp);

        //Calling canvas function
        drawCanvas();
        generateScale();
        generateAxis();
        drawHeatMap();
        drawLegend();
        drawHint();
    }
    xmlrequest.send();
 


