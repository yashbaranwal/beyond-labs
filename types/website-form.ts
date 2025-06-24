import { z } from "zod"
import { formSchema } from "@/app/my-websites/add-website/page"

export type WebsiteFormInput = z.infer<typeof formSchema>

export type WebsiteFormData = WebsiteFormInput & {
  id: string
}
