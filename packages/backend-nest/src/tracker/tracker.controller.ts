import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { ReplaceTrackerDto } from './dto/replace-tracker.dto';

@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackerService.findOne(+id);
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() replaceTrackerDto: ReplaceTrackerDto,
  ) {
    return this.trackerService.replace(+id, replaceTrackerDto);
  }
}
