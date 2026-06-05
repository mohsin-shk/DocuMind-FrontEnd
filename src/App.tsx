function App() {
  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-8 flex flex-col gap-4">
          <h1 className="text-foreground text-2xl font-semibold">DocuMind</h1>
          <p className="text-muted-foreground text-sm">Color test</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
            Primary Button
          </button>
        </div>
      </div>
    </>
  )
}

export default App
