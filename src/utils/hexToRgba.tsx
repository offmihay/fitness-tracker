export const hexToRgba = (hex: string, alpha: number) => {
  const sanitizedHex = hex.replace(/^#/, "");

  // Parse r, g, b
  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
