import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {COLOR} from '../const/customColors';

const IntroductionScreen = ({navigation}) => {
  return (
    <LayoutImage
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomButton
        title={'City History'}
        onPress={() => navigation.navigate('CityHistoryScreen')}
      />
      {/* <CustomButton
        title={'News Paper'}
        onPress={() => navigation.navigate('NewsPaperScreen')}
      /> */}
      <CustomButton
        title={'Meetup'}
        onPress={() => navigation.navigate('MeetupScreen')}
      />
      <CustomButton
        title={'Profile'}
        onPress={() => navigation.navigate('ProfileScreen')}
      />
    </LayoutImage>
  );
};

export default IntroductionScreen;

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.btnBg,
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
  },
});
