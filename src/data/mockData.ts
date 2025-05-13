
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  enrolledStudents: number;
  modules: Module[];
  isPublished: boolean;
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
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

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introducción a la Programación Web',
    description: 'Aprende los fundamentos de HTML, CSS y JavaScript para crear sitios web interactivos.',
    instructor: 'María González',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop',
    duration: '6 semanas',
    level: 'Básico',
    enrolledStudents: 128,
    isPublished: true,
    createdAt: '2023-01-15',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos de HTML',
        lessons: [
          {
            id: 'l1',
            title: 'Estructura básica de HTML',
            type: 'video',
            duration: '10:15',
            content: 'https://example.com/video1.mp4'
          },
          {
            id: 'l2',
            title: 'Etiquetas semánticas',
            type: 'document',
            content: 'Contenido del documento sobre etiquetas semánticas.'
          }
        ]
      },
      {
        id: 'm2',
        title: 'CSS Básico',
        lessons: [
          {
            id: 'l3',
            title: 'Selectores y propiedades',
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
    instructor: 'Carlos Rodríguez',
    thumbnail: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070&auto=format&fit=crop',
    duration: '8 semanas',
    level: 'Avanzado',
    enrolledStudents: 87,
    isPublished: true,
    createdAt: '2023-03-22',
    modules: [
      {
        id: 'm3',
        title: 'Principios de Diseño UX',
        lessons: [
          {
            id: 'l4',
            title: 'Investigación de usuarios',
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
    instructor: 'Ana Martínez',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop',
    duration: '4 semanas',
    level: 'Intermedio',
    enrolledStudents: 215,
    isPublished: true,
    createdAt: '2023-05-10',
    modules: [
      {
        id: 'm4',
        title: 'SEO Básico',
        lessons: [
          {
            id: 'l5',
            title: 'Optimización on-page',
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
    instructor: 'Javier López',
    thumbnail: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop',
    duration: '10 semanas',
    level: 'Avanzado',
    enrolledStudents: 64,
    isPublished: false,
    createdAt: '2023-07-05',
    modules: [
      {
        id: 'm5',
        title: 'Fundamentos de React Native',
        lessons: [
          {
            id: 'l6',
            title: 'Componentes básicos',
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
