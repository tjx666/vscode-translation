# vscode-translation

English | [简体中文](README.zh-CN.md)

This extension provides translation (based on [Google Translation](https://translate.google.com)) support for Visual Studio Code.

[Get from Marketplace](https://marketplace.visualstudio.com/items?itemName=caiqichang.vscode-translation)

## Features
- Multiple languages translation support
- Words or one sentence (support multiple lines, limit in 200 characters each time) translation support
- Pronunciation support ([FFmpeg](https://ffmpeg.org) is required)
- HTTP proxy support
- [Settings](#settings)
- [Simple Translation](#simple-translation)
- [Complete Translation](#complete-translation)
- Extra
  - [Regular Expression Test](#regular-expression-test)
  - Getting ss list from URL

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

  // Controls whether to use http proxy for getting ss list.
  "translation.ss-enable-proxy": false,

  // URLs array for getting ss list.
  "translation.ss-urls": [],
}
```
- Value of source language and target language: 
<details>
<pre>
Auto => auto (source language only)
Afrikaans => af
Albanian => sq
Amharic => am
Arabic => ar
Armenian => hy
Azerbaijani => az
Basque => eu
Belarusian => be
Bengali => bn
Bosnian => bs
Bulgarian => bg
Catalan => ca
Cebuano => ceb
Chichewa => ny
Chinese (Simple) => zh-CN
Chinese (Traditional) => zh-TW
Corsican => co
Croatian => hr
Czech => cs
Danish => da
Dutch => nl
English => en
Esperanto => eo
Estonian => et
Filipino => tl
Finnish => fi
French => fr
Frisian => fy
Galician => gl
Georgian => ka
German => de
Greek => el
Gujarati => gu
Haitian Creole => ht
Hausa => ha
Hawaiian => haw
Hebrew => iw
Hindi => hi
Hmong => hmn
Hungarian => hu
Icelandic => is
Igbo => ig
Indonesian => id
Irish => ga
Italian => it
Japanese => ja
Javanese => jw
Kannada => kn
Kazakh => kk
Khmer => km
Kinyarwanda => rw
Korean => ko
Kurdish => ku
Kyrgyz => ky
Lao => lo
Latin => la
Latvian => lv
Lithuanian => lt
Luxembourgish => lb
Macedonian => mk
Malagasy => mg
Malay => ms
Malayalam => ml
Maltese => mt
Maori => mi
Marathi => mr
Mongolian => mn
Myanmar => my
Nepali => ne
Norwegian => no
Pashto => ps
Persian => fa
Polish => pl
Portuguese => pt
Punjabi => pa
Romanian => ro
Russian => ru
Samoan => sm
Scots Gaelic => gd
Serbian => sr
Sesotho => st
Shona => sn
Sindhi => sd
Sinhala => si
Slovak => sk
Slovenian => sl
Somali => so
Spanish => es
Sundanese => su
Swahili => sw
Swedish => sv
Tajik => tg
Tamil => ta
Telugu => te
Thai => th
Turkish => tr
Turkmen => tk
Ukrainian => uk
Urdu => ur
Uzbek => uz
Vietnamese => vi
Welsh => cy
Xhosa => xh
Yiddish => yi
Yoruba => yo
Zulu => zu
</pre>
</details>

[Back to top](#features)

### Simple Translation
- Select text in editor and right click, choose `Translate (Simple)`,
and the translation for selected text will be shown in notification.

![simple-translate-screenshot](resources/screenshot/simple-translate.jpg)

[Back to top](#features)

### Complete Translation
- Select text in editor and right click, choose `Translate (Complete)`,
and the translation for selected text will be shown in Translation panel.

![complete-translate-screenshot](resources/screenshot/complete-translate.jpg)

- Use command `Translation` to open Translation panel.

![complete-translate-command-screenshot](resources/screenshot/complete-translate-command.jpg)

[Back to top](#features)

### Regular Expression Test
- Use command `Regular Expression Test` to open Regular Expression Test panel.

![regular-expression-test-screenshot](resources/screenshot/regular-expression-test.jpg)

[Back to top](#features)

