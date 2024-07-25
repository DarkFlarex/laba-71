import {Link} from "react-router-dom";

const DishesItem = () => {
    return (
        <div>
            <h5>Dishes</h5>
            <Link className="btn btn-success" to={'/admin/dishes/new-dishes'}>Add new dish</Link>        </div>
    );
};

export default DishesItem;