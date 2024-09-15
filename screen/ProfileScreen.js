import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LayoutImage from '../components/Layout/LayoutImage';
import CustomImagePicker from '../components/Interface/CustomImagePicker';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedImage = await AsyncStorage.getItem('userImage');
      if (storedName !== null && storedImage !== null) {
        setName(storedName);
        setImage(JSON.parse(storedImage));
        setIsProfileCreated(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleImagePicked = (imageData) => {
    setImage(imageData);
  };

  const saveProfile = async () => {
    if (!name.trim() || !image) {
      Alert.alert('Error', 'Please enter your name and choose a profile picture.');
      return;
    }

    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userImage', JSON.stringify(image));
      setIsProfileCreated(true);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const editProfile = () => {
    setIsProfileCreated(false);
  };

  if (isProfileCreated) {
    return (
      <LayoutImage blur={50}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Profile</Text>
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          <Text style={styles.nameText}>{name}</Text>
          <TouchableOpacity style={styles.editButton} onPress={editProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </LayoutImage>
    );
  }

  return (
    <LayoutImage blur={50}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Profile</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>
        {image ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            <TouchableOpacity onPress={() => setImage(null)} style={styles.removeImageButton}>
              <Text style={styles.removeImageText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CustomImagePicker
            onImagePicked={handleImagePicked}
            buttonText="Choose Profile Picture"
            buttonStyle={styles.imagePickerButton}
          />
        )}
        <TouchableOpacity style={styles.registerButton} onPress={saveProfile}>
          <Text style={styles.registerButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </LayoutImage>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  removeImageButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  removeImageText: {
    color: '#fff',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
