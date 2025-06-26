import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PriceInput } from "@/components/ui/price-input";
import { Textarea } from "@/components/ui/textarea";
import { websitFormTabs } from "@/constants/website-form-tabs";
import { formSchema } from "./website-form";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type WebsiteFormValues = z.infer<typeof formSchema>;

interface CreateOfferSectionProps {
  control: UseFormReturn<WebsiteFormValues>["control"];
  tab: string;
  setTab: (value: string) => void;
  watchGreyNicheSamePrice: boolean;
}

const nicheKeys = ["gambling", "crypto", "adult", "casino", "betting", "forex"];

const CreateOfferSection = ({
  control,
  tab,
  setTab,
  watchGreyNicheSamePrice,
}: CreateOfferSectionProps) => {
  return (
    <section className="space-y-6">
      <h3 className="heading-three">Create offer</h3>
      <div className="bg-white rounded-sm p-6 space-y-8 w-full xl:w-10/12">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="hidden md:inline-flex">
            <TabsTrigger value="normal-offer">Normal offer</TabsTrigger>
            <TabsTrigger value="grey-niche-offer">Grey Niche offer</TabsTrigger>
            <TabsTrigger value="homepage-link">Homepage link</TabsTrigger>
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
                control={control}
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
                control={control}
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
                control={control}
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
                  control={control}
                  name="greyNicheOfferSamePrice"
                  render={({ field }) => (
                    <FormItem className="w-full xl:w-3/12">
                      <FormLabel>Enter Price</FormLabel>
                      <FormControl>
                        <PriceInput
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
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
                        control={control}
                        name={
                          `greyNicheOffers.${key}.guestPosting` as
                            | "greyNicheOffers.gambling.guestPosting"
                            | "greyNicheOffers.crypto.guestPosting"
                            | "greyNicheOffers.adult.guestPosting"
                            | "greyNicheOffers.casino.guestPosting"
                            | "greyNicheOffers.betting.guestPosting"
                            | "greyNicheOffers.forex.guestPosting"
                        }
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price for Guest Posting</FormLabel>
                            <FormControl>
                              <PriceInput
                                {...field}
                                disabled={watchGreyNicheSamePrice}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={
                          `greyNicheOffers.${key}.linkInsertion` as
                            | "greyNicheOffers.gambling.linkInsertion"
                            | "greyNicheOffers.crypto.linkInsertion"
                            | "greyNicheOffers.adult.linkInsertion"
                            | "greyNicheOffers.casino.linkInsertion"
                            | "greyNicheOffers.betting.linkInsertion"
                            | "greyNicheOffers.forex.linkInsertion"
                        }
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price for Link Insertion</FormLabel>
                            <FormControl>
                              <PriceInput
                                {...field}
                                disabled={watchGreyNicheSamePrice}
                                onChange={(e) => field.onChange(e.target.value)}
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
                control={control}
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
                control={control}
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
    </section>
  );
};

export default CreateOfferSection;
