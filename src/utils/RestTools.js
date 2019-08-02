import Taro from "@tarojs/taro";

const qaUrl = "http://192.168.100.75/nb.qa.api"; //问答url地址
const serverUrl = "http://libqa.cnki.net/cdda.qa.api"; //服务器ur地址
// const serverUrl = "http://192.168.100.75/cdda.qa.api"; //服务器ur地址
const serverUrl_a = "http://ai.cnki.net/wx.qa.api"; //服务器ur地址
const storageUrl = "http://nnlib.cnki.net/nn.qa.getinfo/gxlib";
const sgServerUrl = "http://ai.cnki.net/wx.qa.api";
const weatherUrl = "https://free-api.heweather.com/s6/weather";
const collectUrl = "http://ai.cnki.net/dn.qa.kc/KeyWord";
const httpRequest = function (url, method, data = "", qa = false) {
  const newUrl = qa ? qaUrl : serverUrl; //判断用哪个地址去访问
  if (data === "") {
    return new Promise(function (resolve, reject) {
      Taro.request({
        url: newUrl + url,
        method: method,
        mode: "cors",
        header: {
          "content-type": "application/json",
          token: Taro.getStorageSync("token")
        }
      })
        .then(responseData => {
          // console.log('res:',url,responseData);  //网络请求成功返回的数据
          resolve(responseData.data);
        })
        .catch(err => {
          console.log("err:", url, err); //网络请求失败返回的数据
          reject(err);
        });
    });
  } else {
    return new Promise(function (resolve, reject) {
      Taro.request({
        url: newUrl + url,
        method: method,
        mode: "cors",
        data: data,
        header: {
          "content-type": "application/json",
          token: Taro.getStorageSync("token")
        }
      })
        .then(responseData => {
          // console.log('res:',url,responseData);  //网络请求成功返回的数据
          resolve(responseData.data);
        })
        .catch(err => {
          console.log("err:", url, err); //网络请求失败返回的数据
          reject(err);
        });
    });
  }
};

const httpRequest_a = function (url, method, data = "") {
  const newUrl = serverUrl_a;
  if (data === "") {
    return new Promise(function (resolve, reject) {
      Taro.request({
        url: newUrl + url,
        method: method,
        mode: "cors",
        header: {
          "content-type": "application/json",
          token: Taro.getStorageSync("token")
        }
      })
        .then(responseData => {
          // console.log('res:',url,responseData);  //网络请求成功返回的数据
          resolve(responseData.data);
        })
        .catch(err => {
          console.log("err:", url, err); //网络请求失败返回的数据
          reject(err);
        });
    });
  } else {
    return new Promise(function (resolve, reject) {
      Taro.request({
        url: newUrl + url,
        method: method,
        mode: "cors",
        data: data,
        header: {
          "content-type": "application/json",
          token: Taro.getStorageSync("token")
        }
      })
        .then(responseData => {
          // console.log('res:',url,responseData);  //网络请求成功返回的数据
          resolve(responseData.data);
        })
        .catch(err => {
          console.log("err:", url, err); //网络请求失败返回的数据
          reject(err);
        });
    });
  }
};

const httpRequest_b = function (
  url,
  method,
  data = "",
  sg = false,
  storage = false,
  weather = false,
  collect = false
) {
  const newUrl = sg
    ? sgServerUrl
    : storage
      ? storageUrl
      : weather
        ? weatherUrl
        : collect
          ? collectUrl
          : serverUrl;
  if (data === "") {
    return new Promise(function (resolve, reject) {
      Taro.request({
        // url: newUrl + url,
        url: (url === '/SetNewQ') ? "http://ai.cnki.net/dn.qa.api/SetNewQ?q=''" : (newUrl + url),
        method: method,
        mode: 'cors',
        header: {
          "content-type": "application/json",
        }
      })
        .then(responseData => {
          // console.log('res:',url,responseData);  //网络请求成功返回的数据
          resolve(responseData.data);
        })
        .catch(err => {
          console.log("err:", url, err); //网络请求失败返回的数据
          reject(err);
        });
    });
  } else {
    return new Promise(function (resolve, reject) {
      Taro.request({
        // url: newUrl + url,
        url: (url === '/SetNewQ') ? ("http://ai.cnki.net/dn.qa.api/SetNewQ?q=" + data.q) : (newUrl + url),
        method: method,
        data: data,
        mode: 'cors',
        header: {
          "content-type": "application/json",
        }
      })
        .then(responseData => {
          // console.log('res:',url,responseData);  //网络请求成功返回的数据
          resolve(responseData.data);
        })
        .catch(err => {
          console.log("err:", url, err); //网络请求失败返回的数据
          reject(err);
        });
    });
  }
};

const webViewUrl = {
  journal: "http://wap.cnki.net/touch/web/Journal/Article/",
  dissertation: "http://wap.cnki.net/touch/web/Dissertation/Article/",
  defaultUrl: "http://kns.cnki.net/KCMS/detail/detail.aspx"
};

const translteToRed = str => {
  return str
    .replace(/###/g, '<span style="color:#f00;">')
    .replace(/\$\$\$/g, "</span>")
    .replace(/<br>/g, "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/四名男子/g, "四明南词").replace(/陈鑫/g, "成鑫")
    .replace(/程欣/g, "成鑫").replace(/诚心/g, "成鑫")
    .replace(/高大里/g, "高大岭").replace(/高大领/g,"高大岭")
    .replace(/高大林/g,"高大岭").replace(/高大龄/g,"高大岭")
    .replace(/刘佐/g, "刘左").replace(/刘总/g,"刘左")
    .replace(/留左/g,"刘左")
    .replace(/刘丽/g, "牛力").replace(/牛莉/g, "牛力")
    .replace(/古建明/g, "卜鉴民").replace(/卜建民/g, "卜鉴民")
    .replace(/不见面/g, "卜鉴民").replace(/不见您/g, "卜鉴民")
    .replace(/不建民/g, "卜鉴民").replace(/不见名/g, "卜鉴民")
    .replace(/不贱民/g, "卜鉴民").replace(/贾建民/g, "卜鉴民")
    .replace(/吴建民/g, "卜鉴民").replace(/张彬/g, "张斌")
    .replace(/马冲/g, "马翀").replace(/马充/g, "马翀")
    .replace(/五猴子/g, "武侯祠").replace(/五侯祠/g, "武侯祠")
    .replace(/杨来清/g,"杨来青")
    .replace(/皱眉/g,"周梅").replace(/周没/g,"周梅");
};

const lineFeed = str => {
  return "<p>" + str.replace(/\n/g, "</p><p>") + "</p>";
};

const removeRed = str => {
  return str.replace(/###/g, "").replace(/\$\$\$/g, "");
};

const fixImgSrc = str => {
  return str
    .replace(/src="/g, 'src="http://refbook.img.cnki.net')
    .replace(/src='/g, "src='http://refbook.img.cnki.net");
};

const unifyFontColor = str => {
  return str
    .replace(/color="#(\w*)"/g, 'color="#a3a3a3"')
    .replace(/color='#(\w*)'/g, "color='#a3a3a3'");
};


const getInputTips = (value) => {
  return new Promise(function (reslove, reject) {
    fetch(
      `http://libqa.cnki.net/cdda.qa.sug/su.ashx?action=getsmarttips&p=0.9044369541594852&kw=${value}&td=1560427140234&tdsourcetag=s_pcqq_aiomsg`
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (myJson) {
        const tipsData = JSON.parse(myJson.replace(/var oJson = /g, '')).results;
        reslove(tipsData);
      })
      .catch(err => {
        console.log('err:', err); //网络请求失败返回的数据
        reject(err);
      });
  })
}

const addAtag = (url, str) => {
  return `<a href=${url} target="_blank">${str}</a>`;
};
const setStorageInput = (value) => {
  let inputRecords = JSON.parse(window.localStorage.getItem('nb_inputRecords')) || [];
  if (value && inputRecords.indexOf(value) < 0) {
    if (inputRecords.length < 10) {
      inputRecords.unshift(value);
    } else {
      inputRecords.pop();
      inputRecords.unshift(value);
    }
  } else {
    const index = inputRecords.indexOf(value);
    inputRecords.splice(index, 1);
    inputRecords.unshift(value);
  }
  window.localStorage.setItem('nb_inputRecords', JSON.stringify(inputRecords));
  return inputRecords;
}

const initMap = () => {
  let map = new window.BMap.Map("map");
  // 创建地图实例'
  let point = new window.BMap.Point("102.75937", "24.955301");
  // 创建点坐标
  map.centerAndZoom(point, 12);

  let marker = new window.BMap.Marker(point);
  map.addOverlay(marker);
};

const previewImg = (id, current) => {
  const imgList = [...document.getElementById(id).querySelectorAll("img")].map(
    item => item.currentSrc
  );
  if (window.wx.previewImage) {
    window.wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    });
  }
  return;
};

const getSignatureFromServer = url => {
  Taro.request({
    url: "http://qa2.cnki.net/QA-wx/getSignature",
    data: {
      url: url
    },
    method: "GET"
  })
    .then(res => {
      window.wxObject = res.data;
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.APP_ID, // 必填，公众号的唯一标识
        timestamp: res.data.TIMESTAMP, // 必填，生成签名的时间戳
        nonceStr: res.data.NONCE, // 必填，生成签名的随机串
        signature: res.data.SIGNATURE, // 必填，签名
        jsApiList: [
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "translateVoice"
        ] // 必填，需要使用的JS接口列表
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const sgRelatity = {
  蒋氏故里景区: "蒋氏故居",
  奉化吹灯: "奉化吹打",
  陈祥源: "四明南词",
  童全灿: "前童元宵行会",
  叶胜建: "唱新闻",
  韩素莲: "象山，渔民开洋，谢洋节",
  王桂凤: "余姚土布制作"
};

const sourceDb = {
  博士: "CDFD",
  硕士: "CMFD",
  期刊: "CJFD"
};

export default {
  httpRequest,
  httpRequest_a,
  httpRequest_b,
  translteToRed,
  addAtag,
  initMap,
  getSignatureFromServer,
  previewImg,
  setStorageInput,
  getInputTips,
  webViewUrl,
  lineFeed,
  removeRed,
  fixImgSrc,
  unifyFontColor,
  sgRelatity,
  sourceDb
};
