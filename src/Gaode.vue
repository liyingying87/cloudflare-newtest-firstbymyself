<template>
  <div class="amap-page-container">
    <!-- 搜尋框 -->
    <el-amap-search-box class="search-box"
                        :search-option="searchOption"
                        :on-search-result="onSearchResult">
    </el-amap-search-box>
    <el-amap
        ref="map"
        vid="amapDemo"
        :center="center"
        :map-manager="amapManager"
        :zoom="zoom"
        :plugin="plugin"
        :events="events"
        class="amap-demo">
      <!-- 在地圖上標記點 -->
      <el-amap-marker
          v-for="(marker,index) in markers"
          :key="index"
          :position="marker" >
      </el-amap-marker>
      <!-- 座標點 -->
      <el-amap-marker vid="amapDemo" :position="center"></el-amap-marker>
      <el-amap-info-window
          :position="currentWindow.position"
          :content="currentWindow.content"
          :visible="currentWindow.visible"
          :events="currentWindow.events">
      </el-amap-info-window>
      <!-- 放置圖片 -->
      <el-amap-ground-image v-for="(groundimage,index) in groundimages"
                            :url="groundimage.url"
                            :key="index"
                            :bounds="groundimage.bounds"
                            :events="groundimage.events">
      </el-amap-ground-image>
      <!-- 文字 -->
      <el-amap-text v-for="(text,index) in texts"
                    :text="text.text"
                    :key="index"
                    :offset="text.offset"
                    :position="text.position"
                    :events="text.events">
      </el-amap-text>
      <el-amap-text v-for="(text,index) in texts2"
                    :text="text.text"
                    :key="index"
                    :offset="text.offset"
                    :position="text.position"
                    :events="text.events">
      </el-amap-text>
      <el-amap-text v-for="(text,index) in texts3"
                    :text="text.text"
                    :key="index"
                    :offset="text.offset"
                    :position="text.position"
                    :events="text.events">
      </el-amap-text>
    </el-amap>
    <!-- 點選地圖的按鈕 -->
    <div class="toolbar">
      <button @click="getMap()">獲取地圖資訊</button>
      <button @click="switchWindow(0)">展示第一個位置</button>
      <button @click="switchWindow(1)">展示第二個位置</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)

let amapManager = new VueAMap.AMapManager()
export default {
  name: 'Gaode',
  created () {
    VueAMap.initAMapApiLoader({
      key: '70d0e910c9b68f064145ea2c2fad7c13',
      plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation',
        'AMapUI.loadUI', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.PolyEditor', 'AMap.CircleEditor'],
      uiVersion: '1.0.11' // 版本號
    })
  },
  mounted () {
    this.currentWindow = this.windows[1]// 初始化視窗資訊
  },
  data: function () {
    let me = this
    me.city = me.city || '上海'
    return {
      zoom: 12,
      center: [121.59996, 31.197646], // 中心位置
      makerConf: {
        position: [121.59996, 31.197646],
        content: ''
      },
      amapManager,
      events: {
        init: (o) => {
          // 將當前位置標記為A
          AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
            const marker = new SimpleMarker({
              iconLabel: 'A',
              iconStyle: 'red',
              map: o,
              position: o.getCenter()
            })
          })
          console.log('當前位置的座標', o.getCenter())
          console.log('方法', this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          console.log(e)
          this.center = [e.lnglat.lng, e.lnglat.lat]// 點選選擇新地址為中心點
          const msg = {
            key: '3df604a614d7f0e325f79bb25cdee15c',
            location: this.center.join()
          }
          // 獲取當前地址
          console.log(this, 'this')
          this.$$.ajax({
            url: 'https://restapi.amap.com/v3/geocode/regeo',
            data: msg,
            success: data => {
              console.log(data)
              let d = data.regeocode
              if (d) {
                this.address = d.formatted_address// 點選選擇新地址並獲取地址的名稱
              }
            }
          })
        }
      },
      markers: [
        [121.49996, 31.297646],
        [121.40018, 31.197622],
        [121.49991, 31.207649]
      ],
      searchOption: {
        city: '上海',
        citylimit: true
      },
      mapCenter: [121.40996, 31.197646],
      // ToolBar工具條外掛、MapType外掛、Scale比例尺外掛、OverView鷹眼外掛
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
            console.log(o)
          }
        }
      }, {
        pName: 'Scale',
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      }, {
        pName: 'OverView',
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      }],
      windows: [ // 視窗資訊框
        {
          position: [121.69996, 31.237646],
          content: `<img style="width:50px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543494665847&di=152e6f241b64580684a1c048ec9acd7e&imgtype=0&src=http%3A%2F%2Fp0.so.qhmsg.com%2Ft017668631465b251d5.gif"><p style="color:red">Hi！  馬優晨，我在這裡呢 ！</p>`,
          visible: true,
          events: {
            close () {
              console.log('關閉視窗一！')
            }
          }
        }, {
          position: [121.5875285, 31.21515044],
          content: '<img style="width:50px;" src="https://b305.photo.store.qq.com/psb?/V12aHQSq1CQ6SF/jfM4Tyeelt4v09alIPSOBkDqUCRgwqCHQKMs5iV4x3A!/b/dDEBAAAAAAAA&bo=wAMABQAAAAARB*Y!&rf=viewer_4"><p style="color:red">我在國際博覽中心！</p>',
          visible: true,
          events: {
            close () {
              console.log('關閉視窗二！')
            }
          }
        }
      ],
      // 放置圖片
      groundimages: [
        {
          url: 'https://imedl.sogoucdn.com/cache/skins/uploadImage/2018/11/12/15420362056827_former.gif',
          bounds: [[121.5273285, 31.21515044], [122.9273285, 32.31515044]],
          events: {
            click () {
              alert('click groundimage')
            }
          }
        }
      ],
      // 放置文字
      texts: [
        {
          position: [121.5273285, 31.27515044],
          text: `<img style="width:50px;" src="http://imgsa.baidu.com/exp/w=500/sign=ce843cf58282b9013dadc333438ca97e/10dfa9ec8a13632763a8d5e1998fa0ec09fac79e.jpg"><p>探索寶藏的第一個線索！</p>`,
          offset: [0, 0],
          events: {
            click: () => {
              alert('click text')
            }
          }
        }
      ],
      // 放置文字
      texts2: [
        {
          position: [121.6873285, 31.19515044],
          text: '<img style="width:50px;" src="http://cdn.duitang.com/uploads/item/201501/10/20150110172950_aenAB.thumb.700_0.gif"><p>探索寶藏的第二個線索！</p>',
          offset: [0, 0],
          events: {
            click: () => {
              alert('click text')
            }
          }
        }
      ],
      // 放置文字
      texts3: [
        {
          position: [121.6873285, 31.29515044],
          text: '<img style="width:50px;" src="http://b-ssl.duitang.com/uploads/item/201710/05/20171005143631_5yZeJ.gif"><p>探索寶藏的第三個線索！</p>',
          offset: [0, 0],
          events: {
            click: () => {
              alert('click text')
            }
          }
        }
      ],
      slotWindow: {
        position: [121.5163285, 31.21515044]
      },
      // 當前視窗
      currentWindow: {
        position: [0, 0],
        content: '',
        events: {},
        visible: false
      },
      // 個人定義的地址
      address: ''
    }
  },
  methods: {
    getMap () {
      console.log(amapManager._componentMap)
      console.log(amapManager._map)
    },
    // 切換資訊視窗
    switchWindow (tab) {
      this.currentWindow.visible = false
      this.$nextTick(() => {
        this.currentWindow = this.windows[tab]
        this.currentWindow.visible = true
      })
    },
    // 在地圖上新增標記的點
    addMarker: function () {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
      this.markers.push([lng, lat])
    },
    // 搜尋框輸入
    onSearchResult (pois) {
      console.log(pois, '123456789')
      let me = this
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        var poi = pois[0]
        let lng = poi['lng']
        let lat = poi['lat']
        me.center = [lng, lat]
        me.makerConf.position = [lng, lat]
        me.list = pois
        pois.forEach(poi => {
          let {lng, lat} = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>

<style scoped>
.amap-demo {
  height: 1200px;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 70px;
}
.amap-page-container {
  position: relative;
}
.toolbar button {
  background: #42b983;
  border: 0;
  color: white;
  padding: 8px;
  margin: 0 5px;
  border-radius: 3px;
  cursor: pointer;
  margin-top:10px;
}
</style>
