import './styles.css';
import Layout from './Component/Layout/Layout';
import Brands from './Component/Brands/Brands';
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import ProductDetalis from './Component/ProductDetalis/ProductDetalis';
import Catagories from './Component/Catagories/Catagories';
import Logout from './Component/Logout/Logout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Component/Home/Home';
import { useContext, useEffect } from 'react';
import { UserContext } from './Component/Context/UserContext';
function App() {
  let { setUserToken } = useContext(UserContext);
  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "catagories", element: <Catagories /> },
        { path: "brands", element: <Brands /> },
        { path: "register", element: < Register /> },
        { path: "login", element: <Login /> },
        { path: "Logout", element: <Logout /> },
        { path: "produProductDetalisctis/:id", element: <ProductDetalis /> },
      ]
    }
  ])

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [])
  return (<RouterProvider router={routers}></RouterProvider>
  )
}
export default App;


