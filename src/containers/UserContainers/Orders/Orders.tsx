import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Spinner from '../../../components/Spinner/Spinner';
import { deleteOrder, fetchOrders } from '../../../store/dishesThunks';
import {selectDeleteOrderLoading, selectFetchOrdersLoading, selectOrders} from '../../../store/ordersSlice';
import { toast } from "react-toastify";
import ButtonSpinner from "../../../components/Spinner/ButtonSpinner";

const Orders: React.FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const loading = useAppSelector(selectFetchOrdersLoading);
    const deleteLoading = useAppSelector(selectDeleteOrderLoading);

    const removeOrder = async (id: string) => {
        try {
            if (window.confirm('Are you sure you want to delete this order?')) {
                await dispatch(deleteOrder(id)).unwrap();
                await dispatch(fetchOrders()).unwrap();
                toast.success('Order deleted');
            }
        } catch (error) {
            toast.error('Could not delete Order!');
        }
    };

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const delivery = 150;

    return (
        <div className="row mt-2">
            <div className="col">
                <h4 className="mb-2">Orders</h4>
                {loading ? (
                    <Spinner />
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="card mb-2 d-flex">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="col-6">
                                    {order.dishes.map((cartDish, id) => (
                                        <div key={id} className="d-flex justify-content-between mb-2">
                                            <span>{cartDish.amount} x {cartDish.dish.title}</span>
                                            <span>
                                                <strong>
                                                    {cartDish.amount * cartDish.dish.price} KGS
                                                </strong>
                                            </span>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Delivery</span>
                                        <strong>{delivery} KGS</strong>
                                    </div>
                                </div>
                                <div className="d-flex flex-column col-3">
                                    <span>Order total:</span>
                                    <strong>{order.totalPrice} KGS</strong>
                                    <button
                                        className="btn btn-danger mt-2"
                                        onClick={() => removeOrder(order.id)}
                                        disabled={deleteLoading === order.id}
                                    >
                                        {deleteLoading && deleteLoading === order.id && (<ButtonSpinner/>)}
                                        Complete Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;