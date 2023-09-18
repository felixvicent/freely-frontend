export const formatTelephone = (value: string) => {
  try {
    if (!value) throw new Error("missing value");

    const replacedValue = value.replace(/\D/g, "");

    if (replacedValue.length < 9) {
      return replacedValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return replacedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.warn("formatTelephone:", error?.message);
    return "";
  }
};
