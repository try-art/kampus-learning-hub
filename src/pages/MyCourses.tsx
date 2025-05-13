
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';
import { courses, enrollments } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MyCourses: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter courses that the user is enrolled in
  const userEnrollments = enrollments.filter(enrollment => enrollment.userId === user?.id);
  
  // Get the enrollments with course details
  const enrollmentsWithCourses = userEnrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId);
    return { ...enrollment, course };
  }).filter(item => item.course);
  
  // Filter based on search query
  const filteredEnrollments = enrollmentsWithCourses.filter(enrollment => 
    enrollment.course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enrollment.course?.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mis Cursos</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus cursos inscritos</p>
        </div>

        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Buscar en mis cursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredEnrollments.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEnrollments.map((enrollment) => (
              <Link 
                key={enrollment.id}
                to={`/my-courses/${enrollment.courseId}`}
                className="group"
              >
                <Card className="overflow-hidden shadow-elegant transition-elegant hover:shadow-lg h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={enrollment.course?.thumbnail} 
                      alt={enrollment.course?.title} 
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {enrollment.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Completado
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-lg mb-2">{enrollment.course?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {enrollment.course?.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progreso</span>
                        <span className="text-xs font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                      <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                        <span>Último acceso: {new Date(enrollment.lastAccessedAt).toLocaleDateString()}</span>
                        <span>{enrollment.course?.level}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No estás inscrito en ningún curso</p>
            <Link 
              to="/courses" 
              className="inline-block mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-elegant hover:bg-primary/90"
            >
              Explorar cursos disponibles
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCourses;
