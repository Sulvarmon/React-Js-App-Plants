import { fetchPlants } from '../../plantsAPI.js';
import { numberOfSlides } from '../../numberOfSlides.js';
import { React, useState, useEffect } from 'react';
import Carousel from '../../reusableComponents/carousel/carousel.js';
import Header from '../../reusableComponents/header/header.js';
import APlant from '../../reusableComponents/aPlant/aPlant.js';

function Home(props) {
    const [plants, setPlants] = useState(false);
    const [imageAndTextArray, setImageAndTextArray] = useState(false);

    useEffect(() => {
        const getPlants = async () => {
            const fetchedPlants = await fetchPlants(1);
            setPlants(fetchedPlants);

            const array = { img: [], commonName: [], scientificName: [] }
            for (let i = 0; i < numberOfSlides.homePageCarouselSlides; i++) {
                array.img.push(fetchedPlants[i].image_url)
                array.commonName.push(fetchedPlants[i].common_name)
                array.scientificName.push(fetchedPlants[i].scientific_name)
            }
            setImageAndTextArray(array)
        };

        getPlants();
    });

    function loadMorePlants() {
        alert('clicked')
    }

    console.log(plants)

    return (
        <div className='d-flex flex-column gap-2'>
            <Header />
            <div className='d-flex flex-column align-items-center border p-2 rounded wf m-auto'>
                <h2 className='text-warning bbt wf p-2 rounded user-select-none'>Some Popular Plants</h2>
                <Carousel numberOfSlides="10" imageAndTextArray={imageAndTextArray} />
            </div>
            <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center bbt p-4 m-auto rounded">

                {
                    plants && (<>
                        {plants.map((element, index) => (
                            <APlant
                                key={index}
                                id={index}
                                commonName={element.common_name}
                                scientificName={element.scientific_name}
                                bgImage={"url(" + element.image_url + ")"}
                            />
                        ))}
                        <div className='load_more_plants btn btn-primary' onClick={loadMorePlants}>Load More Plants</div>
                    </>
                    )
                }



            </div>

        </div>
    );
}
export default Home