import React from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'

import Colors from '../Themes/Colors'

export default class Loader extends React.Component {
  render () {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        {...this.props}
      >
        <Spinner size={100} type='ThreeBounce' color={Colors.purple} />
      </View>
    )
  }
}
