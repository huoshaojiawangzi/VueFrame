export default [
    { path: '/user/list', component: () =>
        import ('@/view/sys/user/userList'), name: 'userList'},
    { path: '/user/form', component: () =>
        import ('@/view/sys/user/userForm'), name: 'userForm'},
    { path: '/user/modify', component: () =>
        import ('@/view/sys/user/userModify'), name: 'userModify'},
    { path: '/user/info', component: () =>
        import ('@/view/sys/user/userInfo'), name: 'userInfo'},
    { path: '/office/list', component: () =>
        import ('@/view/sys/office/officeList'), name: 'officeList'},
    { path: '/office/form', component: () =>
        import ('@/view/sys/office/officeForm'), name: 'officeForm'},
    { path: '/office/modify', component: () =>
        import ('@/view/sys/office/officeModify'), name: 'officeModify'},
    { path: '/office/info', component: () =>
        import ('@/view/sys/office/officeInfo'), name: 'officeInfo'},
  ]

