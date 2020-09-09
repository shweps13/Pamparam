import React from 'react';
import errorImage from '../../materials/notFound.png';
import '../../styles/notFound.css';


function NotFound() {
    
    return (
    <div className="notFound">
        <img src={errorImage} className="notFound__image" alt="Page not found"/>
        <h3>Sorry, but this page doesn't exist</h3>
    </div>
    )
}

export default NotFound
