/**
 * My statistics-app web component application.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

import '../descriptive-statistics'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #wrapper {
    border: solid grey 2px;
    width: 50vw;
    margin: 0 auto;
  }

  input {
    margin: 0 auto;
    width: 80%;
    height: 20px;
    border: solid black 2px;
    border-radius: 20px;
    padding: 1em;
  }

  h1 {
    text-align: center;
    color: cadetblue;
    width: 100%;
  }

  h2 {
    text-align: center;
    color: cadetblue;
    width: 100%;
    font-weight: bold;
  }

  h3 {
    text-align: center;
    color: black;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 400;
  }

  button {
    text-align: center;
    color: white;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 600;
    font-size: 12px;
    background-color: cadetblue;
    border-color: white;
    border-radius: 10%;
    height: 40px;
    width: 15%;
  }

  button:hover {
    background-color: aliceblue;
    color: cadetblue;
  }
</style>

<div>
    <div id="wrapper">
      <h1>Welcome to the statistics app!</h3>
      <h3>Start by submitting the data which will be processed into descriptive statistics. <br><br> Please note that the data should be submitted like this:\n 1, 2.45, 0.35, 110, 39 </h3>
      <h2>Submit the data: </h2>
      <input><button>Submit</button>
    </div>
    <div id="startMenu" hidden>
      <h1>Welcome to the statistics app!</h3>
      <h3>Start by submitting the data which will be processed into descriptive statistics. <br><br> Please note that the data should be submitted like this:\n 1, 2.45, 0.35, 110, 39 </h3>
      <h2>Submit the data: </h2>
      <input><button>Submit</button>
    </div>
    <descriptive-statistics></descriptive-statistics>
    <img id="chart">
</div>
`
customElements.define('statistics-app',
  /**
   * Represents the statistics-app.
   */
  class extends HTMLElement {
    /**
     * The elements.
     *
     * @type {Image}
     */
     #chart
     #button
     #input

     /**
      * The descriptive-statistics element.
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
       this.#button = this.shadowRoot.querySelector('button')
       this.#input = this.shadowRoot.querySelector('input')
     }

     /**
      * Called after the element is inserted into the DOM.
      */
     connectedCallback () {
       this.#button.addEventListener('click', event => {
         this.#statistics.inputData([this.#input.value])
         event.preventDefault()
         event.stopPropagation()
       })
     }

     /* 
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
     }) */
  }
)
