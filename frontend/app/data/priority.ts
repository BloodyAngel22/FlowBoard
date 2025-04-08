import { ChevronDown, Equal, ChevronUp } from 'lucide-react';
import { IFormSelect } from '../types/IFormSelect';

export const priorities: IFormSelect[] = [
  { value: 1, styles: "text-blue-500", label: "Низкий", icon: ChevronDown },
  { value: 2, styles: "text-yellow-500", label: "Средний", icon: Equal },
  { value: 3, styles: "text-red-500", label: "Высокий", icon: ChevronUp },
];

export const getPriorityData = (
  priority?: number
): IFormSelect => {
  return (
    priorities.find((p) => Number(p.value) === priority) || priorities[0]
  );
};