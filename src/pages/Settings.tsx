
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from "@/components/ui/switch";
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user, isAdmin } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    website: user?.website || '',
    phone: user?.phone || ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    newMessages: true,
    marketingEmails: false,
    systemUpdates: true
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground mt-1">Administra tu perfil y preferencias</p>
        </div>
        
        <Tabs defaultValue="profile" className="max-w-3xl">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
            {isAdmin() && <TabsTrigger value="system">Sistema</TabsTrigger>}
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="bg-card rounded-lg shadow-elegant p-6">
                <h3 className="text-xl font-medium mb-6">Información personal</h3>
                
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full overflow-hidden mb-2">
                      <img 
                        src={user?.avatar || "https://images.unsplash.com/photo-1500673922987-e212871fec22"} 
                        alt={user?.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">Cambiar foto</Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={profileForm.name} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={profileForm.email} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <textarea 
                        id="bio" 
                        name="bio" 
                        value={profileForm.bio} 
                        onChange={handleProfileChange} 
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      value={profileForm.website} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileForm.phone} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Guardar cambios</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="bg-card rounded-lg shadow-elegant p-6">
                <h3 className="text-xl font-medium mb-6">Preferencias de notificaciones</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Notificaciones por email</div>
                      <div className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</div>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications} 
                      onCheckedChange={() => handleNotificationChange('emailNotifications')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Actualizaciones de cursos</div>
                      <div className="text-sm text-muted-foreground">Notificaciones sobre nuevo contenido en tus cursos</div>
                    </div>
                    <Switch 
                      checked={notificationSettings.courseUpdates} 
                      onCheckedChange={() => handleNotificationChange('courseUpdates')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Nuevos mensajes</div>
                      <div className="text-sm text-muted-foreground">Notificaciones cuando recibas mensajes</div>
                    </div>
                    <Switch 
                      checked={notificationSettings.newMessages} 
                      onCheckedChange={() => handleNotificationChange('newMessages')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Emails de marketing</div>
                      <div className="text-sm text-muted-foreground">Recibe información sobre promociones y nuevos cursos</div>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketingEmails} 
                      onCheckedChange={() => handleNotificationChange('marketingEmails')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium">Actualizaciones del sistema</div>
                      <div className="text-sm text-muted-foreground">Información importante sobre el funcionamiento de la plataforma</div>
                    </div>
                    <Switch 
                      checked={notificationSettings.systemUpdates} 
                      onCheckedChange={() => handleNotificationChange('systemUpdates')} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button>Guardar preferencias</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              <div className="bg-card rounded-lg shadow-elegant p-6">
                <h3 className="text-xl font-medium mb-6">Seguridad de la cuenta</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Cambiar contraseña</Button>
                  </div>
                </div>
                
                <hr className="my-6" />
                
                <h3 className="text-xl font-medium mb-6">Opciones de la cuenta</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">Descargar mis datos</div>
                      <div className="text-sm text-muted-foreground">Obtén una copia de tus datos personales</div>
                    </div>
                    <Button variant="outline">Descargar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-red-500">Eliminar cuenta</div>
                      <div className="text-sm text-muted-foreground">Elimina permanentemente tu cuenta y todos tus datos</div>
                    </div>
                    <Button variant="destructive">Eliminar</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* System Tab (Admin Only) */}
          {isAdmin() && (
            <TabsContent value="system">
              <div className="space-y-6">
                <div className="bg-card rounded-lg shadow-elegant p-6">
                  <h3 className="text-xl font-medium mb-6">Configuración del sistema</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <div className="font-medium">Modo mantenimiento</div>
                        <div className="text-sm text-muted-foreground">Activar modo de mantenimiento para todos los usuarios</div>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <div className="font-medium">Registro de usuarios</div>
                        <div className="text-sm text-muted-foreground">Permitir que nuevos usuarios se registren</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <div className="font-medium">Email de bienvenida</div>
                        <div className="text-sm text-muted-foreground">Enviar email automático a nuevos usuarios</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2 py-3">
                      <Label htmlFor="system-email">Email del sistema</Label>
                      <Input id="system-email" value="sistema@campus-lms.com" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Dirección de correo usada para enviar notificaciones
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button>Guardar configuración</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
