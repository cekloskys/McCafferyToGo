import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import Order from '../../components/Order';
import { useOrderContext } from '../../context/OrderContext';

const OrdersScreen = () => {
  const {finalOrders} = useOrderContext();
  //console.log(finalOrders);

    return (
      
        <View style={{flex: 1, width: '100%'}}>
          <FlatList
          data={finalOrders}
          renderItem={({item}) => <Order order={item}/>}
          />
        </View>
      );
};

export default OrdersScreen;