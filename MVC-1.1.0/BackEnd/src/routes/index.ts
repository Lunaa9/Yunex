import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const PATH_ROUTER = __dirname;
const router = Router();

const cleanFileName = (fileName: string) => {
  const [name, ext] = fileName.split('.');
  return [name, `${name}.${ext}`];
};

export async function loadRoutes() {
  const folders = readdirSync(PATH_ROUTER);

  for (const folderName of folders) {
    if (folderName !== 'index.ts' && folderName !== 'index.js') {
      const folderPath = join(PATH_ROUTER, folderName);
      const files = readdirSync(folderPath);

      for (const fileName of files) {
        const [routeName, fullFile] = cleanFileName(fileName);
        if (routeName !== 'index') {
          try {
            const moduleRouter = await import(`./${folderName}/${fullFile}`);
            if (moduleRouter.router) {
              console.log(`✅ Se está cargando la ruta..... /${routeName}`);
              router.use(`/${routeName}`, moduleRouter.router);
            } else {
              console.warn(`⚠️ No se encontró "router" exportado en ./${folderName}/${fullFile}`);
            }
          } catch (err) {
            console.error(`❌ Error al importar ./routes/${folderName}/${fullFile}:`, err);
          }
        }
      }
    }
  }

  return router;
}
