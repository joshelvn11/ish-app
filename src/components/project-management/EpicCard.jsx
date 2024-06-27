import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function EpicCard(props) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Card className="w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="px-5 py-4 space-y-2"
      >
        <div className="flex items-center justify-between space-x-4">
          <h3 className="font-semibold">{props.title}</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <p className="text-sm">{props.description}</p>
        <CollapsibleContent className="space-y-2">
          <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
            @radix-ui/colors
          </div>
          <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default EpicCard;
