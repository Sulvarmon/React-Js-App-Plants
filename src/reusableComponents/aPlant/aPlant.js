import React, { useEffect } from 'react';
import "./aPlant.css"

function APlant(props) {
    const className = `a_plant_cont_${props.id}`;

    useEffect(() => {
        let aPlantCont = document.querySelector(`.${className}`)
        aPlantCont.style.backgroundImage = props.bgImage
    })

    return (
        <div>
            <div className={`${className} bg-dark a_plant_cont border border-white border-3 rounded cp`} >
                <div className="d-flex flex-column gap-2 p-2 bbt text-white" style={{ cursor: "auto" }} onClick={(event) => event.stopPropagation()}>
                    <div className="carousel_items_common_name"><span>Common Name : </span><span className="text-info">{props.commonName}</span></div>
                    <div className="carousel_items_scientific_name"><span>Scientific Name : </span><span className="text-info">{props.scientificName}</span></div>
                </div>
            </div>
        </div>
    );
}
export default APlant