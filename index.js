import PDFMerger from "pdf-merger-js";
import fs from "fs";
import path from "path";
import { documentos } from "./documentos.js";

async function mergeToPdf(doc) {
  const directorioProcesar = `./Procesar/${doc}`;
  const directorioSalida = `./Salida/${doc}`;

  if (!fs.existsSync(directorioSalida)) {
    fs.mkdirSync(directorioSalida, { recursive: true });
  }

  const merger = new PDFMerger();

  try {
    const files = await fs.promises.readdir(directorioProcesar);
    const pdfFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".pdf"
    );

    await Promise.all(
      pdfFiles.map((file) => merger.add(path.join(directorioProcesar, file)))
    );

    await merger.save(
      path.join(directorioSalida, `${doc}_NAME-SECUNDARIO.pdf`)
    );
    console.log("Listo:", doc);
  } catch (error) {
    const logFile = fs.createWriteStream("error.log", { flags: "a" });
    logFile.write(`Error merging documents for ${doc}: ${error.message}\n`);
    console.error(`Error merging documents for ${doc}: ${error.message}`);
  }
}

async function mergeAllDocuments() {
  await Promise.all(documentos.map(mergeToPdf));
}

mergeAllDocuments();
