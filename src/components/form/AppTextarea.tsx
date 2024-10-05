import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";
import { IInput } from "@/src/types";

export default function AppTextarea({
  name,
  label,
  variant = "bordered",
}: IInput) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });
  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      variant={variant}
      value={currentValue || ""}
    />
  );
}
