# Product Management Portfolio

A modern, minimalist portfolio website showcasing my product management work and process. This site is built with Next.js, React, and Styled Components.

## Features

- 🛡️ Password protection for private content
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📝 Case studies and project showcases
- 🚀 Optimized for performance

## Tech Stack

- **Framework**: Next.js
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pm-portfolio.git
   cd pm-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Password Protection

The site is protected by a password. The default password is set to `ProductManagementJourney`. To change this, modify the `PASSWORD` constant in `src/components/PasswordProtect.js`.

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/            # Page components
├── styles/           # Global styles and theme
└── utils/            # Utility functions
```

## Adding New Pages

1. Create a new file in the `pages` directory with the desired route name.
2. Use the `ProcessTemplate` component for consistent styling across process pages.
3. Add the new page to the navigation in `src/components/Navbar.js`.

## Customization

### Theme

Edit the theme variables in `src/styles/theme.js` to customize colors, typography, and other design tokens.

### Content

- Update the homepage content in `src/pages/index.js`
- Modify the about page in `src/pages/about.js`
- Add or update process pages in the `pages` directory

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-docs) from the creators of Next.js.

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import the project into Vercel.
3. Deploy!

### Other Platforms

You can also deploy to other platforms like Netlify or your own server. Make sure to build the project first:

```bash
npm run build
# or
yarn build
```

Then, start the production server:

```bash
npm start
# or
yarn start
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Styled Components](https://styled-components.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
