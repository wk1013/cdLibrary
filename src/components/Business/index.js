import Taro, { Component } from "@tarojs/taro";
import { View, RichText, Icon, Text } from "@tarojs/components";
import _ from "lodash";
import RestTools from "../../utils/RestTools";
import MapView from "../../components/MapView";
import "./index.styl";

class Business extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;
    const likeData = this.props.likeData;
    const { User, Aye, Nay } = likeData;
    let source = null;
    
    const link =
      data["Extra"]["Type"] === "link" ? (
        <a
          style={{ color: "blue", display: "flex", justifyContent: "flex-end" }}
          onClick={() => {
            Taro.navigateTo({ url: "/pages" + data.Extra.KeyWord });
          }}
        >
          {"查看详情>>"}
        </a>
      ) : null;
    const map =
      data["Extra"]["Type"] === "map" ? (
        <MapView
          title='相关地图'
          mapData={{ keyWord: data["Extra"]["KeyWord"] }}
        />
      ) : null;
    if (
      data["Extra"]["来源"] != undefined &&
      data["Extra"]["来源"] != null &&
      data["Extra"]["来源"].length > 0
    ) {
      source = (
        <a className='businessSource'>
          <View className='like-wrap'>
            <Text style={{ marginRight: "20px" }}>
              <Icon
                className={
                  User == "1"
                    ? "iconfont icon-like active"
                    : "iconfont icon-like"
                }
                onClick={this.props.onClickLike.bind(this, true)}
              />
              {Aye || 0}
            </Text>
            <Text>
              <Icon
                className={
                  User == "0"
                    ? "iconfont icon-dislike active"
                    : "iconfont icon-dislike "
                }
                onClick={this.props.onClickLike.bind(this, false)}
              />
              {Nay || 0}
            </Text>
          </View>

          <Text>
            来源：
            <a href={data["Extra"]["来源链接"]}>{data["Extra"]["来源"]}</a>
          </Text>
        </a>
      );
    } else {
      source = (
        <View className='like-wrap'>
          <Text style={{ marginRight: "20px" }}>
            <Icon
              className={
                User == "1" ? "iconfont icon-like active" : "iconfont icon-like"
              }
              onClick={this.props.onClickLike.bind(this, true)}
            />
            {Aye || 0}
          </Text>
          <Text>
            <Icon
              className={
                User == "0"
                  ? "iconfont icon-dislike active"
                  : "iconfont icon-dislike "
              }
              onClick={this.props.onClickLike.bind(this, false)}
            />
            {Nay || 0}
          </Text>
        </View>
      );
    }
    return (
      <View className='business'>
        <RichText nodes={RestTools.translteToRed(_.get(data, "Answer", ""))} />
        {link}
        {map}
      </View>
    );
  }
}
export default Business;
