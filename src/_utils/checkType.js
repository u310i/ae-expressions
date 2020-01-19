const posinf = Number.POSITIVE_INFINITY;
const neginf = Number.NEGATIVE_INFINITY;

export const isNumber = data => {
  return typeof data === "number" && data > neginf && data < posinf;
};
