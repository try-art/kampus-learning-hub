
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Book, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  User,
  FileText,
  Calendar,
  Edit
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isCollapsed,
  isActive
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-elegant group",
        isActive && "bg-sidebar-accent font-medium"
      )}
    >
      <div className="text-sidebar-foreground">
        {icon}
      </div>
      {!isCollapsed && (
        <span className="animate-fade-in">{label}</span>
      )}
      {isCollapsed && (
        <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-sidebar-accent text-sidebar-foreground text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {label}
        </span>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, isAdmin, isInstructor } = useAuth();
  const location = useLocation();
  
  const adminMenuItems = [
    { icon: <Book size={20} />, label: 'Cursos', to: '/courses' },
    { icon: <Users size={20} />, label: 'Usuarios', to: '/users' },
    { icon: <FileText size={20} />, label: 'Materiales', to: '/materials' },
    { icon: <Calendar size={20} />, label: 'Calendario', to: '/calendar' },
    { icon: <Settings size={20} />, label: 'Configuración', to: '/settings' },
  ];
  
  const instructorMenuItems = [
    { icon: <Edit size={20} />, label: 'Dashboard', to: '/instructor-profile' },
    { icon: <Book size={20} />, label: 'Cursos', to: '/courses' },
    { icon: <FileText size={20} />, label: 'Materiales', to: '/materials' },
    { icon: <Calendar size={20} />, label: 'Calendario', to: '/calendar' },
    { icon: <Settings size={20} />, label: 'Configuración', to: '/settings' },
  ];
  
  const userMenuItems = [
    { icon: <Book size={20} />, label: 'Mis Cursos', to: '/my-courses' },
    { icon: <FileText size={20} />, label: 'Materiales', to: '/my-materials' },
    { icon: <Calendar size={20} />, label: 'Calendario', to: '/my-calendar' },
    { icon: <Settings size={20} />, label: 'Configuración', to: '/settings' },
  ];
  
  let menuItems;
  if (isAdmin()) {
    menuItems = adminMenuItems;
  } else if (isInstructor()) {
    menuItems = instructorMenuItems;
  } else {
    menuItems = userMenuItems;
  }

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300 shadow-elegant relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <Link to="/" className="font-bold text-xl text-sidebar-foreground animate-fade-in">
            Campus<span className="text-sidebar-primary">LMS</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground ml-auto"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      {user && (
        <div className={cn(
          "flex items-center gap-3 p-4 border-b border-sidebar-border",
          isCollapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-full w-full object-cover"
            />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <p className="font-medium text-sidebar-foreground text-sm">{user.name}</p>
              <p className="text-sidebar-foreground/70 text-xs">
                {user.role === 'admin' ? 'Administrador' : 
                 user.role === 'instructor' ? 'Instructor' : 'Estudiante'}
              </p>
            </div>
          )}
        </div>
      )}
      
      <nav className="flex-1 py-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.to}
              icon={item.icon} 
              label={item.label} 
              to={item.to} 
              isCollapsed={isCollapsed}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>
      </nav>
      
      <div className="p-2 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
            isCollapsed && "justify-center"
          )}
          onClick={logout}
        >
          <LogOut size={20} className="mr-2" />
          {!isCollapsed && <span>Cerrar sesión</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
