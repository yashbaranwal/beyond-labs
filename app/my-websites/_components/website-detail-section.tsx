import { z } from "zod";
import React from "react";
import { Combobox } from "./combobox";
import { formSchema } from "./website-form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { countries } from "@/constants/countries";
import { languages } from "@/constants/languages";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { mainCategories } from "@/constants/categories";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type WebsiteFormValues = z.infer<typeof formSchema>;

interface WebsiteDetailSectionProps {
  control: UseFormReturn<WebsiteFormValues>["control"];
  openPrimaryLanguagePopover: boolean;
  setOpenPrimaryLanguagePopover: React.Dispatch<React.SetStateAction<boolean>>;
  openMajorityTrafficPopover: boolean;
  setOpenMajorityTrafficPopover: React.Dispatch<React.SetStateAction<boolean>>;
}

const WebsiteDetailSection = ({
  control,
  openPrimaryLanguagePopover,
  setOpenPrimaryLanguagePopover,
  openMajorityTrafficPopover,
  setOpenMajorityTrafficPopover,
}: WebsiteDetailSectionProps) => {
  return (
    <section className="space-y-6">
      <h3 className="heading-three">Website Detail</h3>
      <div className="bg-white rounded-sm p-6 space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <FormField
            control={control}
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
            control={control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Website&apos;s Primary language</FormLabel>
                <Combobox
                  options={languages}
                  label="Language"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select language..."
                  popoverOpen={openPrimaryLanguagePopover}
                  setPopoverOpen={setOpenPrimaryLanguagePopover}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Your Majority of traffic comes from</FormLabel>
                <Combobox
                  options={countries}
                  label="Country"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select country..."
                  popoverOpen={openMajorityTrafficPopover}
                  setPopoverOpen={setOpenMajorityTrafficPopover}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="mainCategories"
          render={() => (
            <FormItem>
              <FormLabel className="mb-2">Main Category</FormLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-6">
                {mainCategories.map((category) => (
                  <FormField
                    key={category.value}
                    control={control}
                    name="mainCategories"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              className="size-5"
                              checked={field.value?.includes(category.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      category.value,
                                    ])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== category.value
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
          control={control}
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
          control={control}
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
    </section>
  );
};

export default WebsiteDetailSection;
