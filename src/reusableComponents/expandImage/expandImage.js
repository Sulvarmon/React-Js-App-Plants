import React from 'react'
import "./expandImage.css"
import { FaWindowClose } from 'react-icons/fa';

function ExpandImage(props) {

    function closeExpandedCont() {
        const expandImage = document.querySelector('.expand_image')
        expandImage.style.display = "none"
    }

    return (
        <div>
            <div className="expand_image text-white" >
                <div className="d-flex justify-content-end p-3"><FaWindowClose size={32} onClick={closeExpandedCont} className="close_expanded_cont cp" /></div>
                <div className="common_and_sc_name_expanded_cont d-flex flex-column align-items-center gap-2 bbt">
                    <div className="expanded_common_name"><span>Common Name : </span><span className="text-info">...</span></div>
                    <div className="expanded_scientific_name"><span>Scientific Name : </span><span className="text-info">...</span></div>
                </div>
            </div>
        </div>
    );
}
export default ExpandImage