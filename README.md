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
<div id="mdeditor">
# 这里放markdown初始值
- id: 节点id
- minheight: 初始化编辑器高度
- maxheight: 编辑器随着输入内容增多而变高，这个值是它的最大值
- value: 默认编辑器中显示markdown内容
</div>
```

js  

```js
var mde = new MDEditor({
    id:"#mdeditor",
    minheight:300,
    maxheight:600,
    value:"#多多少少的"
}).load().input(function(evn,opts){
    console.log("evn:",evn)
    console.log("opts:",opts)
})
```

## MDEditor初始化

- id: 节点id
- minheight: 初始化编辑器高度
- maxheight: 编辑器随着输入内容增多而变高，这个值是它的最大值
- value: 默认编辑器中显示markdown内容

## load
加载编辑器

```js
mde.load()  
```

## input
输入事件，在编辑器里面输入内容就会执行input方法

```js
mde.input(function(evn,opts){
    console.log("evn:",evn)
    console.log("opts:",opts)
})  
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