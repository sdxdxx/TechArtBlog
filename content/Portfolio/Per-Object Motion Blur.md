![[Per-Object Motion Blur 20260430010354.png|800]]

## Introduction
Per-Object Motion Blur is a post-process feature that applies motion blur only to selected objects, such as characters, vehicles, or fast-moving gameplay elements. It uses Custom Depth / Stencil to isolate target objects and the Velocity Buffer to generate the blur direction.

## Demo
Character comparison with and without Per-Object Motion Blur
![[Per-Object Motion Blur 20260430010354.mp4|800]]

Practical example: using Per-Object Motion Blur on a car to emphasize power and speed
![FIEA AMD GameLab 2026](https://youtu.be/E2KztyhhCx4)

## General Implementation Approach

![[Per-Object Motion Blur 20260430010358.png|Single-object mask implementation|800]]

The single-object mask is implemented with Custom Depth and Custom Stencil.  
  
I first use the Stencil Value to mark objects that need Per-Object Motion Blur enabled. Then, during post-processing, I combine Scene Depth and Custom Depth to determine visibility, preventing occluded areas from being incorrectly included in the mask.  
  
To make the motion blur extend more naturally around object edges, I also apply a screen-space edge expansion to the mask and use smooth weighting to control the transition.

![[Per-Object Motion Blur 20260430010921.png|Motion blur implementation|800]]

The motion blur pass is mainly based on the Velocity Buffer.  
  
The post-process material calculates the screen-space motion direction from the target pixel's velocity, then samples Scene Color multiple times along that direction and accumulates the result to create a trailing effect.  
  
The final blur result is applied only within the previously generated single-object mask, making it possible to apply Per-Object Motion Blur only to specified characters, vehicles, or dynamic objects.
