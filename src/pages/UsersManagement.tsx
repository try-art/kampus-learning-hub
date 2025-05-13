
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Search, Plus, UserPlus, Mail, MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock users data
const users = [
  {
    id: "user-1",
    name: "María González",
    email: "maria@example.com",
    role: "student",
    status: "active",
    courses: 3,
    lastLogin: "2023-08-15 14:30",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "user-2",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "student",
    status: "active",
    courses: 2,
    lastLogin: "2023-08-14 10:25",
    avatar: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  },
  {
    id: "user-3",
    name: "Ana Martínez",
    email: "ana@example.com",
    role: "admin",
    status: "active",
    courses: 0,
    lastLogin: "2023-08-15 09:45",
    avatar: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
  },
  {
    id: "user-4",
    name: "Carlos López",
    email: "carlos@example.com",
    role: "instructor",
    status: "active",
    courses: 2,
    lastLogin: "2023-08-13 16:20",
    avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  },
  {
    id: "user-5",
    name: "Laura Sánchez",
    email: "laura@example.com",
    role: "student",
    status: "inactive",
    courses: 1,
    lastLogin: "2023-07-30 11:10",
    avatar: "https://images.unsplash.com/photo-1527576539890-dfa815648363"
  }
];

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'table' | 'grid'>('table');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ? true : user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'instructor': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Layout requireAdmin={true}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">Administra los usuarios de la plataforma</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="inline-flex items-center justify-center">
              <UserPlus size={16} className="mr-2" />
              Invitar usuario
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="student">Estudiante</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex rounded-md border">
              <Button 
                variant={view === 'table' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-r-none border-r"
                onClick={() => setView('table')}
              >
                Tabla
              </Button>
              <Button 
                variant={view === 'grid' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-l-none"
                onClick={() => setView('grid')}
              >
                Tarjetas
              </Button>
            </div>
          </div>
        </div>

        {view === 'table' ? (
          <div className="rounded-lg border shadow-elegant overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Cursos</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(user.role)}`}>
                          {user.role === 'admin' ? 'Administrador' : 
                           user.role === 'instructor' ? 'Instructor' : 'Estudiante'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(user.status)}`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </TableCell>
                      <TableCell>{user.courses}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm">
                          <Mail size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">No se encontraron usuarios</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card key={user.id} className="shadow-elegant">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <CardDescription>{user.email}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Rol</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(user.role)}`}>
                        {user.role === 'admin' ? 'Administrador' : 
                         user.role === 'instructor' ? 'Instructor' : 'Estudiante'}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Estado</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(user.status)}`}>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cursos inscritos</span>
                      <span>{user.courses}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm">
                      <Mail size={14} className="mr-1" /> 
                      Contactar
                    </Button>
                    {user.status === 'active' ? (
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <UserX size={14} className="mr-1" /> 
                        Desactivar
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-green-500">
                        <UserCheck size={14} className="mr-1" /> 
                        Activar
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No se encontraron usuarios</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UsersManagement;
