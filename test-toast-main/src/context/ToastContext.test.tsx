import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react"; // Добавьте импорт типа
import { ToastProvider, useToast } from "./ToastContext";

describe("ToastContext", () => {
  const wrapper = ({ children }: { children: ReactNode }) => <ToastProvider>{children}</ToastProvider>;

  it("предоставляет функцию addToast", () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    expect(typeof result.current).toBe("function");
  });

  it("addToast возвращает ID тоста", () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    const toastId = result.current({ text: "Тест", type: "success" });

    expect(toastId).toBeDefined();
    expect(typeof toastId).toBe("string");
  });
});
