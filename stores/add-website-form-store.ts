import { create } from "zustand"
import { WebsiteFormData } from "@/types/website-form"
import { persist, createJSONStorage } from "zustand/middleware"

type FormStore = {
  tableData: WebsiteFormData[]
  addFormData: (data: WebsiteFormData) => void
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      tableData: [], 
      addFormData: (data) =>
        set((state) => ({
          tableData: [...state.tableData, data],
        })),
    }),
    {
      name: "website-form-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
)