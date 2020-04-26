import React from 'react'
import { BackHandler, View, Text, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { BottomNavigation, DefaultTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'
import ActionsRedux from '../Redux/ActionsRedux'
import Prefix from '../Redux/PrefixRedux'

import Header from './Header'
import Badge from './Badge'
import Status from './Status'
import { AROUND_THRESHOLD } from '../Helpers/Constants'

import Colors from '../Themes/Colors'

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.highlight,
    background: 'transparent',
    notification: Colors.purple
  }
}

class Dashboard extends React.Component {
  state = {
    index: 1,
    isTabTitleSmallEnough: true,
    // Order is important: this array determines the tabs as they appear in the DashboardContainers
    routes: [
      {
        key: 'status',
        title: 'Status',
        icon: 'street-view'
      },
      {
        key: 'badge',
        title: 'Badge',
        icon: 'adjust'
      }
    ]
  }

  generateAroundCount = (min, max) => {
    this.props.setAroundCount(Math.floor(Math.random() * (max - min + 1)) + min)
  }

  componentDidMount () {
    BackHandler.addEventListener('androidBackButtonPress', this.handleBackPress)
    this.interval = setInterval(this.generateAroundCount.bind(this, 0, AROUND_THRESHOLD * 1.5), 2000)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('androidBackButtonPress', this.handleBackPress)
    clearInterval(this.interval)
  }

  handleBackPress = () => {
    Actions.reset('initialScreen')
  }

  handleTabChange = index => {
    this.setState({ index })
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'badge':
        return (
          <Badge
            close={this.props.around > AROUND_THRESHOLD}
          />
        )
      case 'status':
        return (
          <Status
            around={this.props.around}
          />
        )
    }
  }

  renderIcon = ({ route, focused, color }) => {
    return (
      <View>
        <Icon
          name={route.icon}
          size={23}
          color={
            this.state.routes[this.state.index].key === route.key
              ? Colors.highlight
              : color
          }
        />
      </View>
    )
  }

  renderLabel = ({ route, focused, color }) => {
    if (!this.state.isTabTitleSmallEnough) {
      return (null)
    }

    return (
      <Text
        onLayout={(event) => {
          let tabCount = this.state.routes.length
          let { width: screenWidth } = Dimensions.get('window')
          let { width: textWidth, height: textHeight } = event.nativeEvent.layout
          let maxTextWidth = screenWidth / tabCount

          if (this.state.isTabTitleSmallEnough &&
            (textWidth >= maxTextWidth || textHeight >= 20)) { // '20' is an approximation and is based on the fixed height defined by the lib.
            this.setState({ isTabTitleSmallEnough: false })
          }
        }}
        style={{
          color:
            this.state.routes[this.state.index].key === route.key
              ? Colors.highlight
              : color,
          alignSelf: 'center',
          fontSize: 13,
          top: -3
        }}
      >
        {route.title}
      </Text>
    )
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={this.state.routes[this.state.index].title}
          elevation={this.state.index === 0 || this.state.index === 3 ? 3 : 0}
          deviceConnectionStatus={this.props.connected ? 'connected' : 'disconnected'}
        />
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this.handleTabChange}
          renderScene={this.renderScene}
          renderIcon={this.renderIcon}
          renderLabel={this.renderLabel}
          theme={theme}
          barStyle={{ backgroundColor: Colors.tabBar }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    around: state.user.around,
    connected: state.user.connected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAroundCount: around => dispatch(ActionsRedux[Prefix.user].setAroundCount(around))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
