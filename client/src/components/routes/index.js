import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import home from '../../pages/home';
import profil from '../../pages/profil';
import Navbar from '../Navbar';


const index = () => {
    return (
       <Router>
           <Navbar />
           <Switch>
            <Route path="/" exact component={home}/>
            <Route path="/profil" exact component={profil}/>
            <Redirect to="/" />
            </Switch>
           
       </Router>
    );
};

export default index;