// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateProjectsXUserDto } from './dto/create-projects-x_user.dto';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

// Entities
import { ProjectsXUser } from './entities/projects-x_user.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from 'apps/users-ws/src/users/entities/user.entity';

@Injectable()
export class ProjectsXUsersService {
  constructor(
    @InjectRepository(ProjectsXUser)
    private readonly projectsX_UserRepository: Repository<ProjectsXUser>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new project-user relationship.
   * @param createProjectsXUserDto - The data for creating the project-user relationship.
   * @returns The created project-user relationship.
   * @throws NotFoundException if the project or user is not found.
   */
  async create(createProjectsXUserDto: CreateProjectsXUserDto) {
    const { projectId, userId } = createProjectsXUserDto;

    try {
      const project = await this.projectRepository.findOneBy({ id: projectId });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const projectsXUser = this.projectsX_UserRepository.create({
        project,
        user,
      });

      await this.projectsX_UserRepository.save(projectsXUser);

      delete projectsXUser.createdAt;
      delete projectsXUser.updatedAt;
      delete projectsXUser.deletedAt;

      return projectsXUser;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Finds a project by its ID and returns the associated users.
   *
   * @param id - The ID of the project to find.
   * @returns An object containing the data of the project and its associated users.
   * @throws NotFoundException if the project with the given ID is not found.
   */
  async findUsersByProject(id: number) {
    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const projectsXUser = await this.projectsX_UserRepository.find({
        where: { project: { id } },
        relations: ['user', 'project'],
      });

      const data = projectsXUser.map((projectXUser) => {
        delete projectXUser.project.createdAt;
        delete projectXUser.project.updatedAt;
        delete projectXUser.project.deletedAt;

        delete projectXUser.user.createdAt;
        delete projectXUser.user.updatedAt;
        delete projectXUser.user.deletedAt;
        delete projectXUser.user.password;

        delete projectXUser.createdAt;
        delete projectXUser.updatedAt;
        delete projectXUser.deletedAt;

        return { ...projectXUser };
      });

      return { data };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Finds projects associated with a user.
   * @param id - The ID of the user.
   * @returns An object containing the projects associated with the user.
   * @throws NotFoundException if the user is not found.
   */
  async findProjectsByUser(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const projectsXUser = await this.projectsX_UserRepository.find({
        where: { user: { id }, project: { deletedAt: null } },
        relations: ['user', 'project'],
      });

      const data = projectsXUser.map((projectXUser) => {
        delete projectXUser.project.createdAt;
        delete projectXUser.project.updatedAt;
        delete projectXUser.project.deletedAt;

        delete projectXUser.user.createdAt;
        delete projectXUser.user.updatedAt;
        delete projectXUser.user.deletedAt;
        delete projectXUser.user.password;

        delete projectXUser.createdAt;
        delete projectXUser.updatedAt;
        delete projectXUser.deletedAt;

        return { ...projectXUser };
      });

      return { data };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Removes the relationship between a user and a project.
   * @param data - An object containing the `userId` and `projectId` to identify the relationship.
   * @returns A message indicating that the project-user relationship has been removed.
   * @throws NotFoundException if the project-user relationship is not found.
   */
  async remove(data: { userId: number; projectId: number }) {
    const { userId, projectId } = data;

    try {
      const projectsXUser = await this.projectsX_UserRepository.findOne({
        where: { user: { id: userId }, project: { id: projectId } },
      });

      if (!projectsXUser) {
        throw new NotFoundException('Project-User relationship not found');
      }

      await this.projectsX_UserRepository.softRemove(projectsXUser);

      return { message: 'Project-User relationship removed' };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
