import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import orders from '../../../assets/data/orders.json';
import restaurants from '../../../assets/data/restaurants.json';
import BasketItem from '../../components/BasketItem';


const OrderDetailsHeader = ({order}) => {

  

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: order.Restaurant.image }}
        style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{order.Restaurant.name}</Text>
        <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>
        <Text style={styles.menu}> Your Orders</Text>
      </View>
    </View>
  );
};

const OrderDetailsScreen = () => {
  
  const route = useRoute();
  const id = route.params?.id;

  const order = orders[id - 1];

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants[0].dishes}
        renderItem={({ item }) => <BasketItem basketItem={item} />}
        ListHeaderComponent={() => <OrderDetailsHeader order={order}/>}
      />
    </View>

  );
};

export default OrderDetailsScreen;