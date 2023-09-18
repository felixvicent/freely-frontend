import { Input, InputProps } from "antd";
import { formatCpfCnpj } from "../../../../app/utils/format/formatCpfCnpj";

export function CpfCnpjInput({
  onChange,
  onFocus = (event) => event.target.select(),
  ...rest
}: InputProps) {
  return (
    <Input
      {...rest}
      onFocus={onFocus}
      onChange={(event) => {
        event.target.value = formatCpfCnpj(event.target.value ?? "");

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
}
