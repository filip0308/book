import React, { useEffect } from 'react';
import {Switch} from "react-router-dom"
import './App.css';
import LoginForm from "./views/Login/LoginForm";
import Books from "./views/Book/Books";
import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";

//Redux
import {auth} from "./firebase";
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch();
   
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if(user) {
          const idTokenResult = await user.getIdTokenResult();
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token,
            },
          });
        }
      });
      return () => unsubscribe();
    }, []);

    return (
     <Switch>
       <PublicRoute restricted={true} path="/" exact component={LoginForm} />
       <PrivateRoute restricted={false}  path="/books" exact component={Books} />
     </Switch>
    );
}

export default App;
