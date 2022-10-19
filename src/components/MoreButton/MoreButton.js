import React from 'react';
import './MoreButton.css';

function MoreButton({onMoreButton}) {
 return (
  <button className="more-button" type="button" onClick={onMoreButton}>Ещё</button>
 )
};

export default MoreButton;