import {Image, View} from 'react-native';
import {COLOR} from '../../const/customColors';

const IconTabCity = ({focused}) => {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: focused ? COLOR.blue + 90 : 'transparent',
      }}>
      <Image
        style={{width: 100, height: 100}}
        source={require('../../assets/icon/city.png')}
      />
    </View>
  );
};

export default IconTabCity;
