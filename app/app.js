import Persona from "./persona.js";

$(document).ready(function(){
    /*cargo el DOM*/
    console.log("El DOM esta listo");

    /*creo la primera funcion perteneciente al formulario*/
    $('#formulario').submit(function(e){

        /*para que no recargue la pagina*/
        e.preventDefault();

        /*capturo los valores del primer form*/
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = $('#dni').val();

        let mes = $("#mes").val();
        
        /*hacemos la prueba para ver si lo trae*/
        // console.log(nombre);
        // console.log(dni);
        // console.log(typeof mes);

        /*capturo valores del segundo form - calculos*/
        let basico = $('#basico').val();
        let descuento = $('#descuento').val();
        let feriado = $('#feriado').val();
        let bono = $('#bono').val();

        let total = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(feriado) + parseFloat(bono);

        // console.log(total);

        /*instancio la clase persona*/
        let persona = new Persona(nombre, apellido, dni);
        console.log(persona.toString())

        /*le asigno el salario*/
        persona.asignarSueldo(mes, total);

        /*guardo los datos en el local storage*/
        if(localStorage.getItem('personas')===null){

            /*creo un array de personas para guardar los obejtos ahi*/
            let personas = [];
            personas.push(persona);

            /*lo guardo en mi storage*/
            localStorage.setItem('personas', JSON.stringify(personas));
        }else{
            let personas = JSON.parse(localStorage.getItem('personas'))
            personas.push(persona)
            localStorage.setItem('personas', JSON.stringify(personas))
        }

        /*llamo a otro metodo para verlo en el html*/
        verEnHtml();

        // console.log(persona.verSueldo(mes));

        $('#formulario').trigger("reset");
    });

    function verEnHtml(){


    /*extraigo mi cadena json*/
    let personas = JSON.parse(localStorage.getItem('personas'));

    for(let i = 0; i < personas.length; i++){
        
        let nombre = personas[i]._nomb;
        let apellido = personas[i]._apell;
        let dni = personas[i]._dni;

        let basico = $('#basico').val();
        let descuento = $('#descuento').val();
        let feriado = $('#feriado').val();
        let bono = $('#bono').val();

        let mes = $("#mes").val();
        let sueldo = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(feriado) + parseFloat(bono);
        let concepto = $('#concepto').val();

        $('#recib').append(`<div class="recibo__hecho">
        <h4>${mes.toUpperCase()}</h4>
        <div class="datos__cargados">
            <div class="dato__cargado dato__cargado--uno">
                <p>Nombre:</p>
                <p>${nombre}</p>
            </div>
            <div class="dato__cargado dato__cargado--dos">
                <p>Apellido:</p>
                <p>${apellido}</p>
            </div>
            <div class="dato__cargado dato__cargado--tres">
                <p>D.N.I.:</p>
                <p>${dni}</p>
            </div>
            <div class="dato__cargado dato__cargado--cuatro">
                <p>Concepto:</p>
                <p>${concepto}</p>
            </div>
        </div>
        <div class="conceptos__cargados">
            <div class="concepto__fila nombre_concepto">
                <h5 class="fila__uno">Concepto</h5>
                <h5 class="fila__dos">Cantidad</h5>
                <h5 class="fila__tres">Saldo</h5>
            </div>
            <div class="concepto__fila basico">
                <p class="fila__uno">Sueldo básico</p>
                <p class="fila__dos">30</p>
                <p class="fila__tres">${basico}</p>
            </div>
            <div class="concepto__fila faltados">
                <p class="fila__uno">Descuento</p>
                <p class="fila__dos"></p>
                <p class="fila__tres">${descuento}</p>
            </div>
            <div class="concepto__fila plus">
                <p class="fila__uno">Plus feriado</p>
                <p class="fila__dos"></p>
                <p class="fila__tres">${feriado}</p>
            </div>
            <div class="concepto__fila bono">
                <p class="fila__uno">Bonos / premios</p>
                <p class="fila__dos"></p>
                <p class="fila__tres">${bono}</p>
            </div>
            <div class="concepto__fila total">
                <h5 class="fila__uno">Total</h5>
                <p class="fila__dos"></p>
                <h5 class="fila__tres">${sueldo}</h5>
            </div>
        </div>
    </div>`);
    }

    }


});




/*probando mi persona*/
// let n = "eduar";
// let a = "chilon"
// let dni = 94221723;
// let personas = [];
// let eduar = new Persona(n, a, dni);
// personas.push(eduar);
// for(let i = 0; i < personas.length; i++){
//     let nombre = personas[i].nombre;

//     console.log(nombre);
// }

