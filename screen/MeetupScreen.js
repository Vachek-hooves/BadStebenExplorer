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
} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {useAppContext} from '../store/context';

const MeetupScreen = () => {
  const {meetups, addMeetup, deleteMeetup} = useAppContext();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddMeetup = () => {
    if (name && description && imageUrl) {
      const newMeetup = {
        id: Date.now().toString(),
        name,
        description,
        imageUrl,
      };
      addMeetup(newMeetup);
      setName('');
      setDescription('');
      setImageUrl('');
      setIsAddModalVisible(false);
    }
  };

  const openDetailModal = meetup => {
    setSelectedMeetup(meetup);
    setIsDetailModalVisible(true);
  };

  return (
    <LayoutImage blur={10}>
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

      {/* Add Meetup Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button title="Add Meetup" onPress={handleAddMeetup} />
            <Button
              title="Cancel"
              onPress={() => setIsAddModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Meetup Detail Modal */}
      <Modal
        visible={isDetailModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedMeetup && (
              <>
                <Text style={styles.modalTitle}>{selectedMeetup.name}</Text>
                <Image
                  source={{uri: selectedMeetup.imageUrl}}
                  style={styles.detailImage}
                />
                <Text style={styles.detailDescription}>
                  {selectedMeetup.description}
                </Text>
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
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </LayoutImage>
  );
};

export default MeetupScreen;

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
    width: 50,
    height: 50,
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
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
