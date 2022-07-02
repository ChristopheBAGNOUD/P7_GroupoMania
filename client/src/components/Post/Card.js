import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';

import { dateParser, isEmpty } from '../Utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments ] = useState(false);
    const dispatch = useDispatch();
    const updateItem =  () => {
        if(textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);

    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false); 
    },[userData])
    
    return (
       <li className='card-container' key={post._id}>
        {isLoading ? (
            // Spinner en attendant les infos serveurs
            <i className='fas fa-spinner fa-spin'></i>
        ) : (
            <>
            <div className="card-left">
                <img src={
                    !isEmpty(usersData[0]) && usersData.map((user) => {
                        if(user._id === post.posterId) return user.picture
                        else return null
                    }).join('')
                    
                } alt="poster-pic"
                 />
            </div>
            <div className="card-right">
                <div className="card-header">
                    <div className="pseudo">
                        <h3>
                        {
                        !isEmpty(usersData[0]) && usersData.map((user) => {
                        if(user._id === post.posterId) return user.pseudo
                        else return null
                        })
                        }  
                        </h3>

                    </div>
                    <span>{dateParser(post.createdAt)}</span>
                </div>
                {isUpdated === false && <p>{post.message}</p>}
                {isUpdated && (
                    <div className="update-post">
                        <textarea defaultValue={post.message}
                        onChange={(e) => setTextUpdate(e.target.value)}/>
                        <div className="button-container">
                            <button className="btn" onClick={updateItem}> Valider Modification</button>
                        </div>
                    </div>
                )}
                {post.picture && (<img src={post.picture} alt="card-pic" className='card-pic'/>
                 )}
                 {post.video && (
                   <iframe
                   width="500"
                   height="300"
                   src={post.video}
                   frameBorder="0"
                   allow="accelerometer; autolplay; clipboard-write; encrypted-media;
                   gyroscope; picture-in-picture"
                   allowFullScreen
                   title={post.posterId}>
                   </iframe> 
                 )}
                 {((userData._id === post.posterId) || userData.admin ) && (
                    <div className="button-container">
                        <div onClick={() => setIsUpdated(!isUpdated)}>
                            <img src="./img/icons/edit.svg" alt="edit" />
                        </div>
                        <DeleteCard id={post._id} />
                    </div>
                 )}
                 <div className="card-footer">
                    <div className="comment-icon">
                        <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment" />
                        <span>{post.comments.length}</span>
                    </div>
                    <LikeButton post={post}/>
                    <div></div>
                 </div>
                 {showComments && <CardComments post={post} />}
            </div>
            </>
        )
        }

       </li>
    );
};

export default Card;
