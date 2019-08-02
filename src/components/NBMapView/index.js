import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCard } from "taro-ui";
import "./index.scss";

let map;
export default class MapView extends Taro.Component {
  constructor(props) {
    super(props);
    this.state = {
      trifficType: this.props.type || ""
    };
  }
  componentDidMount() {
    const mapData = this.props.mapData;
    this.initMap(mapData);
  }
  initMap = params => {
    const { keyword } = params || "";
    console.log(keyword)
    const trifficType = this.state.trifficType;
    map = new window.BMap.Map("Map");
    // 创建地图实例'
    let point = new window.BMap.Point(121.554822, 29.88867);
    // 创建点坐标
    map.centerAndZoom(point, 16);
    if (keyword) {
      var local = new window.BMap.LocalSearch(map, {
        renderOptions: { map: map, autoViewport: true }
      });
      local.searchNearby(keyword, point);
    }
  };

  //切换路线规划
  goTheWay = type => {
    const { start, end } = this.state;
    switch (type) {
      case "drive":
        var driving = new window.BMap.DrivingRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        });
        driving.search(start, end);
        break;
      case "bus":
        var busing = new window.BMap.TransitRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        });
        busing.search(start, end);
        break;
      case "walk":
        var walking = new window.BMap.WalkingRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        });
        walking.search(start, end);
        break;
      case "ride":
        var riding = new window.BMap.RidingRoute(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        });
        riding.search(start, end);
        break;
    }
  };

  handleClick = type => {
    this.setState(
      {
        trifficType: type
      },
      () => {
        this.goTheWay(type);
      }
    );
  };

  render() {
    const { trifficType } = this.state;
    return (
      <View className='MapView'>
        <AtCard title='附近图书馆'>
          <View id='Map'></View>
        </AtCard>
      </View>
    );
  }
}
