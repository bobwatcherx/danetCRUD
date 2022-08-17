import { Module } from 'https://deno.land/x/danet/mod.ts';
import { CatsController } from './controller/cats.controller.ts';

@Module({
  controllers: [CatsController],
})
export class AppModule {}