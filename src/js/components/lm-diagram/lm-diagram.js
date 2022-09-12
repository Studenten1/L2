/**
 * My diagram web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
    #statistics {
        width: 150px;
        height: 150px;
    }
 </style>

 <div>
    <canvas id="statistics"></canvas>
 </div>
 `

customElements.define('lm-diagram',
  /**
   * Represents the diagram.
   */
  class extends HTMLElement {
    /**
     * The canvas element.
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

       // Get the tile element in the shadow root.
       this.#statistics = this.shadowRoot.querySelector('#statistics')

       this.summaryData = []
     }

     /**
     * Called after the element is inserted into the DOM.
     */
     connectedCallback () {
     }

     /**
     * Adds the summary data to the variable.
     *
     * @param {number[]} summaryData - The input array of summary data.
     */
     inputSummaryData (summaryData) {
       this.summaryData = summaryData
     }
  }
)
