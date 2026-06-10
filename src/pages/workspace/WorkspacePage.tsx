import { useParams } from "react-router-dom";
import WorkspaceEmptyState
  from "@/features/workspace/components/WorkspaceEmptyState";
import ChatView from "@/features/chat/components/ChatView";

export default function WorkspacePage() {
  const { chatId } =
    useParams();

  if (!chatId) {
    return (
      <WorkspaceEmptyState />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col ">
      <ChatView
        chatId={chatId}
      />
    </div>
  );
}