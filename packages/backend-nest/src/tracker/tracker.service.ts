import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReplaceTrackerDto } from './dto/replace-tracker.dto';
import { Tracker } from './entities/tracker.entity';

@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker)
    private trackersRepository: Repository<Tracker>,
  ) {}

  findOne(id: number) {
    // use id - atm in database it is onlu one tracker
    return this.trackersRepository.findOne();
  }

  async replace(id: number, replaceTrackerDto: ReplaceTrackerDto) {
    let tracker = (await this.trackersRepository.findOne(id))!;
    this.trackersRepository.merge(tracker, replaceTrackerDto);
    return this.trackersRepository.save(replaceTrackerDto);
  }
}
