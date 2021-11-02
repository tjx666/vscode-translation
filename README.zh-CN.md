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

<details>
<summary>源语言和目标语言的值</summary>
<table>
<thead>
<tr><th>语言</th><th>值</th></tr>
</thead>
<tbody>
<tr><td>Auto</td><td>auto（只能用在源语言）</td></tr>
<tr><td>Afrikaans</td><td>af</td></tr>
<tr><td>Albanian</td><td>sq</td></tr>
<tr><td>Amharic</td><td>am</td></tr>
<tr><td>Arabic</td><td>ar</td></tr>
<tr><td>Armenian</td><td>hy</td></tr>
<tr><td>Azerbaijani</td><td>az</td></tr>
<tr><td>Basque</td><td>eu</td></tr>
<tr><td>Belarusian</td><td>be</td></tr>
<tr><td>Bengali</td><td>bn</td></tr>
<tr><td>Bosnian</td><td>bs</td></tr>
<tr><td>Bulgarian</td><td>bg</td></tr>
<tr><td>Catalan</td><td>ca</td></tr>
<tr><td>Cebuano</td><td>ceb</td></tr>
<tr><td>Chichewa</td><td>ny</td></tr>
<tr><td>Chinese (Simple)</td><td>zh-CN</td></tr>
<tr><td>Chinese (Traditional)</td><td>zh-TW</td></tr>
<tr><td>Corsican</td><td>co</td></tr>
<tr><td>Croatian</td><td>hr</td></tr>
<tr><td>Czech</td><td>cs</td></tr>
<tr><td>Danish</td><td>da</td></tr>
<tr><td>Dutch</td><td>nl</td></tr>
<tr><td>English</td><td>en</td></tr>
<tr><td>Esperanto</td><td>eo</td></tr>
<tr><td>Estonian</td><td>et</td></tr>
<tr><td>Filipino</td><td>tl</td></tr>
<tr><td>Finnish</td><td>fi</td></tr>
<tr><td>French</td><td>fr</td></tr>
<tr><td>Frisian</td><td>fy</td></tr>
<tr><td>Galician</td><td>gl</td></tr>
<tr><td>Georgian</td><td>ka</td></tr>
<tr><td>German</td><td>de</td></tr>
<tr><td>Greek</td><td>el</td></tr>
<tr><td>Gujarati</td><td>gu</td></tr>
<tr><td>Haitian Creole</td><td>ht</td></tr>
<tr><td>Hausa</td><td>ha</td></tr>
<tr><td>Hawaiian</td><td>haw</td></tr>
<tr><td>Hebrew</td><td>iw</td></tr>
<tr><td>Hindi</td><td>hi</td></tr>
<tr><td>Hmong</td><td>hmn</td></tr>
<tr><td>Hungarian</td><td>hu</td></tr>
<tr><td>Icelandic</td><td>is</td></tr>
<tr><td>Igbo</td><td>ig</td></tr>
<tr><td>Indonesian</td><td>id</td></tr>
<tr><td>Irish</td><td>ga</td></tr>
<tr><td>Italian</td><td>it</td></tr>
<tr><td>Japanese</td><td>ja</td></tr>
<tr><td>Javanese</td><td>jw</td></tr>
<tr><td>Kannada</td><td>kn</td></tr>
<tr><td>Kazakh</td><td>kk</td></tr>
<tr><td>Khmer</td><td>km</td></tr>
<tr><td>Kinyarwanda</td><td>rw</td></tr>
<tr><td>Korean</td><td>ko</td></tr>
<tr><td>Kurdish</td><td>ku</td></tr>
<tr><td>Kyrgyz</td><td>ky</td></tr>
<tr><td>Lao</td><td>lo</td></tr>
<tr><td>Latin</td><td>la</td></tr>
<tr><td>Latvian</td><td>lv</td></tr>
<tr><td>Lithuanian</td><td>lt</td></tr>
<tr><td>Luxembourgish</td><td>lb</td></tr>
<tr><td>Macedonian</td><td>mk</td></tr>
<tr><td>Malagasy</td><td>mg</td></tr>
<tr><td>Malay</td><td>ms</td></tr>
<tr><td>Malayalam</td><td>ml</td></tr>
<tr><td>Maltese</td><td>mt</td></tr>
<tr><td>Maori</td><td>mi</td></tr>
<tr><td>Marathi</td><td>mr</td></tr>
<tr><td>Mongolian</td><td>mn</td></tr>
<tr><td>Myanmar</td><td>my</td></tr>
<tr><td>Nepali</td><td>ne</td></tr>
<tr><td>Norwegian</td><td>no</td></tr>
<tr><td>Pashto</td><td>ps</td></tr>
<tr><td>Persian</td><td>fa</td></tr>
<tr><td>Polish</td><td>pl</td></tr>
<tr><td>Portuguese</td><td>pt</td></tr>
<tr><td>Punjabi</td><td>pa</td></tr>
<tr><td>Romanian</td><td>ro</td></tr>
<tr><td>Russian</td><td>ru</td></tr>
<tr><td>Samoan</td><td>sm</td></tr>
<tr><td>Scots Gaelic</td><td>gd</td></tr>
<tr><td>Serbian</td><td>sr</td></tr>
<tr><td>Sesotho</td><td>st</td></tr>
<tr><td>Shona</td><td>sn</td></tr>
<tr><td>Sindhi</td><td>sd</td></tr>
<tr><td>Sinhala</td><td>si</td></tr>
<tr><td>Slovak</td><td>sk</td></tr>
<tr><td>Slovenian</td><td>sl</td></tr>
<tr><td>Somali</td><td>so</td></tr>
<tr><td>Spanish</td><td>es</td></tr>
<tr><td>Sundanese</td><td>su</td></tr>
<tr><td>Swahili</td><td>sw</td></tr>
<tr><td>Swedish</td><td>sv</td></tr>
<tr><td>Tajik</td><td>tg</td></tr>
<tr><td>Tamil</td><td>ta</td></tr>
<tr><td>Telugu</td><td>te</td></tr>
<tr><td>Thai</td><td>th</td></tr>
<tr><td>Turkish</td><td>tr</td></tr>
<tr><td>Turkmen</td><td>tk</td></tr>
<tr><td>Ukrainian</td><td>uk</td></tr>
<tr><td>Urdu</td><td>ur</td></tr>
<tr><td>Uzbek</td><td>uz</td></tr>
<tr><td>Vietnamese</td><td>vi</td></tr>
<tr><td>Welsh</td><td>cy</td></tr>
<tr><td>Xhosa</td><td>xh</td></tr>
<tr><td>Yiddish</td><td>yi</td></tr>
<tr><td>Yoruba</td><td>yo</td></tr>
<tr><td>Zulu</td><td>zu</td></tr>
</tbody>
</table>
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

