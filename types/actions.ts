export type ActionType = 'file' | 'shell' | 'start';

export interface BaseAction {
  content: string;
}

export interface FileAction extends BaseAction {
  type: 'file';
  filePath: string;
}

export interface ShellAction extends BaseAction {
  type: 'shell';
}

export interface StartAction extends BaseAction {
  type: 'start';
}

export interface DownloadAction extends BaseAction {
  type: 'download';
  fileName?: string;
}

export type BoltNextAction = FileAction | ShellAction | StartAction | DownloadAction;

export type BoltNextActionData = BoltNextAction | BaseAction;

export interface ActionAlert {
  type: string;
  title: string;
  description: string;
  content: string;
  source?: 'terminal' | 'preview'; // Add source to differentiate between terminal and preview errors
}
