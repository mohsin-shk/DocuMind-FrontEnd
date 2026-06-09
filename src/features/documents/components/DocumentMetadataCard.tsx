import { format } from "date-fns";
import DocumentHeaderActions from "./DocumentHeaderActions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button }
  from "@/components/ui/button";

import type {
  Document,
} from "@/types/document.types";

interface Props {
  document: Document;
}

export default function DocumentMetadataCard({
  document,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {document.title}
          </CardTitle>

          <DocumentHeaderActions
            documentId={document._id}
          />
        </div>
      </CardHeader>

      <CardContent
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <div>
          <p className="text-sm text-muted-foreground">
            File Name
          </p>

          <p>
            {document.originalFileName}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Type
          </p>

          <p>
            {document.fileExtension.toUpperCase()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p>
            {document.processingStatus}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Uploaded
          </p>

          <p>
            {format(
              new Date(
                document.createdAt
              ),
              "PPP"
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            File Size
          </p>

          <p>
            {(
              document.fileSize /
              1024
            ).toFixed(1)}
            {" "}KB
          </p>
        </div>

        <div>
          <Button
            asChild
          >
            <a
              href={
                document.storage.url
              }
              target="_blank"
              rel="noreferrer"
            >
              Open Original File
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}