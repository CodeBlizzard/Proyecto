//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var usersArray = [];

function checkInfo(array, enterUser, enterPass){
    for (let i = 0; i < array.length; i++){
        let userInfo = array[i];
        if (userInfo.email == enterUser && userInfo.password == enterPass){
            return true;
        }
    }
    return false;
}


document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("LogIN").addEventListener("click", function(e){

        let inEmail = document.getElementById("inEmail");
        let inPass = document.getElementById("inPass");
        let complete = true;

        /*
        complete verifica que ambos campos no esten vacios
        if (password.value === "" || email.value === "") {
            complete = false;
            alert("Debes ingresar los datos");
        }
        if (complete){
            window.location = 'portal.html';
        } */

        if (inEmail.value === '') {
            inEmail.classList.add("invalid");
            complete = false;
        }

        if (inPass.value === '') {
            inPass.classList.add("invalid");
            complete = false;
        }

        if (complete) {
            getJSONData(USUARIOS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    usersArray = resultObj.data;

                    if (checkInfo(usersArray, inEmail.value, inPass.value)){
                        localStorage.setItem('activeUser', JSON.stringify({email: inEmail.value}));
                        window.location = 'portal.html';
                    } else {
                        alert("Usuario y/o contraseña incorrectos");
                    }
                }
            });
        } else {
            alert("Ingrese ambos campos");
        }
    });
});