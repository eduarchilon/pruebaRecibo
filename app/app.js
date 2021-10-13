import Persona from "./persona.js";

$(document).ready(function(){
    /*cargo el DOM*/
    console.log("El DOM esta listo");

    /*creo la primera funcion perteneciente al formulario*/
    $('#form').submit(function(e){
        // console.log("CLICK PROCESAR");
        /*para que no recargue la pagina*/
        e.preventDefault();

        /*llamo a la funcion verRecibo()*/
        verRecibo();

        /*para que no se resetee*/
         $('#form').trigger("reset");
           
    })

    /*(111) funcion para ver recibo*/
    function verRecibo() {

        /*capturo el valor del mes para mi storage*/
        let mesV = parseInt($("#mes").val());

        /*capturo los valores para verlos en mi recibo**/
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = $('#dni').val();
        let mes = $("#mes option:selected").text();
        
        let basico = $('#basico').val();
        let descuento = $('#descuento').val();
        let bono = $('#bono').val();
        let total = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(bono);

         /*es mucho mejor html para reemplazar -
         y de paso lo veo en el html lo capturado */
         $('#recibo').html(`
         <h5>Mes: <h5 id="rmes">${mes}</h5></h5>
         <p>Nombre: <p id="rnombre">${nombre}</p></p>
         <p>Apellido: <p id="rapellido">${apellido}</p></p>
         <p>Dni: <p id="rdni">${dni}</p></p>
         <p>Basico:$ <p id="rbasico">${basico}</p></p>
         <p>Descuento: -$<p id="rdescuento">${descuento}</p></p>
         <p>Bono:+$<p id="rbono">${bono}</p></p>
         <p>Total:$ <p id="rtotal">${total}</p></p>
         `);

         /*creo mi obejto de datos para guardar en el storage despues*/
         let datos = {persona: new Persona(nombre, apellido, dni),
            mes: mes,
            basico: basico,
            descuento: descuento,
            bono:bono,
            total:total
         }
        //  let persona = new Persona(nombre, apellido, dni);
         /*le gurado el sueldo con su metodo*/
         datos.persona.asignarSueldo(mesV, total);
        //  console.log(datos.persona.verSueldo(mesV));
        //  console.log(datos.persona.toString());
        // console.log(datos.mes)
        //  console.log(datos.persona._nomb + datos.persona._dni);
        
        /*guardo los datos en el storage*/
        if(localStorage.getItem('personas')===null){
            let personas = [];
            personas.push(datos);
            localStorage.setItem('personas', JSON.stringify(personas));
        }else{
            let personas = JSON.parse(localStorage.getItem('personas'));
            personas.push(datos);
            localStorage.setItem('personas', JSON.stringify(personas));
        }

        /*condiciono para que me muestre si esta lleno de lo contrario no lo muestra*/
        if(nombre ==""){
            $('#recibo').hide();
            $('#agregar').hide();
        }else{
            $('#recibo').show();
            /*para que muestre el boton de agregar a la lista*/
            $('#agregar').show();
            
        }    
    }



    /*boton de agregar a la lista*/
    $('#btn-b').click(function(){
        /*llama a la funcion (222)*/
        verificadorDeLista();

        let nombre = $('#rnombre').text();
        let apellido = $('#rapellido').text();
        /*lo convierto a number*/
        let dni = parseInt($('#rdni').text());

        $('#lista').append(`
        <option value="${dni}" id="${dni}">${nombre} ${apellido}</option>
        `)
        $('.contenedor__lista').show();
    })


    /*(222) funcion de verificador de lista*/
    function verificadorDeLista(){
        let idI = $('#rdni').text();
        if($('#'+ idI).val()===$('#rdni').text()){
            $('#' + idI).remove();
        }     
    }

    $('#btn-c').click(function(){
        /*(333) llamo a la funcion*/

        $('.contenedor__mes').show();
        
    })


    $('#btn-d').click(function(){

        // let valor = $('#listaMes').val();
        //   console.log(valor) 
        
          verReciboGuardado(); 
      
    })

    /*funcion especialmente para traer del storage mi recibo guardado*/
    function verReciboGuardado(){
        /*extraigo mi cadena json*/
        let personas = JSON.parse(localStorage.getItem('personas'));
        /*igualo las variables con los input y valores que busque y seleeciones para lego condicionarlo en la iteracion*/
        let usuario = parseInt($('#lista').val());
        let mesSelect = $('#listaMes').val();
        for(let i = 0; i<personas.length; i++){

            let nombre = personas[i].persona._nomb;
            let apellido = personas[i].persona._apell;
            let dni = personas[i].persona._dni;
            let mes = personas[i].persona._sueldos[i].mes;


            let basico = personas[i].basico;
            let descuento = personas[i].descuento;
            let bono = personas[i].bono;
            let total = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(bono);
            
            if(usuario===dni && mesSelect===mes){
            $('#recibo').html(`
                <h5>Mes: <h5>${mes}</h5></h5>
                <p>Nombre: <p>${nombre}</p></p>
                <p>Apellido: <p>${apellido}</p></p>
                <p>Dni: <p>${dni}</p></p>
                <p>Basico:$ <p>${basico}</p></p>
                <p>Descuento: -$<p>${descuento}</p></p>
                <p>Bono:+$<p>${bono}</p></p>
                <p>Total:$ <p>${total}</p></p>
                `);
            // console.log(personas[i].persona._sueldos[i].salario);
            // console.log(personas.length)
        }else{
            console.log("No existe")
        }
    }
    }  

})