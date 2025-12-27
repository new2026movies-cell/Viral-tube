import { Video, Category } from './types';

/**
 * Videos provided by the user to be the default set.
 * Removed all pre-seeded mock content except the user-requested Payal Gaming video.
 */
export const MOCK_VIDEOS: Video[] = [
  { 
    id: "5", 
    title: "Payal Gaming Viral video", 
    thumbnail: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949360708f7c3ed693f665fc4450351954ad7120bcfb72a2e9d74b0afeeafcf61317e6ef5e1a060830b8e2fbe2ab6c6419eb68be394ae487dbbc9de4ff26ee719b26", 
    url: "https://jumpshare.com/embed/HgJO9OlTf2wF4ZaWjlMw", 
    meta: "New Viral",
    channelName: "Viral tube",
    views: "10M views",
    postedAt: "Just now",
    duration: "05:12",
    description: "The most awaited viral video of Payal Gaming is finally here. Exclusive leak.",
    codeSnippet: "# Payload Extraction\nimport viral\nprint('Analyzing Payal Gaming Video...')",
    category: Category.ALL,
    avatar: "https://picsum.photos/seed/pg/100/100"
  }
];

export const CATEGORIES = Object.values(Category);