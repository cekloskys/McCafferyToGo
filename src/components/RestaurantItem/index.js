import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';
import FitImage from 'react-native-fit-image';


const RestaurantItem = ({ restaurant }) => {

  const navigation = useNavigation();

  const onPress = () => {
    const id = restaurant.id;
    navigation.navigate('Restaurant', { id: id })
  };
  
  return (
    <Pressable style={styles.restaurantContainer} onPress={onPress}>
      <FitImage
        source={{ uri: restaurant.image }}
        style={styles.fitImage} 
        resizeMode='contain' />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            Pickup Hours: {restaurant.startHrs} - {restaurant.endHrs}
          </Text>
          <Text style={styles.subtitle}>
            Service Fee: ${restaurant.serviceFee?.toFixed(2)}
          </Text>
          <Text style={styles.subtitle}>
            Location: {restaurant.location}
          </Text>

        </View>

      </View>
    </Pressable>
  );
};

export default RestaurantItem;