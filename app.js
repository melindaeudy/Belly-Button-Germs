

// Cerate function for the event change
function optionChanged(pickID) {
    getidPlot(pickID);
    getidInfo(pickID);
};

// Create function to grab information from JSON file and create dropdown selection 
// Create link to chart functions
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

// Bar chart
function getidPlot(id) {
    d3.json("data/samples.json").then((data) => {
        console.log(data);   
    var samples = data.samples.filter(item =>  item.id.toString() === id)[0];
    var sampleValue = (samples.sample_values.slice(0,10).reverse());
    var otuID = (samples.otu_ids.slice(0,10).reverse());
    var otuLabels = samples.otu_labels.slice(0,10);

    var otuID = otuID.map(item => "OTU" + " " + item);

    console.log(otuID);
    console.log(sampleValue);

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
        // yaxis: {title: "OTU ID"},
    };

    Plotly.newPlot("bar", data, layout, {responsive: true});

// Bubble chart
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
    });
};

// Fill in Demographic Information on chart and Create Gauge
function getidInfo(id) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        //console.log(metadata);
        var results = metadata.filter(meta => meta.id.toString() === id)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        Object.entries(results).forEach((key) => {
            demoInfo.append("p").text(key[0] + ": " + key[1]);
        var wfreq = results.wfreq;
        console.log(wfreq);

// Gauge Chart
    var data2 = [
        {
        domain: { x: [0,1], y: [0,1]},
        value: wfreq,
        title: {text: "<b>Belly Button Washing Frequency </b><br> (Scrubs per Week)"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 9]},
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                {range: [0,1], color: "rgb(248, 243, 236)"},
                {range: [1,2], color: "rgb(238, 239, 228)"},
                {range: [2,3], color: "rgb(233, 230, 202)"},
                {range: [3,4], color: "rgb(218, 231, 179)"},
                {range: [4,5], color: "rgb(213, 228, 157)"},
                {range: [5,6], color: "rgb(183, 204, 146)"},
                {range: [6,7], color: "rgb(140, 191, 136)"},
                {range: [7,8], color: "rgb(138, 187, 143)"},
                {range: [8,9], color: "rgb(133, 180, 138)"},
            ],
        }
    }];

    var layout2 = {
        width: 525,
        height: 400,
        margin: {t: 0, b: 0, l: 100, r:100}
    };

    Plotly.newPlot("gauge", data2, layout2, {responsive: true});
    });
    });
};


