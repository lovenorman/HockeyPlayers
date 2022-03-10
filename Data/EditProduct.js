import { refreshItems } from "./RefreshItems.js"
import { baseApi } from "../API/baseAPI.js"

export const editName = document.getElementById('editName')
export const editJersey = document.getElementById('editJersey')
export const editAge = document.getElementById('editAge')
export const editBorn = document.getElementById('editBorn')

export const submitEditButton = document.getElementById('submitEditButton')

window.editProduct = editProduct

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

export let editingProduct = null;

export function editProduct(id){
    editingProduct = items.find((item)=>item.id == id)//Visar item som stämmer överens med det id vi får från "jsCall"
    editName.value = editingProduct.namn; //Nuvarande värde visas.
    editJersey.value = editingProduct.jersey;
    editAge.value = editingProduct.age;
    editBorn.value = editingProduct.born;
    showSection('sectionEdit');
}

let items = [];
refreshItems();