import { commands, ExtensionContext, window, MessageItem, Uri } from "vscode";
import { exec, execSync } from "child_process";
import { Configs } from "./types";
import { getWorkSpacePath, getConfigs, isConfirm } from "./utils";

function runDisableShell(cmd: string, cwd: string, configs: Configs) {
  const openCode = () => {
    exec(cmd, { cwd }, (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        window.showErrorMessage(error?.message || `exec command error: ${error}`);
      }
    });
  };

  if (configs.openInNewWindow === false) {
    commands.executeCommand("workbench.action.closeFolder")
      .then(() => setTimeout(openCode, 200));
  } else {
    commands.executeCommand("workbench.action.closeWindow");
    openCode();
  }
}

async function disableExtensions(context: ExtensionContext) {
  const configs: Configs = await getConfigs(context);
  if (configs.disabled.length === 0) {
    window.showInformationMessage("No extensions to disable");
    return;
  }
  const workspacePath = getWorkSpacePath();

  try {
    execSync("code -v", { cwd: workspacePath });
  } catch (error) {
    console.log("error :>> ", error);
    interface MsgItem extends MessageItem {
      value: "confirm";
    }
    const result = await window.showErrorMessage<MsgItem>(
      `'code' command is not recognized.`,
      { title: "Learn more", value: "confirm" }
    );

    if (result?.value === "confirm") {
      const url = "https://code.visualstudio.com/docs/editor/command-line#_common-questions";
      commands.executeCommand("vscode.open", Uri.parse(url));
    }
    return;
  }

  let cmd = configs.openInNewWindow === false ? "code --reuse-window" : "code --new-window";
  cmd += " --disable-extension muzaisimao.vscode-disable-extensions"; // disable self
  configs.disabled.forEach((id) => (cmd += ` --disable-extension ${id}`));
  cmd += ` ${workspacePath}`;

  if (configs.autoReload === false) {
    const message = "Disable extensions and open new VS Code?";
    const result = await isConfirm(message);
    if (result) {
      runDisableShell(cmd, workspacePath, configs);
    }
  } else {
    runDisableShell(cmd, workspacePath, configs);
  }
}

export default disableExtensions;
