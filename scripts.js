let textoInicial = document.querySelector("#texto-inicial")
let textoFinal = document.querySelector("#texto-final")
let encriptarBtn = document.querySelector("#encriptar");
let desencriptarBtn = document.querySelector("#desencriptar");
let errorMessage = document.querySelector(".mensaje-container");
let restriccion = document.querySelector("#restriccion-texto-ingresado");
let copiarTextoBtn = document.querySelector("#copiar-texto");

encriptarBtn.addEventListener("click", encriptarTexto, false);
desencriptarBtn.addEventListener("click", desencriptarTexto, false);
copiarTextoBtn.addEventListener("click", copiarTexto, false);

const llaves = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
}

function textoValido() {
    if(/[A-ZÑáéíóúÁÉÍÓÚ]/.test(textoInicial.value)){
        return false;
    }
    return true;
}

function encriptarTexto() {
    console.log(textoInicial.value);
    if(textoInicial.value.replaceAll(' ', '') === ''){
        console.log('entra if')
        mostrarError();
        ocultarTextoFinal();
        return -1;
    }

    if(!textoValido()) {
        console.log("ERROR");
        restriccion.classList.add('restriccion');
        setTimeout(()=> {
            restriccion.classList.remove('restriccion');
         }
         ,1000);
        
        return -1;
    }

    let texto = "";
    for (let i = 0; i < textoInicial.value.length; i++) {
        if(Object.keys(llaves).indexOf(textoInicial.value[i]) != -1){
            texto += llaves[textoInicial.value[i]];
        }
        else{
            texto += textoInicial.value[i];
        }
    }

    textoFinal.textContent = texto;
    mostrarTextoFinal();
    ocultarError();
}

function desencriptarTexto() {
    console.log(textoInicial.value);
    if(textoInicial.value.replaceAll(' ', '') === ''){
        console.log('entra if')
        mostrarError();
        ocultarTextoFinal();
        return -1;
    }

    if(!textoValido()) {
        console.log("ERROR");
        restriccion.classList.add('restriccion');
        setTimeout(()=> {
            restriccion.classList.remove('restriccion');
         }
         ,1000);
        
        return -1;
    }

    let texto = textoInicial.value;
    const values = Object.values(llaves);
    let esTextoEncriptado = false;

    for (let i = 0; i < values.length; i++) {
        while(texto.includes(values[i])){
            texto = texto.replace(values[i], getKeyByValue(llaves,values[i]));
        }
    }
    
    if(textoInicial.value.length != texto.length){
        textoFinal.textContent = texto;
        mostrarTextoFinal();
        ocultarError();
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function mostrarError() {
    errorMessage.style.display = "flex"
}

function ocultarError() {
    errorMessage.style.display = "none"
}

function mostrarTextoFinal() {
    textoFinal.style.display = "block"
    copiarTextoBtn.style.display = "block"
}

function ocultarTextoFinal() {
    textoFinal.style.display = "none"
    copiarTextoBtn.style.display = "none"
}

function copiarTexto(){
    navigator.clipboard.writeText(textoFinal.textContent);
    copiarTextoBtn.textContent = "Copiado";
    copiarTextoBtn.classList.add('textoCopiado');
    setTimeout(()=> {
        copiarTextoBtn.classList.remove('textoCopiado');
        copiarTextoBtn.textContent = "Copiar";
    }, 1500);
}