export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id?: string;
    name: string;
    avatar?: string;
    title?: string;
    bio?: string;
  };
  thumbnail: string;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  enrolledStudents: number;
  modules: Module[];
  isPublished: boolean;
  createdAt: string;
  objectives?: string[];
  startDate?: string;
  certificate?: boolean;
}

export interface Module {
  id: string;
  title: string;
  courseId: string;
  duration?: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  type: 'video' | 'document' | 'quiz';
  duration?: string;
  content: string;
  completed?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  lastAccessedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  website?: string;
  phone?: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introducción a la Programación Web',
    description: 'Aprende los fundamentos de HTML, CSS y JavaScript para crear sitios web interactivos.',
    instructor: {
      id: 'instructor-1',  // Added instructor ID
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
      title: 'Desarrolladora Senior',
      bio: 'María es una desarrolladora web con más de 10 años de experiencia en el sector.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop',
    duration: '6 semanas',
    level: 'Básico',
    enrolledStudents: 128,
    isPublished: true,
    createdAt: '2023-01-15',
    objectives: [
      'Comprender la estructura básica de HTML',
      'Aprender a dar estilo con CSS',
      'Implementar interactividad con JavaScript',
      'Crear sitios web responsivos'
    ],
    certificate: true,
    startDate: '2023-06-01',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos de HTML',
        courseId: '1',
        duration: '2 semanas',
        lessons: [
          {
            id: 'l1',
            title: 'Estructura básica de HTML',
            moduleId: 'm1',
            type: 'video',
            duration: '10:15',
            content: 'https://example.com/video1.mp4'
          },
          {
            id: 'l2',
            title: 'Etiquetas semánticas',
            moduleId: 'm1',
            type: 'document',
            content: 'Contenido del documento sobre etiquetas semánticas.'
          }
        ]
      },
      {
        id: 'm2',
        title: 'CSS Básico',
        courseId: '1',
        duration: '2 semanas',
        lessons: [
          {
            id: 'l3',
            title: 'Selectores y propiedades',
            moduleId: 'm2',
            type: 'video',
            duration: '12:30',
            content: 'https://example.com/video2.mp4'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Diseño UX/UI Avanzado',
    description: 'Aprende a crear interfaces intuitivas y experiencias de usuario excepcionales.',
    instructor: {
      name: 'Carlos Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
      title: 'Diseñador UX/UI Senior',
      bio: 'Carlos es un experto en diseño de interfaces con un enfoque centrado en el usuario.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070&auto=format&fit=crop',
    duration: '8 semanas',
    level: 'Avanzado',
    enrolledStudents: 87,
    isPublished: true,
    createdAt: '2023-03-22',
    objectives: [
      'Dominar los principios de diseño UX',
      'Crear prototipos interactivos',
      'Realizar pruebas de usabilidad',
      'Diseñar sistemas de diseño'
    ],
    certificate: true,
    modules: [
      {
        id: 'm3',
        title: 'Principios de Diseño UX',
        courseId: '2',
        duration: '3 semanas',
        lessons: [
          {
            id: 'l4',
            title: 'Investigación de usuarios',
            moduleId: 'm3',
            type: 'video',
            duration: '15:45',
            content: 'https://example.com/video3.mp4'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Marketing Digital',
    description: 'Estrategias efectivas para promocionar tu negocio en el mundo digital.',
    instructor: {
      name: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop',
      title: 'Especialista en Marketing Digital',
      bio: 'Ana ha trabajado con numerosas empresas para mejorar su presencia en línea y aumentar sus ventas.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop',
    duration: '4 semanas',
    level: 'Intermedio',
    enrolledStudents: 215,
    isPublished: true,
    createdAt: '2023-05-10',
    objectives: [
      'Desarrollar estrategias de SEO',
      'Gestionar campañas publicitarias',
      'Analizar métricas de marketing',
      'Crear contenido efectivo'
    ],
    certificate: true,
    modules: [
      {
        id: 'm4',
        title: 'SEO Básico',
        courseId: '3',
        duration: '1 semana',
        lessons: [
          {
            id: 'l5',
            title: 'Optimización on-page',
            moduleId: 'm4',
            type: 'document',
            content: 'Contenido sobre optimización on-page.'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Desarrollo de Aplicaciones Móviles',
    description: 'Crea aplicaciones nativas para iOS y Android con React Native.',
    instructor: {
      name: 'Javier López',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop',
      title: 'Desarrollador Móvil Senior',
      bio: 'Javier ha desarrollado más de 20 aplicaciones móviles para clientes de diversos sectores.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop',
    duration: '10 semanas',
    level: 'Avanzado',
    enrolledStudents: 64,
    isPublished: false,
    createdAt: '2023-07-05',
    objectives: [
      'Construir aplicaciones con React Native',
      'Integrar APIs nativas',
      'Optimizar el rendimiento de aplicaciones',
      'Publicar en App Store y Google Play'
    ],
    modules: [
      {
        id: 'm5',
        title: 'Fundamentos de React Native',
        courseId: '4',
        duration: '3 semanas',
        lessons: [
          {
            id: 'l6',
            title: 'Componentes básicos',
            moduleId: 'm5',
            type: 'video',
            duration: '18:20',
            content: 'https://example.com/video4.mp4'
          }
        ]
      }
    ]
  }
];

export const enrollments: Enrollment[] = [
  {
    id: 'e1',
    userId: '2',
    courseId: '1',
    enrolledAt: '2023-02-10',
    progress: 45,
    lastAccessedAt: '2023-02-20'
  },
  {
    id: 'e2',
    userId: '2',
    courseId: '3',
    enrolledAt: '2023-06-15',
    progress: 20,
    lastAccessedAt: '2023-06-20'
  }
];

// Update users with an instructor role
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop',
    bio: 'Administrator of the learning platform',
    website: 'https://admin.example.com',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop',
    bio: 'Enthusiastic learner',
    website: 'https://student.example.com',
    phone: '+0987654321'
  },
  {
    id: '3',
    name: 'María González',
    email: 'instructor@example.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    bio: 'Desarrolladora web con más de 10 años de experiencia en el sector',
    website: 'https://instructor.example.com',
    phone: '+1122334455'
  }
];

// Helper functions to get modules and lessons
export const getModulesByCourseId = (courseId: string) => {
  return courses
    .find(c => c.id === courseId)?.modules || [];
};

export const getLessonsByModuleId = (moduleId: string) => {
  for (const course of courses) {
    for (const module of course.modules) {
      if (module.id === moduleId) {
        return module.lessons;
      }
    }
  }
  return [];
};
