import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([
    require('../../../assets/images/cay.png'),
    require('../../../assets/images/chaucay.png'),
    require('../../../assets/images/trees.png'),
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const pressToCart = () => {
    navigation.navigate('CartScreen');
  };

  const plants = [
    {
      id: 1,
      name: 'Cây 1',
      price: '100,000 VND',
      description: 'Cây xanh dễ chăm sóc',
      image: require('../../../assets/images/cay.png'),
      size: 'Medium',
      origin: 'Việt Nam',
      remaining: 5,
    },
    {
      id: 2,
      name: 'Cây 2',
      price: '150,000 VND',
      description: 'Cây phong thủy mang lại may mắn',
      image: require('../../../assets/images/cay.png'),
      size: 'Medium',
      origin: 'Việt Nam',
      remaining: 5,
    },
    {
      id: 3,
      name: 'Cây 3',
      price: '200,000 VND',
      description: 'Cây cảnh có hình dáng độc đáo',
      image: require('../../../assets/images/cay.png'),
      size: 'Medium',
      origin: 'Việt Nam',
      remaining: 5,
    },
  ];

  const pots = [
    {
      id: 1,
      name: 'Chậu 1',
      price: '50,000 VND',
      description: 'Chậu đất sứ cao cấp',
      image: require('../../../assets/images/chaucay.png'),
      size: 'Medium',
      origin: 'Việt Nam',
      remaining: 5,
    },
    {
      id: 2,
      name: 'Chậu 2',
      price: '70,000 VND',
      description: 'Chậu composite nhẹ và bền',
      image: require('../../../assets/images/chaucay.png'),
      size: 'Medium',
      origin: 'Lào',
      remaining: 5,
    },
    {
      id: 3,
      name: 'Chậu 3',
      price: '90,000 VND',
      description: 'Chậu gốm truyền thống',
      image: require('../../../assets/images/chaucay.png'),
      size: 'Medium',
      origin: 'Trung Quốc',
      remaining: 5,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.header}>Welcome to our Plant Shop!</Text>
        <TouchableOpacity style={styles.cartButton} onPress={pressToCart}>
          <Image
            style={styles.cartIcon}
            source={require('../../../assets/images/cart.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.slideshowContainer}>
        <Image
          source={images[currentImageIndex]}
          style={styles.slideshowImage}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Cây trồng</Text>
        <FlatList
          data={plants}
          keyExtractor={item => item.id.toString()}
          horizontal
          onPress={() => navigation.navigate('DetailScreen', {item})}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailScreen', {item})}>
              <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.price}</Text>
                <Text numberOfLines={2} style={styles.itemText}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Chậu cây trồng</Text>
        <FlatList
          data={pots}
          keyExtractor={item => item.id.toString()}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailScreen', {item})}>
              <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.price}</Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  slideshowContainer: {
    height: 200,
    marginBottom: 20,
  },
  slideshowImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  listContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default HomeScreen;
