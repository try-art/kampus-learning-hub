
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { addMonths, format, subMonths, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock calendar events for students
const userEvents = [
  {
    id: "event-1",
    title: "Entrega de proyecto final",
    date: new Date(2023, 7, 15), // August 15, 2023
    time: "23:59",
    courseId: "course-1",
    courseName: "Desarrollo Web Avanzado",
    type: "deadline",
    completed: false
  },
  {
    id: "event-2",
    title: "Clase en vivo: JavaScript Avanzado",
    date: new Date(2023, 7, 18), // August 18, 2023
    time: "18:00",
    duration: "1.5h",
    courseId: "course-1",
    courseName: "Desarrollo Web Avanzado",
    type: "live-class",
    completed: false
  },
  {
    id: "event-3",
    title: "Webinar: Tendencias UX/UI",
    date: new Date(2023, 7, 22), // August 22, 2023
    time: "16:00",
    duration: "1h",
    courseId: "course-3",
    courseName: "Diseño de Interfaces",
    type: "webinar",
    completed: false
  },
  {
    id: "event-4",
    title: "Quiz: Fundamentos de React",
    date: new Date(2023, 7, 25), // August 25, 2023
    time: "Todo el día",
    courseId: "course-1",
    courseName: "Desarrollo Web Avanzado",
    type: "quiz",
    completed: false
  }
];

// Helper function to get event type label and color
const getEventTypeInfo = (type: string) => {
  switch (type) {
    case 'deadline':
      return {
        label: 'Entrega',
        color: 'bg-red-500',
        bgClass: 'bg-red-100 border-red-300 text-red-800'
      };
    case 'live-class':
      return {
        label: 'Clase en vivo',
        color: 'bg-blue-500',
        bgClass: 'bg-blue-100 border-blue-300 text-blue-800'
      };
    case 'webinar':
      return {
        label: 'Webinar',
        color: 'bg-green-500',
        bgClass: 'bg-green-100 border-green-300 text-green-800'
      };
    case 'quiz':
      return {
        label: 'Quiz',
        color: 'bg-amber-500',
        bgClass: 'bg-amber-100 border-amber-300 text-amber-800'
      };
    default:
      return {
        label: 'Evento',
        color: 'bg-gray-500',
        bgClass: 'bg-gray-100 border-gray-300 text-gray-800'
      };
  }
};

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [courseFilter, setCourseFilter] = useState('all');
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Get the list of unique courses
  const uniqueCourses = Array.from(new Set(userEvents.map(event => event.courseId)))
    .map(courseId => {
      const event = userEvents.find(e => e.courseId === courseId);
      return {
        id: courseId,
        name: event?.courseName || ''
      };
    });
  
  // Filter events by course and get events for selected day
  const filteredEvents = userEvents.filter(event => 
    courseFilter === 'all' || event.courseId === courseFilter
  );
  
  const selectedDayEvents = filteredEvents.filter(event => 
    selectedDate && isSameDay(event.date, selectedDate)
  );
  
  // Get upcoming events (for the sidebar)
  const today = new Date();
  const upcomingEvents = filteredEvents
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return filteredEvents.some(event => isSameDay(event.date, day));
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mi Calendario</h1>
          <p className="text-muted-foreground mt-1">Visualiza tus eventos y fechas importantes</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-card rounded-lg shadow-elegant p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft size={16} />
                  </Button>
                  <h2 className="text-xl font-medium min-w-[160px] text-center">
                    {format(currentDate, "MMMM yyyy", { locale: es })}
                  </h2>
                  <Button variant="outline" size="icon" onClick={handleNextMonth}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Hoy
                  </Button>
                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Todos los cursos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los cursos</SelectItem>
                      {uniqueCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentDate}
                className="p-3 pointer-events-auto"
                modifiers={{
                  hasEvent: (date) => isDayWithEvent(date)
                }}
                modifiersClassNames={{
                  hasEvent: "relative before:absolute before:rounded-full before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-primary"
                }}
              />
            </div>
            
            {selectedDate && (
              <div className="bg-card rounded-lg shadow-elegant p-4">
                <h3 className="font-medium text-lg mb-4">
                  Eventos para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                </h3>
                
                <div className="space-y-3">
                  {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map(event => {
                      const typeInfo = getEventTypeInfo(event.type);
                      
                      return (
                        <div
                          key={event.id}
                          className={`border-l-4 rounded-r-md p-3 ${typeInfo.bgClass}`}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium">{event.title}</div>
                            <div className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: typeInfo.color + '30', color: typeInfo.color }}>
                              {typeInfo.label}
                            </div>
                          </div>
                          <div className="text-sm mt-1">{event.time}</div>
                          {event.duration && <div className="text-sm">Duración: {event.duration}</div>}
                          <div className="text-sm mt-2 opacity-80">{event.courseName}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay eventos para este día
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/3 space-y-6">
            <Card className="shadow-elegant p-4">
              <h3 className="font-medium text-lg mb-4">Próximos eventos</h3>
              
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map(event => {
                    const typeInfo = getEventTypeInfo(event.type);
                    const isToday = isSameDay(event.date, new Date());
                    const daysDifference = Math.round((event.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div
                        key={event.id}
                        className="flex border rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedDate(event.date)}
                      >
                        <div className="flex-shrink-0 w-1.5 rounded-full" style={{ backgroundColor: typeInfo.color }}></div>
                        <div className="ml-3 flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {format(event.date, "d 'de' MMMM", { locale: es })} • {event.time}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{event.courseName}</div>
                        </div>
                        {daysDifference <= 2 && !event.completed && (
                          <div className="flex items-start ml-2">
                            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <AlertCircle size={12} />
                              {isToday ? 'Hoy' : 'Pronto'}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No tienes eventos próximos
                </div>
              )}
              
              <div className="border-t mt-4 pt-4 flex justify-between">
                <div className="flex flex-col text-center">
                  <span className="text-2xl font-bold text-blue-600">{filteredEvents.filter(e => e.type === 'live-class').length}</span>
                  <span className="text-xs text-muted-foreground">Clases</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="text-2xl font-bold text-red-600">{filteredEvents.filter(e => e.type === 'deadline').length}</span>
                  <span className="text-xs text-muted-foreground">Entregas</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="text-2xl font-bold text-amber-600">{filteredEvents.filter(e => e.type === 'quiz').length}</span>
                  <span className="text-xs text-muted-foreground">Quiz</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="text-2xl font-bold text-green-600">{filteredEvents.filter(e => e.type === 'webinar').length}</span>
                  <span className="text-xs text-muted-foreground">Webinars</span>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-elegant p-4">
              <h3 className="font-medium text-lg mb-4">Códigos de color</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <span>Fechas de entrega</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span>Clases en vivo</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Webinars</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                  <span>Quiz y evaluaciones</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyCalendar;
