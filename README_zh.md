[English](README.md) | [中文](README_zh.md)

# QuizPlatform

QuizPlatform 是一个基于 Angular 的在线答题平台。用户可以答题、查看结果，项目结构模块化，便于扩展和维护。

## 项目结构

主应用代码位于 `src/app`：

```
src/app/
├── app.component.*        # 根组件 (HTML, SCSS, TS, spec)
├── app.module.ts          # 主模块
├── app.config.*           # 配置文件
├── app.routes.*           # 路由配置
├── components/            # 功能与 UI 组件
│   ├── header/            # 顶部导航栏
│   ├── home/              # 首页/入口
│   ├── quiz/              # 答题界面
│   └── quiz-results/      # 答题结果展示
├── models/                # TypeScript 接口与模型
├── services/              # 应用服务（如数据、答题逻辑）
```

### 主要组件
- **Header**：显示导航栏。
- **Home**：欢迎页、简介与入口。
- **Quiz**：处理答题流程与用户输入。
- **Quiz Results**：展示用户答题成绩与结果。

### 扩展应用
- **添加新组件：**
  ```bash
  ng generate component components/new-component
  ```
- **添加新服务：**
  ```bash
  ng generate service services/new-service
  ```
- **添加模型：** 在 `models/` 目录下添加 TypeScript 接口文件以增强类型安全。

## 开发

启动本地开发服务器：

```bash
ng serve
```

浏览器访问 `http://localhost:4200/`。

## 构建

构建项目：

```bash
ng build
```

构建产物存放于 `dist/` 目录。

## 测试

- **单元测试：**
  ```bash
  ng test
  ```
- **端到端 (e2e) 测试：**
  ```bash
  ng e2e
  ```
  （可根据需要配置 e2e 测试框架）

## 相关资源

- [Angular CLI 文档](https://angular.dev/tools/cli)
- [Angular 官方文档](https://angular.dev/)
