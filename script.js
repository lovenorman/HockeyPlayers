// 1. DOM - komma åt element ?
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

const editName = document.getElementById('editName')
const editJersey = document.getElementById('editJersey')
const editAge = document.getElementById('editAge')
const editBorn = document.getElementById('editBorn')

const submitEditButton = document.getElementById('submitEditButton')

//Ändra till love när en ny spelare skapats
const baseApi = 'https://hockeyplayers.systementor.se/Love/player'
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

//SORT
const sortByName = document.getElementById('sortByName')
sortByName.addEventListener("click", ()=>{
    //alert('hej');
    
    const sortedList = items.sort((a, b) =>{
        return a.age - b.age;
    });//Hämta listan, sortera...
   
    productTableBody.innerHTML = ''; //och skriva om sidan.
    sortedList.forEach((item) =>{
        renderTr(item);
    });
    
})

class HockeyPlayer{
    constructor(id,namn,jersey,age,born){
        this.id = id;
        this.namn = namn;
        this.jersey = jersey;
        this.age = age;
        this.born = born;
    }
}

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

submitEditButton.addEventListener("click",()=>{
    
    const changedProductValues = {
        namn: editName.value,
        jersey: editJersey.value,
        age: editAge.value,
        born: editBorn.value
    };
    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"PUT",
        body:JSON.stringify(changedProductValues)
    };

    //https://hockeyplayers.systementor.se/stefan/player/4
    fetch(baseApi + '/' + editingProduct.id ,reqParams)
        .then(res=>{
            refreshItems();
            showSection('sectionList');
        });
});

let editingProduct = null;

function editProduct(id){
    editingProduct = items.find((item)=>item.id == id)//Visar item som stämmer överens med det id vi får från "jsCall"
    editName.value = editingProduct.namn; //Nuvarande värde visas.
    editJersey.value = editingProduct.jersey;
    editAge.value = editingProduct.age;
    editBorn.value = editingProduct.born;
    showSection('sectionEdit');
}


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
                p = new HockeyPlayer(prod.id,
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



//Loopa den
// för varje skapa tr, för varje skapa td:s 
//lägga in den nya tr:n som ett barn till  productTableBody

  

showSection('sectionList');