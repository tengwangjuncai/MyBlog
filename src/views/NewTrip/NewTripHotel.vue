<template>
    <div class="bg">
        <div class="item_wrap" v-for="item in tabs">
            <!--<img-->
                    <!--:src="item.recomdPic"-->
                    <!--class="bg_image"/>-->
            <div class="mask"></div>
            <div class="item_bottom_left_wrap">
                <div class="left_name">{{item}}</div>
                <!--<div class="left_ename">{{item.hotelEname}}</div>-->
                <!--<div class="left_date">{{item.checkinDate | dateformat('YYYY/MM/DD')}} － {{item.checkoutDate | dateformat('YYYY/MM/DD')}}  {{item.night}}晚</div>-->
            </div>
            <!--<div class="item_bottom_right_wrap">-->
            <!--<img src="@/assets/icon_add.png"/>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewTripHotel",
        data() {
            return {
                windowHeight:window.document.documentElement.clientHeight - 40,
                headerHeight:window.document.documentElement.clientHeight / 3 * 2,
                tabs:["概况","酒店","日程","报表","其他"],

            }
        },
    }
</script>

<style scoped>

    .bg{
        background: red;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    .item_wrap {
        position: relative;
        /*width: 100%;*/
        height: 200px;
        border-radius: 10px;

        /*margin-bottom: 10px;*/
        margin: 0px 20px 20px 20px;
        /*background: #A4A4A4;*/
        background-image: linear-gradient(to left, #A4A4A4, #525252);
    .bg_image {
        width: 100%;
        height: 200px;
        border-radius: 10px;
    }
    .mask{
        border-radius: 10px;
        position: absolute;
        left: 0;
        right: 0;
        top: 100px;
        bottom: 0;
        background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5));
    }


    .item_bottom_left_wrap {
        position: absolute;
        left: 10px;
        right: 60px;
        bottom: 10px;
        color: white;
        z-index: 5;
    /*background: red;*/
    /*rgba(0, 0, 0, 0.2)*/
    .left_name {
        font-size: 20px;
        font-weight: bold;
        font-family: PingFangSC-Regular, sans-serif;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-bottom: 5px;
    }
    .left_ename {
        font-size: 12px;
        font-family: PingFangSC-Regular, sans-serif;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: lighter;
        padding-bottom: 2px;
    }
    .left_date {
        font-size: 12px;
        font-family: PingFangSC-Regular, sans-serif;
        overflow: hidden;
        font-weight: lighter;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    }
    .item_bottom_right_wrap {
        position: absolute;
        right: 15px;
        bottom: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;
        cursor: pointer;
    img {
        width: 15px;
        height: 15px;
    }
    }

    }
</style>