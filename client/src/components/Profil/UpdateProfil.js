import React from 'react';

import LeftNav from '../LeftNav';
import UploadImg from './UploadImg';
import { useSelector } from 'react-redux';


const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.userError);

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="utilisateur" />
                    <UploadImg />
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;