import React from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

const BasketItem = ({basketItem}) => {

  return (
    <View style={styles.row}>
        <View style={styles.quantityContainer}>
            <Text>1</Text>
        </View>
        <Text style={{fontWeight: '600',}}>{basketItem.name}</Text>
        <Text style={{marginLeft: 'auto',}}>$ {basketItem.price}</Text>
    </View>
  );
};

export default BasketItem;