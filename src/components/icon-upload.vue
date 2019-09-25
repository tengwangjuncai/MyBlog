<template>
        <el-upload v-bind:class="[valueUrl ? 'Hicon' : 'headIcon']"  action=""
                   list-type="picture"
                   :disabled="disabled"
                   :show-file-list="false"
                   :before-upload="_beforeUpload"
                   :on-success="_success"
                   :http-request="_aliOssUpload">
            <img v-if="valueUrl" :src="valueUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
</template>

<script>
    import OSS from 'ali-oss'

    export default {
        name: "icon-upload",
        props: {
            value: {type: String},
            disabled: {type: Boolean, default(){return false}},
        },

        data() {
            return {
                valueUrl: '',
                // 弹窗显示大图
                dialogVisible: false,

                // 阿里OSS客户端
                client: null,
                // 阿里OSS项目文件夹
                folder: 'xtrip',
                ossPath: 'resource-imguider.oss-cn-hangzhou.aliyuncs.com',
                cdnPath: 'cncdn.imguider.com',
            }
        },

        watch:{
            value(val){
                this.valueUrl = val
            }
        },
        methods:{

            _beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 5MB限制');
                }
                return isLt2M;
            },
            async _remove() {
                console.log('移除file: ', this.valueUrl);
                try {
                    let result = await this.client.delete(this.valueUrl.substr(this.valueUrl.lastIndexOf(this.folder)));
                    console.log('移除请求返回：', result);
                    this.valueUrl = '';
                } catch (e) {
                    console.log('移除请求异常', e);
                }
                this.$emit('input', this.valueUrl);
                this.$emit('change', this.valueUrl);
            },
            _success(response) {
                if (response) {
                    this.valueUrl = response.url;
                    this.$emit('input', this.valueUrl);
                    this.$emit('change', this.valueUrl);
                }
            },
            _dateFormat(date) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return [year, month, day].map(itm => {
                    itm = itm.toString();
                    return itm[1] ? itm : '0' + itm;
                }).join('');
            },
            _numberRandom4(length) {
                let _numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                let _result = '';
                for (let i = 0; i < length; i++) {
                    _result += _numbers[Math.ceil(Math.random() * 9)];
                }
                return _result;
            },
            /**
             * 自定义阿里OSS上传请求
             * @param option
             * @returns {Promise<void>}
             * @private
             */
            async _aliOssUpload(option) {
                console.log('上传对象[option]：', option);
                try {
                    const _file = option.file;
                    const _date = this._dateFormat(new Date());
                    const _name = _file.name.substring(0, _file.name.lastIndexOf('.'));
                    const _random4 = this._numberRandom4(4);
                    const _ext = _file.name.substr(_file.name.lastIndexOf('.'));
                    // API-PUT
                    let result = await this.client.put(`${this.folder}/${_date}/${_name + _random4 + _ext}`, option.file);
                    result.url = result.url.replace(this.ossPath, this.cdnPath);
                    console.log('上传返回：', result);
                    return result;
                } catch (e) {
                    console.log('上传异常：', e);
                }
            },
        },

        mounted(){
            this.valueUrl = this.value;
            console.error('#####' + this.valueUrl)
            this.client = new OSS({
                region: 'oss-cn-hangzhou',
                accessKeyId: 'LTAIPyl3fGvKL79j',
                accessKeySecret: 'OejQ9cQcUzJI3Ftjy9tyLi79maQBWD',
                bucket: 'resource-imguider',
            });
        }
    }
</script>

<style scoped>

    .headIcon{
        width: 80px;
        height: 80px;
        /*margin-top: 3px;*/
        margin-left: 20px;
        border-radius: 50%;
        border: 2px dashed lightgrey;
        /*box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);*/
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .Hicon{
        width: 80px;
        height: 80px;
        /*margin-top: 3px;*/
        margin-left: 20px;
        border-radius: 50%;
        /*box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.2);*/
        border: 1px solid gray;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar {
        width: 80px;
        height: 80px;
        display: block;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }

    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }

</style>