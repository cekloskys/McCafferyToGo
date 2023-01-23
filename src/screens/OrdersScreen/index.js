import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import Order from '../../components/Order';
import orders from '../../../assets/data/orders.json';

const OrdersScreen = () => {

    return (
      
        <View style={{flex: 1, width: '100%'}}>
          <Text style={{textDecoration: 'solid', color: 'red', textAlign: 'center', marginVertical: 50, fontSize: 25}}>Welcome To Your Orders!</Text>
          <FlatList
          data={orders}
          renderItem={({item}) => <Order order={item}/>}
          />
        </View>
      );
};

export default OrdersScreen;