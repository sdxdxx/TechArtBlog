---
area: Technical Art
tags:
  - note
---

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045217.png|800]]

## Preface

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218.png|800]]

This is a **subjective reverse‑engineering / reconstruction** article, for learning and discussion purposes only.  

Model assets are from the official Girls' Frontline 2 (GFL2) account on [PlayBox](https://www.aplaybox.com/). Other texture assets come from GitHub and the internet.  

Reference materials are collected from the internet. If there is any infringement, please contact me to remove them.

Unity version: **2022.3.62f2**  
Render pipeline: **URP**

## In‑game Screenshot References

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-1.png|GFL2 screenshot reference|800]]

## Clothing & Body Skin Rendering (Base)

In terms of textures, clothing and (body) skin use the same texture set—the only difference is the **Ramp Texture**. Below I use clothing as the example.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-2.png|Normal / RMO / Diffuse|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-3.png|Ramp Texture (Cloth)|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-4.png|Ramp Texture (Skin)|800]]

The first three images are a standard PBR workflow:

- Normal Map  
- RMO Map  
	- R: Roughness  
	- G: Metallic  
	- B: Ambient Occlusion  
- Diffuse Map  

The key question is: **what do the four rows in the Ramp Texture represent?**  
Based on other Tech Artists’ research plus my own investigation, I believe the four rows correspond to:

- Ramp Texture  
	- Row 1: Additional Direct Light Shadow Ramp (Direct Diffuse $N \cdot L + \text{Shadow}$ ramp)  
	- Row 2: Env Specular Ramp (IBL $N \cdot V$ ramp)  
	- Row 3: Main/Additional Light Specular Ramp (Direct Specular $N \cdot L$ ramp)  
	- Row 4: Main Direct Light Shadow Ramp (Direct Diffuse $N \cdot L + \text{Shadow}$ ramp)  

Combining the BRDF rendering equation with IBL, the analysis suggests using the Ramp Texture to “ramp” the shading term:

$$
L_o(\omega_o) = \int_{\Omega} \left( \frac{c_{diff}}{\pi} + \frac{DFG}{4 \cos\theta_i \cos\theta_o} \right) L_i(\omega_i) \cos\theta_i d\omega_i
$$

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-5.png|Ramp BRDF|800]]

I also added a **Matcap** term for metal and cloth and injected it into the **IBL specular / environment rim** contribution. This not only enriches the perceived environment lighting when no light probes are available, but also helps the character feel a bit more “alive.”

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-6.png|Metal Matcap | 500]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-7.png|Satin Matcap|500]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-8.png|Matcap Env Rim|800]]

Note: the SSS look is clearly baked into the Ramp Texture, so clothing and skin can be rendered together.

## Stockings Rendering

Stockings are mostly rendered the same way as clothing—the main difference is in the specular calculation.  
Like hair, due to their physical structure, stockings produce **anisotropic highlights**. In the reference, you can clearly see a stretched / streaky highlight. So here I do not use standard isotropic GGX; instead I use **anisotropic GGX**.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-9.png|Stocking Reference]]

``` hlsl
// ---- GetAnisoAxes(roughness, anisotropy, ax, ay) ----  
float anisoAbs = saturate(abs(anisotropy)); // Intensity [0,1]
float aspect = sqrt(max(1.0 - 0.9 * anisoAbs, 0.0001));  

float ax = max(0.0001, lerpRoughness / aspect);  
float ay = max(0.0001, lerpRoughness * aspect);  

if (anisotropy < 0.0)  
{  
    float tmp = ax;  
    ax = ay;  
    ay = tmp;  
}  

// ---- D_GGX_Aniso(N,T,B,H,ax,ay) ----  
float ax2 = ax * ax;  
float ay2 = ay * ay;  
float denom = (HoT_raw * HoT_raw) / ax2 + (HoB_raw * HoB_raw) / ay2 + (NoH * NoH);  
float D = 1.0 / (PI * ax * ay * denom * denom);  

// ---- G_SmithGGX_Aniso(N,T,B,V,L,ax,ay) ----  
// G1(V)  
float G1V;  
{  
    if (NoV_raw <= 0.0)  
    {  
        G1V = 0.0;  
    }  
    else  
    {  
        float NoV2 = max(NoV_raw * NoV_raw, 0.000001);  
        float t = ax2 * (VoT_raw * VoT_raw) + ay2 * (VoB_raw * VoB_raw);  
        float lambda = (sqrt(1.0 + t / NoV2) - 1.0) * 0.5;  
        G1V = 1.0 / (1.0 + lambda);  
    }  
}  

// G1(L)  
float G1L;  
{  
    if (NoL_raw <= 0.0)  
    {  
        G1L = 0.0;  
    }  
    else  
    {  
        float NoL2 = max(NoL_raw * NoL_raw, 0.000001);  
        float t = ax2 * (LoT_raw * LoT_raw) + ay2 * (Lob_raw * Lob_raw);  
        float lambda = (sqrt(1.0 + t / NoL2) - 1.0) * 0.5;  
        G1L = 1.0 / (1.0 + lambda);  
    }  
}  

float G = G1V * G1L;  

// ---- Fresnel ----  
float3 F0 = lerp(kDielectricSpec.rgb, Albedo, metallic);  
float3 F  = F0 + (1 - F0) * pow((1 - HoV), 5);  

float3 SpecularResult = (D * G * F) / (4 * NoV * NoL);  

half3 specRamp = SAMPLE_TEXTURE2D(_RampTex, sampler_RampTex, float2(NoL, 0.4)).rgb;  
float3 specColor = SpecularResult * lightCol * specRamp * PI;
```

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-10.png|Stockings Anisotropic Specular|800]]

Stockings also typically have a bit of “see‑through skin” feel. In GFL2, this appears to be baked directly into the Diffuse texture.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-11.png|Stockings|800]]

## Hair Rendering

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-12.png|Specular Mask / Albedo|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045218-13.png|Ramp Texture (Hair) |800]]

Hair uses three textures:

- Specular Mask
- Diffuse Map
- Ramp Texture

The Specular Mask is mainly for the hair anisotropic highlight that forms an “angel ring.”

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219.png|Hair Ref|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-1.png|800]]

Hair uses UV0 to sample Diffuse, and UV1 to sample Specular.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-2.png|Hair UV0|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-3.png|Hair UV1|800]]

Flattening/straightening hair in UV1 makes it easy to slide the texture. We compute an offset based on the camera’s vertical viewing angle, then vertically scroll the highlight Mask on the flattened UV. Because the UV is laid out along the hair flow, the texture scroll looks like the highlight moving up/down along the strands, which better mimics real hair specular behavior.

``` hlsl
//Specular Mask  
float anisotropicOffsetV = -vDirWS.y* _AnisotropicSize+ _AnisotropicOffset;  
float2 specMaskUV = (i.uv1+float2(0,anisotropicOffsetV))*_SpecMask_ST.xy+_SpecMask_ST.zw;  
float3 specularMask = SAMPLE_TEXTURE2D(_SpecMask,sampler_SpecMask,specMaskUV).r * _SpecTint.rgb;
```

Since this hair highlight is already not very “physical,” I did not use GGX for it. Instead I used **normalized Blinn‑Phong** (lower cost):

$$
\text{Shininess} = \frac{2}{\text{Roughness}^4} - 2
$$
	
$$
Specular_{norm} = \frac{\text{Shininess} + 8}{8\pi} \times \text{pow}(N \cdot H, \text{Shininess})
$$

Result:

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219.gif|800]]

## Face Rendering

### Face
![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 04-57-55 2026-03-05.png|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 04-58-28 2026-03-05.png|800]]

The face mainly uses the following textures:

- SDF Map  
	- R: Face Diffuse Shadow SDF  
	- G: Face Specular SDF 1  
	- B: Face Specular SDF 2  
	- A: Face Mask  
- Diffuse Map  
- Ramp Texture  

The most important one is the SDF map.

Why use a face SDF map? In Japanese anime, facial lighting/shadows are often simplified, and physically correct lighting tends not to fit.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 04-59-16 2026-03-05.png|800]]

What matters most is how the RGB channels in the SDF map are used.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 04-59-35 2026-03-05.png|800]]

This SDF texture is essentially a **shadow/specular spread threshold map**. It abandons the engine’s default real‑time facial normal lighting and instead decides the shadow shape by reading texture values. When the light rotates, the shader compares the light direction with the grayscale values, producing a very clean, sharp, and fully art‑directable shadow edge.

The R channel stores the face diffuse shadow SDF; the G and B channels store the SDFs for specular on the nose tip and lips.

``` hlsl
//Face SDF  
float flatLightForward = dot(float2(0,1),normalize(lDirOS.xz));  
float sdfSmoothness = _SDFSmoothness;  
float sdfSmoothness_Fixed = saturate(1-flatLightForward)*sdfSmoothness;  
float faceSDF_R = smoothstep(sdf.r,sdf.r+sdfSmoothness_Fixed,flatLightForward)*step(0,lDirOS.x)*sdf.a;  
float faceSDF_L = smoothstep(sdf_reverse.r,sdf_reverse.r+sdfSmoothness_Fixed,flatLightForward)*step(lDirOS.x,0)*sdf_reverse.a; 
float faceSDF = saturate(faceSDF_L+faceSDF_R);

//Nose SDF  
float noseSDF_R = smoothstep(flatLightForward,flatLightForward+sdfSmoothness,sdf.g)*smoothstep(1-flatLightForward,1-flatLightForward+sdfSmoothness,sdf.b)*step(0,lDirOS.x);  
float noseSDF_L = smoothstep(flatLightForward,flatLightForward+sdfSmoothness,sdf_reverse.g)*smoothstep(1-flatLightForward,1-flatLightForward+sdfSmoothness,sdf_reverse.b)*step(lDirOS.x,0);  
float noseSDF = noseSDF_R+noseSDF_L;


half3 specRamp = SAMPLE_TEXTURE2D(_RampTex,sampler_RampTex,float2(noseSDF*nDotl,0.4)).rgb;
half3 shadowRamp = SAMPLE_TEXTURE2D(_RampTex,sampler_RampTex,float2(faceSDF*nDotl,abs(isAd-0.1))).rgb

```

Result:

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-1.gif|800]]

### Eye Rendering

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 05-00-05 2026-03-05.png|Model Eye|800]]

After separating the eye rendering in Maya, the eye is mainly composed of these five layers:

- Orange: Eyebrows
- Blue: Sclera (eye white)
- Green: Eyeball (a concave structure; parallax gives a “deep” look)
- Red: Eye highlight
- Yellow: Eye shadow

There are three main textures:

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-9.png|Eye Textures|800]]

- Texture 1: contains eye highlight and eye shadow information
- Texture 2: eyeball
- Texture 3: sclera + eyebrows (shared with the face Diffuse map)

Sclera, eyebrows, and eyeball can be rendered with a normal BSDF.  
The “depth” (parallax feel) of the eyeball comes from the concave geometry.

Eye highlight and eye shadow are layered using transparent materials.

In Unity shaders, the transparency blending formula is:

$$
C_{final} = (C_{source} \times Factor_{source}) + (C_{destination} \times Factor_{destination})
$$

Eye Specular uses **Blend One One**, so:

$$
C_{final} = C_{source} + C_{destination}
$$

Eye Shadow uses **Blend DstColor Zero**, so:

$$
C_{final} = C_{source} \times C_{destination}
$$

Result:

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-10.png|Final Eye|800]]

### Fringe Shadow (Bangs Shadow)

In Japanese anime illustrations and animation, fringe/bangs shadows are crucial. But if you look closely, these shadows are not fully physically accurate. Also, cascaded shadow maps usually don’t have enough resolution to produce a stable fringe shadow, so it’s difficult to achieve with cascades alone.

Following the ShadowMap idea, I render a dedicated **fringe depth map**, then apply a view‑dependent **screen‑space offset** when sampling. I compare it against the face depth with a depth test, producing a (pseudo) fringe shadow.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-11.png|Fringe Shadow Reference|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-12.png|Hair Depth Only Pass|800]]

``` hlsl
// Screen position (NDC)
float2 screenPos = i.screenPos.xy / i.screenPos.w;

// Target position offset by light direction; scales with camera distance
float2 hairOffset = _HairShadowWidth.xy * 0.01 / i.pos.w;
float3 lightDirViewSpace = TransformWorldToViewDir(_MainLightPosition);
half2 targetHairScreenPos = screenPos + lightDirViewSpace.xy * hairOffset.xy;

// Sample hair depth
float hairDepth = SAMPLE_TEXTURE2D(_HairShadowDepth, sampler_PointClamp, targetHairScreenPos).r;

// Hair shadow mask
float hairShadowRange = step(hairDepth, i.pos.z);
```

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-13.png|Fringe Shadow On/Off Comparison|800]]

## Outline

I use a BackFace outline method. The idea is simple; the difficulty is solving outline breaks.  
Two passes are rendered: the front‑face pass renders only front faces (normal shading), and the back‑face pass renders only back faces and extrudes vertices along normals, outputting only the outline color.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 05-00-44 2026-03-05.png|Default Normal VS Smoothed Normal|800]]

The key is that normals must be **smoothed**; otherwise you get broken outlines.  
But we don’t want “smoothed normals” to ruin lighting (e.g., the cube on the right changes its shading after smoothing).

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 05-01-11 2026-03-05.png|Default Normal VS Smoothed Normal (Outline)|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 05-01-26 2026-03-05.png|Vertex Color Normal|800]]

So I wrote a small Houdini tool that converts the smoothed normals into tangent space (like a normal map) and stores them in UV2 and UV3.  
(I did not store them in vertex color because vertex color precision is not sufficient.)

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 05-01-51 2026-03-05.png|800]]

I also computed (plus hand‑painted) a simple outline‑width weight based on curvature and thickness (black = 0, no modification; red = reduced). This mainly removes tiny details to prevent the result from becoming noisy, and also makes hair outlines look better (some gradient and seam‑artifact cleanup).  
I stored this outline width weight in the **A channel** of vertex color.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045219-18.png|Outline|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045220.png|Outline|800]]

## PerObject Shadow

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045220-1.png|PerObject Shadow|800]]

PerObjectShadow is a “character‑dedicated shadow” feature I built in Unity to obtain higher‑quality character shadows. The scene still uses Unity’s built‑in cascaded shadows, but for key characters I allocate an extra, higher‑resolution and more stable local shadow map dedicated to the character. This improves shadow edge clarity, detail reliability, and close‑up quality—without pushing the entire scene’s shadow cost to the maximum.

The principle is the same as ShadowMap, but scoped to the target mesh’s bounding box to render an extra shadow map (as shown by the additional virtual light camera projection matrix). The biggest advantage is that the main character always gets a high‑resolution shadow map, and it effectively breaks through Unity’s built‑in cascaded shadow resolution limit (4096) in terms of per‑character shadow precision.

Because this is toon rendering, I personally don’t want the PCSS soft‑transition look, so I use **pre‑integrated Poisson disk + PCF filtering**.

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045220.mp4|800]]

![[Subjective Rendering Reconstruction Analysis in Girls' Frontline 2 20260305045220-2.png|Final|800]]

## Reference Links

[少女前线2：追放 vepley角色渲染分析还原](https://zhuanlan.zhihu.com/p/663968812)  
[二次元角色卡通渲染—面部篇](https://zhuanlan.zhihu.com/p/411188212)
