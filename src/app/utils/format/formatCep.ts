export const formatCep = (value: string) => {
  try {
    if (!value) throw new Error("missing value");

    return value
      .replace(/\D+/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.warn("formatCpfCnpj:", error?.message);
    return "";
  }
};
