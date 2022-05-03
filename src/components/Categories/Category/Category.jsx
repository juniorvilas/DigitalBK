import './Category.sass'
import React from 'react';

const Category = ({handleCategory, img, title, para}) => {
    return(
        <div className="categoria-card" onClick={() => handleCategory(title.toUpperCase())}>
            <img src={img} alt="camping" />
            <div className="categoria-text">
                <h2>{title}</h2>
                <p>{para}</p>
            </div>
        </div>
    );
}

export default Category;