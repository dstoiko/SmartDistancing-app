import React from 'react'
import { View, StyleSheet, YellowBox, StatusBar, Platform } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'

import NavigationRouter from '../Navigation/NavigationRouter'
import Loader from '../Components/Loader'
import createStore from '../Redux/CreateStore'

import Colors from '../Themes/Colors'

import { ifBigIphone } from '../Helpers/Platform'

const STATUSBAR_HEIGHT_IPHONEX = 40
const STATUSBAR_HEIGHT_REGULAR = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'Roboto'
  },
  statusBar: {
    backgroundColor: Colors.status,
    height: ifBigIphone(STATUSBAR_HEIGHT_IPHONEX, STATUSBAR_HEIGHT_REGULAR)
  }
})

export default class App extends React.Component {
  state = {
    store: null,
    persistor: null
  }

  async componentDidMount () {
    const isHermes = () => global.HermesInternal != null
    console.log('Using Hermes: ' + isHermes())
    // Activate logging only in development, to optimize release builds
    // TECHDEBT: for optimal performance, add it as babel configuration
    // so that calls to console.log are removed from release builds altogether
    if (!__DEV__) {
      console.log = () => {}
    } else {
      console.log('DEV mode enabled, logging all interactions')
    }

    try {
      const { store, persistor } = await createStore()
      this.setState({ store, persistor })
    } catch (e) {
      console.error(e.message)
    }

    // configure statusBar
    StatusBar.setBarStyle('light-content')
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)')
      StatusBar.setTranslucent(true)
    }

    YellowBox.ignoreWarnings([
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: componentWillMount has been renamed',
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation'
    ])

    SplashScreen.hide()
  }

  render () {
    if (this.state.store === null || this.state.persistor === null) {
      return (<Loader />)
    }

    return (
      <View
        style={{ flex: 1, backgroundColor: Colors.status }}
      >
        <View style={styles.statusBar} />
        <Provider store={this.state.store}>
          <PersistGate loading={null} persistor={this.state.persistor}>
            <NavigationRouter />
          </PersistGate>
        </Provider>
      </View>
    )
  }
}
