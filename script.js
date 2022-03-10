import {HockeyPlayer} from './Data/Product.js'
import {baseApi, editProduct} from './Data/EditProduct.js'

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

//SORT BY NAME
const sortByName = document.getElementById('sortByName')
sortByName.addEventListener("click", ()=>{
    
    const sortedList = items.sort((a, b)=>{ //First, convert the names to lowercase.
        let fa = a.namn.toLowerCase(), //Compare names 
            fb = b.namn.toLowerCase();

        if(fa < fb) {   //return -1, 1 and 0, depending on the string comparison.
            return -1;
        }
        if(fa > fb) {
            return 1;
        }
        return 0;
    });
    productTableBody.innerHTML = ''; //och skriva om sidan.
    sortedList.forEach((item) =>{
        renderTr(item);
    });
});

// SORT BY JERSEY
const sortByJersey = document.getElementById('sortByJersey')
sortByJersey.addEventListener("click", ()=>{
    
    const sortedList = items.sort((a, b) =>{  //Hämta listan, sortera...
        return a.jersey - b.jersey;
    });
   
    productTableBody.innerHTML = ''; //och skriva om sidan.
    sortedList.forEach((item) =>{
        renderTr(item);
    });
    
});

//SORT BY AGE
const sortByAge = document.getElementById('sortByAge')
sortByAge.addEventListener("click", ()=>{
    
    const sortedList = items.sort((a, b) =>{  //Hämta listan, sortera...
        return a.age - b.age;
    });
   
    productTableBody.innerHTML = ''; //och skriva om sidan.
    sortedList.forEach((item) =>{
        renderTr(item);
    });
    
});

//SORT BY BORN
const sortByBorn = document.getElementById('sortByBorn')
sortByBorn.addEventListener("click", ()=>{
    
    const sortedList = items.sort((a, b)=>{ //First, convert the names to lowercase.
        let fa = a.born.toLowerCase(), //Compare names 
            fb = b.born.toLowerCase();

        if(fa < fb) {   //return -1, 1 and 0, depending on the string comparison.
            return -1;
        }
        if(fa > fb) {
            return 1;
        }
        return 0;
    });
    productTableBody.innerHTML = ''; //och skriva om sidan.
    sortedList.forEach((item) =>{
        renderTr(item);
    });
});

//Metod för att visa olika sektioner av html via variablerna ovan.
function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
}
//När vi klickar på "NY"
newLink.addEventListener("click",()=>{ 
        showSection('sectionNew');    
  });
//När vi klickar på "Visa alla"
listLink.addEventListener("click",()=>{
    refreshItems(); 
    showSection('sectionList');    
});

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




window.editProduct = editProduct

//Metod för att lägga till nytt item till den befintliga listan
function renderTr(product){
    let jsCall = `editProduct(${product.id})`;
    // jsCall = editProduct(18)
    // jsCall = editProduct(19)
    let template = `<tr>
                        <td>${product.namn}</td>
                        <td>${product.jersey}</td>
                        <td>${product.age}</td>
                        <td>${product.born}</td>
                        <td><a href="#" onclick="${jsCall}"><i class='bx bxs-edit-alt'></i></i></td>
                    </tr>`
    productTableBody.innerHTML = productTableBody.innerHTML + template;
} 
// 

function refreshItems(){

    // fetch('https://hockeyplayers.systementor.se/stefan/player')
    // .then(response=>response.json())
    // .then(array=>{
    //     //json -> items
    //     console.log(array)
    // });

    items = [];
    productTableBody.innerHTML = '';

    fetch(baseApi)
        .then(response=>response.json())
        .then(array=>{
            //json -> items
            console.log(array)
            array.forEach(prod=>{
                let p = new HockeyPlayer(prod.id,
                    prod.namn,
                    prod.jersey,
                    prod.age,
                    prod.born)                    
                items.push(p)
            });
            items.forEach( (item) => {
                renderTr(item);
            });
        });
}

let items = [];
refreshItems();
  

showSection('sectionList');