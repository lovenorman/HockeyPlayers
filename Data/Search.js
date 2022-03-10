import { items } from './Items.js'

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