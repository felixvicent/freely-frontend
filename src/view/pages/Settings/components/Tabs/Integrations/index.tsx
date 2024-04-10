import { Card } from 'antd';

import { IntegrationAsass } from './Asaas';

export function Integrations() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Integrações</h1>
      </div>

      <IntegrationAsass />
    </Card>
  );
}
