
import React from "react";
import { 
  toast as sonnerToast, 
  ExternalToast
} from "sonner";
import { 
  Toast,
  ToastState,
  ToasterToast
} from "./types";
import { 
  dispatch, 
  generateId, 
  listeners,
  memoryState 
} from "./toast-store";

function toast({ ...props }: Toast) {
  const id = generateId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Create a sanitized version of props without any problematic types
  const safeProps = { ...props };
  
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...safeProps,
      id,
    },
  });

  // Use Sonner toast
  const variant = props.variant || "default";
  const sonnerOpts: ExternalToast = { id };
  
  if (variant === "destructive") {
    sonnerToast.error(props.title as string, {
      description: props.description as string,
      ...sonnerOpts
    });
  } else {
    sonnerToast(props.title as string, {
      description: props.description as string,
      ...sonnerOpts
    });
  }

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
