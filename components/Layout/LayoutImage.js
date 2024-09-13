import {StyleSheet, Text, View, ImageBackground} from 'react-native';

const LayoutImage = ({children, style}) => {
  return (
    <ImageBackground
      style={[{flex: 1}, style]}
      source={require('../../assets/img/bg/city.jpg')}>
      {children}
    </ImageBackground>
  );
};

export default LayoutImage;

const styles = StyleSheet.create({});
