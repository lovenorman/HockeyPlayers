import {HockeyPlayer} from './Data/Product.js'
import {editProduct} from './Data/EditProduct.js'
import { baseApi } from './API/baseAPI.js'
import { refreshItems } from './Data/RefreshItems.js'
import { showSection } from './Data/Showsection.js'

//Skapar kopplingar mellan html-id och JS-variabler som vi kan använda i JS-koden för att komma åt HTML.
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const productTableBody = document.getElementById('productTableBody')
const submitNewButton = document.getElementById('submitNewButton')
const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

const newName = document.getElementById('newName')
const newJersey = document.getElementById('newJersey')
const newAge = document.getElementById('newAge')
const newBorn = document.getElementById('newBorn')


//const baseAPI = 'https://fakestoreapi.com/products'
// HTTP GET Vi vill kunna lista alla https://fakestoreapi.com/products
// HTTP GET Lista en https://fakestoreapi.com/products/4
// HTTP POST Skapa en ny https://fakestoreapi.com/products 
//                          - skicka in en ny product som JSON
// HTTP PUT Uppdatera befintlig https://fakestoreapi.com/products 
//                          - skicka in nya properties som JSON

//SEARCH
const search = document.getElementById('search')
search.addEventListener("keyup", ()=>{
    const lowercase = search.value.toLowerCase() //Värdet som skrivs in görs till lowercase och sparas i variabel

    const filteredList = items.filter(item=> item.namn.toLowerCase()//gör (temporär) lista av "namn" till lower, filtrerar efter
            .includes( lowercase ) );  //Filtrerar efter items som inkluderar sökningens värder("lowercase")
    
    productTableBody.innerHTML = '';//Sätter productens html till tom
    filteredList.forEach( (item) => { //loopar igenom filtrerade listan och renderar alla items
        renderTr(item);
    });
})

//När vi klickar på "submit"
submitNewButton.addEventListener("click",()=>{ 

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


let items = [];
refreshItems();
  

showSection('sectionList');