import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Text } from 'react-native-paper'

import { AROUND_THRESHOLD } from '../Helpers/Constants'

import Colors from '../Themes/Colors'

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    height: 40,
    marginBottom: 15,
    backgroundColor: Colors.base50
  },
  surface: {
    padding: 8,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  surfaceText: {
    fontSize: 80,
    color: Colors.base
  },
  belowSurfaceText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.base
  }
})

class Status extends React.Component {
  handleConnect = () => {
    // TODO: connect to device
    return null
  }

  render () {
    const surfaceBackground = this.props.around > AROUND_THRESHOLD
      ? Colors.red
      : Colors.green
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 0.6, alignItems: 'center' }}>
          <Surface style={{ ...styles.surface, backgroundColor: surfaceBackground }}>
            <Text style={styles.surfaceText}>{this.props.around}</Text>
          </Surface>
          <Text style={styles.belowSurfaceText}>
            {'people around you'}
          </Text>
        </View>
      </View>
    )
  }
}

export default Status
