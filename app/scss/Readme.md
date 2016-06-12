#### 如果没用过 sass 可以参考 [sass 十分钟入门](http://www.sass.hk/sass-course.html)

#### [sass 规范](https://github.com/Zhangjd/css-style-guide) （翻译自 Airbnb CSS / Sass Styleguide）

### 浏览器报错
> Cannot find module "!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss"  

说明 sass 中某个地方语法不对，比如
````scss
div {
  // 会报错，因为少一个分号
  color: #fff
  width: 100px;
}
````

### 命名方式
 所有的 sass 导入文件都可以忽略后缀名 `.scss`。一般来说基础的文件命名方法以_开头，如 `_mixin.scss`。这种文件在导入的时候可以不写下划线，可写成 `@import 'mixin'`（使用单引号）。


### 注释
sass 有两种注释方式，一种是标准的 css 注释方式 /\* \*/，另一种则是 // 双斜杆形式的单行注释，不过这种单行注释不会被转译出来。


### 默认变量
sass的默认变量仅需要在值后面加上!default即可。
```scss
//sass style
//-------------------------------
$baseLineHeight: .5 !default;
body{ line-height: $baseLineHeight; }

//css style
//-------------------------------
body{ line-height:1.5; }
```
sass的默认变量一般是用来设置默认值，然后根据需求来覆盖的，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可
```scss
//sass style
//-------------------------------
$baseLineHeight: 2;
$baseLineHeight: 1.5 !default;
body{ line-height: $baseLineHeight; }

//css style
//-------------------------------
body{ line-height:2; }
```
可以看出现在编译后的line-height为2，而不是我们默认的1.5。默认变量的价值在进行组件化开发的时候会非常有用。

### 函数
实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以lighten减淡和darken加深为最。  
其调用方法为lighten($color,$amount)和darken($color,$amount)，它们的第一个参数都是颜色值，第二个参数都是百分比。
````scss
//sass style
//-------------------------------                     
$baseFontSize: 10px !default;
$gray:         #ccc !defualt;        

// pixels to rems
@function pxToRem($px) {
  @return $px / $baseFontSize * 1rem;
}

body{
  font-size:$baseFontSize;
  color:lighten($gray,10%);
}
.test{
  font-size:pxToRem(16px);
  color:darken($gray,10%);
}

//css style
//-------------------------------
body{
  font-size:10px;
  color:#E6E6E6;
}
.test{
  font-size:1.6rem;
  color:#B3B3B3;
}
````

### @at-root
sass 规范选择器嵌套不能超过 3 层。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。
```scss
//sass style
//-------------------------------
//没有跳出
.parent-1 {
  color:#f00;

  .child { width:100px; }
}

//单个选择器跳出
.parent-2 {
  color:#f00;

  @at-root .child { width:200px; }
}

//多个选择器跳出
.parent-3 {
  background:#f00;

  @at-root {
    .child1 { width:300px; }
    .child2 { width:400px; }
  }
}

//css style
//-------------------------------
.parent-1        { color: #f00; }
.parent-1 .child { width: 100px; }

.parent-2 { color: #f00; }
.child    { width: 200px; }

.parent-3 { background: #f00; }
.child1   { width: 300px; }
.child2   { width: 400px; }
```

### 混合宏（mixin） VS 继承（extends） VS 占位符（%）
什么时候用混合宏，什么时候用继承，什么时候使用占位符？


![总结](http://7xte7j.com2.z0.glb.clouddn.com/sass%E6%80%BB%E7%BB%93.jpg)

**1.如果你的代码块中涉及到变量，建议使用混合宏来创建相同的代码块。**

**2.如果你的代码块不需要专任何变量参数，而且有一个基类已在文件中存在，那么建议使用 Sass 的继承。**

**3.占位符是独立定义，不调用的时候是不会在 CSS 中产生任何代码。**


***
以上参考：
* [Sass Guide](http://www.w3cplus.com/sassguide/syntax.html)
* [Sass混同宏、继承、占位符](http://www.myexception.cn/HTML-CSS/2037440.html)
