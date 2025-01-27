import { Client } from '@renderer/app/entities/Client';

interface PaymentsProps {
  client: Client | null;
}

export default function Payments({ client }: PaymentsProps) {
  return `Payments's ${client?.name}`;
}
