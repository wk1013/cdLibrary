import Taro, { Component } from "@tarojs/taro";
import { View, RichText } from "@tarojs/components";

export default class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            name:this.props.title
        };
    }

    render() {
        const data = this.state.data
        return (
            <View className="in-body">
                <View className="in-title">{this.state.name}：</View>
                <RichText className="in-text" nodes={data} />
            </View>
        )
    }
}