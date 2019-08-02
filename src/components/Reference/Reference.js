import Taro, { Component } from "@tarojs/taro";
import { View,Button } from "@tarojs/components";
import "./Reference.styl";
import ReferenceTitle from "./ReferenceTitle";
import ReferenceContent from "./ReferenceContent";

export default class Reference extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:props.data
    }
  }

  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <View className="reference">
        <ReferenceTitle data={data["DATA"][0]["FieldValue"]["Title"]} />
        <ReferenceContent data={data["DATA"][0]["FieldValue"]["Answer"]} />
      </View>
    );
  }
}
