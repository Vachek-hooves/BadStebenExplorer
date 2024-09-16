import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CustomImagePicker from '../components/Interface/CustomImagePicker';
import {IconReturn} from '../components/icon';

const {width, height} = Dimensions.get('window');
console.log(height);
const SCREEN_HEIGHT = height;

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

  const handleImagePicked = imageData => {
    setImage(imageData);
  };

  const saveProfile = async () => {
    if (!name.trim() || !image) {
      Alert.alert(
        'Error',
        'Please enter your name and choose a profile picture.',
      );
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
          <Image source={{uri: image.uri}} style={styles.imagePreview} />
          <TouchableOpacity
            onPress={() => setImage(null)}
            style={styles.removeImageButton}>
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
      <Image source={{uri: image.uri}} style={styles.profileImage} />
      <Text style={styles.nameText}>{name}</Text>
      <TouchableOpacity style={styles.editButton} onPress={editProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#D7CCC8', '#A1887F', '#795548']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      {isProfileCreated ? renderProfileView() : renderProfileCreation()}
      <View
        style={{
          position: 'absolute',
          bottom: SCREEN_HEIGHT > 690 ? 50 : 0,
          right: 30,
        }}>
        <IconReturn />
      </View>
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
    color: '#EFEBE9',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    color: '#3E2723',
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
    borderColor: '#EFEBE9',
  },
  profileImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#EFEBE9',
  },
  removeImageButton: {
    backgroundColor: 'rgba(121, 85, 72, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  removeImageText: {
    color: '#EFEBE9',
    fontSize: 14,
  },
  imagePickerButton: {
    backgroundColor: 'rgba(69, 90, 100, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'rgba(56, 142, 60, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#EFEBE9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#EFEBE9',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  editButton: {
    backgroundColor: 'rgba(69, 90, 100, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  editButtonText: {
    color: '#EFEBE9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
