import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Order = ({order}) => {

  const navigation = useNavigation();

  const onPress = () => {

    navigation.navigate('Order', {id: order.id})
  };

  return (
    <Pressable 
      onPress={onPress}
      style={{flexDirection: 'row', margin: 10, alignItems: 'center',}}>
        <Image 
            source={{uri: order.Restaurant.image}} 
            style={{width: 75, height: 75, marginRight: 10,}} />
        <View>
            <Text style={{fontWeight: '600', fontSize: 16,}}>{order.Restaurant.name}</Text>
            <Text style={{marginVertical: 5, color: 'grey',}}>3 items &#8226; $ {order.total}</Text>
            <Text style={{color: 'grey',}}> &#8226; {order.status}</Text>
        </View>  
    </Pressable>
  );
};

export default Order;