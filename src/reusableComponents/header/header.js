import "./header.css"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from "../../img/logo.jpg"
import MenuItems from "../../menuItems";



function Header() {

    const menuItems = [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/aboutUs" },
        { title: "Search A Plant", path: "/searchAPlant" },
        { title: "Contact Us", path: "/contactUs" },
        { title: "Find Us On Map", path: "/findUsOnMap" },
    ]
    let [slideState, setSlideState] = useState(false)

    function changeSlideState() {
        slideState ? setSlideState(false) : setSlideState(true)
    }

    function slideMenuBack() {
        let menuDiv = document.querySelector('.slideMenu')
        menuDiv.style.right = '-5000px'
        slideState ? setSlideState(false) : setSlideState(true)
    }

    useEffect(() => {
        let menuDiv = document.querySelector('.slideMenu')
        slideState ? menuDiv.style.right = '0px' : menuDiv.style.right = '-5000px'
    }, [slideState])

    return (
        <div className="position-relative g-0 mt-2">
            <div className='text-white d-flex justify-content-between align-items-center p-2 gap-2 rounded bbt'>
                <Link to="/" ><div className="logo"><img className="border rounded-circle user-select-none" src={logo} width="100px" height="100px" alt="logo" /></div></Link>
                <div className="btn btn-primary"><Link to='/searchACat' >Search A Plant</Link> </div>
                <div className="cp" onClick={changeSlideState}><FontAwesomeIcon icon={faBars} size="2x" /></div>
            </div>
            <div className="slideMenu text-white rounded bbt">
                {menuItems.map((element, index) => (
                    <div className="wf" key={index} onClick={slideMenuBack}><MenuItems title={element.title} path={element.path} /></div>
                ))}
            </div>
        </div>
    )
}

export default Header;