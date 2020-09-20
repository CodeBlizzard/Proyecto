const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const USUARIOS_URL = "https://raw.githubusercontent.com/CodeBlizzard/Proyecto-JAP2020/master/usuarios.json";

var showSpinner = function(){
  var spinner = document.getElementById("spinner-wrapper");
  if (spinner){
    spinner.style.display = "block";
  }
}
//El spinner tira error, tratar de modificarlo mejor luego
var hideSpinner = function(){
  if (document.getElementById("spinner-wrapper") == null){
    return;
  }
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(e){

  let masterUser = localStorage.getItem('activeUser');
  let infoUser = document.getElementById("mainUser");
  let user = document.getElementById("userInfo");

  if (masterUser) {
    masterUser = JSON.parse(masterUser);
    user.innerText = user.innerText + masterUser.email;
    infoUser.style = "display: inline-block";
  }

  
  document.getElementById("out").addEventListener("click", function(){

    localStorage.removeItem('activeUser');

    window.location = 'index.html';
  });
});