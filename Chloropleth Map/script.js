//Declaration of variable

//fetch Data from API
countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
educationDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
method = 'GET';
countyXMLRequest = new XMLHttpRequest();
dataXMLRequest = new XMLHttpRequest();

//Store Data
var countiesData;
var educationData;

//Canvas Dimensions
canvasDimension = {
    width : 1000,
    height : 630
}

//Legend Dimensions
legendDimension = {
    width: 170,
    height: 325
}

//Create Canvas
var canvas = d3.select('#canvas')

//Create tooltip
var tooltip = d3.select('body')
                .append('div')
                .attr('id', 'tooltip')
                .attr('class', 'tooltip')

//Draw Canvas
function drawCanvas() {

    canvas.attr('width', canvasDimension.width)
          .attr('height', canvasDimension.height)
}

//Draw Countries
function drawCounties() { 

    canvas.append('g')
          .attr('class', 'counties')
          .selectAll('path')
          .data(countiesData)
          .enter()
          .append('path')
          .attr('d', d3.geoPath())
          .attr('class', 'county')
          .attr('data-fips',(d) => {
            return d.id;
          })
          .attr('data-education',(d) => {
            var countyId = d.id;
            var county = educationData.find((d) => {
                return countyId === d.fips
            });
            return county.bachelorsOrHigher;
          })
          .attr('fill', (d) => {

            var countyId = d.id;
            var county = educationData.find((d) => {
                return countyId === d.fips;
            });
            var ratio = county.bachelorsOrHigher;
            

            if(ratio <= 3) {
                return '#330000';
            } else if(ratio <= 12) {
                return '#CC0000'
            } else if(ratio <= 21) {
                return '#6666FF'
            } else if(ratio <= 30) {
                return 'red';
            } else if(ratio <= 39) {
                return '#00CCCC';
            } else if(ratio <= 45){
                return '#CC0066'
            } else if(ratio <= 57){
                return '#CC6600'
            } else {
                return '#CCCC00'
            }
          })
          .on('mouseover', (d, i) => {
            tooltip.transition()
                   .duration(200)
                   .style('opacity', 0.9);

            var countyId = d.id;
            var county = educationData.find((item) => {
                return countyId === item.fips;
            });

            tooltip.html("" + "Fips: " + county.fips + "<br/>" 
                        + county.area_name + ", " + county.state + ": " + "<br/>"
                        + "Percentage: " + county.bachelorsOrHigher + "%");

            tooltip.style('left', (d3.event.pageX + 10) + 'px')
                   .style('top', (d3.event.pageY - 30) + 'px');

            tooltip.attr('data-education', county.bachelorsOrHigher);

          })
          .on('mouseout', (d, i) => {
            tooltip.transition()
                   .duration(50)
                   .style('opacity', 0);
          });
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
          .attr('fill', '#330000');
          
    legend.append('text')
          .attr('x', 60)
          .attr('y', 20)
          .attr('fill', 'white')
          .text('Less than 3%')
          .attr('class', 'legendText');

    legend.append('g')
          .append('rect')
          .attr('class', 'legendCell')
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
          .attr('class', 'legendCell')
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
          .attr('class', 'legendCell')
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
          .attr('class', 'legendCell')
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
          .attr('class', 'legendCell')
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
          .attr('class', 'legendCell')
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
          .attr('class', 'legendCell')
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


//Main

    //Fetching JSON Data Method 01
// countyXMLRequest.open(method, countyUrl, true);
// countyXMLRequest.onload = function() {

//     let countyData = JSON.parse(countyXMLRequest.responseText);
//     console.log(countyData);

//     dataXMLRequest.open(method, educationDataUrl, true);
//     dataXMLRequest.onload = function() {

//     let educationData = JSON.parse(dataXMLRequest.responseText);
//     console.log(educationData);
//     console.log(d3);
//     console.log(topojson);

//     //Calling function
//     drawCanvas();
//     drawCounties();
//     };
//     dataXMLRequest.send();
// };
// countyXMLRequest.send();

    //Fetching JSON Data Method 02
d3.json(countyUrl).then(
    (data, error) => {
        if(error){
            console.log(error);
        } else {
            countiesData = topojson.feature(data, data.objects.counties).features;
            console.log('County Data')
            console.log(countiesData);

            d3.json(educationDataUrl).then(
                (data, error) => {
                    if(error) {
                        console.log(error);
                    } else {
                        educationData = data;
                        console.log('Education Data')
                        console.log(educationData);

                        //Calling function
                        drawCanvas();
                        drawCounties();
                        drawLegend();
                    }
                }
            )
        }
    }
)