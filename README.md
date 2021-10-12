# vscode-translation
This extension provides translation (based on Google Translation) support for Visual Studio Code.

[Get from Marketplace](https://marketplace.visualstudio.com/items?itemName=caiqichang.vscode-translation)

## Features
- Multiple languages translation support.
- Words or sentences (support multiple lines, limit in 200 words each time) translation support.
- [Settings](#settings)
- [Simple Translation](#simple-translation)
- [Complete Translation](#complex-translation)
- Extra
  - [Regular Expression Test](#regular-expression-test)

## Usage
### Settings
```javascript
{
  // Default source language for translation.
  "translation.source-language": "auto",

  // Default target language for translation.
  "translation.target-language": "en"
}
```

[Back to top](#features)

### Simple Translation
- Select text in editor and right click, choose `Translate (Simple)`,
and the translation for selected text will be showed in notification.

![simple-translate-screenshot](resources/screenshot/simple-translate.jpg)

[Back to top](#features)

### Complete Translation
- Select text in editor and right click, choose `Translate (Complete)`,
and the translation for selected text will be showed in Translation panel.

![complete-translate-screenshot](resources/screenshot/complete-translate.jpg)

- Use command `Translation` to open Translation panel.

![complete-translate-command-screenshot](resources/screenshot/complete-translate-command.jpg)

[Back to top](#features)

### Regular Expression Test
- Use command `Regular Expression Test` to open Regular Expression Test panel.

![regular-expression-test-screenshot](resources/screenshot/regular-expression-test.jpg)

[Back to top](#features)

