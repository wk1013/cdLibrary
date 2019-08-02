import Taro, { Component } from "@tarojs/taro";
import { View, Text,Image,RichText } from "@tarojs/components";
import "./ReferenceContent.styl";
import RestTools from "../../utils/RestTools";
import rContentIcon from "../../statics/rcontent.png" 

export default class ReferenceContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View className="referenceContent">
        <Image src={rContentIcon}></Image>
        <Text className="referenceHeader">介绍</Text>
        <RichText 
          className="referenceBody"
          nodes={RestTools.unifyFontColor(RestTools.fixImgSrc(RestTools.translteToRed(data)))}
        ></RichText>
      </View>
    );
  }
}
