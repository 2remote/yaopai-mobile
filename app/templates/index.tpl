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
    
    <style>
      @keyframes rotate {
        0% {
          -webkit-transform: rotate(0deg) scale(1);
                  transform: rotate(0deg) scale(1); }
        50% {
          -webkit-transform: rotate(180deg) scale(0.6);
                  transform: rotate(180deg) scale(0.6); }
        100% {
          -webkit-transform: rotate(360deg) scale(1);
                  transform: rotate(360deg) scale(1); } }

      .ball-clip-rotate-multiple {
        position: relative; }
        .ball-clip-rotate-multiple > div {
          -webkit-animation-fill-mode: both;
                  animation-fill-mode: both;
          position: absolute;
          left: -20px;
          top: -20px;
          border: 2px solid #fff;
          border-bottom-color: transparent;
          border-top-color: transparent;
          border-radius: 100%;
          height: 35px;
          width: 35px;
          -webkit-animation: rotate 1s 0s ease-in-out infinite;
                  animation: rotate 1s 0s ease-in-out infinite; }
          .ball-clip-rotate-multiple > div:last-child {
            display: inline-block;
            top: -10px;
            left: -10px;
            width: 15px;
            height: 15px;
            -webkit-animation-duration: 0.5s;
                    animation-duration: 0.5s;
            border-color: #fff transparent #fff transparent;
            -webkit-animation-direction: reverse;
                    animation-direction: reverse; }

      .loader-container {   
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        -webkit-transition: 1s;
        transition: 1s;
        z-index: 999; }

      .loader-active {
        position: relative;
        left: 50%;
        top: 50%; }
    </style>
    <link rel="stylesheet" href="node_modules/weui/dist/style/weui.min.css"/>
    <script type="text/javascript" src="/imgs/ua-parser.min.js"></script>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1453531938_6835597.css">
    <link rel="stylesheet" type="text/css" href="http://cdn.staticfile.org/slick-carousel/1.3.15/slick.css" />
    {% if(o.htmlWebpackPlugin.files.favicon) { %}
    <link rel="shortcut icon" href="{%=o.htmlWebpackPlugin.files.favicon%}">
    {% } %}

    {% for (var css in o.htmlWebpackPlugin.files.css) { %}
    <link href="{%=o.htmlWebpackPlugin.files.css[css]%}" ref="stylesheet">
    {% } %}
  </head>
  <body>
    <script type="text/javascript">
      var parser = new UAParser();
      var iOS = false;
      if(parser.getResult().browser.name == 'Safari'){
        iOS = true;
      }
    </script>

    <div id="loader-container" class="loader-container">
      <div class="loader loader-active">
        <div class="loader-inner ball-clip-rotate-multiple" >
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <script>
      if(iOS){
        setTimeout(function(){
          document.querySelector('.loader-container').style.opacity=0;
          setTimeout(function(){
            document.querySelector('.loader-container').style.display='none';
          },1000);
        },3000);
      }else{
        document.getElementById('loader-container').remove();
      }
    </script>
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

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
    </body>
</html>