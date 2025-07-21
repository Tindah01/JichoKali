# Contributing to JichoKali Kenya

Thank you for your interest in contributing to JichoKali Kenya! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Provide detailed information about the issue
- Include steps to reproduce the problem
- Add screenshots if applicable

### Suggesting Features
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Explain how it aligns with the project's mission

### Code Contributions

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/jichokali-kenya.git
   cd jichokali-kenya
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Make Your Changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test your changes thoroughly

5. **Run Tests and Linting**
   ```bash
   npm run lint
   npm run build
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: your descriptive commit message"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for review and feedback

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Maintain consistent indentation (2 spaces)
- Use meaningful variable and function names

### Component Structure
```typescript
// Component imports
import React, { useState } from 'react';
import { Icon } from 'lucide-react';

// Type definitions
interface ComponentProps {
  prop: string;
}

// Component definition
const Component: React.FC<ComponentProps> = ({ prop }) => {
  // State and hooks
  const [state, setState] = useState('');

  // Event handlers
  const handleEvent = () => {
    // Implementation
  };

  // Render
  return (
    <div className="component-class">
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

### CSS Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing (8px grid system)
- Use semantic color names
- Ensure accessibility compliance

### Commit Message Format
```
Type: Brief description

Detailed explanation if needed

- List specific changes
- Reference issues: Fixes #123
```

**Types:**
- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Modifications to existing features
- `Remove:` Deleted features or code
- `Docs:` Documentation changes
- `Style:` Code formatting changes
- `Refactor:` Code restructuring
- `Test:` Adding or modifying tests

## 🔒 Security Considerations

### Sensitive Information
- Never commit API keys or secrets
- Use environment variables for configuration
- Sanitize user inputs
- Follow secure coding practices

### Privacy Protection
- Maintain user anonymity features
- Encrypt sensitive data
- Follow data protection regulations
- Implement proper access controls

## 🧪 Testing

### Manual Testing
- Test on multiple devices and browsers
- Verify mobile responsiveness
- Check accessibility features
- Test form validation and error handling

### Automated Testing (Future)
- Write unit tests for components
- Add integration tests for user flows
- Implement end-to-end testing
- Maintain test coverage

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Design Resources
- [Lucide Icons](https://lucide.dev/)
- [Color Accessibility](https://webaim.org/resources/contrastchecker/)
- [Mobile Design Guidelines](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## 🌍 Localization

### Adding Translations
- Create translation files in `src/locales/`
- Use descriptive keys for translation strings
- Test translations in context
- Ensure cultural appropriateness

### Supported Languages
- English (primary)
- Swahili (planned)

## 📞 Getting Help

### Community Support
- Join our discussions on GitHub
- Ask questions in issues
- Share ideas and feedback

### Contact Information
- Project maintainers: [GitHub Issues](https://github.com/yourusername/jichokali-kenya/issues)
- Security issues: security@jichokali.ke
- General inquiries: info@jichokali.ke

## 📄 License

By contributing to JichoKali Kenya, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for helping make Kenya safer through technology! 🇰🇪