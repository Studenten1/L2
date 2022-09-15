/**
 * The main script file of the module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.0.0
 */

import './components/lm-data/index.js'

const dataModule = document.getElementById('dataModule')

try {
  dataModule.inputData([4, 8, 2, 4, 4.5, 5, 8, 10.5, 11.23])

  const result = dataModule.getStatistics()
  console.log(result)

  const sortedValues = dataModule.getSortedData()
  console.log(sortedValues)

  const tablePath = dataModule.getTableImgPath()
  console.log(tablePath)

  const boxPath = dataModule.getBoxPlotImgPath()
  console.log(boxPath)

  const barchartPath = dataModule.getBarchartImgPath()
  console.log(barchartPath)
} catch (e) {
  console.error(e.message)
}
