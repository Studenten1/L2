/**
 * My data web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

import '../lm-diagram'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
 </style>

 <div>
   <lm-diagram></lm-diagram>
 </div>
 `

customElements.define('lm-data',
  /**
   * Represents the data.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.originalData = []
      this.sortedData = []
      this.average = 0
      this.maximum = 0
      this.minimum = 0
      this.median = 0
      this.range = 0
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#sortData()
    }

    /**
     * Checks the input and adds it to the data variable.
     *
     * @param {number[]} originalData - The input array of data.
     */
    inputData (originalData) {
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
      this.originalData = originalData
    }

    /**
     * Creates a sorted copy of the original array.
     *
     */
    #sortData () {
      const sortedCopy = this.originalData.slice()
      sortedCopy.sort((a, b) => a - b)
      console.log(sortedCopy)
      this.sortedData = sortedCopy
    }

    /**
     * Sets the average value of the data.
     *
     */
    #setAverage () {
      const total = this.sortedData.reduce((x, y) => x + y)
      const average = (total / this.sortedData.length)
      this.average = average
    }

    /**
     * Sets the maximum value of the data.
     *
     */
    #setMaximum () {
      const max = this.sortedData[(this.sortedData.length - 1)]
      this.maximum = max
    }

    /**
     * Sets the minimum value of the data.
     *
     */
    #setMinimum () {
      const min = this.sortedData[0]
      this.minimum = min
    }

    /**
     * Sets the range of the data.
     *
     */
    #setRange () {
      this.range = (this.sortedData[(this.sortedData.length - 1)] - this.sortedData[0])
    }
  }
)
