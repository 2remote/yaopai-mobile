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
      districtList : [],
      found: false,
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
  getNameById : function (id) {
    var found = this.state.found;

    var provinceList = this.state.provinceList;
    provinceList.map(function (province) {
      if(province.Id == id){
        if(found){
          found = found + " " + province.Name;  
        }else{
          found = province.Name;
        }
      }
    })

    var cityList = this.state.cityList;
    cityList.map(function (city) {
      if(city.Id == id){
        if(found){
          found = found + " " + city.Name;  
        }else{
          found = city.Name;
        }
      }
    })

    var districtList = this.state.districtList;
    districtList.map(function (district) {
      if(district.Id == id){
        if(found){
          found = found + " " + district.Name;  
        }else{
          found = district.Name;
        }
      }
    })

    this.setState({found: found});
    return found;
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
    var vname = this.getNameById(v);
    if(v != '0'){
      AreaActions.getCity({ParentId : v});
    }else{
      this.setState({cityList : []});
    }
    this.props.onProvinceChange(v, vname);
  },
  onCityChange : function(){
    this.setState({districtList:[]});
    var v = ReactDOM.findDOMNode(this.refs.city).value;
    var vname = this.getNameById(v);
    if(v != '0'){
      AreaActions.getDistrict({ParentId : v});
    }else{
      this.setState({districtList : []});
    }
    this.props.onCityChange(v, vname);
  },
  onDistrictChange : function(){
    var v = ReactDOM.findDOMNode(this.refs.district).value;
    var vname = this.getNameById(v);
    this.props.onDistrictChange(v, vname);
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
      <div className="weui_cells">
        <div className="weui_cell weui_cell_select weui_select_after">
          <div className="weui_cell_hd">
            省份：
          </div>

          <div className="weui_cell_bd weui_cell_primary">
            <select className="weui_select"
              name="select1"
              ref="province" 
              type="select" 
              disabled={this.props.disabled} 
              value = {this.props.province}
              onChange={this.onProvinceChange}>
              <option value={0}>选择省份</option>
              {province}
            </select>
          </div>
        </div>

        <div className="weui_cell weui_cell_select weui_select_after">
          <div className="weui_cell_hd">
            城市：
          </div>
          <div className="weui_cell_bd weui_cell_primary">
            <select className="weui_select"
              ref="city" 
              type="select"
              disabled={this.props.disabled}  
              value ={this.props.city}
              onChange={this.onCityChange}>
              <option value={0}>选择城市</option>
              {city}
            </select>
          </div>
        </div>

        <div className="weui_cell weui_cell_select weui_select_after">
          <div className="weui_cell_hd">
            地区：
          </div>
          <select className="weui_select"
            ref="district"
            type="select"
            disabled = {this.props.disabled}
            value={this.props.district}
            onChange={this.onDistrictChange}>
            <option value={0}>选择区县</option>
            {district}
          </select>
        </div>
      </div>
    );
  }
});

module.exports = AreaSelect;