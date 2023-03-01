import React from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

const BasketItem = ({basketItem}) => {
  

  return (
    <View style={styles.row}>
        <View style={styles.quantityContainer}>
            <Text>{basketItem.quantity}</Text>
        </View>
        <Text style={{fontWeight: '600',}}>{basketItem?.Dish.name}</Text>
        <Text style={{marginLeft: 'auto',}}>$ {basketItem?.Dish.price.toFixed(2)}</Text>
    </View>
  );
};

export default BasketItem;