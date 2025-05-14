
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, FileText, Upload, Users } from 'lucide-react';
import UploadMaterialForm from '@/components/UploadMaterialForm';
import { courses } from '@/data/mockData';

const InstructorProfile = () => {
  const { user, isInstructor } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // If not instructor, redirect to home
  if (!user || !isInstructor()) {
    return <Navigate to="/" />;
  }
  
  // Filter courses by instructor
  const instructorCourses = courses.filter(course => course.instructor.id === user.id || course.instructor.name === user.name);
  
  // Calculate some stats
  const totalStudents = instructorCourses.reduce((acc, course) => acc + course.enrolledStudents, 0);
  const totalModules = instructorCourses.reduce((acc, course) => acc + course.modules.length, 0);
  const totalLessons = instructorCourses.reduce((acc, course) => 
    acc + course.modules.reduce((acc, module) => acc + module.lessons.length, 0), 0);

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Perfil de Instructor</h1>
            <p className="text-muted-foreground mt-1">Gestiona tus cursos y materiales educativos</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0 inline-flex items-center justify-center">
                <Upload size={16} className="mr-2" />
                Subir Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Subir Material</DialogTitle>
              </DialogHeader>
              <UploadMaterialForm 
                onSuccess={() => setDialogOpen(false)} 
                instructorId={user.id} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{instructorCourses.length}</div>
              <p className="text-xs text-muted-foreground">Cursos que impartes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Estudiantes inscritos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalModules}</div>
              <p className="text-xs text-muted-foreground">Total de módulos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lecciones</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLessons}</div>
              <p className="text-xs text-muted-foreground">Total de lecciones</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="courses">Mis Cursos</TabsTrigger>
            <TabsTrigger value="materials">Mis Materiales</TabsTrigger>
          </TabsList>
          <TabsContent value="courses">
            {instructorCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructorCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="truncate">{course.title}</CardTitle>
                      <CardDescription>
                        {course.enrolledStudents} estudiantes • {course.level}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{course.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">No tienes cursos asignados</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="materials">
            {/* Aquí se pueden mostrar los materiales subidos por el instructor */}
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">Sube tu primer material con el botón superior</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InstructorProfile;
