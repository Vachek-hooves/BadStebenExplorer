import {Image, View} from 'react-native';
import {COLOR} from '../../const/customColors';

const IconTabTF = ({focused}) => {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: focused ? COLOR.white + 90 : 'transparent',
        paddingVertical: 13,
        paddingHorizontal: 10,
      }}>
      <Image
        style={{width: 90, height: 70}}
        source={require('../../assets/icon/tf.png')}
      />
    </View>
  );
};

export default IconTabTF;
