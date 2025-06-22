import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import MyWebsitesTable from "./_components/table";

export default function MyWebsites() {
  return (
    <main className="bg-background p-6">
      <p className="font-semibold text-2xl text-foreground">All websites</p>
      <div className="mt-18 space-y-4">
        <Button className="w-56 text-xs">
          <PlusIcon size={20} />
          Add Website
        </Button>
        <MyWebsitesTable />
      </div>
    </main>
  );
}
