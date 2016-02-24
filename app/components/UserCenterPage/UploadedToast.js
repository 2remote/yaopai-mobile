var React = require('react');
import {Toast} from 'react-weui';

var UploadedToast = React.createClass({
  render : function () {
    return(
        <Toast 
          show={this.props.show}
          icon="success"
          size="large">
          头像上传成功！
        </Toast>
    );
  }
});

module.exports = UploadedToast;
