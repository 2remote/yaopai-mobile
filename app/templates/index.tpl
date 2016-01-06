<!DOCTYPE html>
<html{% if(o.htmlWebpackPlugin.files.manifest) { %}
  manifest="{%=o.htmlWebpackPlugin.files.manifest %}" {% } %}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />

    <title>{%=o.htmlWebpackPlugin.options.title %}</title>

    <link rel="stylesheet" href="//at.alicdn.com/t/font_1450498112_8514779.css">
    <link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/slick-carousel/1.3.15/slick.css" />
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


    <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?729720ed3583c74c1baf6772758369f3";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    </script>
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    </body>
</html>
