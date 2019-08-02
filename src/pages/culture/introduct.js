import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavBar from "../../components/NavBar";
import MockData from "../../mock/mockData.json";
import Text from "../../components/Text";
import Relativity from "../../components/Relativity";
import Text_a from "../../components/knowledge";
import "./index.scss";

export default class Introduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.$router.params.q,
            address:'地址',
            introduction:"景点介绍",
        };
    }

    goSearch(item){
        Taro.navigateTo({url:'/pages/result/index?question='+item})
    }

    render(){
        const data = MockData.culture[this.state.data]
        return(
            <View className="contain">
                <View className='banner_a' style={{background:'url('+ data.url +')'}}>
                    <NavBar title={data.name} needBack />
                </View>
                <View className="body">
                    <Text data={data.address} title={this.state.address} />
                    <Text data={data.introduction} title={this.state.introduction} />
                    <Relativity
                        keyword={data.name}
                        onSearch={this.goSearch.bind(this)}
                        duplicate={data.name}
                    />
                    <Text_a data={data.name} />
                </View>
            </View>
        )
    }
}