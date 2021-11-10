import { ExtensionContext } from 'vscode';
import disableExtensions from './disableExtensions';

export function activate(context: ExtensionContext) {
	console.log('"disable-extensions" is now active!');
  disableExtensions(context);
}

export function deactivate() {}
