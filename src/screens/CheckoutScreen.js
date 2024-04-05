import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    Button,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ConfirmSuc from '../constants/ConfirmSuc';

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const [address, setAddress] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const paymentMethods = [
        { id: 'wallet', name: 'Wallet', image: require('../../assets/images/wallet.png') },
        { id: 'ggpay', name: 'Google Pay', image: require('../../assets/images/ggpay.png') },
        { id: 'applepay', name: 'Apple Pay', image: require('../../assets/images/apple.png') },
        { id: 'amazon', name: 'Amazon', image: require('../../assets/images/amazon.png') },
    ];


    const handleCheckout = async () => {

        if (!address) {
            alert('Please provide an address.');
            return;
        }

        if (!selectedPaymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        const day = currentTime.getDate();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log(formattedTime);

        const dataBill = {
            address: address,
            paymentMethod: selectedPaymentMethod,
            cartItems: cartItems,
            totalAmount: totalAmount,
            time: formattedTime,
        }

        try {
            const response = await fetch('http://192.168.1.102:3000/billOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataBill),
            });

            if (response.ok) {
                console.log('Thanh toán thành công!');
                setIsPaymentSuccessful(true); // Hiển thị modal khi thanh toán thành công
            } else {
                console.error('Lỗi khi thanh toán:', response.status);
            }
        } catch (error) {
            console.error('Lỗi khi thực hiện thanh toán:', error);
        }

        // setIsPaymentSuccessful(true);
        // console.log('Checkout:', { address, selectedPaymentMethod, cartItems, totalAmount });
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
                    Checkout
                </Text>
                <View></View>
            </View>
            <Text style={styles.title}>Thanh toán</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Địa chỉ giao hàng"
            />
            <Text
                style={styles.title}>
                Please choose a payment method:
            </Text>
            {paymentMethods.map(method => (
                <TouchableOpacity
                    key={method.id}
                    style={[
                        styles.buttonPay,
                        selectedPaymentMethod === method.id && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedPaymentMethod(method.id)}
                >
                    <Image source={method.image} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>{method.name}</Text>
                </TouchableOpacity>
            ))}
            <View style={styles.totalContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.totalText}>Tổng tiền:</Text>
                    <Text style={styles.totalText}> {totalAmount} VND</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
            <ConfirmSuc
                isVisible={isPaymentSuccessful}
                onClose={() => {
                    setIsPaymentSuccessful(false);
                    // Chuyển hướng đến màn hình HomeScreen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainContainer' }],
                    });
                }}
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
    buttonPay: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 2,
        borderColor: 'lightsteelblue',
        backgroundColor: 'lightsteelblue',
        borderRadius: 5,
        marginBottom: 10,
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    selectedButton: {
        borderColor: 'green',
    },
    buttonImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 20,
        marginLeft: 10,
        marginBottom: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
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

export default CheckoutScreen;