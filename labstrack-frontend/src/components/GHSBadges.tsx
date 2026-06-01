import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GHS_PICTOGRAMS } from "./constants/ghs";

interface GHSBadgesProps {
  hazardsString: string;
}

export function GHSBadges({ hazardsString }: GHSBadgesProps) {
  if (!hazardsString) return null;

  const hazards = hazardsString
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);

  return (
    <TooltipProvider>
    <div className="flex flex-wrap gap-1.5 mt-1">
      {hazards.map((hazardId) => {
        const pictogram = GHS_PICTOGRAMS[hazardId];
        if (!pictogram) return null;

        return (
          <Tooltip key={hazardId}>
            <TooltipTrigger asChild>
              <div className="w-7 h-7 flex items-center justify-center">
                <img
                  src={pictogram.icon}
                  alt={pictogram.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </TooltipTrigger>

            <TooltipContent>
              <div className="max-w-[220px]">
                <p className="font-semibold">
                  {pictogram.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {pictogram.description}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
    </TooltipProvider>
  );
}