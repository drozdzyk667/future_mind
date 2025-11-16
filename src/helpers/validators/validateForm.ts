export type SearchFormValues = {
  query: string;
  year: string;
  type: string;
};

export type SearchFormErrors = Partial<{
  query: string;
  year: string;
}>;

export const validateSearchForm = (
  values: SearchFormValues
): SearchFormErrors => {
  const errors: SearchFormErrors = {};

  if (!values.query.trim()) {
    errors.query = "Search query cannot be empty.";
  }

  if (values.year && !/^\d{4}$/.test(values.year)) {
    errors.year = "Year must be a 4-digit number (e.g. 1999).";
  }

  return errors;
};
