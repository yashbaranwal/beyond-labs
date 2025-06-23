"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BulletSection from "./_components/bullet-section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mainCategories } from "@/constants/categories";
import { flagComponentsMap, languages } from "@/constants/languages";
import { countries } from "@/constants/countries";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
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
  description: z.string().min(350, {
    message: "Minimum 350 Characters",
  }),
});

export default function AddWebsite() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteUrl: "",
      primaryLanguage: "en-GB",
      majorityTraffic: "en-US",
      mainCategories: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main className="bg-background p-6">
      <h2 className="font-semibold ml-24 text-3xl text-foreground">
        Add a website
      </h2>
      <div className="mt-18 px-16 space-y-16">
        <BulletSection />
        <Accordion
          type="single"
          collapsible
          className="px-6 py-0 bg-secondary border border-gray rounded-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="flex-1">
                Hey, Accept Preconditions before you start the listing!
              </p>
              <Badge variant="pending">
                <div className="size-3 bg-lemon rounded-full mr-2" />
                Pending
              </Badge>
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-regular text-sm text-foreground/60 max-w-6xl">
                Before you can proceed with your listing, please make sure to
                review all required preconditions. Accepting these is mandatory
                to continue. It ensures your submission meets our
                platformstandards and avoids delays. Listings that don&apos;t
                meet these terms may be rejected. Take a moment to go through
                them carefully before moving ahead. Once accepted, you&apos;ll
                be able to start listing right away.
              </p>
              <Button className="mt-4 w-48">Accept</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <h3 className="heading-three">Website Detail</h3>
              <div className="bg-white rounded-sm p-6 space-y-8">
                <div className="grid grid-cols-4 gap-8">
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

                {/* <FormField
                  control={form.control}
                  name="mainCategories"
                  render={() => (
                    <FormItem>
                      <FormLabel className="mb-2">Main Category</FormLabel>
                      {mainCategories.map((category) => (
                        <FormField
                          key={category.value}
                          control={form.control}
                          name="items"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={category.value}
                                className="flex flex-row items-center gap-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      category.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            category.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== category.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {category.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
