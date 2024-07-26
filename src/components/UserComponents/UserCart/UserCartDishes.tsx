import React from 'react';
import {CartDish} from "../../../types";
import UserCartItems from "./UserCartItems";


interface Props {
    cartDishes: CartDish[];
}

const UserCartDishes: React.FC<Props> = ({ cartDishes }) => {

    const total = cartDishes.reduce((sum, cartDish) => {
        return sum + cartDish.amount * cartDish.dish.price;
    }, 0);

    return (
        <>
            {cartDishes.map((cartDish) => (
                <UserCartItems key={cartDish.dish.id} cartDish={cartDish} />
            ))}
            <div className="card border-0 p-2">
                <div className="row">
                    <div className="col text-end">Total:</div>
                    <div className="col-3 text-end text-nowrap">
                        <strong>{total}</strong> KGS
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCartDishes;
