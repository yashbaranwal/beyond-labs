import { WebsiteFormData } from "@/types/website-form"
import { create } from "zustand"

type FormStore = {
  tableData: WebsiteFormData[]
  addFormData: (data: WebsiteFormData) => void
}

export const useFormStore = create<FormStore>((set) => ({
  tableData: [],
  addFormData: (data) =>
    set((state) => ({
      tableData: [...state.tableData, data],
    })),
}))
