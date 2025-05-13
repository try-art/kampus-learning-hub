
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { courses, enrollments } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Book, Users, FileText, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const totalStudents = 243; // Mock data
  const totalCourses = courses.length;
  const totalEnrollments = enrollments.length;
  const activeEnrollments = enrollments.filter(e => e.progress < 100).length;
  
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Layout requireAdmin={true}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de administración</h1>
            <p className="text-muted-foreground mt-1">Gestiona todos los aspectos de tu plataforma educativa</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Link 
              to="/courses/new" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-elegant hover:bg-primary/90"
            >
              Crear curso
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalCourses}</div>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Book size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalStudents}</div>
                <div className="rounded-full bg-accent/10 p-2 text-accent">
                  <Users size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inscripciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalEnrollments}</div>
                <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                  <FileText size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{activeEnrollments}</div>
                <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                  <Calendar size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader>
              <CardTitle>Cursos recientes</CardTitle>
              <CardDescription>Últimos cursos añadidos a la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{course.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.isPublished ? 'Publicado' : 'Borrador'} • {course.enrolledStudents} estudiantes
                      </p>
                    </div>
                    <div>
                      <Link 
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant transition-elegant hover:shadow-lg">
            <CardHeader>
              <CardTitle>Estadísticas generales</CardTitle>
              <CardDescription>Resumen de actividad en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Tasa de finalización</p>
                    <p className="text-2xl font-bold">68.7%</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Promedio de sesión</p>
                    <p className="text-2xl font-bold">24 min</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Nuevos este mes</p>
                    <p className="text-2xl font-bold">+42</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Materiales</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
