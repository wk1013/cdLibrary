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
            name:'名称',
            time:"命名时间",
            category:'类别',
            region:'申报地区',
            level:'名录级别',
            introduction:"简介"
        };
    }
    goSearch(item){
        Taro.navigateTo({url:'/pages/result/index?question='+item})
    }

    render(){
        const data = MockData.inculture[this.state.data]
        return(
            <View className="contain">
                <View className='banner_a' style={{background:'url('+ data.url +')'}}>
                    <NavBar title={data.name} needBack />
                </View>
                <View className="body">
                    <Text data={data.name} title={this.state.name} />
                    <Text data={data.time} title={this.state.time} />
                    <Text data={data.category} title={this.state.category} />
                    <Text data={data.region} title={this.state.region} />
                    <Text data={data.level} title={this.state.level} />
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