这是一个从0搭建一个scratch项目的demo , 共有14个分支,每个分支对应了一个小的功能 ,完成了一些srcatch的基本功能,希望对大家能有所帮助

项目安装运行
```
npm install
npm start
```

版本迭代:
1. v0.11:虚拟机vm可用
    * 首先什么是虚拟机:用来屏蔽底层硬件差异和dom渲染差异,使得程序可以跨端移植,react本质上也是虚拟机,虚拟dom屏蔽设备渲染差异( dom只有pc浏览器能识别 , 但虚拟dom是js对象,因而在手机上也能解析成viewPort,而native屏蔽底层硬件差异 ,使得程序可以在Android和ios都可以运行), scratch-vm作用:使用虚拟io屏蔽底层差异,使用render屏蔽ui差异,使scratch软件也可以跨端
2. v0.12:将vm置入redux中,所有组件均可使用mapStateToProps调用vm
    * scratch-gui的一个弊端就是react组件层层嵌套,使得调试极其困难,我的思路是把所有状态置入redux中,这样在gui中调用纯组件(比如<Stage/>),这样不用传入任何props,可以使组件完全解耦,提升可维护性
3. v0.13:blocks显示正常
    * blocks分为四种:block(普通的,只能被动接受事件),flyoutBlocks(block带弹框可以广播事件的,如广播某某事件),monitorBlocks(上面是半圆形,可以控制脚本,如点击block块),variable(用户自定义的,也可能会发送事件),因这些block都可以发送跨越角色(sprite)的事件,所以在vm中他们都会有一个全局事件队列sequencer
4. v0.14:能够加载sb3工程文件
    * 在const vm = new VM()之后,必须再为vm添加storage,为Scratch-render添加远程服务器地址,使vm能够获取mit服务器上的资源文件,否则会在加载工程文件后,vm中editingtarget属性无法更新的问题
    * 注意当前版本bug: 
         - vm中installTarget属性未更新(v0.19已解决)
         - sb3文件无法解析,使用fs.readFile后vm.loadProject无效(v0.19已解决)
5. v0.15:能够加载舞台
    * 舞台是个canvas,但是上面的角色却可以用鼠标拖动,神奇吧,因为在stage监听了鼠标的点击,通过鼠标点的位置在vm中返回角色的实例,然后在拖动时,在最顶层再生成一个canvas,覆盖stage,然后生成动画,当放开时,把顶层canvas最后的状态返回到stage上,这就实现了拖动.我认为这个实现过于复杂,h5中有新的api ondrag类函数,既然能返回vm中角色的实例,那么通过单个canvas也应该可以实现类似功能
    * 注意当前版本bug: 
        - 鼠标事件vm报错:scratch-render warn Could not find skin for drawable,
          这是因为加载的skin文件有问题(v0.19已解决)
6. v0.16:加载sprite信息成功
    * 注意当前版本bug: 在stage中无法显示sprite信息(v0.19已解决)
7. v0.17:获取sprite资源成功
    * 注意当前版本bug: 
        - 资源不能推送到vm中,scratch-render工作不正常(v0.19已解决)
8. v0.18:添加了sb2兼容模式
     * 注意当前版本bug: 
        - vm初始化出现一些问题(v0.19已解决)
9.  v0.19:可正常加载project,新建sprite功能可用,并可以在stage中渲染skin,scratch-render工作正常
10. v0.20:虚拟keyBoard可用,为vm映射了space和down按键,stage能够响应blocks的键盘按键事件
    * 虚拟IO的作用:用于屏蔽底层差异,来实现跨端(比如鼠标的点击事件,触摸屏的touch事件,都会在vm中统一映射成一个scratch能识别的key),scratch中自定义了一套key,每个key对应一个sprite动作,虚拟键盘IO建立起了Ascll码与scratch-key之间的联系, 这里space建的ascll码是32,down键的ascll码是40
11. v0.21:选择角色功能可用,解决了导出vm.runtime.targets的问题
    * 当点击角色选择界面时,角色会有变化,是因为我们的点击事件改变了vm.editingTarget对象,我们可以在vm.runtime.targets列表中获取所有加载的角色和舞台
    * 注意我们天天用的console.log是个异步函数,比如
    ```
    let obj={}; 
    console.log(obj)  // 输出{a:'abc'}
    obj.a='abc'
    ```
    这在虚拟机中调试会造成巨大的问题,因为虚拟机的渲染也是异步的,但是速度会比console块,所以经常会出现上述情况
    解决方案:1,使用emit发送消息,通过实时监听的方式能够避免这个问题 2,console.log(JSON.stringify(obj)) 3,用debugger调试
12. v0.22:选择角色功能可用
    * 注意当前版本bug: 
        - 但角色图片缓存无法缓存,且新建同名角色会报错(v0.23已解决)
13. v0.23: 解决了sprite图片缓存以及重名精灵图片缓存的问题
    * 在sprite-library中选择了sprite之后会触发vm.addSprite函数,我开始以为,执行完add后的onActivateBlocksTab异步函数是缓存customs的,追踪一上午发现这个函数最后改变了redux/edit-tab的值只是改变了标签.所以追踪这个函数根本没有用
    * 解决方案: scratch的这个功能实现过于复杂我没看懂,我的思路是当点击添加时索引资源的md5去服务器上下载,反正在新建时也下载过一遍,浏览器里是有缓存的,最使用redux缓存每次随机生成的target名字和Md5(因为有重名sprite,比如两个苹果vm会当做两个独立的精灵,所以target名字末尾是数字递增的,因此使用名字对sprite进行索引需要使用startsWith函数进行判断,而md5与custom重名,可以作为custom的资源索引),进而就可以在服务器上进行查询了.



