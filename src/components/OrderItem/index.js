import React from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

const OrderItem = ({orderDish}) => {

  return (
    <View style={styles.row}>
        <View style={styles.quantityContainer}>
            <Text>{orderDish.quantity}</Text>
        </View>
        <Text style={{fontWeight: '600',}}>{orderDish.Dish.name}</Text>
        <Text style={{marginLeft: 'auto',}}>$ {orderDish.Dish.price}</Text>
    </View>
  );
};

export default OrderItem;