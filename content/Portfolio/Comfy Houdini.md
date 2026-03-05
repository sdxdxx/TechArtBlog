---
title: Comfy Houdini
description: AI-assisted Houdini workflow (WIP).
---
## Demo Video

![Comfy Houdini (Houdini + ComyUI + Hunyun3D 2.1)](https://www.youtube.com/watch?v=Tnealo-WuqU&t=9s)

## What I Built

- A Houdini-centered AI-assisted PCG workflow that connects Houdini, ComfyUI, and Hunyuan3D 2.1 into one pipeline.  
- A local, self-hosted setup where both ComfyUI and Hunyuan3D run on my machine (no cloud dependency).  
- A COP-based integration layer (Houdini 21) that leverages the new COP system for fast iteration and easier AI-driven texture/image workflows.  
- A remote-network API bridge that lets Houdini trigger ComfyUI/Hunyuan3D jobs on demand.  
- A “personal AI render farm” workflow: queued generation runs locally but can be invoked remotely through the API for flexible iteration.

## Workflow / Pipeline

![[Comfy Houdini 20260305162543.png|800]]


## Comfy Houdini Nodes Family

![[Comfy Houdini 20260305162634.png|800]]



