import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserCartDishes from "./UserCartDishes";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {clearCart, selectCartDishes, updateDishAmount} from "../../../store/cartSlice";
import Modal from "../Modal/Modal";
import axiosApi from "../../../axiosApi";
import {toast} from "react-toastify";

const UserCart: React.FC= () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const cartDishes = useAppSelector(selectCartDishes);

    let cart = (
        <div className="alert alert-primary">Cart is empty! Add something!</div>
    );

    if (cartDishes.length > 0) {
        cart = (
            <div className="alert border rounded-2">
                <UserCartDishes cartDishes={cartDishes} />
                <div className="text-end">
                    <button
                        className="w-25 btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        );
    }

    const total = cartDishes.reduce((sum, cartDish) => {
        return sum + cartDish.amount * cartDish.dish.price;
    }, 0);
    const delivery = 150;
    const totalPrice = total + delivery;

    const addOrder = async () => {
        try {
            await axiosApi.post('/orders.json', {
                dishes: cartDishes,
                delivery,
                totalPrice
            });
            dispatch(clearCart());
            toast.success('Order placed successfully!');
            setShowModal(false);
            navigate('/');
        } catch (error) {
            toast.error(`Failed to place order:`);
        }
    };

    const RemoveDishFromOrder = (dishId: string) => {
        dispatch(updateDishAmount(dishId));
    };

    useEffect(() => {
        if (cartDishes.length === 0 && showModal) {
            setShowModal(false);
        }
    }, [cartDishes, showModal]);

    return (
        <div className="cart col-6">
            <h4 className="text-start mb-3">Cart</h4>
            {cart}
            <Modal show={showModal} title="Your Order" onClose={() => setShowModal(false)}>
                <div className="modal-body row">
                    {cartDishes.map(cartDish => (
                        <div className=" d-flex col-12 align-items-center border rounded-2 p-2 mb-2"
                             key={cartDish.dish.id}>
                            <h5 className="col-4">{cartDish.dish.title}</h5>
                            <span className="col-3">x{cartDish.amount}</span>
                            <span className="col-3">{(cartDish.dish.price * cartDish.amount)} KGS</span>
                            <button
                                className="btn col-2 btn-danger btn-sm ml-2"
                                onClick={() => RemoveDishFromOrder(cartDish.dish.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="row align-items-center">
                        <span>Delivery: <strong>{delivery}</strong></span>
                        <strong>Total: {totalPrice}</strong>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={addOrder}
                    >
                        Order
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default UserCart;
