## Preview
![[Palette Analyzer 20260430015040.png|Preview|800]]

## Introduction
**Palette Analyzer is a color picking and palette analysis tool designed for artists.**  
Artists can directly drag in a reference image or texture, and the tool automatically analyzes the main colors in the image, generates a usable palette, and provides HEX and RGB values that can be easily copied into an engine, shader, UI, or documentation.

![[Palette Analyzer 20260430015100.png|Exported Palette Image|500]]

## Demo
![[Palette Analyzer 20260430022225.mp4|800]]

## Implementation Overview
Palette Analyzer's core color extraction is built on the Python third-party library `modern_colorthief`. On top of that, I added my own image preprocessing and color post-processing workflow, using `NumPy` to batch-process pixel data and improve runtime performance. The preprocessing step mainly handles transparent pixels, format validation, and analysis image generation. The post-processing step remaps the colors extracted by the library back to real visible colors that exist in the original image, while filtering out colors that are too similar. This makes the final palette cleaner, more stable, and easier for artists to use directly in shaders, UI, or style references.

## Usability Feedback
After testing the tool with multiple artists, the feedback was that the workflow is simple and intuitive enough to use without any documentation. Artists could quickly import images, extract palettes, copy color values, and export palette references, which validates the tool’s goal as a fast and artist-friendly workflow helper.