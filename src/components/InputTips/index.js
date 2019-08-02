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

  componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data
		});
	}

  render() {
    const data = this.state.data;
    return data.length ? (
      <View className='tip-list'>
        {data.map((item, index) => (
          <View
            className='list-item'
            key={index}
          >
            <View
              className='content'
              onClick={this.props.onClickRecord.bind(this, item)}
              onMousedown={e => e.preventDefault()}
            >
              {item}
            </View>
          </View>
        ))}
      </View>
    ) : null;
  }
}
export default InputRecord;
