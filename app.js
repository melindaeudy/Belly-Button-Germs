

// Cerate function for the event change
function optionChanged(pickID) {
    getidPlot(pickID);
    getidInfo(pickID);
};

// Create function to grab information from JSON file
function init(){
    var dropdown = d3.select("#selDataset");
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        data.names.forEach(function(nameid){
            dropdown.append("option").text(nameid).property("value");
        });
        
        getidPlot(data.names[0]);
        getidInfo(data.names[0]);
    });
} 

init();


// Create tables for website - bar, demographic and guage chart
function getidPlot(id) {
    d3.json("data/samples.json").then((data) => {
        console.log(data);   
    var wfreq = data.metadata.map(d => d.wfreq);
    var samples = data.samples.filter(item =>  item.id.toString() === id)[0];
    var sampleValue = (samples.sample_values.slice(0,10).reverse());
    var otuID = (samples.otu_ids.slice(0,10).reverse());
    var otuLabels = samples.otu_labels.slice(0,10);

    var otuID = otuID.map(item => "OTU" + " " + item);

    var trace = {
        y: otuID,
        x: sampleValue,
        type: "bar",
        orientation: "h",
        text: otuLabels
    };

    var data = [trace];

    var layout = {
        title: "Top 10 Operational Taxonomic Units",
        xaxis: {title: "Number of Samples Collected"},
        yaxis: {title: "OTU ID"},
    };

    Plotly.newPlot("bar", data, layout, {responsive: true});


    var trace1 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        text: {
            size: 40,
        },
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids
        },
        text: samples.otu_labels
    }

    var data1 = [trace1];

    var layout1 = {
        title: "Bubble Chart of Samples",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Number of Samples Collected"},
        height: 600,
        width: 1200
    };

    Plotly.newPlot("bubble", data1, layout1, {responsive: true});

    if (wfreq == null){
        wfrq = 0;
    }
    //console.log(wfreq);

    var data2 = [{
        domain: { x:[0,1], y:[0,1]},
        marker: {size:28, color: "850000"},
        value: wfreq,
        title: {text: "<b>Belly Button Washing Frequency </b><br> (Scrubs per Week)"},
        type: "indicator",
        mode: "number+gauge",
        guage: {
            axis: {visible: true, range: [0,9]},
            steps : [
                {range: [0,1], color: "#e5d5d0"},
                {range: [1,2], color: "#dvbc7c2"},
                {range: [2,3], color: "#d2b9b4"},
                {range: [3,4], color: "#c9ada7"},
                {range: [4,5], color: "#ac9899"},
                {range: [5,6], color: "#8a7e88"},
                {range: [6,7], color: "#7d7482"},
                {range: [7,8], color: "#706a7b"},
                {range: [8,9], color: "#4a4e69"}
            ],
        }
    }];

    var layout2 = {
        width: 525,
        height: 400,
        margin: {t: 0, b: 0, l: 100, r:100},
        line: {color: "6000000"}
    };

    Plotly.newPlot("gauge", data2, layout2);


    });
};

function getidInfo(id) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        //console.log(metadata);
        var results = metadata.filter(meta => meta.id.toString() === id)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        Object.entries(results).forEach((key) => {
            demoInfo.append("h5").text(key[0] + ": " + key[1]);
        });

    });
};
