$(document).ready(() => {
        //create dimensions needed for svg. NB: (0,0) is top-left.
        var margin = { top:50, left: 50, right: 50, bottom: 50};
        var height = 500 - margin.top - margin.bottom;
        var width = 500 - margin.left - margin.right;

        //create svg for map:
        var svg = d3.select("#map-area")
                .append("svg")
                .attr("height", (height + margin.top + margin.bottom))
                .attr("width", (width + margin.left + margin.right))
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        //Read in map cambridge.topojson (compressed geojson)
        d3.queue()
            .defer(d3.json, "map_cambridge.topojson") //map
            .defer(d3.json, "map_puzzle_data.json") //points to plot
            .await(makeMap)

        //Create projection using geoMercator
        var projection = d3.geoMercator()
                        .scale(50000*4) //zoom in (scale)
                        .translate([-250, (53640*4)]) //center it (translate)
                        //visible at  w/4, h+53500, scale 50k
                        
        //create path (geoPath) using projection
        var path = d3.geoPath()
                .projection(projection);

        function makeMap (error, mapdata, plotpoints) {
            //console.log(mapdata);

            //Use topojson.feature to get useable geodata
            //form = data.objects.propfield then get .features out from this:
            var cambridge_map = topojson.feature(mapdata, mapdata.objects.E07000008).features;
            //console.log(cambridge_map);

            //add path for each segment/geometries = shapes -> add path
            svg.selectAll(".area-cambridge")
                .data(cambridge_map)
                .enter()
                .append("path") //add path for each bounded area
                .attr("class", "area-cambridge")
                .attr("d",path) //use projection via path
                //add hover:
                .on('mouseover', function(d) {
                    d3.select(this).classed("selected", true); //add class
                })
                .on('mouseout', function(d) {
                    d3.select(this).classed("selected", false); //remove class
                })

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
                    dataClass = createPlotClass('action', carActions);
                    d3.select(this).classed(dataClass, true)})
                // .attr("class", function(d) {
                //     let carActions = d.action;
                //     let carReasons = d.reason;
                //     let c = "car-plot "
                //     //let plotType = getPlotType();
                //     dataClass = '"' + createPlotClass('action', carActions) + '"';
                //     //console.log(dataClass);
                //     c += dataClass
                // //d3.select(this).classed(dataClass, true);
                //     return c;
                // });
                //.attr('class', 'car-plot') //Use this for general map plot
                //.attr("class", function(d) { return d3.select(this).attr("class") + " " + d; })

            //svg.selectAll //add tooltip with details on hover of point
            

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
