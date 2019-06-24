$(document).ready(() => {
    //create dimensions needed for svg. NB: (0,0) is top-left.
    var margin = { top:0, left: 5, right: 5, bottom: 0};
    var height = 500 - margin.top - margin.bottom;
    var width = 500 - margin.left - margin.right;

    //create svg for map:
    var svg = d3.select("#map-area")
            .append("svg")
            .attr("height", (height + margin.top + margin.bottom))
            .attr("width", (width + margin.left + margin.right))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var imgs = svg.selectAll("image")
            .data([0]);
            imgs.enter()
            .append("svg:image")
            .attr("xlink:href", "/cam_map_street_image.PNG")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", width)
            .attr("height", height);

    //Read in map cambridge.topojson (compressed geojson)
    d3.queue()
        .defer(d3.json, "map_cam_street.topojson") //map
        .defer(d3.json, "map_puzzle_data.json") //points to plot
        .await(makeMap)

    //Create projection using geoMercator
    var projection = d3.geoMercator()
                    .scale(51310*12) //zoom in (scale)
                    .translate([-1250, (55010*12)+8]) //center it (translate)
                    //visible at  w/4, h+53500, scale 50k
                    
    //create path (geoPath) using projection
    var path = d3.geoPath()
            .projection(projection);

    function makeMap (error, mapdata, plotpoints) {
        //console.log(mapdata);

        //Use topojson.feature to get useable geodata
        //form = data.objects.propfield then get .features out from this:
        var cambridge_str_map = topojson.feature(mapdata, mapdata.objects.collection).features;
        //console.log(cambridge_str_map);

        //add path for each segment/geometries = shapes -> add path
        svg.selectAll(".cambridge-streetarea")
            .data(cambridge_str_map)
            .enter()
            .append("path") //add path for each bounded area
            .attr("class", "cambridge-streetarea")
            .attr("d",path) //use projection via path
            //add hover:
            // .on('mouseover', function(d) {
            //     d3.select(this).classed("selected", true); //add class
            // })
            // .on('mouseout', function(d) {
            //     d3.select(this).classed("selected", false); //remove class
            // })

        svg.selectAll('.car-plot')
            .data(plotpoints)
            .enter()
            .append('circle')
            .attr("r", 2)
            .attr("cx", (d) => {
                let coords = projection([d.long, d.lat]);
                //console.log(coords);
                return coords[0];
            })
            .attr("cy", (d) => {
                let coords = projection([d.long, d.lat]);
                return coords[1];
            })
            .each(function(d) { 
                let carActions = d.action;
                dataClass = createPlotClass('action', carActions); //colour each point depending on action type
                d3.select(this).classed(dataClass, true)
            })

                //svg.selectAll //add tooltip with details on hover of point
                let maxLong = d3.max(plotpoints, (d) => d.long);
                console.log('max long= ' + maxLong);
                let minLong = d3.min(plotpoints, (d) => d.long);
                console.log('min long= ' + minLong);
                let maxLat = d3.max(plotpoints, (d) => d.lat);
                console.log('max lat= ' + maxLat);
                let minLat = d3.min(plotpoints, (d) => d.lat);
                console.log('min lat= ' + minLat);

            

        //Add Zoom and Pan functionality
        svg.call(d3.zoom()
                    .scaleExtent([1, 20])
                    .on("zoom", function () { //zoom functionality
                        svg.attr("transform", d3.event.transform);
                }));

        if(error){
            console.log(error);
            throw(error);
        }
    }

    function createPlotClass(plotType, dataAttr){
        //Function takes a plot type (action or reason)
        //And a data attribute type (see puzzle json data)
        //Builds a class and returns it.
        let builtClass = '';
        builtClass = plotType + '-' + $.trim(dataAttr.toLowerCase());
        return builtClass;
    }

    function getPlotType() {
        $('.')
    }

});
