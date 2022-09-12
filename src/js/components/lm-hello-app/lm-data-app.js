/**
 * My data app web component module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
 <style>
    #board {
      margin: 0 auto;
      max-width: 40%;
      height: fit-content;
      border: solid black 4px;
      border-radius: 20px;
      padding: 1.2em;
    }

    h1 {
      text-align: center;
      color: cadetblue;
      width: 100%;
    }

    button {
      background-color: white;
      border: solid black 2px;
      margin-left: 80%;
      height: 50px;
      width: 50px;
      border-radius: 20px;
      font-weight: bold;
    }

    button:hover {
      background-color: lightgray;
    }

    #helloMessage {
      font-family: Book Antiqua;
      font-size: 1.2rem;
      max-width: 50%;
      margin-left: 30%;
      overflow-wrap: break-word;
    }

    #poems {
      color: black;
      max-width: 50%;
      margin-left: 30%;
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-style: italic;
      white-space: pre;
      text-align: left;
    }

    #topicImage {
      max-width: 20%;
      justify-content: left;
      float: left;
    }

    #wrapper {
      text-align: center;
    }

    #wrapper #inputName {
      height: 20px;
      font-size: 1.2em;
    }

    h2 {
      text-align: center;
      color: cadetblue;
      border-radius: 10px;
    }

    #author {
      text-align: right;
      color: cadetblue;
      font-weight: bold;
    }

    #title {
      text-align: left;
      color: cadetblue;
      font-weight: bold;
      max-width: 50%;
      margin-left: 30%;
      overflow-wrap: break-word;
    }

    p {
      font-size: 1.4em;
    }

 </style>
 
  <template id="nameTemplate">
    <div id="wrapper">
      <h2>Welcome to the hello app! <br> Please enter your name: </h2>
      <input id="inputName"><button>Submit</button>
    </div>
  </template>
  <template id="topicTemplate">
    <form id="form">
        <p>Choose a topic for the poem:</p>
          <div>
            <input type="radio" id="a" name="choice" checked>
            <label for="a">Dog</label>
          </div>
          <div>
            <input type="radio" id="b" name="choice">
            <label for="b">Water</label>
          </div>
          <div>
            <input type="radio" id="c" name="choice">
            <label for="c">Butterfly</label>
          </div>
          <div>
            <input type="radio" id="d" name="choice">
            <label for="d">Crow</label>
          </div>
          <div>
            <button type="submit" id="submit">Submit</button>
          </div>
      </form>
    </template>
  <template id="helloTemplate">
    <p id="helloMessage"></p>
    <p id="title"></p>
    <img id="topicImage" src="${IMG_URLS[0]}" alt="A topic">
    <p id="poems"></p>
    <p id="author"></p>
  </template>
  <div id="board">
  </div>
 `

customElements.define('lm-hello-app',
  /**
   * Represents a hello app.
   */
  class extends HTMLElement {
    /**
     * The div elements.
     *
     * @type {HTMLDivElement}
     */
    #board

    /**
     * The templates.
     *
     * @type {HTMLTemplateElement}
     */
    #helloTemplate
    #nameTemplate
    #topicTemplate

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
      this.#nameTemplate = this.shadowRoot.querySelector('#nameTemplate')
      this.#helloTemplate = this.shadowRoot.querySelector('#helloTemplate')
      this.#topicTemplate = this.shadowRoot.querySelector('#topicTemplate')
      this.#board = this.shadowRoot.querySelector('#board')

      this.nickname = ''
      this.choiceIndex = 0
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.handleNickname()
    }

    /**
     * Adds the topic template.
     */
    addtopicTemplate () {
      const topicTemplate = this.#topicTemplate.content.cloneNode(true)
      this.#board.appendChild(topicTemplate)
      this.#board.querySelector('#submit').addEventListener('click', event => {
        for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
          if (this.#board.querySelector('#form').elements[i].checked) {
            this.choiceIndex = i
          }
        }
        while (this.#board.firstChild) {
          this.#board.removeChild(this.#board.firstChild)
        }
        this.addHelloTemplate()
        event.preventDefault()
        event.stopPropagation()
      })
    }

    /**
     * Adds the hello template.
     *
     */
    addHelloTemplate () {
      const helloTemplate = this.#helloTemplate.content.cloneNode(true)
      this.#board.appendChild(helloTemplate)
      this.#board.querySelector('img').setAttribute('src', IMG_URLS[this.choiceIndex])
      this.#board.querySelector('#helloMessage').textContent = `Hello ${this.nickname}, enjoy the poem!`

      // Add a poem
      let aPoem
      if (this.choiceIndex === 0) {
        aPoem = this.returnRandomPoem('Dog')
      } else if (this.choiceIndex === 1) {
        aPoem = this.returnRandomPoem('Water')
      } else if (this.choiceIndex === 2) {
        aPoem = this.returnRandomPoem('Butterfly')
      } else {
        aPoem = this.returnRandomPoem('Crow')
      }

      this.#board.querySelector('#title').textContent = aPoem.title
      this.#board.querySelector('#poems').textContent = `${aPoem.text}`
      this.#board.querySelector('#author').textContent = `Written by ${aPoem.author}`
    }

    /**
     * Chooses a poem randomly and returns it.
     *
     * @param {string} theme - The poem's topic.
     * @returns {object} The poem as an object.
     */
    returnRandomPoem (theme) {
      const arrayOfPoems = []
      for (const element of poems) {
        if (element.topic === theme) {
          arrayOfPoems.push(element)
        }
      }
      const randomIndex = Math.floor(Math.random() * arrayOfPoems.length)
      return arrayOfPoems[randomIndex]
    }

    /**
     * Handles the nickname.
     *
     */
    handleNickname () {
      this.nickname = localStorage.nickname
      if (this.nickname === undefined) {
        const nameTemplate = this.#nameTemplate.content.cloneNode(true)
        this.#board.appendChild(nameTemplate)
        this.#board.querySelector('#inputName').focus()

        this.#board.querySelector('button').addEventListener('click', event => {
          this.nickname = this.#board.querySelector('#inputName').value
          localStorage.nickname = this.nickname
          while (this.#board.firstChild) {
            this.#board.removeChild(this.#board.firstChild)
          }
          this.addtopicTemplate()
          event.preventDefault()
          event.stopPropagation()
        })
      } else {
        this.addtopicTemplate()
      }
    }
  }
)
