import { FAQItem } from "../../faq";

export interface RouletteTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  addItems: string;
  enterOption: string;
  currentItems: string;
  noItemsAdded: string;
  addItemsToStart: string;
  spinWheel: string;
  spinning: string;
  reset: string;
  resetGame: string;
  winner: string;
  itemsCount: string;
  enabledCount: string;
  removeItem: string;
  disableItem: string;
  enableItem: string;
  disabled: string;
  needMoreItems: string;
  defaultItems: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  winnerZone: string;
  winnerPointer: string;
  landingArea: string;
  arrowPoints: string;
  segmentsLandInZone: string;
  landedInZone: string;
  addItemsInstruction: string;
  addItemLabel: string;
  editItem: string;
  saveChanges: string;
  cancel: string;
  editMode: string;
  clickToEdit: string;
  autoHideEnabled: string;
  autoHideDisabled: string;
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  faqList: FAQItem[];
}
