import React from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, Platform, View } from 'react-native'

class SmartTouchableHighlightClass extends React.Component {
  render () {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={this.props.style}>{this.props.children}</View>
      </Touchable>
    )
  }
}

class SmartTouchableWithoutFeedbackClass extends React.Component {
  render () {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={this.props.style}>{this.props.children}</View>
      </TouchableWithoutFeedback>
    )
  }
}

export const SmartTouchableHighlight = SmartTouchableHighlightClass
export const SmartTouchableWithoutFeedback = SmartTouchableWithoutFeedbackClass
export const SmartTouchableOpacity = TouchableOpacity
