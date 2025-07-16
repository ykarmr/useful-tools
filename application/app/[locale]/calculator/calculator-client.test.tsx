import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CalculatorClient from "./calculator-client";
import { getTranslations } from "@/locales";
import "@testing-library/jest-dom/vitest";

// モックの設定
vi.mock("@/components/layout/tool-layout", () => ({
  default: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div data-testid="tool-layout">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock("@/components/layout/tool-section", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tool-section">{children}</div>
  ),
}));

vi.mock("@/components/layout/tool-display", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tool-display">{children}</div>
  ),
}));

vi.mock("@/components/layout/tool-faq", () => ({
  default: ({ faqList }: { faqList: any }) => (
    <div data-testid="tool-faq">FAQ: {faqList.length} items</div>
  ),
}));

vi.mock("@/components/layout/tool-how-to-use", () => ({
  default: ({ title, steps }: { title: string; steps: string[] }) => (
    <div data-testid="tool-how-to-use">
      <h2>{title}</h2>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  ),
}));

describe("CalculatorClient - 計算機能テスト", () => {
  const mockTranslations = getTranslations("ja");
  const defaultProps = {
    locale: "ja" as const,
    t: mockTranslations,
  };

  beforeEach(() => {
    // LocalStorage のモック
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  describe("基本的な四則演算", () => {
    it("加算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        // tool-display 内の結果を取得
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("5");
      });
    });

    it("減算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("5"));
      fireEvent.click(screen.getByText("-"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("2");
      });
    });

    it("乗算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("4"));
      fireEvent.click(screen.getByText("×"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("12");
      });
    });

    it("除算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("8"));
      fireEvent.click(screen.getByText("÷"));
      fireEvent.click(screen.getByText("4"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("2");
      });
    });
  });

  describe("科学計算機能", () => {
    it("平方根計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("√"));
      fireEvent.click(screen.getByText("9"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("3");
      });
    });

    it("三角関数（sin）が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("sin"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("0"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        // sin(30°) ≈ 0.5（浮動小数点の精度を考慮）
        expect(displayElement.textContent).toMatch(/0\.49999|0\.5/);
      });
    });

    it("対数計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("log"));
      fireEvent.click(screen.getByText("1"));
      fireEvent.click(screen.getByText("0"));
      fireEvent.click(screen.getByText("0"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("2");
      });
    });

    it("π定数が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("π"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement.textContent).toMatch(/3\.14159/);
      });
    });
  });

  describe("括弧の計算", () => {
    it("括弧を使った計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("("));
      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("×"));
      fireEvent.click(screen.getByText("4"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("20");
      });
    });
  });

  describe("小数点計算", () => {
    it("小数点を使った計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("1"));
      fireEvent.click(screen.getByText("."));
      fireEvent.click(screen.getByText("5"));
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("."));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("3.8");
      });
    });
  });

  describe("連続計算", () => {
    it("連続した計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("5");
      });

      fireEvent.click(screen.getByText("×"));
      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("10");
      });
    });
  });

  describe("エラーハンドリング", () => {
    it("ゼロ除算でエラーが表示される", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("1"));
      fireEvent.click(screen.getByText("÷"));
      fireEvent.click(screen.getByLabelText("0"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("Error");
      });
    });

    it("無効な関数でエラーが表示される", async () => {
      render(<CalculatorClient {...defaultProps} />);

      fireEvent.click(screen.getByText("log"));
      fireEvent.click(screen.getByLabelText("0"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("Error");
      });
    });
  });

  describe("複雑な計算", () => {
    it("複雑な数式の計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      // 2 + 3 × 4
      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText("×"));
      fireEvent.click(screen.getByText("4"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("14");
      });
    });

    it("括弧を使った複雑な計算が正しく動作する", async () => {
      render(<CalculatorClient {...defaultProps} />);

      // (2 + 3) × (4 - 1)
      fireEvent.click(screen.getByText("("));
      fireEvent.click(screen.getByText("2"));
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("3"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("×"));
      fireEvent.click(screen.getByText("("));
      fireEvent.click(screen.getByText("4"));
      fireEvent.click(screen.getByText("-"));
      fireEvent.click(screen.getByText("1"));
      fireEvent.click(screen.getByText(")"));
      fireEvent.click(screen.getByText("="));

      await waitFor(() => {
        const displayElement = screen.getByTestId("tool-display");
        expect(displayElement).toHaveTextContent("15");
      });
    });
  });
});
