import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import restaurants from '../../../assets/data/restaurants.json';
import BasketItem from '../../components/BasketItem';

const restaurant = restaurants[0];


const BasketScreen = () => {

  return (
    <View style={styles.page}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={{fontSize: 18,}}>Your Items</Text>
        <FlatList 
            data={restaurant.dishes}
            renderItem={({item}) => <BasketItem basketItem={item} />}
        />
        <View style={styles.separator}></View>
        <View style={styles.row}>
            <Text style={{fontWeight: '600', color: 'grey'}}>Subtotal</Text>
            <Text style={{marginLeft: 'auto', color: 'grey'}}>$ 100</Text>
        </View>
        <View style={styles.row}>
            <Text style={{fontWeight: '600', color: 'grey'}}>Total</Text>
            
            <Text style={{marginLeft: 'auto', color: 'grey'}}>$ 100</Text>
        </View>
        <View style={styles.button}>
            <Text style={styles.buttonText}>Create Order</Text>
        </View>
    </View>
  );
};




export default BasketScreen;