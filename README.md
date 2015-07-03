# 简易Markdownd编辑器

[![](https://img.shields.io/github/issues/jaywcjlove/MDEditor.svg)](https://github.com/jaywcjlove/MDEditor/issues) [![](https://img.shields.io/github/forks/jaywcjlove/MDEditor.svg)](https://github.com/jaywcjlove/MDEditor/network) [![](https://img.shields.io/github/stars/jaywcjlove/MDEditor.svg)](https://github.com/jaywcjlove/MDEditor/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/MDEditor.svg)](https://github.com/jaywcjlove/MDEditor/releases)

##使用

html  
- 添加 `MDEditor.min.css` 样式
- 添加 `MDEditor.min.js` 并不是 ~~`lib/MDEditor.js`~~ 哦
- 添加编辑器初始节点

```html
<link rel="stylesheet" type="text/css" href="../themes/default/css/MDEditor.min.css">
<script type="text/javascript" src="../build/MDEditor.min.js"></script>
<div id="mdeditor"></div>
```

js  

```js
var mde = new MDEditor({
    id:"#mdeditor",
    minheight:300,
    maxheight:600,
    value:"#多多少少的"
}).load()
```

## load
加载编辑器

```js
mde.load()  
```

## getMD
获取markdown的字符串

```js
mde.getMD()  //=>返回markdown字符串
```

## setMD
设置markdown的字符串

```js
mde.setMD(val)  
```

## getHTML
获取生成的HTML

```js
mde.getMD()  //=>返回HTML字符串
```

## setHTML
设置预览的HTML

```js
mde.setHTML(val)  
```