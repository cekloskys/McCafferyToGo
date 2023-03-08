import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import styles from './styles';
import BasketItem from '../../components/BasketItem';
import { useBasketContext } from '../../context/BasketContext';
import { useOrderContext } from '../../context/OrderContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const BasketScreen = () => {
    const { createOrder } = useOrderContext();

    const { restaurant, finalBasketDishes, totalPrice, deleteBasket } = useBasketContext();
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    const navigation = useNavigation();

    function showTimePicker() {
        setTimePicker(true);
    };

    function onTimeSelected(event, value) {
        const currentTime = value || time;
        let tempTime = new Date(currentTime);
        let hours = tempTime.getHours();
        let minutes = tempTime.getMinutes();
        let timeValue = "" + ((hours > 12) ? hours - 12 : hours);
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        timeValue += (hours >= 12) ? " PM" : " AM";
        setSelectedTime(timeValue);
        setTimePicker(false);
    };
    
    const onDeleteBasket = () => {
        deleteBasket();
        navigation.navigate('Restaurants');
        alert('Basket deleted.')
    };

    const validateOrder = () => {
        
        if (!selectedTime) {
            alert('Please select a pick up time between ' + restaurant.startHrs + ' and ' +
                restaurant.endHrs);
            return
        }

        const startHrs = restaurant.startHrs.split(':');
        const startMins = startHrs[1].split(' ');

        const endHrs = restaurant.endHrs.split(':');
        const endMins = endHrs[1].split(' ');

        const selectedHrs = selectedTime.split(':');
        const selectedMins = selectedHrs[1].split(' ');

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const selected = new Date ((month + 1) + '/' + day + '/' + year + ' ' + 
            selectedHrs[0] + ':' + selectedMins[0] + ':00' + ' ' + selectedMins[1] + 'UTC+0000');
        const end = new Date ((month + 1) + '/' + day + '/' + year + ' ' + 
            endHrs[0] + ':' + endMins[0] + ':00' + ' ' + endMins[1] + 'UTC+0000');
        const start = new Date ((month + 1) + '/' + day + '/' + year + ' ' + 
            startHrs[0] + ':' + startMins[0] + ':00' + ' ' + startMins[1] + 'UTC+0000');

        if (selected < start || selected > end){
            alert('Please select a pick up time between ' + restaurant.startHrs + ' and ' +
                restaurant.endHrs);
            return;
        } 

        createOrder(selectedTime);
    }
    console.log('Final Basket Dishes');
    console.log(finalBasketDishes);
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
                        <Text style={styles.buttonText}>{!selectedTime ? 'SELECT PICKUP TIME' : 
                            'PICKUP TIME: ' + (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear() + ' ' + selectedTime}</Text>
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
            <Pressable onPress={validateOrder} style={styles.button}>
                <Text style={styles.buttonText}>CREATE ORDER</Text>
            </Pressable>
            <Pressable onPress={onDeleteBasket} style={styles.cancelbutton} >
                <Text style={styles.buttonText}>DELETE BASKET</Text>
            </Pressable>
        </View>
    );
};

export default BasketScreen;