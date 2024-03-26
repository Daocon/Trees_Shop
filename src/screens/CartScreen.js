import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cây 1',
      price: '100,000 VND',
      image: require('../../assets/images/cay.png'),
      quantity: 1,
    },
    {
      id: 2,
      name: 'Chậu 1',
      price: '50,000 VND',
      image: require('../../assets/images/chaucay.png'),
      quantity: 2,
    },
    // Các mục khác trong giỏ hàng...
  ]);

  const pressToBack = () => {
    navigation.goBack();
  };

  const pressToDeleteCart = () => {
    // Xóa tất cả các mục trong giỏ hàng
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(',', '')) * item.quantity,
    0,
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Giá: {item.price}</Text>
        <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
      </View>
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

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: {totalAmount} VND</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('CheckoutScreen')}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
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
  cartList: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
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
