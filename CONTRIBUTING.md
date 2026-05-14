# Contributing to Tone Music Analyzer

Thank you for your interest in contributing to Tone Music Analyzer! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/tone-music-analyzer/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Mockups or examples if applicable

### Pull Requests

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/tone-music-analyzer.git
cd tone-music-analyzer
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
   - Follow the code style guidelines
   - Write clear commit messages
   - Add tests for new features
   - Update documentation

4. **Test your changes**
```bash
npm run lint
npm run build
npm run preview
```

5. **Commit your changes**
```bash
git add .
git commit -m "Add amazing feature"
```

6. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic only

### Component Guidelines

```typescript
// Good component structure
import { motion } from 'framer-motion';
import { ComponentProps } from './types';

export const MyComponent = ({ prop1, prop2 }: ComponentProps) => {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <motion.div>
      {/* Component content */}
    </motion.div>
  );
};
```

### Naming Conventions

- **Components**: PascalCase (e.g., `ToneAnalyzer.tsx`)
- **Utilities**: camelCase (e.g., `audioAnalyzer.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `AnalysisResult`)

### File Organization

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and business logic
├── store/         # State management
├── types/         # TypeScript types
├── utils/         # Helper functions
└── hooks/         # Custom React hooks
```

### Git Commit Messages

Follow conventional commits:

```
feat: add new tone category
fix: resolve BPM detection issue
docs: update API documentation
style: format code with prettier
refactor: simplify tone classifier
test: add unit tests for lyrics analyzer
chore: update dependencies
```

### Testing

- Write unit tests for utilities
- Write integration tests for services
- Test edge cases and error handling
- Aim for >80% code coverage

### Documentation

- Update README.md for user-facing changes
- Update TECHNICAL.md for architecture changes
- Add JSDoc comments for complex functions
- Include examples in documentation

## Project Structure

### Adding New Features

1. **New Tone Category**
   - Update `types/index.ts`
   - Update `utils/toneClassifier.ts`
   - Add color in `getToneColor()`
   - Add description in `getToneDescription()`

2. **New Streaming Platform**
   - Add platform type to `Song` interface
   - Implement in `services/musicService.ts`
   - Add icon in `AnalyzePage.tsx`
   - Update documentation

3. **New Visualization**
   - Create component in `components/`
   - Add to `ResultsPage.tsx`
   - Ensure responsive design
   - Add animations

### Performance Considerations

- Use `React.memo()` for expensive components
- Implement code splitting with `React.lazy()`
- Optimize images and assets
- Minimize bundle size
- Use Web Workers for heavy computations

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Review Process

1. **Automated Checks**
   - Linting passes
   - Build succeeds
   - No TypeScript errors

2. **Code Review**
   - Code quality and style
   - Test coverage
   - Documentation updates
   - Performance impact

3. **Testing**
   - Manual testing in multiple browsers
   - Mobile responsiveness
   - Edge cases

4. **Approval & Merge**
   - At least one approval required
   - Squash and merge to main
   - Delete feature branch

## Getting Help

- Join our [Discord community](#)
- Ask questions in [Discussions](https://github.com/yourusername/tone-music-analyzer/discussions)
- Check [existing issues](https://github.com/yourusername/tone-music-analyzer/issues)
- Read the [documentation](README.md)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the app (for major contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Tone Music Analyzer! 🎵
