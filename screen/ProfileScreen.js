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
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileView = () => (
    <View style={styles.profileContainer}>
      <Image source={{ uri: image.uri }} style={styles.profileImage} />
      <Text style={styles.nameText}>{name}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ff9a9e', '#fad0c4', '#ffecd2']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}
    >
      {isProfileCreated ? renderProfileView() : renderProfileCreation()}
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#fff',
  },
  removeImageButton: {
    backgroundColor: 'rgba(231, 76, 60, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  removeImageText: {
    color: '#fff',
    fontSize: 14,
  },
  imagePickerButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  editButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
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
