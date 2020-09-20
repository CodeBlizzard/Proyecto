var product = {};
var comentarios = [];
var productsArray = [];


function showProduct(product, arrayComments){
    let datos = "";
    let imagenes = "";
    let comments = "<hr>";

    datos += `
    <br>
    <h2> &nbsp; ${product.name} </h2>
    ${product.description}<br><br>

    <strong>&nbsp;Precio: U$S</strong> ${product.cost} <br>
    <strong>&nbsp;${product.soldCount}</strong> unidades vendidas <br><br>
    `;
    
    arrayComments.forEach(function (comment){
        let calificacion = comment.score + "/5";

        comments += `&nbsp; &nbsp;
        <strong>${comment.user}</strong> dijo: <br>
        <p> &nbsp; &nbsp; ${comment.description}</p>
        `;

        comments += `&nbsp; &nbsp; <span><sub>${calificacion}</sub></span>  `;
        comments += `&nbsp; <sub>${comment.dateTime}</sub><br><br><hr>`
    });

    imagenes += `
      <div class="carousel-item active">
            <img src= ${product.images[0]} class="d-block w-35" alt="..." height="200">
          <div class="carousel-caption d-none d-md-block"></div>
      </div>

      <div class="carousel-item ">
            <img src= ${product.images[1]} class="d-block w-35" alt="..." height="200">
          <div class="carousel-caption d-none d-md-block"></div>
      </div>

      <div class="carousel-item ">
            <img src= ${product.images[2]} class="d-block w-35" alt="..." height="200">
          <div class="carousel-caption d-none d-md-block"></div>
      </div>

      <div class="carousel-item ">
            <img src= ${product.images[3]} class="d-block w-35" alt="..." height="200">
          <div class="carousel-caption d-none d-md-block"></div>
      </div>

      <div class="carousel-item ">
            <img src= ${product.images[4]} class="d-block w-35" alt="..." height="200">
          <div class="carousel-caption d-none d-md-block"></div>
      </div>
    `;

    document.getElementById("contenedor").innerHTML = datos;
    document.getElementById("imagenes").innerHTML = imagenes;
    document.getElementById("comentarios").innerHTML = comments;
}

function related(allProducts, product){
    let contenido = "<hr>";

    product.relatedProducts.forEach(function(i){
        contenido += '<img src= ' + allProducts[i].imgSrc + ' width=10% height=10%> <br>' + '<br>';
        contenido += '<b>' + allProducts[i].name + '</b>' + '<br>' + '<br>';
        contenido += allProducts[i].description + '<br>';
        contenido += '<b>' + 'Precio (en ' + allProducts[i].currency + '):' + '</b>' + ' $' + allProducts[i].cost + '<br>' + '<br>';
        contenido += '<a href="product-info.html"><button style = "float: right;"> Ver producto </button></a>'
        contenido += '<br><hr>';
    });

    document.getElementById("related-products").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showProduct(product, comentarios);
        }
    });
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            related(productsArray, product);
        }
    });
    let userLogged = localStorage.getItem('activeUser');
    if (userLogged) {
        document.getElementById("nuevo-comentario").style = "display: inline-block";
    }

    document.getElementById("enviar-comentario").addEventListener("click", function() {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        showProduct(product, comentarios);
    });
});

