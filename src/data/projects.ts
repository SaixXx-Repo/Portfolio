import { Project, Skill, SocialLink, Certificate } from '../types';

export const projects: Project[] = [
  {
    id: 'logi-tune-mobile-app',
    title: 'Logi Tune Mobile App',
    description: 'A comprehensive fitness tracking Android app with workout plans, progress analytics, and social features. Built with Kotlin and Jetpack Compose.',
    image: '/images/projects/logi-tune.webp',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Coroutines', 'Firebase'],
    category: 'android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.logitech.logue&hl=en',
    liveUrl: 'https://www.logitech.com/en-us/products/video-conferencing/solutions/deskbooking.html',
    videoUrl: 'https://www.youtube.com/watch?v=SmUpuM1RN4M&t=17s',
  },
  {
    id: 'logi-dock-flex-app',
    title: 'Logi Dock Flex App',
    description: 'Building the scheduler android app for the Logi Dock Flex Hardware. It functions as a docking station that indicates if a desk is available or not.',
    image: '/images/projects/logi-dock-flex.png',
    technologies: ['Kotlin', 'MVVM', 'Hilt', 'WorkManager', 'Material Design 3'],
    category: 'android',
    liveUrl: 'https://www.logitech.com/en-us/products/video-conferencing/room-solutions/logi-dock-flex-managed.html',
    videoUrl: 'https://www.youtube.com/watch?v=E9-xvDTsQvQ',
  },
  {
    id: 'logi-map-view',
    title: 'Logi Map View',
    description: 'Working on the map feature that is provided for multiple Logitech room & desk booking products.',
    image: '/images/projects/logi-map.avif',
    technologies: ['React', 'TypeScript', 'JavaScript', 'Node.js'],
    category: 'react',
    liveUrl: '#',
  },
  {
    id: 'tipp-time-app',
    title: 'TippTime App',
    description: 'My first app that I build from scratch to learn Android App development. It is a simmple betting game app where you can bet within a group of friends on football matches. I also worked on the backend in firebase.',
    image: '/images/projects/tipp-time.png',
    technologies: ['Kotlin', 'MVVM', 'Hilt/Dagger', 'Firebase', 'Room Database', 'Coroutines', 'Flow', 'Data Binding'],
    category: 'android',
  },
  {
    id: 'inntal-kabel-app',
    title: 'Inntal Kabel App',
    description: 'The first app I developed for a small company, that is used internally for logistics. Employees use it to book and track deliveries, tasks and can see their own work hours.',
    image: '/images/projects/inntal-kabel.jpg',
    technologies: ['Kotlin', 'Firebase', 'ExoPlayer', 'CameraX', 'WebSocket'],
    category: 'android',
    liveUrl: 'https://inntal-kabel.de/',
  },
  {
    id: 'portfolio-site',
    title: 'This Portfolio',
    description: 'The portfolio website you are currently viewing! Built to showcase my work and learn new technologies.',
    image: '/images/projects/portfolio.png',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'GSAP'],
    category: 'react',
    githubUrl: '#',
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 80, category: 'frontend' },
  { name: 'TypeScript', level: 80, category: 'frontend' },
  { name: 'JavaScript', level: 40, category: 'frontend' },
  { name: 'HTML/CSS', level: 70, category: 'frontend' },
  { name: 'Redux', level: 50, category: 'frontend' },
  { name: 'Next.js', level: 70, category: 'frontend' },
  
  // Mobile
  { name: 'Android SDK', level: 90, category: 'mobile' },
  { name: 'Jetpack Compose', level: 80, category: 'mobile' },
  { name: 'Room Database', level: 80, category: 'mobile' },
  { name: 'Hilt/Dagger', level: 80, category: 'mobile' },
  { name: 'Firebase', level: 60, category: 'mobile' },
  
  // Languages
  { name: 'Java', level: 30, category: 'languages' },
  { name: 'Kotlin', level: 90, category: 'languages' },
  { name: 'JavaScript', level: 40, category: 'languages' },
  { name: 'TypeScript', level: 60, category: 'languages' },
  { name: 'C', level: 40, category: 'languages' },
  { name: 'C++', level: 40, category: 'languages' },
  { name: 'Python', level: 20, category: 'languages' },
  { name: 'PHP', level: 30, category: 'languages' },
  { name: 'HTML/CSS', level: 70, category: 'languages' },
  { name: 'SQL', level: 40, category: 'languages' },
  
  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Android Studio', level: 90, category: 'tools' },
  { name: 'VS Code', level: 80, category: 'tools' },
  { name: 'Cursor', level: 85, category: 'tools' },
  { name: 'Figma', level: 65, category: 'tools' },
  { name: 'CI/CD', level: 75, category: 'tools' },
];

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'React Basics',
    issuer: 'Meta',
    date: 'November 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/QP1A70U23JFO',
    skills: ['React', 'JSX', 'Components', 'Props'],
  },
  {
    id: 'cert-2',
    title: 'Advanced React',
    issuer: 'Meta',
    date: 'November 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/MK9BUPVWZCSG',
    skills: ['React Hooks', 'Context API', 'HOCs', 'Testing'],
  },
  {
    id: 'cert-6',
    title: 'Typescript in React: Get started',
    issuer: 'Coursera',
    date: 'November 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/GPJBQM5W7NAW',
    skills: ['TypeScript', 'React', 'Type Safety', 'Generics'],
  },
  {
    id: 'cert-3',
    title: 'Version Control',
    issuer: 'Meta',
    date: 'September 2024',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/A981SDK15O8R',
    skills: ['Git', 'GitHub', 'Branching', 'Collaboration'],
  },
  {
    id: 'cert-4',
    title: 'Programming Fundamentals in Kotlin',
    issuer: 'Meta',
    date: 'February 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/7XNZ48GET7ZZ',
    skills: ['Kotlin', 'OOP', 'Functions', 'Collections'],
  },
  {
    id: 'cert-5',
    title: 'Introduction to Android Mobile Application Development',
    issuer: 'Meta',
    date: 'June 2024',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/GE2PJ5M2XGWH',
    skills: ['Android', 'Kotlin', 'UI Design', 'Activities'],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/SaixXx-Repo',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/maximilian-funk-8608a4160/',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:maxchfunk@gmail.com',
    icon: 'email',
  },
];

export const personalInfo = {
  name: 'Maximilian Funk',
  title: 'Android & React Developer',
  tagline: 'Crafting beautiful mobile experiences and modern web applications',
  bio: `I'm a passionate software developer specializing in Android app development and React frontend development. 
  With a keen eye for design and a love for clean code, I create applications that are both beautiful and performant.
  
  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
  or sharing knowledge with the developer community.`,
  location: 'Copenhagen, Denmark',
  email: 'maxchfunk@gmail.com',
  resumeUrl: '#',
};

