import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class SmartView extends React.Component {
  state = {
    overflow: false
  }

  overflowBottom (nativeEvent) {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
    return layoutMeasurement.height + contentOffset.y > contentSize.height
  }

  render () {
    return (
      <KeyboardAwareScrollView
        testID={this.props.testID}
        ref={view => {
          this.view = view
        }}
        alwaysBounceVertical={false}
        nestedScrollEnabled
        contentContainerStyle={[this.props.style, { flexGrow: 1 }]}
        keyboardShouldPersistTaps='handled'
        extraScrollHeight={5}
        keyboardOpeningTime={0}
        onKeyboardWillHide={() => {
          if (this.state.overflow) {
            this.view.scrollToEnd()
          }
        }}
        onMomentumScrollEnd={(event) => {
          this.setState({ overflow: this.overflowBottom(event.nativeEvent) })
        }}
        enableResetScrollToCoords={false}
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    )
  }
}
