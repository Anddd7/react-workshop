# react-workshop
To learn react together in olo

# task tracker
### 20180504
* TODO 适配新的后端API


### 20180502
*  react + redux
  * 页面触发 action
  * reducer: action+state => nextState
  * state 再参与渲染页面
* redux + ajax
  * 类似 alt, start/process/end 分别触发不同的 action, reducer 根据 action 去决定如何处理数据
  * 在异步事件中调用 action 触发事件机制, 即 ajax 成功过后才触发 setData 的动作


### 20180428
简化页面结构 ,方便后续加入 redux 理清逻辑
* finished dashboard : create/findAll

### 20180427
copy configs from [todolist-web-app-react](https://github.com/Anddd7/todolist-web-app-react)
* remove altjs
* create dashboard with apis [todolist-server](https://github.com/Anddd7/todolist-server)