/**
 * My diagram web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

const TABLE_URL = (new URL('./images/table.png', import.meta.url)).href
const NR_OF_VALUETYPES = 7

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
   div {
      margin: o auto;
   }
 </style>

 <div>
    <canvas id="table" width=400 height=400></canvas>
      <img id="imgTable">
    </canvas>
    <canvas id="boxPlot"></canvas>
    <canvas id="histogram"></canvas>
 </div>
 `

customElements.define('lm-diagram',
  /**
   * Represents the diagram.
   */
  class extends HTMLElement {
    /**
     * The canvas elements.
     *
     * @type {HTMLElement}
     */
     #table
     #boxPlot
     #histogram

    /**
     * The images.
     *
     * @type {Image}
     */
    #imgTable

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
      this.#histogram = this.shadowRoot.querySelector('#histogram')
      this.#imgTable = this.shadowRoot.querySelector('#imgTable')

      this.descriptiveStatistics = {}
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
     * Draws the graph.
     *
     */
    drawTable () {
      const c = this.#table.getContext('2d')
      this.#imgTable.addEventListener('load', (event) => {
        c.drawImage(this.#imgTable, 0, 0)
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

        event.stopPropagation()
        event.preventDefault()
      })
      this.#imgTable.src = `${TABLE_URL}`
    }
  }
)
