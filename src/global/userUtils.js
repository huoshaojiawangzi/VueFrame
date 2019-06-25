import store from '@/store'

function loopGetMenuByPath(menuTree, path) {
  for (let item of menuTree) {
    if ((item.children === undefined || item.children.length === 0) && item.path === path) {
      return item;
    } else if (item.children !== undefined && item.children.length > 0) {
      let result = loopGetMenuByPath(item.children, path);
      if (result !== undefined) {
        return result
      }
    }
  }
}

//通过path获取用户的菜单
function getMenuByPath(path) {
  return loopGetMenuByPath(store.getters.getMenuTree, path);
}

function loopGetPermissionByTag(PermissionTree, tag) {
  for (let item of PermissionTree) {
    if ((item.children === undefined || item.children.length === 0) && item.path === tag) {
      return item;
    } else if (item.children !== undefined && item.children.length > 0) {
      let result = loopGetPermissionByTag(item.children, tag);
      if (result !== undefined) {
        return result
      }
    }
  }
}

//通过tag获取用户的权限
function getPermissoinByTag(tag) {
  return loopGetPermissionByTag(store.getters.getPermissionTree, tag);
}

//判断用户是否拥有某权限
function hasPermissoin(tag) {
  return getPermissoinByTag(tag) != null;
}

export default {getMenuByPath, hasPermissoin}
