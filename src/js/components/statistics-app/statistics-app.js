/**
 * My statistics-app web component application.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

import '../statistics'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #wrapper {
    
  }
</style>

<div>
    <div id="wrapper">
      <h1>Welcome to the statistics app!</h3>
      <h3>Start by submitting the data which will be processed into descriptive statistics. Please note that the data should be submitted like this:\n 1, 2.45, 0.35, 110, 39\nThen press the submit-button or press enter</h3>
      <h2>Submit the data: </h2>
      <input id="dataInput"><button>Submit</button>
    </div>
    <statistics></statistics>
    <img id="chart">
</div>
`
customElements.define('statistics-app',
  /**
   * Represents the statistics-app.
   */
  class extends HTMLElement {
    /**
     * The img element.
     *
     * @type {Image}
     */
     #chart

     /**
      * The statistics element.
      *
      * @type {HTMLElement}
      */
     #data

     /**
      * Creates an instance of the current type.
      */
     constructor () {
       super()

       // Attach a shadow DOM tree to this element and
       // append the template to the shadow root.
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

       // Get the elements in the shadow root.
       this.#chart = this.shadowRoot.querySelector('#chart')
       this.#statistics = this.shadowRoot.querySelector('statistics')
     }

     /**
      * Called after the element is inserted into the DOM.
      */
     connectedCallback () {
     }

     
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

     /**
      * Starts the app.
      *
      */
     run () {
       this.#data.inputData([1, 10, 6, 2, 4, 10])
       const statisticsObject = this.#data.getStatistics()
       console.log(statisticsObject)
     }

     /**
      * Tests the public method getSortedData().
      *
      */
     testSortData () {
       this.#data.inputData([-10, 1, 6, 0])
       const sortedCopy = this.#data.getSortedData()
       console.log(sortedCopy)
     }

     /**
      * Tests that the returned Promise can be resolved into a string.
      *
      */
     testPath () {
       this.#data.inputData([4, 1, 1, 6, 10])
       const promise = this.#data.getTableImgPath()
       promise.then((value) => {
         console.log(value)
       })
     }

     /**
      * Tests that the drawn table can be shown in an image element.
      *
      */
     testShowTable () {
       this.#data.inputData([4, 1, 1, 6, 10])
       const promise = this.#data.getTableImgPath()
       promise.then((value) => {
         this.#chart.src = value
       })
     }

     /**
      * Tests that the drawn box plot can be shown in an image element.
      *
      */
     testShowBoxplot () {
       this.#data.inputData([4, 1, 1, 6, 10])
       const promise = this.#data.getBoxPlotImgPath()
       promise.then((value) => {
         this.#chart.src = value
       })
     }

     /**
      * Tests that the drawn bar chart can be shown in an image element.
      *
      */
     testShowBarchart () {
       this.#data.inputData([4, 1, 1, 6, 10])
       const promise = this.#data.getBarChartImgPath()
       promise.then((value) => {
         this.#chart.src = value
       })
     }
  }
)
