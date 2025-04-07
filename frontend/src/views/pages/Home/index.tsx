import { TabsContent } from '@radix-ui/react-tabs';

import { DatePicker } from '@views/components/DatePicker';
import { DropdownDemo } from '@views/components/DropdownDemo';
import { Tabs, TabsList, TabsTrigger } from '@views/components/ui/Tabs';

export function Home() {
  return (
    <div className="flex flex-1 flex-col items-center h-full">
      <Tabs
        defaultValue="dropdown-menu"
        className="w-full max-w-[400px] text-center"
      >
        <TabsList>
          <TabsTrigger value="dropdown-menu">Dropdown Menu</TabsTrigger>
          <TabsTrigger value="date-picker">Calendário</TabsTrigger>
        </TabsList>
        <TabsContent value="dropdown-menu">
          <DropdownDemo />
        </TabsContent>
        <TabsContent value="date-picker">
          <DatePicker />
        </TabsContent>
      </Tabs>
    </div>
  );
}
