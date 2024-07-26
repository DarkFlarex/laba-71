import {Dish} from "../../../types";
import React from "react";

interface Props {
    dish: Dish;
    addToCart: VoidFunction;
}

const UserDishesItem: React.FC<Props> = ({dish,addToCart}) => {

    return (
        <>
            <div onClick={addToCart}
                 className="card mb-3 p-3 col-5 border border-secondary"
            >
                <div className="d-flex align-items-center">
                    <div
                        className="contact-img me-5"
                        style={{
                            background: `url(${dish.image}) no-repeat center center / cover`,
                            width: '100px',
                            height: '100px'
                        }}
                    />
                    <div className="contact-info">
                        <h5>{dish.title}</h5>
                        <span>{dish.price} KGS</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDishesItem;