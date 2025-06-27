import { FAQItem } from "../../faq";

export interface TodoTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  addNewTask: string;
  whatNeedsToBeDone: string;
  priority: string;
  low: string;
  medium: string;
  high: string;
  dueDate: string;
  addTask: string;
  all: string;
  active: string;
  completed: string;
  activeCount: string;
  noCompletedTasks: string;
  noActiveTasks: string;
  noTasks: string;
  addTaskToGetStarted: string;
  markAsIncomplete: string;
  markAsComplete: string;
  saveEdit: string;
  cancelEdit: string;
  editTask: string;
  deleteTask: string;
  statistics: string;
  totalTasks: string;
  progress: string;
  overdue: string;
  filter: string;
  taskList: string;
  faqList: FAQItem[];
}
