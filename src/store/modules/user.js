import { login, logout } from '@/api/login'
import { getInfo } from '@/api/member'
import { countCart } from '@/api/cart'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: {},
    cartNum: 0,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_CARTNUM: (state, num) => {
      state.cartNum = num
    }
  },

  actions: {
    // 获取购物车数量
    UpdateCartNum ({ commit }) {
      return new Promise((resolve, reject) => {
        countCart({ pageNum: 1, pageSize: 1000 }).then(resp => {
          commit('SET_CARTNUM', resp.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login ({ dispatch, commit }, userInfo) {
      const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        login(account, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead + data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          dispatch('GetInfo')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          sessionStorage.setItem('userInfo', JSON.stringify(response.data))
          commit('SET_USERINFO', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
        dispatch('UpdateCartNum')
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user


