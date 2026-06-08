import {
  useEffect,
  type RefObject,
} from "react";

export const useAutoScroll = (
  ref: RefObject<HTMLDivElement | null>,
  dependency: unknown
) => {
  useEffect(() => {
    ref.current?.scrollTo({
      top:
        ref.current.scrollHeight,

      behavior: "smooth",
    });
  }, [dependency]);
};