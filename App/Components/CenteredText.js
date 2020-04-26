import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

import Colors from '../Themes/Colors'

export default class CenteredText extends React.Component {
  render () {
    return (
      <View>
        <Text style={StyleSheet.flatten([{ textAlign: 'center', fontSize: 20, color: Colors.base }, this.props.style])}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}
