import React from 'react';
import DocumentTitle from 'react-document-title';
import '../LoginPage/index.scss';

/*已废弃*/
import FindByMobileForm from './FindByMobileForm';
import ChangePassWordForm from './ChangePassWordForm';

var FindMyPassPage = React.createClass({
  getInitialState: function () {
    return {
      step: 1
    }
  },
  showNextStep: function () {
    this.setState({step: 2})
  },
  render: function() {
    var styles = {
      marginTop: '100px'
    };
    var resetForm;
    if (this.state.step == 1) {
      resetForm = <FindByMobileForm toNextStep={this.showNextStep} />;
    } else {
      resetForm = <ChangePassWordForm />;
    }
    return (
      <DocumentTitle title="重置密码第一步">
        <div style={styles} className="findMyPassPage">
        {resetForm}
        </div>
      </DocumentTitle>
    );
  }
});

export {FindMyPassPage as default};