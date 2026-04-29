# BeyondCanvas

This template should help get you started developing with Vue 3 in Vite.

## Tech Stack Overview

| Category         | Technology                          |
|------------------|-------------------------------------|
| Framework        | Vue 3 (Composition API)             |
| Build Tool       | Vite                                |
| Language         | TypeScript                          |
| State Management | Pinia                               |
| Routing          | Vue Router                          |
| Styling          | CSS / Scoped CSS                    |
| Linting          | ESLint (Flat Config)                |
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

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Code format with [Prettier](https://prettier.io/)

```sh
npm run format
```

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

Put the painting as an attachment to the prompt.

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
Adjust the writingFileSync line to a new name specific for that painting.

### Run generateGridJson script

Run the following command to create the gridJSON:

```sh
 npx tsx src/scripts/generateGridJson.ts
```
NOTE: This will delete all of the importantcubes, save previous JSON files.

## Naming Conventions

| Item              | Convention               | Example                  |
|-------------------|--------------------------|--------------------------|
| Vue Components    | PascalCase               | PaintingGrid.vue         |
| Views             | PascalCase               | RowersView.vue           |
| Functions         | camelCase                | generateGridJson()       |
| Composables       | camelCase + `use` prefix | useGridVisibilityStore() |
| Files in /scripts | camelCase                | generateGridJson.ts      |
| Types             | PascalCase               | Grid, Painting, GridCube |



