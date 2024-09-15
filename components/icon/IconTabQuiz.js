import {Image, View} from 'react-native';
import {COLOR} from '../../const/customColors';

const IconTabQuiz = ({focused}) => {
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: focused ? COLOR.white + 90 : 'transparent',
      }}>
      <Image
        style={{width: 100, height: 100}}
        source={require('../../assets/icon/quiz.png')}
      />
    </View>
  );
};

export default IconTabQuiz;


