interface SelectedDocumentBadgeProps {
  count: number;
}

export default function SelectedDocumentBadge({
  count,
}: SelectedDocumentBadgeProps) {
  if (count === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Select 1 or 2 documents
      </p>
    );
  }

  if (count === 1) {
    return (
      <p className="text-sm text-muted-foreground">
        1 document selected
      </p>
    );
  }

  return (
    <p className="text-sm font-medium text-primary">
      Comparison Mode • 2 documents selected
    </p>
  );
}