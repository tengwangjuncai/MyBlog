<template>
    <div class="home">
      <swiper ref="mySwiper" class="swiper" :options="swiperOption"  @slideChange="slideChange">
           <swiper-slide>
               <Page1 :isCurrentPage="currentIndex == 0" :isShowPresent="isShowPresent" @showChange="showChange"></Page1>
           </swiper-slide>
          <swiper-slide>
              <Page2 :isCurrentPage="currentIndex == 1" :isShowPresent="isShowPresent" @showChange="showChange"></Page2>
          </swiper-slide>
          <swiper-slide>
              <Page3 :isCurrentPage="currentIndex == 2" :isShowPresent="isShowPresent" @showChange="showChange"></Page3>
          </swiper-slide>
          <swiper-slide>
              <Page4 :isCurrentPage="currentIndex == 3" :isShowPresent="isShowPresent" @showChange="showChange"></Page4>
          </swiper-slide>
          <swiper-slide>
              <Page5 :isCurrentPage="currentIndex == 4" :isShowPresent="isShowPresent" @showChange="showChange"></Page5>
          </swiper-slide>
          <swiper-slide>
              <Page6 :isCurrentPage="currentIndex == 5" :isShowPresent="isShowPresent" @showChange="showChange"></Page6>
          </swiper-slide>
      </swiper>
        <audio ref="audio" id="music" @canplay="ready" @error="error" @ended="end">&nbsp;</audio>
    </div>
</template>

<script>
    import Page1 from './Page_1'
    import Page2 from './Page_2'
    import Page3 from './Page_3'
    import Page4 from './Page_4'
    import Page5 from './Page_5'
    import Page6 from './Page_6'

    export default {
        name: "HomePage",
        components:{
            Page1,
            Page2,
            Page3,
            Page4,
            Page5,
            Page6
        },
        data() {
            return {
                swiperOption:{},
                currentIndex:0,
                isShowPresent:false,
                isShow:false,

                songReady: true, // 加载音频是否完成,完成以后才能播放
                isPlaying: false,  // 是否正在播放
                playPath: require('../../../static/happy.mp3') //'https://small-strong.oss-cn-qingdao.aliyuncs.com/wedding/music/happy.mp3',
            }
        },

        methods:{

            Start(){

                let audioPlay = this.$refs.audio;
                audioPlay.src = this.playPath

                if (window.WeixinJSBridge) {
                    window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
                        // this.$refs.audio.load()
                        setTimeout(() => {
                            audioPlay.play()
                            audioPlay.onended = function() {
                                audioPlay.play();
                            }
                        }, 300)
                    })
                } else {
                    document.addEventListener('WeixinJSBridgeReady', () => {
                        window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
                            // this.$refs.audio.load()

                            setTimeout(() => {

                                audioPlay.play()

                            }, 300)
                        })
                    }, false)
                }
            },

            ready(){
                this.songReady = true
                var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                if(iOS){
                    let audio = document.getElementById('music')//this.$refs.audio
                    this.isPlaying = true
                    console.log('========' + '准备开始播了')
                    audio.play()
                }
            },
            play(){

                let audio = document.getElementById('music')//this.$refs.audio

                var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

                if (iOS){
                    this.songReady = true
                    setTimeout(()=>{
                        audio.play()
                        // audio.pause()
                    },1000)
                }

                audio.play()
                if(!this.songReady){
                    this.$message('音频初始化失败');
                    return
                }

                this.isPlaying = true
                setTimeout(()=>{
                    audio.play()
                },1000)
            },
            error(){
                this.songReady = false
            },
            end(){
                this.isPlaying = false
            },

            showChange(value){

               this.isShow = value
            },

            slideChange(){

                this.currentIndex = this.$refs.mySwiper.swiper.activeIndex
                if (this.isShow){
                    this.isShowPresent = true
                }else {
                    this.isShowPresent = false
                }
            }
        },

        mounted(){
            document.title = '维维生日快乐'
            this.Start()
        }

    }
</script>

<style lang="scss" scoped>

    .home {
        width: 100%;
        height: 100%;
        .swiper {
            width: 100%;
            height: 100%;
        }
    }
</style>