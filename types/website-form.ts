import { z } from "zod"
import { formSchema } from "@/app/my-websites/_components/website-form"

export type WebsiteFormInput = z.infer<typeof formSchema>

export type WebsiteFormData = WebsiteFormInput & {
  id: string
}
