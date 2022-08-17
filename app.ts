import { AppModule } from './app.module.ts';
import { DanetApplication } from 'https://deno.land/x/danet/mod.ts';

export const bootstrap = async () => {
  const application = new DanetApplication();
  await application.init(AppModule);
  await application.listen(Number(Deno.env.get('PORT') || 3000));
  console.log("server at 3000")
  return application;
}
await bootstrap()