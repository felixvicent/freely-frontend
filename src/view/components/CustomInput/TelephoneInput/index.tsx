import { Input, InputProps } from "antd";
import { formatTelephone } from "../../../../app/utils/formatTelephone";

export function TelephoneInput({
  onChange,
  onFocus = (event) => event.target.select(),
  ...rest
}: InputProps) {
  return (
    <Input
      {...rest}
      onFocus={onFocus}
      onChange={(event) => {
        event.target.value = formatTelephone(event.target.value ?? "");

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
}
