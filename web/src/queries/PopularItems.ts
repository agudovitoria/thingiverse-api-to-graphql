import { gql } from '@apollo/client';

export const PopularItems = gql`
  query {
    popular {
      id
      name
      url
      public_url
      created_at
      thumbnail
      preview_image
      creator {
        id
        name
        first_name
        last_name
        url
        public_url
        thumbnail
        count_of_followers
        count_of_following
        count_of_designs
        accepts_tips
        is_following
        location
        cover
      }
      is_private
      is_purchased
      is_published
      comment_count
      like_count
      tags {
        name
        url
        count
        things_url
        absolute_url
      }
    }
  }
`;
