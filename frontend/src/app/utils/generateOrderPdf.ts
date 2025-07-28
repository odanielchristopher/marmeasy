/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
import Decimal from 'decimal.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // importa o plugin para patch automático no protótipo de jsPDF

import { IOrder } from '@app/entities/Order';

import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import { formatCurrency } from './formatCurrency';
import { formatDate } from './formatDate';

// Tipagem para agrupar pedidos
export interface IGroupedOrder {
  date: string;
  BREAKFAST: number;
  LUNCH: number;
  DINNER: number;
  total: Decimal;
}

interface IOrdersReportProps {
  orders: IOrder[];
  customerName: string;
  from?: string;
  to?: string;
}

function getDatesInRange(from: Date, to: Date): Date[] {
  const dates = [];
  const currentDate = new Date(from);

  while (currentDate <= to) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const normalizeDate = (dateString: string) => {
  const d = new Date(dateString);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export function generateOrdersPdf({
  orders,
  customerName,
  from,
  to,
}: IOrdersReportProps) {
  const doc = new jsPDF('p', 'pt', 'a4');

  const now = new Date();
  const fromDate = from
    ? new Date(from)
    : new Date(now.getFullYear(), now.getMonth(), 1); // 1º dia do mês atual
  const toDate = to
    ? new Date(to)
    : new Date(now.getFullYear(), now.getMonth() + 1, 0); // último dia do mês atual

  // Agrupar pedidos por data e tipo
  const allDates = getDatesInRange(fromDate, toDate);
  // Agrupar pedidos por data normalizada
  const map = new Map<number, IGroupedOrder>();

  orders.forEach((order) => {
    const orderDate = normalizeDate(order.date);
    const dateKey = orderDate.getTime();
    const amount = new Decimal(order.amount);

    if (!map.has(dateKey)) {
      map.set(dateKey, {
        date: orderDate.toISOString(),
        BREAKFAST: 0,
        LUNCH: 0,
        DINNER: 0,
        total: new Decimal(0),
      });
    }

    const entry = map.get(dateKey)!;
    entry[order.type]++;
    entry.total = entry.total.plus(amount);
  });

  // Preencher todas as datas do período
  const groupedOrders = allDates.map((date) => {
    const dateKey = date.getTime();
    const entry = map.get(dateKey);

    return (
      entry || {
        date: date.toISOString(),
        BREAKFAST: 0,
        LUNCH: 0,
        DINNER: 0,
        total: new Decimal(0),
      }
    );
  });

  // Total geral
  const totalGeral = groupedOrders.reduce(
    (acc, cur) => acc.plus(cur.total),
    new Decimal(0),
  );

  // Configurações layout
  const marginLeft = 40;
  const marginTop = 40;
  const lineHeight = 20;

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(
    `Relatório de Pedidos do ${capitalizeFirstLetter(customerName)}`,
    marginLeft,
    marginTop,
  );

  // Período
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const formattedFrom = formatDate(fromDate);
  const formattedTo = formatDate(toDate);
  doc.text(
    `Período: ${formattedFrom} à ${formattedTo}`,
    marginLeft,
    marginTop + 25,
  );

  // Montar tabela
  const tableColumnHeaders = ['Data', 'Café', 'Almoço', 'Jantar', 'Total'];
  const tableRows = groupedOrders.map((entry) => [
    formatDate(new Date(entry.date)),
    entry.BREAKFAST.toString(),
    entry.LUNCH.toString(),
    entry.DINNER.toString(),
    formatCurrency(entry.total.toNumber()),
  ]);

  // Chamar autoTable diretamente
  autoTable(doc, {
    startY: marginTop + 60,
    head: [tableColumnHeaders],
    body: tableRows,
    styles: {
      fontSize: 10,
      halign: 'center',
      textColor: '#222',
    },
    headStyles: {
      fillColor: '#ccc',
      fontStyle: 'bold',
    },
  });

  // Total geral (abaixo da tabela)
  const finalY =
    (doc as any).lastAutoTable?.finalY ||
    marginTop + 60 + lineHeight * tableRows.length;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(
    `Total geral: ${formatCurrency(totalGeral.toNumber())}`,
    marginLeft,
    finalY + 30,
  );

  // Salvar arquivo
  doc.save(`Relatorio-${customerName}.pdf`);
}
