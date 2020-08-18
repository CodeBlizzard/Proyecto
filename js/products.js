//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

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
            contenido += '<br><br><br><hr><br>';
        }

        document.getElementById("contenido").innerHTML = contenido;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showProductsList(productsArray);
        }
    });
});

document.getElementById("buscar").addEventListener("click", function() {

    minPrice = document.getElementById("rango-min").value;
    maxPrice = document.getElementById("rango-max").value;

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

document.getElementById("limpiar").addEventListener("click", function() {
    document.getElementById("rango-min").value = "";
    document.getElementById("rango-max").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProductsList(productsArray);
});

