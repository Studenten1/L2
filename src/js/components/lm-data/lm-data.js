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
   * Represents a data module.
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

      this.data = []
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
    }

    /**
     * Checks the input and adds it to the data variable.
     *
     * @param {number[]} data - The input array of data.
     */
    inputData (data) {
      if (!Array.isArray(data)) {
        throw new TypeError('The passed argument is not an array.')
      } else if (data.length === 0) {
        throw new Error('The passed array contains no elements.')
      }
      for (let i = 0; i < data.length; i++) {
        if (Number.isNaN(data[i])) {
          throw new TypeError('The passed array may only contain valid numbers.')
        } else if (!(typeof (data[i]) === 'number')) {
          throw new TypeError('The passed array may only contain valid numbers.')
        }
      }
      this.data = data
    }
  }
)
