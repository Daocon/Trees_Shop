import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
} from 'react-native';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Hàm xử lý khi người dùng thay đổi nội dung của ô tìm kiếm
  const handleSearch = text => {
    setSearchText(text);
    // Thực hiện tìm kiếm dựa trên nội dung nhập vào và cập nhật kết quả tìm kiếm
    // Ở đây chỉ là ví dụ, bạn cần thay đổi hàm này để phù hợp với logic tìm kiếm của bạn
    const results = []; // Thay thế bằng logic tìm kiếm thực tế
    setSearchResults(results);
  };

  const pressToBack = () => {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          {/* <TouchableOpacity style={styles.button} onPress={pressToBack}>
            <Image source={require('../../../assets/images/back.png')}></Image>
          </TouchableOpacity> */}
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item}</Text>{' '}
            {/* Thay {item} bằng dữ liệu bạn muốn hiển thị từ kết quả tìm kiếm */}
          </View>
        )}
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

export default SearchScreen;
