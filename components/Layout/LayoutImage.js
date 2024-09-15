import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

const LayoutImage = ({children, style, blur}) => {
  return (
    <ImageBackground
      style={[{flex: 1}]}
      source={require('../../assets/img/bg/city.jpg')}
      blurRadius={blur}>
      <SafeAreaView style={[{flex: 1}, style]}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default LayoutImage;

const styles = StyleSheet.create({});
