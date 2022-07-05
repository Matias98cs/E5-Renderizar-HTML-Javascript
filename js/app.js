//selectors
// En este ultimo desafío general vamos a utilizar el mismo array "Pizzas🍕":

// 👉 Guardarlo en el local storage. 
// 👉 Renderizar HTML desde JS. 
// 👉 Renderizar en cards todas las pizzas del array (Incluir nombre, imagen, precio e ingredientes). 
// 👉 Crear una barra de búsqueda (input), la cual tenga la función de mostrarnos solo las pizzas cuyos nombres coincidan con la búsqueda realizada. 

export const formulario = document.querySelector('#formulario');
export const inputId = document.querySelector('#pizzId');
export const divMostrar = document.querySelector('.mostrar');
export const divError = document.querySelector('.error');

let pizzaLocal = [];

window.addEventListener('load', () => {
    pizzaLocal = JSON.parse(localStorage.getItem('pizzaLocal')) || [];
    showHTML();
})

document.addEventListener('DOMContentLoaded', () => {
    
    const url = 'pizzas.json';

    fetch(url)
        .then(resp => {
            return resp.json()
        })
        .then(resp => {
            SaveData(resp);
        })
})


function SaveData(data){
    data.forEach(data => {
        const { id, nombre, ingredientes, precio, image, cantidad} = data; 
        
        const pizzasObj = {
            id,
            nombre,
            ingredientes,
            precio,
            image,
            cantidad
        }

        pizzaLocal = [...pizzaLocal, pizzasObj];
    });
    sincroLocalStorage();
    showHTML();

}

function showHTML(){

    while(divMostrar.firstChild) {
        divMostrar.removeChild(divMostrar.firstChild);
    }

    if(pizzaLocal.length > 0){
        pizzaLocal.forEach(pizza => {
            
            const { id, nombre, ingredientes, precio, image, cantidad} = pizza;
            const divIngre = document.createElement('div');
            const contPDiv = document.createElement('div');
            const idP = document.createElement('p');
            const title = document.createElement('h1');
            const titlePrice = document.createElement('h4');
            const contDiv = document.createElement ('div')
            const img = document.createElement('img');
            const ingreTitle = document.createElement('strong');

            ingreTitle.innerHTML = 'Ingredientes'
            contPDiv.classList.add('content-p');
            contDiv.classList.add('nombres-pizzas');
            idP.classList.add('idp');
            idP.textContent = `ID: ${id}`
            title.textContent = nombre;
            titlePrice.textContent = `Precio: $${precio}`;
            img.classList.add('img-pizza');
            img.src = image;
        
            contPDiv.appendChild(idP);
            contDiv.appendChild(contPDiv);
        
            // contDiv.appendChild(idP);
            contDiv.appendChild(title);
            contDiv.appendChild(titlePrice);
            contDiv.appendChild(img);         
            contDiv.appendChild(ingreTitle);
            // contDiv.appendChild(cantidadP);
            divMostrar.appendChild(contDiv);

            ingredientes.forEach( ingre => {
                const html = document.createElement('li');
                html.classList.add('ingredientes-p')
                html.innerHTML = ingre;
                divIngre.appendChild(html)
                contDiv.appendChild(divIngre)
            })

        })
    }

}

function sincroLocalStorage(){
    localStorage.setItem('pizzaLocal', JSON.stringify(pizzaLocal));
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarHTML();
    const buscar = inputId.value;
    console.log(buscar)

    validarNumero(buscar);
    pizzaLocal.forEach( data => {
        const { id, nombre, ingredientes, precio, image, cantidad} = data;
        if(buscar == id){
            const divIngre = document.createElement('div');
            const contPDiv = document.createElement('div');
            const idP = document.createElement('p');
            const title = document.createElement('h1');
            const titlePrice = document.createElement('h4');
            const contDiv = document.createElement ('div')
            const img = document.createElement('img');
            const ingreTitle = document.createElement('strong');

            ingreTitle.innerHTML = 'Ingredientes'
            contPDiv.classList.add('content-p');
            contDiv.classList.add('nombres-pizzas');
            idP.classList.add('idp');
            idP.textContent = `ID: ${id}`
            title.textContent = nombre;
            titlePrice.textContent = `Precio: $${precio}`;
            img.classList.add('img-pizza');
            img.src = image;
        
            contPDiv.appendChild(idP);
            contDiv.appendChild(contPDiv);
        
            contDiv.appendChild(title);
            contDiv.appendChild(titlePrice);
            contDiv.appendChild(img);         
            contDiv.appendChild(ingreTitle);
            divMostrar.appendChild(contDiv);

            ingredientes.forEach( ingre => {
                const html = document.createElement('li');
                html.classList.add('ingredientes-p')
                html.innerHTML = ingre;
                divIngre.appendChild(html)
                contDiv.appendChild(divIngre)
            })
        }
    })

})

function validarNumero(nro) {
    if(nro > 0 && nro <= 6 ){
        return nro;
    } else {
        mostrarError('Debe ingresar un numero del 1 al 6');
    }
}

function mostrarError(msj) {
    const erorrP = document.createElement('p');
    const contError = document.createElement('div');
    erorrP.textContent = msj;
    contError.classList.add('erorr');

    contError.appendChild(erorrP)
    divError.appendChild(contError);

    setTimeout(() => {
        contError.remove();
    }, 1600);
}

function limpiarHTML(){
    while(divMostrar.firstChild){
        divMostrar.removeChild(divMostrar.firstChild);
    }
}