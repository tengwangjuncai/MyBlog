<template>
    <div class="content-wrapper" :style="bgImg">
        <img class='photo_bg_3' v-bind:class="{a_photo_bg_3: isCurrentPage}"
             src='@/assets/photo_bg/photo_bg_3.png'>

        <img class='flower_14' v-bind:class="{a_flower_14: isCurrentPage}"
             src='@/assets/flower/flower_14.png'>
        <img class='flower_8' v-bind:class="{a_flower_8: isCurrentPage}"
             src='@/assets/flower/flower_8.png'>
        <img class='flower_5' v-bind:class="{a_flower_5: isCurrentPage}"
             src='@/assets/flower/flower_5.png'>
        <img class='flower_6' v-bind:class="{a_flower_6: isCurrentPage}"
             src='@/assets/flower/flower_6.png'>

        <img class='leaf_25' v-bind:class="{a_leaf_25: isCurrentPage}"
             src='@/assets/leaf/leaf_25.png'>
        <img class='leaf_27' v-bind:class="{a_leaf_27: isCurrentPage}"
             src='@/assets/leaf/leaf_27.png'>

        <img class='photo_8' v-bind:class="{a_photo_8: isCurrentPage}"
             src='@/assets/weiwei/wei_10.jpeg'>

        <img class='word_13' v-bind:class="{a_word_13: isCurrentPage}"
             src='@/assets/word/wpy_16.png'>
        <img class='word_14' v-bind:class="{a_word_14: isCurrentPage}"
             src='@/assets/word/wpy_17.png'>

        <!--<img class="liwu" v-if="isShowPresent && !isShow" src="@/assets/liwu.png" v-bind:class="{a_liwu: isCurrentPage}" @click="showPresent">-->

        <div v-if="isShow" class="mask">
            <div  v-if="isShow" class="card">
                <img  class="bg" src='@/assets/present.png'/>
                <img  v-if="!isShowLabel" class="circle" src='@/assets/kai.png' @click="open"/>
                <div v-if="isShowLabel" style="font-size: 20px;text-align: center;margin-bottom: 30px;z-index: 100;color: #CB8C45;font-weight: 600">疯狂游乐场</div>
                <div v-if="isShowLabel" style="font-size: 14px;text-align: center;z-index: 100;color:#CB8C45;font-weight: 500">舍身陪玩你想玩的任何项目</div>
                <div v-if="isShowLabel" class="btn" @click="selectThePresent">{{btnTitle}}</div>
            </div>
        </div>

        <div style="display: flex;height: 3rem;position: absolute;bottom: 0;left: 0;right: 0;justify-content: center;align-items: center;z-index: 101">

            <div style="display: flex;width: 140px;height: 36px;border: 1px solid lightgrey;border-radius: 5px;" @click="goSelectPresent">
                <img style="width: 20px;height: 20px;margin: 8px 10px" src='@/assets/presentIcon.png'/>
                <span style="font-size: 14px;line-height: 36px;color: lightcoral">礼物六选一</span>
            </div>
        </div>
    </div>
</template>

<script>

    import {httpGet,httpPost} from '@/utils/app';
    import bgImage from '@/assets/photo_bg/bg.jpg';

    export default {
        name: 'Page_2',
        props: {
            isCurrentPage: {type: Boolean, default: false},
            isShowPresent: {type: Boolean, default: false}
        },
        data() {
            return {
                bgImg: {
                    backgroundImage: "url(" + bgImage + ")"
                },
                isShow:false,
                isShowLabel:false,
                btnTitle:sessionStorage.getItem('presentSelected')? '关闭':'就选这个了',
                present:'疯狂游乐场',
                presentDesc:'舍身陪玩你想玩的任何项目',
            }
        },
        watch:{
            isShowPresent(val){
                this.isShowPresent = val
                this.isShow = val

                let str = sessionStorage.getItem('presentSelected')
                if (str && str.length > 0){
                    this.btnTitle = '关闭'
                } else {
                    this.btnTitle = '就选这个了'
                }
            }
        },
        methods:{
            showPresent(){
                this.isShow = true
            },
            open(){
                this.isShowLabel = true
            },
            selectThePresent(){

                console.log('点进来了呀')
                let  str =  sessionStorage.getItem('presentSelected')

                if (str && str.length > 0){
                    this.isShow = false
                } else {
                    sessionStorage.setItem('presentSelected',this.present)
                    this.isShow = false
                }
                this.$emit('showChange',this.isShow)
            },

            goSelectPresent(){
              this.isShow =   true
                this.$emit('showChange',this.isShow)
            },
        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">

    .content-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .photo_bg_3 {
            position: absolute;
            object-fit: contain;
            height: 4.46rem;
            width: 5.69rem;
            left: 0.86rem;
            top: 7.11rem;
            z-index: 2;
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeIn;
        }
        .a_photo_bg_3 {
        }

        .leaf_25 {
            position: absolute;
            object-fit: contain;
            height: 3.28rem;
            width: 2.91rem;
            left: 4.52rem;
            top: -0.99rem;
            z-index: 2;
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeInDown, 5000ms ease-in-out 2500ms infinite normal forwards running animate_leftTop;
        }
        .a_photo_bg_3 {
        }

        .flower_14 {
            position: absolute;
            object-fit: contain;
            height: 0.61rem;
            width: 0.59rem;
            left: 6.17rem;
            top: 0.54rem;
            z-index: 4;
        }
        .a_photo_bg_3 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .flower_8 {
            position: absolute;
            object-fit: contain;
            height: 0.85rem;
            width: 0.91rem;
            left: 6.04rem;
            top: 6.69rem;
            z-index: 4;
        }
        .a_flower_8 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running zoomIn;
        }

        .flower_5 {
            position: absolute;
            object-fit: contain;
            height: 5.41rem;
            width: 4.53rem;
            left: 0rem;
            top: 8.43rem;
            z-index: 1;
        }
        .a_flower_5 {
            animation: 500ms ease-in-out 200ms 1 normal both running fadeIn;
        }

        .flower_6 {
            position: absolute;
            object-fit: contain;
            height: 5.46rem;
            width: 4.73rem;
            left: 2.7rem;
            top: -2.08rem;
            z-index: 1;
        }
        .a_flower_6 {
            animation: 500ms ease-in-out 200ms 1 normal both running fadeIn;
        }

        .leaf_27 {
            position: absolute;
            object-fit: contain;
            height: 1.29rem;
            width: 0.99rem;
            left: 5.37rem;
            top: -0.38rem;
            z-index: 3;
        }
        .a_leaf_27 {
            animation: 2000ms ease-in-out 500ms 1 normal both running fadeInDown, 5000ms ease-in-out 2500ms infinite normal forwards running animate_leftTop;
        }

        .photo_8 {
            position: absolute;
            object-fit: contain;
            height: 4.26rem;
            width: 5.38rem;
            left: 1.08rem;
            top: 7.2rem;
            z-index: 3;
        }
        .a_photo_8 {
            animation: 2000ms ease-in-out 1000ms 1 normal both running fadeIn;
        }

        .word_13 {
            position: absolute;
            object-fit: contain;
            height: 0.49rem;
            width: 3.66rem;
            left: 1.92rem;
            top: 1.17rem;
            z-index: 4;
        }
        .a_word_13 {
            animation: 2000ms ease-in-out 1500ms 1 normal both running fadeInDown;
        }

        .word_14 {
            position: absolute;
            object-fit: contain;
            height: 5.3rem;
            width: 6.48rem;
            left: 0.6rem;
            top: 1.88rem;
            z-index: 4;
        }
        .a_word_14 {
            animation: 2000ms ease-in-out 2000ms 1 normal both running fadeIn;
        }

        .liwu {
            position: absolute;
            object-fit: contain;
            height: 2rem;
            width: 2rem;
            left: 2.8rem;
            top: calc(100vh - 4rem);
            z-index: 999;
            /*background: red;*/

        }
        .a_liwu {
            animation: bounce-up 1s linear infinite;
        }

        .mask{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            /*height:  100%;*/
            background: rgba(0, 0, 0, 0.8);
            object-fit: cover;
            object-position: center center;
        }

        .card{
            position: relative;
            display:flex;
            width: 4.5rem;
            height: 6.1rem;
            border-radius: 18px;
            background: white;
            opacity: 0.9;
            padding:30px 20px 20px 20px;
            flex-direction:column;
            align-items: center;
            /*background: rgba(0,0,0,0);*/

            .bg{
               position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }

            .circle{
                position: absolute;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                bottom: 1.2rem;
                object-fit: cover;
                object-position: center;
                pointer-events: auto;
            }

            .btn{
                position: absolute;
                height: 30px;
                width: 100px;
                border-radius: 15px;
                border: 2px solid #CB8C45;
                line-height: 30px;
                text-align: center;
                bottom: 0.5rem;
                z-index: 101;
                font-size: 14px;
                color: #CB8C45;
            }
        }

    }


</style>
