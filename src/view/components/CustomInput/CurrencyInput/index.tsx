import { InputNumber, InputNumberProps } from "antd";
import { formatCurrency } from "../../../../app/utils/format/formatCurrency";

interface CurrencyInputProps
  extends Omit<InputNumberProps, "decimalSeparator" | "addonAfter"> {}

export function CurrencyInput({
  onFocus = (event) => event.target.select(),
  ...props
}: CurrencyInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currencyParser = (value: any) => {
    try {
      if (!value) {
        return "";
      }

      // for when the input gets clears
      if (typeof value === "string" && !value.length) {
        value = "0.0";
      }

      // detecting and parsing between comma and dot
      const group = new Intl.NumberFormat("pt-br")
        .format(1111)
        .replace(/1/g, "");
      const decimal = new Intl.NumberFormat("pt-br")
        .format(1.1)
        .replace(/1/g, "");
      let reversedVal = value.replace(new RegExp(`\\${group}`, "g"), "");
      reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, "g"), ".");
      //  => 1232.21 €

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;

      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <InputNumber
      {...props}
      formatter={(value) => formatCurrency(value)}
      parser={currencyParser}
      decimalSeparator=","
      addonAfter={"R$"}
      onFocus={onFocus}
      precision={2}
    />
  );
}
