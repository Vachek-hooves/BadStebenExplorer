import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CustomImagePicker from '../components/Interface/CustomImagePicker';

const { width, height } = Dimensions.get('window');

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

  const renderProfileCreation = () => (
    <View style={styles.formContainer}>
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
      {!image && (
        <CustomImagePicker
          onImagePicked={handleImagePicked}
          buttonText="Choose Profile Picture"
          buttonStyle={styles.imagePickerButton}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileView = () => (
    <View style={styles.profileContainer}>
      <Text style={styles.nameText}>{name}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientContainer}
      >
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </LinearGradient>
      {isProfileCreated ? renderProfileView() : renderProfileCreation()}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  gradientContainer: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    borderWidth: 5,
    borderColor: 'white',
  },
  placeholderImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 5,
    borderColor: 'white',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePickerButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
