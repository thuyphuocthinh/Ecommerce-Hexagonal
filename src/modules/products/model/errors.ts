export const ErrorProductNameDuplicate = new Error("Product name already exists");
export const ErrorProductNotFound = new Error("Product not found");
export const ErrorProductNameTooShort = new Error("Product name must be at least 2 characters");
export const ErrorProductNameTooLong = new Error("Product name must be less than 100 characters");
export const ErrorBrandMustBeValidUUID = new Error("Brand must be a valid UUID");
export const ErrorCategoryMustBeValidUUID = new Error("Category must be a valid UUID");
export const ErrorCategoryNameTooShort = new Error("Category name must be at least 2 characters");
// Business Error <> Technical Error
