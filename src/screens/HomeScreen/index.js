import { FlatList, View } from 'react-native';
import RestaurantItem from '../../components/RestaurantItem';
import styles from './styles';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { useAuthContext } from '../../context/AuthContext';
import {ALERT_TYPE, Dialog, Root} from "react-native-alert-notification";
import { Restaurant, Dish } from '../../models';



export default function HomeScreen() {

  const { dbUser } = useAuthContext()
  const [restaurants, setRestaurants] = useState([]);


  const fetchRestaurants = async () => {
    try {
      let results = await DataStore.query(Restaurant);
      let dishes = await DataStore.query(Dish);
      let uniqueDishes = new Set();
      for (const dish of dishes) {
        uniqueDishes.add(dish.restaurantID);
      } 
      const display = [];
      for (const uq of uniqueDishes) {
        let rest = results.find(r => r.id == uq)
        if (rest.name) {
          display.push(rest);
        }
      } 
      setRestaurants(display);


    } catch (error) {
      console.log(error);
    }

  };
;


  useEffect(() => {
    fetchRestaurants();
  }, []);
const displayNotifacation = () => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Welcome',
    textBody: 'Dont forget to input your name and email into the profile screen please.',
    button: 'Close', 
  });
}
  useEffect(() => {
    if(!dbUser) {
      console.log('Effect');
     displayNotifacation();
    }
  }, []);

  return (
    <View style={styles.page}>

      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false} />
    </View>
  );
}

