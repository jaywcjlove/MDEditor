# 简易Markdownd编辑器

html  

```html
<link rel="stylesheet" type="text/css" href="../themes/default/css/MDEditor.min.css">
<script type="text/javascript" src="../lib/MDEditor.js"></script>
<div id="mdeditor"></div>
```

js  

```js
var mde = new MDEditor({
    id:"#mdeditor",
    minheight:200,
    maxheight:500
}).load()
```

## load
加载编辑器

```js
mde.load()  //=>返回markdown字符串
```

## getMD
获取markdown的字符串

```js
mde.getMD()  //=>返回markdown字符串
```


## getHTML
获取生成的HTML

```js
mde.getMD()  //=>返回HTML字符串
```