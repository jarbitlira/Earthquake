import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EarthquakeUsgsService {
  private readonly logger = new Logger(EarthquakeUsgsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
  ) {
    const cronPeriod = this.configService.get('NODE_ENV') === 'production' ?
      CronExpression.EVERY_5_SECONDS : CronExpression.EVERY_5_MINUTES;
    const job = new CronJob(cronPeriod, () => {
      this.getLatestEarthquakes();
    });

    this.schedulerRegistry.addCronJob('usgs-earthquakes', job);
    job.start();
    this.logger.log(`Cron period set to ${ cronPeriod }`);
  }

  getLatestEarthquakes() {
    const usgsUrl = this.configService.get('EARTHQUAKE_USGS_API_URL');
    this.httpService.get(usgsUrl, {
      params: {
        format: 'geojson',
        eventtype: 'earthquake',
        limit: 2,
      },
    })
      .subscribe((response) => {
        this.logger.log('USGS API response', response.data);
      });
  }

}
