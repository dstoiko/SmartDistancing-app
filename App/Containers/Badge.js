import React from 'react'
import { StyleSheet, View, TouchableHighlight, Dimensions, Text } from 'react-native'
import { Button } from 'react-native-paper'

import { connect } from 'react-redux'
import ActionsRedux from '../Redux/ActionsRedux'
import Prefix from '../Redux/PrefixRedux'

import Colors from '../Themes/Colors'

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 50,
    marginBottom: 15,
    backgroundColor: Colors.base50
  },
  buttonText: {
    color: Colors.softBase,
    fontSize: 20
  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.base,
    fontSize: 18
  }
})

class Badge extends React.Component {
  buttons = {
    purchase: {
      text: 'Order a badge now',
      action: () => this.handleOrder()
    },
    connect: {
      text: 'Connect',
      action: () => this.handleConnect()
    },
    disconnect: {
      text: 'Disconnect',
      action: () => this.handleDisconnect()
    }
  }

  state = {
    ordered: false
  }

  handleOrder = () => {
    this.setState({ ordered: true })
  }

  handleConnect = () => {
    this.props.connect()
  }

  handleDisconnect = () => {
    this.props.disconnect()
  }

  render () {
    let badgeColor = Colors.base50
    let badgeText = 'You are not connected'
    let button = this.state.ordered ? this.buttons.connect : this.buttons.purchase
    if (this.props.connected) {
      badgeColor = this.props.close ? Colors.red : Colors.green
      badgeText = this.props.close ? 'Someone is too close' : 'You are safe'
      button = this.buttons.disconnect
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 0.5, alignItems: 'center' }}>
          <TouchableHighlight
            style={{ backgroundColor: badgeColor, ...styles.circle }}
            underlayColor='#ccc'
            onPress={() => null}
          >
            <Text style={styles.text}>
              {badgeText}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center' }}>
          <Button style={styles.button} onPress={button.action}>
            <Text style={styles.buttonText}>
              {button.text}
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    connected: state.user.connected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connect: () => dispatch(ActionsRedux[Prefix.user].connect()),
    disconnect: () => dispatch(ActionsRedux[Prefix.user].disconnect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Badge)
