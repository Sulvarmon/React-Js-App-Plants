import { fetchPlants } from '../../plantsAPI.js';
import { numberOfSlides } from '../../numberOfSlides.js';
import { React, useState, useEffect } from 'react';
import Carousel from '../../reusableComponents/carousel/carousel.js';
import Header from '../../reusableComponents/header/header.js';
import APlant from '../../reusableComponents/aPlant/aPlant.js';
import ExpandImage from '../../reusableComponents/expandImage/expandImage.js';

function Home(props) {
    const [plants, setPlants] = useState([]);
    let [plantsApiPageNumber, setPlantsApiPageNumber] = useState(1);
    const [imageAndTextArray, setImageAndTextArray] = useState(false);
    const [plantsGridArray, setPlantsGridArray] = useState([])

    useEffect(() => {
        const getPlants = async () => {
            const fetchedPlants = await fetchPlants(plantsApiPageNumber);
            setPlants(fetchedPlants);
            if (fetchedPlants.length > 0) {
                setPlantsGridArray(prevState => prevState.concat(fetchedPlants));
            }

            const array = { img: [], commonName: [], scientificName: [] }
            for (let i = 0; i < numberOfSlides.homePageCarouselSlides; i++) {
                array.img.push(fetchedPlants[i].image_url)
                array.commonName.push(fetchedPlants[i].common_name)
                array.scientificName.push(fetchedPlants[i].scientific_name)
            }
            setImageAndTextArray(array)
        };

        getPlants();
    }, [plantsApiPageNumber]);

    console.log(plantsGridArray)

    function loadMorePlants() {
        setPlantsApiPageNumber(++plantsApiPageNumber)
    }

    function zoomImage(event) {
        if (imageAndTextArray) {
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
        <div className='d-flex flex-column gap-2'>
            <Header />
            <div className='d-flex flex-column align-items-center border p-2 rounded wf m-auto'>
                <h2 className='text-warning bbt wf p-2 rounded user-select-none'>Some Popular Plants</h2>
                <Carousel numberOfSlides="10" imageAndTextArray={imageAndTextArray} />
            </div>
            <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center bbt p-4 m-auto rounded">

                {
                    (plantsGridArray.length > 0) && (<>
                        {plantsGridArray.map((element, index) => (
                            <div key={index} onClick={zoomImage}>
                                <APlant
                                    id={index}
                                    commonName={element.common_name}
                                    scientificName={element.scientific_name}
                                    bgImage={"url(" + element.image_url + ")"}
                                />
                            </div>

                        ))}
                        <div className='load_more_plants btn btn-primary' onClick={loadMorePlants}>Load More Plants</div>
                    </>
                    )
                }
            </div>
            <ExpandImage />
        </div>
    );
}
export default Home