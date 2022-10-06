/**
 * My test-app web component application.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

import '../statistics'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
 </style>

 <div>
    <statistics></statistics>
    <img id="chart">
 </div>
 `

customElements.define('test-app',
  /**
   * Represents the test-app.
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
     #statistics

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
       /* TODO: If you want to use the test-app's methods, call them from here. For example: this.testSortData() */
     }

     /**
      * Tests that an error message is shown when there are no values in the array.
      *
      */
     testErrorMessage () {
       this.#statistics.inputData([])
     }

     /**
      * Tests that the values of the descriptive statistics are correct.
      *
      */
     testStatisticsSummary () {
       this.#statistics.inputData([1, 10, 6, 2, 4, 10])
       const statisticsObject = this.#statistics.getStatistics()
       console.log(statisticsObject)
     }

     /**
      * Tests the public method getSortedData().
      *
      */
     testSortData () {
       this.#statistics.inputData([-10, 1, 6, 0])
       const sortedCopy = this.#statistics.getSortedData()
       console.log(sortedCopy)
     }

     /**
      * Tests that the returned Promise can be resolved into a string.
      *
      */
     testPath () {
       this.#statistics.inputData([4, 1, 1, 6, 10])
       const promise = this.#statistics.getTableImgPath()
       promise.then((value) => {
         console.log(value)
       })
     }

     /**
      * Tests that the drawn table can be shown in an image element.
      *
      */
     testShowTable () {
       this.#statistics.inputData([4, 1, 1, 6, 10])
       const promise = this.#statistics.getTableImgPath()
       promise.then((value) => {
         this.#chart.src = value
       })
     }

     /**
      * Tests that the drawn box plot can be shown in an image element.
      *
      */
     testShowBoxplot () {
       this.#statistics.inputData([4, 1, 1, 6, 10])
       const promise = this.#statistics.getBoxPlotImgPath()
       promise.then((value) => {
         this.#chart.src = value
       })
     }

     /**
      * Tests that the drawn bar chart can be shown in an image element.
      *
      */
     testShowBarchart () {
       this.#statistics.inputData([4, 1, 1, 6, 10])
       const promise = this.#statistics.getBarChartImgPath()
       promise.then((value) => {
         this.#chart.src = value
       })
     }
  }
)
