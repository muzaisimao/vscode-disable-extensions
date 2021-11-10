import { workspace, ExtensionContext, window, MessageItem } from 'vscode';
import * as path from 'path';
import { Configs } from './types';


export function getWorkSpacePath ()  {
  let workspacePath: string = '';
  if (workspace.workspaceFolders?.length) {
    workspacePath = workspace.workspaceFolders[0].uri.fsPath;
    workspacePath = path.normalize(workspacePath);
    return workspacePath;
  } else {
    throw new Error('No workspace file found');
  }
};

export async function getConfigs(context: ExtensionContext) {
  const fileGlob = '.vscode/ext.config.json';
  const files = await workspace.findFiles(fileGlob, '**​/node_modules/**');

  if (files.length === 1) {
    const buffer = await workspace.fs.readFile(files[0]);
    const configs: Configs = JSON.parse(buffer.toString());
    return configs;
  } else {
    throw new Error('No config file found');
  }
}

export async function isConfirm(message: string, detail?: string): Promise<boolean> {
  interface MsgItem extends MessageItem { value: 'confirm' | 'cancel' };

  const data = await window.showInformationMessage<MsgItem>(
    message,
    { modal: true, detail },
    { title: 'Cancel', isCloseAffordance: true, value: 'cancel' },
    { title: 'Yes', value: 'confirm' },
  );
  return data?.value === 'confirm';
}
