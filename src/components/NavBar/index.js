import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtNavBar } from "taro-ui";
import "./index.scss";

export default class Test extends Taro.Component {
  goback = () => {
    if(this.props.goIndex){
      Taro.navigateTo({url: '/pages/index/index'})
      return;
    }
    Taro.navigateBack();
  };

  onSearch = () => {
    Taro.navigateTo({
      url: "../../pages/search/index"
    });
  };

  handleClick = e => {
    if(e.target.className === 'at-nav-bar__title'){
      Taro.navigateBack()
    }
    return;
  };

  render() {
    return (
      <View className='header' onClick={this.handleClick}>
        <AtNavBar
          onClickRgIconSt={this.onSearch}
          onClickLeftIcon={this.goback}
          color='#fff'
          title={this.props.title}
          leftIconType={this.props.needBack ? "chevron-left" : ""}
          rightFirstIconType={this.props.needSearch ? "search" : ""}
        />
      </View>
    );
  }
}
