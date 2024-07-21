// Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateStatusTaskDto } from './dto/create-status-task.dto';

// Entities
import { StatusTask } from './entities/status-task.entity';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

@Injectable()
export class StatusTasksService {
  constructor(
    @InjectRepository(StatusTask)
    private readonly statusTaskRepository: Repository<StatusTask>,
  ) {}

  /**
   * Creates a new status task.
   *
   * @param createStatusTaskDto - The data for creating the status task.
   * @returns The created status task.
   */
  async create(createStatusTaskDto: CreateStatusTaskDto) {
    try {
      const statusTask = this.statusTaskRepository.create(createStatusTaskDto);
      await this.statusTaskRepository.save(statusTask);

      delete statusTask.createdAt;
      delete statusTask.updatedAt;
      delete statusTask.deletedAt;

      return statusTask;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Retrieves all status tasks from the database.
   * @returns {Promise<{ data: StatusTask[] }>} A promise that resolves to an object containing the status tasks.
   */
  async findAll() {
    try {
      const status = await this.statusTaskRepository.find();

      status.forEach((s) => {
        delete s.createdAt;
        delete s.updatedAt;
        delete s.deletedAt;
      });

      return { data: status };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
