import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
console.log(PATH_ROUTER);

const router = Router();

/**
 * This function clean the name of the file
 * @param fileName recibe the complete file name
 * @returns return just the name of the file before the first dot
 */
const cleanFileName = (fileName: string) => {
  const ruta = fileName.split(".")[0];
  const file = fileName.split(".")[0] + "." + fileName.split(".")[1];
  return [ruta, file];
};

/**
 * This function reads the path an separe each one rote by the name of the file
 */
readdirSync(PATH_ROUTER).filter((folderName) => {
  if (folderName !== "index.ts") {
    const PATH_ROUTER2 = `${PATH_ROUTER}\\${folderName}`;
    console.log(PATH_ROUTER2);
    readdirSync(PATH_ROUTER2).filter((fileName) => {
      const cleanName = cleanFileName(fileName);
      if (cleanName[0] !== "index") {
        import(`./${folderName}/${cleanName[1]}`).then((moduleRouter) => {
          console.log(`Se esta cargando la ruta..... /${cleanName[0]}`);
          router.use(`/${cleanName[0]}`, moduleRouter.router);
        });
      }
    });
  }
});

export { router };
