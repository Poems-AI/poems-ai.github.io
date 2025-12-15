# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Poetry+AI=Art** is a multimedia art project combining poetry, AI-generated visuals, and interactive experiences. The project is a GitHub Pages static site showcasing the work of poet Marcos de la Fuente with AI visualizations and interactive installations.

## Development Commands

Run local development server:
```bash
npx live-server
```

## Architecture

### Bilingual Structure
- `index.html` - Language detector that redirects to `index.en.html` or `index.es.html` based on browser language
- All major pages have English (`_en.html`) and Spanish (`_es.html`) versions
- Main entry points: `index.en.html` and `index.es.html`

### Project Organization

**Main Pages:**
- `digital_poet_en.html` / `digital_poet_es.html` - Digital Twin/avatar project with AI-generated poem visualizations
- `NFTs_collection.html` / `NFTs_collection_es.html` - NFT collections from poems
- `thebrain.html` / `thebrain_es.html` - Interactive AI poem generation
- `gallery.html` - Photo gallery of events
- `prensa.html` - Press coverage

**Interactive Visualizations** (`vis*.html` files):
- Each visualization (vis1-vis8) displays AI-generated visuals paired with specific poems
- Use p5.js for rendering
- Poems loaded from `poems/` directory (`.txt` and `.AI.txt` files)

**Books Section:**
- `books/el_poeta_vs_la_maquina/` - Interactive book with QR code chapters (numbered folders 0-11, plus _10 and _12)
- Each chapter has its own `index.html` and assets

### Source Files (`src/`)

**Core Visualization Scripts:**
- `generate_text.js` - Face detection with ml5.js FaceAPI, overlays poem text on detected face landmarks
- `generate_text_v2.js` - Alternative text generation with face tracking
- `ml.js` - ml5.js CharRNN text generation interface with user input
- `controller.js` - Main controller for interactive poem experiences
- `camera.js` - Camera/video capture utilities
- `poemap.js` - Poem mapping and visualization
- `tree.js` - Tree-based visualization structure
- `network.js` - Network graph visualization
- `interact.js` - User interaction handlers
- `view6.js`, `view7.js` - Specific visualization views
- `wall.js` - Wall/grid display patterns
- `pause.js`, `news.js` - Utility modules
- Screenshot utilities: `1screenshot.js` through `5screenshot.js` for capturing visualization states

### External Libraries

**JavaScript Libraries:**
- p5.js (`js/p5.min.js`) - Main creative coding framework
- p5.sound (`js/p5.sound.min.js`) - Audio processing
- p5.speech (`js/p5.speech.js`) - Text-to-speech
- p5.asciiart (`js/p5.asciiart.min.js`) - ASCII art rendering
- ml5.js (loaded from CDN) - Machine learning models for face detection and text generation
- Three.js (`src/three.r119.min.js`) - 3D graphics
- Vanta.js (`src/vanta.net.min.js`) - Animated backgrounds
- chromedetector.js (`js/chromedetector.js`) - Browser detection

**ML Models:**
- Face detection uses ml5.js FaceAPI with MobileNetV1 model
- Text generation uses CharRNN models stored in `models/es/` directory

### Static Assets

- `poems/` - Text files with original poems and AI-generated versions (`.txt` and `.AI.txt` suffixes)
- `images/` - Project images, logos, event photos
- `events/` - Event-specific images and promotional materials
- `video/` - Video content
- `ar/` - Augmented reality experiences
- `3d/` - 3D assets
- `font/` - Custom fonts

### Styling

- `css.css` - Main stylesheet
- `css_metaverse.css` - Metaverse/3D visualization styles
- `css_thebrain.css` - The Brain project styles
- `nft.css` - NFT collection page styles

## Key Patterns

**Poem Loading:**
- Poems are loaded using p5.js `loadStrings()` in `preload()`
- Files follow naming: `{poem_name}.{lang}.txt` for originals, `{poem_name}.{lang}.AI.txt` for AI-generated
- URL parameters specify which poem to load (e.g., `?poem=inimitables.en`)

**Visualizations:**
- Most visualizations run in fullscreen mode on click
- Use `windowResized()` to handle responsive canvas
- Frame rates typically set to 9-30 fps for performance
- Many use time-based word/text animation with `Date.now() / speed` pattern

**Face Detection Flow:**
- Initialize ml5.faceApi with video capture
- `modelReady()` callback starts detection loop
- `gotResults()` processes detections and draws landmarks
- Landmarks drawn on canvas with p5.js drawing functions
