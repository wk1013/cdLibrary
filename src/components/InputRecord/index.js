import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

class InputRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }
  handleRemove = (index, e) => {
    e.preventDefault();
    let inputRecords = JSON.parse(window.localStorage.getItem("nb_inputRecords"));
    inputRecords.splice(index, 1);
    this.setState(
      {
        data: inputRecords
      },
      () => {
        window.localStorage.setItem(
          "nb_inputRecords",
          JSON.stringify(inputRecords)
        );
      }
    );
    return false;
  };
  render() {
    const data = this.state.data;
    return data.length ? (
      <View className='record-list'>
        {data.map((item, index) => (
          <View
            className='list-item'
            key={index}
          >
            <View className='content' onClick={this.props.onClickRecord.bind(this, item)} onMousedown={(e) => e.preventDefault()} >
              {item}
            </View>
            <View
              className='at-icon at-icon-close'
              onMousedown={this.handleRemove.bind(this, index)}
            />
          </View>
        ))}
      </View>
    ) : null;
  }
}
export default InputRecord;
