import {Dish} from "../../../types";
import React from "react";
import {Link} from "react-router-dom";
import ButtonSpinner from "../../Spinner/ButtonSpinner";

interface Props {
    dish:Dish;
    onDelete: VoidFunction;
    deleteLoading: false | string;
}


const AdminDishesItem:React.FC<Props> = ({dish, onDelete,deleteLoading}) => {
    return (
        <>
            <div className="card mb-3 p-3 col-7 border border-secondary">
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
                    <div className="d-flex justify-content-between flex-grow-1 me-3">
                        <h5 className="mb-1">{dish.title}</h5>
                        <span className="text-muted"><strong> {dish.price} KGS</strong></span>
                    </div>
                    <div className="d-flex gap-2">
                        <Link className="btn btn-primary" to={`/admin/dishes/edit-dish/${dish.id}`}>
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger"
                            onClick={onDelete}
                            disabled={deleteLoading ? deleteLoading === dish.id : false}
                        >
                            {deleteLoading && deleteLoading === dish.id && <ButtonSpinner/>}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDishesItem;