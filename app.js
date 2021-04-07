var demoTable = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");
var guageChart = d3.select("guage");
var idpick = d3.select("#selDataset");

// Dropdown Charts created from JSON sample data
function init() {
    resetData();
    d3.json("data/samples.json").then((data => {
        data.names.forEach((nane => {
            var option = idSelect.append("option");
            option.text(name);
        }));
    var initID = IdSelect.property("value");
    plotCharts(initID);
    }));
}

function resetData() {
    demoTable.html("");
    barChart.html("");
    bubbleChart.html("");
    guageChart.html("");
};

//Create bar chart of samples
function plotCharts(id) {
    d3.json("data/samples.json").then((data => {
        var indiv = data.metadata.filter(participant => participant.id == id)[0];
        var wfreq = indiv.wfreq;
        Object.defineProperties(indiv).forEach(([key,value]) => {
            var newList = demoTable.append("ul");
            newList.attr("class", "list-group list-group-flush");

            var listItem = newList.append("li");
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");
            listItem.text(`${key}: $(value)`);
            console.log(listItem);
        })
    }))
}




// //Create bar chart of samples
//const id_sample = data.samples.filter(item => parseInt(item.id) == selectedID);
// // 2. Use filter() to pass the function as its argument

// var filteredMovies = topMovies.filter(filterMovieRatings);

// //  Check to make sure your are filtering your movies.

// console.log(filteredMovies);

// // 3. Use the map method with the arrow function to return all the filtered movie titles.

// var titles = filteredMovies.map(movies => movies.title);

// //  Check your filtered movie titles.

// console.log(titles);

// // 4. Use the map method with the arrow function to return all the filtered movie metascores.

// var ratings = filteredMovies.map(movies => movies.metascore);


// //  Check your filtered movie metascores.

// console.log(ratings);

// // 5. Create your trace.

// var trace = {
//     x: titles,
//     y: ratings,
//     type: "bar"
// };

// // 6. Create the data array for our plot

// var data = [trace];

// // 7. Define our plot layout

// var layout = {
//     title: "The highest critically acclaimed movies",
//     xaxis: {title: "titles"},
//     yaxis: {title: "ratings"}
// };

// // 8. Plot the chart to a div tag with id "bar-plot"

//Plotly.newPlot("bar-plot", data, layout);