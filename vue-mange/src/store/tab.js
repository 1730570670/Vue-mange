export default {
    state: {
        isCollapse: false, //左边侧边栏的展开状态
        tablist: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }], //存储路由数据
        currentMenu: null,
        ListIndex: '', //修改数据的下标
        UserInfo: '', //用户名
        islogin: false, //登录状态
    },
    mutations: {
        CollapseMenu: function(state) {
            state.isCollapse = !state.isCollapse; //将展开伸缩的数据进行取反
        },
        // 改变tablist
        selectMeenu: function(state, val) {
            if (state.name != 'home') {
                state.currentMenu = val;
                const result = state.tablist.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tablist.push(val)
                }
            } else {
                state.currentMenu = null //返回空值
            }
        },
        ColseTag(state, val) {
            const result = state.tablist.findIndex(item => item.name === val.name); //获取对应的下标
            state.tablist.splice(result, 1) //将对应数组下标删除
        }
    }
}