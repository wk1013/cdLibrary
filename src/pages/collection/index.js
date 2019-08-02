import Taro, { Component } from "@tarojs/taro";
import { View, Input, Icon, Form } from "@tarojs/components";
import { AtButton, AtToast } from "taro-ui";
import _ from "lodash";
import InputRecord from "../../components/InputRecord";
import InputTips from "../../components/InputTips";
import NavBar from "../../components/NavBar";
import "./index.scss";
import RestTools from "../../utils/RestTools";
import QuestionCard from "../../components/QuestionCard";
import MockData from "../../mock/mockData.json";
import voiceRecording from "../../static/img/voice-recording.gif";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
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
    navigationBarTitleText: "馆藏查询"
  };

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
    const show = !value ? false : true;
    this.setState({
      showRecord: true,
      showClear: show
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
          RestTools.setStorageInput(item)
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

  render() {
    const { showClear, showRecord, tipsData, value, showVoice, isOpened, showIcon } = this.state;
    const recordsData = JSON.parse(window.localStorage.getItem("nb_inputRecords")) || [];
    return (
      <View className='collection'>
        <View className='banner'>
          <NavBar title='馆藏查询' needBack />
        </View>
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
          </View>
        </View>

        {/* 常见问题 */}
        <QuestionCard
          title='常见问题'
          data={MockData.hotGCQuestion}
        />

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
