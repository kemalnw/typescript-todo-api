import { Table, Model, Column, CreatedAt, UpdatedAt } from "sequelize-typescript"
import { Optional } from "sequelize/types"
import TaskEntity from "../dto/Task"


export interface TaskCreationAttributes extends Optional<TaskEntity, 'id'> {}

@Table({
    tableName: 'Tasks'
})
export default class Task extends Model<TaskEntity, TaskCreationAttributes> {
    @Column
    name?: string;

    @Column
    description?:string

    @CreatedAt
    created_at?: Date;

    @UpdatedAt
    updated_at?: Date;
}
