"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Dollar from "@/components/dollar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { countries } from "@/constants/countries";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import AcceptBadge from "@/components/accept-badge";
import { mainCategories } from "@/constants/categories";
import BulletSection from "./_components/bullet-section";
import { useFormStore } from "@/stores/add-website-form-store";
import { flagComponentsMap, languages } from "@/constants/languages";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  acceptPreconditions: z.boolean(),
  websiteUrl: z
    .string()
    .min(1, { message: "Website URL is required" })
    .url({ message: "Please enter a valid URL (e.g., https://beyondlabs.io)" }),
  primaryLanguage: z.string({
    required_error: "Please select language",
  }),
  majorityTraffic: z.string({
    required_error: "Please select an option",
  }),
  mainCategories: z.array(z.string()).optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(350, {
      message: "Minimum 350 Characters",
    }),
  isOwner: z.boolean().optional(),
  normalOfferGuestPosting: z.coerce
    .number()
    .min(0, { message: "Value cannot be negative" })
    .optional(),
  normalOfferLinkInsertion: z.coerce
    .number()
    .min(0, { message: "Value cannot be negative" })
    .optional(),
  homepageLinkPrice: z.coerce
    .number()
    .min(0, { message: "Value cannot be negative" })
    .optional(),
  homepageLinkDescription: z
    .string({ required_error: "Description is required" })
    .min(350, {
      message: "Minimum 350 Characters",
    }),
  isArticleIncluded: z.enum(["yes", "no"]),
  numberOfWords: z.string(),
  numberOfWordsMinWords: z.coerce
    .number()
    .min(1, { message: "Minimum must be greater than 0" })
    .optional()
    .or(z.literal("")),
  numberOfWordsMaxWords: z.coerce
    .number()
    .min(1, { message: "Maximum must be greater than 0" })
    .optional()
    .or(z.literal("")),
  doFollow: z.enum(["yes", "no"]),
  linksAllowed: z.enum(["brand-links", "branded-generic", "mixed", "all"]),
  taggingArticles: z.enum(["not-tag", "tagged-only", "tag-articles", "all"]),
  numberOfLinks: z.enum(["not-tag"]),
  otherLinks: z.enum(["yes", "no"]),
  articleDescription: z.string().optional(),
});

export default function AddWebsite() {
  const [openItem, setOpenItem] = useState("item-1")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptPreconditions: false,
      websiteUrl: "",
      primaryLanguage: "en-GB",
      majorityTraffic: "en-US",
      mainCategories: ["art", "energy-solar-energy" ,"gaming"],
      isOwner: false,
      normalOfferGuestPosting: 54,
      normalOfferLinkInsertion: 54,
      homepageLinkPrice: 54,
      isArticleIncluded: "yes",
      numberOfWords: "not-limited",
      numberOfWordsMinWords: "",
      numberOfWordsMaxWords: "",
      doFollow: "yes",
      linksAllowed: "brand-links",
      taggingArticles: "not-tag",
      numberOfLinks: "not-tag",
      otherLinks: "yes",
      articleDescription: "",
    },
  });

  const selectedValue = useWatch({
    control: form.control,
    name: "numberOfWords",
  });

  const isAccepted = useWatch({
    control: form.control,
    name: "acceptPreconditions",
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {

    console.log(data);
    useFormStore.getState().addFormData(data);
  };

  const handleAccept = () => {
    form.setValue("acceptPreconditions", true)
    setOpenItem(undefined) // close the accordion
  }

  return (
    <main className="bg-background p-6">
      <h2 className="font-semibold xl:ml-24 text-3xl text-foreground">
        Add a website
      </h2>
      <div className="mt-18 xl:px-16 space-y-16">
        <BulletSection />
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
                review all required preconditions. Accepting these is mandatory
                to continue. It ensures your submission meets our platform
                standards and avoids delays. Listings that don&apos;t meet these
                terms may be rejected. Take a moment to go through them
                carefully before moving ahead. Once accepted, you&apos;ll be
                able to start listing right away.
              </p>
              {isAccepted ? (
                <AcceptBadge />
              ) : (
                <Button
                  className="w-48"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Form {...form}>
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
                    name="primaryLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website&apos;s Primary language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map((lang) => {
                              const FlagComponent =
                                flagComponentsMap[lang.flagCode];
                              return (
                                <SelectItem key={lang.value} value={lang.value}>
                                  <div className="flex items-center gap-2">
                                    {FlagComponent && (
                                      <FlagComponent className="h-4 w-4" />
                                    )}
                                    <span>{lang.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="majorityTraffic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Your Majority of traffic comes from
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => {
                              const FlagComponent =
                                flagComponentsMap[country.flagCode];
                              return (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  <div className="flex items-center gap-2">
                                    {FlagComponent && (
                                      <FlagComponent className="h-4 w-4" />
                                    )}
                                    <span>{country.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
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
              <div className="bg-white rounded-sm p-6 space-y-8 w-10/12">
                <Tabs defaultValue="normal-offer">
                  <TabsList>
                    <TabsTrigger value="normal-offer">Normal offer</TabsTrigger>
                    <TabsTrigger value="grey-niche-offer">
                      Grey Niche offer
                    </TabsTrigger>
                    <TabsTrigger value="homepage-link">
                      Homepage link
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="normal-offer">
                    <div className="pt-10 flex items-center gap-8">
                      <FormField
                        control={form.control}
                        name="normalOfferGuestPosting"
                        render={({ field }) => (
                          <FormItem className="w-3/12">
                            <FormLabel>Guest posting</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Dollar />
                                <Input
                                  {...field}
                                  onChange={(event) => {
                                    field.onChange(event.target.value);
                                  }}
                                  className="flex-1 rounded-l-none focus-visible:z-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="normalOfferLinkInsertion"
                        render={({ field }) => (
                          <FormItem className="w-3/12">
                            <FormLabel>Link insertion</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Dollar />
                                <Input
                                  {...field}
                                  onChange={(event) => {
                                    field.onChange(event.target.value);
                                  }}
                                  className="flex-1 rounded-l-none focus-visible:z-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="homepage-link">
                    <div className="pt-8 space-y-8">
                      <FormField
                        control={form.control}
                        name="homepageLinkPrice"
                        render={({ field }) => (
                          <FormItem className="w-3/12">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Dollar />
                                <Input
                                  {...field}
                                  onChange={(event) => {
                                    field.onChange(event.target.value);
                                  }}
                                  className="flex-1 rounded-l-none focus-visible:z-10"
                                />
                              </div>
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
                                className="h-28 w-6/12"
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
                            defaultValue={field.value}
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
                              defaultValue={field.value}
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
                            defaultValue={field.value}
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
                            defaultValue={field.value}
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
                            defaultValue={field.value}
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
                            defaultValue={field.value}
                            className="flex flex-col"
                          >
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="not-limited" />
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
                            defaultValue={field.value}
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
}
