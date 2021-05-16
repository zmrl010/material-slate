export interface ImageElement {
  type: "image";
  url: string;
  alt?: string;
  children: { text: string }[];
}
