import Taro, { Component } from "@tarojs/taro";
import { View,Button } from "@tarojs/components";
import "./ReferenceList.styl";
import Reference from "./Reference";

export default class ReferenceList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:props.data
    }
  }

  render() {
    const { list } = this.state;
    let result = [];
    list.map(item=>{
      result.push(
        <Reference
          data={item}
        />
      );
    });
    return (
      <View className="referenceList">
        {result}
      </View>
    );
  }
}
