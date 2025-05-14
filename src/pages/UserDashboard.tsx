import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';
import { courses, enrollments } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  
  // Filter courses that the user is enrolled in
  const userEnrollments = enrollments.filter(enrollment => enrollment.userId === user?.id);
  const enrolledCourses = courses.filter(course => 
    userEnrollments.some(enrollment => enrollment.courseId === course.id)
  );
  
  // Get the enrollments with course details
  const enrollmentsWithCourses = userEnrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId);
    return { ...enrollment, course };
  });

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido, {profile?.name || "Usuario"}</h1>
          <p className="text-muted-foreground mt-1">Continúa tu aprendizaje donde lo dejaste</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Mis cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Cursos inscritos</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollmentsWithCourses.filter(e => e.progress > 0 && e.progress < 100).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Cursos activos</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollmentsWithCourses.filter(e => e.progress === 100).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Cursos finalizados</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollmentsWithCourses.length > 0 
                  ? Math.round(enrollmentsWithCourses.reduce((acc, curr) => acc + curr.progress, 0) / enrollmentsWithCourses.length) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Progreso general</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2 shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader>
              <CardTitle>Continúa aprendiendo</CardTitle>
              <CardDescription>Cursos que has comenzado recientemente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrollmentsWithCourses.length > 0 ? (
                  enrollmentsWithCourses
                    .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
                    .slice(0, 3)
                    .map((enrollment) => (
                      <div key={enrollment.id} className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={enrollment.course?.thumbnail} 
                              alt={enrollment.course?.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-medium truncate">{enrollment.course?.title}</p>
                              <Link 
                                to={`/my-courses/${enrollment.courseId}`}
                                className="inline-flex items-center text-primary hover:underline ml-2"
                              >
                                <ArrowUpRight size={16} />
                              </Link>
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock size={14} className="text-muted-foreground mr-1" />
                              <p className="text-xs text-muted-foreground">
                                Último acceso: {new Date(enrollment.lastAccessedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Progreso</span>
                            <span className="text-xs font-medium">{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No tienes cursos en progreso</p>
                    <Link 
                      to="/courses" 
                      className="inline-flex items-center text-primary hover:underline mt-2"
                    >
                      Explorar cursos disponibles
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader>
              <CardTitle>Próximas actividades</CardTitle>
              <CardDescription>Eventos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <p className="font-medium">Entrega de proyecto</p>
                  <p className="text-sm text-muted-foreground mt-1">Marketing Digital</p>
                  <p className="text-xs mt-2 text-accent">En 2 días</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="font-medium">Quiz semanal</p>
                  <p className="text-sm text-muted-foreground mt-1">Diseño UX/UI Avanzado</p>
                  <p className="text-xs mt-2 text-accent">En 5 días</p>
                </div>
                <Link
                  to="/my-calendar"
                  className="block text-center text-sm text-primary hover:underline mt-4"
                >
                  Ver todas las actividades
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elegant transition-elegant hover:shadow-lg">
          <CardHeader>
            <CardTitle>Cursos recomendados</CardTitle>
            <CardDescription>Basados en tus intereses y cursos actuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter(course => !enrolledCourses.some(c => c.id === course.id))
                .slice(0, 3)
                .map((course) => (
                  <div key={course.id} className="group border rounded-lg overflow-hidden shadow-elegant transition-elegant hover:shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg truncate">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full">{course.level}</span>
                        <Link 
                          to={`/courses/${course.id}`}
                          className="text-sm text-primary hover:underline"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDashboard;
