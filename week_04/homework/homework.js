const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 }); // dimensions 
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); // inserting a svg into the html 

d3.csv('long-term-interest-canada.csv').then(data => {
    
    let timeParse = d3.timeParse("%Y-%m"); // parsing the date in the format Year-Month 

    for (let d of data){
        d.Num = +d.Num; // Converting the interest rate into a number 
        d.Month = timeParse(d.Month); // Finish parsing 
    }

    let x = d3.scaleTime() // using scale time for the x axis since we are represebting months 
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear() // using scale linear for the y axis since we are representing interest rates - continuous variable 
        .domain([0, d3.max(data, d => d.Num)])
        .range([height - margin.bottom, margin.top]); // built from top down 
    
    svg.append("g") // adding the x axis to the graph along with the necessary transformations and translations 
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
    
    svg.append("g") // adding the y axis to the graph along with the necessary transformations and translations 
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));

    svg.append("text") // adding the x axis label 
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    svg.append("text") // adding the y axis label 
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");


    let line = d3.line() // building out the line graph 
        .x(d => x(d.Month))
        .y(d => y(d.Num));
    
    
    svg.append("path") // connecting the path on the line graph 
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "purple");
  });