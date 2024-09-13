import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {COLOR} from '../const/customColors';

const WelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate('InitialTabScreen'));
  }, []);

  return (
    <LayoutImage>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.welcomeText,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          Welcome to{'\n'}Bad Steben {'\n'}Explorer
        </Animated.Text>
      </View>
    </LayoutImage>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: '800',
    textAlign: 'center',
    color: COLOR.blue,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
