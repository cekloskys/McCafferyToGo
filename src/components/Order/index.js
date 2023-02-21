import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { OrderDish } from '../../models';

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
            <Text style={{marginVertical: 5, color: 'grey',}}>{order.OrderDish?.quantity} items &#8226; ${order.total.toFixed(2)}</Text>
            <Text style={{color: 'grey',}}>{order.status}</Text>
        </View>  
    </Pressable>
  );
};

export default Order;