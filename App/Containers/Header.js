import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { SmartTouchableOpacity } from '../Components/SmartTouchable'
import CenteredText from '../Components/CenteredText'

import Colors from '../Themes/Colors'

const styles = StyleSheet.create({
  header: {
    height: 50,
    maxHeight: 50,
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.status
  },
  icon: {
    position: 'absolute'
  },
  lightView: {
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 15,
    margin: 15
  },
  statusIcon2: {
    marginLeft: 3,
    marginRight: 1,
    marginTop: 1
  },
  title: {
    color: Colors.highlight,
    padding: 15,
    fontSize: 16
  }
})

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    elevation: PropTypes.number
  }

  statusLight = {
    disconnected: {
      backgroundColor: Colors.down,
      wifiColor: Colors.base50,
      indicator: 'times'
    },
    connected: {
      backgroundColor: Colors.valid,
      wifiColor: Colors.base,
      indicator: null
    }
  }

  handleConnectivityPress () {
    // TODO: go to connection screen if not connected to badge
    return null
  }

  onPressCog = () => {
    // TODO: add settings screen
    return null
  }

  render () {
    const { deviceConnectionStatus } = this.props
    const { backgroundColor, wifiColor, indicator } = this.statusLight[deviceConnectionStatus]

    return (
      <View style={styles.header} elevation={this.props.elevation} onLayout={this.props.onLayout}>
        <SmartTouchableOpacity
          activeOpacity={0.6}
          style={[styles.icon, styles.lightView, { backgroundColor }]}
          onPress={() => this.handleConnectivityPress()}
        >
          <FontAwesome
            name='bluetooth-b'
            size={20}
            color={wifiColor}
            style={{ paddingHorizontal: 5 }}
          />
          {indicator &&
            <FontAwesome
              style={styles.statusIcon2}
              name={indicator}
              size={12}
              color={Colors.base}
            />
          }
        </SmartTouchableOpacity>
        <View>
          <CenteredText style={styles.title}>{this.props.title}</CenteredText>
        </View>
        <SmartTouchableOpacity
          onPress={this.onPressCog}
          style={{ position: 'absolute', flex: 1, right: 0, top: 0, width: 50, height: 50 }}
        >
          <View style={{ padding: 15 }}>
            <IconSimpleLine
              name='settings'
              size={20}
              color={Colors.base}
            />
          </View>
        </SmartTouchableOpacity>
      </View>
    )
  }
}

export default Header
