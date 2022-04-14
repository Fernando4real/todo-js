import { Todo } from "./todo.class";

export class TodoList{

  constructor(){
    // this.todos = [];//Construye un arreglo vacio para los todos
    //La linea de arriba ya no es necesaria, porque si no existe, se construye en la funcion de cargarLocalStorage
    this.cargarLocalStorage();
  }

  nuevoTodo(todo){ //Aqui recibe una nueva tarea
    this.todos.push(todo);//Aqui, en push.(todo), va a insertar la tare puesta en todo, en el arreglo de todos.
    this.guardarLocalStorage();
  }

  eliminarTodo(id){ //va a recibir el id de la tarea a eliminar

   this.todos = this.todos.filter(todo => todo.id != id) //Aqui va a agarrar todos las tareas del array de todos, y les va a aplicar el filtro. Todo esto, va a regresar un nuevo arreglo excluyendo el todo que coincida con el id que yo tengo.
    this.guardarLocalStorage();
  }

  marcarCompletado(id){//va a recibir el id de la tarea

    for (const todo of this.todos){

      console.log(id, todo.id);

      if (todo.id == id){

        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;

      }
    }

  }

  eliminarCompletados(){
    
    this.todos = this.todos.filter(todo => !todo.completado);//Va a regrsar a todos los todos que no esten completados
    this.guardarLocalStorage();
  }

  guardarLocalStorage(){

    localStorage.setItem('todo', JSON.stringify(this.todos) );

  }


  cargarLocalStorage(){

    // if(localStorage.getItem('todo')){//Si en el localStorage existe eel todo, entonces va a ejecutar el codigo de abajo
    //   this.todos = JSON.parse(localStorage.getItem('todo'));//va a hacer un arreglo llamando a los items o todos, que hay en el localStorage
    //   console.log('cargarLocal:', this.todos);
    // }else{
    //   this.todos = [];//si no existe, va a crear un arreglo vacio de los todos
    // }

    //Esta operacion ternaria hace lo mismo que la operacion de arriba, pero mas resumido
    this.todos = (localStorage.getItem('todo')) 
              ? JSON.parse(localStorage.getItem('todo'))
              : [];
    
    this.todos = this.todos.map(obj => Todo.fromJson(obj))

  }
}