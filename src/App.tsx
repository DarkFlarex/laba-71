import './App.css'
import AdminToolbar from "./components/Admincomponents/AdminToolbar/AdminToolbar";
import {Route, Routes, useLocation} from "react-router-dom";
import NewDish from "./containers/AdminContainers/NewDish/NewDish";
import AdminDishes from "./containers/AdminContainers/AdminDishes/AdminDishes";
import EditDish from "./containers/AdminContainers/EditDish/EditDish";
import UserDishes from "./containers/UserContainers/UserDishes";
import UserToolbar from "./components/UserComponents/UserToolbar/UserToolbar";

const App =()=> {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
  return (
      <>
          <header>
              {isAdminRoute ? <AdminToolbar /> : <UserToolbar />}
          </header>
          <main className='container container-main pt-5'>
              <Routes>
                  <Route path="/" element={<UserDishes/>}/>
                  <Route path="/admin/dishes" element={<AdminDishes/>}/>
                  <Route path="/admin/dishes/new-dish" element={<NewDish/>}/>
                  <Route path="/admin/dishes/edit-dish/:id" element={<EditDish/>}/>
                  <Route path="*" element={<h1>Not found!</h1>}/>
              </Routes>
          </main>
      </>
  )
}

export default App
