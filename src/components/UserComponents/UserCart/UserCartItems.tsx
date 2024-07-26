import React from 'react';
import {CartDish} from "../../../types";

interface Props {
    cartDish:CartDish;
}

const UserCartItems: React.FC<Props> = ({ cartDish }) => {
    const price = cartDish.dish.price * cartDish.amount;

    return (
        <div className="card mb-2 p-3">
            <div className="row align-items-center">
                <div className="col">{cartDish.dish.title}</div>
                <div className="col-2">x{cartDish.amount}</div>
                <div className="col-3 text-end text-nowrap">{price} KGS</div>
            </div>
        </div>
    );
};

export default UserCartItems;