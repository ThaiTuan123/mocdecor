// types.ts (or any appropriate file)
export interface CarouselItem {
  id: string; // Unique identifier for the carousel item
  imageUrl: string; // URL of the image to be displayed
  title: string; // Title or alt text for the image
  description?: string; // Optional description for the item
  linkUrl?: string; // Optional URL to navigate to when the item is clicked
  buttonText?: string; // Optional text for a button associated with the item
}
