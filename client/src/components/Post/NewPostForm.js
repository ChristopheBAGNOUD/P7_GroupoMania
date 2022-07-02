import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';

const NewPostForm = () => {
    const [isLoading, setIdLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo("");
    };

// Création du l'article si on click sur le boutton "Envoyer"
    const handlePost = async () => {
        if(message || postPicture || video) {
            const data = new FormData();
            data.append("posterId", userData._id);
            data.append("message", message);
            if(file) data.append("file", file);
            data.append("video", video);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
            
        }else{
            alert("Champ Vide");
        }
     }

// Suppression de l'article en cours de saisi si on click sur "Annuler"
    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setVideo("");
        setFile("");
    }

// Mise au format de l'url si on post une vidéo Youtube
    const handleVideo = () => {
        let findLink = message.split(" ");
        for (let i = 0; i < findLink.length; i++) {
            if(findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout"))
            {
                let embed = findLink[i].replace("watch?v=","embed/");
                setVideo(embed.split("&")[0]);
                findLink.splice(i, 1);
                setMessage(findLink.join(" "));
                setPostPicture("");
            }

        }
    };

    useEffect(() => {
        if (!isEmpty(userData)) setIdLoading(false);
        handleVideo();
    }, [userData, message, video])
    return (
        <div className="post-container">
            {/* Spinner pendant le chargement des posts */}
            {isLoading ? (
                <i className='fas fa-spinner fa-pulse'></i>

            ) : (
                <>
                    <div className="data">

                    </div>
                    {/* Permet le click sur l'image d'utilisateur lors du post pour renvoyé vers le profil  */}
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea name="message" id="message" placeholder="What's Up!" onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture || video.length > 10 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="user-pic" />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={postPicture} alt="" />
                                        {/* Propriété pour pouvoir mettre une video Youtube */}
                                        {video && (
                                            <iframe
                                                width="500"
                                                height="300"
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autolplay; clipboard-write; encrypted-media;
                                        gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}>
                                            </iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}

                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="img" />
                                        <input type="file" id="file-upload" name="file" accept=".jpg, .png, .jpeg" onChange={(e) => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer video</button>
                                )}
                            </div>
                            {/* Message d'error si l'image ne correspond pas au format ou au poids de l'image */}
                            {!isEmpty(error.format) && <p>{error.format}</p> }
                            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p> }
                            <div className="btn-send">
                                {message || postPicture || video.length > 10 ? (
                                    <button className="cancel" onClick={cancelPost}>Annuler</button>) : null}
                                <button className="send" onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>

                </>

            )}
        </div>
    );
};

export default NewPostForm;