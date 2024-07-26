import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCartDishes from "./UserCartDishes";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {clearCart, selectCartDishes} from "../../../store/cartSlice";
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
            <>
                <UserCartDishes cartDishes={cartDishes} />
                <button
                    className="w-100 btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    Checkout
                </button>
            </>
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

    return (
        <>
            <h4>Cart</h4>
            {cart}
            <Modal show={showModal} title="Your Order" onClose={() => setShowModal(false)}>
                <div className="modal-body row">
                    {cartDishes.map(cartDish => (
                        <div className="col-12 d-flex align-items-center border rounded-2 p-2 mb-2" key={cartDish.dish.id}>
                            <h5 className="col-4">{cartDish.dish.title}</h5>
                            <span className="col-4">x{cartDish.amount}</span>
                            <span className="col-4">{(cartDish.dish.price * cartDish.amount)} KGS</span>
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
                        onClick={addOrder}                    >
                        Order
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default UserCart;
