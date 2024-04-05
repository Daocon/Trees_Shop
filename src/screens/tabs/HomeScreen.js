import React, { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { addItem } from '../../redux/action';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [images, setImages] = useState([
    require('../../../assets/images/back1.webp'),
    require('../../../assets/images/back2.jpg'),
    require('../../../assets/images/back3.jpg'),
    require('../../../assets/images/back4.jpg'),
    require('../../../assets/images/back6.jpg'),
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [plants, setplants] = useState([])
  const [pots, setpots] = useState([])
  const [numPotsToShow, setNumPotsToShow] = useState(4);
  const [isPotsExpanded, setIsPotsExpanded] = useState(false);
  const [isPlantsExpanded, setIsPlantsExpanded] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchDataPlants();
    fetchDataPots();
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 2000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true
          }
        )
      ])
    ).start();

    Animated.loop(
      Animated.timing(
        rotateAnim,
        {
          toValue: 1,
          duration: 3000, // Thời gian xoay là 2 giây
          useNativeDriver: true
        }
      )
    ).start();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const pressToCart = () => {
    navigation.navigate('CartScreen');
  };

  //fetch data plants 
  const fetchDataPlants = async () => {
    try {
      const response = await fetch('http://192.168.1.102:3000/plants');
      const json = await response.json();
      setplants(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetch data pots
  const fetchDataPots = async () => {
    try {
      const response = await fetch('http://192.168.1.102:3000/pots');
      const json = await response.json();
      setpots(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleViewMoreOrLessPots = () => {
    if (isPotsExpanded) {
      setNumPotsToShow(4);
      setIsPotsExpanded(false);
    } else {
      setNumPotsToShow(pots.length);
      setIsPotsExpanded(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        barStyle="dark-content"></StatusBar>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Animated.Text style={{ ...styles.header, opacity: fadeAnim }}>Welcome to our Plant Shop!</Animated.Text>
        <TouchableOpacity style={styles.cartButton} onPress={pressToCart}>
          <Animated.Image
            style={{ ...styles.cartIcon, transform: [{ rotate: rotateInterpolate }] }}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.listTitle}>Cây trồng</Text>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => setIsPlantsExpanded(!isPlantsExpanded)}>
            <Text style={styles.viewMoreText}>
              {isPlantsExpanded ? 'Collapse' : 'View More'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={isPlantsExpanded ? plants : plants.slice(0, 4)}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Add this line
          key={2} // Add this line
          onPress={() => navigation.navigate('DetailScreen', { item })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailScreen', { item })}>
              <View style={styles.itemContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={styles.itemImage} source={{ uri: item.image_url }} />
                </View>
                <Text numberOfLines={1} style={styles.itemTextName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.itemTextDes}>
                  {item.description}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.itemTextPrice}>{item.price} VND</Text>
                  <TouchableOpacity onPress={() => dispatch(addItem(item))}>
                    <Image
                      style={styles.cartIconItem}
                      source={require('../../../assets/images/cart.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.listContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.listTitle}>Chậu cây trồng</Text>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={handleViewMoreOrLessPots}>
            <Text style={styles.viewMoreText}>
              {isPotsExpanded ? 'Collapse' : 'View More'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pots.slice(0, numPotsToShow)}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { item })}>
              <View style={styles.itemContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={styles.itemImage} source={{ uri: item.image_url }} />
                </View>
                <Text numberOfLines={1} style={styles.itemTextName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.itemTextDes}>
                  {item.description}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text style={styles.itemTextPrice}>{item.price}</Text>
                  <TouchableOpacity onPress={() => dispatch(addItem(item))}>
                    <Image
                      style={styles.cartIconItem}
                      source={require('../../../assets/images/cart.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8', // Lighter background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333', // Darker text color
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
    color: '#333', // Darker text color
  },
  itemContainer: {
    backgroundColor: '#fff', // White background for items
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 170,
    height: 220,
    marginBottom: 20,
    shadowColor: "#000", // Add shadow for 3D effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Darker text color
  },
  cartIconItem: {
    width: 40,
    height: 40,
    backgroundColor: 'green',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  itemTextPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green', // Darker text color
    marginBottom: 5,
    marginRight: 10,
  },
  itemTextDes: {
    fontSize: 12,
    color: '#333', // Darker text color
    marginBottom: 5,
  },
  itemTextName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginBottom: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10, // Rounded corners for images
  },
  viewMoreButton: {
    backgroundColor: '#333',
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 12,
  },
  button: {
    width: 50,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
