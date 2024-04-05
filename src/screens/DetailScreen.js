import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { addItem } from '../redux/action';

const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { item } = route.params;


  const pressToBack = () => {
    navigation.goBack();
  };
  const pressToCart = () => {
    navigation.navigate('CartScreen');
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity style={styles.button} onPress={pressToBack}>
            <Image source={require('../../assets/images/back.png')}></Image>
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
          Detail
        </Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={pressToCart}>
            <Image source={require('../../assets/images/cart.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={{ uri: item.image_url }} style={styles.image} />
      <ScrollView style={styles.detailsContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price} VND</Text>
        </View>
        <Text style={styles.detailInfor}>Thông tin chi tiết</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.row}>
            <Text style={styles.size}>Size</Text>
            <Text style={styles.size}>{item.size}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.row}>
            <Text style={styles.origin}>Origin</Text>
            <Text style={styles.origin}>{item.origin}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.row}>
            <Text style={styles.quantity}>Quantity</Text>
            <View style={styles.row}>
              <Text style={styles.quantity}>Còn </Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.quantity}> sp</Text>
            </View>
          </View>
          <View style={styles.line}></View>
        </View>
        <Text style={styles.detailInfor}>Mô tả</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, width: '100%', left: 20, backgroundColor: 'mistyrose' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ marginBottom: 5 }}>Đã chọn {quantity} sản phẩm</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={decreaseQuantity} style={{ backgroundColor: 'grey', borderRadius: 4, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white' }}>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 20, fontSize: 20 }}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={{ backgroundColor: 'grey', borderRadius: 4, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
            <View style={{ alignItems: 'flex-end', marginBottom: 5 }}>
              <Text>Tạm tính</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, color: 'green' }}>{item.price * quantity} VND</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.buttonAddToCart, quantity === 0 ? { backgroundColor: 'gray' } : { backgroundColor: 'green' }]}
          onPress={() => dispatch(addItem(item))}
          disabled={quantity === 0}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  buttonAddToCart: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
    marginBottom: 10,
  },
  detailInfor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
  size: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
  origin: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
  quantity: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
});
export default DetailScreen;
