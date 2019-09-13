import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated, Button, Easing, View, Text } from 'react-native';

const Animate = ({ style, text }) => (
  <Animated.View style={style}>
    <Text>{text}</Text>
  </Animated.View>
)

class AnimationsBasicas extends Component {
  state = {
    start: true,
    animate: new Animated.Value(0)
  }
  animations() {
    this.setState({ start: false });
    if (this.state.start) {
      Animated.timing(
        this.state.animate,
        {
          toValue: 12,
          duration: 1000 * 10,
          easing: Easing.linear()
        }
      ).start(() => {
        this.state.animate.setValue(0);
        this.setState({ start: true })
      })
    }
  }
  render() {
    const { animate } = this.state;
    const skewY = animate.interpolate({
      inputRange: [0, 3, 6, 9, 12],
      outputRange: ['0deg', '20deg', '-20deg', '20deg', '0deg']
    });
    const scale = animate.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, 3, 6, 9, 12],
      outputRange: [1, .1, 1, .1, 1]
    });
    const rotate = animate.interpolate({
      inputRange: [0, 3, 6, 9, 12,],
      outputRange: ['0deg', '360deg', '0deg', '360deg', '0deg']
    });
    const translateX = animate.interpolate({
      inputRange: [0, 3, 9, 12],
      outputRange: [0, -240, 240, 0]
    });
    return (
      <View style={styles.main}>
        <View style={{ padding: 5 }}>
          <Button
            title="play"
            onPress={() => { this.animations() }}
            disabled={(this.state.start === true) ? false : true}
          />
        </View>
        <ScrollView>
          <View style={styles.wrap}>
            <Animate
              text="Skew"
              style={[styles.item, { transform: [{ skewY }] }]}
            />
          </View>
          <View style={styles.wrap}>
            <Animate
              text="Scale"
              style={[styles.item, { transform: [{ scale }] }]}
            />
          </View>
          <View style={styles.wrap}>
            <Animate
              text="Rotate"
              style={[styles.item, { transform: [{ rotate }] }]}
            />
          </View>
          <View style={styles.wrap}>
            <Animate
              text="translate"
              style={[styles.item, { transform: [{ translateX }] }]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 5,
  },
  wrap: {
    height: 120,
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  item: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DADADA'
  }
});

export default AnimationsBasicas;