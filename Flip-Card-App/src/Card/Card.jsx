import React, { Component } from 'react';
import './Card.css';

const Card = (props) => (
    <div className="card-container">
        <div className="card">
           <div className="front">
               <div className="sven">{props.sven}</div>  
        </div>
           <div className="back">
               <div className="thai">{props.thai}</div>  
               <div className="uttalar">{props.uttalar}</div> 
        </div>
        </div>
    </div>
)
export default Card;