//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ASCENDANT_PRICE = "asc_price";
const DESCENDANT_PRICE = "desc_price";
const RELEVANCE = "sold_units";

// En categories.js se usa "AZ" "ZA" y "Cant." en las constantes

var productsArray = [];

var minPrice = undefined;
var maxPrice = undefined;

function showProductsList(array){

    let contenido = "<br><hr><br>";
    for(let i=0; i < array.length; i++){
        let category = array[i];

        if(((minPrice == undefined) || (minPrice != undefined && parseInt(category.cost) >= minPrice)) && ((maxPrice == undefined) || (maxPrice != undefined && parseInt(category.cost) <= maxPrice))) {

            contenido += '<img src= ' + category.imgSrc + ' width=27% height=27%>';
            contenido += '<b>' + 'Modelo: ' + '</b>' + category.name + '<br>';
            contenido += '<b>' + 'Descripción: ' + '</b>' + category.description + '<br>';
            contenido += '<b>' + 'Precio (en ' + category.currency + '):' + '</b>' + ' $' + category.cost + '<br>' + '<br>';
            contenido += 'Unidades vendidas: ' + category.soldCount;
            contenido += '<a href="product-info.html"><button style = "float: right;"> Ver producto </button></a>'
            contenido += '<br><br><br><hr><br>';
        }

        document.getElementById("contenido").innerHTML = contenido;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = sortProducts(ASCENDANT_PRICE, productsArray);

            showProductsList(productsArray);
        }
    });
});

/*
Forma de ordenar:

const array_uno = [1, 100, 6, 200, 9, 7];
const array_dos = [
    { nombre: "Max", apellido: "Verstappen"},
    { nombre: "Carlos, apellido: "Sainz"},
    { nombre: "Esteban", apellido: "Ocon"},
    { nombre: "Lewis", apellido: "Hamilton"},
]
array_uno.sort((a, b)){
    if (a < b){
        return -1;
    }

    if (a > b){
        return 1;
    }

    return 0;
}

array_dos.sort((a, b)){
    return a-b;
}

array_dos.sort((a, b)){
    if (a.apellido > b.apellido) {
        return -1;
    }
    if (a.apellido < b.apellido) {
        return 1
    }
    return 0
}

Pueden darse problemas con las mayusculas y minusculas
*/

function sortProducts(criterio, array) {
    let result = [];

    if (criterio == ASCENDANT_PRICE) {
        result = array.sort(function (a, b) {

            if (a.cost < b.cost) {
                return -1;
            }

            if (a.cost > b.cost) { 
                return 1;
            }
            return 0;
        });
    } else if (criterio == DESCENDANT_PRICE) {
        result = array.sort(function (a, b) {

            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criterio == RELEVANCE) {
        result = array.sort(function (a, b) {

            if (a.soldCount > b.soldCount) {
                return -1;
            }

            if (a.soldCount < b.soldCount) {
                return 1;
            }
            return 0;
        });
    }

    return result;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = sortProducts(ASCENDANT_PRICE, productsArray);

            showProductsList(productsArray);
        }
    });
    // Se busca el id del elemento y al ser seleccionado se ordenan los productos
    document.getElementById("cheaper").addEventListener("click", function () {
        productsArray = sortProducts(ASCENDANT_PRICE, productsArray);

        showProductsList(productsArray);
    });

    document.getElementById("expensive").addEventListener("click", function () {
        productsArray = sortProducts(DESCENDANT_PRICE, productsArray);

        showProductsList(productsArray);
    });

    document.getElementById("hot-sale").addEventListener("click", function () {
        productsArray = sortProducts(RELEVANCE, productsArray);

        showProductsList(productsArray);
    });
});

document.getElementById("filtrar").addEventListener("click", function() {

    minPrice = document.getElementById("rangoMin").value;
    maxPrice = document.getElementById("rangoMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    }

    else {
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    }

    else {
        maxPrice = undefined;
    }

    showProductsList(productsArray);
});
//Regresa al orden normal si no se define un valor
document.getElementById("clean").addEventListener("click", function() {
    document.getElementById("rangoMin").value = "";
    document.getElementById("rangoMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProductsList(productsArray);
});

