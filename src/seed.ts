import { SeedingModule } from "./seeder/seeder.module";
import { NestFactory } from "@nestjs/core";
import { SeedToDatabaseService } from "./seeder/seed-to-db.service";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    const logger = new Logger();
    NestFactory.createApplicationContext(SeedingModule)
        .then(appContext => {
            const seeder = appContext.get(SeedToDatabaseService);
            seeder
                .seedData()
                .then(() => {
                    logger.log('Seeding complete!');
                })
                .catch(error => {
                    logger.error('Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();