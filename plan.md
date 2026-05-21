# Implementation Plan - MagicToon AI

MagicToon AI is a mobile-web application designed to help users create viral kids' YouTube Shorts using AI. The app will guide users through story generation, image creation, narration, and scene assembly.

## Scope Summary
- **Story Generator**: AI-driven prompts for kid-friendly story ideas.
- **Image/Scene Creator**: Tools to generate or select cartoon-style visuals.
- **Audio & Subtitles**: Text-to-speech for narration and automated subtitle generation (simulated/mocked).
- **Video Assembly**: A simple timeline/scene editor to combine images, audio, and text.
- **Export**: One-click "export" (simulated as a video preview/download).
- **Design**: Colorful, kid-friendly UI using Tailwind CSS.

## Non-Goals
- Real-time video rendering on a server (will use client-side assembly/preview).
- Real AI API integration (will use mock responses or local state unless specific keys provided).
- Native mobile deployment (this is a mobile-responsive web app).

## Assumptions & Open Questions
- **Assumption**: Persistence will be handled via `localStorage`.
- **Question**: Are there specific AI APIs (OpenAI, Replicate) to be integrated? *Plan assumes mocks for now, easily replaceable with API calls.*

## Affected Areas
- **Frontend**: All UI components, story builder, scene editor, and video preview.
- **State Management**: React state and `localStorage` for project saving.
- **Assets**: Colorful icons and kid-friendly font choices.

---

## Ordered Phases

### Phase 1: Foundation & Theme (frontend_engineer)
- Set up the colorful, kid-friendly theme in `tailwind.config.ts` or `index.css`.
- Create a basic layout with a mobile-first navigation.
- Implement a "Project Dashboard" to view and create new stories.

### Phase 2: Story Generator (frontend_engineer)
- Build a wizard-style interface to prompt for story themes (e.g., "Space Adventure", "Magic Forest").
- Create a mock AI service that returns story scripts divided into scenes.
- Allow users to edit the generated script.

### Phase 3: Scene Editor & Visuals (frontend_engineer)
- Implement a scene-by-scene editor.
- Add an "Image Generator" UI (mocking the generation process with placeholder cartoon images).
- Allow users to upload their own images or choose from a library.

### Phase 4: Audio & Subtitles (frontend_engineer)
- Add a text-to-speech preview for each scene (using Web Speech API).
- Implement a subtitle overlay editor for each scene.
- Add sound effect selection (mock library).

### Phase 5: Video Assembly & Export (frontend_engineer)
- Create a "Preview" mode that plays scenes sequentially with audio and subtitles.
- Implement the "Export" flow (generate a manifest or simulated download).
- Final UI polish (animations, transitions).

### Phase 6: Quick Fixes & Refinement (quick_fix_engineer)
- Fix any UI glitches or alignment issues.
- Update text/copy for better kid-friendliness.
- Ensure responsive behavior on small screens.

---

## Sequencing Constraints
- Phase 1 must be completed before functional modules.
- Phase 2 (Story) provides the data structure for Phase 3 (Scenes).
- Phase 5 (Assembly) depends on all previous content being available.
