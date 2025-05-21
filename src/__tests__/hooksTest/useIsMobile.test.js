import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "../../hooks/useIsMobile";

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    jest.clearAllMocks();
  });

  it("should return true when window width is less than breakpoint", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(true);
  });

  it("should return false when window width is greater than breakpoint", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(false);
  });

  it("should update value when window is resized", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });

  it("should remove event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useIsMobile(768));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});
