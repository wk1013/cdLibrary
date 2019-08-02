import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavBar from "../../components/NavBar";
import agenda_01 from "../../static/img/agenda_01.png";
import agenda_02 from "../../static/img/agenda_02.png";
import agenda_03 from "../../static/img/agenda_03.png";
import agenda_04 from "../../static/img/agenda_04.png";
import agenda_05 from "../../static/img/agenda_05.png";
import agenda_06 from "../../static/img/agenda_06.png";
import agenda_07 from "../../static/img/agenda_07.png";
import agenda_08 from "../../static/img/agenda_08.png";
import RestTools from '../../utils/RestTools';
import "../webPage/webpage.scss";

export default class agenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '会议议程'
        };
    }

    handleClick = e => {
        if (e.target.tagName === 'IMG') {
            const currentSrc = e.target.currentSrc;
            RestTools.previewImg('exhibitionDetail', currentSrc);
        }
        return;
    };

    render() {
        return (
            <View className="meetings">
                <View className='banner_a'>
                    <NavBar title={this.state.title} needBack />
                </View>
                <View className="body" style="padding:10px;margin-top:10px;" id='exhibitionDetail' onClick={this.handleClick}>
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_01}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_02}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_03}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_04}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_05}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_06}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_07}
                    />
                    <Image
                        style='width: 100%;height: auto;background: #fff;'
                        src={agenda_08}
                    />
                </View>
            </View>
        )
    }
}