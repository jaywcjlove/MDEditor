
(function (window, undefined) {
    var _$ = document.querySelectorAll.bind(document);

    /**
     * [addEvent 绑定事件]
     * @param {[type]} object [HTML节点]
     * @param {[type]} event  [事件类型]
     * @param {[type]} method [执行函数]
     */
    function addEvent(object, event, method) {
        if (object.addEventListener){
            object.addEventListener(event, method, false);
        }else if(object.attachEvent){
            object.attachEvent('on'+event, function(){ method(window.event); });
        }
    }

    /**
     * [_applyAttrs 设置属性]
     * @param  {[type]} context [HTML节点]
     * @param  {[type]} attrs   [节点相关属性]
     */
    function _applyAttrs(context, attrs) {
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                context.setAttribute(attr, attrs[attr]);
            }
        }
    }
    /**
     * 生成引用CSS标签
     * @param  {[type]} path    [description]
     * @param  {[type]} context [当前文档中生成还是在iFrame中生成]
     * @param  {[type]} id      [是否传ID]
     */
    function _insertCSSLink(path, id, context) {
        id = id || '';
        var headID = context.getElementsByTagName("head")[0], 
            cssNode = context.createElement('link');

        _applyAttrs(cssNode, {
            type: 'text/css',
            id: id,
            rel: 'stylesheet',
            href: path,
            name: path,
            media: 'screen'
        });

        headID.appendChild(cssNode);
    }
    /**
     * [_createElement 生成节点]
     * @return {[Object]} [返回节点]
     */
    function _createElement(tag,attrs){
        var elm = document.createElement(tag);
        _applyAttrs(elm,attrs);
        return elm;
    }

    /**
     * [isFunction 判断是否为一个函数]
     * @return {Boolean} [返回布尔值]
     */
    function isFunction(){return ({}).toString.call(value) == "[object Function]"}

    /**
     * [_mergeObjs 深度合并json]
     * @return {[type]} [description]
     */
    function _mergeObjs() {
        var options, name, src, copy,
        target = arguments[0],i = 1,
        length = arguments.length,
        deep = false;
        //处理深拷贝的情况
        if (typeof (target) === "boolean")
            deep = target,target = arguments[1] || {},i = 2;
        //处理时，目标是一个字符串或（深拷贝可能的情况下）的东西
        if (typeof (target) !== "object" && !isFunction(target)) 
            target = {};
        //扩展JSLite的本身，如果只有一个参数传递
        if (length === i) target = this,--i;
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name],copy = options[name];
                    if (target === copy) continue;
                    if (copy !== undefined) target[name] = copy;
                }
            }
        }
        return target;
    };

    /**
     * [css 设置节点样式]
     * @param  {[type]} elm      [节点]
     * @param  {[type]} property [css属性]
     * @param  {[type]} value    [css属性值]
     */
    function css(elm, property, value){
        if (!elm) return [];
        var computedStyle = getComputedStyle(elm, '')
        if(value === undefined && typeof property == 'string') return computedStyle.getPropertyValue(property);
        var css="",k;
        for(k in property) css += k+':'+property[k]+';';
        if(typeof property == 'string') css = property+":"+value;
        css ? elm.style.cssText += ';' + css :"";
    }

    function MDEditor(options){
        var self = this,
            opts = options || {},
            defaults = {
                id:"#mdeditor",
                minheight:200,
                maxheight:500,
                value:"",//markdown
                themes:""
            };
        
        self.obj = _$('#'+opts.id?opts.id:"mdeditor");
        self.opts = opts = _mergeObjs(defaults,opts);
        self.textarea = _createElement('textarea',{
            class:"mde_textarea",
            placeholder:"请在这里输入内容"
        });
        self.preview = _createElement('div',{class:"mde_preview markdown_body"});
        self.tools = _createElement('div',{class:"mde_tools"});
        self.btn_preview = _createElement('i',{class:"btn_preview"});
        self.btn_preview.innerHTML = "预览";
        self.tools.appendChild(self.btn_preview);

        css(self.textarea,'min-height',opts.minheight + "px");
        css(self.preview,'min-height',opts.minheight + "px");
    }
    /**
     * [load 加载编辑器]
     */
    MDEditor.prototype.load = function(){
        var self = this,box = self.obj[0],index=0;

        if(box) {
            if(box.innerHTML!=="") self.opts.value = box.innerHTML,
                box.innerHTML='';
            box.appendChild(self.preview),
            box.appendChild(self.tools),
            box.appendChild(self.textarea);
        }
        self.setMD();

        addEvent(self.btn_preview,'click', function(event) {
            index = parseInt(self.preview.style.zIndex)
            if(index === 9){
                self.preview.style.zIndex = 0
                this.innerHTML = "预览"
            }else{
                self.preview.style.zIndex = 9
                this.innerHTML = "编辑"
            }
            self.setHTML(self.getMD())
            css(self.preview,{'height':self.textarea.offsetHeight + "px"});
        });

        css(self.preview,{'height':self.textarea.offsetHeight + "px"});
        addEvent(self.textarea,'input', function(event) {
            if(this.scrollHeight<self.opts.maxheight){
                css(self.textarea,{
                    'height':this.scrollHeight + "px",
                    'overflow':"hidden"
                });
            }else{
                css(self.textarea,{
                    'height':self.opts.maxheight + "px",
                    'overflow':"auto"
                });
            }
            css(self.preview,{'height':self.textarea.offsetHeight  + "px"});
        });
    }
    /**
     * [getMD 获取markdown的字符串]
     * @return {[type]} [返回markdown字符串]
     */
    MDEditor.prototype.getMD =function(){
        return this.textarea.value
    }

    /**
     * [setMD 设置markdown的字符串]
     */
    MDEditor.prototype.setMD =function(val){
        if(marked) this.textarea.value = val?val:this.opts.value;
        return this;
    }

    /**
     * [getHTML 获取生成的HTML]
     * @return {[type]} [返回HTML字符串]
     */
    MDEditor.prototype.getHTML =function(){
        if(marked) return marked(this.getMD());
        else return this.preview.innerHTML
    }

    /**
     * [setHTML 设置预览的HTML]
     */
    MDEditor.prototype.setHTML =function(val){
        if(marked) this.preview.innerHTML = marked(val?val:this.opts.value);
        return this;
    }

    if (typeof window.define === 'function' && window.define.amd) {
        window.define(function () { return MDEditor; });
    } else {
        window.MDEditor = MDEditor;
    }
})(window);