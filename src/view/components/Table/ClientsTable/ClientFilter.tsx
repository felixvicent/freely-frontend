import { Button, Input } from "antd";
import { ClientParams } from "../../../../app/api/clients/get";
import { useState } from "react";

interface ClientFilterProps {
  onFilter: (params: ClientParams) => void;
}

export function ClientFilter({ onFilter }: ClientFilterProps) {
  const [term, setTerm] = useState("");

  function confirmFilter() {
    onFilter({
      query: term,
    });
  }

  function resetFilter() {
    setTerm("");
    onFilter({
      query: "",
    });
  }

  return (
    <div className="p-2">
      <span>Cliente:</span>
      <Input
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Busque por nome ou email"
      />

      <div className="flex justify-between mt-2">
        <Button size="small" onClick={resetFilter}>
          Limprar filtros
        </Button>
        <Button size="small" onClick={confirmFilter} type="primary">
          Filtrar
        </Button>
      </div>
    </div>
  );
}
