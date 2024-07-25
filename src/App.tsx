import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import DishesItem from "./components/DishesItem/DishesItem";
import NewDish from "./containers/NewDish/NewDish";

function App() {

  return (
    <>
        <header>
            <Toolbar/>
        </header>
        <main className='container container-main  pt-5'>
            <Routes>
                <Route path="/admin/dishes" element={<DishesItem/>}/>
                <Route path="/admin/dishes/new-dishes" element={<NewDish />} />
                <Route path="*" element={<h1>Not found!</h1>}/>
            </Routes>
        </main>
        </>
  )
}

export default App
