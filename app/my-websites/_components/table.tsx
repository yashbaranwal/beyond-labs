"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { countries } from "@/constants/countries";
import { WebsiteFormData } from "@/types/website-form";
import { mainCategories } from "@/constants/categories";
import { useFormStore } from "@/stores/add-website-form-store";
import { flagComponentsMap, languages } from "@/constants/languages";

const ITEMS_PER_PAGE = 5;

const greyNiches = [
  "bitcoin",
  "dice",
  "dollar",
  "medical",
  "incognito",
  "leaves",
];

const getGreyNicheIcon = (iconName: string) => {
  switch (iconName) {
    case "bitcoin":
      return "bitcoin";
    case "dice":
      return "dice";
    case "dollar":
      return "dollar";
    case "medical":
      return "medical";
    case "incognito":
      return "incognito";
    case "leaves":
      return "leaves";
    default:
      return null;
  }
};

export default function MyWebsitesTable() {
  const router = useRouter();
  const tableData = useFormStore((state) => state.tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);

  const paginatedData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRowClick = (row: WebsiteFormData) => {
    router.push(`/my-websites/${row.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCountry = (val: string) => {
    const country = countries.find((ele) => ele.value === val);
    const FlagComponent = flagComponentsMap[country.flagCode];
    return (
      <div className="flex items-center gap-2">
        <FlagComponent className="size-4" />
        <p className="font-normal text-foreground">{country.label}</p>
      </div>
    );
  };

  const getLanguage = (val: string) => {
    const language = languages.find((ele) => ele.value === val);
    return language.label;
  };

  const getCategoryLabel = (val: string) => {
    const category = mainCategories.find((ele) => ele.value === val);
    return category.label;
  };

  const getOtherCategories = (values: Array<string>) => {
    const modifiedValues = values.map((ele) => getCategoryLabel(ele));
    return modifiedValues.join(", ");
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Website</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Language</TableHead>
            <TableHead className="w-[260px]">Category</TableHead>
            <TableHead className="w-[260px]">Other categories</TableHead>
            <TableHead>Grey niches</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow
              key={item.websiteUrl}
              className="cursor-pointer"
              onClick={() => handleRowClick(item)}
            >
              <TableCell>{item.websiteUrl}</TableCell>
              <TableCell className="flex items-center gap-2">
                {getCountry(item.country)}
              </TableCell>
              <TableCell>{getLanguage(item.language)}</TableCell>
              <TableCell>{getCategoryLabel(item.mainCategories[0])}</TableCell>
              <TableCell>
                {getOtherCategories(item.mainCategories?.slice(1))}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {greyNiches.map((niche, index) => (
                    <Image
                      key={index}
                      width={16}
                      height={16}
                      src={`/icons/${getGreyNicheIcon(niche)}.svg`}
                      alt="icon"
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages >= 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;

                const isFirst = pageNumber === 1;
                const isLast = pageNumber === totalPages;
                const isCurrent = pageNumber === currentPage;
                const isNearCurrent = Math.abs(currentPage - pageNumber) <= 1;

                // Always show first, last, current, and pages near current
                if (isFirst || isLast || isCurrent || isNearCurrent) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={isCurrent}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis before current range
                if (pageNumber === currentPage - 2 && pageNumber !== 2) {
                  return (
                    <PaginationItem key={`ellipsis-prev`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                // Show ellipsis after current range
                if (
                  pageNumber === currentPage + 2 &&
                  pageNumber !== totalPages - 1
                ) {
                  return (
                    <PaginationItem key={`ellipsis-next`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
