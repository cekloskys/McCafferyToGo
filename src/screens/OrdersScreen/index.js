import { View, FlatList, Text, Pressable, RefreshControl, ScrollView } from 'react-native';
import styles from './styles';
import OrderComponent from '../../components/Order';
import { useOrderContext } from '../../context/OrderContext';
import { useCallback, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, Restaurant } from '../../models';
import { useAuthContext } from '../../context/AuthContext';


const OrdersScreen = () => {
  const { finalOrders, setFinalOrders } = useOrderContext();
  const { dbUser } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const orders = await DataStore.query(Order, o => o.userID.eq(dbUser.id));
      const restaurants = await DataStore.query(Restaurant);
      setFinalOrders(
        orders.map(order => ({
          ...order,
          Restaurant: restaurants.find(r => r.id == order.orderRestaurantId),
        }))
      );
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);




  return (

    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={finalOrders}
        renderItem={({ item }) => <OrderComponent order={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}> Check Status</Text>
      </Pressable>

    </View>

  );


};

export default OrdersScreen;