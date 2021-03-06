import { baseApi } from "../API/baseAPI.js";
import { HockeyPlayer } from "./Product.js";
import { renderTr } from "./RenderTr.js";
import { items } from "./Items.js";

export function refreshItems(){

    // fetch('https://hockeyplayers.systementor.se/stefan/player')
    // .then(response=>response.json())
    // .then(array=>{
    //     //json -> items
    //     console.log(array)
    // });

    //items = [];
    while(items.length > 0){
        items.pop();
    }
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
