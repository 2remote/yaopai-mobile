var React = require('react');
import {Toast} from 'react-weui';

var UploadingToast = React.createClass({
  render : function () {
    return(
      <div className="container">
        <Toast show={this.props.show}>
          上传中...
        </Toast>
      </div>
    );
  }
});

module.exports = UploadingToast;
