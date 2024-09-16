import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {useAppContext} from '../store/context';
import {IconReturn} from '../components/icon';
import {CustomImagePicker} from '../components/Interface';
const {height} = Dimensions.get('screen');

const MeetupScreen = () => {
  const {meetups, addMeetup, deleteMeetup, updateMeetup} = useAppContext();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleAddMeetup = () => {
    if (name && description) {
      const newMeetup = {
        id: Date.now().toString(),
        name,
        description,
        imageUrl: selectedImage ? selectedImage.uri : null,
      };
      addMeetup(newMeetup);
      setName('');
      setDescription('');
      setSelectedImage(null);
      setIsAddModalVisible(false);
    }
  };
  const openEditModal = meetup => {
    setSelectedMeetup(meetup);
    setName(meetup.name);
    setDescription(meetup.description);
    setSelectedImage(meetup.imageUrl ? {uri: meetup.imageUrl} : null);
    setIsEditModalVisible(true);
  };

  const handleUpdateMeetup = () => {
    if (selectedMeetup && (name || description || selectedImage)) {
      const updatedMeetup = {
        ...selectedMeetup,
        name: name || selectedMeetup.name,
        description: description || selectedMeetup.description,
        imageUrl: selectedImage ? selectedImage.uri : selectedMeetup.imageUrl,
      };
      updateMeetup(updatedMeetup);
      setIsEditModalVisible(false);
      setIsDetailModalVisible(false);
      setSelectedMeetup(null);
      setName('');
      setDescription('');
      setSelectedImage(null);
    }
  };

  const handleImagePicked = imageData => {
    setSelectedImage(imageData);
  };

  const openDetailModal = meetup => {
    setSelectedMeetup(meetup);
    setIsDetailModalVisible(true);
  };

  return (
    <LayoutImage blur={200}>
      <ScrollView style={styles.container}>
        {/* <Button
          title="Add New Meetup"
          onPress={() => setIsAddModalVisible(true)}
        /> */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}>
          <Text style={styles.addButtonText}>Add New Meetup</Text>
        </TouchableOpacity>

        <View style={styles.meetupList}>
          <Text style={styles.listTitle}>Meetups:</Text>
          {meetups.map(meetup => (
            <TouchableOpacity
              key={meetup.id}
              style={styles.meetupItem}
              onPress={() => openDetailModal(meetup)}>
              <Image
                source={{uri: meetup.imageUrl}}
                style={styles.meetupImage}
              />
              <View style={styles.meetupInfo}>
                <Text style={styles.meetupName}>{meetup.name}</Text>
                <Text numberOfLines={1}>{meetup.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Edit Meetup Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Meetup</Text>
            <TextInput
              style={styles.input}
              placeholder="Meetup Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <CustomImagePicker
              onImagePicked={handleImagePicked}
              buttonText="Update Meetup Image"
              buttonStyle={styles.imagePickerButton}
            />
            {selectedImage && (
              <Image
                source={{uri: selectedImage.uri}}
                style={styles.previewImage}
              />
            )}
            <CustomButton onPress={handleUpdateMeetup}>
              Update Meetup
            </CustomButton>
            {/* <Button title="Update Meetup" onPress={handleUpdateMeetup} /> */}
            <Button
              title="Cancel"
              onPress={() => {
                setIsEditModalVisible(false);
                setSelectedMeetup(null);
                setName('');
                setDescription('');
                setSelectedImage(null);
              }}
            />
            <View style={{height: 50}}></View>
          </ScrollView>
        </View>
      </Modal>

      {/* Add Meetup Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Meetup</Text>
            <TextInput
              style={styles.input}
              placeholder="Meetup Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <CustomImagePicker
              onImagePicked={handleImagePicked}
              buttonText="Choose Meetup Image (Optional)"
              buttonStyle={styles.imagePickerButton}
            />
            {selectedImage && (
              <Image
                source={{uri: selectedImage.uri}}
                style={styles.previewImage}
              />
            )}
            {/* <Button title="Add Meetup" onPress={handleAddMeetup} /> */}
            <CustomButton onPress={handleAddMeetup}>Add Meetup</CustomButton>
            {/* <TouchableOpacity
              onPress={handleAddMeetup}
              style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Meetup</Text>
            </TouchableOpacity> */}
            <CustomButton
              onPress={() => {
                setIsAddModalVisible(false);
                setSelectedImage(null);
              }}>
              Cancel
            </CustomButton>
            {/* <Button
              title="Cancel"
              onPress={() => {
                setIsAddModalVisible(false);
                setSelectedImage(null);
              }}
            /> */}
            <View style={{height: 40}}></View>
          </ScrollView>
        </View>
      </Modal>

      {/* Meetup Detail Modal */}
      <Modal
        visible={isDetailModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {selectedMeetup && (
              <>
                <Text style={styles.modalTitle}>{selectedMeetup.name}</Text>
                {selectedMeetup.imageUrl && (
                  <Image
                    source={{uri: selectedMeetup.imageUrl}}
                    style={styles.detailImage}
                  />
                )}
                <Text style={styles.detailDescription}>
                  {selectedMeetup.description}
                </Text>
                <CustomButton
                  onPress={() => {
                    setIsDetailModalVisible(false);
                    openEditModal(selectedMeetup);
                  }}>
                  Edit
                </CustomButton>
                <CustomButton onPress={() => setIsDetailModalVisible(false)}>
                  Close
                </CustomButton>
                <CustomButton
                  onPress={() => {
                    deleteMeetup(selectedMeetup.id);
                    setIsDetailModalVisible(false);
                  }}>
                  Delete
                </CustomButton>
                {/* <Button
                  title="Edit"
                  onPress={() => {
                    setIsDetailModalVisible(false);
                    openEditModal(selectedMeetup);
                  }}
                />
                <Button
                  title="Close"
                  onPress={() => setIsDetailModalVisible(false)}
                />
                <Button
                  title="Delete"
                  onPress={() => {
                    deleteMeetup(selectedMeetup.id);
                    setIsDetailModalVisible(false);
                  }}
                /> */}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
      <IconReturn />
    </LayoutImage>
  );
};

export default MeetupScreen;

const CustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <Text style={styles.addButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  meetupList: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meetupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    padding: 10,
  },
  meetupImage: {
    width: 130,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  meetupInfo: {
    flex: 1,
  },
  meetupName: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailDescription: {
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePickerButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});
