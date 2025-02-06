import { ExpenseIcon } from '../ExpenseIcon';
import { CashIcon } from '../payments/types/CashIcon';
import { DeliveryIcon } from './expenses/DeliveryIcon';
import { EmployeesIcon } from './expenses/Employees';
import { EquipmentsIcon } from './expenses/Equipments';
import { GarrisonsIcon } from './expenses/GarrisonsIcon';
import { MeatsIcon } from './expenses/MeatsIcon';
import { TaxesIcon } from './expenses/TaxesIcon';
import { UtensilsIcon } from './expenses/UtensilsIcon';
import { CardIcon } from './incomes/types/CardIcon';

export const dashboardIconsMap = {
  income: {
    default: CardIcon,
    cash: CashIcon,
  },
  expense: {
    default: ExpenseIcon,
    taxes: TaxesIcon,
    employees: EmployeesIcon,
    equipment: EquipmentsIcon,
    meats: MeatsIcon,
    utensils: UtensilsIcon,
    delivery: DeliveryIcon,
    garrison: GarrisonsIcon,
  },
};
