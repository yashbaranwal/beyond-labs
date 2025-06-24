"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";

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
// import { tableData } from "@/constants/sample-table-data";

const ITEMS_PER_PAGE = 5;

type GreyNicheIcon = "bitcoin" | "dice" | "dollar" | "medical" | "incognito" | "leaves";

const greyNiches: GreyNicheIcon[] = [
  "bitcoin",
  "dice",
  "dollar",
  "medical",
  "incognito",
  "leaves",
];

const getGreyNicheIcon = (iconName: GreyNicheIcon): string => iconName;

export default function MyWebsitesTable() {
  const router = useRouter();
  const tableData = useFormStore((state) => state.tableData);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(() => Math.ceil(tableData.length / ITEMS_PER_PAGE), [tableData.length]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return tableData.slice(startIndex, endIndex);
  }, [currentPage, tableData]);

  const handleRowClick = useCallback((row: WebsiteFormData) => {
    router.push(`/my-websites/${row.id}`);
  }, [router]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const getCountry = useCallback((val: string) => {
    const country = countries.find((ele) => ele.value === val);
    if (!country) return null;

    const FlagComponent = flagComponentsMap[country.flagCode as keyof typeof flagComponentsMap];
    if (!FlagComponent) return null;

    return (
      <div className="flex items-center gap-2">
        <FlagComponent className="size-4" />
        <p className="font-normal text-foreground">{country.label}</p>
      </div>
    );
  }, []);

  const getLanguage = useCallback((val: string) => {
    const language = languages.find((ele) => ele.value === val);
    return language?.label || "N/A";
  }, []);

  const getCategoryLabel = useCallback((val: string) => {
    const category = mainCategories.find((ele) => ele.value === val);
    return category?.label || "N/A";
  }, []);

  const getOtherCategories = useCallback((values: string[]) => {
    if (!Array.isArray(values) || values.length === 0) {
      return "N/A";
    }
    const modifiedValues = values.map((ele) => getCategoryLabel(ele));
    return modifiedValues.join(", ");
  }, [getCategoryLabel]);

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
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No websites added yet.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item) => (
              <TableRow
                key={item.websiteUrl}
                className="cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <TableCell className="font-medium">{item.websiteUrl}</TableCell>
                <TableCell>
                  {getCountry(item.country)}
                </TableCell>
                <TableCell>{getLanguage(item.language)}</TableCell>
                <TableCell>{getCategoryLabel(item.mainCategories[0])}</TableCell>
                <TableCell>
                  {item.mainCategories.length > 1
                    ? getOtherCategories(item.mainCategories.slice(1))
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {greyNiches.map((niche, index) => (
                      <Image
                        key={index}
                        width={16}
                        height={16}
                        src={`/icons/${getGreyNicheIcon(niche)}.svg`}
                        alt={`${niche} icon`}
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
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
                const isNearCurrent =
                  pageNumber === currentPage ||
                  pageNumber === currentPage - 1 ||
                  pageNumber === currentPage + 1;

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

                if (
                  (currentPage - pageNumber === 2 && pageNumber > 1) ||
                  (pageNumber - currentPage === 2 && pageNumber < totalPages)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${pageNumber}`}>
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