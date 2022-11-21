d3.csv("NetflixOriginals.csv").then(data => {
    // Always start by console.logging the data
    console.log("Raw data", data);
  
    // Creating an array to find the highest and lowest rated Netflix Original 
    let outlierData = [
      { highest: "", rating: 0 },
      { lowest: "", rating: 100 },
    ];

    for (let d of data) {
        // find highest and lowest
        if (d.IMDB_Score > outlierData[0].rating) {
          outlierData[0].highest = d.Title;
          outlierData[0].rating = parseInt(d.IMDB_Score);
        } 
        if (d.IMDB_Score < outlierData[1].rating) {
            outlierData[1].lowest = d.Title;
            outlierData[1].rating = parseInt(d.IMDB_Score);
          } 
    }

    // Creating an array with the highest, lowest, and average rated title along with IMDB average
    let highest_name = outlierData[0].highest;
    let highest_string = `Highest rated Netlix Original - ${highest_name}`;
    let lowest_name = outlierData[1].lowest;
    let lowest_string = `Lowest rated Netflix Original - ${lowest_name}`;
    // Netflix and IMDB averages found online
    let averageData = [
        {name: highest_string, rating: outlierData[0].rating},
        {name: "IMDB Average", rating: 6.8},
        {name: "Netflix Average", rating: 6.3},
        {name: lowest_string, rating: outlierData[1].rating},
        {name: "Netflix Average", rating: 6.3},
    ];

    console.log(outlierData);
    console.log(averageData);

    let average_chart = BarChart(averageData, {
        x: d => d.rating,
        y: d => d.name,
        color: "rgb(210, 10, 10)",
        xLabel: "Rating (IMDB) →"
      });

    
    document.getElementById("averageChart").appendChild(average_chart);

    // Creating an array to find the number of higher than average releases in a given year
    let yearData = [
      {year: "2015", count: 0},
      {year: "2016", count: 0},
      {year: "2017", count: 0},
      {year: "2018", count: 0},
      {year: "2019", count: 0},
      {year: "2020", count: 0},
      {year: "2021", count: 0},
    ];

    for (let d of data) {
      const release_date = d.Premiere.split('-');
      
      if (release_date[2] === "15" && d.IMDB_Score > 6.8) {
        yearData[0].count += 1;
      }
      if (release_date[2] === "16" && d.IMDB_Score > 6.8) {
        yearData[1].count += 1;
      }
      if (release_date[2] === "17" && d.IMDB_Score > 6.8) {
        yearData[2].count += 1;
      }
      if (release_date[2] === "18" && d.IMDB_Score > 6.8) {
        yearData[3].count += 1;
      }
      if (release_date[2] === "19" && d.IMDB_Score > 6.8) {
        yearData[4].count += 1;
      }
      if (release_date[2] === "20" && d.IMDB_Score > 6.8) {
        yearData[5].count += 1;
      }
      if (release_date[2] === "21" && d.IMDB_Score > 6.8) {
        yearData[6].count += 1;
      }

    }

    console.log(yearData);

    let year_chart = BubbleChart(yearData, {
      label: d => d.year,
      value: d => d.count,
      group: d => d.year,
      title: d => `${d.count.toLocaleString("en")} Above Average Releases`,
      stroke: "rgb(210, 10, 10)"
    })

    document.getElementById("yearChart").appendChild(year_chart);

    // Creating an array with runtimes and ratings
    let timeData = [];

    for (let d of data) {
      timeData.push({runtime: (Math.round(parseInt(d.Runtime)/10)*10), rating: d.IMDB_Score});
    }

    console.log(timeData);

    let time_chart = BoxPlot(timeData, {
      x: d => d.runtime,
      y: d => d.rating,
      xLabel: "Runtime (Minutes) →",
      yLabel: "↑ Rating (IMDB)",
      fill: "rgb(210, 10, 10)",
      yDomain: [2,9]
    })

    document.getElementById("timeChart").appendChild(time_chart);

    //Creating an array for documentary content, their runtime, and ratings
    let documentaryData = [];

    for (let d of data) {
      if (d.Genre === "Documentary"){
        documentaryData.push(d);
      }
    }

    for (item of documentaryData){
      if (item.IMDB_Score >= 5 && item.IMDB_Score <= 8.5) {
        item.Title = "";
      }
    }

    console.log(documentaryData);
    ymean = d3.mean(documentaryData, function(d) { return d.IMDB_Score; }); 
    console.log(ymean);

    let documentary_chart = Scatterplot(documentaryData, {
      x: d => d.Runtime,
      y: d => d.IMDB_Score,
      title: d => d.Title,
      xLabel: "Runtime (Minutes) →",
      yLabel: "↑ Rating (IMDB)",
      stroke: "rgb(210, 10, 10)",
      fill: "rgb(210, 10, 10)",
      xDomain: [10,150],
      yDomain: [0,9]
    })

    document.getElementById("documentaryChart").appendChild(documentary_chart);

    //Creating an array for films offered in foreign languages
    let foreignData = [];

    for (let d of data) {
      if (d.Language != "English"){
        foreignData.push(d);
      }
    }

    console.log(foreignData);
    ymean = d3.mean(foreignData, function(d) { return d.IMDB_Score; }); 
    console.log(ymean);

    let foreign_chart = BeeswarmChart(foreignData, {
      x: d => d.IMDB_Score,
      label: "Rating (IMDB) →",
      xDomain: [0,10],
      group: d => d.IMDB_Score
    })

    document.getElementById("foreignChart").appendChild(foreign_chart);
  
    let sourceHTML = `<p>Data Source: <a href="https://www.kaggle.com/datasets/luiscorter/netflix-original-films-imdb-scores?resource=download">Netflix Kaggle Data</a></p>`;
    d3.selectAll(".chart")
      .append("div")
      .html(sourceHTML);
  });