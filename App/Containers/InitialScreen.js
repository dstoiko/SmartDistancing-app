import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-paper'

import SmartView from '../Components/SmartView'
import Loader from '../Components/Loader'
import CenteredText from '../Components/CenteredText'

import Colors from '../Themes/Colors'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  logo: {
    width: null,
    height: 350
  },
  button: {
    height: 40,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: Colors.base50
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic'
  }
})

class InitialScreen extends React.Component {
  state = {
    loading: true
  }

  componentDidMount () {
    this.setState({ loading: false })
  }

  handleStart () {
    Actions.dashboardScreen()
  }

  render () {
    if (this.state.loading) {
      return (
        <Loader />
      )
    } else {
      return (
        <SmartView style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../Images/logo.png')}
            resizeMode={'contain'}
          />
          <CenteredText style={styles.text}>
            {'Together in distance\n\nMake physical distancing easier and smarter'}
          </CenteredText>
          <Button
            style={styles.button}
            onPress={() => this.handleStart()}
            color={Colors.base}
          >
            {'Start now'}
          </Button>
        </SmartView>
      )
    }
  }
}

export default InitialScreen
