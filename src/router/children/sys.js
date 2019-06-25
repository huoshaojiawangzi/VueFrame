const userRoute = [
  {
    path: '/user/list', component: () =>
      import ('@/view/sys/user/userList'), name: 'userList'
  },
  {
    path: '/user/form', component: () =>
      import ('@/view/sys/user/userForm'), name: 'userForm'
  },
  {
    path: '/user/modify', component: () =>
      import ('@/view/sys/user/userModify'), name: 'userModify'
  },
  {
    path: '/user/info', component: () =>
      import ('@/view/sys/user/userInfo'), name: 'userInfo'
  }
];

const officeRoute = [
  {
    path: '/office/list', component: () =>
      import ('@/view/sys/office/officeList'), name: 'officeList'
  },
  {
    path: '/office/form', component: () =>
      import ('@/view/sys/office/officeForm'), name: 'officeForm'
  },
  {
    path: '/office/modify', component: () =>
      import ('@/view/sys/office/officeModify'), name: 'officeModify'
  }
];

const menuRoute = [
  {
    path: '/menu/list', component: () =>
      import ('@/view/sys/menu/menuList'), name: 'menuList'
  },
  {
    path: '/menu/form', component: () =>
      import ('@/view/sys/menu/menuForm'), name: 'menuForm'
  },
  {
    path: '/menu/modify', component: () =>
      import ('@/view/sys/menu/menuModify'), name: 'menuModify'
  }
];

const permissionRoute = [
  {
    path: '/permission/list', component: () =>
      import ('@/view/sys/permission/permissionList'), name: 'permissionList'
  },
  {
    path: '/permission/form', component: () =>
      import ('@/view/sys/permission/permissionForm'), name: 'permissionForm'
  },
  {
    path: '/menu/modify', component: () =>
      import ('@/view/sys/permission/permissionModify'), name: 'permissionModify'
  }
];

const roleRoute = [
  {
    path: '/role/list', component: () =>
      import ('@/view/sys/role/roleList'), name: 'roleList'
  },
  {
    path: '/role/form', component: () =>
      import ('@/view/sys/role/roleForm'), name: 'roleForm'
  },
  {
    path: '/menu/modify', component: () =>
      import ('@/view/sys/role/roleModify'), name: 'roleModify'
  }
];

const dictionaryRoute = [
  {
    path: '/dictionary/list', component: () =>
      import ('@/view/sys/dictionary/dictionaryList'), name: 'dictionaryList'
  },
  {
    path: '/dictionary/form', component: () =>
      import ('@/view/sys/dictionary/dictionaryForm'), name: 'dictionaryForm'
  },
  {
    path: '/menu/modify', component: () =>
      import ('@/view/sys/dictionary/dictionaryModify'), name: 'dictionaryModify'
  }
];

export default [
  ...userRoute,
  ...officeRoute,
  ...menuRoute,
  ...permissionRoute,
  ...roleRoute,
  ...dictionaryRoute
]

