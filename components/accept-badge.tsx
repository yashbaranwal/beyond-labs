import { Badge } from "./ui/badge";
import { Check } from "lucide-react";

const AcceptBadge = () => {
  return (
    <Badge variant="success">
      <Check className="size-6 text-success mr-2" />
      Accepted
    </Badge>
  );
};

export default AcceptBadge;
