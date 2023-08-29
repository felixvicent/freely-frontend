import { Input, InputProps } from "antd";
import { formatCep } from "../../../../app/utils/formatCep";

export function CepInput({
  onChange,
  onFocus = (event) => event.target.select(),
  ...rest
}: InputProps) {
  return (
    <Input
      {...rest}
      onFocus={onFocus}
      onChange={(event) => {
        event.target.value = formatCep(event.target.value ?? "");

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
}
