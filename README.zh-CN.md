# vscode-translation

[English](README.md) | 简体中文

此插件为Visual Studio Code提供翻译（基于[谷歌翻译](https://translate.google.com)）功能。

[从插件市场获取](https://marketplace.visualstudio.com/items?itemName=caiqichang.vscode-translation)

## 特性
- 支持多语言翻译
- 支持多个单词或一个句子（支持多行，每次限制在200个字符以内）翻译
- 支持发音（需要安装[FFmpeg](https://ffmpeg.org)）
- 支持HTTP代理
- [设置](#设置)
- [简单翻译](#简单翻译)
- [完整翻译](#完整翻译)
- 其他
  - [正则表达式测试](#正则表达式测试)
  - 从URL获取ss列表

## 用法
### 设置
```javascript
{
  // 默认翻译的源语言。
  "translation.source-language": "auto",

  // 默认翻译的目标语言（简体中文为zh-CN）。
  "translation.target-language": "en",

  // 是否使用HTTP代理进行翻译。
  "translation.enable-proxy": false,

  // 用于HTTP代理的URL。
  "translation.proxy-url": "http://127.0.0.1:1080",

  // 是否为获取的ss结果使用base64解码。
  "translation.ss-enable-base64decode": false,

  // 是否使用HTTP代理获取ss列表。
  "translation.ss-enable-proxy": false,

  // 用于获取ss列表的URL。
  "translation.ss-urls": [],
}
```
- 源语言和目标语言的值： 
<details>
<pre>
Auto => auto （只能用在源语言）
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

[返回顶部](#特性)

### 简单翻译
- 在编辑器中选择文本，点击右键，选择`Translate (Complete)`，所选文本的翻译将显示在通知中。

![simple-translate-screenshot](resources/screenshot/simple-translate.jpg)

[返回顶部](#特性)

### 完整翻译
- 在编辑器中选择文本，点击右键，选择`Translate (Complete)`，所选文本的翻译将显示在翻译面板中。

![complete-translate-screenshot](resources/screenshot/complete-translate.jpg)

- 使用命令`Translation`打开翻译面板。

![complete-translate-command-screenshot](resources/screenshot/complete-translate-command.jpg)

[返回顶部](#特性)

### 正则表达式测试
- 使用命令`Regular Expression Test`打开正则表达式测试面板。

![regular-expression-test-screenshot](resources/screenshot/regular-expression-test.jpg)

[返回顶部](#特性)

