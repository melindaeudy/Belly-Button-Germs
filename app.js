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
    idpick.html("");
    };

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
        });
        var indiv = data.sameples.filter(sample => sample.id == id)[0];
        var otuIds = [];
        var otuLabels = [];
        var sampleValues = [];

        Object.defineProperties(indiv).forEach(([key, value]) => {
            switch (key) {
                case "otu_ids":
                    otuIds.push(value);
                    break;
                case "sample_values":
                    sampleValues.push(value);
                    break;
                case "otu_labels":
                    otuLabels.push(value);
                    break;
                default:
                    break;
            };
        });
        var topotuIds = otuIds[0].slice(0,10).reverse();
        var topotuLabels = otuLabels[0].slice(0,10).reverse();
        var topsampleValues = sampleValues[0].slice(0,10).reverse();
        var topotuIdsFormatted = topotuIds.map(otuIds => "OTU" + otuIds);

        var trace = {
            x: topsampleValues,
            y: topotuIdsFormatted,
            text: topotuLabels,
            type: "bar",
            orientation: "h",
        };
        var data = [trace];
        var layout = {
            height: 500,
            width: 600,
            title: "Top 10 OTU's", 
        }
        Plotly.newPlot("bar", dataBar, layoutBar);
    }
    ))};