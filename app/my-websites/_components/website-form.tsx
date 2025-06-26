"use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AcceptBadge from "@/components/accept-badge";
import { WebsiteFormInput } from "@/types/website-form";
import CreateOfferSection from "./create-offer-section";
import WebsiteDetailSection from "./website-detail-section";
import { useFormStore } from "@/stores/add-website-form-store";
import BulletSection from "../add-website/_components/bullet-section";
import ArticleSpecificationSection from "./article-specification-section";

// Schema for common price fields (guest posting and link insertion)
const priceSchema = z.coerce
  .number({
    invalid_type_error: "Price must be a number",
  })
  .min(0, { message: "Value cannot be negative" })
  .optional();

// Schema for min/max word/link counts
const minMaxNumberSchema = z.coerce
  .number()
  .min(1, { message: "Minimum must be greater than 0" })
  .optional()
  .or(z.literal(""));

const greyNicheOffersSchema = z.object({
  guestPosting: priceSchema,
  linkInsertion: priceSchema,
});

export const formSchema = z.object({
  // Basic Information
  acceptPreconditions: z.boolean(),
  websiteUrl: z
    .string()
    .min(1, { message: "Website URL is required" })
    .url({ message: "Please enter a valid URL (e.g., https://beyondlabs.io)" }),
  language: z.string({
    required_error: "Please select language",
  }),
  country: z.string({
    required_error: "Please select an option",
  }),
  mainCategories: z.array(z.string()).optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(350, {
      message: "Minimum 350 Characters",
    }),
  isOwner: z.boolean().optional(),

  // Offer Details
  normalOfferGuestPosting: priceSchema,
  normalOfferLinkInsertion: priceSchema,

  // Grey Niche Offers
  greyNiche: z.enum(["same-price"]).optional(),
  greyNicheOfferSamePrice: priceSchema,
  greyNicheOffers: z.object({
    gambling: greyNicheOffersSchema,
    crypto: greyNicheOffersSchema,
    adult: greyNicheOffersSchema,
    casino: greyNicheOffersSchema,
    betting: greyNicheOffersSchema,
    forex: greyNicheOffersSchema,
  }),

  // Homepage Link Details
  homepageLinkPrice: priceSchema,
  homepageLinkDescription: z
    .string({ required_error: "Description is required" })
    .min(350, {
      message: "Minimum 350 Characters",
    }),

  // Article Details
  isArticleIncluded: z.enum(["yes", "no"]),
  numberOfWords: z.enum(["not-limited", "no"]),
  numberOfWordsMinWords: minMaxNumberSchema,
  numberOfWordsMaxWords: minMaxNumberSchema,
  doFollow: z.enum(["yes", "no"]),
  linksAllowed: z.enum(["brand-links", "branded-generic", "mixed", "all"]),
  taggingArticles: z.enum(["not-tag", "tagged-only", "tag-articles", "all"]),
  numberOfLinks: z.enum(["not-tag", "no"]),
  numberOfLinksMin: minMaxNumberSchema,
  numberOfLinksMax: minMaxNumberSchema,
  otherLinks: z.enum(["yes", "no"]),
  articleDescription: z.string().optional(),
});

const WebsiteForm = ({ id }: { id?: string }) => {
  const router = useRouter();
  const { tableData, addFormData, updateFormData } = useFormStore();
  const [tab, setTab] = useState<string>("normal-offer");
  const [openPrimaryLanguagePopover, setOpenPrimaryLanguagePopover] =
    useState(false);
  const [openMajorityTrafficPopover, setOpenMajorityTrafficPopover] =
    useState(false);
  const [openAccordionItem, setOpenAccordionItem] = useState<
    string | undefined
  >("item-1");

  const form = useForm<WebsiteFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptPreconditions: false,
      websiteUrl: "",
      language: "en-GB",
      country: "en-US",
      mainCategories: ["art", "energy-solar-energy", "gaming"],
      isOwner: false,
      description: "",
      normalOfferGuestPosting: 54,
      normalOfferLinkInsertion: 54,
      greyNiche: undefined,
      greyNicheOfferSamePrice: undefined,
      greyNicheOffers: {
        gambling: { guestPosting: undefined, linkInsertion: undefined },
        crypto: { guestPosting: undefined, linkInsertion: undefined },
        adult: { guestPosting: undefined, linkInsertion: undefined },
        casino: { guestPosting: undefined, linkInsertion: undefined },
        betting: { guestPosting: undefined, linkInsertion: undefined },
        forex: { guestPosting: undefined, linkInsertion: undefined },
      },
      homepageLinkPrice: 54,
      homepageLinkDescription: "",
      isArticleIncluded: "yes",
      numberOfWords: "not-limited",
      numberOfWordsMinWords: "",
      numberOfWordsMaxWords: "",
      doFollow: "yes",
      linksAllowed: "brand-links",
      taggingArticles: "not-tag",
      numberOfLinks: "not-tag",
      numberOfLinksMin: "",
      numberOfLinksMax: "",
      otherLinks: "yes",
      articleDescription: "",
    },
  });

  const watchNumberOfWords = useWatch({
    control: form.control,
    name: "numberOfWords",
  });

  const watchNumberOfLinks = useWatch({
    control: form.control,
    name: "numberOfLinks",
  });

  const watchAcceptPreconditions = useWatch({
    control: form.control,
    name: "acceptPreconditions",
  });

  const watchGreyNicheSamePrice =
    useWatch({
      control: form.control,
      name: "greyNiche",
    }) === "same-price";

  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      if (id) {
        updateFormData({ ...data, id: id });
      } else {
        addFormData({ ...data, id: uuidv4() });
      }
      router.push("/my-websites");
    },
    [id, updateFormData, addFormData, router]
  );

  const handleAccept = useCallback(() => {
    form.setValue("acceptPreconditions", true);
    setOpenAccordionItem(undefined);
  }, [form]);

  useEffect(() => {
    if (id) {
      const websiteDetails = tableData.find((ele) => ele.id === id);
      if (websiteDetails) {
        form.reset(websiteDetails);
      }
    }
  }, [id, tableData, form]);

  return (
    <main className="bg-background p-6 pb-32">
      <h2 className="font-semibold xl:ml-24 text-3xl text-foreground">
        Add a website
      </h2>
      <div className="mt-18 xl:px-16 space-y-16">
        <BulletSection />
        <Form {...form}>
          <Accordion
            type="single"
            collapsible
            value={openAccordionItem}
            onValueChange={setOpenAccordionItem}
            className="px-6 py-0 bg-secondary border border-gray rounded-md"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="flex-1">
                  Hey, Accept Preconditions before you start the listing!
                </p>
                {watchAcceptPreconditions ? (
                  <AcceptBadge />
                ) : (
                  <Badge variant="pending">
                    <div className="size-3 bg-lemon rounded-full mr-2" />
                    Pending
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <p className="font-regular text-sm text-foreground/60 max-w-6xl mb-4">
                  Before you can proceed with your listing, please make sure to
                  review all required preconditions. Accepting these is
                  mandatory to continue. It ensures your submission meets our
                  platform standards and avoids delays. Listings that don&apos;t
                  meet these terms may be rejected. Take a moment to go through
                  them carefully before moving ahead. Once accepted, you&apos;ll
                  be able to start listing right away.
                </p>
                {watchAcceptPreconditions ? (
                  <AcceptBadge />
                ) : (
                  <Button className="w-48" onClick={handleAccept}>
                    Accept
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
            <WebsiteDetailSection
              control={form.control}
              openPrimaryLanguagePopover={openPrimaryLanguagePopover}
              setOpenPrimaryLanguagePopover={setOpenPrimaryLanguagePopover}
              openMajorityTrafficPopover={openMajorityTrafficPopover}
              setOpenMajorityTrafficPopover={setOpenMajorityTrafficPopover}
            />

            <CreateOfferSection
              control={form.control}
              tab={tab}
              setTab={setTab}
              watchGreyNicheSamePrice={watchGreyNicheSamePrice}
            />

            <ArticleSpecificationSection
              control={form.control}
              watchNumberOfWords={watchNumberOfWords}
              watchNumberOfLinks={watchNumberOfLinks}
            />
            <Button className="w-64" type="submit">
              {id ? "Update" : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default WebsiteForm;
