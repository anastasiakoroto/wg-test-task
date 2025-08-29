import { makeAutoObservable } from "mobx";

import type { Tag } from "../types/widget-types";

export class ActiveTagsStore {
  activeTags: Tag[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTags = (tags: Tag[]) => {
    this.activeTags = tags;
  };

  closeTag = (value: string) => {
    this.activeTags = this.activeTags.filter(tag => tag.value !== value);
  }

  get activeTagsCount() {
    return this.activeTags.length;
  }
}