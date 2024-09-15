import {StyleSheet, Text, View, ScrollView} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';

const CityDeatailsScreen = ({route}) => {
  const {section} = route.params;
  return (
    <LayoutImage>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{section.title}</Text>
        {section.content.map((item, index) => (
          <View key={index} style={styles.contentItem}>
            <Text style={styles.header}>{item.header}</Text>
            <Text style={styles.article}>{item.article}</Text>
          </View>
        ))}
      </ScrollView>
    </LayoutImage>
  );
};

export default CityDeatailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  contentItem: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  article: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
