import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCard } from "taro-ui";
import "./index.scss";

let map;
export default class MapView extends Taro.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const mapData = this.props.mapData;
    this.initMap(mapData);
  }
  initMap = params => {
    const { keyWord } = params || "";
    map = new window.BMap.Map("Map_A");
    // 创建地图实例'
    let point = new window.BMap.Point(121.554822, 29.88867);
    // 创建点坐标
    map.centerAndZoom(point, 16);
    if (keyWord) {
      var local = new window.BMap.LocalSearch(map, {
        renderOptions: { map: map, autoViewport: true }
      });
      local.searchNearby(keyWord, point);
    }
  };

  render() {
    return (
      <View className='MapView' >
        <AtCard title={this.props.title}>
          <View id='Map_A' style={{width:'100%',height:'12.8rem'}}></View>
        </AtCard>
      </View>
    );
  }
}