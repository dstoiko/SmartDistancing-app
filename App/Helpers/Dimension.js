// @flow
import I18n from 'react-native-i18n'

function isUsingMetricSystem (): boolean {
  switch (I18n.currentLocale().split('-')[1]) {
    case 'US':
    case 'LR':
    case 'MM':
      return false
    default:
      return true
  }
}

export const usesMetricSystem = isUsingMetricSystem()

export const inchCmSepare = (value: number, imperial: boolean): Array<number> => {
  if (!imperial) {
    return [parseInt(value / 100), value % 100]
  } else {
    return [parseInt(value / 12), value % 12]
  }
}

export const inchCmAssemble = (mFeet: number, cmIn: number): number => {
  return mFeet * 12 + cmIn
}
