import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const sHeight = width < height ? height : width
const sWidth = width < height ? width : height

const Metrics = {
  screenWidth: sWidth,
  screenHeight: sHeight
}

export default Metrics
