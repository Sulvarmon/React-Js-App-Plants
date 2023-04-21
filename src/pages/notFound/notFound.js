import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
    return (
        <div className='d-flex justify-content-center align-items-center p-4 vh-100'>
            <div className='p-2 bbt d-flex justify-content-center align-items-center flex-column'>
                <div className='text-white h2 text-center' style={{ letterSpacing: "10px" }}>Page Does Not Exist</div>
                <div className='p-2 wf user-select-none rounded'> <Link to='/' className='btn btn-primary text-white tuo hl'>Go Back</Link></div>
            </div>

        </div>
    );
}
export default NotFound