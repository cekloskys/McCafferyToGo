import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';

const RestaurantItem = ({restaurant}) => {

  const navigation = useNavigation();

  const onPress = () => {
    const id=restaurant.id;
    navigation.navigate('Restaurant', {id: id})
  };
// $ {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} minutes &#8226;
  return (
    <Pressable style={styles.restaurantContainer} onPress={onPress}>
        <Image 
          source={{uri: restaurant.image}} 
          style={styles.image} />
        <View style={styles.row}>
            <View>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.subtitle}>
                 {restaurant.startHrs} - {restaurant.endHrs} &#8226; ${restaurant.serviceFee} &#8226; {restaurant.location}
                </Text>
                
            </View>
            
        </View>           
    </Pressable>
  );
};

export default RestaurantItem;