#  D3.js 地图应用：Apple Store 全球可视化

## 概要

苹果公司近年来在中国新开业了不少 Apple Store，每个 Apple Store 都是精心设计过的，有的甚至成为了当地的地标性建筑。

在网上搜索 Apple Store 变迁的相关信息时，发现了一个页面：[Apple Storefronts](http://applestorefronts.appspot.com/)，记录了每一家 Apple Store 的开业时间和具体地点。但这个页面是以列表形式呈现，于是决定从里出发来做 Apple Store 全球可视化。

## 设计和实现

### 可视化故事摘要

1. 作者叙事：使用 D3.js 地图，以点代表每个门店，讲述全球 Apple Store 随时间的地理落成和数量变化。

可以看到，全球的 Apple Store 主要分布在北美、亚洲、欧洲和澳洲，其中美国境内分布最多。从 2001 年的第一家 Apple Store 开始，随着时间推移，苹果公司先是在亚洲的日本和欧洲的英国开始了国际版图。随后逐渐扩展到了澳洲和亚洲，还有欧洲的更多地区。

2. 读者叙事：在地图上以缩放的方式，查找门店，并可查看每个门店的详细信息。

这部分自由度很大，读者可以随意了解感兴趣地区的苹果门店分布和详细信息。比如北京一共有 5 家 Apple Store，其中三里屯 Apple Store 开业最早，于 2008 年 7 月 19 日开业，是全球第 217 家 Apple Store。


### 数据相关

#### Apple Store 数据爬取和清理

> Apple Store 相关的数据处理过程和代码，单独记录在了 `data/Apple store list.ipynb` 文件中

- 爬虫工具：Python3.x,  beautifulsoup4 
- 爬取页面1：Apple Storefonts http://applestorefronts.appspot.com/all
- 爬取页面2:：根据从 Apple Storefonts 抓取到的门店 url 信息，再去苹果官网每一个门店的单独主页上，抓取另一部分信息，这次要抓的是 `adress`，`long`，`lat`，`tel`，`photo`。e.g. 澳门银河 Apple Store：https://www.apple.com/mo/retail/galaxymacau/
- 数据整理：抓取完的数据，经过清理，写入到了 `data/apple_store_list_v2.0.csv` 文件当中

#### 地图数据

地图数据从 [geojson.io](http://geojson.io/) 获得，直接下载 GeoJson 数据文件：`data/world_countries.json`

### 实现和改进

#### v1.0

--> [v1.0 版本 Gist 在线查看](http://bl.ocks.org/supernova16/raw/f7a5fc8327a2a8361044bf9a27acb49a/)

布局草稿：

![](http://os9qh4wzl.bkt.clouddn.com/15122610893909.jpg)


功能：

- 页面加载后，自动绘制 Apple Store 在地图上的点
- 点击圆点可查看门店详细信息：图片，名字，地址，开业日期，ID。
- 地图支持缩放和拖拽，放大后圆点相对应缩小，方便查看圆点密集分布的地区。

实现：

- D3.js
- Javascript、HTML、CSS

未使用其他库

#### v1.1

--> [v1.1 版本 Gist 在线访问](http://bl.ocks.org/supernova16/raw/c3b7f57a673b6ce11ce6dcf7f7568c16/)

发布 v1.0 后，收到的反馈整理和处理如下：

1. 降低圆点落在地图上的速度  -->  👌🏻
2. ~~增加时间轴，供读者拖动，圆点相对应随时间变化~~  -->  🙈 这个功能放到 v2.0 中
3. ~~改变地图投影中心点，以美欧为主。~~  -->  🙈 Apple Store 主要分布在 美欧 地区的问题，读者可以缩放和拖拽地图探索。
4. ~~增加国家内的省份地图~~  -->  🙈 视觉效果上会显得凌乱，将在 v2.0 中增加 国家/地区 筛选查看功能
5. ~~增加国家/地区筛选查看功能~~  -->  🙈 这个功能放到 v2.0 中
6. 页面一加载完就开始播放，没有足够时间理解信息  -->  👌🏻 将会增加播放按钮

v1.1 更新汇总：

- 增加播放按钮，让读者自己选择开始播放时间，其中播放按钮图标字符来自 [Font Awesome](http://fontawesome.io/)
- 增加了首屏引导标题，一目了然将要描绘的可视化故事
- 调整了圆点绘制的时长和间隔，让播放过程更易于观察



#### v2.0

由于时间原因，更多的功能和改进放到 v2.0 中，敬请期待😑...


## 反馈

### v1.0 反馈记录

#### @Gaoke

>从这个可视化里，我可以了解到 apple store 随着时间的变化，是如何扩展到全球的，也可以观察到 apple store 整体在全球的分布。鼠标放到某一个点上，还可以看到该店的照片、所在城市、开店日期等信息，非常赞。
>
>提两个小小的建议：
>
>1. 打开网页看到点落在地图上的速度很快，目不暇接，还没看清楚就已经完了，可否降低速度或提供一个可以拖动的时间轴，让观众可以返回头来看？
>
>2. 地图的中心区域是非洲和亚洲，但苹果店主要分布在美国本土、欧洲、东亚等地，这样的话，苹果店大部分都在地图的边缘了，而图的中心空白面积较大。可否换一张底图，地图是从中亚切开或者从大西洋切开，让苹果店分布在图较中心的位置？
>



#### @Sp

>- 在放大地图时，将国家内的地图（省份划分）也显示出来是不是更好，这样更方便寻找地理位置
> - 或者提供分国家/地区的方式，让读者自己筛选要查看的地区。


#### @akid

> - 页面一加载完就开始播放，没有足够的时间来理解信息



## References

- [d3 transition problem](http://jsfiddle.net/sbecker/wL5xg/3/)
- [Wiki：D3 API Reference](https://github.com/d3/d3/blob/master/API.md)
- [click-to-zoom via transform](https://bl.ocks.org/mbostock/2206590)
- [Blog：D3.js 动态数据刷新视图详解](http://blog.csdn.net/nicolecc/article/details/50786661)
- [如何通俗易懂地解释卷积？](https://www.zhihu.com/question/22298352)
- Data source 1: https://www.apple.com/main/rss/retail/stores.xml
- Data source 2: http://applestorefronts.appspot.com/
- [Python爬虫日记三：爬取v2ex数据用csv保存](http://www.jianshu.com/p/d1bf2f0bdc51)


