export class Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name, slug, description) {
    this.name = name;
    this.slug = slug;
    this.description = description;
  }
}
