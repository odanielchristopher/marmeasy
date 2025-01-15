import * as RdxTabs from '@radix-ui/react-tabs';
import { StyledRdxTabList, StyledRdxTabTrigger } from './styles';

interface TabsRootProps {
  children: React.ReactNode;
  defaultValue?: string;
}

function TabsRoot({ children, defaultValue }: TabsRootProps) {
  return (
    <RdxTabs.Root defaultValue={defaultValue}>
      {children}
    </RdxTabs.Root>
  );
}

function TabsList({ children }: { children: React.ReactNode}) {
  return (
    <StyledRdxTabList>
      {children}
    </StyledRdxTabList>
  );
}

interface TabTriggerProps {
  text: string;
  value: string;
}

function TabsTrigger({ text, value }: TabTriggerProps) {
  return (
    <StyledRdxTabTrigger value={value}>
      {text}
    </StyledRdxTabTrigger>
  );
}

interface TabContentProps {
  children: React.ReactNode;
  value: string;
}

function TabsContent({ children, value }: TabContentProps) {
  return (
    <RdxTabs.Content value={value}>
      {children}
    </RdxTabs.Content>
  );
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
