"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

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
  import { WebsiteFormData } from "@/types/website-form";
  import { useFormStore } from "@/stores/add-website-form-store";
      
  const greyNiches = ["bitcoin", "dice", "dollar", "medical", "incognito", "leaves"]
  
  const getGreyNicheIcon = (iconName: string) => {
    switch (iconName) {
      case "bitcoin": return "bitcoin";
      case "dice": return "dice";
      case "dollar": return "dollar";
      case "medical": return "medical";
      case "incognito": return "incognito";
      case "leaves": return "leaves";
      default: return null;
    }
  };
  
  
  export default function MyWebsitesTable() {
    const router = useRouter()
    const currentPage = 1; 
    const totalPages = 10; 

    const tableData = useFormStore((state) => state.tableData)
    console.log(tableData,"tableData")  

    const handleRowClick = (row: WebsiteFormData) => {
      console.log(row,"w")
      router.push(`/my-websites/${row.id}`)
    }
  
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
            {tableData?.map((item) => (
              <TableRow key={item.websiteUrl} className="cursor-pointer" onClick={() => handleRowClick(item)}>
                <TableCell className="font-normal text-foreground">{item.websiteUrl}</TableCell>
                <TableCell className="flex items-center gap-2">
                {item.country}
                </TableCell>
                <TableCell className="font-normal text-foreground">{item.language}</TableCell>
                <TableCell className="font-normal text-foreground">
                    {item.mainCategories}
                </TableCell>
                <TableCell className="font-normal text-foreground">{item.mainCategories}</TableCell>
                <TableCell className="text-right">
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
  
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                // Simplified logic for showing ellipsis based on the screenshot
                if (pageNumber > 3 && pageNumber < totalPages - 1 && pageNumber !== currentPage) {
                    if (pageNumber === 4) { // Only show ellipsis once
                        return <PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>;
                    }
                    return null;
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`#page-${pageNumber}`}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  }