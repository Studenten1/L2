/**
 * The main script file of the module.
 *
 * @author Linda Meyer <lm222sp@student.lnu.se>
 * @version 1.0.0
 */

import './components/lm-data/index.js'

const Statistics = document.getElementById('statistics')

try {
  Statistics.inputData([4, 8, 2, 4, 4.5, 5, 8, 10.5, 11.23])

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
  })
} catch (e) {
  console.error(e.message)
}
