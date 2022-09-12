/**
 * The main script file of the application.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.0.0
 */

import './components/lm-data/index.js'

const dataModule = document.getElementById('dataModule')

try {
  dataModule.inputData([4, 8, 2, 4, 5])
} catch (e) {
  console.error(e.message)
}
