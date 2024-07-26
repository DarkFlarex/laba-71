import {Dish} from "../../../types";
import React from "react";

interface Props {
    dish: Dish;
    addToCart: VoidFunction;
}

const UserDishesItem: React.FC<Props> = ({dish,addToCart}) => {

    return (
        <>
            <div
                onClick={addToCart}
                className="card mb-3 p-3 col-md-8 border border-secondary"
            >
                <div className="d-flex align-items-center">
                    <div
                        className="contact-img me-3"
                        style={{
                            background: `url(${dish.image}) no-repeat center center / cover`,
                            width: '100px',
                            height: '100px',
                            borderRadius: '8px'
                        }}
                    />
                    <div className="d-flex justify-content-between flex-grow-1 mb-2">
                        <h5 className="p-0 m-0">{dish.title}</h5>
                        <span className="p-0 m-0">{dish.price} KGS</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDishesItem;