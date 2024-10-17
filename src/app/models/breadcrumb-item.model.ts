export class BreadcrumbItem {
  label: string;
  link?: string;
  constructor(label: string, link?: string) {
    this.label = label;
    this.link = link;
  }
}
