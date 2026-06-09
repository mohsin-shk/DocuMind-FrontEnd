import { FileText } from "lucide-react";

import type {
  MessageSource,
} from "@/types/chat.types";

interface MessageSourcesProps {
  sources: MessageSource[];
}

export default function MessageSources({
  sources,
}: MessageSourcesProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <p className="mb-2 text-xs text-muted-foreground">
        Sources:
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sources.map((source) => (
          <div
            key={source._id}
            className="
            flex
            items-center
            gap-1
            rounded-full
            border
            px-2
            py-1
            text-xs
            text-muted-foreground
          "
          >
            <FileText className="size-3" />

            <span>
              {source.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}