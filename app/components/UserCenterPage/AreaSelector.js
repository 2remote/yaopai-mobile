var React = require ('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
// var Input = require('react-bootstrap').Input;

var AreaActions = require('../../actions/AreaActions');
var AreaStore = require('../../stores/AreaStore');

var AreaSelect = React.createClass({
  mixins : [Reflux.listenTo(AreaStore,'onGetAreaList')],
  getInitialState : function(){
    return {
      provinceList : [],
      cityList : [],
      districtList : []
    }
  },
  componentDidMount : function(){
    AreaActions.getProvince();
  },
  componentWillReceiveProps : function(nextProps){
    if(nextProps.province != this.props.province){
      AreaActions.getCity({ParentId : nextProps.province});
    }
    if(nextProps.city != this.props.city){
      AreaActions.getDistrict({ParentId : nextProps.city});
    }
  },
  onGetAreaList : function(data){
    if(data.flag == 'province'){
      this.setState({provinceList:data.province});
    }
    if(data.flag == 'city'){
      this.setState({cityList : data.city})
    }
    if(data.flag == 'district'){
      this.setState({districtList : data.district});
    }
  },
  onProvinceChange : function(){
    this.setState({cityList:[],districtList:[]});
    var v = ReactDOM.findDOMNode(this.refs.province).value;
    if(v != '0'){
      AreaActions.getCity({ParentId : v});
    }else{
      this.setState({cityList : []});
    }
    this.props.onProvinceChange(v);
  },
  onCityChange : function(){
    this.setState({districtList:[]});
    var v = ReactDOM.findDOMNode(this.refs.city).value;
    if(v != '0'){
      AreaActions.getDistrict({ParentId : v});
    }else{
      this.setState({districtList : []});
    }
    this.props.onCityChange(v);
  },
  onDistrictChange : function(){
    var v = ReactDOM.findDOMNode(this.refs.district).value;
    this.props.onDistrictChange(v);
  },
  getValue : function(){
    var p = ReactDOM.findDOMNode(this.refs.province).value;
    var c = ReactDOM.findDOMNode(this.refs.city).value;
    var d = ReactDOM.findDOMNode(this.refs.district).value;
    if(d && d != '0') return d;
    if(c && c != '0') return c;
    if(p && p != '0') return p;
    return null;
  },
  setValue : function(province,city,country){
    ReactDOM.findDOMNode(this.refs.province).value = province;
    ReactDOM.findDOMNode(this.refs.city).value = city;
    ReactDOM.findDOMNode(this.refs.district).value = country
  },
  render : function(){
    var province = this.state.provinceList.map(function(item){
      return <option key={item.Id} value={item.Id}>{item.Name}</option>
    });
    var city = this.state.cityList.map(function(item){
      return <option key={item.Id} value={item.Id}>{item.Name}</option>
    });
    var district = this.state.districtList.map(function(item){
      return <option key={item.Id} value={item.Id}>{item.Name}</option>
    });

    return (
      <div className="form-group">
        <label className="control-label col-xs-3">
          <span>地区：</span>
        </label>

        <select ref="province" 
          type="select" 
          disabled={this.props.disabled} 
          className="form-control" 
          value = {this.props.province}
          onChange={this.onProvinceChange}>
          <option value={0}>选择省份</option>
          {province}
        </select>

        <select ref="city" 
          type="select"
          disabled={this.props.disabled} 
          className="form-control" 
          value ={this.props.city}
          onChange={this.onCityChange}>
          <option value={0}>选择城市</option>
          {city}
        </select>

        <select ref="district"
          type="select"
          disabled = {this.props.disabled}
          className="form-control"
          value={this.props.district}
          onChange={this.onDistrictChange}>
          <option value={0}>选择区县</option>
          {district}
        </select>
      </div>
    );
  }
});

module.exports = AreaSelect;