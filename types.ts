
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Not sent to client
  status: 'approved' | 'pending';
  isAdmin: boolean;
  avatarUrl: string;
}

export interface Post {
  id:string;
  title: string;
  summary: string;
  content: string[];
  authorId: string;
  author?: Author | User; // Can be a staff author or a registered user
  date: string;
  category: string;
  imageUrl: string;
  status: 'published' | 'pending' | 'rejected';
  isEditorsPick?: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    authorName: string; // For display
    content: string;
    date: string;
    status: 'published' | 'pending' | 'rejected';
}

export interface Subscription {
    id: string;
    name: string;
    email: string;
    date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}