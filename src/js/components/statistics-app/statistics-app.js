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
      <h1>Welcome to the statistics app!</h1>
      <h3>Start by submitting the data which will be processed into descriptive statistics. <br><br> Please note that the data should be submitted like this:\n 1, 2.45, 0.35, 110, 39 </h3>
      <h2>Submit the data: </h2>
      <input><button>Submit</button>
    </div>
    <div id="startMenu" hidden>
      <form id="form">
        <p>Choose one of the following options:</p>
          <div>
            <input type="radio" id="a" name="choice" checked>
            <label for="a">Get the data sorted from the lowest to the highest value</label>
          </div>
          <div>
            <input type="radio" id="b" name="choice">
            <label for="b">Get the descriptive statistics</label>
          </div>
          <div>
            <input type="radio" id="c" name="choice">
            <label for="c">Get a table of the descriptive statistics</label>
          </div>
          <div>
            <input type="radio" id="d" name="choice">
            <label for="c">Get a box-plot of the descriptive statistics</label>
          </div>
          <div>
            <input type="radio" id="e" name="choice">
            <label for="c">Get a bar chart of the descriptive statistics</label>
          </div>
          <div>
            <button type="submit" id="submit">Submit</button>
          </div>
        </div>
    </form>
    </div>
    <div id="window" hidden>
      <h1></h1>
      <img id="chart">
      <button id="returnButton">Return to the menu</button>
    </div>
    <descriptive-statistics></descriptive-statistics>
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
     #form
     #submit
     #returnButton
     #window
     #startMenu
     #wrapper

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
       this.#statistics = this.shadowRoot.querySelector('descriptive-statistics')
       this.#button = this.shadowRoot.querySelector('button')
       this.#input = this.shadowRoot.querySelector('input')
       this.#form = this.shadowRoot.querySelector('#form')
       this.#submit = this.shadowRoot.querySelector('#submit')
       this.#returnButton = this.shadowRoot.querySelector('#returnButton')
       this.#window = this.shadowRoot.querySelector('#window')
       this.#startMenu = this.shadowRoot.querySelector('#startMenu')
       this.#wrapper = this.shadowRoot.querySelector('#wrapper')
     }

     /**
      * Called after the element is inserted into the DOM.
      */
     connectedCallback () {
       this.#button.addEventListener('click', event => {
         this.#statistics.inputData([this.#input.value])
         this.#wrapper.hidden = true
         this.#startMenu.hidden = false
         event.preventDefault()
         event.stopPropagation()
       })

       this.#submit.addEventListener('click', event => {
         this.#startMenu.hidden = true
         this.#window.hidden = false
         if (this.#form.elements[1].checked === true) {
           const arrayOfSortedData = this.#statistics.getSortedData()
           this.#window.firstElementChild.textContent = arrayOfSortedData
         } else if (this.#form.elements[2].checked === true) {
           const descriptiveStatistics = this.#statistics.getStatistics()
           this.#window.firstElementChild.textContent = descriptiveStatistics
         } else if (this.#form.elements[3].checked === true) {
           const tableUrl = this.#statistics.getTableImgPath()
           this.#window.firstElementChild.textContent = 'This is a table of the descriptive statistics'
           tableUrl.then((value) => {
             this.#chart.src = value
           })
         } else if (this.#form.elements[4].checked === true) {
           const boxPlotUrl = this.#statistics.getBoxPlotImgPath()
           this.#window.firstElementChild.textContent = 'This is a box-plot of the descriptive statistics'
           boxPlotUrl.then((value) => {
             this.#chart.src = value
           })
         } else {
           const barChartUrl = this.#statistics.getBarChartImgPath()
           this.#window.firstElementChild.textContent = 'This is a bar chart of the descriptive statistics'
           barChartUrl.then((value) => {
             this.#chart.src = value
           })
         }
         event.preventDefault()
         event.stopPropagation()
       })

       this.#returnButton.addEventListener('click', event => {
         this.#window.hidden = true
         this.#wrapper.hidden = false
         event.preventDefault()
         event.stopPropagation()
       })
     }
  }
)
