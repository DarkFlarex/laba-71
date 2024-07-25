import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Navigate, Route, Routes} from "react-router-dom";
import NewDish from "./containers/NewDish/NewDish";
import AdminDishes from "./containers/AdminDishes/AdminDishes";

function App() {

  return (
    <>
        <header>
            <Toolbar/>
        </header>
        <main className='container container-main  pt-5'>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/dishes" />} />
                <Route path="/admin/dishes" element={<AdminDishes/>}/>
                <Route path="/admin/dishes/new-dishes" element={<NewDish />} />
                <Route path="*" element={<h1>Not found!</h1>}/>
            </Routes>
        </main>
        </>
  )
}

export default App
