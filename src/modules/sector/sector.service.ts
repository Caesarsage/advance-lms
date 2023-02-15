import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSector } from 'src/infrastructures/enums/sector.enum';
import { LmsFatalException } from 'src/infrastructures/exceptions';
import { Repository } from 'typeorm';
import { Sector } from './entities/sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector) private sectorRepo: Repository<Sector>
  ){}

  findBySectorCode = async (sector: AppSector): Promise<Sector> => {
    let app_sector;
    if (!sector) {
      app_sector = null
    } else {
      app_sector = await this.sectorRepo.findOne({
        where: {
          code: sector
        }
      })
    }

    if (!app_sector) {
      throw new LmsFatalException()
    }

    return app_sector
  }
}
