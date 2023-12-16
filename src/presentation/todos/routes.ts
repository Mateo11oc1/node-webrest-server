import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
    
    static get routes(): Router{ //este es un getter con el get

        const router = Router();
        const todoController = new TodosController();
        
        //Routes
        /**Se pasa solo la referencia de la funcion,
         * no se llama a la funcion
         */
        router.get( '/', todoController.getTodos); 
        //esto signifca que la ruta va a recibir un para
        //metro llamado id:
        router.get( '/:id', todoController.getTodosById);
        router.post( '/', todoController.createTodo);
        router.put( '/:id', todoController.updateTodo);
        router.delete( '/:id', todoController.deleteTodo);

        return router;
    }

}