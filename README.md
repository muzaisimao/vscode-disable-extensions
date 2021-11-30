# Disable extensions for VS Code

This extension is inspired by the VS Code Feature Request [#40239](https://github.com/microsoft/vscode/issues/40239)

<!-- ![ext.config.json](https://raw.githubusercontent.com/muzaisimao/vscode-disable-extensions/main/images/ext-config.png) -->

## Install
 1. Search in the VS Code extensions: `Disable Extensions`

 2. Visual Studio Code Market Place: [Disable Extensions](https://marketplace.visualstudio.com/items?itemName=muzaisimao.vscode-disable-extensions)

---
## Features

* Disables the specified extension based on the configuration file.

* Activate only when a profile is found

---
## Note

1. Make sure that the `"code"` command is recognized on your device. [here](https://code.visualstudio.com/docs/editor/command-line#_common-questions)

2. Make sure your VS Code version is above `1.58.0`

3. The extension is currently not available for VS Code insiders.

4. Please try to configure `openInNewWindow` to get the best experience

5. Currently does not support opening the workspace

---
## Usage

1. Add the `ext.config.json` file to the `.vscode` folder.

2. Close VS Code and open the project again.

**Tips:** Every time you open a project with a configuration file, the current VS Code will reload once!

---

## Configuration

| Name            | Default       | Description                                |
| --------------- | ------------- | ------------------------------------------ |
| disabled        | Array: []     | extension id list (Required)               |
| autoReload      | Boolean: true | Auto reload or manual selection reload     |
| openInNewWindow | Boolean: true | Open in a new window or the current window |

`ext.config.json` - example:

```json
{
    "disabled": [],
    "autoReload": true,
    "openInNewWindow": true
}
```

**Tips:** Right-click on the extension and select "Copy ID".

---
## How it works?

* Using the official VS Code Command Line Interface [(CLI)](https://code.visualstudio.com/docs/editor/command-line)

---
## Todo

- [ ] Add support for VS Code insiders

- [ ] Add workspace support

---
## Issues

Submit the [issues](https://github.com/muzaisimao/vscode-disable-extensions/issues) if you find any bug or have any suggestion.

---
## License

Copyright (c) muzaisimao. All rights reserved.

Licensed under the [MIT](LICENSE.txt) license.

