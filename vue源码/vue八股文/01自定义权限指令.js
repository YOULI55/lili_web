// 注册一个全局自定义指令 `v-has-permission`
Vue.directive('has-permission', {
    bind(el, binding, vnode) {
      // 获取绑定的权限值
      const permission = binding.value;
      // 假设 `getUserInfo` 是获取用户信息的函数，返回用户的角色等信息
      const userInfo = getUserInfo();
      // 假设 `checkPermission` 是检查权限的函数
      const hasPermission = checkPermission(userInfo, permission);
   
      if (!hasPermission) {
        // 如果用户没有该权限，隐藏元素
        el.style.display = 'none';
      }
    }
  });
   
  // 检查权限的函数示例
  function checkPermission(userInfo, permission) {
    // 这里简化处理，实际应用中需要根据用户角色和权限进行复杂判断
    return userInfo.roles.includes(permission);
  }
   
  // 在组件模板中使用自定义指令
  <template>
    <button v-has-permission="'edit'">编辑</button>
  </template>