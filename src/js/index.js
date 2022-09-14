/**
 * The main script file of the module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.0.0
 */

import './components/lm-data/index.js'

const dataModule = document.getElementById('dataModule')

try {
  dataModule.inputData([4, 8, 2, 4, 5, 8])

  const result = dataModule.getStatistics()
  console.log(result)

  const sortedValues = dataModule.getSortedData()
  console.log(sortedValues)

  const tablePath = dataModule.getTableImgPath()
  console.log(tablePath)

  const boxPath = dataModule.getBoxPlotImgPath()
  console.log(boxPath)

  const histogram = dataModule.getHistogramImgPath()
  console.log(histogram)
} catch (e) {
  console.error(e.message)
}

/** Här ska det alltså finnas minst fem publika metoder som kan anropas av användaren */
