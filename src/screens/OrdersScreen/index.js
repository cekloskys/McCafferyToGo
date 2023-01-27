import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import Order from '../../components/Order';
import orders from '../../../assets/data/orders.json';

const OrdersScreen = () => {

    return (
      
        <View style={{flex: 1, width: '100%'}}>
          <FlatList
          data={orders}
          renderItem={({item}) => <Order order={item}/>}
          />
        </View>
      );
};

export default OrdersScreen;