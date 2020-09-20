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