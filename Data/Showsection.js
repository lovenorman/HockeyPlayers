//Metod för att visa olika sektioner av html via variablerna ovan.
window.showSection = showSection

const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')

const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

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
