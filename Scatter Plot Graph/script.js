//Fetch data to API
let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let method = 'GET';
let request = new XMLHttpRequest();

//API data Array
let data = [];
let years = [];
let time = [];

//Create Scale Variable
let xScale;
let yScale;
// let xAxisScale;
// let yAxisScale;

//data format variable
var yearFormat = d3.format('d');
var timeFormat = d3.timeFormat('%M:%S');

//Padding Variable
let padding = {
    width: 80,
    height: 60,
};

//Canvas Dimension
let canvasDimension = {
    width: 800,
    height: 550,
};

//Create SVG element on html
let svg = d3.select('svg');


//Drawing Canvas 
function drawCanvas(){

    svg.attr('width', canvasDimension.width);
    svg.attr('height', canvasDimension.height);

}

//Generate Scale
function generateScale(){

    //xScale for data
    xScale = d3.scaleLinear()
              .domain([d3.min(data, (d) => {
                return d.Year;
              }) - 1 , d3.max(data, (d) => {
                return d.Year;
              }) + 1])
              .range([padding.width, canvasDimension.width - padding.width]);

    //yScale for Data
    yScale = d3.scaleTime()
               .domain([d3.min(data, (d) => {
                return new Date(d.Seconds * 1000);
               }), d3.max(data, (d) => {
                return new Date(d.Seconds * 1000);
               })])
               .range([padding.height, canvasDimension.height - padding.height]);

    
}

//Generate Axis with scale Data
function generateAxis(){

    //Generate Axis
    let xAxis = d3.axisBottom(xScale)
                  .tickFormat(yearFormat)
    let yAxis = d3.axisLeft(yScale)
                  .tickFormat(timeFormat);

    //Render Axis
        //xAxis
        svg.append('g')
           .attr('id', 'x-axis')
           .call(xAxis)
           .attr('transform', 'translate(0, ' + (canvasDimension.height - padding.height) + ')');

        //yAxis
        svg.append('g')
           .attr('id', 'y-axis')
           .call(yAxis)
           .attr('transform', 'translate(' + (padding.width) + ', 0)');
        
}

//Draw a legend for the graph
function drawHint(){

    var info = d3.select('svg')
    .append('text')
    .attr('class', 'info')
    .attr('x', 650)
    .attr('y', 548)
    .text('Made by Venom Cocytus')

    var hint = d3.select('svg')
    .append('text')
    .attr('class', 'info')
    .style('font-size', 17)
    .attr('transform', 'rotate(-90)')
    .attr('x', -325)
    .attr('y', 20)
    .text('Times in minutes')

}

//Draw Scatter-plot
function drawGraph(){

    //Create a tooltip
    var tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('class', 'tooltip');


    svg.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('class', 'dot')
       .attr('data-xvalue', (d) => {
        return d.Year;
       })
       .attr('data-yvalue', (d) => {
        return new Date(d.Seconds * 1000);
       })
       .attr('fill', (d) => {

            if(d.Doping != ''){
                return 'red';
            }else{
                return 'orange';
            }
            
       })
       .attr('cx', (d) => {
        return xScale(d.Year);
       })
       .attr('cy', (d) => {
        return yScale(d.Seconds * 1000);
       })
       .attr('r', '3')
       .attr('stroke', 'black')
       .on('mouseover', (d, i) => {

            tooltip.transition()
                    .duration(200)
                    .attr('data-year', d.Year)
                    .style('opacity', 0.6);

            //Description of the content
            tooltip.html("" + "Year: " + d.Year + "<br/><br/>" +
                "<strong>Time: </strong>" + d.Time + "<br/><br/>" +
                "<strong>Name: </strong>" + d.Name + "<br/><br/>" +
                "<strong>Nationanlity: </strong>" + d.Nationality + "<br/><br/>" +
                "<br/>" + "<small>" + d.Doping + "</small>" + "<br/>");

            tooltip.style("left", (d3.event.pageX+10) + 'px')
                   .style("top", (d3.event.pageY-30) + 'px');

            // Alternative method to set an attribute with the query selector
            // document.querySelector('#tooltip').setAttribute('data-year', d.Year);
       })
       .on('mouseout', (d, i) => {
            tooltip.transition(100)
                   .style('opacity', 0);
       })
       
}

//Main
request.open(method, url, true);
request.onload = function(){
    data = JSON.parse(request.responseText);
    
    //Calling Function
    drawCanvas();
    generateScale();
    generateAxis();
    drawGraph();
    drawHint();
}
request.send();