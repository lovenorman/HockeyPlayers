//Metod för att lägga till nytt item till den befintliga listan
window.renderTr = renderTr

export function renderTr(product){
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