
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { courses, getModulesByCourseId, getLessonsByModuleId, enrollments } from '@/data/mockData';
import { Calendar, Clock, Users, BookOpen, FileText, Video, Award, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { isAdmin, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the course by ID
  const course = courses.find(c => c.id === id);
  
  // Find course modules
  const courseModules = course ? getModulesByCourseId(id || '') : [];
  
  // Find user enrollment for this course
  const userEnrollment = enrollments.find(e => e.courseId === id && e.userId === user?.id);
  
  if (!course) {
    return (
      <Layout>
        <div className="p-6 md:p-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Curso no encontrado</h1>
            <p className="text-muted-foreground">El curso que buscas no existe o ha sido eliminado.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8">
        {/* Course Header */}
        <div className="relative rounded-lg overflow-hidden mb-8">
          <div className="h-48 md:h-64 bg-gradient-to-r from-primary/80 to-primary/40 flex items-end">
            <div className="absolute inset-0">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative p-6 md:p-8 w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
                  <div className="flex flex-wrap gap-2 items-center text-white/90">
                    <span className="flex items-center gap-1"><Clock size={16} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Users size={16} /> {course.enrolledStudents} estudiantes</span>
                    <span className="flex items-center gap-1"><BookOpen size={16} /> {course.level}</span>
                    {!course.isPublished && isAdmin() && (
                      <span className="bg-amber-500/90 text-white text-xs px-2 py-1 rounded">Borrador</span>
                    )}
                  </div>
                </div>
                {isAdmin() ? (
                  <Button>Editar curso</Button>
                ) : (
                  userEnrollment && (
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-white">Progreso: {userEnrollment.progress}%</div>
                      <Progress value={userEnrollment.progress} className="h-2 w-36" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Descripción</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            {isAdmin() && <TabsTrigger value="students">Estudiantes</TabsTrigger>}
            {isAdmin() && <TabsTrigger value="statistics">Estadísticas</TabsTrigger>}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="bg-card rounded-lg shadow-elegant p-6">
              <h2 className="text-xl font-medium mb-4">Acerca de este curso</h2>
              <p className="text-muted-foreground">{course.description}</p>
              
              <h3 className="text-lg font-medium mt-8 mb-4">Lo que aprenderás</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.objectives && course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-primary shrink-0 mt-1" size={18} />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" /> Fecha de inicio
                  </h4>
                  <p>{course.startDate || "Acceso inmediato"}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Clock size={18} className="text-primary" /> Duración
                  </h4>
                  <p>{course.duration || "A tu ritmo"}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Award size={18} className="text-primary" /> Certificado
                  </h4>
                  <p>{course.certificate ? "Incluido" : "No disponible"}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-elegant p-6">
              <h2 className="text-xl font-medium mb-4">Instructor</h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img 
                    src={course.instructor.avatar || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                    alt={course.instructor.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{course.instructor.name || "Profesor"}</h3>
                  <p className="text-muted-foreground text-sm">{course.instructor.title || "Instructor"}</p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                {course.instructor.bio || "Información del instructor no disponible."}
              </p>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="bg-card rounded-lg shadow-elegant p-6">
              <div className="flex flex-col gap-4">
                {courseModules.length > 0 ? (
                  courseModules.map((module, index) => {
                    const moduleLessons = getLessonsByModuleId(module.id);
                    
                    return (
                      <div key={module.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-4 flex items-center justify-between">
                          <h3 className="font-medium">Módulo {index + 1}: {module.title}</h3>
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                        </div>
                        <div className="divide-y">
                          {moduleLessons.map(lesson => (
                            <div key={lesson.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                              {lesson.type === 'video' ? (
                                <Video size={20} className="text-blue-500" />
                              ) : (
                                <FileText size={20} className="text-green-500" />
                              )}
                              <div className="flex-1">
                                <div>{lesson.title}</div>
                                <div className="text-sm text-muted-foreground">{lesson.duration || 'Sin duración'}</div>
                              </div>
                              {isAdmin() && (
                                <Button variant="ghost" size="sm">Editar</Button>
                              )}
                              {!isAdmin() && userEnrollment && (
                                lesson.completed ? (
                                  <CheckCircle size={20} className="text-green-500" />
                                ) : (
                                  <Button variant="outline" size="sm">Ver</Button>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay contenido disponible para este curso.</p>
                    {isAdmin() && (
                      <Button className="mt-4">Agregar módulo</Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Students Tab (Admin Only) */}
          {isAdmin() && (
            <TabsContent value="students">
              <div className="bg-card rounded-lg shadow-elegant p-6">
                <h2 className="text-xl font-medium mb-4">Estudiantes inscritos</h2>
                {/* Students list to be implemented */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aquí se mostrará la lista de estudiantes.</p>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Statistics Tab (Admin Only) */}
          {isAdmin() && (
            <TabsContent value="statistics">
              <div className="bg-card rounded-lg shadow-elegant p-6">
                <h2 className="text-xl font-medium mb-4">Estadísticas del curso</h2>
                {/* Course statistics to be implemented */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aquí se mostrarán las estadísticas del curso.</p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default CourseDetails;
