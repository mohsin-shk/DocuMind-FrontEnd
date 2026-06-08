export const formatMessageTime = (
  date: string
) => {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(
    new Date(date)
  );
};