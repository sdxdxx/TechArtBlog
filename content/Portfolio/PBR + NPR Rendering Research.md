
![[PBR + NPR Rendering Research 20260305062837.png|800]]
## Preface

模型来源于Substance Painter的新手教程的Spiderbot，贴图均为我自己绘制

Unity version: **2022.3.62f2**  
Render pipeline: **URP**

## 处理模型材质

![[PBR + NPR Rendering Research 07-36-24 2026-03-05.png|500]]

![[PBR + NPR Rendering Research 07-00-21 2026-03-05.png|800]]

![[PBR + NPR Rendering Research 20260305062837-1.png|800]]

因为我想要在

## Unity渲染

在SP中处理完模型以后，接下来就是进入引擎渲染了

剩下的我也是受到之前[[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2#Clothing & Body Skin Rendering (Base)|Girls' Frontline 2渲染]]的启发，想要使用`Ramp Texture`对PBR光照进行修改，因为我们并不想要太风格化的光照效果，是要写实偏一点风格化的感觉，而 `Ramp Texture` 可以让Artists们完全自定义自己想要的柔和的过渡的光照效果

![[PBR + NPR Rendering Research 07-04-10 2026-03-05.png|800]]

在Substance Designer中我们可以轻松的创建四张Ramp图并使用`Pixel Processor`将其合并到一张图里减少内存消耗

![[PBR + NPR Rendering Research 07-33-16 2026-03-05.png|800]]

而描边效果可以参考我之前[[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2#Outline|描边效果]]的制作方案，这里也就不再赘述了

![[PBR + NPR Rendering Research 20260305062837-2.png|PBR+NPR|800]]

