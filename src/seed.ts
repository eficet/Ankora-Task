import { SeedingModule } from "./seeder/seeder.module";
import { NestFactory } from "@nestjs/core";
import { SeedToDatabaseService } from "./seeder/seed-to-db.service";

async function bootstrap() {
    NestFactory.createApplicationContext(SeedingModule)
        .then(appContext => {
            const seeder = appContext.get(SeedToDatabaseService);
            seeder
                .seedData()
                .then(() => {
                    console.log('Seeding complete!');
                })
                .catch(error => {
                    console.error('Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();