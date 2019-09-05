import React, { Component } from 'react';
import { StyleSheet, Animated, Button, Easing, View } from 'react-native';

class AnimationsMultiples extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: true,
      _width: null, _height: null,
      animate: new Animated.Value(0),
    }
    this.animation = this.animation.bind(this);
  }
  animation() {
    this.setState({ start: !this.state.start });
    if (this.state.start) {
      Animated.sequence([
        Animated.timing(
          this.state.animate,
          {
            toValue: 8,
            duration: 1000 * 20,
            easing: Easing.linear()
          }
        ),
        Animated.timing(
          this.state.animate,
          {
            toValue: 0,
            duration: 1000 * 20,
            easing: Easing.linear()
          }
        )
      ]).start(() => {
        this.setState({ start: true });
      });
    } else {
      this.state.animate.setValue(0);
      this.setState({ start: true });
    }
  }
  render() {
    const { _width, _height, animate } = this.state;
    const width = animate.interpolate({
      inputRange: [0, 6, 7, 8],
      outputRange: [100, 100, _width, 100]
    })
    const height = animate.interpolate({
      inputRange: [0, 6, 7, 8],
      outputRange: [100, 100, _height, 100]
    })
    const rotate = animate.interpolate({
      inputRange: [0, 1, 2, 5, 6, 6.8, 8],
      outputRange: ['0deg', '360deg', '0deg', '0deg', '360deg', '0deg', '0deg']
    })
    const translateX = animate.interpolate({
      inputRange: [0, 2, 3, 4, 5, 8],
      outputRange: [0, 0, _width - 150, -_width + 150, 0, 0]
    })
    const borderWidth = animate.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [.5, 1, 2, 3, 4]
    })
    const borderColor = animate.interpolate({
      inputRange: [0, 4, 8],
      outputRange: ['#14C39A', '#3F8CDC', '#F5F9FA']
    })
    const borderRadius = animate.interpolate({
      inputRange: [0, 1, 5, 6, 7, 8],
      outputRange: [0, 50, 50, 0, 50, 0]
    })
    const backgroundColor = animate.interpolate({
      inputRange: [0, 8],
      outputRange: ['#6D23A7', '#49D295']
    })
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.content}
          onLayout={({ nativeEvent: { layout } }) => {
            this.setState({ _width: layout.width, _height: layout.height });
          }}>
          <Animated.View style={{
            width, height, backgroundColor,
            borderRadius, borderWidth, borderColor,
            transform: [{ rotate }, { translateX }]
          }} />
        </View>
        <Button onPress={this.animation}
          title={(this.state.start === true) ? 'play' : 'reset'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    height: 250,
    width: '100%',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden'
  }
});

export default AnimationsMultiples;