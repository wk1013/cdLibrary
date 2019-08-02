import Taro, { Component } from "@tarojs/taro";
import { View, Video, Input, Icon, Form } from "@tarojs/components";
import { AtCard, AtGrid, AtButton, AtToast } from "taro-ui";
import _ from "lodash";
import InputRecord from "../../components/InputRecord";
import InputTips from "../../components/InputTips";
import MapView from "../../components/NBMapView";
import "./index.scss";
import RestTools from "../../utils/RestTools";

import gccx from "../../static/img/gccx.png";
import fwzx from "../../static/img/fwzx.png";
import whzl from "../../static/img/whzl.png";
import fyyx from "../../static/img/fyyx.png";
import zsjs from "../../static/img/zsjs.png";
import altg from "../../static/img/altg.png";

import QuickQuestionCard from "../../components/QuickQuestionCard";
import Footer from "../../components/Footer";
import MockData from "../../mock/mockData.json";
import voiceRecording from "../../static/img/voice-recording.gif";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      trailerList: [],
      exhibitingList: [],
      value: "",
      tipsData: [],
      showClear: false,
      showVoice: false,
      showRecord: false,
      isOpened: false,
      showIcon: false
    };
  }
  config = {
    navigationBarTitleText: "档案智能问答平台"
  };

  componentWillMount() { }

  componentDidMount() {
    let that = this;
    const loactionUrl = window.location.href;
    RestTools.getSignatureFromServer(loactionUrl);
    window.wx.ready(function () {
      window.wx.checkJsApi({
        jsApiList: [
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "translateVoice"
        ],
        success: function () {
          that.setState({
            showVoice: true,
            showIcon: true
          });
        }
      });
    });
  }

  handleTouchStart = e => {
    e.preventDefault();
    this.setState({
      isOpened: true
    });
    window.wx.startRecord();
  };

  handleRecord = () => {
    let that = this;
    window.wx.stopRecord({
      success: function (response) {
        let localId = response.localId;
        window.wx.translateVoice({
          localId: localId,
          // isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            if (!res.translateResult) {
              // window.wx.stopRecord()
              Taro.showToast({ title: "说话声音太短", icon: "none" });
            }
            let result = res.translateResult;
            //去掉最后一个句号
            result = result.substring(0, result.length - 1);
            result = RestTools.translteToRed(result)
            that.setState(
              {
                value: result
              },
              () => {
                that.goSearch();
              }
            );
          },
          fail: function () {
            window.wx.stopRecord();
            Taro.showToast({ title: "哎呀没听清楚~,请再说一次", icon: "none" });
          }
        });
      },
      fail: function () {
        window.wx.stopRecord();
        Taro.showToast({ title: "哎呀没听清楚~,请刷新页面再试", icon: "none" });
      }
    });
  };

  handleTouchCancel = e => {
    e.preventDefault();
    this.setState({
      isOpened: false
    });
    this.handleRecord();
  };

  handleTouchEnd = e => {
    e.preventDefault();
    this.setState({
      isOpened: false
    });
    this.handleRecord();
  };
  handleGridClick = item => {
    if (item.outer) {
      window.open(item.url);
      return;
    }
    Taro.navigateTo({
      url: item.url
    });
  };

  handleInput = e => {
    this.setState(
      {
        showClear: e.target.value,
        value: e.target.value,
        showRecord: !e.target.value
      },
      () => {
        RestTools.getInputTips(e.target.value).then(res => {
          this.setState({
            tipsData: res.map(item => item.value)
          });
        });
      }
    );
  };

  handleClear = () => {
    this.setState({
      value: "",
      showClear: false
    });
  };

  handleFocus = e => {
    e.preventDefault();
    const value = this.state.value;
    this.setState({
      showRecord: true,
      showClear: false
    });
  };

  handleBlur = e => {
    e.preventDefault();
    this.setState({
      showRecord: false,
      tipsData: []
    });
  };

  handleClickRecord = item => {
    this.setState(
      {
        value: item,
        showRecord: false,
        tipsData: []
      },
      () => {
        this.goSearch();
      }
    );
  };

  switchVoice = e => {
    e.stopPropagation();
    const showVoice = this.state.showVoice;
    this.setState({
      showVoice: !showVoice
    });
  };

  goSearch = e => {
    if (e) e.preventDefault();
    const { value } = this.state;
    this.setState(
      {
        showRecord: false
      },
      () => {
        if (value.trim()) {
          RestTools.setStorageInput(value);
          Taro.navigateTo({
            url: `../../pages/result/index?question=${encodeURIComponent(
              value
            )}`
          });
        } else {
          Taro.showToast({
            title: "请先输入问题哟~",
            icon: "none"
          });
        }
      }
    );
  };

  goMeeting = e => {
    Taro.navigateTo({
      url: `../../pages/meeting/meeting`
    });
  };

  render() {
    const imgdata = [
      {
        value: "", // "馆藏查询",
        image: gccx,
        url: "../collection/index"
      },
      {
        value: "", // "服务咨询",
        image: fwzx,
        url: "../service/service"
      },
      {
        value: "", // "文化之旅",
        image: whzl,
        url: "../culture/index"
      },
      {
        value: "", // "非遗研学",
        image: fyyx,
        url: "../inculture/index"
      },
      {
        outer: true, //外链
        value: "", // "知识竞赛",
        image: zsjs,
        url: "http://qa2.cnki.net/nbLibrary/zsjs/zsjs.html"
      },
      {
        outer: true, //外链
        value: "", // "案例推广",
        image: altg,
        url: "http://innovation.cnki.net/activity/gtcxhd/weixin/hj/index.html"
      }
    ];
    const {
      trailerList,
      exhibitingList,
      showClear,
      value,
      showRecord,
      showVoice,
      isOpened,
      tipsData,
      showIcon
    } = this.state;
    let mapData; //地图相关数据

    const data = trailerList.concat(exhibitingList);
    const recordsData =
      JSON.parse(window.localStorage.getItem("nb_inputRecords")) || [];
    return (
      <View className='index'>
        <View className='logo_wrap'>
          <View className='search'>
            <Form onSubmit={this.goSearch}>
              {showIcon ? (
                <Icon
                  className='iconfont icon-left icon-huatong'
                  onClick={this.switchVoice.bind(this)}
                />) : null}
              <Input
                className='search_input'
                placeholder='输入问题'
                value={value}
                onChange={this.handleInput.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
              />
              {showClear ? (
                <View
                  className='icon-right iconfont at-icon at-icon-close-circle'
                  onClick={this.handleClear.bind(this)}
                />
              ) : (
                  <Icon
                    className='iconfont icon-right icon-sousuo'
                    onClick={this.goSearch.bind(this)}
                  />
                )}

              {showRecord ? (
                <View className='extra-wrap'>
                  <InputRecord
                    data={recordsData}
                    onClickRecord={this.handleClickRecord}
                  />
                </View>
              ) : null}
              {tipsData.length ? (
                <View className='extra-wrap'>
                  <InputTips
                    data={tipsData}
                    onClickRecord={this.handleClickRecord}
                  />
                </View>
              ) : null}
            </Form>

            {/* 快速咨询 */}
            <View className='others'>
              <AtGrid
                columnNum={6}
                data={imgdata}
                onClick={this.handleGridClick}
              />
            </View>
          </View>
        </View>

        {/* 四川档案会议 */}
        <View className='meeting' onClick={this.goMeeting} />

        {/* 常见问题 */}
        <QuickQuestionCard title='常见问题' data={MockData.serviceConsult} />

        {/* 附近的图书馆 */}
        {/* <View className='nearLib'>
          <MapView mapData={{ keyword: "图书馆" }} />
        </View> */}

        {/* 视频展示 */}
        <View className='videos'>
          <AtCard title='视频展示'>
            <View className='at-row at-row--wrap at-row__justify--around'>
              <View className='video-item at-col '>
                <Video
                  src='http://ai.cnki.net/yn.qa.api/static/media/cnki.mp4'
                  poster='http://qa2.cnki.net/nbLibrary/images/feng1.png'
                  initialTime='0'
                  id='video'
                />
                <View>知网介绍</View>
              </View>
              <View className='video-item at-col '>
                <Video
                  src='http://ai.cnki.net/yn.qa.api/static/media/hd.mp4'
                  poster='http://qa2.cnki.net/nbLibrary/images/feng2.png'
                  initialTime='0'
                  id='video1'
                />
                <View className='videoTitle'>
                  《中国档案知识服务平台》产品视频介绍
                </View>
              </View>
            </View>
          </AtCard>
        </View>

        {showVoice && (
          <View
            className='voice'
            onTouchStart={this.handleTouchStart.bind(this)}
            onTouchCancel={this.handleTouchCancel.bind(this)}
            onTouchEnd={this.handleTouchEnd.bind(this)}
          >
            <AtButton type='primary'>
              <Icon className='iconfont icon-huatong huatong' /> 按住说话
            </AtButton>
          </View>
        )}
        <Footer />
        <AtToast
          isOpened={isOpened}
          duration={0}
          text='正在聆听...'
          image={voiceRecording}
        />
      </View>
    );
  }
}
