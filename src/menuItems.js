import React from 'react';
import { Link } from 'react-router-dom';

function MenuItems(props) {
    return (
        <div className='container d-flex flex-column gap-2 p-2' >
            <Link to={props.path}><div className='hl'>{props.title}</div></Link>
        </div>
    );
}
export default MenuItems