import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const CustomImagePicker = ({ onImagePicked, buttonText, buttonStyle, imageStyle }) => {
  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageData = response.assets[0];
        onImagePicked(imageData);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, buttonStyle]} 
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>{buttonText || 'Pick An Image'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
