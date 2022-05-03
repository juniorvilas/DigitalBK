import "./isFetchingAnimation.sass";
import React from 'react';

const IsFetchingAnimation = ({ text="Carregando..." }) => {
  return (
    <div className="loading-text">
      <span>{text}</span>
    </div>
  );
};

export default IsFetchingAnimation;