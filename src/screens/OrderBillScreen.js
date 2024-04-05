import React, { useState, useEffect } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    FlatList,
    View,
} from 'react-native';

const OrderBillScreen = ({ navigation }) => {
    const [billData, setBillData] = useState([]);

    const pressToBack = () => {
        // console.log(billData);
        navigation.goBack();
    };
    useEffect(() => {
        fetch('http://192.168.1.102:3000/billOrders')
            .then(response => response.json())
            .then(data => setBillData(data))
            .catch(error => console.error('Error fetching bill data:', error));
    }, []);

    const renderBillItem = ({ item }) => (
        <View style={styles.billItemContainer}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={styles.itemText}>Order ID: {item.id}</Text>
                    <Text style={styles.itemText}>{item.time}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', padding: 20, }}>
                {item.cartItems.map((cartItem, index) => (
                    <View key={index} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: cartItem.image_url }} style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                                marginBottom: 20,
                                borderRadius: 10,
                            }} />
                            <View>
                                <Text style={styles.itemTextList}>Item Name: {cartItem.name}</Text>
                                <Text style={styles.itemTextList}>Price: {cartItem.price}</Text>
                                <Text style={styles.itemTextList}>Quantity: {cartItem.quantity}</Text>
                            </View>
                        </View>
                        <View style={styles.line}></View>
                    </View>

                ))}
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemText}>Address: </Text>
                <Text style={styles.itemText}>{item.address}</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemText}>Total: </Text>
                <Text style={styles.itemText}>{item.totalAmount} VND</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"></StatusBar>

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
                        Order Bill
                    </Text>
                    <View></View>
                </View>

                <View>
                    {billData.length > 0 ? (
                        <>
                            <FlatList
                                data={billData}
                                keyExtractor={item => item.id.toString()}
                                renderItem={renderBillItem}
                            />
                        </>
                    ) : (
                        <View
                            style={{
                                marginTop: 100,
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require('../../assets/images/logotree.png')}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    billItemContainer: {
        backgroundColor: '#061530',
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    itemText: {
        fontFamily: 'Poppins-Regular',
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    itemTextList: {
        fontFamily: 'Poppins-Regular',
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    cartItemContainer: {
        marginTop: 10,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    itemDetails: {
        marginLeft: 10,
        flex: 1,
    },
    line: {
        height: 2,
        backgroundColor: '#ddd',
        marginVertical: 5,
    },
});

export default OrderBillScreen;
