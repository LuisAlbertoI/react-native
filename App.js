import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, StatusBar, Animated, Easing, Image, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AnimationsBasicas from './screens/AnimationsBasicas';
import AnimationsInfinitas from './screens/AnimationsInfinitas';
import AnimationsMultiples from './screens/AnimationsMultiples';
import HeaderAnimate from './screens/HeaderAnimate';
import HeaderHide from './screens/HeaderHide';
import Parallax from './screens/Parallax';
import Reloj from './screens/Reloj';

const routesInfo = [
  {
    title: 'Parallax', route: 'Parallax',
    description: 'Creando un parallax con imagenes'
  },
  {
    title: 'Reloj animado', route: 'Reloj',
    description: 'Creando animaciones para un reloj cool'
  },
  {
    title: 'Header animado', route: 'HeaderAnimate',
    description: 'Crendo un header animado con imagenes'
  },
  {
    title: 'Header ocultable', route: 'HeaderHide',
    description: 'Creando un header que nos siga'
  },
  {
    title: 'Animaciones basicas', route: 'AnimationsBasicas',
    description: 'Creando animacones basicas'
  },
  {
    title: 'Animaciones infinitas', route: 'AnimationsInfinitas',
    description: 'Utilizando el metodo loop de animated'
  },
  {
    title: 'Animaciones multiples', route: 'AnimationsMultiples',
    description: 'Integrando multiples animacines a un elemento'
  }
]

class Home extends Component {
  state = {
    animate: new Animated.Value(0)
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(
        this.state.animate,
        {
          toValue: 1,
          duration: 1000 * 5,
          easing: Easing.linear()
        }
      )
    ).start()
  }
  render() {
    const rotate = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='teal' />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Animated.Image
              source={require('./assets/react.png')}
              style={[styles.figure, { transform: [{ rotate }] }]}
            />
            <Text style={{ color: '#fff', fontSize: 20 }}>
              React Native Animations
            </Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {routesInfo.map((item, index) => (
            <TouchableOpacity style={styles.item} key={index}
              onPress={() => { this.props.navigation.navigate(item.route) }}
              activeOpacity={0.5}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  figure: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#D6D6D6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#999',
    fontSize: 13,
  }
});

const routes = {
  AnimationsBasicas,
  AnimationsInfinitas,
  AnimationsMultiples,
  HeaderAnimate,
  HeaderHide,
  Parallax,
  Reloj
}

export default createAppContainer(
  createStackNavigator(
    {
      ...routes,
      Home: { screen: Home }
    },
    {
      headerMode: 'none',
      initialRouteName: 'Home'
    }
  )
);