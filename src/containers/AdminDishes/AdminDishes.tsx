import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDeleteDishLoading, selectDishes, selectFetchDishesLoading} from "../../store/dishesSlice";
import AdminDishesItem from "../../components/AdminDishesItem/AdminDishesItem";
import {deleteDish, fetchDishes} from "../../store/dishesThunks";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";

const AdminDishes = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const dishesLoading = useAppSelector(selectFetchDishesLoading);
    const deleteLoading = useAppSelector(selectDeleteDishLoading);


    const removeDish = async (id: string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h5>Dishes</h5>
                <Link className="btn btn-success" to={'/admin/dishes/new-dishes'}>Add new dish</Link>
            </div>
            {dishesLoading ? (
                <Spinner/>
            ) : (
                dishes.map((dish) => (
                    <AdminDishesItem
                        key={dish.id}
                        dish={dish}
                        onDelete={() => removeDish(dish.id)}
                        deleteLoading={deleteLoading}
                    />
                ))
            )}
        </>
    );
};

export default AdminDishes;