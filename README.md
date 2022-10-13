# Info to the user of the statistics-app

You should import the statistics-app component. When it is added to the DOM it will start with the "npm run dev" command. Follow the instructions in the web application, submit the data and then choose the different options for viewing descriptive statistics.

# Info to the app-developer

You should import the statistics-app component. When it is added to the DOM it will start with the "npm run dev" command. The statistics-app component can be found in  [app](./src/js/components/statistics-app/statistics-app.js). The app component is dependent on the descriptive-statistics module. 

# Info to the user of the descriptive-statistics module

You should import the descriptive-statistics component/module. Then there are six public methods which you can use: <br><br>

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

# Info to the module-developer

The descriptive-statistics module is best accessed from the main script file. It can be found in  [start](./src/js/index.js). 
To access the different public methods you can do the following: <br><br>

const module = document.querySelector('descriptive-statistics')<br><br>
try {
  Statistics.inputData([4, 8, 2, 4, 4.5, 5, 8, 10.5, 11.23])

  const result = Statistics.getStatistics()
  console.log(result)

  const sortedValues = Statistics.getSortedData()
  console.log(sortedValues)

  const tablePath = Statistics.getTableImgPath()
  tablePath.then((value) => {
    console.log(value)
  })

  const boxPath = Statistics.getBoxPlotImgPath()
  boxPath.then((value) => {
    console.log(value)
  })

  const barchartPath = Statistics.getBarChartImgPath()
  barchartPath.then((value) => {
    console.log(value)
  })
} catch (e) {
  console.error(e.message)
}

If you want to change anything, go to the descriptive-statistics component. It imports the lm-diagram component that handles everything to do with the diagrams. 



# statistics-app

This is a web application. The user can submit data and then choose an option for viewing the descriptive statistics. 

# Start

Use the "npm i" command and then "npm run dev". 


# descriptive-statistics module

The assignment contains a web component module that handles data input. The module returns the data's descriptive statistics like the average value, median, range, maximum value, etc. Furthermore, the module returns diagrams to add a visual representation of the data. &lt;descriptive-statistics&gt; is an element which holds the &lt;lm-diagram&gt; element. The programmer can access the data module from within the main script file. The methods which are public from the index.js are listed here below. 

# Start

Use the "npm i" command. If debug is needed, write "npm run dev" and view the output of console.log() in the console. The main script file of the module can be found in  [start](./src/js/index.js). 

# Language

The language is english. 

# Dependencies

This module doesn't have any external libraries or dependencies. 

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

