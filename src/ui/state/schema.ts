

export type ViewMode = 'code' | 'log';
export type OpenMode = 'file' | 'folder';

export interface FolderInfo {
   folderPath: string;
   javascriptFiles: string[];
   currentFileIndex: number; // Use index or fileName?
}

export interface State {
   viewMode: ViewMode;
   openMode: OpenMode;
   folderInfo: FolderInfo | null;
   javascriptFile: string | null;
   javascriptCode: string | null;
   typescriptCode: string | null;
   codeGenSucceeded: boolean;
   logs: string[];
}
