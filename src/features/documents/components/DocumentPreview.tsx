import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTextDocument } from "../hooks/useTextDocument";
import type {
  Document,
} from "@/types/document.types";

interface Props {
  document: Document;
}

export default function DocumentPreview({
  document,
}: Props) {
  const extension =
    document.fileExtension
      .toLowerCase();
  const textQuery =
    useTextDocument(
      document.storage.url
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Preview
        </CardTitle>
      </CardHeader>

      <CardContent>
        {extension === "pdf" && (
          <iframe
            src={
              document.storage.url
            }
            className="
              h-200
              w-full
              rounded-md
              border
            "
          />
        )}

        {extension === "txt" && (
          <pre
            className="
    max-h-200
    overflow-auto
    whitespace-pre-wrap
    rounded-md
    border
    p-4
  "
          >
            {textQuery.data}
          </pre>
        )}

        {extension === "docx" && (
          <div
            className="
              rounded-md
              border
              p-6
              text-center
            "
          >
            <p>
              DOCX preview is not
              available yet.
            </p>

            <p
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              Open the original
              document to view its
              contents.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}