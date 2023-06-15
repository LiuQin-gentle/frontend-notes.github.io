# npm install命令报错：npm ERR Could not resolve dependency npm ERR peer…

在使用 `npm install` 命令安装依赖时遇到错误，报错信息如下：

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: project@0.1.0
npm ERR! Found: eslint@7.32.0
npm ERR! node_modules/eslint
npm ERR! eslint@"^7.4.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer eslint@"^5.0.0 || ^6.0.0" from eslint-plugin-vue@6.2.2
npm ERR! dev eslint-plugin-vue@"^6.2.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See D: ode ode_cacheeresolve-report.txt for a full report.
npm ERR! A complete log of this run can be found in:
npm ERR! D: ode ode_cache_logs?2-04-28T06_55_18_256Z-debug-0.log
```

## 错误原因

在新版本的npm中，默认情况下，npm install遇到冲突的peerDependencies时将失败。

## 解决办法

使用`--force`或`--legacy-peer-deps`选项。

- `--force `会无视冲突，并强制获取远端npm库资源，当有资源冲突时覆盖掉原先的版本。
- `--legacy-peer-deps`安装时忽略所有peerDependencies，忽视依赖冲突，采用npm版本4到版本6的样式去安装依赖，已有的依赖不会覆盖。

建议用 `--legacy-peer-deps` 选项在终端重新安装即可，该命令相对保险一点。

```
npm install --legacy-peer-deps
```