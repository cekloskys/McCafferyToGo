import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, SectionList, Text, ActivityIndicator, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import MenuItem from '../../components/MenuItem';
import Header from './header';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models';
import { useBasketContext } from '../../context/BasketContext';

const RestaurantDetailsScreen = () => {

  const [restaurant, setRestaurant] = useState(null);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.id;

  const {setRestaurant: setBasketRestaurant, basket, basketDishes} = useBasketContext();
  
  useEffect(() => {
    
    setBasketRestaurant(null);
    DataStore.query(Restaurant, id).then(setRestaurant);
    
    DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Snacks')
    ])).then(setSnacks);

    DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Breakfast')
    ])).then(setBreakfast);

    DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Drinks')
    ])).then(setDrinks);

    DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Lunch')
    ])).then(setLunch);
  }, []);

  useEffect(() => { 
    if (!restaurant){
      return;
    }
    setBasketRestaurant(restaurant);
  }, [restaurant])

  if (!restaurant) {
    return (<ActivityIndicator size={"large"} style={{ alignContent: 'center' }} color="gray" />)
  }

  const onPress = () => {
    navigation.navigate('Restaurants');
  };

  return (
    <View style={styles.page}>
      <SectionList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        ListFooterComponent={() =>
          basket && (
            <Pressable onPress={() => navigation.navigate("Basket")} style={styles.button}>
              <Text style={styles.buttonText}>
                OPEN BASKET ({basketDishes.length})
              </Text>
            </Pressable>
            )
        }
        sections={[
          { title: 'Breakfast', data: breakfast },
          { title: 'Lunch', data: lunch },
          { title: 'Snacks', data: snacks },
          { title: 'Drinks', data: drinks }
        ]}
        renderItem={({ item }) => <MenuItem dish={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.completeContainer}>
            <View style={{ width: '70%' }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>{section.title}</Text>
            </View>
          </View>
        )}
      />
      <Ionicons
        name='arrow-back-circle'
        size={45}
        color='white'
        style={styles.iconContainer}
        onPress={onPress}
      />
    </View>
  );
};

export default RestaurantDetailsScreen;