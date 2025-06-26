"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDownIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { countries } from "@/constants/countries";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import AcceptBadge from "@/components/accept-badge";
import { mainCategories } from "@/constants/categories";
import { WebsiteFormInput } from "@/types/website-form";
import { PriceInput } from "@/components/ui/price-input";
import { useFormStore } from "@/stores/add-website-form-store";
import { websitFormTabs } from "@/constants/website-form-tabs";
import { flagComponentsMap, languages } from "@/constants/languages";
import BulletSection from "../add-website/_components/bullet-section";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  greyNicheOfferSamePrice: z.string().optional(),
  greyNicheOffers: z.object({
    gambling: z.object({
      guestPosting: priceSchema,
      linkInsertion: priceSchema,
    }),
    crypto: z.object({
      guestPosting: priceSchema,
      linkInsertion: priceSchema,
    }),
    adult: z.object({
      guestPosting: priceSchema,
      linkInsertion: priceSchema,
    }),
    casino: z.object({
      guestPosting: priceSchema,
      linkInsertion: priceSchema,
    }),
    betting: z.object({
      guestPosting: priceSchema,
      linkInsertion: priceSchema,
    }),
    forex: z.object({
      guestPosting: priceSchema,
      linkInsertion: priceSchema,
    }),
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

const nicheKeys = ["gambling", "crypto", "adult", "casino", "betting", "forex"];

const WebsiteForm = ({ id }: { id?: string }) => {
  const router = useRouter();
  const { tableData, addFormData, updateFormData } = useFormStore();
  const [tab, setTab] = useState<string>("normal-offer");
  const [openPrimaryLanguagePopover, setOpenPrimaryLanguagePopover] =
    useState(false);
  const [openMajorityTrafficPopover, setOpenMajorityTrafficPopover] =
    useState(false);
  const [openItem, setOpenItem] = useState<string | undefined>("item-1");

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
      greyNicheOfferSamePrice: "",
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

  const selectedValue = useWatch({
    control: form.control,
    name: "numberOfWords",
  });

  const numberOfLinksValue = useWatch({
    control: form.control,
    name: "numberOfLinks",
  });

  const isAccepted = useWatch({
    control: form.control,
    name: "acceptPreconditions",
  });

  const watchGreyNicheSamePrice =
    useWatch({
      control: form.control,
      name: "greyNiche",
    }) === "same-price";

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      updateFormData({ ...data, id: id });
    } else {
      addFormData({ ...data, id: uuidv4() });
    }
    router.push("/my-websites");
  };

  const handleAccept = () => {
    form.setValue("acceptPreconditions", true);
    setOpenItem(undefined);
  };

  useEffect(() => {
    const websiteDetails = tableData.find((ele) => ele.id === id);
    if (websiteDetails) {
      form.reset(websiteDetails);
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
            value={openItem}
            onValueChange={setOpenItem}
            className="px-6 py-0 bg-secondary border border-gray rounded-md"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="flex-1">
                  Hey, Accept Preconditions before you start the listing!
                </p>
                {isAccepted ? (
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
                {isAccepted ? (
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
            <div className="space-y-6">
              <h3 className="heading-three">Website Detail</h3>
              <div className="bg-white rounded-sm p-6 space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Website&apos;s Primary language</FormLabel>
                        <Popover
                          open={openPrimaryLanguagePopover}
                          onOpenChange={setOpenPrimaryLanguagePopover}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openPrimaryLanguagePopover}
                                className="w-full justify-between"
                              >
                                {field.value
                                  ? languages.find(
                                      (lang) => lang.value === field.value
                                    )?.label
                                  : "Select language..."}
                                <ChevronDownIcon className="size-5 text-[#667085] stroke-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command>
                              <CommandInput placeholder="Search language..." />
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {languages.map((lang) => {
                                  const FlagComponent =
                                    flagComponentsMap[lang.flagCode];
                                  return (
                                    <CommandItem
                                      value={lang.label}
                                      key={lang.value}
                                      onSelect={() => {
                                        form.setValue("language", lang.value);
                                        setOpenPrimaryLanguagePopover(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          lang.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      <div className="flex items-center gap-2">
                                        {FlagComponent && (
                                          <FlagComponent className="h-4 w-4" />
                                        )}
                                        <span>{lang.label}</span>
                                      </div>
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Your Majority of traffic comes from
                        </FormLabel>
                        <Popover
                          open={openMajorityTrafficPopover}
                          onOpenChange={setOpenMajorityTrafficPopover}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openMajorityTrafficPopover}
                                className="w-full justify-between"
                              >
                                {field.value
                                  ? countries.find(
                                      (country) => country.value === field.value
                                    )?.label
                                  : "Select country..."}
                                <ChevronDownIcon className="size-5 text-[#667085] stroke-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command>
                              <CommandInput placeholder="Search country..." />
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((country) => {
                                  const FlagComponent =
                                    flagComponentsMap[country.flagCode];
                                  return (
                                    <CommandItem
                                      value={country.label}
                                      key={country.value}
                                      onSelect={() => {
                                        form.setValue("country", country.value);
                                        setOpenMajorityTrafficPopover(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          country.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      <div className="flex items-center gap-2">
                                        {FlagComponent && (
                                          <FlagComponent className="h-4 w-4" />
                                        )}
                                        <span>{country.label}</span>
                                      </div>
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mainCategories"
                  render={() => (
                    <FormItem>
                      <FormLabel className="mb-2">Main Category</FormLabel>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-6">
                        {mainCategories.map((category) => (
                          <FormField
                            key={category.value}
                            control={form.control}
                            name="mainCategories"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      className="size-5"
                                      checked={field.value?.includes(
                                        category.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              category.value,
                                            ])
                                          : field.onChange(
                                              (field.value || []).filter(
                                                (value) =>
                                                  value !== category.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal text-foreground/80 cursor-pointer">
                                    {category.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description of Website</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="h-28 w-9/12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isOwner"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>I am the owner of the website</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="heading-three">Create offer</h3>
              <div className="bg-white rounded-sm p-6 space-y-8 w-full xl:w-10/12">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="hidden md:inline-flex">
                    <TabsTrigger value="normal-offer">Normal offer</TabsTrigger>
                    <TabsTrigger value="grey-niche-offer">
                      Grey Niche offer
                    </TabsTrigger>
                    <TabsTrigger value="homepage-link">
                      Homepage link
                    </TabsTrigger>
                  </TabsList>
                  <Select onValueChange={setTab} defaultValue={tab}>
                    <SelectTrigger className="w-full md:hidden">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {websitFormTabs.map((ele) => (
                        <SelectItem key={ele.value} value={ele.value}>
                          {ele.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <TabsContent value="normal-offer">
                    <div className="pt-10 flex flex-col xl:flex-row xl:items-center gap-8">
                      <FormField
                        control={form.control}
                        name="normalOfferGuestPosting"
                        render={({ field }) => (
                          <FormItem className="w-full xl:w-3/12">
                            <FormLabel>Guest posting</FormLabel>
                            <FormControl>
                              <PriceInput
                                {...field}
                                onChange={(event) => {
                                  field.onChange(event.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="normalOfferLinkInsertion"
                        render={({ field }) => (
                          <FormItem className="w-full xl:w-3/12">
                            <FormLabel>Link insertion</FormLabel>
                            <FormControl>
                              <PriceInput
                                {...field}
                                onChange={(event) => {
                                  field.onChange(event.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="grey-niche-offer">
                    <div className="pt-10 space-y-4">
                      <FormField
                        control={form.control}
                        name="greyNiche"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col"
                              >
                                <FormItem className="flex items-center gap-3">
                                  <FormControl>
                                    <RadioGroupItem value="same-price" />
                                  </FormControl>
                                  <FormLabel className="radio-form-label">
                                    I offer same price for all grey niches
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {watchGreyNicheSamePrice && (
                        <FormField
                          control={form.control}
                          name="greyNicheOfferSamePrice"
                          render={({ field }) => (
                            <FormItem className="w-full xl:w-3/12">
                              <FormLabel>Enter Price</FormLabel>
                              <FormControl>
                                <PriceInput
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {/* Individual niche inputs */}
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                        {nicheKeys.map((key) => (
                          <div key={key} className="space-y-4">
                            <h6 className="font-semibold text-foreground/60 capitalize">
                              {key}
                            </h6>
                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name={`greyNicheOffers.${key}.guestPosting`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Price for Guest Posting
                                    </FormLabel>
                                    <FormControl>
                                      <PriceInput
                                        {...field}
                                        disabled={watchGreyNicheSamePrice}
                                        onChange={(e) =>
                                          field.onChange(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`greyNicheOffers.${key}.linkInsertion`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Price for Link Insertion
                                    </FormLabel>
                                    <FormControl>
                                      <PriceInput
                                        {...field}
                                        disabled={watchGreyNicheSamePrice}
                                        onChange={(e) =>
                                          field.onChange(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="homepage-link">
                    <div className="pt-8 space-y-8">
                      <FormField
                        control={form.control}
                        name="homepageLinkPrice"
                        render={({ field }) => (
                          <FormItem className="w-full xl:w-3/12">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <PriceInput
                                {...field}
                                onChange={(event) => {
                                  field.onChange(event.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="homepageLinkDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Guidelines</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Description"
                                className="h-28 w-full xl:w-6/12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="heading-three">Article specification</h3>
              <div className="bg-white rounded-sm p-6 grid grid-cols-1 xl:grid-cols-2 gap-4 xl:w-10/12">
                <div className="flex-1 space-y-12">
                  <FormField
                    control={form.control}
                    name="isArticleIncluded"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-normal">
                          Is writing of an article included in the offer?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                No, the advertiser (client) needs to provide the
                                content
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="numberOfWords"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-normal">
                            Number of words in the article
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col"
                            >
                              <FormItem className="flex items-center gap-3">
                                <FormControl>
                                  <RadioGroupItem value="not-limited" />
                                </FormControl>
                                <FormLabel className="radio-form-label">
                                  Length of the article is not limited.
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center gap-3">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="radio-form-label">
                                  No, the advertiser (client) needs to provide
                                  the content
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedValue === "no" && (
                      <div className="flex gap-12 px-6">
                        <FormField
                          control={form.control}
                          name="numberOfWordsMinWords"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-20"
                                  placeholder="Min"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberOfWordsMaxWords"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-20"
                                  placeholder="Max"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="doFollow"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-normal">
                          I allow DOFOLLOW links in the article
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linksAllowed"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-normal">
                          Type of links allowed:
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="brand-links" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                Only brand links, URL, navigational, graphic
                                links.
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="branded-generic" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                Only branded and generic links.
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="mixed" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                Also mixed links (partly exact match anchors).
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="all" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                All links, including exact match anchors.
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 space-y-12">
                  <FormField
                    control={form.control}
                    name="taggingArticles"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-normal">
                          Tagging articles policy:
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="not-tag" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                We do not tag paid articles.
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="tagged-only" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                Articles are tagged only at the
                                advertiser&apos;s request.
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="tag-articles" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                We always tag articles: &quot;Sponsored
                                article&quot;.
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="all" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                All links, including exact match anchors.
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="numberOfLinks"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-normal">
                            A number of links to the advertiser in the article:
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col"
                            >
                              <FormItem className="flex items-center gap-3">
                                <FormControl>
                                  <RadioGroupItem value="not-tag" />
                                </FormControl>
                                <FormLabel className="radio-form-label">
                                  We do not tag paid articles.
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center gap-3">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="radio-form-label">
                                  A maximum number of links to the advertiser:
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {numberOfLinksValue === "no" && (
                      <div className="flex gap-12 px-6">
                        <FormField
                          control={form.control}
                          name="numberOfLinksMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-20"
                                  placeholder="Min"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numberOfLinksMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-20"
                                  placeholder="Max"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="otherLinks"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-normal">
                          Other links in the article:
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                We allow links to other websites in the content
                                of the article.
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="radio-form-label">
                                We DO NOT allow links to other websites in the
                                content of the article.
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="articleDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Other content rules/specifications:{" "}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description"
                            className="h-28"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button className="w-64" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default WebsiteForm;
