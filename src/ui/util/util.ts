import {getAppState, getCodeState, getJavaScriptFile2} from '../state/state';
import * as path from 'path';
import * as fs from 'fs';


export function getTypeScriptFileName(): string {
   const jsFile = getJavaScriptFile2();

   return path.parse(jsFile).name + '.ts';
}

export function getJavaScriptFileName(): string {
   const jsFile = getJavaScriptFile2();

   if (!jsFile) {
      return '';
   }

   if (getAppState().openMode === 'folder') {
      // const info = getState().folderInfo;
      // if (info) {
      return jsFile.replace(getCodeState().folderPath + path.sep, '');
      // }
   }

   return path.parse(jsFile).name + '.js';
}

export function getTypeScriptFilePath(): string {
   const jsFile = getJavaScriptFile2();

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
