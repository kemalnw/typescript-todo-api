import { Repository } from "sequelize-typescript";
import Task, { TaskCreationAttributes } from "../models/Task.model";
import * as database from '../config/database';
import { CreateOptions, FindOptions } from "sequelize/types";
import TaskEntity from "../dto/Task";


export default class TaskRepository
{
    private taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = database.default.getRepository(Task);
    }

    get(options?: FindOptions): Promise<Task[]> {
        return this.taskRepository.findAll<Task>(options);
    }

    create(data: TaskCreationAttributes, options?:CreateOptions): Promise<Task> {
        return this.taskRepository.create<Task>(data, options);
    }

    find(id: number, options?: FindOptions): Promise<Task | null> {
        return this.taskRepository.findByPk<Task>(id, options);
    }

    updateById(id: number, data: TaskEntity): Promise<Task | null> {
        return this.find(id).then((task) => {
            if (!task) {
                return null;
            }

            task.name = data.name;
            task.description = data.description;
            task.save();

            return task;
        });
    }

    removeById(id: number) {
        return this.taskRepository.destroy({
            where: {
                id: id
            }
        })
    }
}
