/**
 * My statistics web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

import '../lm-diagram'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
   div {
      margin: 0 auto;
   }
 </style>

 <div>
   <lm-diagram></lm-diagram>
 </div>
 `

customElements.define('descriptive-statistics',
  /**
   * Represents the statistics.
   */
  class Statistics extends HTMLElement {
    /**
     * The lm-diagram element.
     *
     * @type {HTMLElement}
     */
    #lmDiagram

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
      this.#lmDiagram = this.shadowRoot.querySelector('lm-diagram')

      this.#originalData = []
      this.#sortedData = []
      this.#average = 0
      this.#maximum = 0
      this.#minimum = 0
      this.#median = 0
      this.#range = 0
      this.#standardDeviation = 0
      this.#modeValue = []
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
    }

    /**
     * Checks the input and adds it to the data variable.
     *
     * @param {number[]} originalData - The input array of data.
     */
    inputData (originalData) {
      this.#checkInput(originalData)
      this.#originalData = originalData
      this.#sortData()
      this.#startSummary()
    }

    /**
     * Checks the input.
     *
     *@param {number[]} originalData - The submitted data.
     */
    #checkInput (originalData) {
      try {
        if (!Array.isArray(originalData)) {
          throw new TypeError('The passed argument is not an array.')
        } else if (originalData.length === 0) {
          throw new Error('The passed array contains no elements.')
        }
        for (let i = 0; i < originalData.length; i++) {
          if (Number.isNaN(originalData[i])) {
            throw new TypeError('The passed array may only contain valid numbers.')
          } else if (!(typeof (originalData[i]) === 'number')) {
            throw new TypeError('The passed array may only contain valid numbers.')
          }
        }
      } catch (e) {
        console.error(e.message)
      }
    }

    /**
     * Calls the methods which compile the data's descriptive statistics.
     *
     */
    #startSummary () {
      this.#setAverage()
      this.#setMaximum()
      this.#setMinimum()
      this.#setRange()
      this.#setStandardDev()
      this.#setModeValue()
      this.#setMedian()
      this.#sendInfo()
    }

    /**
     * Creates a sorted copy of the original array.
     *
     */
    #sortData () {
      const sortedCopy = this.#originalData.slice()
      sortedCopy.sort((a, b) => a - b)
      this.#sortedData = sortedCopy
    }

    /**
     * Sets the average value of the data.
     *
     */
    #setAverage () {
      const total = this.#sortedData.reduce((x, y) => x + y)
      const average = (total / this.#sortedData.length)
      this.#average = average
    }

    /**
     * Sets the maximum value of the data.
     *
     */
    #setMaximum () {
      const max = this.#sortedData[(this.#sortedData.length - 1)]
      this.#maximum = max
    }

    /**
     * Sets the minimum value of the data.
     *
     */
    #setMinimum () {
      const min = this.#sortedData[0]
      this.#minimum = min
    }

    /**
     * Sets the range of the data.
     *
     */
    #setRange () {
      this.#range = (this.#sortedData[(this.#sortedData.length - 1)] - this.#sortedData[0])
    }

    /**
     * Sets the standard deviation of the data.
     *
     */
    #setStandardDev () {
      const output = []
      for (let i = 0; i < this.#sortedData.length; i++) {
        const first = ((this.#sortedData[i] - this.#average) ** 2)
        output[i] = first
      }
      const standard = ((output.reduce((x, y) => x + y)) / this.#sortedData.length) ** 0.5
      this.#standardDeviation = standard
    }

    /**
     * Sets the mode value of the data.
     *
     */
    #setModeValue () {
      const frequencyTable = {}
      let maxFrequency = []
      let modeValues = []

      for (const number of this.#sortedData) {
        if (frequencyTable[number]) {
          frequencyTable[number]++
        } else {
          frequencyTable[number] = 1
        }
      }

      maxFrequency = Object.values(frequencyTable)
        .sort((a, b) => a - b)
        .pop()

      modeValues = Object.keys(frequencyTable)
        .filter(number => frequencyTable[number] === maxFrequency)

      for (let i = 0; i < modeValues.length; i++) {
        this.#modeValue[i] = Number.parseFloat(modeValues[i])
      }
      this.#modeValue.sort((a, b) => a - b)
    }

    /**
     * Sets the median value of the data.
     *
     */
    #setMedian () {
      if (this.#sortedData.length % 2 === 0) {
        const middle = (this.#sortedData.length / 2)
        const two = (this.#sortedData[middle - 1] + this.#sortedData[middle])
        this.#median = (two / 2)
      } else if (this.sortedData.length % 2 === 1) {
        this.#median = this.#sortedData[Math.floor(this.#sortedData.length / 2)]
      }
    }

    /**
     * Sends the modified statistics to the lm-diagram component.
     *
     */
    #sendInfo () {
      const Info = {
        average: Math.round(this.#average * 100) / 100,
        maximum: Math.round(this.#maximum * 100) / 100,
        median: Math.round(this.#median * 100) / 100,
        minimum: Math.round(this.#minimum * 100) / 100,
        mode: this.#modeValue,
        range: Math.round(this.#range * 100) / 100,
        standardDeviation: Math.round(this.#standardDeviation * 100) / 100
      }
      this.#lmDiagram.inputSummaryData(Info)
      this.#lmDiagram.setSortedData(this.#sortedData)
    }

    /**
     * Returns several descriptive statistics (average, maximum, median, minimum,
     * mode, range and standard deviation) from the data.
     *
     * @returns {object} Statistics - An object whose properties correspond to the descriptive statistics from the data set.
     */
    getStatistics () {
      const Statistics = {
        average: this.#average,
        maximum: this.#maximum,
        median: this.#median,
        minimum: this.#minimum,
        mode: this.#modeValue,
        range: this.#range,
        standardDeviation: this.#standardDeviation
      }
      return Statistics
    }

    /**
     * Returns the array with data, now sorted from the lowest value to the highest.
     *
     * @returns {number[]} - the sorted data array of numbers.
     */
    getSortedData () {
      return this.#sortedData
    }

    /**
     * Calls the method drawTable() and returns the image path.
     *
     * @returns {Promise} - the path to the table image.
     */
    async getTableImgPath () {
      let url
      this.#lmDiagram.drawTable()
      await this.#lmDiagram.getTableUrl().then((value) => {
        url = value
      })
      return url
    }

    /**
     * Calls the method drawBox() and returns the image path.
     *
     * @returns {Promise} - the path to the boxplot image.
     */
    async getBoxPlotImgPath () {
      let url
      this.#lmDiagram.drawBox()
      await this.#lmDiagram.getBoxPlotUrl().then((value) => {
        url = value
      })
      return url
    }

    /**
     * Calls the method drawBarchart() and returns the image path.
     *
     * @returns {Promise} url - the path to the bar chart image.
     */
    async getBarChartImgPath () {
      let url
      this.#lmDiagram.drawBarchart()
      await this.#lmDiagram.getBarChartUrl().then((value) => {
        url = value
      })
      return url
    }
  }
)
