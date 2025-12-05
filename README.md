# Maximilian Funk - Portfolio

A modern, interactive personal portfolio website built with React and TypeScript. This project showcases my skills, professional experience, and projects in Android and Web Development.

![Portfolio Preview](public/images/preview.png)
*(Add a screenshot of your landing page here and name it `preview.png` in `public/images/`)*

## 🚀 Features

-   **Interactive AI Assistant**: A custom chat widget powered by Google's Gemini AI that answers questions about my background and experience.
-   **Dynamic Project Showcase**: Filterable project grid with detailed cards, technology tags, and video previews.
-   **Skills Visualization**: Animated "Tech Orbit" and categorized skill lists.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
-   **Modern Animations**: Smooth transitions and interactions using Framer Motion and GSAP.

## 🛠️ Tech Stack

### Core
-   **React 18**: UI Library
-   **TypeScript**: Type safety and developer experience
-   **Vite**: Fast build tool and development server

### Styling & Animation
-   **CSS Modules / Variables**: Custom design system with dark mode support
-   **Framer Motion**: Complex layout animations and gestures
-   **GSAP**: High-performance animations (used for the Tech Orbit)

### Backend / API
-   **Vercel Serverless Functions**: Handles API requests for the chat assistant
-   **Google Gemini AI**: Provides the intelligence for the chat assistant

## 📦 Libraries Used

-   `react` / `react-dom`: Core framework
-   `framer-motion`: Animation library
-   `gsap`: Animation library
-   `react-icons` (or custom SVG icons): Iconography
-   `@vercel/node`: Serverless function support

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/SaixXx-Repo/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm start
    # or
    vercel dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

## 📸 Screenshots

### Landing Page
![Landing Page](public/images/landing-page.png)
*(Place your screenshot in `public/images/landing-page.png`)*

### Projects Section
![Projects](public/images/projects.png)
*(Place your screenshot in `public/images/projects.png`)*

### Chat Widget
![Chat Widget](public/images/chat-widget.png)
*(Place your screenshot in `public/images/chat-widget.png`)*

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
