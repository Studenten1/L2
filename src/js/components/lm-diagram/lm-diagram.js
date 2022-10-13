/**
 * My diagram web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

const NR_OF_VALUETYPES = 7

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
   div {
      margin: 0 auto;
   }
 </style>

 <div>
    <canvas id="table" width=400 height=400 hidden></canvas>
    <canvas id="boxPlot" width=600 height=600 hidden></canvas>
    <canvas id="barchart" width=600 height=600 hidden></canvas>
 </div>
 `

customElements.define('lm-diagram',
  /**
   * Represents the diagram.
   */
  class Diagram extends HTMLElement {
    /**
     * The canvas elements.
     *
     * @type {HTMLElement}
     */
     #table
     #boxPlot
     #barchart

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
       this.#table = this.shadowRoot.querySelector('#table')
       this.#boxPlot = this.shadowRoot.querySelector('#boxPlot')
       this.#barchart = this.shadowRoot.querySelector('#barchart')

       this.descriptiveStatistics = {}
       this.sortedData = []
     }

     /**
      * Called after the element is inserted into the DOM.
      */
     connectedCallback () {
     }

     /**
      * Adds the statistics to the variable.
      *
      * @param {object} Summary - The input object of statistics.
      */
     inputSummaryData (Summary) {
       this.descriptiveStatistics = Summary
     }

     /**
      * Sets the local variable.
      *
      * @param {number[]} array - The sorted data set.
      */
     setSortedData (array) {
       this.sortedData = array
     }

     /**
      * Draws the table.
      *
      */
     drawTable () {
       const c = this.#table.getContext('2d')
       c.rect(0, 0, 300, 220)
       c.stroke()

       c.beginPath()
       c.moveTo(150, 28)
       c.lineTo(150, 220)
       c.stroke()

       c.font = 'bold 16px serif'
       c.fillText('Descriptive statistics', 80, 20)

       for (let i = 0; i < NR_OF_VALUETYPES; i++) {
         const y = (28 * i) + 28
         const column = y + 20

         let title = Object.keys(this.descriptiveStatistics)[i]
         if (title === 'standardDeviation') {
           title = 'standard deviation'
         }

         c.font = '14px serif'
         c.fillText(`${title}`, 10, column)
         c.fillText(`${Object.values(this.descriptiveStatistics)[i]}`, 160, column)
         c.beginPath()
         c.moveTo(0, y)
         c.lineTo(300, y)
         c.stroke()
       }
     }

     /**
      * Returns the URL to the table image.
      *
      * @returns {Promise} - The path to the table image.
      */
     async getTableUrl () {
       const url = this.#table.toDataURL()
       return url
     }

     /**
      * Draws the boxplot.
      *
      */
     drawBox () {
       const c = this.#boxPlot.getContext('2d')

       c.beginPath()
       c.moveTo(100, 20)
       c.lineTo(100, 300)
       c.lineTo(550, 300)
       c.stroke()

       c.font = 'bold 16px serif'
       c.fillText('Box plot', 300, 20)
       c.font = '14px serif'
       c.fillText(`Min: ${this.descriptiveStatistics.minimum}`, 20, 280)
       c.fillText(`Max: ${this.descriptiveStatistics.maximum}`, 20, 78)

       for (let i = 1; i < 11; i++) {
         const y = 50 + (25 * i)
         c.beginPath()
         c.moveTo(90, y)
         c.lineTo(100, y)
         c.stroke()
       }

       let quartileOne
       let quartileThree
       if (this.sortedData.length % 2 === 0) {
         const firstHalf = this.sortedData.slice(0, this.sortedData.length / 2)
         const secondHalf = this.sortedData.slice(this.sortedData.length / 2, this.sortedData.length)
         if (firstHalf.length % 2 === 0) {
           const middle = (firstHalf.length / 2)
           let two = (this.sortedData[middle - 1] + this.sortedData[middle])
           quartileOne = (two / 2)
           two = (this.sortedData[middle * 3 - 1] + this.sortedData[middle * 3])
           quartileThree = (two / 2)
         } else {
           quartileOne = firstHalf[Math.floor(firstHalf.length / 2)]
           quartileThree = secondHalf[Math.floor(secondHalf.length / 2)]
         }
       } else if (this.sortedData.length % 2 === 1) {
         const medianIndex = Math.floor(this.sortedData.length / 2)
         const firstHalf = this.sortedData.slice(0, medianIndex)
         const middle = (firstHalf.length / 2)
         let two = (this.sortedData[middle - 1] + this.sortedData[middle])
         quartileOne = (two / 2)
         two = (this.sortedData[middle * 3 - 1] + this.sortedData[middle * 3])
         quartileThree = (two / 2)
       }

       c.beginPath()
       c.moveTo(315, 78)
       c.lineTo(330, 78)
       c.moveTo(315, 280)
       c.lineTo(330, 280)
       c.moveTo(300, (202 * 0.50) + 78)
       c.lineTo(345, (202 * 0.50) + 78)
       c.moveTo(322, 78)
       c.lineTo(322, (202 * 0.25 + 78))
       c.moveTo(322, (202 * 0.75 + 78))
       c.lineTo(322, 280)
       c.stroke()

       c.rect(300, (202 * 0.25 + 78), 45, (202 * 0.50))
       c.stroke()

       c.fillText(`Q1: ${quartileOne}`, 20, (202 * 0.75 + 78))
       c.fillText(`Q3: ${quartileThree}`, 20, (202 * 0.25 + 78))
       c.fillText(`Median: ${this.descriptiveStatistics.median}`, 20, (202 * 0.50 + 78))
     }

     /**
      * Returns the URL to the boxplot image.
      *
      * @returns {Promise} - The path to the boxplot image.
      */
     async getBoxPlotUrl () {
       const url = this.#boxPlot.toDataURL()
       return url
     }

     /**
      * Draws the bar chart.
      *
      */
     drawBarchart () {
       const c = this.#barchart.getContext('2d')

       c.beginPath()
       c.moveTo(100, 20)
       c.lineTo(100, 300)
       c.lineTo(550, 300)
       c.stroke()

       c.font = 'bold 16px serif'
       c.fillText('Bar chart', 300, 20)

       for (let i = 0; i < 11; i++) {
         const y = 50 + (25 * i)
         c.beginPath()
         c.moveTo(90, y)
         c.lineTo(550, y)
         c.stroke()

         c.font = '14px serif'
         c.fillText(`${i * 10} %`, 50, (300 - i * 25))
       }

       const min = this.descriptiveStatistics.minimum
       const distance = Math.ceil(this.descriptiveStatistics.range / 4)
       c.font = '14px serif'
       c.fillText(`[${min} - ${min + distance}]`, 125, 320)
       c.fillText(`(${min + distance} - ${min + distance * 2}]`, 245, 320)
       c.fillText(`(${min + distance * 2} - ${min + distance * 3}]`, 362, 320)
       c.fillText(`(${min + distance * 3} - ${min + distance * 4}]`, 482, 320)

       for (let i = 1; i < 5; i++) {
         let count = 0
         for (const number of this.sortedData) {
           if (number <= (min + distance * i) && number > (min + distance * (i - 1)) && i > 1) {
             count++
           } else if (number <= (min + distance * i) && number >= (min + distance * (i - 1)) && i === 1) {
             count++
           }
         }
         const percent = count / this.sortedData.length
         c.rect((i * 100 + 20 * i), 300, 50, (-(250 * percent)))
         c.fill()
         c.fillStyle = 'beige'
         c.stroke()
       }
     }

     /**
      * Returns the URL to the bar chart image.
      *
      * @returns {Promise} - The path to the bar chart image.
      */
     async getBarChartUrl () {
       const url = this.#barchart.toDataURL()
       return url
     }
  }
)
