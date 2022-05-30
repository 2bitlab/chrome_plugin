export const formDefine = {
  path_name: '客户名',
  'manifest.name': '插件名',
  'manifest.description': '插件描述文案',
  'manifest.action.default_title': '图标悬停时的标题',
  'manifest.action.default_icon': '浏览器栏上的图标',
  'manifest.icons': {
    label: '扩展程序内的图标',
    props: {
      type: 'textarea',
      placeholder: `${JSON.stringify(
        {
          '16': '图片地址',
          '24': '图片地址'
        },
        undefined,
        2
      )}`
    }
  }
}
