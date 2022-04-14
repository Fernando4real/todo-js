import {Todo} from '../classes';
import { todoList } from '../index';


//referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');//recuerda que el . hace referencia a una clase
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters')
const anchorFiltros = document.querySelectorAll('.filtro')




export const crearTodoHtml = (todo) =>{ //Tiene que recibir un todo que va a constuir en el HTML

  const htmlTodo = `
  <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
      <label>${todo.tarea}</label> 
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`;
 //En el label, el ${todo.tarea} tomara la tarea hecha, en el .tarea del archivo todo.class y la aplicara en el labeel 
//  en el li class, en el ${} el todo.completado, es la condicion a evaluar. el.completado, esta en todo.class, que etien como valor, false. Despues, se evalua si es true con el signo ?, seguido de lo que hara si es true, se agrega la clase 'completed' seguido del signo : que siignifica "y si no" entonces no pondra nada

  const div = document.createElement('div');
  div.innerHTML = htmlTodo; // aqui v aa crear un div dentro del html, y ese div, va a contener todo lo que tiene la const htmlTodo

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;


}

// eventos

txtInput.addEventListener('keyup', (event) =>{ // event hace refeerencia a la tecla que preciona el usuario

  if ( event.keyCode === 13 && txtInput.value.length > 0){//si el keycode es exactamente igual a 13, significa que la persona presiono Enter. Cada teecla tiene su keycode. Y si (&&) txtImput.value.lenght > 0, se ignora

    console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);//Agrega el nuevoTodo, al arreglo del todoList

    crearTodoHtml(nuevoTodo);//Agrega lo escrito en el input de nuevoTodo, al HTML. (corre todo lo que se hace en crearTodoHtml)
    txtInput.value = '';//Hace que el input se vacie una vez quee se crea el elemento en el html
  }

});

divTodoList.addEventListener('click', (event) =>{

  const nombreElemento = event.target.localName;//Da en consola el elemento en el que se hace click
  const todoElemento = event.target.parentElement.parentElement;//Aqui hace referencia a todo el elemento li
  const todoId = todoElemento.getAttribute('data-id');//Aqui la cocnstante va a obtener el atributo que queramos, en este caso, es el data id del html, el cual va a ser obtenido de cada uno de los elementos de la lista todo que hagamos



  if (nombreElemento.includes('input')){// Si el nombreElemento incluye un input, hizo click en el check
    todoList.marcarCompletado(todoId);//hace la funcion de marcar completado en el todoId clickeado del todolist
    todoElemento.classList.toggle('completed');//todoElemento hace rerfererncia al elemento del html. classList hace refererncia a todas las clases. .toggle('') hace rerferencia a la clase que eva a poner o cambiar. En este caso, cuando cambia el checkbox, va a cambiar es la clase completed
  
  } else if (nombreElemento.includes('button')){//Si el nombre del elemento incluye button, hara la siguiente funcion de abajo

    todoList.eliminarTodo(todoId);//eliminara la tarea dele todo list por medio del id
    divTodoList.removeChild(todoElemento);//Elimina ele elemento html
  }
  
});

btnBorrar.addEventListener('click', () =>{//Hace referencia a cuando se haga clic en el boton de eliminar completados

  todoList.eliminarCompletados();//Hace la funcion de eliminar completados

  for (let i = divTodoList.children.length-1; i >= 0; i--){//La primera condicion: Empiza eel ciclo en la ultima posicion. La segunda condicion: se ejecuta el ciclo for cuando i es mayor o igual a 0. La tercera condicion es el procedimiento inverso. Por ejemplo, empezaria deesdee eel 10 e iria reduciendo hasta el -1.
    const elemento = divTodoList.children[i];
    
    if (elemento.classList.contains('completed')){
      divTodoList.removeChild(elemento);
    }
  }

})


ulFiltros.addEventListener('click', (event) => {

  const filtro = event.target.text;
  if (!filtro){return;}

  anchorFiltros.forEach(elem => elem.classList.remove('selected'));
  event.target.classList.add('selected');



  for (const elemento of divTodoList.children){
    
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch(filtro){
      case 'Pendientes':
        if (completado){
          elemento.classList.add('hidden');
        }
      break;

      case 'Completado':
        if (!completado){
          elemento.classList.add('hidden');
        }
      break;
    }
  }
})