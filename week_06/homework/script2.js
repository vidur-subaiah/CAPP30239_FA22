/* Bar chart totals by race */

d3.json("police_data.json").then(data => {
    // Always start by console.logging the data
    console.log(data);

    /* Note: if you are matching on a more complex data point
       like race, you can also use the find function in js
       which is more condensed. See below */
    
    let newData = [
        { race: "", count: 0 },
        { race: "Asian", count: 0 },
        { race: "Black", count: 0 },
        { race: "Hispanic", count: 0 },
        { race: "Native", count: 0 },
        { race: "Other", count: 0 },
        { race: "White", count: 0 },
    ];

    for(var d of data) {
         let nd = newData.find(nd => nd.race == d["Race"]);
         nd.count += 1;
    }
    console.log(newData)

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart2")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); 
    
    let x = d3.scaleBand()
        .domain(newData.map(d => d.race)) // Use array from line 8 (newData) and Gender from newData
        .range([margin.left, width - margin.right]) 
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(newData, d => d.count)]).nice() // uses newData as data and Totals from newData
        .range([height - margin.bottom, margin.top]); 
    
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(newData) // Update data to newData
        .join("g")
        .attr("class", "bar");

    bar.append("rect") 
        .attr("fill", "steelblue")
        .attr("x", d => x(d.race)) // Race
        .attr("width", x.bandwidth()) 
        .attr("y", d => y(d.count)) // Counts
        .attr("height", d => y(0) - y(d.count)); // Counts
    
    bar.append('text') 
        .text(d => d.count) // Counts
        .attr('x', d => x(d.race) + (x.bandwidth()/2)) // Gender
        .attr('y', d => y(d.count) - 10) // Counts
        .attr('text-anchor', 'middle')
        .style('fill', 'black');

});