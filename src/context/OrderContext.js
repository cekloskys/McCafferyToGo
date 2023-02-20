import { createContext, useContext, useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderDish, Basket, Restaurant, Dish } from '../models';
import { useAuthContext } from './AuthContext';
import { useBasketContext } from './BasketContext';

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {

        const { dbUser } = useAuthContext();
        const { restaurant, totalPrice, basketDishes, basket } = useBasketContext();

        const [orders, setOrders] = useState([]);
        const [finalOrders, setFinalOrders] = useState([]);
        const[finalOrderDishes, setFinalOrderDishes] = useState([]);

        useEffect(() => {
                DataStore.query(Order, o => o.userID.eq(dbUser.id)).then(setOrders);
        }, [dbUser]);

        useEffect(() => {
                const fetchRestaurants = async () => {
                        const restaurants = await DataStore.query(Restaurant);
                        setFinalOrders(
                                orders.map(order => ({
                                        ...order,
                                        Restaurant: restaurants.find(r => r.id == order.orderRestaurantId),
                                }))
                        );

                };
                fetchRestaurants();
        }, [orders]);

        const createOrder = async () => {
                //console.warn("abc");
                //create the prder
                const newOrder = await DataStore.save(
                        new Order({
                                userID: dbUser.id,
                                Restaurant: restaurant,
                                status: 'NEW',
                                total: totalPrice,
                        })
                );

                //add all the basketdishes to the order
                await Promise.all(
                        basketDishes.map((basketDish) =>
                                DataStore.save(
                                        new OrderDish({
                                                quantity: basketDish.quantity,
                                                orderID: newOrder.id,
                                                Dish: basketDish.Dish,
                                        })
                                )
                        )
                );
                //delete the basket
                // await DataStore.delete(basket)
                setOrders([...orders, newOrder]);
        };

        const getOrder = async (id) => {
                const order = await DataStore.query(Order, id);

                const orderDishes = await DataStore.query(OrderDish, (od) =>
                        od.orderID.eq(id));
                        //console.log('OrderDishes')
                        //console.log(orderDishes);

                const dishes = await DataStore.query(Dish);
                //console.log('Dishes')
                //console.log(dishes);
                const results = orderDishes.map(orderDish => ({
                        ...orderDish,
                        Dish: dishes.find(d => d.id == orderDish.orderDishDishId),
                })); 


                setFinalOrderDishes(results);
                console.log('Final Order Dishes')
                console.log(finalOrderDishes);


                const orderRestaurant = await DataStore.query(Restaurant, (r) =>
                        r.id.eq(order.orderRestaurantId));
                        //console.log(orderRestaurant);

                return {...order, dishes: finalOrderDishes, Restaurant: orderRestaurant }

        }

        return (
                <OrderContext.Provider value={{ createOrder, orders, getOrder, finalOrders, finalOrderDishes }}>
                        {children}
                </OrderContext.Provider>
        );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);