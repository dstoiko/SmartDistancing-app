// @flow
import { Dimensions, Platform, StyleSheet } from 'react-native'

const isIPhoneXSize = (dim: {height: number, width: number}): boolean =>
  dim.height >= 812 || dim.width >= 812

const isIPhoneXrSize = (dim: {height: number, width: number}): boolean =>
  dim.height >= 896 || dim.width >= 896

// Check through screen dimensions whether the current device is an iPhone X/XR
export const isBigIphone = (): boolean => {
  const dim = Dimensions.get('window')
  return (
    Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}

// Add styles specific to iPhone X platform if needed
export const ifBigIphone = (iPhoneXStyle: StyleSheet.Styles, regularStyle: StyleSheet.Styles): StyleSheet.Styles =>
  isBigIphone() ? iPhoneXStyle : (regularStyle || null)

// Check through screen dimensions whether the current device is an iPhone X/XR
export const isIphone = (): boolean => {
  return (
    Platform.OS === 'ios'
  )
}

// Add styles specific to iPhone X platform if needed
export const ifIphone = (iPhoneStyle: StyleSheet.Styles, regularStyle: StyleSheet.Styles): StyleSheet.Styles =>
  isIphone() ? iPhoneStyle : (regularStyle || null)
