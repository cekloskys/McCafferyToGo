import { createContext, useState, useEffect, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { Basket, BasketDish, Dish } from '../models';
import { useAuthContext } from './AuthContext';

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();

    const [restaurant, setRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);
    const [basketDishes, setBasketDishes] = useState([]);
    const [finalBasketDishes, setFinalBasketDishes] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.0);

    const getTotalPrice = async () => {
        const total = finalBasketDishes.reduce(
            (sum, finalBasketDishes) => 
            sum + finalBasketDishes?.quantity * finalBasketDishes?.Dish.price, restaurant?.serviceFee);
        setTotalPrice(total);
    }

    useEffect(() => {
        if (!restaurant && finalBasketDishes) {
            return;
        }
        if (restaurant && finalBasketDishes) {
            getTotalPrice();
        }
    }, [restaurant, finalBasketDishes]);

    
    
    useEffect(() => {
        if (!basketDishes) {
            return;
        }
        // query all dishes
        const fetchDishes = async () => {
            if (!basketDishes) {
                return;
            }
            const dishes = await DataStore.query(Dish); // assign the products to the cart items
            setFinalBasketDishes(
                basketDishes.map(basketDish => ({
                    ...basketDish,
                    Dish: dishes.find(d => d.id == basketDish.basketDishDishId),
                }))
            );
        };
        fetchDishes();
    }, [basketDishes]);

    const getBasket = async () => {
        //DataStore.query(Basket, b =>
        //   b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)
        //).then(baskets => setBasket(baskets[0]));

        const results = await DataStore.query(Basket,
            (b) => b.and(b => [
                b.restaurantID.eq(restaurant.id),
                b.userID.eq(dbUser.id)
            ]));
        setBasket(results[0]);
        // console.log('Basket');
        // console.log(basket);
    }

    useEffect(() => {
        if (!dbUser && restaurant){
            return;
        }
        getBasket();
    }, [dbUser, restaurant]);

    useEffect(() => {
        if (!basket){
            return;
        }
        if (basket) {
            //DataStore.query(BasketDish, bd => bd.basketID("eq", basket.id)).then(setBasketDishes);
            DataStore.query(BasketDish, (bd) =>
                bd.basketID.eq(basket.id)).then(setBasketDishes);
        }
    }, [basket])

    const addDishToBasket = async (dish, quantity) => {
        //get the existing basket or create a new one
        let theBasket = basket || (await createNewBasket());
        // console.log('The Basket');
        // console.log(theBasket);
        // console.log('The Basket ID');
        // console.log(theBasket.id);
        //create a basketdish item and save to data store
        const newDish = await DataStore.save(new BasketDish({
            quantity,
            Dish: dish,
            basketID: theBasket.id
        }));
        setBasketDishes([...basketDishes, newDish])
    };

    const createNewBasket = async () => {
        const newBasket = await
            DataStore.save(new Basket({
                userID: dbUser.id,
                restaurantID: restaurant.id
                //pickUpTime: '10:00 am'
            }));
        setBasket(newBasket);
        return newBasket;
    };

    return (
        <BasketContext.Provider value={{ addDishToBasket, setRestaurant, restaurant, basket, basketDishes, finalBasketDishes, totalPrice }}>
            {children}
        </BasketContext.Provider>
    )
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);