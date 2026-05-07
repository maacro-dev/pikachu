
export interface FilterOptions {
  cardWrapperSelector?: string;
  filterAttribute?: string;
  paramName?: string;
}

export function initClientFilter(options: FilterOptions) {
  const {
    cardWrapperSelector,
    filterAttribute = 'filter',
    paramName = filterAttribute,
  } = options;

  const getContainer = () =>
    document.querySelector<HTMLElement>('.filter-tabs');

  const getButtons = () => {
    const container = getContainer();
    return container
      ? container.querySelectorAll<HTMLButtonElement>(
        `button[data-${filterAttribute}]`,
      )
      : [];
  };

  const getCards = (): HTMLElement[] => {
    if (cardWrapperSelector) {
      return Array.from(
        document.querySelectorAll<HTMLElement>(cardWrapperSelector),
      );
    }
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        `[data-${filterAttribute}]:not(button)`,
      ),
    );
  };

  // … rest of the code remains the same: setActiveButton, applyFilter, etc.
  function setActiveButton(value: string) {
    getButtons().forEach((btn) => {
      const isActive = btn.dataset[filterAttribute] === value;
      btn.setAttribute('aria-selected', String(isActive));
    });
  }

  function applyFilter(value: string) {
    getCards().forEach((card) => {
      const dist = card.dataset[filterAttribute];
      card.style.display =
        value === 'all' || dist === value ? '' : 'none';
    });
  }

  function syncURL(value: string) {
    const url = new URL(window.location.href);
    if (value === 'all') {
      url.searchParams.delete(paramName);
    } else {
      url.searchParams.set(paramName, value);
    }
    window.history.replaceState({}, '', url.toString());
  }

  function handleFilterChange(value: string) {
    setActiveButton(value);
    applyFilter(value);
    syncURL(value);
  }

  function getFilterFromURL(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName) ?? 'all';
  }

  const container = getContainer();
  if (container) {
    container.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(
        `button[data-${filterAttribute}]`,
      );
      if (!btn) return;
      const value = btn.dataset[filterAttribute];
      if (!value) return;
      handleFilterChange(value);
    });
  }

  window.addEventListener('popstate', () => {
    handleFilterChange(getFilterFromURL());
  });

  return {
    update() {
      handleFilterChange(getFilterFromURL());
    },
  };
}
