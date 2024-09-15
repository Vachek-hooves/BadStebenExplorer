import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const IconCorrect = () => {
  return (
    <Image
      style={{height: 40, width: 40}}
      source={require('../../assets/icon/good.png')}
    />
  );
};

export default IconCorrect;

const styles = StyleSheet.create({});
