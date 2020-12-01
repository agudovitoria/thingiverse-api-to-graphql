import { Tag } from './Tag';
import { ItemCreator } from './ItemCreator';

export interface Item {
  id: string;
  name: string;
  url: string;
  public_url: string;
  created_at: Date;
  thumbnail: string;
  preview_image: string;
  creator: ItemCreator;
  is_private: boolean;
  is_purchased: boolean;
  is_published: boolean;
  comment_count: number;
  like_count: number;
  tags: Tag[];
}
