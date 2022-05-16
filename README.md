# Vue 3 + Typescript + Vite

## 设计

### 配置项

#### 构建配置

#### 运行时配置

### 打包交互流程

## Start up

```bash
pnpm run bootstrap

```

### pnpm 的 workspace monorepo

```bash
# 在某个模块下关联其他模块
pnpm i @belloai/api --filter @belloai/chrome-extension
```

## Technologies

For the root level I'm using:

- [pnpm + pnp workspaces](https://pnpm.io/) - Maintain this Monorepo;
- [changesets](https://github.com/atlassian/changesets) - Automation for package release and changelog;
- [TypeScript](https://www.typescriptlang.org/) - core programming language;
- [scripty](https://www.npmjs.com/package/scripty) - Run npm scripts with bash files;

### 技术栈

- [Vitest](https://vitest.dev/)
- [Vite](https://vitejs.dev/)
- [Vue3](https://v3.vuejs.org/)

## 参考

- [使用 pnpm 做 monorepo](https://juejin.cn/post/7055281852789047304)
- [raulmelo-studio](https://github.com/raulfdm/raulmelo-studio) - 使用 pnpm 做 monorepo 的实际项目
- [chrome extensions api](https://developer.chrome.com/docs/extensions/reference/)
- [manifest.json config](https://developer.chrome.com/docs/extensions/mv3/manifest/)
- [官方例子](https://github.com/GoogleChrome/chrome-extensions-samples) - 看这个就可以了解到各个 api 的实际调用
- [Chrome 插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html) - 别人写的中文版介绍（不过已经有点旧了，方便理解基础概念）
- [chrome-plugin-develop](https://www.bookstack.cn/read/chrome-plugin-develop/spilt.6.spilt.8.8bdb1aac68bbdc44.md) - 中文总结性文档
