import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackerModule } from './tracker/tracker.module';
import { Tracker } from './tracker/entities/tracker.entity';

@Module({
  imports: [
    TrackerModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DATABASE,
      entities: [Tracker],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
})
export class AppModule {}
