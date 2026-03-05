
![[Stylized Shading Model 20260305082032.png|800]]

## Preface

Unreal version: **Unreal 5.6.1 Source Code Version** 
Render pipeline: **Deffered**

## Custom Ramp Shading Models

![[Stylized Shading Model 08-22-50 2026-03-05.png|800]]

To port the [[PBR + NPR Rendering Research|PBR + NPR]] look I built in Unity to Unreal, I created a new shading model to handle the lighting calculations.

And this isn’t possible through the Epic Games Launcher, because it requires modifying the rendering pipeline.

Because we’re using Unreal’s deferred rendering pipeline to support Lumen, we can’t sample ramp textures as freely as in a forward renderer. Adding an extra GBuffer is expensive—let alone adding several. And without modifying the rendering pipeline, you can’t support multi-light ramp effects or change how the shadows behave.

To achieve this effect, besides modifying Lumen and direct lighting, I also set up a global Curve Atlas(256x256). Unreal will keep it loaded in memory at runtime so that different shading models can access it. (The idea behind this atlas is the same as the ramp-texture “compression” I mentioned “[[PBR + NPR Rendering Research#Unity渲染|here]].” It can store up to 256 ramp textures.)

![[Stylized Shading Model 08-31-11 2026-03-05.png|800]]

In this new Shading Model, we allow artists to use Color Curves as ramp texture to highly customize Unreal’s lighting behavior. As shown in the example, artists can use Color Curves to define the lighting responses, and even adjust the shadow color(You can see that the spheres in the image all have a white albedo, but the lighting on the material using the Stylized Shading Model is defined according to the color curve).

![[Stylized Shading Model 08-38-57 2026-03-05.png|800]]

To further demonstrate its support for multiple light sources, I chose a fairly extreme case. You can clearly see that it supports multiple light sources—this isn’t achievable without modifying the engine source code.