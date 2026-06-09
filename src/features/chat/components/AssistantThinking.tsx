export default function AssistantThinking() {
  return (
    <div className="flex justify-start">
      <div
        className="
          rounded-xl
          border
          bg-card
          px-4
          py-3
        "
      >
        <div className="flex gap-1">
          <span className="animate-bounce">
            •
          </span>

          <span
            className="animate-bounce"
            style={{
              animationDelay:
                "0.15s",
            }}
          >
            •
          </span>

          <span
            className="animate-bounce"
            style={{
              animationDelay:
                "0.3s",
            }}
          >
            •
          </span>
        </div>
      </div>
    </div>
  );
}