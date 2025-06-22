import Image from "next/image";
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
      
  const data = [
    {
      id: "1",
      website: "example.com",
      country: { name: "United States", code: "US" },
      language: "United States", // Assuming this refers to locale/region for language
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "2",
      website: "example.com",
      country: { name: "Germany", code: "DE" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "3",
      website: "example.com",
      country: { name: "United States", code: "US" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "4",
      website: "example.com",
      country: { name: "Germany", code: "DE" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "5",
      website: "example.com",
      country: { name: "United States", code: "US" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "6",
      website: "example.com",
      country: { name: "Germany", code: "DE" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "7",
      website: "example.com",
      country: { name: "United States", code: "US" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "8",
      website: "example.com",
      country: { name: "Germany", code: "DE" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "9",
      website: "example.com",
      country: { name: "United States", code: "US" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
    {
      id: "10",
      website: "example.com",
      country: { name: "Germany", code: "DE" },
      language: "United States",
      category: "Computer & Electronics",
      otherCategories: "Entertainment",
    },
  ];

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
    const currentPage = 1; 
    const totalPages = 10; 
  
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
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-normal text-foreground">{item.website}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {item.country.code === "US" && <span role="img" aria-label="US Flag">🇺🇸</span>}
                  {item.country.code === "DE" && <span role="img" aria-label="DE Flag">🇩🇪</span>}
                  {item.country.name}
                </TableCell>
                <TableCell className="font-normal text-foreground">{item.language}</TableCell>
                <TableCell className="font-normal text-foreground">
                    {item.category}
                </TableCell>
                <TableCell className="font-normal text-foreground">{item.otherCategories}</TableCell>
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