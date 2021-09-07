import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/ahangify.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6F9',
  },
  title: {
    color: '#000000',
  },
  image: {
    height: 200,
    width: 200,
  },
});
