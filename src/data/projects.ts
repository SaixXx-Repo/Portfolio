import { Project, Skill, SocialLink, Certificate } from '../types';

export const projects: Project[] = [
  {
    id: 'logi-tune-mobile-app',
    title: 'Logi Tune Mobile App',
    description: 'A comprehensive desk and room booking app for flexible office spaces. Including accurate maps of your office to make it quick and easy to find desks, rooms and your coworkers.',
    image: '/images/projects/logi-tune.webp',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Coroutines', 'Firebase', 'Flow', 'Hilt', 'Material Design', 'WebView', 'Windsurf'],
    category: 'android',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.logitech.logue&hl=en',
    liveUrl: 'https://www.logitech.com/en-us/products/video-conferencing/solutions/deskbooking.html',
    videoUrl: 'https://www.youtube.com/watch?v=SmUpuM1RN4M&t=17s',
  },
  {
    id: 'logi-dock-flex-app',
    title: 'Logi Dock Flex App',
    description: 'Building the Android App for the Logi Dock Flex Hardware. It functions as a docking station that indicates if a desk is available or not.',
    image: '/images/projects/logi-dock-flex.png',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Coroutines', 'Firebase', 'Flow', 'Hilt', 'Material Design', 'WebView', 'Windsurf'],
    category: 'android',
    liveUrl: 'https://www.logitech.com/en-us/products/video-conferencing/room-solutions/logi-dock-flex-managed.html',
    videoUrl: 'https://www.youtube.com/watch?v=E9-xvDTsQvQ',
  },
  {
    id: 'logi-map-view',
    title: 'Logi Map View',
    description: 'Working on the interactive map feature that is provided for multiple Logitech room and desk booking products.',
    image: '/images/projects/logi-map.avif',
    technologies: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Cursor'],
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
    technologies: ['Kotlin', 'MySQL', 'PHP', 'Data Binding', 'Coroutines', 'Flow', 'Hilt/Dagger'],
    category: 'android',
    liveUrl: 'https://inntal-kabel.de/',
  },
  {
    id: 'whatsapp-ai-bot',
    title: 'WhatsApp AI Agent',
    description: 'A WhatsApp bot that uses AI to automate replies and translations. It features a "Robot Mode" for auto-replies and special commands for instant translations to Swedish or German.',
    image: '/images/projects/whatsapp-bot.png',
    technologies: ['Node.js', 'WhatsApp Web.js', 'Google Gemini AI', 'DeepL API', 'QRCode Terminal'],
    category: 'other',
  },
  {
    id: 'portfolio-site',
    title: 'This Portfolio',
    description: 'The portfolio website you are currently viewing! Built to showcase my work and learn new technologies.',
    image: '/images/projects/portfolio.png',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'CSS', 'HTML', 'Vercel', 'Gemini AI', 'Antigravity'],
    category: 'react',
    githubUrl: 'https://github.com/SaixXx-Repo/Portfolio',
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', icon: 'ReactIcon' },
  { name: 'Vercel', category: 'frontend', icon: 'VercelIcon' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'TailwindIcon' },
  { name: 'GSAP', category: 'frontend', icon: 'GSAPIcon' },
  { name: 'Jest', category: 'frontend', icon: 'JestIcon' },
  { name: 'Next.js', category: 'frontend', icon: 'NextJSIcon' },
  { name: 'Gemini AI', category: 'frontend', icon: 'GeminiIcon' },

  // Mobile
  { name: 'Android SDK', category: 'mobile', icon: 'AndroidIcon' },
  { name: 'Jetpack Compose', category: 'mobile', icon: 'JetpackComposeIcon' },
  { name: 'Room Database', category: 'mobile', icon: 'DatabaseIcon' },
  { name: 'Hilt/Dagger', category: 'mobile', icon: 'HiltIcon' },
  { name: 'Coroutines', category: 'mobile', icon: 'CoroutinesIcon' },
  { name: 'Flow', category: 'mobile', icon: 'FlowIcon' },
  { name: 'Gradle', category: 'mobile', icon: 'GradleIcon' },
  { name: 'Firebase', category: 'mobile', icon: 'FirebaseIcon' },

  // Languages
  { name: 'Java', category: 'languages', icon: 'JavaIcon' },
  { name: 'Kotlin', category: 'languages', icon: 'KotlinIcon' },
  { name: 'JavaScript', category: 'languages', icon: 'JavaScriptIcon' },
  { name: 'TypeScript', category: 'languages', icon: 'TypeScriptIcon' },
  { name: 'C', category: 'languages', icon: 'CIcon' },
  { name: 'C++', category: 'languages', icon: 'CppIcon' },
  { name: 'Python', category: 'languages', icon: 'PythonIcon' },
  { name: 'PHP', category: 'languages', icon: 'PHPIcon' },
  { name: 'HTML/CSS', category: 'languages', icon: 'HtmlIcon' },
  { name: 'SQL', category: 'languages', icon: 'DatabaseIcon' },

  // Tools
  { name: 'Git', category: 'tools', icon: 'GitIcon' },
  { name: 'GitHub', category: 'tools', icon: 'GitHubIcon' },
  { name: 'Android Studio', category: 'tools', icon: 'AndroidIcon' },
  { name: 'VS Code', category: 'tools', icon: 'VSCodeIcon' },
  { name: 'Cursor', category: 'tools' },
  { name: 'Antigravity', category: 'tools', icon: 'AntigravityIcon' },
  { name: 'MySQL', category: 'tools', icon: 'DatabaseIcon' },
  { name: 'Figma', category: 'tools', icon: 'FigmaIcon' },
  { name: 'ADB', category: 'tools', icon: 'AndroidIcon' },
];

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'React Basics',
    issuer: 'Meta',
    date: 'November 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/QP1A70U23JFO',
    skills: ['React.js', 'CSS', 'HTML', 'JSX', 'UI Components', 'JavaScript', 'Front-End Web Development'],
  },
  {
    id: 'cert-2',
    title: 'Advanced React',
    issuer: 'Meta',
    date: 'November 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/MK9BUPVWZCSG',
    skills: ['React.js', 'Unit Testing', 'Context API', 'Hooks', 'Testing', 'Jest', 'JavaScript'],
  },
  {
    id: 'cert-6',
    title: 'Typescript in React: Get started',
    issuer: 'Coursera',
    date: 'November 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/GPJBQM5W7NAW',
    skills: ['TypeScript', 'React.js', 'Type Safety', 'Web Development Tools', 'JavaScript'],
  },
  {
    id: 'cert-3',
    title: 'Version Control',
    issuer: 'Meta',
    date: 'September 2024',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/A981SDK15O8R',
    skills: ['Git', 'GitHub', 'Unix Commands', 'Branching', 'Collaboration', 'Version Control', 'Command-Line Interface'],
  },
  {
    id: 'cert-4',
    title: 'Programming Fundamentals in Kotlin',
    issuer: 'Meta',
    date: 'February 2025',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/7XNZ48GET7ZZ',
    skills: ['Kotlin', 'OOP', 'Mobile Development', 'Data Structures', 'Programming Fundamentals'],
  },
  {
    id: 'cert-5',
    title: 'Introduction to Android Mobile Application Development',
    issuer: 'Meta',
    date: 'June 2024',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/GE2PJ5M2XGWH',
    skills: ['Android', 'Kotlin', 'UI Design', 'Activities', 'XML', 'Android Development', 'Gradle', 'Android Studio'],
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
  
  When I'm not coding, you can find me working out or spending time with my family and friends.`,
  location: 'Copenhagen, Denmark',
  email: 'maxchfunk@gmail.com',
  resumeUrl: '#',
};

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const workExperience: WorkExperience[] = [
  {
    id: 'logitech',
    company: 'Logitech',
    role: 'Android Developer',
    location: 'Malmö, Sweden',
    startDate: 'Jan 2022',
    endDate: 'Present',
    description: 'Engineering native Android solutions for Logitech\'s desk and room booking ecosystem, spanning both mobile applications and embedded device firmware.',
    highlights: [
      'Engineered core features for "Logi Tune," a native Android application for desk and room booking, utilizing Kotlin, Jetpack Compose, and MVVM architecture.',
      'Developed the native Android firmware running on Logi Dock Flex hardware, enabling real - time device - to - cloud synchronization and instantdesk availability status updates.',
      'Modernized the app architecture by implementing Jetpack Compose, Coroutines and Flow for asynchronous operations, and integrated Room and Retrofit for robust offline-first data handling.',
      'Built a shared interactive map component using React and TypeScript,successfully integrating the feature across the mobile app, embeddedhardware, and customer web portal',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'Firebase', 'Coroutines', 'Flow', 'Dagger/Hilt', 'Material Design', 'MVVM', 'TypeScript', 'React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'self-employed',
    company: 'Self-Employed - Inntal Kabel',
    role: 'Android Developer',
    location: 'Remote',
    startDate: 'Sep 2021',
    endDate: 'Dec 2021',
    description: 'Solely responsible for the end-to-end design and development of a custom Android solution for Inntal Kabel, digitizing their internal logistics and workforce management.',
    highlights: [
      'Independently designed and developed a comprehensive Android application to streamline internal logistics processes and effectively visualize employee working hours.',
      'Successfully published to Google Play Store, currently serving ~80 active users ensuring high stability and uptime',
      'Utilized a diverse tech stack, including SQL, PHP, HTML, OkHttp, MySQL and Kotlin to deliver a robust and user-friendly mobile solution.',
    ],
    technologies: ['Kotlin', 'Android Studio', 'SQL', 'PHP', 'MySQL', 'OkHttp'],
  },
  {
    id: 'alten',
    company: 'ALTEN Sverige AB',
    role: 'Software Engineer',
    location: 'Landskrona, Sweden',
    startDate: 'Mar 2021',
    endDate: 'Jan 2022',
    description: 'Consultant at BorgWarner Sweden AB, focused on engineering advanced application and control software for next-generation all-wheel drive systems.',
    highlights: [
      'Developed innovative application and control software for next-generation all-wheel drive systems using Matlab/Simulink and Stateflow.',
      'Conducted thorough unit testing using Model-in-the-Loop (MIL) and Software-in-the-Loop (SIL) frameworks with TPT.',
      'Analyzed vehicle data and fine-tune vehicle model parameters to enhance system performance.',
    ],
    technologies: ['Matlab', 'Simulink', 'Stateflow', 'TPT', 'C'],
  },
  {
    id: 'neumueller',
    company: 'Neumüller Ingenieurbüro',
    role: 'Software Engineer',
    location: 'Regensburg, Germany',
    startDate: 'May 2019',
    endDate: 'Feb 2021',
    description: 'Consultant at Vitesco Technologies (formerly Continental Automotive) to deliver specialized customer software solutions for engine and drivetrain control units (ECUs).',
    highlights: [
      'Developed custom software solutions for the ComStack, focusing on engine and drivetrain ECUs',
      'Created tools for software generation using Python.',
    ],
    technologies: ['C', 'Python', 'CAN', 'Flexray', 'LIN'],
  },
  {
    id: 'bertrandt',
    company: 'Bertrandt Ingenieurbüro',
    role: 'Development Engineer',
    location: 'Regensburg, Germany',
    startDate: 'Sep 2017',
    endDate: 'Apr 2019',
    description: 'Engaged in critical function development for Advanced Driver Assistance Systems (ADAS) and early-stage autonomous driving initiatives.',
    highlights: [
      'Developed functions for ADAS with ADTF, QT in C/C++',
      'Created first concepts and use cases for an autonomous driving project',
      'Inverter software defect ticket analysis on the testbench with CANape and Inca',
    ],
    technologies: ['C', 'C++', 'QT', 'ADTF', 'CANape', 'Inca'],
  },
  {
    id: 'education',
    company: 'OTH Regensburg',
    role: 'Bachelor of Engineering - Electrical Engineering',
    location: 'Regensburg, Germany',
    startDate: 'Oct 2012',
    endDate: 'Aug 2017',
    description: 'Completed a Bachelor of Engineering at OTH Regensburg, specializing in Telecommunications with a strong focus on practical software and hardware integration.',
    highlights: [
      'Major: Telecommunications',
      'Thesis: Frontend development of a dynamic signal manager for Car2Backend-Gateway via MQTT',
      'Created a Web Frontend to display Live car data dynamically with HTML, PHP, CSS and JavaScript. Including work on the Backend with MQTT and a MySQL database.',
      'Multiple internships at Continental Automotive GmbH & Bertrandt Ingenieurbüro',
    ],
    technologies: ['MQTT', 'HTML', 'PHP', 'CSS', 'JavaScript', 'MySQL'],
  },
];

