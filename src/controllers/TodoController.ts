import { JsonController, Get, Post, Body, Param, OnUndefined, HttpCode, Put, Delete } from 'routing-controllers';
import TaskEntity from '../dto/Task';
import Task from '../models/Task.model';
import TaskRepository from '../repositories/TaskRepository';


@JsonController()
export class TodoController {

    protected repository: TaskRepository;

    constructor() {
        this.repository = new TaskRepository();
    }

    @Get('/')
    public getAll(): Promise<Task[]> {
        return this.repository.get({
            raw: true
        });
    }

    @Post()
    @HttpCode(201)
    public post(@Body() payload: TaskEntity): Promise<any> {
        return this.repository.create(payload)
            .then(task => task.toJSON());
    }

    @Get('/:id')
    @OnUndefined(404)
    public getOne(@Param('id') id: number): Promise<Task | null> {
        return this.repository.find(id, {
            raw: true
        });
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() task: TaskEntity): Promise<any> {
        return this.repository.updateById(id, task).then(task => task?.toJSON());
    }

    @Delete('/:id')
    @OnUndefined(204)
    public remove(@Param('id') id: number): void {
        this.repository.removeById(id);

        return;
    }
}
