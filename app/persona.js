export default class Persona{
    constructor(nombre, apellido, dni){
        this._nomb = nombre.toUpperCase();
        this._apell = apellido.toUpperCase();
        this._dni = parseInt(dni);
        this._mes = new Array(12);
    }

    set nombre(n){
        this._nomb = n.toUpperCase();
    }

    set apellido(apell){
        this._apell = apell.toUpperCase();
    }

    set dni(d){
        this._dni = parseInt(d);
    }

    get nombre(){
        return this._nomb;
    }

    get apellido(){
        return this._apell;
    }

    get dni(){
        return this._dni;
    }

    toString(){
        let texto = "Nombre y Apellido: " + this._nomb + " " + this._apell + ", DNI: " + this._dni
        return texto;
    }

    asignarSueldo(nombreMes, cant) {
      let cantidad = parseFloat(cant);
        switch (nombreMes) {
          case "Enero":
            this._mes[0] = { mes: nombreMes, salario: cantidad };
            // console.log(this._mes[0].mes)
            break;
          case "Febrero":
            this._mes[1] = { mes: nombreMes, salario: cantidad };
            break;
          case "Marzo":
            this._mes[2] = { mes: nombreMes, salario: cantidad };
            break;
          case "Abril":
            this._mes[3] = { mes: nombreMes, salario: cantidad };
            break;
          case "Mayo":
            this._mes[4] = { mes: nombreMes, salario: cantidad };
            break;
          case "Junio":
            this._mes[5] = { mes: nombreMes, salario: cantidad };
            break;
          case "Julio":
            this._mes[6] = { mes: nombreMes, salario: cantidad };
            break;
          case "Agosto":
            this._mes[7] = { mes: nombreMes, salario: cantidad };
            break;
          case "Septiembre":
            this._mes[8] = { mes: nombreMes, salario: cantidad };
            break;
          case "Octubre":
            this._mes[9] = { mes: nombreMes, salario: cantidad };
            break;
          case "Noviembre":
            this._mes[10] = { mes: nombreMes, salario: cantidad };
            break;
          case "Diciembre":
            this._mes[11] = { mes: nombreMes, salario: cantidad };
            break;
          default:
            break;
        }
      }
      
      verSueldo(m){
        let mes = this._mes.find(elemento => elemento.mes == m);
        return mes;
      }

      verTotalSalarios(){
        let resultado = 0;
        let numero = 0;
        for(let i = 0; i<12; i++){
            if(this._mes[i]!=null){
          numero = this._mes[i].salario;
          resultado += numero;
            }
        }
        return resultado;
      }
}



