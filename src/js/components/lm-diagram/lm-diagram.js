/**
 * My diagram web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

const GRAPH_URL = (new URL('./images/graph.png', import.meta.url)).href

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
 </style>

 <div>
    <canvas id="barChart"></canvas>
    <canvas id="graph">
        <img id="imgGraph">
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
     #barChart
     #graph
     #boxPlot
     #histogram

    /**
     * The images.
     *
     * @type {Image}
     */
    #imgGraph

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
      this.#barChart = this.shadowRoot.querySelector('#barChart')
      this.#graph = this.shadowRoot.querySelector('#graph')
      this.#boxPlot = this.shadowRoot.querySelector('#boxPlot')
      this.#histogram = this.shadowRoot.querySelector('#histogram')
      this.#imgGraph = this.shadowRoot.querySelector('#imgGraph')

      this.descriptiveStatistics = {}
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#drawGraph()
    }

     /**
      * Adds the statistics to the variable.
      *
      * @param {object} Summary - The input object of statistics.
      */
     #inputSummaryData (Summary) {
      this.descriptiveStatistics = Summary
    }

     /**
      * Draws the graph.
      *
      */
     #drawGraph () {
       const ctx = this.#graph.getContext('2d')
       this.#imgGraph.addEventListener('load', (event) => {
         ctx.drawImage(this.#imgGraph, 0, 0)
         ctx.beginPath()
         ctx.moveTo(30, 96)
         ctx.lineTo(70, 66)
         ctx.lineTo(103, 76)
         ctx.lineTo(170, 15)
         ctx.stroke()
         event.stopPropagation()
         event.preventDefault()
       })
       this.#imgGraph.src = `${GRAPH_URL}`
     }
  }
)
