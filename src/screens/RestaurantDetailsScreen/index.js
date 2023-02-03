import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, SectionList, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import restaurants from '../../../assets/data/restaurants.json';
import MenuItem from '../../components/MenuItem';
import Header from './header';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models';

const RestaurantDetailsScreen = () => {

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.id;
  var snacks = [];
  var breakfast = [];
  var drinks = [];
  var lunch = [];

  useEffect(() => {
    DataStore.query(Restaurant, id).then(setRestaurant);
    DataStore.query(Dish, (dish) => dish.restaurantID.eq(id)).then(setDishes);
    snacks = DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Snacks')
    ]));

    breakfast = DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Breakfast')
    ]));

    drinks = DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Drinks')
    ]));

    lunch = DataStore.query(Dish, 
      (d) => d.and(d => [
          d.restaurantID.eq(id),
          d.category.eq('Lunch')
    ]));


  }, []);

  

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
        sections={[
          { title: 'Breakfast', data: dishes },
          { title: 'Lunch', data: dishes },
          { title: 'Snacks', data: dishes },
          { title: 'Drinks', data: dishes }
        ]}
        renderItem={({ item }) => <MenuItem dish={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.completeContainer}>
            <View style={{ width: '70%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{section.title}</Text>
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