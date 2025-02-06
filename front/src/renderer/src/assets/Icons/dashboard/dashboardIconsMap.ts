import { ExpenseIcon } from '../ExpenseIcon';
import { DeliveryIcon } from './expenses/DeliveryIcon';
import { EmployeesIcon } from './expenses/Employees';
import { EquipmentsIcon } from './expenses/Equipments';
import { GarrisonsIcon } from './expenses/GarrisonsIcon';
import { MeatsIcon } from './expenses/MeatsIcon';
import { TaxesIcon } from './expenses/TaxesIcon';
import { UtensilsIcon } from './expenses/UtensilsIcon';
import { CardIcon } from './incomes/types/CardIcon';
import { CashIcon } from './incomes/types/CashIcon';

export const dashboardIconsMap = {
  income: {
    default: CardIcon,
    cash: CashIcon,
  },
  expense: {
    default: ExpenseIcon,
    taxes: TaxesIcon,
    employees: EmployeesIcon,
    equipments: EquipmentsIcon,
    meats: MeatsIcon,
    utensils: UtensilsIcon,
    delivery: DeliveryIcon,
    garrisons: GarrisonsIcon,
  },
};
