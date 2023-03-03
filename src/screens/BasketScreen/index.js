import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import styles from './styles';
import BasketItem from '../../components/BasketItem';
import SelectDropdown from 'react-native-select-dropdown';
import { useBasketContext } from '../../context/BasketContext';
import { useOrderContext } from '../../context/OrderContext';
import DateTimePicker from '@react-native-community/datetimepicker';


const BasketScreen = () => {
    const { createOrder } = useOrderContext();

    const { restaurant, finalBasketDishes, totalPrice, deleteBasket } = useBasketContext();
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    function showTimePicker() {
        setTimePicker(true);
    };

    function onTimeSelected(event, value) {
        
        setTime(value);
        const t = JSON.stringify(time);
        console.log(t);
        var timeNew = t[1].split('T');
        console.log(timeNew);
        var hours = timeNew[0];
        var minutes = timeNew[1];
        var timeValue = "" + ((hours > 12) ? hours - 12 : hours);
        timeValue += (minutes < 10) ? ":0" : ":" + minutes;
        timeValue += (hours >= 12) ? " PM" : " AM";
        console.log(timeValue);
        setTimePicker(false);
    };
    //console.log(time);

    const Validation = () => {
        if (!time) {
            alert('Please select a start time.');
            return
        }
    }


    const timeSlots = ["8:15 am", "8:30 am", "8:45 am", "9:00 am"];

    return (
        <View style={styles.page}>
            <Text style={styles.name}>{restaurant?.name}</Text>
            {timePicker && (
                <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={false}
                    onChange={onTimeSelected}

                />
            )}
            {!timePicker && (
                <View>
                    <Pressable onPress={showTimePicker} style={styles.button}>
                        <Text style={styles.buttonText}>Select Pickup Time</Text>
                    </Pressable>
                </View>
            )}
            <View style={styles.separator}></View>
            <Text style={{ fontSize: 18, }}>Your Items</Text>
            <FlatList
                data={finalBasketDishes}
                renderItem={({ item }) => <BasketItem basketItem={item} />}
            />
            <View style={styles.separator}></View>
            <View style={styles.row}>
                <Text style={{ fontWeight: '600', color: 'grey' }}>Total</Text>
                <Text style={{ marginLeft: 'auto', color: 'grey' }}>$ {totalPrice.toFixed(2)}</Text>
            </View>
            <Pressable onPress={createOrder} style={styles.button}>
                <Text style={styles.buttonText}>Create Order</Text>
            </Pressable>
            <View></View>
            <Pressable onPress={deleteBasket} style={styles.cancelbutton} >
                <Text style={styles.buttonText}>Delete Order</Text>
            </Pressable>
        </View>
    );
};

export default BasketScreen;