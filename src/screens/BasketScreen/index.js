import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import styles from './styles';
import restaurants from '../../../assets/data/restaurants.json';
import BasketItem from '../../components/BasketItem';
import SelectDropdown from 'react-native-select-dropdown';
import { useOrderContext } from '../../context/OrderContext';
import { useNavigation } from '@react-navigation/native';

const restaurant = restaurants[0];



const BasketScreen = () => {
    const { createOrder } = useOrderContext();
    const navigation = useNavigation();


    const timeSlots = ["8:15 am", "8:30 am", "8:45 am", "9:00 am"];

    const onCreateOrder = async () => {
        await createOrder();
        navigation.goBack();
    }
    return (
        <View style={styles.page}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <SelectDropdown

                data={timeSlots}
                defaultButtonText={'Select Pickup Time'}
                onSelect={(selectedItem, index) => {
                    setPickUp(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}

            />

            <View style={styles.separator}></View>

            <Text style={{ fontSize: 18, }}>Your Items</Text>
            <FlatList
                data={restaurant.dishes}
                renderItem={({ item }) => <BasketItem basketItem={item} />}
            />
            <View style={styles.separator}></View>




            <View style={styles.row}>
                <Text style={{ fontWeight: '600', color: 'grey' }}>Total</Text>

                <Text style={{ marginLeft: 'auto', color: 'grey' }}>$ 100</Text>
            </View>
            <Pressable onPress={createOrder} style={styles.button}>
                <Text style={styles.buttonText}>Create Order</Text>
            </Pressable>
        </View>
    );
};




export default BasketScreen;