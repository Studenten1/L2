# Assignment L1

The assignment contains a web component module that handles data input. The application returns the data's descriptive statistics like the average value, median, range, maximum value, etc. Furthermore, the application returns diagrams to add a visual representation of the data. &lt;lm-data&gt; is an element which holds the &lt;lm-diagram&gt; element. The programmer can access the data module from within the main script file. The methods which are public from the index.js are listed here below. 

# Start

Use the "npm i" command. If debug is needed, write "npm run dev" and view the output of console.log() in the console. The main script file of the module can be found in  "./src/js/index.js". 

# Public methods

## inputData()

This method takes an array of numbers which represents the data set. The method doesn't return any information. 

## getSortedData()

This method returns the sent data array, now sorted from the lowest value to the highest.

## getStatistics()

Returns an object with several descriptive statistics (average, maximum, median, minimum,
mode, range and standard deviation) which have been derived from the data.

## getTableImgPath()

This method returns the path to the table image as a Promise.

## getBoxPlotImgPath()

This method returns the path to the boxplot image as a Promise.

## getBarChartImgPath()

This method returns the path to the bar chart image as a Promise.

