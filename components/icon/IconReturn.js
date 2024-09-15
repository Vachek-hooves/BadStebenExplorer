import {View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../const/customColors';

const IconReturn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        marginVertical: 30,
        // position: 'absolute',
        // bottom: 60,
        // right: 70,
        alignItems: 'flex-end',
        marginHorizontal: 80,
      }}>
      <Image
        source={require('../../assets/icon/back.png')}
        style={{width: 60, height: 60, tintColor: COLOR.btnBg}}
      />
    </TouchableOpacity>
  );
};

export default IconReturn;
