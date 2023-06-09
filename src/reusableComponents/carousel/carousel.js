import { useState, useEffect, useCallback } from "react"
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './carousel.css'
import ExpandImage from "../expandImage/expandImage";




function Carousel(props) {

    const [count, setCount] = useState(0);
    const [array] = useState(() => {
        const numberOfSlides = props.numberOfSlides
        const array = []
        for (let i = 0; i < numberOfSlides; i++) {
            array.push(i)
        }
        return array
    })

    const defLeftProp = useCallback(() => {
        let carouselItemsArray = document.querySelectorAll(".carousel_item")
        let widthOfCarouselItem = carouselItemsArray[0].offsetWidth
        for (let i = 0; i < carouselItemsArray.length; i++) {
            carouselItemsArray[i].style.left = (count + i) * widthOfCarouselItem + "px"
        }
    }, [count]);

    let decreaseCount = () => {
        let carouselItemsArray = document.querySelectorAll(".carousel_item")
        if (Math.abs(count) < carouselItemsArray.length - 1) {
            setCount(count - 1)
        }
        for (let i = 0; i < carouselItemsArray.length; i++) {
            carouselItemsArray[i].style.transition = '0.3s ease-in-out'
        }
    }

    let increaseCount = () => {
        if (Math.abs(count) > 0) {
            setCount(count + 1)
        }
    }

    useEffect(() => {
        defLeftProp()

    }, [count, defLeftProp])

    useEffect(() => {
        if (props.imageAndTextArray) {
            let carouselItem = document.getElementsByClassName("carousel_item")
            for (let i = 0; i < 10; i++) {
                carouselItem[i].style.backgroundImage = `url(${props.imageAndTextArray.img[i]})`
            }
        }

    })

    function zoomImage(event) {
        if (props.imageAndTextArray) {
            const clickedElement = event.target;
            const expandImage = document.querySelector('.expand_image')
            const commonName = clickedElement.childNodes[0].childNodes[0].childNodes[1].textContent
            const scientificName = clickedElement.childNodes[0].childNodes[1].childNodes[1].textContent
            const clickedElementStyle = getComputedStyle(clickedElement);
            const backgroundImage = clickedElementStyle.backgroundImage;
            expandImage.style.backgroundImage = `${backgroundImage}`
            expandImage.childNodes[1].childNodes[0].childNodes[1].textContent = commonName
            expandImage.childNodes[1].childNodes[1].childNodes[1].textContent = scientificName
            expandImage.style.display = "block"
        }
    }

    return (
        <div>
            <div className="carousel_content_cont d-flex  overflow-hidden cp">
                <div className="carousel_left_arr ms-2 cp bg-dark rounded p-2" onClick={increaseCount}>
                    <FaArrowLeft size={32} />
                </div>
                <div className="carousel_right_arr me-2 cp bg-dark rounded p-2" onClick={decreaseCount}>
                    <FaArrowRight size={32} />
                </div>


                {

                    array.map((element, index) => (
                        <div key={index} onClick={zoomImage} className="carousel_item bg-dark text-white">
                            {
                                props.imageAndTextArray &&
                                <div className="d-flex flex-column gap-2 p-2 bbt" style={{ cursor: "auto" }} onClick={(event) => event.stopPropagation()}>
                                    <div className="carousel_items_common_name"><span>Common Name : </span><span className="text-info">{props.imageAndTextArray.commonName[index]}</span></div>
                                    <div className="carousel_items_scientific_name"><span>Scientific Name : </span><span className="text-info">{props.imageAndTextArray.scientificName[index]}</span></div>
                                </div>
                            }
                        </div>
                    ))
                }

                <ExpandImage />

            </div>
        </div>
    )
}

export default Carousel