<template>
    <div class="bg">
        <div class="content">
                <div class="tabView">
                    <div class="tabItem" @click="changeTab(false)">
                        <img v-bind:class="[!isRegister ? 'iconSelect' : 'icon']" :src="(!isRegister ? loginIcon : loginSelect)"/>
                    </div>
                    <div class="tabItem" @click="changeTab(true)">
                        <img v-bind:class="[isRegister ? 'iconSelect' : 'icon']" :src="isRegister ? registerIcon : registerSelect"/>
                    </div>
                </div>
                <div class="inputView">
                    <el-input class="login_userName" placeholder="请输入用户名" v-model="name" clearable></el-input>
                    <el-input class="login_userName" placeholder="请输入密码" v-model="password" show-password></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="login_Btn" @click="btnAction">{{btnTitle}}</el-button>
                    </span>
                </div>

        </div>
    </div>
</template>

<script>

    import {httpGet,httpPost} from '@/utils/app';
    export default {
        name: "Login",
        data() {
            return {
                name:'',
                password:'',
                isRegister:false,
                loginIcon:require('../assets/loginIconNor.png'),
                loginSelect:require('../assets/loginIcon.png'),
                registerIcon:require('../assets/registerIconNor.png'),
                registerSelect:require('../assets/registerIcon.png'),
                btnTitle:'登录',
                user:{},

            }
        },

        methods:{
            changeTab(flag){
                this.isRegister = flag
                if (flag){
                    this.btnTitle = '注册'
                } else {
                    this.btnTitle = '登录'
                }
            },

            btnAction(){

                if (this.isRegister){
                    this.register()
                } else {
                    this.login()
                }
            },

            login(){

                let _this = this
                let param = {
                    name:_this.name,
                    password:_this.password
                }

                httpPost('/user/signin',param).then( response =>{

                    _this.user = response.data
                    sessionStorage.setItem('user',JSON.stringify(response.data));

                    console.log('login=======' + JSON.stringify(_this.user))

                    _this.$router.replace({
                        path: '/EditView',
                    })
                    let name = _this.user.name
                    _this.$message({message: name + '  欢迎归来……',center:true,type:'success'})
                })
            },

            register(){

                let _this = this
                let param = {
                    name:_this.name,
                    password:_this.password
                }

                httpPost('/user/signup',param).then( response =>{


                    _this.user = response.data
                    console.log('register=======' + JSON.stringify(response.data))
                    sessionStorage.setItem('user',JSON.stringify(response.data));
                    _this.$router.replace({
                        path: '/EditView',
                    })
                    let name = _this.user.name
                    _this.$message({message:'快来开启 ' + name +' 世界吧',center:true,type:'success'})
                })
            }
        },

        mounted(){


        }

    }
</script>

<style scoped>
    .bg{
        display: flex;
        position: fixed;
        height: 100%;
        width: 100%;
        background-position: center center;
        background: url("http://www.33lc.com/article/UploadPic/2012-8/201282015245513483.jpg") center no-repeat #666666;
        background-size: cover;
        justify-content: center;
        align-items: center;


     }
    .content{
        display: flex;
        flex-direction:column;
        /*justify-content: center;*/
        align-items: center;
        width: 600px;
        height: 350px;
        background: rgba(22,22,22,0.6);
        border-radius: 10px;
        /*margin: 30% auto;*/
    }
    .inputView {
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        height: 250px;
    }

    .login_userName{
        margin: 10px 20px;
        width: 300px;
        height: 44px;
        /*background-color: red;*/
    }

    .login_Btn{
        margin-top: 20px;
        width: 250px;
        background: darkcyan;
        color: white;
    }

    .tabView{
        width: 120px;
        height: 44px;
        display: flex;
        /*background: red;*/
        align-items: center;
        margin-top: 25px;
    }
    .tabItem{
        width: 50%;
        height: 100%;
        /*background: red;*/
    }
    .icon{
        width: 25px;
        height: 25px;
        margin: 12px auto 4px auto;
    }

    .iconSelect{
        width: 35px;
        height: 35px;
        margin: 4px auto;
    }
</style>