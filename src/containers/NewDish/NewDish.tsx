import DishForm from "../../components/DishForm/DishForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCreateDishLoading} from "../../store/dishesSlice";
import {ApiDish} from "../../types";
import {createDish} from "../../store/dishesThunks";
import {toast} from "react-toastify";

const NewDish = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectCreateDishLoading);

    const unSubmit = async (dish:ApiDish)=>{
      try {
          await dispatch(createDish(dish)).unwrap();
          navigate('/admin/dishes');
          toast.success("Dish created!");
      }catch(error){
          toast.error('Could not create dish!');
      }
    };


    return (
        <div className="row mt-2">
            <div className="col">
                <DishForm onSubmit={unSubmit} isLoading={isCreating}/>
            </div>
        </div>
    );
};

export default NewDish;