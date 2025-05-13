
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, format, subMonths } from "date-fns";
import { es } from "date-fns/locale";

// Mock calendar events
const events = [
  {
    id: "event-1",
    title: "Entrega de proyecto final",
    date: "2023-08-15",
    time: "23:59",
    courseId: "course-1",
    courseName: "Desarrollo Web Avanzado",
    type: "deadline",
    color: "red"
  },
  {
    id: "event-2",
    title: "Clase en vivo: JavaScript Avanzado",
    date: "2023-08-18",
    time: "18:00",
    duration: "1.5h",
    courseId: "course-1",
    courseName: "Desarrollo Web Avanzado",
    type: "live-class",
    color: "blue"
  },
  {
    id: "event-3",
    title: "Webinar: Tendencias UX/UI",
    date: "2023-08-22",
    time: "16:00",
    duration: "1h",
    courseId: "course-3",
    courseName: "Diseño de Interfaces",
    type: "webinar",
    color: "green"
  },
  {
    id: "event-4",
    title: "Quiz: Fundamentos de React",
    date: "2023-08-25",
    time: "Todo el día",
    courseId: "course-1",
    courseName: "Desarrollo Web Avanzado",
    type: "quiz",
    color: "amber"
  }
];

// Helper function to get events for a given day
const getEventsForDay = (date: Date) => {
  const dateString = format(date, "yyyy-MM-dd");
  return events.filter(event => event.date === dateString);
};

// Helper function to get event color class
const getEventColorClass = (type: string) => {
  switch (type) {
    case 'deadline': return 'bg-red-100 border-red-300 text-red-800';
    case 'live-class': return 'bg-blue-100 border-blue-300 text-blue-800';
    case 'webinar': return 'bg-green-100 border-green-300 text-green-800';
    case 'quiz': return 'bg-amber-100 border-amber-300 text-amber-800';
    default: return 'bg-gray-100 border-gray-300 text-gray-800';
  }
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Get events for the selected day
  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
            <p className="text-muted-foreground mt-1">Administra tus eventos y fechas importantes</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="inline-flex items-center justify-center">
              <Plus size={16} className="mr-2" />
              Nuevo evento
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              <ChevronLeft size={16} />
            </Button>
            <h2 className="text-xl font-medium">
              {format(currentDate, "MMMM yyyy", { locale: es })}
            </h2>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
          </div>
          
          <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
            <TabsList>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="day">Día</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-card rounded-lg shadow-elegant overflow-hidden">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentDate}
              className="p-3 pointer-events-auto"
            />
          </div>
          
          <div className="bg-card rounded-lg shadow-elegant p-4">
            <h3 className="font-medium mb-4">
              {selectedDate ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es }) : "Selecciona una fecha"}
            </h3>
            
            <div className="space-y-3">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`border-l-4 rounded-r-md p-3 ${getEventColorClass(event.type)}`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm mt-1">{event.time}</div>
                    {event.duration && <div className="text-sm">Duración: {event.duration}</div>}
                    <div className="text-sm mt-2 opacity-80">{event.courseName}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No hay eventos para este día
                </div>
              )}
            </div>
            
            {selectedDate && (
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Plus size={16} className="mr-2" />
                  Añadir evento
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
