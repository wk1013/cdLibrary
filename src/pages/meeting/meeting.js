import Taro, { Component } from "@tarojs/taro";
import {View,} from "@tarojs/components";
import _ from "lodash";
import NavBar from "../../components/NavBar";
import "./meeting.scss";
import QuestionCard from "../../components/MeetingCard";
import MockData from "../../mock/mockData.json";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: "",
      tipsData: [],
      showClear: false,
      showVoice: false,
      showRecord: false,
      isOpened: false
    };
  }
  config = {
    navigationBarTitleText: "档案智能问答平台"
  };

  render() {
    return (
      <View className='meetings'>
        <View className='banner'>
          <NavBar title="档案智能问答平台" needBack />
        </View>
        <View className='logo_wrap'>
        </View>

        {/* 会议通知 */}
        <QuestionCard 
          title='会议通知'
          data={MockData.meetingInvite}
          name="meetingInvite"
        />

        {/* 会议议程 */}
        {/* <QuestionCard 
          title='会议议程'
          data={MockData.meetingAgenda}
          index="1"
        /> */}

        {/* 入围案例 */}
        {/* <QuestionCard
          title='入围案例'
          data={MockData.ideaMeeting}
          name="ideaMeeting"
        /> */}
      </View>
    );
  }
}
