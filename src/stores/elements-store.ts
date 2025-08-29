import { makeAutoObservable } from "mobx";

import type { Element } from "../types/widget-types";

export class ElementsStore {
  elements: Element[] = [];

  constructor() { 
    makeAutoObservable(this);

    // Let's leave the immediate data initialization here as we don't have more advanced reqiuirements
    this.elements = this.fetchElements();
  }

  fetchElements() {
    const elements = [];
    for (let i = 0; i < 300; i++) {
      const value = i + 1;
      elements.push({ value, label: `Element ${value}`});
    }
    return elements;
  }
}
