import {React, useState,useEffect} from 'react';
import Header from '../../reusableComponents/header/header';
import { fetchPlants } from '../../plantsAPI';
import APlant from '../../reusableComponents/aPlant/aPlant';
import ExpandImage from '../../reusableComponents/expandImage/expandImage';

function ChoosePage(props) {

    const [plants, setPlants] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        async function fetchData() {
          const data = await fetchPlants(pageNumber);
          setPlants(data);        
        }
        fetchData();
      }, [pageNumber]);   

    function changeGetBtnText(event){
        if(event.keyCode === 13){
            getPlantsOfThePage()
        }
        const input = document.getElementById("chosen_page_number").value
        const pageNumberSpan = document.getElementById("page_number_on_btn")              
        if (input === "") {
            pageNumberSpan.textContent = "1"
        }else{
            pageNumberSpan.textContent = input
        }
    }

    function getPlantsOfThePage(){
        const pageNumberSpan = document.getElementById("page_number_on_btn").textContent
        const input = document.getElementById("chosen_page_number").value
        if (parseInt(pageNumberSpan) < 10000){            
            setPageNumber(parseInt(pageNumberSpan))
            const pageNumberSpanTitle = document.getElementById("page_number_title")        
            pageNumberSpanTitle.textContent = pageNumberSpan

        }else{
            alert("Invalid Value")
        }  
        document.getElementById("chosen_page_number").value = ""   
    }

    function zoomImage(event) {
        if (plants) {
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
            <Header /> 
 
                    <div className='bbt p-2 mt-2 d-flex flex-column gap-2 align-items-center'>
                        <div className='h2 text-warning border mt-2 p-2'>Choose Page</div>
                        <div className='h3  border mt-2 p-2 text-white' >Page # <span className='text-warning' id='page_number_title'>1</span> </div>
                        <div> <input id='chosen_page_number' className='p-2' type='text' placeholder='Typa Page Number' onKeyUp={changeGetBtnText} /> </div>
                        <div className='btn btn-primary' id='get_page_btn' onClick={getPlantsOfThePage}>Get <span className='text-warning'  id='page_number_on_btn'>1</span> Page</div>
                    </div>        
                    <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center bbt p-4 m-auto rounded">

                    {
                        (plants.length > 0) && (<>
                            {plants.map((element, index) => (
                                <div key={index} onClick={zoomImage}>
                                    <APlant
                                        id={index}
                                        commonName={element.common_name}
                                        scientificName={element.scientific_name}
                                        bgImage={"url(" + element.image_url + ")"}
                                    />
                                </div>

                            ))}                            
                        </>
                        )
                    }
                    </div>
                    <ExpandImage />
        </div>
    );
}
export default ChoosePage