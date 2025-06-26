import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { formSchema } from "./website-form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type WebsiteFormValues = z.infer<typeof formSchema>;

interface ArticleSpecificationSectionProps {
  control: UseFormReturn<WebsiteFormValues>["control"];
  watchNumberOfWords: string;
  watchNumberOfLinks: string;
}
const ArticleSpecificationSection = ({
  control,
  watchNumberOfWords,
  watchNumberOfLinks,
}: ArticleSpecificationSectionProps) => {
  return (
    <section className="space-y-6">
      <h3 className="heading-three">Article specification</h3>
      <div className="bg-white rounded-sm p-6 grid grid-cols-1 xl:grid-cols-2 gap-4 xl:w-10/12">
        <div className="flex-1 space-y-12">
          <FormField
            control={control}
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
                      <FormLabel className="radio-form-label">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="radio-form-label">
                        No, the advertiser (client) needs to provide the content
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
              control={control}
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

            {watchNumberOfWords === "no" && (
              <div className="flex gap-12 px-6">
                <FormField
                  control={control}
                  name="numberOfWordsMinWords"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-20" placeholder="Min" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="numberOfWordsMaxWords"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-20" placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormField
            control={control}
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
                      <FormLabel className="radio-form-label">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="radio-form-label">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
                        Only brand links, URL, navigational, graphic links.
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
            control={control}
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
                        Articles are tagged only at the advertiser&apos;s
                        request.
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="tag-articles" />
                      </FormControl>
                      <FormLabel className="radio-form-label">
                        We always tag articles: &quot;Sponsored article&quot;.
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
              control={control}
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
            {watchNumberOfLinks === "no" && (
              <div className="flex gap-12 px-6">
                <FormField
                  control={control}
                  name="numberOfLinksMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-20" placeholder="Min" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="numberOfLinksMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-20" placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormField
            control={control}
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
                        We allow links to other websites in the content of the
                        article.
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="radio-form-label">
                        We DO NOT allow links to other websites in the content
                        of the article.
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="articleDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other content rules/specifications: </FormLabel>
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
    </section>
  );
};

export default ArticleSpecificationSection;
