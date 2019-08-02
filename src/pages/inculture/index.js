import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavBar from "../../components/NavBar";
import CardList from "../../components/CardList";
import MockData from "../../mock/mockData.json";
import "./index.scss";

export default class Inculture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '非遗研学'
        };
    }

    render() {
        const data_a = MockData.inculture.slice(0,6)
        const data_b = MockData.inculture.slice(6)
        return (
            <View className="contain">
                <View className='banner'>
                    <NavBar title={this.state.title} needBack />
                </View>
                <View className="body">
                    <View className='title'>非遗项目</View>
                    <CardList data={data_a}/>
                    <View className='title'>非遗传承人</View>
                    <CardList data={data_b}/>
                </View>
            </View>
        )
    }
}