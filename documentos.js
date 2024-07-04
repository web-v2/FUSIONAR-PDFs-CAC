import fs from "fs";
const pathDirectoriosProceso =
  "D:\\APPs\\xampp\\htdocs\\Server\\Projects Javascript\\FUSIONAR-PDFs-CAC\\Procesar";

function getDirectories(path) {
  return fs
    .readdirSync(path)
    .filter((file) => {
      return fs.lstatSync(path + "/" + file).isDirectory();
    })
    .map((file) => file);
}
export const documentos = getDirectories(pathDirectoriosProceso);
