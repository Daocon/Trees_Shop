import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = text => {
    setSearchText(text);
    const results = [];
    setSearchResults(results);
  };

  const pressToBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity style={styles.button} onPress={pressToBack}>
            <Image source={require('../../../assets/images/back.png')}></Image>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            lineHeight: 36,
            fontWeight: '600',
          }}>
          Notification
        </Text>
        <View></View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'black' }}>
          Hiện chưa có thông báo nào dành cho bạn
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default NotificationScreen;
