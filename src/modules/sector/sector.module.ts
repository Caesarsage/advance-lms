import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sector])
  ],
  providers: [SectorService],
  exports: [SectorService]
})
export class SectorModule {}
