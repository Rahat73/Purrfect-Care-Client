import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";
import { IInput } from "@/src/types";

export default function AppTextarea({
  name,
  label,
  variant = "bordered",
  placeholder,
}: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      variant={variant}
      placeholder={placeholder}
    />
  );
}
