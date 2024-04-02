In this project, I developed an interactive dashboard to explore the Belly Button Biodiversity DataSet.

## Features

The dashboard provides the following features:

1. **Dropdown Menu**: A dropdown menu to select the Test Subject ID No. This updates all the charts and metadata on the page.

2. **Horizontal Bar Chart**: A horizontal bar chart that displays the top 10 OTUs found in the individual.

3. **Bubble Chart**: A bubble chart that displays each sample, where each marker represents an OTU. The marker size reflects the sample values.

4. **Sample Metadata**: A display of each key-value pair from the metadata JSON object.

## Technologies Used

- **D3.js**: Used to read in `samples.json` from the provided URL and manipulate the DOM.
- **Plotly.js**: Used to create the horizontal bar chart and the bubble chart.
- **JavaScript**: Used to write the functions to build the charts and display the metadata.
