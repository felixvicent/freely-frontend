import { Select, SelectProps } from "antd";

interface StateSelectProps extends SelectProps {}

const BRAZILIAN_STATES = [
  {
    value: "AC",
    label: "Acre",
  },
  {
    value: "AL",
    label: "Alagoas",
  },
  {
    value: "AP",
    label: "Amapá",
  },
  {
    value: "AM",
    label: "Amazonas",
  },
  {
    value: "BA",
    label: "Bahia",
  },
  {
    value: "CE",
    label: "Ceará",
  },
  {
    value: "DF",
    label: "Distrito Federal",
  },
  {
    value: "ES",
    label: "Espírito Santo",
  },
  {
    value: "GO",
    label: "Goiás",
  },
  {
    value: "MA",
    label: "Maranhão",
  },
  {
    value: "MT",
    label: "MT",
  },
  {
    value: "MS",
    label: "Mato Grosso do Sul",
  },
  {
    value: "MG",
    label: "Minas Gerais",
  },
  {
    value: "PA",
    label: "Pará",
  },
  {
    value: "PB",
    label: "Paraíba",
  },
  {
    value: "PR",
    label: "Paraná",
  },
  {
    value: "PE",
    label: "Pernambuco",
  },
  {
    value: "PI",
    label: "Piauí",
  },
  {
    value: "RJ",
    label: "Rio de Janeiro",
  },
  {
    value: "RN",
    label: "Rio Grande do Norte",
  },
  {
    value: "RS",
    label: "Rio Grande do Sul",
  },
  {
    value: "RO",
    label: "Rondônia",
  },
  {
    value: "RR",
    label: "Roraima",
  },
  {
    value: "SC",
    label: "Santa Catarina",
  },
  {
    value: "SP",
    label: "São Paulo",
  },
  {
    value: "SE",
    label: "Sergipe",
  },
  {
    value: "TO",
    label: "Tocantins",
  },
];

export function StateSelect(props: StateSelectProps) {
  return (
    <Select
      {...props}
      showSearch
      filterOption={(input, option) => {
        const label = option?.label?.toString() ?? "";
        return label?.toLowerCase().includes(input.toLowerCase());
      }}
      optionFilterProp="children"
      placeholder="Selecione o estado..."
      options={BRAZILIAN_STATES}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFocus={(event: any) => {
        event.target.autocomplete = "do-not-autofill";
      }}
      style={{ width: "100%", ...props.style }}
    />
  );
}
