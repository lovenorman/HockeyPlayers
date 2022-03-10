import { renderTr } from "./RenderTr.js"
import { baseApi } from "../API/baseAPI.js"
import { items } from "./Items.js"
import { showSection } from "./Showsection.js"
import { HockeyPlayer } from "./Product.js"

const newName = document.getElementById('newName')
const newJersey = document.getElementById('newJersey')
const newAge = document.getElementById('newAge')
const newBorn = document.getElementById('newBorn')

const submitNewButton = document.getElementById('submitNewButton')

//När vi klickar på "submit"
submitNewButton.addEventListener("click",()=>{ 
    console.log('hej')
    const newProduct = {
        namn: newName.value,
        jersey: newJersey.value,
        age: newAge.value,
        born: newBorn.value
    };

    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify(newProduct)
    };
    fetch(baseApi,reqParams)
        .then(res=>res.json())//Får tillbaka respons, ber om json
        .then(json=>{//Fått json
            const prod = new HockeyPlayer(
                json.id,
                newName.value,
                newJersey.value, 
                newAge.value,
                newBorn.value)

            items.push(prod); 
            renderTr(prod);
            showSection('sectionList');    
        })
});
