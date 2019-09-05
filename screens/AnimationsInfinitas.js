import React, { Component } from 'react';
import { Animated, View } from 'react-native';

class AnimationsInfinitas extends Component {
  state = {
    animate: new Animated.Value(0)
  }
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.animate,
          {
            toValue: 2,
            duration: 1000 * 10,
          }
        ),
        Animated.timing(
          this.state.animate,
          {
            toValue: 0,
            duration: 1000 * 10,
          }
        )
      ])
    ).start();
  }
  render() {
    const { animate } = this.state;
    const backgroundColor = animate.interpolate({
      inputRange: [0, .5, 1, 1.5, 2],
      outputRange: ['#21C1DD', '#7BD166', '#AE71D6', '#E9D54C', '#DD0C39']
    });
    return (
      <Animated.View
        style={{ flex: 1, backgroundColor }}
      />
    );
  }
}

export default AnimationsInfinitas;