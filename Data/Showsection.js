import { refreshItems } from "./RefreshItems.js"

window.showSection = showSection

export const sectionList = document.getElementById('sectionList')
export const sectionNew = document.getElementById('sectionNew')
export const sectionEdit = document.getElementById('sectionEdit')

export const listLink = document.getElementById('listLink')
export const newLink = document.getElementById('newLink')

//Metod för att visa olika sektioner av html via variablerna ovan.
export function showSection(sectionsId){
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
