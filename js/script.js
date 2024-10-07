//Se inician las variables
var tarjetasDestapadas = 0;
var tarjeta1 = null;
var tarjeta2 = null;
var primerResultado = null;
var segundoResultado = null;
var movimientos = 0;
var aciertos = 0;
var temporizador = false;
var tiempo = 60;
var tiempoInicial = tiempo;
var cuentaRegresivaId = null;

//Variables para los sonidos
const clickAudio = new Audio('./sounds/click.wav');
const rightAudio = new Audio('./sounds/right.wav');
const winAudio = new Audio('./sounds/win.wav');
const wrongAudio = new Audio('./sounds/wrong.wav');
const loseAudio = new Audio('./sounds/lose.wav');

//Apuntar a documento HTML
var mostrarMovimientos = document.getElementById('movimientos');
var mostrarAciertos = document.getElementById('aciertos');
var mostrarTiempo = document.getElementById('t-restante');

//Se generan numeros aleatorios
var numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});

//Funciones
function contarTiempo(){
    cuentaRegresivaId = setInterval(()=>{
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;
        if (tiempo == 0){
            clearInterval(cuentaRegresivaId);
            bloquearTarjetas();
            loseAudio.play();
        }        
    },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i <=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;;
        tarjetaBloqueada.disabled = true;
    }
}
//Se crea la función principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        //Se muestra primer numero, con document se hace referencia al HTML
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
        clickAudio.play();
         //Se desahibilita el primer boton
         tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2){
        //Se muestra el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;;

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Se incrementan los movimientos al elegir 2 tarjetas
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        
        if(primerResultado ==segundoResultado){
            //Si es igual se permite seguir destapando tarjetas
            tarjetasDestapadas = 0;

            //Se aumentan los aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`; 
            rightAudio.play();
            if(aciertos == 8){
                winAudio.play();
                clearInterval(cuentaRegresivaId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👏😃`;
                mostrarTiempo.innerHTML = `Tiempo: ${tiempoInicial - tiempo} segundos 🎉`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
            }

        } else { 
            //Mostrar momentaneamente valores y volver a tapar
            wrongAudio.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }  

}