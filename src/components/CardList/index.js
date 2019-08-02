import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data
        };
    }

    onClick(item){
        Taro.navigateTo({url:`./introduct?q=${item.id}`})
    }

    render() {
        const ListItem = this.state.data
        const List = ListItem.map(item =>
            <View className='body-text' onClick={this.onClick.bind(this,item)}>
                <Image src={item.url} />
                <View className='body-title'>{item.name}</View>
            </View>
            )
        return (
            <View className='container'>
                {List}
            </View>
        )
    }
}