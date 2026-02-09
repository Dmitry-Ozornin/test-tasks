import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToastItem } from "./ToastItem";
import type { Toast } from "../types/types";

describe("ToastItem - минимальные тесты для задания", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("проверка базовой функциональности: удаляется через duration", () => {
    const onRemove = vi.fn();
    const toast: Toast = {
      id: "1",
      text: "Тест",
      type: "success",
      duration: 1000,
    };

    render(<ToastItem toast={toast} onRemove={onRemove} />);

    vi.advanceTimersByTime(1500);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("проверка паузы: не удаляется при наведении", () => {
    const onRemove = vi.fn();
    const toast: Toast = {
      id: "1",
      text: "Тест паузы",
      type: "info",
      duration: 2000,
    };

    render(<ToastItem toast={toast} onRemove={onRemove} />);

    // Сразу наводим мышь (пауза)
    fireEvent.mouseEnter(screen.getByTestId("toast-item"));

    // Ждем дольше чем duration
    vi.advanceTimersByTime(3000);

    // Проверяем что НЕ удалилось 
    expect(onRemove).not.toHaveBeenCalled();
  });

  it("можно закрыть вручную кнопкой", () => {
    const onRemove = vi.fn();
    const toast: Toast = {
      id: "1",
      text: "Тест",
      type: "success",
      duration: 5000,
    };

    render(<ToastItem toast={toast} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("имеет правильные атрибуты доступности", () => {
    const onRemove = vi.fn();
    const toast: Toast = {
      id: "1",
      text: "Тест",
      type: "error",
      duration: 3000,
    };

    render(<ToastItem toast={toast} onRemove={onRemove} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
