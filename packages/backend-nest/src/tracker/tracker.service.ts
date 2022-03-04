import { Injectable } from '@nestjs/common';
import { ReplaceTrackerDto } from './dto/replace-tracker.dto';

@Injectable()
export class TrackerService {
  findOne(id: number) {
    return `This action returns a #${id} tracker`;
  }

  replace(id: number, replaceTrackerDto: ReplaceTrackerDto) {
    return `This action replaces a #${id} tracker`;
  }
}
