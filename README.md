# BeyondCanvas
This project was developed by Lisa Welling as part of a graduation thesis at the Amsterdam University of Applied Sciences [2026].
## Tech Stack Overview

| Category         | Technology                          |
|------------------|-------------------------------------|
| Framework        | Vue 3 (Composition API)             |
| Build Tool       | Vite                                |
| Language         | TypeScript 6.0.2 + HTML                          |
| State Management | Pinia                               |
| Routing          | Vue Router                          |
| Styling          | CSS / Scoped CSS                    |
| Linting          | ESLint + OxLint + vueA11y           |
| Formatting       | Prettier                            |
| Asset Handling   | `/public` folder                    |
| Grid Generation  | Node script (`generateGridJson.ts`) |

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
    - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
    - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
    - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
    - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Quick hosting on local IP for Development

```sh
npm run dev-host
```

### Compile and Minify for Production
If you merge to main, a CICD pipeline will automatically start, with the jobs listed in the `Beyondcanvas/github/deploy.yml` file. 

```sh
git checkout main
git merge develop
git push origin main
git checkout develop
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Code format with [Prettier](https://prettier.io/)

```sh
npm run format
```
## Naming Conventions

| Item              | Convention               | Example                  |
|-------------------|--------------------------|--------------------------|
| Vue Components    | PascalCase               | PaintingGrid.vue         |
| Views             | PascalCase               | RowersView.vue           |
| Functions         | camelCase                | generateGridJson()       |
| Stores             | camelCase + `use` prefix | useGridVisibilityStore() |
| Files in /scripts | camelCase                | generateGridJson.ts      |
| Types             | PascalCase               | Grid, Painting, GridCube |
| Utils             | camelCase                | audioFade.ts, zoneHelper.ts |    


## Grid generation Workflow

This script generates a complete Grid object (in JSON) based on a painting and an AI-generated label map. Use this when
you want to add a new painting to BeyondCanvas.

### Put painting image in public folder
Put the painting as an img in the public/assets/images directory.

### Generate Labels with AI
Use [Claude](https://claude.ai/new) to generate a JSON with labels for gridcubes based on the following prompt:

```
Describe this painting in 280 short labels (no sentences), in a [width px size, heigt px size] grid.
Use exact coordinates (x,y).
Use only categories such as: water, leaves, tree, sky, boat, person, clothing, wood, grass, reflection, shadow, wind, food, drink, dog, animal.
Return the result as JSON.
```

Put the painting as an attachment to the prompt. Also adjust the size of the painting in the prompt. in pixels, because the `generateGridJson.ts` script also works with pixel measurements.
Always check if the generated labels by Claude correspond with the contents of the cube.
E.g if a cube is mostly water, it would not make sense if the generated label is `leaves` adjust this accordingly. You can use the `DebugGrid.vue` to see all the cubes which overlap onto the painting, with corresponding x and y coordinates. 

To use the `DebugGrid.vue` component, adjust the follwing code in `PaintingView.vue`:

```Vue
  <GridComponent :grid="grid" />
```
Becomes
```Vue
  <DebugGrid :grid="grid" />
```
And 
```Vue
import GridComponent from '@/components/GridComponent.vue'
```
Becomes
```Vue
import DebugGrid from '@/components/DebugGrid.vue'
```
Put the original `GridComponent` back once you've finished checking the cubes.

### Results in JSON format

Make sure the labels are in English and in this format:

```
[
  {
    "x": 0,
    "y": 0,
    "label": "sunshade"
  }
 ] 
```

### Adjust generateGridJson script
Put the generated LabelJSON of the painting in the data directory.
Import said LabelJSON in the generateGridJson file as a normal path not as Vue path with @.
Adjust const paintingPath to the path of the painting in generateGridJson, also normal path.
Add Labels which don't exist yet in the audioMap const. Put the sounds which correspond to the labels in the same
audioMap record.

Adjust the generation const to the specifics of the painting.
Adjust the `writingFileSync` line to a new name specific for that painting.

### Run generateGridJson script
Run the following command to create the gridJSON:

```sh
 npx tsx src/scripts/generateGridJson.ts
```



