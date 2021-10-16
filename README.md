# vscode-translation
This extension provides translation (based on [Google Translation](https://translate.google.com)) support for Visual Studio Code.

[Get from Marketplace](https://marketplace.visualstudio.com/items?itemName=caiqichang.vscode-translation)

## Features
- Multiple languages translation support.
- Words or one sentence (support multiple lines, limit in 200 characters each time) translation support.
- Pronunciation Support ([FFmpeg](https://ffmpeg.org) is required).
- HTTP proxy support.
- [Settings](#settings)
- [Simple Translation](#simple-translation)
- [Complete Translation](#complete-translation) (Coming soon...)
- Extra
  - [Regular Expression Test](#regular-expression-test)
  - Getting ss from URL

## Usage
### Settings
```javascript
{
  // Default source language for translation.
  "translation.source-language": "auto",

  // Default target language for translation.
  "translation.target-language": "en",

  // Controls whether to use http proxy for translation.
  "translation.enable-proxy": false,

  // URL for http proxy.
  "translation.proxy-url": "http://127.0.0.1:1080",

  // Controls whether to decode ss result (base64).
  "translation.ss-enable-base64decode": false,

  // Controls whether to use http proxy for getting ss.
  "translation.ss-enable-proxy": false,

  // URLs array for getting ss.
  "translation.ss-urls": [],
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

