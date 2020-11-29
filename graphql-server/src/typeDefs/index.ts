import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type User {
    id: Int
    name: String
    first_name: String
    last_name: String
    url: String
    public_url: String
    thumbnail: String
    count_of_followers: Int
    count_of_following: Int
    count_of_designs: Int
    accepts_tips: Boolean
    is_following: Boolean
    location: String
    cover: String
  }
  type Tag {
    name: String
    url: String
    count: Int
    things_url: String
    absolute_url: String
  }

  type Item {
    id: Int
    name: String
    url: String
    public_url: String
    created_at: String
    thumbnail: String
    preview_image: String
    creator: User
    is_private: Int
    is_purchased: Int
    is_published: Int
    comment_count: Int
    like_count: Int
    tags: [Tag]
  }

  type Query {
    popular: [Item]!
    newest: [Item]!
    featured: [Item]!
  }
`;
