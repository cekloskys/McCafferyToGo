import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import styles from './styles';
import { DataStore } from 'aws-amplify';
import { Dish } from '../../models';
import { useBasketContext } from '../../context/BasketContext';

const MenuItemDetailScreen = () => {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const {addDishToBasket} = useBasketContext();
  //const dish = restaurants[0].dishes[id - 1];
  //console.warn(id);
  
  useEffect (() => {
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
    
  }, [id]);

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

  if (!dish) {
    return <ActivityIndicator size={"large"} color="gray" />
  }

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    //navigation.navigate('Basket');
    navigation.goBack();
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
        <Pressable style={styles.button} onPress={onAddToBasket}>
            <Text style={styles.buttonText}>Add {quantity} To Basket &#8226; $ {getTotalPrice().toFixed(2)}</Text>
        </Pressable>
        </View>
      );
};

export default MenuItemDetailScreen;