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
        if (!restaurant && !finalBasketDishes) {
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
        
        const fetchDishes = async () => {
            const dishes = await DataStore.query(Dish); 
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
        

        const results = await DataStore.query(Basket,
            (b) => b.and(b => [
                b.restaurantID.eq(restaurant?.id),
                b.userID.eq(dbUser?.id)
            ]));
        setBasket(results[0]);

    }

    useEffect(() => {
        if (!dbUser && !restaurant){
            return;
        }
        getBasket();
    }, [dbUser, restaurant]);

    useEffect(() => {
        if (!basket){
            return;
        }
        if (basket) {
            
            DataStore.query(BasketDish, (bd) =>
                bd.basketID.eq(basket.id)).then(setBasketDishes);
        }
    }, [basket])

    const addDishToBasket = async (dish, quantity) => {
        
        let theBasket = basket || (await createNewBasket());

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

                userID: dbUser?.id,
                restaurantID: restaurant?.id
                
            }));
        setBasket(newBasket);
        return newBasket;
    };

    const deleteBasket = async () => {
        //delete the basket
        // await DataStore.delete(basket)
        // await DataStore.delete(order)
    };

    return (
        <BasketContext.Provider value={{ addDishToBasket, setRestaurant, restaurant, basket, basketDishes, finalBasketDishes, totalPrice, deleteBasket }}>
            {children}
        </BasketContext.Provider>
    )
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);