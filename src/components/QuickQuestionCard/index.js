import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCard, AtTag } from "taro-ui";
import "./index.scss";
import RestTools from "../../utils/RestTools";

export default class QuestionCard extends Taro.Component {
  onClickTag = (item) => {
    RestTools.setStorageInput(item.name)
    Taro.navigateTo({
      url: `../../pages/result/index?question=${item.name}`
    })
  }
  render() {
    var itContent = [];
    return (
      <View className='quickquestion'>
        {this.props.data.map(item => {
          itContent[itContent.length] = item.content;
        })}
        <AtCard title={this.props.title} thumb={this.props.thumb}>
          {this.props.data.map(item => {
            return (
              <AtTag onClick={this.onClickTag.bind(this)} name={item.content}>
                {item.content}
              </AtTag>
            );
          })}
        </AtCard>
      </View>
    );
  }
}
