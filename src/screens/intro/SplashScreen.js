import React, {useEffect} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar
        backgroundColor={'#ffffff'}
        barStyle="dark-content"></StatusBar>
      <Image
        source={require('../../../assets/photos/logotree.png')}
        style={{width: 189, height: 189}}
      />
    </View>
  );
};

export default SplashScreen;
