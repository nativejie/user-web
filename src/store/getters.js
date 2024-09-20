const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    roleCode: state => state.user.roleCode,
    firstLogin: state => state.user.firstLogin,
    storeUid: state => state.user.storeUid,
    storeId: state => state.user.storeId,
    addRouters: state => state.permission.addRouters,
    routers: state => state.permission.routers
  }
  export default getters
  
  
  