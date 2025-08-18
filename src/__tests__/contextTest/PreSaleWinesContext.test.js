import React, { useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  PreSaleWinesProvider,
  usePreSaleWines,
} from "@/context/PreSaleWinesContext";
import { fetchPreSaleWines } from "@/lib/shopify/services";
import { useLanguage } from "@/context/LanguageContext";
import { logError } from "@/utils/logging";

jest.mock("@/lib/shopify/services");
jest.mock("@/context/LanguageContext");

const TestComponent = () => {
  const { wines, isLoading, error } = usePreSaleWines();

  if (isLoading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error}</div>;

  return (
    <div data-testid="wines-list">
      {wines.map((wine) => (
        <div key={wine.id}>{wine.title}</div>
      ))}
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <PreSaleWinesProvider>
      <TestComponent />
    </PreSaleWinesProvider>,
  );

describe("PreSaleWinesContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLanguage.mockReturnValue({
      language: "en",
      translations: {
        "wines.error.loading": "Failed to load pre-sale wines",
      },
    });
  });

  it("should show loading state initially", () => {
    fetchPreSaleWines.mockImplementation(() => new Promise(() => {}));
    renderWithProvider();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should fetch wines successfully and display them", async () => {
    const mockWinesResponse = {
      products: [
        { id: "1", title: "Wine A" },
        { id: "2", title: "Wine B" },
      ],
    };
    fetchPreSaleWines.mockResolvedValue(mockWinesResponse);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("wines-list")).toBeInTheDocument();
    });

    expect(screen.getByText("Wine A")).toBeInTheDocument();
    expect(screen.getByText("Wine B")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  it("should show an error message if fetching wines fails", async () => {
    fetchPreSaleWines.mockRejectedValue(new Error("Fetch failed"));

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Failed to load pre-sale wines"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("wines-list")).not.toBeInTheDocument();
    expect(logError).toHaveBeenCalled();
  });

  it("should filter wines based on activeFilters", async () => {
    const mockWinesResponse = {
      products: [
        { id: "1", title: "Wine A", wineVariety: "Red" },
        { id: "2", title: "Wine B", wineVariety: "White" },
      ],
    };

    fetchPreSaleWines.mockResolvedValue(mockWinesResponse);

    const FilteredTestComponent = () => {
      const { wines, isLoading, setActiveFilters } = usePreSaleWines();

      useEffect(() => {
        // apply filter after initial load
        setActiveFilters([
          { key: "wineVariety", options: ["Red"], variant: "regular" },
        ]);
      }, [setActiveFilters]);

      if (isLoading) return <div data-testid="loading">Loading...</div>;

      return (
        <div data-testid="wines-list">
          {wines.map((wine) => (
            <div key={wine.id}>{wine.title}</div>
          ))}
        </div>
      );
    };

    render(
      <PreSaleWinesProvider>
        <FilteredTestComponent />
      </PreSaleWinesProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    const winesList = screen.getByTestId("wines-list");
    expect(winesList).toBeInTheDocument();

    // Only Red wine should be rendered
    expect(screen.getByText("Wine A")).toBeInTheDocument();
    expect(screen.queryByText("Wine B")).not.toBeInTheDocument();
  });

  it("should filter wines by search query value (title match)", async () => {
    const mockWinesResponse = {
      products: [
        { id: "1", title: "Wine A", wineVariety: "Red" },
        { id: "2", title: "Wine B", wineVariety: "White" },
      ],
    };

    fetchPreSaleWines.mockResolvedValue(mockWinesResponse);

    const FilteredTestComponent = () => {
      const { wines, isLoading, setSearchQuery } = usePreSaleWines();

      useEffect(() => {
        // set search query to "Wine A"
        setSearchQuery("Wine A");
      }, [setSearchQuery]);

      if (isLoading) return <div data-testid="loading">Loading...</div>;

      return (
        <div data-testid="wines-list">
          {wines.map((wine) => (
            <div key={wine.id}>{wine.title}</div>
          ))}
        </div>
      );
    };

    render(
      <PreSaleWinesProvider>
        <FilteredTestComponent />
      </PreSaleWinesProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    const winesList = screen.getByTestId("wines-list");
    expect(winesList).toBeInTheDocument();

    expect(screen.getByText("Wine A")).toBeInTheDocument();
    expect(screen.queryByText("Wine B")).not.toBeInTheDocument();
  });

  // This test verifies sorting behavior for multiple sort options
  it.each([
    {
      sortKey: "name-desc",
      products: [
        { id: "1", title: "Alpha Wine", variants: [{}] },
        { id: "2", title: "Zebra Wine", variants: [{}] },
      ],
      expectedOrder: ["Zebra Wine", "Alpha Wine"],
    },
    {
      sortKey: "price-desc",
      products: [
        {
          id: "1",
          title: "Cheap Wine",
          variants: [{ price: { amount: 10 } }],
        },
        {
          id: "2",
          title: "Expensive Wine",
          variants: [{ price: { amount: 50 } }],
        },
      ],
      expectedOrder: ["Expensive Wine", "Cheap Wine"],
    },
    {
      sortKey: "price-asc",
      products: [
        {
          id: "1",
          title: "Cheap Wine",
          variants: [{ price: { amount: 10 } }],
        },
        {
          id: "2",
          title: "Expensive Wine",
          variants: [{ price: { amount: 50 } }],
        },
      ],
      expectedOrder: ["Cheap Wine", "Expensive Wine"],
    },
    {
      sortKey: "newest",
      products: [
        { id: "1", title: "Old Red", vintage: "1990", variants: [{}] },
        { id: "2", title: "Young White", vintage: "2023", variants: [{}] },
      ],
      expectedOrder: ["Young White", "Old Red"],
    },
  ])(
    "should sort wines by $sortKey correctly",
    async ({ sortKey, products, expectedOrder }) => {
      fetchPreSaleWines.mockResolvedValue({ products });

      // eslint-disable-next-line react/prop-types
      const SortTestComponent = ({ sortKey }) => {
        const { wines, isLoading, setSelectedSort } = usePreSaleWines();

        useEffect(() => {
          setSelectedSort(sortKey);
        }, [sortKey, setSelectedSort]);

        if (isLoading) return <div data-testid="loading">Loading...</div>;

        return (
          <div data-testid="wines-list">
            {wines.map((wine) => (
              <div key={wine.id} data-testid="wine-title">
                {wine.title}
              </div>
            ))}
          </div>
        );
      };

      render(
        <PreSaleWinesProvider>
          <SortTestComponent sortKey={sortKey} />
        </PreSaleWinesProvider>,
      );

      await waitFor(() => {
        const titles = screen
          .getAllByTestId("wine-title")
          .map((el) => el.textContent);
        expect(titles).toEqual(expectedOrder);
      });
    },
  );
});
