var React = require('react');
import {Toast} from 'react-weui';

var UploadingToast = React.createClass({
  render : function () {
    return(
        <Toast 
          show={this.props.show}
          icon="waiting"
          size="large">
          头像上传中...
        </Toast>
    );
  }
});

module.exports = UploadingToast;
