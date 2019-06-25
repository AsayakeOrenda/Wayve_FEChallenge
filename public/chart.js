$(document).ready(() => {
        //create dimensions needed for svg. NB: (0,0) is top-left.
        const margin = { top:0, left: 0, right: 0, bottom: 0};
        const height = 200 - margin.top - margin.bottom;
        const width = 500 - margin.left - margin.right;
        const exampledata = [3, 7, 4, 7, 5, 6, 8, 7];

        //Append to chart area
        const svg = d3.select("#chart-area")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
        
        //Add rects for data points
        svg.selectAll("rect")
                .data(exampledata)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * 50)
                .attr("y", (d, i) => height - 15 * d)
                .attr("width", 35)
                .attr("height", (d, i) => 15 * d)
                .attr("fill", "#0dacc8")

});