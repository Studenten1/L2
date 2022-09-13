/**
 * The main script file of the module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.0.0
 */

import './components/lm-data/index.js'

const dataModule = document.getElementById('dataModule')

try {
  dataModule.inputData([4, 8, 2, 4, 5])
  const result = dataModule.getStatistics()
  console.log(result)
  dataModule.showDiagrams()
} catch (e) {
  console.error(e.message)
}

/** Här ska det alltså finnas minst fem publika metoder som kan anropas av användaren */
