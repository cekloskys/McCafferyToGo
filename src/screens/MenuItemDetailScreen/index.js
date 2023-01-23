import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import styles from './styles';
import restaurants from '../../../assets/data/restaurants.json';

const MenuItemDetailScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const dish = restaurants[0].dishes[id - 1];

  const [quantity, setQuantity] = useState(1);

  const onMinus = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotalPrice = () => {
    return dish.price * quantity;
  };

  const onPress = () => {
    navigation.navigate('Basket');
  };

    return (
        <View style={styles.page}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.description}>{dish.description}</Text>
          <View style={styles.separator}></View>
          <View style={styles.row}>
            <AntDesign
                name='minuscircleo'
                size={60}
                color='black'
                onPress={onMinus}
            />
            <Text style={styles.quantity}>{quantity}</Text>
            <AntDesign
                name='pluscircleo'
                size={60}
                color='black'
                onPress={onPlus}
            />
        </View>
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Add {quantity} To Basket &#8226; $ {getTotalPrice().toFixed(2)}</Text>
        </Pressable>
        </View>
      );
};

export default MenuItemDetailScreen;