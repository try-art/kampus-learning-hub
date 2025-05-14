
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { FileUpload, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courses, Course, Module, Lesson } from '@/data/mockData';

const formSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  courseId: z.string().min(1, 'Debes seleccionar un curso'),
  moduleId: z.string().min(1, 'Debes seleccionar un módulo'),
  lessonId: z.string().optional(),
  type: z.enum(['video', 'document', 'quiz']),
  file: z.string().min(1, 'Debes seleccionar un archivo'),
});

type FormValues = z.infer<typeof formSchema>;

interface UploadMaterialFormProps {
  onSuccess: () => void;
  instructorId?: string;
}

const UploadMaterialForm: React.FC<UploadMaterialFormProps> = ({ onSuccess, instructorId }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  
  // Filtrar cursos por instructor si se proporciona un ID de instructor
  const availableCourses = instructorId
    ? courses.filter(course => course.instructor.id === instructorId)
    : courses;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      courseId: '',
      moduleId: '',
      lessonId: '',
      type: 'document',
      file: '',
    },
  });

  const handleCourseChange = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course || null);
    setSelectedModule(null);
    form.setValue('moduleId', '');
    form.setValue('lessonId', '');
  };

  const handleModuleChange = (moduleId: string) => {
    if (selectedCourse) {
      const module = selectedCourse.modules.find(m => m.id === moduleId);
      setSelectedModule(module || null);
      form.setValue('lessonId', '');
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // En un entorno real aquí se enviaría la petición al servidor
      console.log('Material subido:', data);
      
      // Simular éxito en la subida del material
      toast({
        title: 'Material subido',
        description: `${data.title} ha sido subido exitosamente al curso seleccionado`,
      });

      onSuccess();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ha ocurrido un error al subir el material',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del material</FormLabel>
              <FormControl>
                <Input placeholder="Título del material" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripción del material" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de material</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="document">Documento</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="quiz">Evaluación</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleCourseChange(value);
                }} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedCourse && (
          <FormField
            control={form.control}
            name="moduleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Módulo</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleModuleChange(value);
                  }} 
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un módulo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCourse.modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {selectedModule && (
          <FormField
            control={form.control}
            name="lessonId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lección (opcional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una lección" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedModule.lessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Archivo</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <Input 
                    type="file" 
                    className="hidden" 
                    id="material-file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        // En un entorno real aquí se subiría el archivo
                        field.onChange(e.target.files[0].name); // Solo guardar el nombre por ahora
                      }
                    }}
                  />
                  <Label htmlFor="material-file" className="cursor-pointer flex flex-col items-center justify-center">
                    <FileUpload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium mb-1">Arrastra tu archivo aquí o haz clic para seleccionar</span>
                    <span className="text-xs text-muted-foreground">
                      {field.value ? field.value : "PDF, DOC, DOCX, PPT, MP4, etc."}
                    </span>
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit">Subir Material</Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadMaterialForm;
