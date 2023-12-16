import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {
    //*DI
    constructor() {}

    public getTodos = async (req: Request, res: Response) => {
        
        const todos = await prisma.todo.findMany();

        res.json( todos );

    };

    public getTodosById = async (req:Request, res:Response) => {
        const id = +req.params.id;
        
        if ( isNaN(id) ){
            return res.status(400).json( {error: 'ID argument is not a number'} ); //este es un error de bad request
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        })
        
        if (todo){
            res.json( todo );
        }else{
            res.status(404).json({ 'error': `TODO with id ${id} not found`})
        }
    }

    public createTodo = async ( req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create( req.body );

        if(error) return res.status(400).json( {error});



        //creacion de un todo en la base de datos
        const todo = await prisma.todo.create({
            data: createTodoDto!,
        });


        res.json( todo );
    }

    public updateTodo = async (req:Request, res:Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, 
            id
        })

        if( error ){
            return res.status(400).json({ error });
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        })

        if( !todo ){
            return res.status( 404 ).json( {error: `TODO with ${id} not found`});

        }

        const {text, completedAt} = req.body;

        // if (!text){
        //     return res.status(400).json({error: 'Text property is required'});
        // }

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id,
            },
            data: updateTodoDto!.values
        })
        res.json( updatedTodo );
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if ( isNaN(id) ){
            return res.status(400).json( {error: 'ID argument is not a number'} ); //este es un error de bad request
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        });
        if( !todo ){
            return res.status( 404 ).json( {error: `TODO with ${id} not found`});

        }

        const deleted = await prisma.todo.delete({
            where:{
                id: id,
            }
        });

        if( deleted ){
            res.json( deleted )
        }else{
            res.status(400).json( { error: `Todo with id ${id} not found`})
        }
        res.json( {todo, deleted} );
    }
}
