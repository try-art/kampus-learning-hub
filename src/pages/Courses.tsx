
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { courses } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' ? true : course.level === levelFilter;
    const matchesStatus = statusFilter === 'published' 
      ? course.isPublished 
      : statusFilter === 'draft' 
        ? !course.isPublished 
        : true;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <Layout requireAdmin={true}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Cursos</h1>
            <p className="text-muted-foreground mt-1">Administra todos los cursos de la plataforma</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link 
              to="/courses/new" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-elegant hover:bg-primary/90"
            >
              <Plus size={16} className="mr-2" />
              Crear curso
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="Básico">Básico</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Link 
                key={course.id}
                to={`/courses/${course.id}`}
                className="group"
              >
                <Card className="overflow-hidden shadow-elegant transition-elegant hover:shadow-lg h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {!course.isPublished && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                        Borrador
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="text-xs">
                        <span className="bg-secondary px-2 py-1 rounded-full">{course.level}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.enrolledStudents} estudiantes
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">No se encontraron cursos</p>
              <p className="text-sm text-muted-foreground mt-2">Intenta con otros filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
