---
title: Genshin-Inspired Character Rendering
description: A stylized Unity URP character rendering pipeline built around Light Maps, Shadow Ramps, face SDF shading, skin scattering, MatCaps, depth rim lighting, outlines, and per-object shadows.
---

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731024605.mp4|800]]

This pipeline is based on the `Light Map + Shadow Ramp` approach commonly used for Genshin Impact characters. It preserves the layered structure of toon shading while adding ambient lighting, skin scattering, rim lighting, and character shadows. Rather than pursuing strict PBR energy conservation, I distribute diffuse and specular contributions by material semantics so the character retains a stable art direction across different lighting environments.

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731024644.mp4|800]]

## 1. Character Rendering Data

### 1.1 Mesh and Material Separation

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731034858/原神-渲染方案·改-浅析-20260731034858.excalidraw.md|800]]

The body, hair, and accessories share the standard character shader, while the face and front hair are handled separately. Standard materials mainly read the Albedo, Normal, Light Map, and Shadow Ramp textures, with MatCaps providing additional metallic and environmental highlights. The face uses a dedicated Face Light Map, while the front hair writes to an additional depth texture used to cast the fringe shadow onto the face.

The base diffuse term is not standard Lambert. I first use Half-Lambert to produce a continuous lighting response, then remap it through a ramp into controllable toon shading bands.

### 1.2 Light Map Channels and Material Classification

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/Drawing 2026-07-31 04.00.08/Drawing 2026-07-31 04.00.08.excalidraw.md|Light Map|800]]

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/Drawing 2026-07-31 04.08.32/Drawing 2026-07-31 04.08.32.excalidraw.md|Specular Layer|800]]

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/Drawing 2026-07-31 04.15.59/Drawing 2026-07-31 04.15.59.excalidraw.md|Ramp ID|800]]

The standard character Light Map stores both lighting parameters and material classification data:

| Channel | Data |
| --- | --- |
| R | Specular exponent layer: Low, Mid, High, Metal |
| G | AO |
| B | Specular intensity |
| A | Ramp ID: Hard, Soft, Metal, Silk, Skin |

The `A` channel selects a row from the Shadow Ramp. The `R` channel selects the highlight shape and also contributes to metallic-region detection. I also combine `A` and `R` to derive three semantic masks - Hair, Skin, and Other - which are shared by the skin, outline, and rim-light systems. This avoids authoring a separate mask for every effect.

The face does not use this Light Map layout. Its `R` channel stores the diffuse shadow threshold, while `G/B` store the thresholds at which specular highlights enter and leave. There is no AO term on the face; its shadow shape is driven primarily by SDF data.

## 2. Lighting

### 2.1 Overall Lighting for Metallic and Non-Metallic Materials

The final color combines main-light direct lighting, additional lights, ambient lighting, and depth-based rim lighting. External shadows are then applied once at the end. As a result, cascaded shadows do not alter the internal Ramp, SDF, or skin-scattering calculations; they only darken the combined result.

Non-metallic materials retain their full diffuse contribution and take the stronger result between the Blinn highlight and an additional view-facing highlight. Metallic regions reduce diffuse to a fixed ratio and take the stronger result between the Blinn highlight and the Metal MatCap. This is a stylized, image-oriented energy budget rather than a direct sum of every highlight, which helps prevent overexposure and visual clutter on metal.

### 2.2 Direct Diffuse

#### 2.2.1 Standard Materials: Half-Lambert, AO, and Shadow Ramps

For standard materials, I first calculate Half-Lambert lighting from the main-light direction. AO participates in the self-shadowing decision, after which an adjustable threshold and smoothing range produce `shadowValue`. The Light Map's Ramp ID then selects the corresponding material row, with an additional blend between day and night ramps.

The ramp reorganizes the value and hue relationships between the lit and shadowed versions of the Albedo; it does not replace the material itself. A global intensity control can therefore still balance the original texture against the toon shadow.

#### 2.2.2 Face: SDF Shadows, Day/Night Direction, and Fringe Projection

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731031733/原神-渲染方案·改-浅析-20260731031733.excalidraw.md|800]]

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731024644.mp4|800]]

The face does not use the mesh's $\mathbf{N}\cdot\mathbf{L}$ to determine its primary shadow. Instead, I transform the effective main-light direction into head-local space and project it onto the horizontal plane. Depending on whether the light enters from the left or right, the Face Light Map is mirrored, and its `R` channel is compared against the horizontal light angle to produce a stable SDF face shadow.

The FrontHair pass writes to a screen-space depth texture. The face samples this texture with an offset along the main-light direction to generate the fringe projection. That result is multiplied by the SDF shadow, so the fringe still participates in the face ramp and the later skin-scattering pass. During day/night transitions, the face SDF, fringe projection, and Skin LUT all share the same effective main-light direction, preventing the three effects from drifting apart.

### 2.3 Direct Specular

#### 2.3.1 Standard Materials: Layered Non-Metal Highlights, Hair Highlights, and Metal MatCap

The Light Map's `R` channel discretizes the specular exponent into four layers: `5 / 10 / 15 / 20`. A narrow Smoothstep range then converts the Blinn-Phong response into clearly defined toon highlight shapes. Non-metallic materials also calculate a view-facing highlight from $\mathbf{N}\cdot\mathbf{V}$ and take the maximum of the two. Hair retains a weaker highlight floor so that it does not lose all gloss as the viewing angle changes.

For metals, the direct highlight comes from both an enhanced Blinn term and the Metal MatCap, but only the stronger of the two is used instead of adding them together. The final highlight remains controlled by the Light Map's `B` channel, main-light shadowing, and Albedo tinting.

#### 2.3.2 Face: Face Light Map-Driven Highlight Regions

The Face Light Map's `G/B` channels describe the angular thresholds at which a highlight appears and disappears. They use the same horizontal lighting factor as the SDF, allowing the highlight region to rotate with the light without being disturbed by the nose, eye sockets, or other local mesh normals. The face keeps only this basic direct highlight and does not receive the Metal MatCap or the additional view-facing highlight.

### 2.4 Indirect Diffuse

#### 2.4.1 Standard Materials: SH, AO, and Ambient Intensity

Indirect diffuse uses URP's spherical harmonics lighting, multiplied by Albedo, AO, the material's diffuse weight, and a global ambient-light intensity. Its purpose is not to change the main light's toon bands, but to fill backlit regions so the character does not collapse to black under less-than-ideal lighting.

#### 2.4.2 Face: Cylindrical Flattened Normals for Stable Ambient Lighting

Sampling SH with the face's original geometric normals would introduce local light and dark patches around the nose and eye sockets that conflict with the SDF shadow. Instead, I construct a cylindrical normal from the horizontal vector between each pixel and the head's center axis, then use it for ambient diffuse on the face. This retains the turning of the cheeks while keeping the front of the face clean and stable.

### 2.5 Indirect Specular

#### 2.5.1 Standard Materials: Non-Metal and Metal MatCap Reflections

Rather than using full probe-based IBL, the standard material samples separate MatCaps for non-metals and metals. MatCap UVs are generated by transforming the normal into view space, then controlled by the metallic mask, specular intensity, AO, and global ambient-light intensity. This produces stable environmental highlights that are easy to art-direct and better aligned with the project's toon rendering goals.

#### 2.5.2 Face: No Ambient Specular MatCap

The face currently keeps only ambient diffuse and does not sample an Ambient Specular MatCap. This prevents view-space highlights from disrupting the clean read of the facial features. Its form is instead carried by the SDF, direct highlight, and skin effects.

### 2.6 Skin and Subsurface-Scattering Enhancement

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731010945 2/原神-渲染方案·改-浅析-20260731010945.excalidraw.md|800]]

Adding a subsurface-scattering enhancement gives the skin noticeably more depth and keeps it from looking flat.

#### 2.6.1 Body Skin: Pre-Integrated Skin LUT

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731011503/原神-渲染方案·改-浅析-20260731011503.excalidraw.md|Pre-Integrated Skin LUT|500]]

The original Ramp Diffuse looked too flat on skin, so I add Pre-Integrated Skin shading in Skin regions. The LUT's horizontal axis comes from $\mathbf{N}\cdot\mathbf{L}$. Its vertical axis uses `fwidth` to estimate curvature dynamically from normal and position variation, eliminating the need for an additional curvature texture.

To approximate the different diffusion distances of different wavelengths, the RGB channels use different degrees of smoothing between the normal-mapped normal and the geometric normal. I sample the LUT for each channel and recombine the result. After adding the scattering contribution to the original Ramp Diffuse, I apply an overall energy compression and clamp the result to `0-1`. This preserves the warm diffusion around the light-shadow boundary without making the skin appear emissive.

#### 2.6.2 Face Skin: Pre-Integrated Skin and Fresnel-Based Fake SSS

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731015043 2/原神-渲染方案·改-浅析-20260731015043.excalidraw.md|SSS Texture|800]]

The face uses two layers of skin enhancement. Pre-Integrated Skin calculates $\mathbf{N}\cdot\mathbf{L}$ with the cylindrical normal, estimates curvature with the original geometric normal, and includes the fringe projection in the LUT's horizontal coordinate. The second layer follows an approach inspired by Arknights: Endfield: a Face SSS texture controls view direction, edge range, and intensity, while a Fresnel weight tints the Albedo toward a flesh tone around the side of the face.

The first layer improves scattering around the light-shadow boundary, while the second adds view-dependent contour definition. Together they reduce the skin-tone mismatch between the face and body.

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/Drawing 2026-07-31 04.49.36/Drawing 2026-07-31 04.49.36.excalidraw.md|800]]

### 2.7 Depth-Based Rim Lighting

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731022659/原神-渲染方案·改-浅析-20260731022659.excalidraw.md|Depth Rim|800]]

The depth-based rim light offsets the screen UV along the normal direction and compares the linear depth at the current and offset positions to locate the character silhouette. I multiply the result by a conventional Fresnel term so the rim transitions naturally from front-facing to grazing angles instead of appearing as a hard, uniform bright edge.

Standard materials select separate colors and widths for Hair, Skin, and Other. The Fresnel exponent reuses the specular layers stored in the Light Map's `R` channel. The face always uses the Skin parameters and the cylindrical normal. Rim lighting is added directly as a final fill contribution and is not multiplied by Albedo.

### 2.8 Simplified Additional Lights

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731042902.png|Additional Lights|800]]

Additional lights do not repeat the main light's complete Ramp, Face SDF, fringe projection, or MatCap evaluation. Instead, they use squared Half-Lambert diffuse and standard Blinn-Phong specular. Each light retains its color, distance attenuation, and spot attenuation before the total is multiplied by a global additional-light intensity.

Standard materials use the normal-mapped normal. The face continues to use the cylindrical normal, and its diffuse contribution uses the Albedo after fake-SSS tinting. This supports local scene lights without allowing several stylized shadow systems to interfere with one another.

## 3. Outline System

The outline uses an Inverted Hull pass: the mesh is expanded along smoothed normals, front faces are culled, and the back faces are rendered. Vertex color `RGB` stores the smoothed normal in tangent space. I reconstruct it through the TBN basis, transform it into view space, and expand the vertex along the normal's screen-space direction.

Outline width is adjusted in bands according to FOV and camera distance. `UV1.y` controls local width, while `UV1.x` controls local depth offset. Colors reuse the Hair, Skin, and Other semantic masks, with the face always using the Skin color. This keeps the line width stable across distance while allowing it to harmonize with each material's base color.

## 4. Character Shadowing

The character can receive URP's main-light cascaded shadows, but those shadows do not feed into the Ramp, SDF, fringe projection, or SSS. They darken the final color only after all lighting has been combined, so they express occlusion by the environment without breaking the character's internal toon bands.

The character does not provide a conventional `ShadowCaster` pass. Instead, a dedicated `PerObjectShadowCaster` writes into a separate shadow atlas. Custom Lit materials in the environment sample this atlas during main-light direct lighting, while the character shader itself never samples the per-object shadow. This separation preserves the character's cast shadow on the environment without introducing unstable or overly heavy self-shadowing into the standard cascaded shadow map.

## 5. Face Light Map Sequence Generator

The face SDF needs to compress the shadow and highlight changes from multiple lighting angles into a single texture. I built a generator with a Compute Shader and the Jump Flood Algorithm. It accepts a set of binary frames captured at discrete angles, generates a signed distance field, and then calculates the transition thresholds between adjacent frames.

The resulting texture stores the facial shadow threshold in `R`, with the highlight entry and exit thresholds in `G/B`. At runtime, the shader only needs to sample the texture and compare those thresholds against the horizontal light angle. This continuously reconstructs the original discrete shadow and highlight changes while avoiding CPU-side per-pixel processing during generation.

![[Assets/NoteAssets_Genshin-Inspired Character Rendering/原神-渲染方案·改-浅析-20260731045146.png|500]]
