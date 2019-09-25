<template>
    <div style="display:  flex;justify-content: center;align-items: center;width: 100%;height: 100%">
        <div style="width: 120px;height: 36px;background: lightseagreen" id="trigger">播放</div>
        <audio  ref="audio" id="music"  controls autoplay="autoplay"   @canplay="ready" @error="error" @ended="end" hidden="true">&nbsp;</audio>
    </div>
</template>

<script>
    export default {
        name: "PlayTest",
        data() {
            return {

                songReady: true, // 加载音频是否完成,完成以后才能播放
                isPlaying: false,  // 是否正在播放
                playPath: require('../../static/happy.mp3') //'https://small-strong.oss-cn-qingdao.aliyuncs.com/wedding/music/happy.mp3',
            }
        },

        methods:{

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

            playMusic(){

                let audioPlay = this.$refs.audio;
                audioPlay.src = this.playPath
                /*在这里建议使用原生来获取，使用jQuery会有点问题*/
                audioPlay.play();
                audioPlay.onended = function() {
                    audioPlay.play();
                }
            },

            Start(){

                let audioPlay = this.$refs.audio;
                audioPlay.src = this.playPath

                if (window.WeixinJSBridge) {
                    window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
                        this.$refs.audio.load()
                        setTimeout(() => {
                            this.$refs.audio.play()
                        }, 300)
                    })
                } else {
                    document.addEventListener('WeixinJSBridgeReady', () => {
                        window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
                            this.$refs.audio.load()

                            setTimeout(() => {

                                this.$refs.audio.play()

                            }, 300)
                        })
                    }, false)
                }
            },

            createTouchstartEventAndDispatch (el) {
                let event = document.createEvent('Events')
                event.initEvent('touchstart', true, true)
                el.dispatchEvent(event)
            }
        },

        mounted(){

            // // this.playMusic()
            //
            // let  trigger = document.getElementById('trigger')
            //
            // trigger.addEventListener('touchstart',() =>{
            //
            //     this.playMusic()
            // })
            //
            // //模拟触发  touchstart 事件
            // this.createTouchstartEventAndDispatch(trigger)

            this.Start()
        }

    }
</script>

<style scoped>

</style>