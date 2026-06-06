import AppShell from "@/components/layout/AppShell";

export default function WorkspacePage() {
  return (
    <AppShell>
      <div className="flex h-full items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold">
            DocuMind
          </h1>

          <p className="mt-4 text-muted-foreground">
            Upload documents and start
            intelligent conversations.
          </p>
        </div>
      </div>
    </AppShell>
  );
}