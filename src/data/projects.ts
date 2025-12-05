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
  { name: 'TypeScript', category: 'frontend', icon: 'TypeScriptIcon' },
  { name: 'JavaScript', category: 'frontend', icon: 'JavaScriptIcon' },
  { name: 'HTML/CSS', category: 'frontend', icon: 'HtmlIcon' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Next.js', category: 'frontend', icon: 'NextJSIcon' },

  // Mobile
  { name: 'Android SDK', category: 'mobile', icon: 'AndroidIcon' },
  { name: 'Jetpack Compose', category: 'mobile', icon: 'AndroidIcon' },
  { name: 'Room Database', category: 'mobile', icon: 'DatabaseIcon' },
  { name: 'Hilt/Dagger', category: 'mobile' },
  { name: 'Firebase', category: 'mobile', icon: 'FirebaseIcon' },

  // Languages
  { name: 'Java', category: 'languages', icon: 'JavaIcon' },
  { name: 'Kotlin', category: 'languages', icon: 'KotlinIcon' },
  { name: 'JavaScript', category: 'languages', icon: 'JavaScriptIcon' },
  { name: 'TypeScript', category: 'languages', icon: 'TypeScriptIcon' },
  { name: 'C', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'Python', category: 'languages', icon: 'PythonIcon' },
  { name: 'PHP', category: 'languages' },
  { name: 'HTML/CSS', category: 'languages', icon: 'HtmlIcon' },
  { name: 'SQL', category: 'languages', icon: 'DatabaseIcon' },

  // Tools
  { name: 'Git', category: 'tools', icon: 'GitIcon' },
  { name: 'Android Studio', category: 'tools', icon: 'AndroidIcon' },
  { name: 'VS Code', category: 'tools', icon: 'VSCodeIcon' },
  { name: 'Cursor', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
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
  
  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
  or sharing knowledge with the developer community.`,
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
    description: 'Developing a native Android app for a desk and room booking solution utilizing Kotlin for a user-friendly and innovative experience.',
    highlights: [
      'Taking ownership of the entire app development life cycle, ensuring successful market release',
      'Strategic planning, coding, and quality control for Android app',
      'Using Flows, Coroutines, Room, Retrofit, Web View, MVVM architecture',
      'Implementing Material Design, OkHttp, RESTful API, and Firebase integration',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'Firebase', 'MVVM'],
  },
  {
    id: 'self-employed',
    company: 'Self-Employed - Inntal Kabel',
    role: 'Android Developer',
    location: 'Remote',
    startDate: 'Sep 2021',
    endDate: 'Dec 2021',
    description: 'Independently designed and developed a comprehensive Android application to streamline internal logistics processes.',
    highlights: [
      'Designed and developed app to visualize employee working hours',
      'Successfully published on Google Play Store with ~80 active users',
      'Delivered robust and user-friendly mobile solution',
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
    description: 'Working at BorgWarner Sweden AB developing application and control software for next generation all-wheel drive systems.',
    highlights: [
      'Developed control software using Matlab/Simulink and Stateflow',
      'Unit testing using MIL and SIL with TPT',
      'Vehicle data analysis and vehicle model parameter tuning',
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
    description: 'Working at Vitesco Technologies (former Continental Automotive) on customer software development for engine and drivetrain ECUs.',
    highlights: [
      'Development of ComStack software for engine and drivetrain ECUs',
      'Creating specifications and performing code reviews',
      'Testing and analyzing ECU communication (CAN, Flexray, LIN)',
      'Developing tools for software generation in Python',
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
    description: 'Function development for Advanced Driver Assistance Systems (ADAS) and autonomous driving projects.',
    highlights: [
      'Function development for ADAS with ADTF in C/C++',
      'Created first concepts and use cases for autonomous driving project',
      'Inverter software defect analysis on testbench with CANape and Inca',
    ],
    technologies: ['C', 'C++', 'ADTF', 'CANape', 'Inca'],
  },
  {
    id: 'education',
    company: 'OTH Regensburg',
    role: 'Bachelor of Engineering - Electrical Engineering',
    location: 'Regensburg, Germany',
    startDate: 'Oct 2012',
    endDate: 'Aug 2017',
    description: 'Technical University of Applied Science Regensburg with major in Telecommunications.',
    highlights: [
      'Major: Telecommunications',
      'Thesis: Frontend development of a dynamic signal manager for Car2Backend-Gateway via MQTT',
      'Multiple internships at Continental Automotive GmbH',
    ],
    technologies: ['MQTT', 'HTML', 'PHP', 'CSS', 'JavaScript', 'MySQL'],
  },
];

