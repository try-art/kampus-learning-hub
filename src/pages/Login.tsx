
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      console.error('Error de inicio de sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setIsLoading(true);
    
    try {
      // Primero intentamos verificar si el usuario ya existe
      const { data: existingUser, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', 'admin@campuslms.com')
        .maybeSingle();
      
      if (existingUser) {
        toast({
          title: "Este usuario ya existe",
          description: "Puedes iniciar sesión con el correo admin@campuslms.com y la contraseña admin123",
        });
        setEmail('admin@campuslms.com');
        setPassword('admin123');
        setIsLoading(false);
        return;
      }

      // Si el usuario no existe, creamos la cuenta directamente con signUp
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@campuslms.com',
        password: 'admin123',
        options: {
          data: {
            name: 'Administrador',
            role: 'admin'
          }
        }
      });
      
      if (error) {
        toast({
          title: "Error al crear usuario",
          description: error.message,
          variant: "destructive"
        });
      } else {
        // Creación exitosa, intentamos asegurarnos que el trigger para perfiles funcionó
        // esperando un momento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificamos si se creó el perfil, si no, lo creamos manualmente
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user?.id)
          .maybeSingle();
        
        if (!profile && data.user) {
          // Si no existe el perfil, lo creamos manualmente
          await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: 'admin@campuslms.com',
              name: 'Administrador',
              role: 'admin'
            });
        }
        
        toast({
          title: "Usuario administrador creado",
          description: "Correo: admin@campuslms.com, Contraseña: admin123",
        });
        
        setEmail('admin@campuslms.com');
        setPassword('admin123');
      }
    } catch (error: any) {
      toast({
        title: "Error al crear usuario",
        description: error.message || "Ocurrió un error al crear el usuario",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth={false}>
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Campus<span className="text-accent">LMS</span></h1>
            <p className="text-muted-foreground mt-2">Plataforma de aprendizaje online</p>
          </div>
          
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Iniciar sesión</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder a la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-elegant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-elegant"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-elegant"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                      Iniciando sesión...
                    </span>
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground text-center w-full">
                <span>Para iniciar sesión, crea el usuario administrador:</span>
                <div className="mt-2 grid grid-cols-1 gap-2 text-xs">
                  <div className="border rounded-md p-2">
                    <p><strong>Administrador</strong></p>
                    <p>admin@campuslms.com</p>
                    <p>contraseña: admin123</p>
                    <Button 
                      onClick={handleCreateUser} 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full"
                      disabled={isLoading}
                    >
                      Crear usuario administrador
                    </Button>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
