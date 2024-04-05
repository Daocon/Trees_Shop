import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, addItem, saveCartItems, saveTotalAmount } from '../redux/action';

const CartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();


  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(',', '')) * item.quantity,
    0,
  );

  console.log(cartItems, totalAmount);

  const pressToBack = () => {
    navigation.goBack();
  };

  const pressToDeleteCart = () => {
    Alert.alert(
      "Delete all items",
      "Are you sure you want to delete all items from the cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => dispatch(clearCart()) }
      ],
      { cancelable: false }
    );
  };

  const pressToCheckout = () => {
    dispatch(saveCartItems(cartItems));
    dispatch(saveTotalAmount(totalAmount));
    navigation.navigate('CheckoutScreen');
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image_url }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Giá: {item.price}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => dispatch(removeItem(item))} style={{ backgroundColor: 'grey', borderRadius: 4, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: 'white' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 20, fontSize: 20 }}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => dispatch(addItem(item))} style={{ backgroundColor: 'grey', borderRadius: 4, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(removeItem(item))}>
          <Image source={require('../../assets/images/delete.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity style={styles.button} onPress={pressToBack}>
            <Image source={require('../../assets/images/back.png')} />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}>Giỏ hàng</Text>

        <View>
          <TouchableOpacity style={styles.button} onPress={pressToDeleteCart}>
            <Image source={require('../../assets/images/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {cartItems.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../assets/images/logotrees.png')} style={{ width: 200, height: 200 }} />
          <Text style={{ fontSize: 20, color: 'black' }}>Bạn hãy mua gì đó rồi quay lại đây nha</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />


          <View style={styles.totalContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.totalText}>Tổng tiền:</Text>
              <Text style={styles.totalText}> {totalAmount} VND</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={pressToCheckout}>
              <Text style={styles.checkoutButtonText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    lineHeight: 36,
    fontWeight: '600',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  buttonAddToCart: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    marginBottom: 10
  },
  cartList: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  itemImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    marginBottom: 5,
  },
  itemQuantity: {
    color: '#666',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CartScreen;
