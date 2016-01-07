var $ = require('jquery');
var HttpFactory = {
  post : function (url,data,success,failed) {
    //json post
    $.ajax({
      url : url,
      type : 'POST',
      dataType : 'json',
      data : data,
      timeout : 5000,
      crossDomain : true,
      xhrFields:{
        withCredentials : true
      },
      success : success,
      error : failed,
    });
  }
}

module.exports = HttpFactory;