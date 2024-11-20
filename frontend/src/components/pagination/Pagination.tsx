import { useMemo } from 'react';

type PaginationProps = {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  buttonDisplayLimit?: number; // Allow customization of how many buttons are shown
  previousLabel?: string; // Allow custom text for "Previous" button
  nextLabel?: string; // Allow custom text for "Next" button
  containerClassName?: string; // Custom classes for container
  buttonClassName?: string; // Custom classes for buttons
  activeButtonClassName?: string; // Custom classes for active button
};

const Pagination = ({
  itemsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  buttonDisplayLimit = 5,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  containerClassName = '',
  buttonClassName = '',
  activeButtonClassName = '',
}: PaginationProps) => {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [itemsPerPage, totalItems],
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage + 1,
    [currentPage, itemsPerPage],
  );

  const endIndex = useMemo(
    () => Math.min(currentPage * itemsPerPage, totalItems),
    [currentPage, itemsPerPage, totalItems],
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= buttonDisplayLimit) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(
        ...Array.from({ length: buttonDisplayLimit }, (_, i) => i + 1),
        '...',
        totalPages,
      );
    } else if (currentPage > totalPages - 3) {
      pages.push(
        1,
        '...',
        ...Array.from(
          { length: buttonDisplayLimit },
          (_, i) => totalPages - buttonDisplayLimit + i + 1,
        ),
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        '...',
        totalPages,
      );
    }

    return pages;
  }, [currentPage, totalPages, buttonDisplayLimit]);

  return (
    <nav
      className={`flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 ${containerClassName}`}
      aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startIndex}-{endIndex}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => handlePrevious()}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${buttonClassName}`}>
            {previousLabel}
          </button>
        </li>

        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <li key={index}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === page
                    ? `text-blue-600 border border-gray-300 bg-blue-50 dark:bg-gray-700 dark:text-white ${activeButtonClassName}`
                    : `text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${buttonClassName}`
                }`}>
                {page}
              </button>
            </li>
          ) : (
            <li key={index}>
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                ...
              </span>
            </li>
          ),
        )}

        <li>
          <button
            onClick={() => handleNext()}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${buttonClassName}`}>
            {nextLabel}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
