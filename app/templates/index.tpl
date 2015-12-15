<!DOCTYPE html>
<html{% if(o.htmlWebpackPlugin.files.manifest) { %}
  manifest="{%=o.htmlWebpackPlugin.files.manifest %}" {% } %}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />

    <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?729720ed3583c74c1baf6772758369f3";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    </script>

    <title>{%=o.htmlWebpackPlugin.options.title %}</title>
    <style>
      @font-face {
        font-family: 'iconfont';
        src: url('//at.alicdn.com/t/font_1450152487_3929503.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/font_1450152487_3929503.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('//at.alicdn.com/t/font_1450152487_3929503.woff') format('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/font_1450152487_3929503.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/font_1450152487_3929503.svg#iconfont') format('svg'); /* iOS 4.1- */
      }

      body {
        font-family: 'iconfont', Fallback, sans-serif;
      }
    </style>
    {% if(o.htmlWebpackPlugin.files.favicon) { %}
    <link rel="shortcut icon" href="{%=o.htmlWebpackPlugin.files.favicon%}">
    {% } %}

    {% for (var css in o.htmlWebpackPlugin.files.css) { %}
    <link href="{%=o.htmlWebpackPlugin.files.css[css]%}" ref="stylesheet">
    {% } %}
  </head>
  <body>
    <div id="app"></div>

    {% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
    <script src="{%=o.htmlWebpackPlugin.files.chunks[chunk].entry%}"></script>
    {% } %}

    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    </body>
</html>