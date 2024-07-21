// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

// DTO's
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

// Entities
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  /**
   * Creates a new project.
   *
   * @param createProjectDto - The data for creating the project.
   * @returns The created project.
   */
  async create(createProjectDto: CreateProjectDto) {
    const { description, endDate, isActive, startDate, title } =
      createProjectDto;

    try {
      const project = this.projectRepository.create({
        description,
        endDate,
        isActive,
        startDate,
        title,
      });

      await this.projectRepository.save(project);

      delete project.deletedAt;
      delete project.updatedAt;
      delete project.createdAt;

      return project;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Retrieves all projects from the project repository.
   *
   * @returns {Promise<Project[]>} A promise that resolves to an array of projects.
   * @throws {Error} If there is an error while retrieving the projects.
   */
  async findAll() {
    try {
      const projects = await this.projectRepository.find();

      projects.forEach((project) => {
        delete project.deletedAt;
        delete project.updatedAt;
        delete project.createdAt;
      });

      return projects;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Finds a project by its ID.
   *
   * @param id - The ID of the project to find.
   * @returns A Promise that resolves to the found project.
   * @throws NotFoundException if the project is not found.
   */
  async findOne(id: number) {
    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) throw new NotFoundException('Project not found');

      delete project.deletedAt;
      delete project.updatedAt;
      delete project.createdAt;

      return project;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Updates a project with the specified ID.
   * @param id - The ID of the project to update.
   * @param updateProjectDto - The data to update the project with.
   * @returns A message indicating the success of the update operation.
   * @throws NotFoundException if the project with the specified ID is not found.
   */
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { description, endDate, isActive, startDate, title } =
      updateProjectDto;

    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) throw new NotFoundException('Project not found');

      project.description = description;
      project.endDate = new Date(endDate);
      project.isActive = isActive;
      project.startDate = new Date(startDate);
      project.title = title;

      await this.projectRepository.save(project);

      delete project.deletedAt;
      delete project.updatedAt;
      delete project.createdAt;

      return 'Project updated successfully';
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Removes a project by its ID.
   * @param id - The ID of the project to be removed.
   * @returns A promise that resolves to an object with a success message.
   * @throws NotFoundException if the project with the given ID is not found.
   */
  async remove(id: number) {
    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) throw new NotFoundException('Project not found');

      await this.projectRepository.softRemove(project);

      return { message: 'Project deleted successfully' };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
