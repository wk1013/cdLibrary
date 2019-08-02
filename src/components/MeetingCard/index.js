import Taro from "@tarojs/taro";
import { View, Image   } from "@tarojs/components";
import { AtCard } from "taro-ui";
import RestTools from '../../utils/RestTools';
import "./index.scss";

export default class QuestionCard extends Taro.Component {
  onClickTag = (item) => {
    if(this.props.index == '1'){
      Taro.navigateTo({url:'./agenda'})
      return;
    } 
    Taro.navigateTo({
      url: "../../pages/webPage/webpage?fileUrl=" + this.props.name+'&title='+this.props.title
    })
  }

  handleClick = e => {
    if (e.target.tagName === 'IMG') {
      const currentSrc = e.target.currentSrc;
      RestTools.previewImg('exhibitionDetail', currentSrc);
    }
    return;
  };

  render() {
    var itContent = [];
    return (
      <View className='meetingcard'>
        {this.props.data.map(item => {
          itContent[itContent.length] = item.content;
        })}
        <AtCard title={this.props.title} id='exhibitionDetail' onClick={this.handleClick}>
          {this.props.data.map(item => {
            return (
              <Image
                style='width: 100%;height: auto;background: #fff;'
                src={item.url_a}  
              />
            );
          })}
          <View className='linkMore' onClick={this.onClickTag.bind(this)} > 查看>></View>
        </AtCard>
      </View>
    );
  }
}
