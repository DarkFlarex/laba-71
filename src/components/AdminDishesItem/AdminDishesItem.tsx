import {Dish} from "../../types";
import React from "react";
import {Link} from "react-router-dom";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
    dish:Dish;
    onDelete: VoidFunction;
    deleteLoading: false | string;
}


const AdminDishesItem:React.FC<Props> = ({dish, onDelete,deleteLoading}) => {
    return (
        <>
            <div className="card mb-3 p-3 col-5 border border-secondary">
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
                    <Link className="btn btn-primary" to={`/admin/dishes/edit-dish/${dish.id}`}>
                        Edit
                    </Link>
                    <button
                        className="btn btn-danger"
                        onClick={onDelete}
                        disabled={deleteLoading ? deleteLoading === dish.id : false}
                    >
                        {deleteLoading && deleteLoading === dish.id && (<ButtonSpinner/>)}
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminDishesItem;