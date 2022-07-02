import React, { useContext } from 'react';
import Log from '../components/log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';
import LeftNav from '../components/LeftNav';

const Profil = () => {
    const uid = useContext(UidContext);
    return (
        <div className='profil-page'>
            <LeftNav/>
            {uid ? (
                <UpdateProfil />
            ) : (
            <div className='log-container'>
            <Log signin={true} signup={false} />

            </div>
            )}
        </div>
    );
};

export default Profil;