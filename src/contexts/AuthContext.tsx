
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Define user types
export type UserRole = 'admin' | 'instructor' | 'user';

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatar: string | null;
  bio: string | null;
  website: string | null;
  phone: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isInstructor: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Función para cargar el perfil del usuario
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error cargando perfil:', error);
        return;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error en loadUserProfile:', error);
    }
  };

  // Configurar escucha de cambios de autenticación
  useEffect(() => {
    // Configuramos primero el listener de cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);

        // Si tenemos un usuario, cargamos su perfil
        if (session?.user) {
          setTimeout(() => {
            loadUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Verificamos si hay una sesión existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    // Limpiar la suscripción al desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Limpiamos cualquier estado de autenticación existente
      cleanupAuthState();
      
      // Intentamos cerrar sesión global por si acaso
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continuamos incluso si esto falla
      }
      
      // Iniciamos sesión
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Si tenemos usuario y sesión, configuramos el estado
      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        await loadUserProfile(data.user.id);
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido de nuevo, ${data.user.email}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "Ocurrió un error al iniciar sesión",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Limpiamos el estado de autenticación
      cleanupAuthState();
      
      // Intentamos cerrar sesión global
      await supabase.auth.signOut({ scope: 'global' });
      
      // Limpiamos el estado local
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente"
      });
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ocurrió un error al cerrar sesión",
        variant: "destructive"
      });
    }
  };

  const isAdmin = () => {
    return profile?.role === 'admin';
  };
  
  const isInstructor = () => {
    return profile?.role === 'instructor';
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile,
        session,
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout,
        isAdmin,
        isInstructor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
