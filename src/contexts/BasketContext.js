import { createContext, useState, useEffect, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { Basket, BasketDish } from '../models';

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
    // const {dbUser} = useAuthContext();

    const [restaurant, setRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);

    useEffect(() => {
        DataStore.query(Basket, b => 
            b.restaurantID("eq", restaurant.id).userID("eq") //, dbUser.id
        ).then(baskets => setBasket(baskets[0]));
    }, [restaurant]) //[dbUser, restaurant])


    const addDishToBasket = (dish, quantity) => {
        //get the existing basket or create a new one



        //create a basketdish item and save to data store



    }
    return (
        <BasketContext.Provider value={{ addDishToBasket, setRestaurant }}>
            {children}
        </BasketContext.Provider>
    )
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);