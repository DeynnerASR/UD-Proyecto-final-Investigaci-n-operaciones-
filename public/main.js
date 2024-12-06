// Radio buttons destinados al metodo
const radiobutton_metodoGrafico = document.getElementById('metodoGrafico');
const radiobuttonmetodoDosPasos = document.getElementById('metodoDosPasos');

// Radio buttons destinados al tipo de ejercicio Maximización o Minimización
const radioButtonMaximo = document.getElementById('maximizacion')
const radioButtonMin = document.getElementById('minimizacion')

// seccion de la función objetivo
const seccionFuncionObjetivo = document.getElementById('funcionObjetivo');

// Campos pertenecientes a la funcion objetivo del metodo grafico
const campos_funcion_objetivo_grafico = document.getElementById('graficoCampos');
const campos_funcion_objetivo_dosFases = document.getElementById('dosFasesCampos');

// Sección de restricciones
const seccionRestricciones = document.getElementById('restricciones');
const imputCantidadRestricciones = document.getElementById('cantidadRestricciones');

// Sección de la cantidad de variables
const seccionVariables = document.getElementById('variables');
const inputCantidadVariables = document.getElementById('cantidadDeVariables')

// Seccion para los datos de la grafica
const seccion_datos_grafica = document.querySelector('.data_graphics__data');

// Botones
const generarFuncionObjetivo = document.getElementById('generarFuncionObjetivo');
const generarRestricciones = document.getElementById('generarRestricciones');
const camposRestricciones = document.getElementById('camposRestricciones');

// Formulario
const formulario = document.getElementById('dynamicForm')



let tipo = '' //max o min
let metodo = '' //grafico o dosfases

let restricciones__transformadas = []


/*
  Funciones necesarias
*/

const crear_panel_informacion_graficos = (informacion)=>{
  const panel = document.createElement('div');
  panel.classList.add('panel_datos_grafica');

  const panel_interseccion = document.createElement('ul');
  panel_interseccion.classList.add('panel_datos_grafica__intersecciones')

  const panel_grafica_valor = document.createElement('ul');
  panel_grafica_valor.classList.add('panel_datos_grafica__valor')

 

  informacion.intersections.forEach((interseccion,i)=>{
    const item_punto_interseccion = document.createElement('li');
    item_punto_interseccion.innerHTML = `Interseccion #${i+1}: (${interseccion.x},${interseccion.y}) `
    panel_interseccion.appendChild(item_punto_interseccion);
  })

  // si el tipo max o min
  let indice ;
  const item_valor_interseccion_resultado = document.createElement('li');
  const item_valor_resultado = document.createElement('li');
  if(tipo == 'max'){
    indice = informacion.maxIndex
    item_valor_resultado.innerHTML = `Valor maximo : ${informacion.maxValue}`
  }else{
    indice = informacion.minIndex
    item_valor_resultado.innerHTML = `Valor minimo : ${informacion.minValue}`
  }

  item_valor_interseccion_resultado.innerHTML = `Interseccion resultado (${informacion.intersections[indice].x}, ${informacion.intersections[indice].y})`;

  console.log(
    `DATOS DE LA PETICION:
     - intersecciones: ${informacion.intersections}
     - valor_maximo : ${informacion.maxValue}
     - valor_minimo : ${informacion.minValue}
     - indice del valor_minimo : ${informacion.minIndex}
     - indice del valor_maximo : ${informacion.maxIndex}

     - indice prueba ${indice}
     - interseccion resultado (${informacion.intersections[indice].x}, ${informacion.intersections[indice].y})
    `
  );

  console.log(informacion.intersections[indice]);


  panel_grafica_valor.appendChild(item_valor_interseccion_resultado)
  panel_grafica_valor.appendChild(item_valor_resultado);
  
  panel.appendChild(panel_grafica_valor)
  panel.appendChild(panel_interseccion);

  return panel;
}


/* Eventos de cuando se seleccione un radiobutton 
   ya sea Maximización o Minimización
*/

//Maximización
radioButtonMaximo.addEventListener('change', () => {
    tipo = 'max'
    
});

// Minimización
radioButtonMin.addEventListener('change', () => {
    tipo = 'min'
});



/* Mostrar campos según el método seleccionado Metodo grafico / Metodo dos pasos
*/

// Metodo grafico
radiobutton_metodoGrafico.addEventListener('change', () => {
  metodo = 'grafico';
  
  camposRestricciones.innerHTML = '';
  campos_funcion_objetivo_dosFases.innerHTML = ` `

  seccionFuncionObjetivo.classList.remove('hidden');
  campos_funcion_objetivo_grafico.classList.remove('hidden');
  seccionRestricciones.classList.remove('hidden');

  seccionVariables.classList.add('hidden');
  
});

// Metodo dos pasos
radiobuttonmetodoDosPasos.addEventListener('change', () => {
  metodo = 'dosFases'
  inputCantidadVariables.required;

 //Ocultar secciones de la función objetivo
  campos_funcion_objetivo_grafico.classList.add('hidden'); // Ocultar campos específicos del método gráfico
  seccionFuncionObjetivo.classList.add('hidden');

  seccionRestricciones.classList.add('hidden')
  camposRestricciones.innerHTML = '';


  seccionVariables.classList.remove('hidden');

  //restricciones.classList.remove('hidden');
});


const crearCampos = (campo, i,numero_variables)=>{
  const input = document.createElement('input')
  input.type = 'number'
  input.required;

  const simbolo = document.createElement('select');
  const opcionSuma = document.createElement('option');
  opcionSuma.value = "+";
  opcionSuma.textContent = "+";

  const opcionResta = document.createElement('option');
  opcionResta.value = "-";
  opcionResta.textContent = "-";

  simbolo.required;

  simbolo.appendChild(opcionSuma)
  simbolo.appendChild(opcionResta)

  campo.appendChild(input);
  if(i == ((numero_variables)-1)){
    
  }else{
    campo.appendChild(simbolo);
  }
  
}

// Evento que se ejecuta cuando el boton de "Generar funcion objetivo" es clickeado
// en el metodo de dos faces
generarFuncionObjetivo.addEventListener('click',()=>{
  
  campos_funcion_objetivo_dosFases.innerHTML = ` `
  const numero_variables = inputCantidadVariables.value;
  let i;
  for(i=0;i<numero_variables;i++){
    crearCampos(campos_funcion_objetivo_dosFases,i,numero_variables);  
  }

  console.log(campos_funcion_objetivo_dosFases);
  seccionFuncionObjetivo.classList.remove('hidden')
  campos_funcion_objetivo_dosFases.classList.remove('hidden')

  seccionRestricciones.classList.remove('hidden')
})

// Evento que se ejecuta cuando el formulario es enviado
formulario.addEventListener('submit',async (e)=>{
    e.preventDefault();
    restricciones__transformadas.splice(0, restricciones__transformadas.length);
    alert(`El metodo seleccionado fue ${metodo}`)
    alert(`El tipo seleccionado fue ${tipo}`)


    const inputs_restricciones = Array.from( document.querySelectorAll('.restriccion') )
    console.log(inputs_restricciones);

  // Si el metodo que escogio fue el grafico
  if(metodo == 'grafico'){
    const inputs_funcion_objetivo = Array.from(document.querySelectorAll('.funcion_objetivo_input'));
  
    let funcion_objetivo_enviar = ''
    


    inputs_funcion_objetivo.forEach((elemento,i)=>{
      console.log(elemento.value);
      console.log(`tipo del elemento ${typeof(elemento.value)}`);

        if(i == 0){
          funcion_objetivo_enviar= funcion_objetivo_enviar+`${elemento.value}x`
        }else if(i == 2){
          funcion_objetivo_enviar= funcion_objetivo_enviar+`${elemento.value}y`
        }else{
          funcion_objetivo_enviar = funcion_objetivo_enviar+`${elemento.value}`
        }  
    })

    inputs_restricciones.forEach((restriccion)=>{
      const inputs = Array.from(restriccion.children);

      let restriccion_final = ' '

      console.log(`tamano del array ${inputs.length}`);

      inputs.forEach((input,i)=>{
        if((input.value).match(/\d+/g)){

          if(i == 0){
            restriccion_final = restriccion_final+`${input.value}x`
          }else if(i+1 == inputs.length){
            restriccion_final = restriccion_final+`=${input.value}`
          }else{
            restriccion_final = restriccion_final+`+${input.value}y`
          }

          
          
          

        }else{

        }
        
      })

      restricciones__transformadas.push(restriccion_final)

     console.log(`Restricciones transformadas ${restriccion_final}`);
    })


    

    console.log(`Funcion objetivo : ${funcion_objetivo_enviar}`);
    

    //const cadena = ``

  }else{
    inputs_restricciones.forEach((restriccion)=>{
      const inputs = Array.from(restriccion.children);

      let restriccion_final = ' '

      console.log(`tamano del array ${inputs.length}`);

      inputs.forEach((input,i)=>{
        if((input.value).match(/\d+/g)){

          if(i == 0){
            restriccion_final = restriccion_final+`${input.value}x${i+1}`
          }else if(i+1 == inputs.length){
            restriccion_final = restriccion_final+`=${input.value}`
          }else{
            restriccion_final = restriccion_final+`+${input.value}x${i}`
          }
          
        }else{

        }
        
      })

     console.log(`Restricciones transformadas ${restriccion_final}`);
    })
  }

  const informacion = await realizarPeticion();
  
  const panel_datos_grafica = crear_panel_informacion_graficos(informacion)
  console.log(panel_datos_grafica);
  console.log(seccion_datos_grafica);
  seccion_datos_grafica.innerHTML = ' '
  seccion_datos_grafica.appendChild(panel_datos_grafica);
  
  graficar(informacion)
  
  

  alert(informacion);
  //console.log(informacion);
})


// Evento que se ejecuta cuando el boton de generar campos de restricciones
// es clickeado
generarRestricciones.addEventListener('click', () => {
  const cantidad_restricciones = parseInt(imputCantidadRestricciones.value);
  if (isNaN(cantidad_restricciones) ||cantidad_restricciones <= 0) {
    alert('Por favor, ingrese una cantidad válida de restricciones.');
    return;
  }

  // Limpiar campos previos
  camposRestricciones.innerHTML = '';


    for (let i = 0; i <cantidad_restricciones; i++) {
      const div = document.createElement('div');
      if (metodo == 'grafico'){
        div.innerHTML = `
          <input type="number"  required>
          <select required>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <input type="number" required>
          =
          <input type="number" required>
        `;
        div.classList.add('restriccion')

        div.id = `restriccion${i+1}`
        camposRestricciones.appendChild(div);
      }else{

      }
        
    }


});


const graficar = (informacion) =>{
  var elt = document.getElementById('calculator');
  elt.innerHTML=` `;
  var calculator = Desmos.GraphingCalculator(elt);
//Realizar los puntos donde hay intersecciones
  calculator.setBlank();

  informacion.intersections.forEach((interseccion,i)=>{
    const punto_x = interseccion.x;
    const punto_y = interseccion.y;
    calculator.setExpression({ id:`point${i+1}`, latex:`(${punto_x},${punto_y})`, label: `Punto ${i+1} `, showLabel: true });
  })

  restricciones__transformadas.forEach((restriccion,i)=>{
    calculator.setExpression({ id: `func${i}`, latex: `${restriccion}` });
  })
  
}



const realizarPeticion = async (funcionObjetivo,arrayRestricciones,tipo)=>{
  const funcioPrueba = "2x+3y"
  const restricciones_prueba = ["12x+24y>=348","20x+10y>=220", "4x+16y>=188", "20x+30y>=680", "x<=16","y=16"];

    const urlPeticion = 'https://graphicalmethodapi-dmd3bca6e6dpenev.canadacentral-01.azurewebsites.net/graphical-method/solve'

    const response = await fetch(urlPeticion,
        {
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "objectiveFunctionText":funcioPrueba,
                "restrictionsText":restricciones_prueba,
                "isMaximization": true
            })
        })
/*
    const data = response.then((muestraAlgo)=>{
      return muestraAlgo.json()
    });
*/
    const data = response.json()

    data.then((informacion)=>{
      console.log(informacion);
    })

    return data;
    
}
