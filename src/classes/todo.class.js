export class Todo{

  static fromJson({id, tarea, completado, creado}){

    const tempTodo = new Todo(tarea);
    
    tempTodo.id = id;
    tempTodo.completado = completado;
    tempTodo.creado = creado;

    return tempTodo;
  }

  constructor (tarea){
  
    this.tarea = tarea; // = tarea, hace referencia a la tarera que yo voy a poner, la cual se pondra en this.tarea que va a ocupar el constructor

    this.id = new Date().getTime(); // va a crear un id para cada tarea. Cada id, se creara a partir dele tiempo de cuando se haga
    this.completado = false;//Esto me dira si la tarea esta terminada o no
    this.creado = new Date();//fecha de creado

  }


}