import Taro, { Component } from "@tarojs/taro";
import { View, Image} from "@tarojs/components";
import _ from "lodash";
import "./webpage.scss";
import NavBar from "../../components/NavBar";
import MockData from "../../mock/mockData.json";
import RestTools from '../../utils/RestTools';

export default class webpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick = e => {
    if (e.target.tagName === 'IMG') {
      const currentSrc = e.target.currentSrc;
      RestTools.previewImg('exhibitionDetail', currentSrc);
    }
    return;
  };

  render() {
    const name = this.$router.params.fileUrl
    const list = MockData[name]
    return (
      <View>
        <View className='banner_a'>
          <NavBar title={decodeURI(this.$router.params.title)} needBack />
        </View>
        <View className="body" style="padding:10px;margin-top:10px;" id='exhibitionDetail' onClick={this.handleClick}>
          {list.map(item => {
            return (
              <Image
                style='width: 100%;height: auto;background: #fff;'
                src={item.url}  
              />
            )
          })}
        </View>
      </View>
    );
  }
}
