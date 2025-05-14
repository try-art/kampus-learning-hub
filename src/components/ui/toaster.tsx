
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
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Filter out sonner-specific props that cause type conflicts
        const compatibleProps = { ...props };
        
        // Remove any known problematic props
        delete compatibleProps.type;
        delete compatibleProps.icon;
        delete compatibleProps.jsx;
        delete compatibleProps.promise;
        delete compatibleProps.cancel;
        delete compatibleProps.onDismiss;
        delete compatibleProps.onAutoClose;
        delete compatibleProps.position;
        delete compatibleProps.unstyled;
        delete compatibleProps.style;
        delete compatibleProps.closeButton;
        delete compatibleProps.invert;
        
        // Convert variant to the expected type for shadcn Toast
        const toastVariant = variant === "destructive" ? "destructive" : "default";
        
        return (
          <Toast key={id} variant={toastVariant} {...compatibleProps}>
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
