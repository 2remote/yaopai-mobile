import $ from 'jquery'

const HttpFactory = {
  post: function (url,data,success,failed) {
    //json post
    $.ajax({
      url,
      type : 'POST',
      dataType : 'json',
      data,
      timeout : 5000,
      crossDomain : true,
      xhrFields:{
        withCredentials : true
      },
    })
    .done(success)
    .fail(failed)
  }
}

export default HttpFactory
