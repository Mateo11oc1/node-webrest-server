import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {
    
    static get routes(): Router{ //este es un getter con el get

        const router = Router();
        const todoController = new TodosController();
        
        //Routes
        /**Se pasa solo la referencia de la funcion,
         * no se llama a la funcion
         */
        router.use( '/api/todos', TodoRoutes.routes); 

        return router;
    }

}