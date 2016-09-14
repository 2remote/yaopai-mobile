import React from 'react'
import areaData from '../areaData'
import WeUI from 'react-weui'

const {
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Select,
} = WeUI

class AreaSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countryItem: [],
      provinceItem: [],
      cityItem: [],
    }
  }

  componentDidMount() {
    let countryItem = []
    let provinceItem = []

    areaData.map((country, index) => countryItem[index] = {
      value: country.Id,
      label: country.Cn
    })

    const ChinaProvinceList = areaData.filter(country => country.Id == 10000)[0].Provinces
    ChinaProvinceList.map((province, index) => provinceItem[index] = {
      value: province.Id,
      label: province.Cn,
      cities: province.Cities
    })

    this.setState({
      countryItem,
      provinceItem,
    })
  }

  countrySelect(event) {
    this.setState({ // 选择国家时重置数据
      provinceItem: [],
      cityItem: [],
    })
    let countryId = event.target.value // 得到选择的国家 ID @number
    let country = areaData.filter(item => item.Id == countryId)[0] //拿到这个国家的数据 @object
    if (country.Provinces.length == 0) { // 连省都没有的地区或国家
      this.setState({
        provinceItem: [],
        cityItem: [],
      })
    } else if (!country.Provinces[0].Cn) { // 没有省，但是有市
      this.setState({
        provinceItem: [],
      })
      this.cityListRender(country.Provinces[0].Cities) //渲染市列表
    } else {
      this.provinceListRender(country) //渲染省列表
    }
  }

  provinceListRender(country) {
    let provinceItem = []
      // 储存 value 和 label 的同时把 cities 也存了进来
    country.Provinces.map((province, index) => provinceItem[index] = {
      value: province.Id,
      label: province.Cn,
      cities: province.Cities
    })
    this.setState({
      provinceItem
    })
  }

  provinceSelect(event) {
    let provinceId = event.target.value
    let province = this.state.provinceItem.filter(item => item.value == provinceId)[0] //拿到这个国家的数据 @object
    let cityData = province.cities
      // 如果省只有一个市，且的名字和省一样，比如北京省下有一个北京市
    if (cityData.length == 1 && province.Cn == cityData[0].Cn) {
      // TODO
      return
    }
    this.cityListRender(cityData)
  }

  cityListRender(cityData) {
    let cityItem = []
    cityData.map((city, index) => cityItem[index] = {
      value: city.Id,
      label: city.Cn
    })
    this.setState({
      cityItem
    })
  }

  render() {
    return (
			<div>
        <Form>
          <FormCell select selectPos="">
            <CellHeader>国家/地区</CellHeader>
            <CellBody>
              <Select className="select"  defaultValue="10000" data={this.state.countryItem} onChange={this.countrySelect.bind(this)} />
            </CellBody>
          </FormCell>

          {
            this.state.provinceItem.length ?
            <FormCell select selectPos="after">
              <CellHeader>省/直辖市</CellHeader>
              <Select className="select"  defaultValue="10001" data={this.state.provinceItem} onChange={this.provinceSelect.bind(this)} />
              <CellBody>
              </CellBody>
            </FormCell>
            : null
          }

          {
            this.state.cityItem.length ?
            <FormCell select selectPos="after">
              <CellHeader>城市</CellHeader>
              <Select className="select"  defaultValue="10001" data={this.state.cityItem} />
              <CellBody>
              </CellBody>
            </FormCell>
            : null
          }
        </Form>
			</div>
		)
  }
}

export default AreaSelector
