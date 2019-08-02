import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import RestTools from "../../utils/RestTools";

export default class liter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            name: "相关知识",
            ListItem: '',
            url: 'http://wap.cnki.net/touch/web/Journal/Article/'
        };
    }

    componentDidMount() {
        RestTools.httpRequest_a('/GetSGData', 'GET', { q: RestTools.sgRelatity[this.state.data] || this.state.data }).then(res => {
            const list = res.MetaList
            for(var i=0;i<list.length;i++){        
                for(var j=i+1;j<list.length;j++){
                    if(list[i].Data.source_id==list[j].Data.source_id){
                        list.splice(j,1);
                        j--;
                    }
                }
            }
            this.setState({
                ListItem: list
            })
        }).catch(err => {
            console.log(err);
        })
    }

    onClick(id) {
        window.location.href = this.state.url + id
    }

    render() {
        const data = this.state.ListItem
        const recordList = data.length ? data.slice(0,10).map(item =>
            <View className="in-text_a" onClick={this.onClick.bind(this, item.Data.source_id)}>
                <Text className="text-title">{item.Data.title}</Text>
                <View className="text-form">
                    <Text>{item.Data.source_type}</Text>
                </View>
            </View>
        ) : ''
        return (
            <View className="in-body">
                <View className="in-title">{this.state.name}：</View>
                {recordList}
            </View>
        )
    }
}