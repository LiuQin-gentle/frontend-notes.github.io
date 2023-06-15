## 变形、过渡、动画

### 1. transform变形

* 2D相关属性
* transform: translate(移动)、rotate(旋转)、scale(放缩)、matrix(变形矩阵)等
  * transform-origin: right top、center等   表示变形时依据的原点

* 3D相关属性
  * transform: translate3d、rotate3d、scale3d、matrix3d等
  * transform-origin: right top、50px 30px等  表示变形时依据的原点
  * transform-style: flat或 preserve-3d  看子元素的3d表现
  * perspective: 观看点距离z=0这个平面的距离，可以在transform中用perspective()使用作用为当前元素，也可以直接使用，给后代元素一个统一值
  * perspective-origin: 观看者的位置，如top、bottom等
  * backface-visibility: 元素正面只有朝向观察者的时候可见

### 2. trasition过渡

​	通过指定某些元素属性从一种起始状态，在一段时间内以某种变化节奏，过渡到终止状态

```css
div{
    transition: <property><duration><timing-function><delay>;
}
```

其中timing-function一般有三种用法∶线性(linear)、贝塞尔曲线(cubic-bezier()或 ease-in等)、阶跃(step)

### 3. animation动画

@keyframes 关键帧 用来定义动画过程中出现的关键样式

animation-*相关属性用来为元素添加动画

* animation-name:定义好的关键帧的名字
* animation-duration:动画时长
* animation-timing-function:动画节奏
* animation-delay:延时开始的时间
* animation-iteration-count:执行次数
* animation-direction:是否反向或交替
* animation-fill-mode:动画执行前后的样式采用
* animation-play-state:动画运行状态

### 4. transform、transition、animation——性能相关

布局-->绘制-->合成

* 布局：计算布局     宽、高、位置等改变都会重新布局(reflow)

* 绘制：填充像素     文本、着色、背景边框等改变会触发(reflow); 某些渲染层形成合成层，拥有单独的图层(GraphicLayer)由GPU绘制，即所谓硬件加速;
* 收集所有绘制完成的图层,按照顺序合成显示

如何写动画性能更好?

1. 尽量不用触发reflow的属性
2. 在遇到性能问题时可以触发硬件加速，比如设置will-change属性、设置transform3d等
3. 尽量使用transform和 opacity去写动画

## 响应式设计

### 1. 响应式设计原则 

* 优先选用流式布局，如百分比、flex、grid等
* 使用响应式图片，匹配尺寸，节省带宽
* 使用媒体查询为不同的设备类型做适配
* 给移动端设备设置简单、统一的视口
* 使用相对长度，em、rem、 vw做为长度度量

### 2. 媒体查询的使用

* 媒体查询允许某些样式只在页面满足特定条件时才生效。我们可以将媒体类型(如screen、print)以及媒体特性（如视口宽度、屏幕比例、设备方向:横向或纵向)做为约束条件。

  使用媒体查询的一些Tips

  1. 媒体查询同样遵循cascading层叠覆盖原则，min-和max-选择一个
  2. 由于设备的多样化逐渐不可枚举，断点的选择尽量根据内容选择
  3. 由于断点的增加会增加样式处理的复杂度，所以尽量减少断点

### 3. 设备像素

设备像素(物理像素)︰显示器上绘制的最小单位，显示屏通过控制每个像素点的颜色，使屏幕显示出不同的图像。

设备像素和设备相关，屏幕从工厂出来那天起，它上面的物理像素点就固定不变了。

* DPI && PPI

  dpi (dots per inch)︰每英寸多少点。

  ppi (pixels per inch):每英寸多少像素数。

* CSS像素

  CSS像素(reference pixel）其实是一个视角单位。规范给出的定义是，1css像素是从—臂之遥看解析度为96DPI(即1英寸96点)的设备输出时，1点（即1/96英寸)的视角。

* DPR像素比

  DPR=设备像素/CSS像素

* 移动端的viewport

  布局视口(viewport)是页面中html元素(根元素)的包含块。

  默认情况下，window.document.documentElement.clientWidth就是viewport的宽度。

  在移动设备中，默认的布局视口由于历史兼容pc屏幕的原因，并不符合需求，我们经常需要用<meta>标签对viewport进行设定，来完成移动端设备的适配。

### 4. 相对长度的使用

* em
  * 在非font-size属性中使用是相对于自身的字体大小
  * 在font-size上使用是相对于父元素的字体大小
    (一般不在这个属性上使用，因为font-size的继承特性，多重嵌套后大小会不断放大或缩小，产生混乱)

* rem
  * 根元素的字体大小。通过伪类root或者html选择器选定。由于是根元素的font-size，所以不会像em那样出现多重嵌套问题，减少了复杂性，同时作为一个相对单位，可以进行适配放缩，可以用来做响应式布局。

* vw和vh
  * vw∶视窗宽度的1%。vh︰视窗高度的1%。同样，vw也可以作为响应式布局的基准单位。
  * 由于vw天然是视口宽度的1%，所以不需要js动态配置。

