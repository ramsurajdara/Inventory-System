import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './components/NavigationBar';
import ProductList from './components/ProductList';
import Home from './components/Home'
import ProductDetails from './components/ProductDetails';
import TopProducts from './components/TopProducts';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Modify from './components/Modify';
import {UserContext} from './components/UserContext';
import React, {useState, Suspense} from 'react'
import Spinner from './components/Spinner'

const Profile = React.lazy(() => import('./components/Profile'));
const Register = React.lazy(() => import('./components/Register'));
 
function App() {

  const [auth, setAuth] = useState({"flag": sessionStorage.getItem("flag"), "user": sessionStorage.getItem("user")})
   
  return (
    <UserContext.Provider value = {[auth, setAuth]}>
      <div className="App">
          <Router>
            <NavigationBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/products/:id/:product_name"  render = {() => (auth.flag? (<ProductDetails/>) : (<Login/>))} />
              <Route path = "/top-products" component = {TopProducts} />
              <Route path="/add-product" render = {() => (auth.flag? (<AddProduct/>) : (<Login/>)) } />
              <Route path = "/edit-product/:id/:product_name" render = {() => (auth.flag? (<EditProduct/>) : (<Login/>)) }/>
              <Route path = "/login" component = {Login} />
              <Route path = "/modify" 
                render = {() => (auth.flag? (<Modify/>) : (<Login/>))}
              />
              <Suspense fallback={<Spinner/>}>
                <Route path = "/profile" render = {() => (auth.flag? (<Profile/>) : (<Login/>))} />
                <Route path = "/register" component = {Register} />
              </Suspense>
            </Switch> 
          </Router>

      </div>
    </UserContext.Provider>
  );
}

export default App;
