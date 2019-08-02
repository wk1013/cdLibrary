import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'
import './app.scss'
import './icon.scss'
// import './custom-theme.scss'
// import RestTools from './utils/RestTools';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }



class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/collection/index',
      'pages/result/index',
      'pages/service/service',
      'pages/culture/index',
      'pages/culture/introduct',
      'pages/inculture/index',
      'pages/inculture/introduct',
      'pages/meeting/meeting',
      'pages/meeting/agenda',
      'pages/webPage/webpage',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    }
  }
  componentWillMount() {}
  componentDidMount () {
   
  }

  componentDidShow () {
    
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
