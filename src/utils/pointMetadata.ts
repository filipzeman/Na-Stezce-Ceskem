import { pointMetadata } from "../config/pointMetadata";

export function getCategoryKey(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value in pointMetadata.categories) {
    return value;
  }

  const entry = Object.entries(pointMetadata.categories).find(
    ([, category]) => category.label === value
  );

  return entry?.[0] ?? value;
}

export function getTypeKey(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value in pointMetadata.types) {
    return value;
  }

  const entry = Object.entries(pointMetadata.types).find(([, type]) => type.label === value);

  return entry?.[0] ?? value;
}
