import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectDeleteDishLoading, selectDishes, selectFetchDishesLoading} from "../../../store/dishesSlice";
import AdminDishesItem from "../../../components/Admincomponents/AdminDishesItem/AdminDishesItem";
import {deleteDish, fetchDishes} from "../../../store/dishesThunks";
import Spinner from "../../../components/Spinner/Spinner";
import {Link} from "react-router-dom";

const AdminDishes = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const dishesLoading = useAppSelector(selectFetchDishesLoading);
    const deleteLoading = useAppSelector(selectDeleteDishLoading);


    const removeDish = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this dish?')) {
            await dispatch(deleteDish(id));
            await dispatch(fetchDishes());
        }
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h5>Dishes</h5>
                <Link className="btn btn-success" to={'/admin/dishes/new-dish'}>Add new dish</Link>
            </div>
            <div className="cards">
                {dishesLoading ? (
                    <Spinner/>
                ) : dishes.length > 0 ?  (
                    dishes.map((dish) => (
                        <AdminDishesItem
                            key={dish.id}
                            dish={dish}
                            onDelete={() => removeDish(dish.id)}
                            deleteLoading={deleteLoading}
                        />
                    ))
                ) : (
                    <h5>Заказы пусты, заполните их</h5>
                )}
            </div>
        </>
    );
};

export default AdminDishes;