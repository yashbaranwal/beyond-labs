"use client"

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore"
import MyWebsitesTable from "./_components/table";

export default function MyWebsites() {
  const router = useRouter()

  const handleAddWebsite = () => {
    router.push("/my-websites/add-website")
  }
  const tableData = useFormStore((state) => state.tableData)
  console.log(tableData,"tableData")
  return (
    <main className="bg-background p-6">
      <h3 className="font-semibold text-2xl text-foreground">All websites</h3>
      <div className="mt-18 space-y-4">
        <Button className="w-56 text-xs"
        onClick={handleAddWebsite}
        >
          <PlusIcon size={20} />
          Add Website
        </Button>
        <MyWebsitesTable />
      </div>
    </main>
  );
}
