import React from 'react';
import './Header.css';

export default props =>
  <header className="header d-none d-sm-flex flex-column">
    <h3 className="mt-3">
      <i className={`fa fa-${props.icon}`}></i>
      {props.title}
    </h3>
    <p className="lead text-muted">{props.subtitle}</p>
  </header> 
