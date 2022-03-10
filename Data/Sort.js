import{ renderTr } from "./RenderTr.js"
import { items} from "./Items.js"
import { productTableBody } from "./ProductTableBody.js";

//SORT BY NAME
export const sortByName = document.getElementById('sortByName')

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
    console.log(sortedList)
    productTableBody.innerHTML = ''; //och skriva om sidan.
    sortedList.forEach((item) =>{
        renderTr(item);
    });
});

// SORT BY JERSEY
export const sortByJersey = document.getElementById('sortByJersey')

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
export const sortByAge = document.getElementById('sortByAge')

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
export const sortByBorn = document.getElementById('sortByBorn')

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


