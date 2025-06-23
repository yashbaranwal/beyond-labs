"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import MyWebsitesTable from "./_components/table";
import { useRouter } from "next/navigation";

export default function MyWebsites() {
  const router = useRouter()

  const handleAddWebsite = () => {
    router.push("/my-websites/add-website")
  }

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
