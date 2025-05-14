
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
        // Remove any props that would cause type conflicts with shadcn Toast
        const { type, icon, jsx, promise, cancel, onDismiss, onAutoClose, position, 
                unstyled, style, closeButton, invert, ...compatibleProps } = props;
        
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
