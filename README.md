# Match Words - Language Learning Game

A Vue.js application built with Feature-Sliced Design (FSD) methodology for practicing English-Russian word matching.

## Features

- **File Upload**: Upload text files with word pairs in "english - russian" format
- **Interactive Matching Game**: Match English words with their Russian translations
- **Progress Tracking**: Real-time scoring and accuracy tracking
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Architecture**: Built following FSD methodology

## Project Structure

```
src/
├── app/                 # Application layer
│   ├── App.vue         # Root component
│   ├── main.ts         # Application entry point
│   └── router.ts       # Vue Router configuration
├── entities/           # Business entities
│   └── word/           # Word entity
│       └── model/      # Word store (Pinia)
├── features/           # Feature implementations
│   ├── match-test/     # Matching game feature
│   └── upload-words/   # File upload feature
└── shared/             # Shared resources
    ├── lib/            # Utility functions
    └── ui/             # Reusable UI components
```

## Technology Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for development and building

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the provided localhost URL

### File Format

Upload a text file with word pairs in the following format:
```
apple - яблоко
cat - кот
dog - собака
house - дом
```

Each line should contain one English word, a hyphen separator, and one Russian word.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Game Rules

1. Upload a text file with English-Russian word pairs
2. Click on English words and their corresponding Russian translations
3. Correct matches will be highlighted in green
4. Track your progress with the real-time scoring system
5. Complete all matches to finish the game

## Contributing

This project follows Feature-Sliced Design methodology. When adding new features:

1. Create feature folders in `src/features/`
2. Add reusable components to `src/shared/ui/`
3. Add utility functions to `src/shared/lib/`
4. Update entity models in `src/entities/`

## License

MIT License
