![[PBR + NPR Rendering Research 20260305062837.png|800]]

## Preface

The model comes from Substance Painter’s beginner tutorial **Spiderbot**, and all textures were painted by me.

Unity version: **2022.3.62f2**  
Render pipeline: **URP**

## Requirements Analysis

## Material / Texture Processing

Because I wanted to achieve a “brush-stroke” look on the model, it was unavoidable to process the normals. My initial idea was to use Substance Designer’s `Pixel Processor` to create a **Kuwahara filter** effect for the material, combined with some hand-painted normal edits to get the final look.

After researching a variety of approaches, I found that Substance Painter added a powerful feature called **“Stylization Filter”** about eight months ago. With it, we can generate stylized effects very quickly.

From the input parameter textures (roughly 1 & 2), you can tell it stylizes the brush-stroke look by using curvature and normal information.  
So before using this feature, make sure you’ve **baked** the model maps—especially **Curvature** and **Normal**.

![[PBR + NPR Rendering Research 07-36-24 2026-03-05.png|500]]

![[PBR + NPR Rendering Research 07-00-21 2026-03-05.png|800]]

To achieve the specific brush-stroke look our team wanted, I also created a custom brush-stroke texture in Substance Designer.

![[PBR + NPR Rendering Research 20260305062837-1.png|800]]

## Unity Rendering

After finishing the look in SP, the next step is rendering in-engine.

This part was also inspired by my previous [[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2#Clothing & Body Skin Rendering (Base)|Girls' Frontline 2 rendering]] analysis. I wanted to use a `Ramp Texture` to art-direct the PBR lighting response, because we don’t want lighting that is _too_ stylized—we want something more realistic, but with a subtle stylized touch. A `Ramp Texture` allows artists to fully author the soft lighting transitions they want.

![[PBR + NPR Rendering Research 07-04-10 2026-03-05.png|800]]

In Substance Designer, we can easily create four ramp textures and use `Pixel Processor` to pack them into a single texture to reduce memory usage.

![[PBR + NPR Rendering Research 07-33-16 2026-03-05.png|800]]

For the outline effect, you can refer to my previous [[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2#Outline|outline]] workflow, so I won’t repeat it here.

![[PBR + NPR Rendering Research 20260305062837-2.png|PBR+NPR Final Comparison|800]]