// Constructores 
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realizar cotizacion

Seguro.prototype.CotizarSeguro =function(){

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
        break;

        case '2':
         cantidad = base * 1.05;
        break;

        case '3':
            cantidad = base * 1.35;
        break;

        default:
        break;
    }
// leer año para poner diferencia 3% si es mas viejo
const diferencia = new Date().getFullYear()- this.year

cantidad -=((diferencia*3) * cantidad) /100;

//Si el seguro es Basico o Completo 
if(this.tipo==='basico'){
    cantidad*= 1.30;
}else{
    cantidad*=1.50; 
}
return cantidad;

}


function Ui () {}

// Opcion años
Ui.prototype.LLenarOpciones = () => {
    const max =new Date().getFullYear(),
    min = max-25;
    
    const SelectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value=i;
        option.textContent=i;
        SelectYear.appendChild(option);
    }
}

// Alertas
Ui.prototype.MostrarMensaje = (mensaje,tipo	) => {
    const div= document.createElement('DIV')
    if(tipo==='error'){
        div.classList.add('error')
    }else{
        div.classList.add('correcto')
    }
    div.classList.add('mensaje', 'mt-10')
    // Insertar Mensaje
    div.textContent= mensaje
    const Formulario = document.querySelector('#cotizar-seguro')
    Formulario.insertBefore(div, document.querySelector('#resultado'))
    setTimeout(() => {
        div.remove();
    }, 2000);
}

Ui.prototype.MostrarResultado= function(total,seguro){

    const{marca,year,tipo}= seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca='Americano';
        break;

        case '2':
            textoMarca='Asiatico';
        break;

        case '3':
            textoMarca='Europeo';
        break;
            
        default:
        break;
    }

    const div = document.createElement('div')
    div.classList.add('mt-10')
    div.innerHTML=`
        <p class="header"> Tu resumen </p>
        <p class="font-bold"> Marca:<span class="font-normal">  ${textoMarca} </span></p>
        <p class="font-bold"> Año:<span class="font-normal">  ${year} </span></p>
        <p class="font-bold"> Tipo:<span class="font-normal capitalize">  ${tipo} </span></p>
        <p class="font-bold"> Total:<span class="font-normal">  $${total} </span></p>
    `;
    const resultadodiv = document.querySelector ('#resultado');
    

    //mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display= 'block';
    setTimeout(() => {
        spinner.style.display='none'
        resultadodiv.appendChild(div)
    }, 2000);

}


const ui =new Ui();
console.log (ui)

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    ui.LLenarOpciones(); // LLena lo seleccionado con los años
})

EventListener()
function EventListener() {
    const Formulario = document.querySelector('#cotizar-seguro')
    Formulario.addEventListener('submit', CotizarSeguro);
}


function CotizarSeguro (e){
    e.preventDefault();

    //Validar Marca 
    const marca = document.querySelector('#marca').value;
    
    //Validar Año
    const year = document.querySelector('#year').value;
    
    //Validar Cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    
    if (marca==='' || year === '' || tipo === '') {
        ui.MostrarMensaje('Todos los campos son Obligatorios','error')
         return;  
    }
    
    ui.MostrarMensaje('Aguarde un momento','correcto')
    // Ocultar cotizaciones previos
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    // seguro
    const seguro = new Seguro(marca,year,tipo);
    const total = seguro.CotizarSeguro()
    ui.MostrarResultado(total,seguro);

    //Utilizar prototype para cotizar
}