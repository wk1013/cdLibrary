import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavBar from "../../components/NavBar";
import CardList from "../../components/CardList";
import MockData from "../../mock/mockData.json";
import "./index.scss";

export default class Culture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '文化之旅'
        };
    }

    render() {
        return (
            <View className="contain">
                <View className='banner'>
                    <NavBar title={this.state.title} needBack />
                </View>
                <View className="body">
                    <View className='title'>著名景点</View>
                    <CardList data={MockData.culture}/>
                </View>
            </View>
        )
    }
}