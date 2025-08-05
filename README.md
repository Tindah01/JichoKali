# JichoKali Kenya - Police Brutality Reporting Platform

A secure, anonymous platform for reporting police brutality incidents in Kenya. Built with React, TypeScript, and Tailwind CSS to provide a safe space for citizens to document and report incidents while protecting their identity and safety.

## 🚀 Live Demo

**Production Site**: [https://phenomenal-cendol-f4a790.netlify.app](https://phenomenal-cendol-f4a790.netlify.app)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Security & Privacy](#security--privacy)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## ✨ Features

### 🔒 Secure Reporting System
- **Anonymous Reporting**: Submit reports without revealing identity
- **Multi-Step Form**: Guided reporting process with progress tracking
- **Evidence Upload**: Support for photos, videos, and documents
- **Severity Classification**: Categorize incidents by severity level
- **Case Tracking**: Monitor report status with unique reference numbers

### 📱 User-Friendly Interface
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Intuitive Navigation**: Bottom navigation for easy access
- **Progressive Web App**: Works offline and can be installed
- **Accessibility**: WCAG compliant design for all users
- **Multi-Language Support**: Available in English and Swahili

### 🆘 Emergency Resources
- **Emergency Contacts**: Quick access to police, legal aid, and support services
- **Legal Resources**: Know your rights and legal procedures
- **Support Groups**: Connect with trauma counseling and victim support
- **Regional Contacts**: Location-specific emergency numbers and offices

### 📊 Report Management
- **Dashboard**: View all submitted reports in one place
- **Status Updates**: Real-time updates on case progress
- **Case History**: Detailed timeline of investigation steps
- **Statistics**: Track community reporting trends

### 👤 Privacy Controls
- **Anonymous Mode**: Complete identity protection
- **Data Encryption**: All data encrypted in transit and at rest
- **Notification Preferences**: Control how you receive updates
- **Account Security**: Advanced privacy settings

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

### Deployment
- **Netlify** - Static site hosting with continuous deployment
- **GitHub Actions** - CI/CD pipeline (planned)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jichokali-kenya.git
   cd jichokali-kenya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase Database**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update the `.env` file with your credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```
   - Run the database migration in your Supabase SQL editor

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint checks
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # App header with branding
│   ├── Navigation.tsx   # Bottom navigation bar
│   ├── HomePage.tsx     # Landing page and statistics
│   ├── ReportIncident.tsx # Multi-step reporting form
│   ├── MyReports.tsx    # Report management dashboard
│   ├── Resources.tsx    # Legal resources and documents
│   ├── EmergencyContacts.tsx # Emergency contact directory
│   └── Profile.tsx      # User profile and settings
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports

public/
├── index.html          # HTML template
└── vite.svg           # Vite logo

config/
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── vite.config.ts      # Vite build configuration
└── tsconfig.json       # TypeScript configuration
```

## 🔧 Key Components

### ReportIncident Component
Multi-step form for secure incident reporting:
- **Step 1**: Basic incident information (date, time, location)
- **Step 2**: Detailed description and officer information
- **Step 3**: Medical information and evidence upload
- **Step 4**: Privacy settings and submission

### MyReports Component
Dashboard for tracking submitted reports:
- Report status indicators
- Case reference numbers
- Detailed case timelines
- Update notifications

### Resources Component
Comprehensive resource center:
- Legal rights information
- Emergency contact directory
- Downloadable documents
- Support group listings

### EmergencyContacts Component
Categorized emergency contacts:
- Immediate emergency services
- Legal aid organizations
- Trauma support services
- Regional office contacts

## 🔐 Security & Privacy

### Data Protection
- **End-to-End Encryption**: All sensitive data encrypted
- **Anonymous Reporting**: No personal information required
- **Secure Storage**: Data stored with industry-standard security
- **Privacy by Design**: Built with privacy as core principle

### Safety Features
- **Safe Reporting**: Only report when in safe location
- **Emergency Protocols**: Clear instructions for immediate danger
- **Witness Protection**: Optional witness information collection
- **Evidence Security**: Secure file upload and storage

### Compliance
- **GDPR Compliant**: European data protection standards
- **Kenya Data Protection Act**: Local privacy law compliance
- **Human Rights Standards**: UN human rights principles

## 🚀 Deployment

### Production Deployment

The application is deployed on Netlify with the following configuration:

```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables (set in Netlify dashboard)
NODE_ENV=production
```

### Deployment Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect GitHub repository
   - Configure build settings
   - Set environment variables
   - Enable continuous deployment

3. **Custom Domain** (Optional)
   - Configure custom domain in Netlify
   - Set up SSL certificate
   - Configure DNS records

### CI/CD Pipeline (Planned)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - uses: netlify/actions/cli@master
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes and commit**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Contribution Guidelines

- Follow TypeScript and React best practices
- Maintain consistent code style with ESLint
- Write clear, descriptive commit messages
- Test thoroughly on mobile devices
- Ensure accessibility compliance
- Update documentation as needed

### Areas for Contribution

- **Localization**: Swahili translations
- **Accessibility**: Screen reader optimization
- **Performance**: Code splitting and optimization
- **Testing**: Unit and integration tests
- **Documentation**: User guides and API docs

## 📞 Support

### For Users
- **Emergency**: Call 999 for immediate danger
- **IPOA Hotline**: +254 20 272 6171
- **Technical Support**: [Create an issue](https://github.com/yourusername/jichokali-kenya/issues)

### For Developers
- **Documentation**: Check the wiki
- **Bug Reports**: Use GitHub issues
- **Feature Requests**: Open a discussion
- **Security Issues**: Email security@jichokali.ke

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Human Rights Organizations**: For guidance on reporting procedures
- **Legal Experts**: For advice on Kenyan law compliance
- **Community Advocates**: For feedback and testing
- **Open Source Community**: For tools and libraries used

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core reporting functionality
- ✅ Emergency contacts directory
- ✅ Resource center
- ✅ Mobile-responsive design

### Phase 2 (Planned)
- 🔄 Backend API integration
- 🔄 Real-time notifications
- 🔄 Advanced analytics dashboard
- 🔄 Multi-language support

### Phase 3 (Future)
- 📋 Mobile app development
- 📋 Integration with legal systems
- 📋 Community forums
- 📋 AI-powered case analysis

---

**JichoKali Kenya** - *Keeping Kenya Safe, One Report at a Time*

For more information, visit our [website](https://phenomenal-cendol-f4a790.netlify.app) or contact us at info@jichokali.ke