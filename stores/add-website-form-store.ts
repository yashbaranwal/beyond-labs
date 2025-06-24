import { create } from "zustand"

type FormData = {
  websiteUrl: string
  primaryLanguage: string
  majorityTraffic: string
  mainCategories?: string[]
  description: string
  isOwner?: boolean
  normalOfferGuestPosting?: number
  normalOfferLinkInsertion?: number
  homepageLinkPrice?: number
  homepageLinkDescription: string
  isArticleIncluded: "yes" | "no"
  numberOfWords: "not-limited" | "no"
  minWords?: string
  maxWords?: string
  doFollow: "yes" | "no"
  linksAllowed: string
  taggingArticles: string
  numberOfLinks: string
  otherLinks: "yes" | "no"
  articleDescription?: string
}

type FormStore = {
  tableData: FormData[]
  addFormData: (data: FormData) => void
  resetTable: () => void
}

export const useFormStore = create<FormStore>((set) => ({
  tableData: [],
  addFormData: (data) =>
    set((state) => ({
      tableData: [...state.tableData, data],
    })),
  resetTable: () => set({ tableData: [] }),
}))
