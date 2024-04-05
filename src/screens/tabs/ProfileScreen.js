import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const pressToBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            dispatch(clearUser());
            pressToLogout();
          }
        },
      ],
      { cancelable: false },
    );
  };

  const pressToLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const handleToOrder = () => {
    navigation.navigate('OrderBillScreen');
  }

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
          Profile
        </Text>
        <View></View>
      </View>
      {/* Ảnh đại diện, tên, email */}
      <View style={styles.profileInfo}>
        <Image
          source={require('../../../assets/images/logoauth.png')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      {/* Phần chung */}
      <View style={styles.section}>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleToOrder}>
          <Text style={styles.buttonText}>Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Q & A</Text>
        </TouchableOpacity>
      </View>

      {/* Điều khoản và bảo mật */}
      <View style={styles.section}>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Chính sách và quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={[styles.buttonText, styles.logoutText]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    color: 'red',
  },
});

export default ProfileScreen;
