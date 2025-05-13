
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Search, Download, Eye, FileText, FileImage, FileVideo, FileArchive, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';

// Mock data for materials available to current user
const userMaterials = [
  {
    id: "mat-1",
    name: "Introducción a React",
    type: "pdf",
    size: "2.4 MB",
    course: "Desarrollo Web Avanzado",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "Una guía completa sobre los fundamentos de React, componentes y hooks.",
    uploadedAt: "2023-04-15",
    lastAccessed: "2023-06-20"
  },
  {
    id: "mat-2",
    name: "Guía de JavaScript",
    type: "pdf",
    size: "1.8 MB",
    course: "Fundamentos de Programación",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Conceptos básicos y avanzados de JavaScript con ejemplos prácticos.",
    uploadedAt: "2023-05-20",
    lastAccessed: "2023-05-25"
  },
  {
    id: "mat-3",
    name: "Taller de Node.js",
    type: "video",
    size: "342 MB",
    course: "Desarrollo Web Avanzado",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "Video tutorial sobre cómo configurar y usar Node.js para aplicaciones web.",
    uploadedAt: "2023-06-10",
    lastAccessed: "2023-06-15"
  },
  {
    id: "mat-4",
    name: "Ejercicios de CSS",
    type: "zip",
    size: "5.6 MB",
    course: "Diseño Web Responsivo",
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    description: "Archivos de ejercicios prácticos para aprender CSS y diseño web responsivo.",
    uploadedAt: "2023-07-05",
    lastAccessed: null
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText size={20} className="text-red-500" />;
    case 'image': return <FileImage size={20} className="text-blue-500" />;
    case 'video': return <FileVideo size={20} className="text-purple-500" />;
    case 'zip': return <FileArchive size={20} className="text-amber-500" />;
    default: return <FileText size={20} className="text-gray-500" />;
  }
};

const MyMaterials = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter materials based on search query and active tab
  const filteredMaterials = userMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'recent' 
      ? material.lastAccessed !== null 
      : activeTab === 'unread' 
        ? material.lastAccessed === null 
        : true;
    
    return matchesSearch && matchesTab;
  });

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mis Materiales</h1>
          <p className="text-muted-foreground mt-1">Accede a todos los materiales de tus cursos</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="recent">Recientes</TabsTrigger>
            <TabsTrigger value="unread">Sin ver</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Buscar materiales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter size={16} className="mr-2" />
            Filtrar
          </Button>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="overflow-hidden shadow-elegant transition-elegant hover:shadow-lg h-full flex flex-col">
                <div className="aspect-video relative bg-muted">
                  {material.type === 'video' ? (
                    <div className="h-full flex items-center justify-center bg-black">
                      <FileVideo size={48} className="text-white opacity-60" />
                    </div>
                  ) : (
                    <img 
                      src={material.thumbnail} 
                      alt={material.name} 
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                    {getFileIcon(material.type)}
                    <span>{material.type.toUpperCase()}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-sm text-muted-foreground mb-1">{material.course}</div>
                  <h3 className="font-medium text-lg mb-2">{material.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {material.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                      {material.size}
                    </span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No se encontraron materiales</p>
            <p className="text-sm text-muted-foreground mt-2">Intenta con otra búsqueda o revisa en tus cursos</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyMaterials;
