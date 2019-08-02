import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtActivityIndicator } from "taro-ui";
import "./index.styl";
import RestTools from "../../utils/RestTools";

class Relativity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      duplicate: props.duplicate
    };
  }

  componentWillMount() {
    const keyword = RestTools.translteToRed(this.props.keyword);
    keyword &&
      Taro.request({
        url: "http://libqa.cnki.net/cdda.qa.r/api/GetKB",
        method: "GET",
        data: {
          content: keyword
        }
      })
        .then(res => {
          if (res.statusCode === 200) {
            const relaQuestions = res.data.filter(
              item => item.Content != this.state.duplicate
            );
            this.setState({
              data: relaQuestions,
              loading: false
            });
          }
        })
        .catch(res => {
          console.log(res);
          this.setState({
            loading: false
          });
        });
  }

  handleClick = item => {
    this.props.onSearch(item.Content);
    RestTools.setStorageInput(item.Content);
  };

  render() {
    const { data, loading } = this.state;
    return (
      <View className='relativity'>
        {loading ? (
          <AtActivityIndicator mode='center' />
        ) : data.length ? (
          <AtList hasBorder={false}>
            <View
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                paddingBottom: "20px",
                color: "rgb(2, 143, 212)"
              }}
            >
              相关问题:
            </View>
            {data.map(item => {
              return (
                <AtListItem
                  hasBorder={false}
                  key={item.QID}
                  title={item.Content}
                  arrow='right'
                  onClick={this.handleClick.bind(this, item)}
                  iconInfo={{ value: "tag", color: "#6190E8" }}
                />
              );
            })}
          </AtList>
        ) : null}
      </View>
    );
  }
}

export default Relativity;
