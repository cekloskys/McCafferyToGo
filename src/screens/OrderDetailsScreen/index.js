import React from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import OrderItem from '../../components/OrderItem';
import { useEffect, useState } from 'react';
import { useOrderContext } from '../../context/OrderContext';


const OrderDetailsHeader = ({ order }) => {

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: order.Restaurant[0].image }}
        style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{order.Restaurant[0].name}</Text>
        <Text style={styles.subtitle}>Status: {order.status}</Text>
        <Text style={styles.menu}> Your Order</Text>
        <View style={styles.separator}></View>
      </View>
    </View>
  );
};

const OrderDetailsScreen = () => {
  const [order, setOrder] = useState();
  const [orderDishItems, setOrderDishItems] = useState()
  const { getOrder } = useOrderContext();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [])

  if (!order) {
    return <ActivityIndicator size={"large"} collor="grey" />
  }


  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
        data={order.dishes}
        renderItem={({ item }) => <OrderItem orderDish={item} />}
      />
    </View>

  );
};

export default OrderDetailsScreen;