import {remote} from 'electron';
import {
   addLog, closeJavaScriptFile, getJavaScriptFile, getState, setFolder, setJavascriptCode, setJavascriptFile,
   setTypescriptCode
} from './state/state';
import * as fs from 'fs';
import {transpile} from '../transpiler2/transpiler-main';
import {getTypeScriptFilePath} from './util/util';


export function getWindow(): Electron.BrowserWindow {
   return remote.getCurrentWindow();
}

export function clickOpenJsFile(): void {
   const filePath = openJsFile();

   if (filePath) {
      setJavascriptFile(filePath);
   }
}

function openJsFile(): string | null {
   const files: string[] | undefined = remote.dialog.showOpenDialog(getWindow(), {
      properties: ['openFile'],
      filters: [{name: 'javascript', extensions: ['js']}]
   });

   if (files && files.length > 0) {
      return files[0];
   }
   return null;
}

export function clickOpenFolder(): void {
   const folderPath = openFolder();

   if (folderPath) {
      setFolder(folderPath);
   }
}

export function openFolder(): string | null {
   const paths: string[] | undefined = remote.dialog.showOpenDialog(getWindow(), {
      properties: ['openDirectory']
   });

   if (paths && paths.length > 0) {
      return paths[0];
   }
   return null;
}

export function saveTypeScriptCode(): void {
   const jsFile = getJavaScriptFile();
   const tsFile = getTypeScriptFilePath();
   const code = getState().typescriptCode;

   fs.writeFileSync(tsFile, code);

   fs.unlinkSync(jsFile);
   addLog(`Wrote ${tsFile}`);

   closeJavaScriptFile();
}

export function loadJavascriptFile(): boolean {
   const jsFile = getJavaScriptFile();

   if (!jsFile) {
      return false;
   }

   try {
      const file = fs.readFileSync(jsFile);
      const jsCode = file.toString();

      if (jsCode) {
         setJavascriptCode(jsCode);
         return true;
      }
   }
   catch (e) {
      console.log(e);
      addLog(e);
   }
   return false;
}

export function generateTypescript(): boolean {
   const jsCode = getState().javascriptCode;

   const tsCode = transpile(jsCode, {language: 'typescript'});

   if (tsCode) {
      setTypescriptCode(tsCode);
      return true;
   }
   setTypescriptCode('');
   return false;
}