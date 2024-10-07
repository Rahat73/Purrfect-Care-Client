import { z } from "zod";

export const addCommentValidationSchema = z.object({
  content: z.string().trim().min(1, "Comment is required"),
});
