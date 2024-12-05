export const crear_panel_informacion_graficos = (informacion)=>{
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

export const crearCampos = (campo, i,numero_variables)=>{
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