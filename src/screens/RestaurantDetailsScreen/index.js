import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, SectionList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import restaurants from '../../../assets/data/restaurants.json';
import MenuItem from '../../components/MenuItem';
import Header from './header';

const RestaurantDetailsScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.id;

  const restaurant = restaurants[id - 1];

  

  const onPress = () => {
    navigation.navigate('Restaurants');
  };

  return (
    <View style={styles.page}>

      <SectionList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        sections={[
          { title: 'Breakfast', data: restaurant.dishes},
          { title: 'Lunch', data: restaurant.dishes},
          { title: 'Snacks', data: restaurant.dishes},
          { title: 'Beverages', data: restaurant.dishes}
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