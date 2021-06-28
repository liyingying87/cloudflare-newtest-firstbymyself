const baseConfig = require('./baseConfig')


export default {
    install(Vue, options) {
        const defaultParams = {
            pageSize: baseConfig.pageSize,
            pageNo: baseConfig.pageNo
        }
        Vue.prototype.showAlert = function (type = 'success', content = '操作成功！') {
            this.$message({
                message: content,
                type: type
            });
        }
        //patch请求   更新 修改后的数据推送到后端
        Vue.prototype.$patch = function (url, parmas, successCallBack, errorCallBack) {
            this.$axios.patch(url, parmas).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.showAlert('error', err)
            })
        }
        //delete请求   删除数据
        Vue.prototype.$del = function (url, parmas, successCallBack, errorCallBack) {
            console.log(parmas, 'params')
            this.$axios.delete(url, {data: parmas}).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.showAlert('error', err)
            })
        }
        //put请求   更新数据  数据推送到后端
        Vue.prototype.$put = function (url, parmas, successCallBack, errorCallBack) {
            this.$axios.put(url, parmas).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.showAlert('error', err)
            })
        }
        //post请求  提交数据  新建
        Vue.prototype.$post = function (url, parmas, successCallBack, errorCallBack) {
            this.$axios.post(url, parmas).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.showAlert('error', err)
            })
        }

        //get请求  获得数据
        Vue.prototype.$get = function (url, parmas, successCallBack, errorCallBack) {
            parmas = Object.assign(defaultParams,parmas)
            this.$axios.get(url, parmas).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.showAlert('error', err)
            })
        }
        Vue.prototype.getPageConfig = function (res, params) {
            let config = {}
            config.currentPage = params.PageNo
            config.total = res.data.total
            config.pageSize = baseConfig.pageSize
            return config
        }
        Vue.prototype.getRandomColor = function () {
            return '#' + ('333333' + (Math.random() * 0x15720922 << 0).toString(16)).substr(-6);
        }
        Vue.prototype.getPageConfig = function (res, params) {
            return {
                pageNo: params.pageNo || 0,
                pageSize: params.pageSize || 10,
                total: res.data.total || 0
            }
        }
    }
}
