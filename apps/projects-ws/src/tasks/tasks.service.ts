// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// Entities
import { Task } from './entities/task.entity';
import { StatusTask } from '../status-tasks/entities/status-task.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from 'apps/users-ws/src/users/entities/user.entity';
import { Team } from 'apps/users-ws/src/teams/entities/team.entity';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    @InjectRepository(StatusTask)
    private readonly statusTasksRepository: Repository<StatusTask>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Team) private readonly teamsRepository: Repository<Team>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new task.
   *
   * @param createTaskDto - The data for creating the task.
   * @returns A promise that resolves to the created task.
   */
  async create(createTaskDto: CreateTaskDto) {
    const {
      deadline,
      description,
      projectId,
      statusTaskId,
      teamId,
      title,
      userId,
    } = createTaskDto;

    try {
      const user = userId ? await this._validatedUserId(userId) : null;

      const project = await this._validatedProjectId(projectId);

      const statusTask = await this._validatedStatusTaskId(statusTaskId);

      const team = await this._validatedTeamId(teamId);

      const task = this.tasksRepository.create({
        deadline,
        description,
        project,
        statusTask,
        team,
        title,
        user,
      });

      await this.tasksRepository.save(task);

      return { data: this._cleanData(task) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Validates the user ID and returns the corresponding user.
   * @param userId - The ID of the user to validate.
   * @returns A Promise that resolves to the validated user.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  private async _validatedUserId(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user;
  }

  /**
   * Validates the project ID and returns the corresponding project.
   *
   * @param projectId - The ID of the project to validate.
   * @returns A Promise that resolves to the validated project.
   * @throws NotFoundException if the project with the given ID is not found.
   */
  private async _validatedProjectId(projectId: number): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id: projectId });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    return project;
  }

  /**
   * Validates the status task ID and returns the corresponding StatusTask object.
   *
   * @param statusTaskId - The ID of the status task to validate.
   * @returns A Promise that resolves to the validated StatusTask object.
   * @throws NotFoundException if the status task with the given ID is not found.
   */
  private async _validatedStatusTaskId(
    statusTaskId: number,
  ): Promise<StatusTask> {
    const statusTask = await this.statusTasksRepository.findOneBy({
      id: statusTaskId,
    });

    if (!statusTask) {
      throw new NotFoundException(
        `StatusTask with id ${statusTaskId} not found`,
      );
    }

    return statusTask;
  }

  /**
   * Validates the team ID and returns the corresponding Team object.
   *
   * @param teamId - The ID of the team to validate.
   * @returns A Promise that resolves to the validated Team object.
   * @throws NotFoundException if the team with the specified ID is not found.
   */
  private async _validatedTeamId(teamId: number): Promise<Team> {
    const team = await this.teamsRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    return team;
  }

  /**
   * Cleans the data of a Task object by removing unnecessary properties.
   * @param task - The Task object to clean.
   * @returns The cleaned Task object.
   */
  private _cleanData(task: Task) {
    delete task.deletedAt;
    delete task.updatedAt;
    delete task.createdAt;

    delete task.statusTask.deletedAt;
    delete task.statusTask.updatedAt;
    delete task.statusTask.createdAt;

    delete task.project.deletedAt;
    delete task.project.updatedAt;
    delete task.project.createdAt;

    delete task.team.deletedAt;
    delete task.team.updatedAt;
    delete task.team.createdAt;

    if (task.user) {
      delete task.user.deletedAt;
      delete task.user.updatedAt;
      delete task.user.createdAt;
      delete task.user.password;
    } else delete task.user;

    return task;
  }

  /**
   * Retrieves all tasks for a given project.
   *
   * @param projectId - The ID of the project.
   * @returns A Promise that resolves to an object containing the retrieved tasks.
   */
  async findAll(projectId: number) {
    try {
      const tasks = await this.tasksRepository.find({
        where: { project: { id: projectId } },
        relations: ['statusTask', 'project', 'team', 'user'],
      });

      return { data: tasks.map((task) => this._cleanData(task)) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Finds a task by its ID.
   * @param id - The ID of the task to find.
   * @returns A Promise that resolves to an object containing the task data.
   * @throws NotFoundException if the task with the specified ID is not found.
   */
  async findOne(id: number) {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['statusTask', 'project', 'team', 'user'],
      });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return { data: this._cleanData(task) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Updates a task with the specified ID.
   *
   * @param id - The ID of the task to update.
   * @param updateTaskDto - The DTO containing the updated task data.
   * @returns A Promise that resolves to the updated task.
   * @throws NotFoundException if the task with the specified ID is not found.
   */
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const {
      deadline,
      description,
      projectId,
      statusTaskId,
      teamId,
      title,
      userId,
    } = updateTaskDto;

    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['statusTask', 'project', 'team', 'user'],
      });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      const user = userId ? await this._validatedUserId(userId) : null;
      const project = projectId
        ? await this._validatedProjectId(projectId)
        : null;
      const statusTask = statusTaskId
        ? await this._validatedStatusTaskId(statusTaskId)
        : null;
      const team = teamId ? await this._validatedTeamId(teamId) : null;

      if (deadline) task.deadline = deadline;
      if (description) task.description = description;
      if (statusTask) task.statusTask = statusTask;
      if (team) task.team = team;
      if (project) task.project = project;
      if (title) task.title = title;
      if (user) task.user = user;

      await this.tasksRepository.update(id, task);

      return { data: this._cleanData(task) };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Removes a task by its ID.
   * @param id - The ID of the task to be removed.
   * @returns A message indicating the success of the operation.
   * @throws NotFoundException if the task with the specified ID is not found.
   */
  async remove(id: number) {
    try {
      const task = await this.tasksRepository.findOneBy({ id });

      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      await this.tasksRepository.softDelete(id);

      return { message: 'Task deleted successfully' };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
