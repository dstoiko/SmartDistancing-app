import React from 'react'
import { StyleSheet } from 'react-native'
import { Scene, Router, Stack } from 'react-native-router-flux'

import InitialScreen from '../Containers/InitialScreen'
import DashboardScreen from '../Containers/DashboardScreen'

import Colors from '../Themes/Colors'

import { ifIphone, ifBigIphone } from '../Helpers/Platform'

const styles = StyleSheet.create({
  yellowNavBarTitle: {
    color: Colors.highlight,
    fontWeight: 'normal',
    ...ifIphone(
      { ...ifBigIphone({
        fontSize: 18
      }, {
        fontSize: 16
      }) },
      {
        fontSize: 16
      }
    )
  },
  backButtonText: {
    color: Colors.base
  },
  navBar: {
    backgroundColor: Colors.viewTop,
    ...ifIphone(
      {
        ...ifBigIphone({
          marginTop: 20,
          paddingBottom: 10
        },
        {})
      },
      {}
    )
  }
})

export default class NavigationRouter extends React.Component {
  render () {
    const { backButtonText } = styles
    return (
      <Router sceneStyle={{ backgroundColor: Colors.status }} onStateChange={this.onStateChange}>
        <Stack key='root' transitionConfig={() => ({ containerStyle: {} })} headerForceInset={{ top: 'never' }} navBarButtonColor={Colors.base} navigationBarStyle={styles.navBar} backButtonTextStyle={backButtonText} backTitle={'Back'} headerLayoutPreset='center'>
          <Scene key='initialScreen' component={InitialScreen} initial hideNavBar />
          <Scene key='dashboardScreen' component={DashboardScreen} type='reset' title={() => 'Dashboard'} hideNavBar />
        </Stack>
      </Router>
    )
  }
}
