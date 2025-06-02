# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Wedding Website - Aida y Javi

A beautiful, modern wedding website built with Astro featuring RSVP functionality and FAQ section.

## Features

- 🎨 **Modern Design** - Elegant, responsive design with beautiful typography
- 💌 **RSVP Form** - Comprehensive RSVP form with validation
- ❓ **FAQ Section** - Interactive FAQ with smooth animations
- 📱 **Mobile Responsive** - Looks great on all devices
- ⚡ **Fast Performance** - Built with Astro for optimal speed
- 🎯 **Smooth Navigation** - Smooth scrolling between sections

## Sections

1. **Hero Section** - Names, date, and venue
2. **Wedding Details** - Ceremony, reception, and dress code information
3. **RSVP Form** - Guest information collection
4. **FAQ** - Common questions and answers
5. **Footer** - Contact information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd aidayjavi
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## Customization

### Personal Information
Edit `src/pages/index.astro` to customize:
- Couple names in the hero section
- Wedding date and venue
- Contact email in the footer
- FAQ content

### Styling
The website uses CSS custom properties (variables) for easy theming:
- `--primary-color`: Main accent color (gold)
- `--secondary-color`: Secondary accent color
- `--accent-color`: Light background color
- `--text-dark`: Dark text color
- `--text-light`: Light text color

### Fonts
The website uses:
- **Playfair Display** - Elegant serif font for headings
- **Inter** - Clean sans-serif font for body text

## RSVP Form Handling

Currently, the RSVP form shows a confirmation alert. To handle real form submissions, you can:

1. **Use Netlify Forms** (recommended for static hosting)
2. **Integrate with Formspree or similar service**
3. **Add a backend API endpoint**
4. **Use serverless functions**

## Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory, ready for deployment.

## Deployment

This site can be deployed to:
- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- Any static hosting service

## License

This project is open source and available under the MIT License.

---

Made with ❤️ for Sarah & David's special day!
