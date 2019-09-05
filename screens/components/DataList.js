import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Layout({ marginTop }) {
  const data = new Array(80).fill(0);
  return (
    <View style={[styles.wrapper, { marginTop }]}>
      {data.map((item, index) => (
        <View style={styles.item} key={index}>
          <Text>{index}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10
  },
  item: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBEFFD'
  }
});