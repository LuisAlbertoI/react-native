import React, { Component } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Animated, View, Text } from 'react-native';
import DataList from './components/DataList';

class HeaderAnimate extends Component {
  state = {
    scrollY: new Animated.Value(0)
  }
  render() {
    const { scrollY } = this.state;
    const height = scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [300, 50],
      extrapolate: 'clamp'
    });
    const fontSize = scrollY.interpolate({
      inputRange: [250, 300],
      outputRange: [30, 20],
      extrapolate: 'clamp'
    });
    const translateX = scrollY.interpolate({
      inputRange: [250, 300],
      outputRange: [0, 40],
      extrapolate: 'clamp'
    });
    const backgroundColor = scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: ['transparent', 'teal'],
      extrapolate: 'clamp'
    });
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.header, { height }]}>
          <ImageBackground style={styles.background}
            source={require('../assets/avatar.jpg')}>
            <Animated.View style={[styles.wrapper, { backgroundColor }]}>
              <View style={styles.navigation}>
                <Text style={styles.font}>⇋</Text>
                <Text style={styles.font}>≡</Text>
              </View>
              <View style={styles.info}>
                <Animated.Text style={[styles.font, {
                  fontSize, transform: [{ translateX }]
                }]}>
                  Titulo
                </Animated.Text>
              </View>
            </Animated.View>
          </ImageBackground>
        </Animated.View>
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={1}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: { y: this.state.scrollY }
            }
          }])}>
          <DataList marginTop={300} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wrapper: {
    width: '100%',
    height: '100%'
  },
  navigation: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100
  },
  info: {
    height: 50,
    width: '100%',
    justifyContent: "center",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  font: {
    fontSize: 30,
    color: '#fafafa',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  }
});

export default HeaderAnimate;