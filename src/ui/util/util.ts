import {getJavaScriptFile} from "../state/state";
import * as path from "path";
import * as fs from "fs";


export function getTypeScriptFileName(): string {
   const jsFile = getJavaScriptFile();

   return path.parse(jsFile).name + '.ts';
}

export function getJavaScriptFileName(): string {
   const jsFile = getJavaScriptFile();

   if (jsFile) {
      return path.parse(jsFile).name + '.js';
   }
   return '';
}

export function getTypeScriptFilePath(): string {
   const jsFile = getJavaScriptFile();

   if (jsFile) {
      return jsFile.split('.')[0] + '.ts';
   }
   return '';
}

export function getJavaScriptFilesInFolder(folderPath: string): string[] {
   if (fs.existsSync(folderPath)) {
      let javaScriptFiles: string[] = [];

      const files = fs.readdirSync(folderPath);

      const dirName = fs.statSync(folderPath).isDirectory() ?
         folderPath : path.dirname(folderPath);

      files.forEach((file: string) => {
         const filePath = path.join(dirName, file);

         const info = fs.statSync(filePath);

         if (info.isDirectory()) {
            javaScriptFiles = javaScriptFiles.concat(getJavaScriptFilesInFolder(filePath));
         }
         else if (info.isFile() && filePath.endsWith('.js')) {
            javaScriptFiles.push(filePath);
         }
      });
      return javaScriptFiles;
   }
   return [];
}