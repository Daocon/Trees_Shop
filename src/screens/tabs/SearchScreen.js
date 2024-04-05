import React, { useState, useEffect } from 'react';
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

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const potResponse = await fetch(`http://192.168.1.102:3000/pots`);
      const plantResponse = await fetch(`http://192.168.1.102:3000/plants`);

      const potResults = await potResponse.json();
      const plantResults = await plantResponse.json();

      const combinedResults = [...potResults, ...plantResults];

      setData(combinedResults);
      setSearchResults(combinedResults);
    };

    fetchData();
  }, []);

  const handleSearch = text => {
    setSearchText(text);

    if (text) {
      const filteredResults = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(data);
    }
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
          Search
        </Text>
        <View></View>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetailScreen', { item })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: 270 }}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
              </View>
              <Image style={styles.itemImage} source={{ uri: item.image_url }} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
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
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    fontSize: 16
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
  itemImage: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10, // Rounded corners for images
  },
});

export default SearchScreen;