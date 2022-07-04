import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Chemin from "./components/routes";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';


const App = () => {
  const [uid,setUid]= useState(null);
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchToken = async() =>{
      await axios({
        method: "get",
        url: `http://localhost:5000/jwtid`,
        withCredentials: true,
    })
    .then((res)=>{
      console.log(res);
      setUid(res.data);
    })
    .catch((err) => console.log(err + "error")); 
  };
  fetchToken();

  if(uid) dispatch(getUser(uid))
}, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Chemin />
    </UidContext.Provider>
  );
};

export default App;