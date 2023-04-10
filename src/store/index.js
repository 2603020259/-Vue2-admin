import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//头部导航数据
const headerStore = {
  namespaced: true,
  actions: {
    show(comtext, value) {
      console.log(111);
      comtext.commit('SHOW', !value);
    }
  },
  mutations: {
    SHOW(state, value) {
      state.isAuth = value;
    },
    CHANGROUTER(state, value) {
      console.log('value', value);
      if (value.path !== '/home') {
        const index = state.routerList.findIndex(item => item.path === value.path);
        if (index === -1) {
          state.routerList.push(value);
        }
      }
      sessionStorage.setItem('name', JSON.stringify(state.routerList));
    },
    CHANGEMUNE(state, value) {
      //console.log('qqq',value);
      state.routerList = state.routerList.filter((p) => {
        return p.name !== value.name;
      });
      sessionStorage.setItem('name', JSON.stringify(state.routerList));
    },
  },
  state: {
    isAuth: false,
    routerList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    routerList: JSON.parse(sessionStorage.getItem('name')) || [{ path: '/home', name: 'home', label: '首页', icon: 's-home', url: 'Home/Home' }]
  }
}
//左侧导航数据
const asideStore = {
  namespaced: true,
  actions: {

  },
  mutations: {
    MENU(state, value) {
      console.log('1111', value);
      sessionStorage.setItem('menu', JSON.stringify(value));
    },
    INFROM(state, value) {
      console.log(3333, value);
      sessionStorage.setItem('infrom', JSON.stringify(value));
      state.infrom = value;
    },
    ADDMENU(state, router) {
      //console.log(router,'router')
      if (!sessionStorage.getItem('menu')) return;
      const menu = JSON.parse(sessionStorage.getItem('menu'));
      //console.log(1,menu);
      const menuArr = [];
      menu.forEach((item) => {
        //console.log('item', item);
        if (item.children) {
          item.children = item.children.map((item) => {
            console.log(5, item);
            item.component = () => import(`../views/${item.urls}`);
            return item;
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.urls}`);
          menuArr.push(item);
        }
      });
      console.log(menuArr, 'menuArr');
      menuArr.forEach((item) => {
        router.addRoute('About', item)
      })
    }
  },
  state: {
    menu: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    menu: JSON.parse(sessionStorage.getItem('menu')) || [{ path: '/home', name: 'home', label: '首页', icon: 's-home', url: 'Home/Home' }],
    infrom: JSON.parse(sessionStorage.getItem('infrom')),
  },
  watch: {
    deep: true,
    immediate: true,
    infrom(value) {
      this.infrom = value;
    }
  }
}
export default new Vuex.Store({
  modules: {
    headerAbout: headerStore,
    asideAbout: asideStore
  }
})