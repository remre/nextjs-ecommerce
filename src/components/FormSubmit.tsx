"use client";

import { ComponentProps, experimental_useEffectEvent } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonPros = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonPros) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`btn btn-primary  ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
