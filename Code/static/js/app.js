// Define the URL for the JSON data
let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


// Use D3 to fetch the JSON data
d3.json(url).then(function(data) {
   // Populate the dropdown menu with the sample names
   let dropdownMenu = d3.select("#selDataset");
   data.names.forEach(name => {
       dropdownMenu.append("option").text(name).property("value", name);
   });


   // Call the function to build the charts and display the metadata with the first sample
   buildCharts(data.names[0]);
   displayMetadata(data.names[0]);


   // Update the charts and metadata when a new sample is selected
   dropdownMenu.on("change", function() {
       buildCharts(this.value);
       displayMetadata(this.value);
   });
});


function buildCharts(sample) {
    d3.json(url).then(function(sampleData) {
        console.log(sampleData);
        // Filter the data for the selected sample
        let filteredSampleData = sampleData.samples.filter(obj => obj.id == sample)[0];
 
        // Sort the data and slice it for the top 10 OTUs
        let otuIds = filteredSampleData.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        let sampleValues = filteredSampleData.sample_values.slice(0, 10).reverse();
        let otuLabels = filteredSampleData.otu_labels.slice(0, 10).reverse();


       // Create the trace for the bar chart
       let trace = {
           x: sampleValues,
           y: otuIds,
           text: otuLabels,
           type: "bar",
           orientation: "h"
       };


       // Create the data array for the plot
       let data = [trace];


       // Define the plot layout
       let layout = {
           title: "Top 10 OTUs Found in Individual",
           xaxis: { title: "Sample Values" },
           yaxis: { title: "OTU IDs" }
       };


       // Plot the chart to a div tag with id "bar"
       Plotly.newPlot("bar", data, layout);


       // Create the trace for the bubble chart
       let traceBubble = {
           x: sampleData.otu_ids,
           y: sampleData.sample_values,
           text: sampleData.otu_labels,
           mode: 'markers',
           marker: {
               size: sampleData.sample_values,
               color: sampleData.otu_ids,
               colorscale: 'Earth'
           }
       };


       // Create the data array for the plot
       let dataBubble = [traceBubble];


       // Define the plot layout
       let layoutBubble = {
           title: 'OTU ID vs Sample Values',
           showlegend: false,
           height: 600,
           width: 1200,
           xaxis: { title: "OTU ID" },
           yaxis: { title: "Sample Values" }
       };


       // Plot the chart to a div tag with id "bubble"
       Plotly.newPlot('bubble', dataBubble, layoutBubble);
   });
}


function displayMetadata(sample) {
   d3.json(url).then(function(sampleData) {
       // Filter the metadata for the selected sample
       let metadata = sampleData.metadata.filter(obj => obj.id == sample)[0];


       // Select the metadata div
       let metadataDiv = d3.select("#sample-metadata");


       // Clear any existing metadata
       metadataDiv.html("");


       // Append each key-value pair to the metadata div
       Object.entries(metadata).forEach(([key, value]) => {
           metadataDiv.append("h5").text(`${key}: ${value}`);
       });
   });
}