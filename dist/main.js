"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const seed_service_1 = require("./users/seed.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const seedService = app.get(seed_service_1.SeedService);
    await seedService.seedAdminUser();
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map