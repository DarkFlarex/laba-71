import {useEffect} from 'react';
import UserDishesItem from "../../../components/UserComponents/UserDishesItem/UserDishesItem";
import {fetchDishes} from "../../../store/dishesThunks";
import Spinner from "../../../components/Spinner/Spinner";
import {Dish} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDishes, selectFetchDishesLoading} from "../../../store/dishesSlice";
import {addDish} from "../../../store/cartSlice";
import UserCart from "../../../components/UserComponents/UserCart/UserCart";

const UserDishes = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const dishesLoading = useAppSelector(selectFetchDishesLoading);

    const addDishToCart = (dish: Dish) => {
        dispatch(addDish(dish));
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <div className="row mt-2 d-flex justify-content-between">
            <div className="cards-cart col-6">
                <h4 className="text-start mb-3">Dishes</h4>
                {dishesLoading ? (
                    <Spinner/>
                ) : (
                    dishes.map((dish) => (
                        <UserDishesItem
                            key={dish.id}
                            dish={dish}
                            addToCart={()=>addDishToCart(dish)}
                        />
                    ))
                )}
            </div>
            <UserCart/>
        </div>
    );
};

export default UserDishes;