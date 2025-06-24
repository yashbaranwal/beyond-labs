export type WebsiteFormData = {
    websiteUrl: string
    language: string
    country: string
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