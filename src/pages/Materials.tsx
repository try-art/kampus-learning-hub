
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Search, Plus, Upload, Download, Eye, Edit, Trash2, FileText, FileImage, FileVideo, FileArchive } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for materials
const materials = [
  {
    id: "mat-1",
    name: "Introducción a React",
    type: "pdf",
    size: "2.4 MB",
    course: "Desarrollo Web Avanzado",
    uploadedBy: "Ana Martínez",
    createdAt: "2023-04-15",
    downloadCount: 120
  },
  {
    id: "mat-2",
    name: "Guía de JavaScript",
    type: "pdf",
    size: "1.8 MB",
    course: "Fundamentos de Programación",
    uploadedBy: "Carlos López",
    createdAt: "2023-05-20",
    downloadCount: 85
  },
  {
    id: "mat-3",
    name: "Taller de Node.js",
    type: "video",
    size: "342 MB",
    course: "Desarrollo Web Avanzado",
    uploadedBy: "Ana Martínez",
    createdAt: "2023-06-10",
    downloadCount: 67
  },
  {
    id: "mat-4",
    name: "Ejercicios de CSS",
    type: "zip",
    size: "5.6 MB",
    course: "Diseño Web Responsivo",
    uploadedBy: "Elena Rodríguez",
    createdAt: "2023-07-05",
    downloadCount: 93
  },
  {
    id: "mat-5",
    name: "Presentación UX/UI",
    type: "ppt",
    size: "8.2 MB",
    course: "Diseño de Interfaces",
    uploadedBy: "Pedro Sánchez",
    createdAt: "2023-08-12",
    downloadCount: 45
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

const Materials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' ? true : material.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <Layout requireAdmin={true}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Materiales de Estudio</h1>
            <p className="text-muted-foreground mt-1">Gestiona todos los materiales disponibles para los cursos</p>
          </div>
          <div className="mt-4 sm:mt-0 space-x-2">
            <Button className="inline-flex items-center justify-center">
              <Upload size={16} className="mr-2" />
              Subir material
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Todos los materiales</TabsTrigger>
            <TabsTrigger value="recent">Recientes</TabsTrigger>
            <TabsTrigger value="popular">Más descargados</TabsTrigger>
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de archivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="zip">Comprimido</SelectItem>
              <SelectItem value="ppt">Presentación</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border shadow-elegant overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Subido por</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Descargas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>{getFileIcon(material.type)}</TableCell>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.course}</TableCell>
                    <TableCell>{material.size}</TableCell>
                    <TableCell>{material.uploadedBy}</TableCell>
                    <TableCell>{material.createdAt}</TableCell>
                    <TableCell>{material.downloadCount}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <p className="text-muted-foreground">No se encontraron materiales</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Materials;
