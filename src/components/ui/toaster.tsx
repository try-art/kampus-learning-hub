
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, type, ...props }) {
        // Convert variant to the expected type
        const toastVariant = variant === "destructive" ? "destructive" : "default";
        
        // Remove any problematic props that might cause type errors
        const sanitizedProps = { ...props };
        delete sanitizedProps.icon;
        delete sanitizedProps.jsx;
        
        return (
          <Toast key={id} variant={toastVariant} {...sanitizedProps}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
