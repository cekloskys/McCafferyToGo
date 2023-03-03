import { FlatList, View } from 'react-native';
import RestaurantItem from '../../components/RestaurantItem';
import styles from './styles';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant, User } from '../../models';
import { useAuthContext } from '../../context/AuthContext';
import {ALERT_TYPE, Dialog, Root} from "react-native-alert-notification";



export default function HomeScreen() {

  const { dbUser } = useAuthContext()
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try{
      const results = await DataStore.query(Restaurant);
      setRestaurants(results);

    } catch(error){
      console.log(error);
    }
    
  };
  console.log('DBuser');
  console.log(dbUser);

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

