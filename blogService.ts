import type { Post, Author, Comment, Subscription, User } from '../types';

const DB_KEYS = {
    POSTS: 'curious_minds_posts',
    AUTHORS: 'curious_minds_authors',
    COMMENTS: 'curious_minds_comments',
    SUBSCRIPTIONS: 'curious_minds_subscriptions',
    USERS: 'curious_minds_users',
};

// --- INITIAL DATA & DB INITIALIZATION ---
const initialAuthors: Author[] = [
  { id: '1', name: 'Dr. Evelyn Reed', bio: 'A cognitive scientist with a passion for understanding the human mind. Evelyn breaks down complex psychological concepts into actionable insights.', avatarUrl: 'https://i.pravatar.cc/150?u=evelyn' },
  { id: '2', name: 'Marcus Chen', bio: 'A historian and storyteller, Marcus brings the past to life. He believes that understanding history is key to navigating the present.', avatarUrl: 'https://i.pravatar.cc/150?u=marcus' },
  { id: '3', name: 'Aria Patel', bio: 'A science communicator and tech enthusiast, Aria explores the cutting edge of innovation and its impact on our world.', avatarUrl: 'https://i.pravatar.cc/150?u=aria' },
];

const initialPosts: Post[] = [
  // Existing Posts
  {
      id: '1',
      title: 'The Science of Procrastination and How to Fight It',
      summary: 'We all put things off. But why? Dive into the psychology behind procrastination and discover effective, science-backed strategies to regain control of your time and productivity.',
      content: ["Procrastination isn't a simple matter of laziness; it's a complex psychological battle...", "This internal conflict is often fueled by underlying emotions like fear of failure...", "Fortunately, neuroscience and behavioral psychology offer practical strategies...", "Another powerful technique is 'task decomposition,' which involves breaking a large, intimidating project into smaller, manageable sub-tasks...", "Ultimately, fighting procrastination is about managing emotions, not just time..."],
      authorId: '1',
      date: 'July 15, 2024',
      category: 'Psychology',
      imageUrl: 'https://picsum.photos/seed/procrastination/800/600',
      status: 'published',
      isEditorsPick: true,
  },
  {
      id: '2',
      title: 'Unlocking Creativity: Lessons from History\'s Greats',
      summary: 'What do Leonardo da Vinci, Marie Curie, and Mozart have in common? Explore the habits, environments, and mindsets that fueled some of the most creative minds in history.',
      content: ["Creativity is often viewed as a mysterious, almost magical gift...", "Another crucial element is the 'incubation' period...", "Environment also plays a vital role...", "Furthermore, embracing failure was a non-negotiable part of their process...", "So, how can we apply these lessons today?..."],
      authorId: '2',
      date: 'July 10, 2024',
      category: 'History',
      imageUrl: 'https://picsum.photos/seed/inspiration/800/600',
      status: 'published'
  },
  {
      id: '3',
      title: 'The Future of Energy: Beyond Solar and Wind',
      summary: 'While solar and wind power are leading the green revolution, what comes next? We explore cutting-edge energy technologies like nuclear fusion and geothermal that could power our future.',
      content: ["The renewable energy landscape is rapidly evolving...", "One of the most anticipated is nuclear fusion...", "Beneath our feet lies another powerful, yet largely untapped, resource: geothermal energy...", "The potential doesn't stop there. Green hydrogen...", "These advanced technologies are not without their hurdles..."],
      authorId: '3',
      date: 'July 5, 2024',
      category: 'Technology',
      imageUrl: 'https://picsum.photos/seed/energy/800/600',
      status: 'published'
  },
  {
      id: '4',
      title: 'The Forgotten Scientists Who Changed the World',
      summary: 'Beyond Einstein and Newton, countless scientists made discoveries that shaped our modern world. Meet the unsung heroes whose contributions deserve recognition.',
      content: ["History often simplifies scientific progress...", "One such figure is Rosalind Franklin...", "In the realm of particle physics, Chien-Shiung Wu...", "Similarly, Lise Meitner was a brilliant physicist...", "These stories highlight a recurring theme..."],
      authorId: '3',
      date: 'June 28, 2024',
      category: 'Science',
      imageUrl: 'https://picsum.photos/seed/scientists/800/600',
      status: 'published'
  },
  {
      id: '5',
      title: 'Why Ancient Ethiopia Had One of the Oldest Written Languages',
      summary: 'Delve into the history of Ge\'ez, an ancient script that reveals a rich literary and cultural heritage in the Horn of Africa.',
      content: ["Long before the emergence of many modern languages...", "The adoption of Christianity by King Ezana...", "The script was also used for monumental inscriptions...", "While Ge'ez is no longer a spoken language in everyday life..."],
      authorId: '2',
      date: 'June 21, 2024',
      category: 'Culture',
      imageUrl: 'https://picsum.photos/seed/ethiopia/800/600',
      status: 'published'
  },
  // New Posts
  {
      id: '6',
      title: 'The Unsolved Mystery of the Roanoke Colony',
      summary: 'In 1590, an entire English colony in North America vanished without a trace, leaving behind only a single cryptic word: "Croatoan." What happened to the Lost Colony of Roanoke?',
      content: ["The story of the Roanoke Colony is one of early American history's most enduring and chilling mysteries...", "Governor John White returned to Roanoke in 1590 to find the settlement deserted...", "The primary clue was the word 'CROATOAN' carved into a post..."],
      authorId: '2',
      date: 'August 1, 2024',
      category: 'Mysteries',
      imageUrl: 'https://picsum.photos/seed/roanoke/800/600',
      status: 'published'
  },
  {
      id: '7',
      title: 'The Rise of Esports: From Niche Hobby to Global Phenomenon',
      summary: 'Competitive gaming has exploded into a billion-dollar industry. We explore the history, culture, and future of esports, and what it takes to be a professional player.',
      content: ["Once confined to basements and LAN parties, esports has transformed into a global spectacle...", "The journey from arcade high scores to stadium-filling tournaments was a long one...", "Life as a professional esports athlete is grueling..."],
      authorId: '3',
      date: 'July 28, 2024',
      category: 'Sports',
      imageUrl: 'https://picsum.photos/seed/esports/800/600',
      status: 'published'
  },
  {
      id: '8',
      title: 'CRISPR Gene Editing: The Power and Peril',
      summary: 'CRISPR-Cas9 technology has given humanity the power to edit DNA with unprecedented precision. What are the incredible possibilities and the profound ethical questions this raises?',
      content: ["CRISPR is a revolutionary gene-editing tool that acts like a pair of molecular scissors...", "The potential applications are staggering, from curing genetic diseases like cystic fibrosis to developing more resilient crops...", "However, the power to alter the very code of life comes with immense ethical responsibility..."],
      authorId: '1',
      date: 'July 25, 2024',
      category: 'Discovery',
      imageUrl: 'https://picsum.photos/seed/gene-editing/800/600',
      status: 'published'
  },
  {
      id: '9',
      title: 'The Art of World-Building in "One Piece"',
      summary: 'Eiichiro Oda\'s "One Piece" is more than just a manga; it\'s a masterclass in creating a vast, immersive, and cohesive fictional world. How does he do it?',
      content: ["For over two decades, One Piece has captivated audiences worldwide...", "Oda's world-building is meticulous, blending diverse cultures, unique geographies, and complex political systems...", "The power system of Devil Fruits is both simple in concept and boundless in creativity..."],
      authorId: '3',
      date: 'July 22, 2024',
      category: 'Anime',
      imageUrl: 'https://picsum.photos/seed/onepiece/800/600',
      status: 'published'
  },
  {
      id: '10',
      title: 'The Geopolitical Chessboard: Understanding Modern Alliances',
      summary: 'From NATO to the Quad, international alliances shape global politics, trade, and security. We provide a concise overview of the key players and their strategic importance.',
      content: ["In an interconnected world, no nation is an island...", "Historical alliances like NATO, formed during the Cold War, have evolved to face new threats...", "Emerging partnerships in the Indo-Pacific, such as the Quad and AUKUS, reflect a shift in global power dynamics..."],
      authorId: '2',
      date: 'July 18, 2024',
      category: 'Politics',
      imageUrl: 'https://picsum.photos/seed/politics/800/600',
      status: 'published'
  },
  {
      id: '11',
      title: '"Dune" by Frank Herbert: More Than Just a Sci-Fi Novel',
      summary: 'Frank Herbert\'s "Dune" is a seminal work of science fiction, but its exploration of politics, religion, and ecology makes it a timeless classic. Why does it still resonate?',
      content: ["Published in 1965, Dune transcended the sci-fi genre...", "At its core, Dune is a political thriller, examining the corrupting influence of power...", "The novel's ecological themes were far ahead of their time..."],
      authorId: '1',
      date: 'July 14, 2024',
      category: 'Books',
      imageUrl: 'https://picsum.photos/seed/dune/800/600',
      status: 'published'
  },
  {
      id: '12',
      title: 'The Golden Age of Hollywood: Myths and Realities',
      summary: 'We look past the glitz and glamour to explore the studio system, the stars, and the scandals that defined Hollywood\'s Golden Age from the 1920s to the 1960s.',
      content: ["The term 'Golden Age of Hollywood' evokes images of iconic stars and cinematic masterpieces...", "The powerful studio system controlled every aspect of filmmaking and a star's life...", "Behind the curated public personas were often stories of struggle, scandal, and rebellion..."],
      authorId: '2',
      date: 'July 8, 2024',
      category: 'Entertainment',
      imageUrl: 'https://picsum.photos/seed/hollywood/800/600',
      status: 'published'
  },
  {
      id: '13',
      title: 'The Great Barrier Reef: A Race Against Time',
      summary: 'The world\'s largest living structure is facing an unprecedented threat from climate change. What is being done to save the Great Barrier Reef?',
      content: ["The Great Barrier Reef is an ecological marvel, visible even from space...", "Rising sea temperatures have led to widespread coral bleaching events...", "Scientists and conservationists are racing to find innovative solutions..."],
      authorId: '3',
      date: 'July 2, 2024',
      category: 'Science',
      imageUrl: 'https://picsum.photos/seed/reef/800/600',
      status: 'published'
  },
  {
      id: '14',
      title: 'Kabuki Theatre: The Enduring Art of Japanese Drama',
      summary: 'With its elaborate makeup, dramatic poses, and rich history, Kabuki remains one of Japan\'s most iconic traditional art forms. We explore its origins and key features.',
      content: ["Kabuki is a classical form of Japanese dance-drama that originated in the 17th century...", "One of its most recognizable features is the elaborate makeup, or 'kumadori'...", "The stylized movements and dramatic 'mie' poses are used to convey powerful emotions..."],
      authorId: '2',
      date: 'June 25, 2024',
      category: 'Culture',
      imageUrl: 'https://picsum.photos/seed/kabuki/800/600',
      status: 'published'
  },
  {
      id: '15',
      title: 'The Fermi Paradox: Where Is Everybody?',
      summary: 'The universe is vast and ancient, so why haven\'t we found any evidence of intelligent alien life? We explore the chilling silence and the leading theories behind the Fermi Paradox.',
      content: ["The Fermi Paradox highlights the stark contradiction between the high probability of extraterrestrial life and the lack of evidence for it...", "Proposed solutions range from the 'Great Filter' hypothesis to the idea that we are simply too primitive to notice...", "The paradox forces us to confront fundamental questions about our place in the cosmos..."],
      authorId: '1',
      date: 'June 18, 2024',
      category: 'Mysteries',
      imageUrl: 'https://picsum.photos/seed/fermi/800/600',
      status: 'published'
  },
  {
      id: '16',
      title: 'The Library of Alexandria: Lost Knowledge of the Ancient World',
      summary: 'A beacon of scholarship in the ancient world, the Library of Alexandria was said to hold the sum of human knowledge. What was lost when it disappeared?',
      content: ["The Library of Alexandria was not just a collection of scrolls; it was an institution of research and learning...", "Its destruction was not a single event but a gradual decline over centuries...", "The loss of the library represents a profound gap in our understanding of the ancient world..."],
      authorId: '2',
      date: 'June 12, 2024',
      category: 'History',
      imageUrl: 'https://picsum.photos/seed/alexandria/800/600',
      status: 'published'
  }
];

const initialAdmin: User = {
    id: 'admin-user',
    name: 'Admin',
    email: 'admin@curiousminds.com',
    password: 'admin', // In a real app, this should be a hashed password.
    status: 'approved',
    isAdmin: true,
    avatarUrl: 'https://i.pravatar.cc/150?u=admin',
};

const initDB = () => {
    if (!localStorage.getItem(DB_KEYS.AUTHORS)) {
        localStorage.setItem(DB_KEYS.AUTHORS, JSON.stringify(initialAuthors));
    }
    if (!localStorage.getItem(DB_KEYS.POSTS)) {
        localStorage.setItem(DB_KEYS.POSTS, JSON.stringify(initialPosts));
    }
    if (!localStorage.getItem(DB_KEYS.COMMENTS)) {
        localStorage.setItem(DB_KEYS.COMMENTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.SUBSCRIPTIONS)) {
        localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify([initialAdmin]));
    }
};

initDB();

// --- DATA ACCESSOR HELPERS ---
const getFromDB = <T>(key: string): T[] => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);
        return [];
    }
}

const saveToDB = <T>(key: string, data: T[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
}

// --- USER SERVICE ---
export const getAllUsers = async (): Promise<User[]> => getFromDB<User>(DB_KEYS.USERS);
export const getUserById = async (id: string): Promise<User | null> => {
    const users = await getAllUsers();
    return users.find(u => u.id === id) || null;
}

export const registerUser = async (userData: Omit<User, 'id' | 'status' | 'isAdmin' | 'avatarUrl'>): Promise<User> => {
    const users = getFromDB<User>(DB_KEYS.USERS);
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error("An account with this email already exists.");
    }
    const newUser: User = {
        ...userData,
        id: `user-${Date.now().toString()}`,
        status: 'pending',
        isAdmin: false,
        avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    saveToDB<User>(DB_KEYS.USERS, [...users, newUser]);
    return newUser;
}

export const loginUser = async (credentials: Pick<User, 'email' | 'password'>): Promise<User> => {
    const users = getFromDB<User>(DB_KEYS.USERS);
    const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password);
    if (!user) {
        throw new Error("Invalid email or password.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export const getPendingUsers = async(): Promise<User[]> => {
    const users = await getAllUsers();
    return users.filter(u => u.status === 'pending');
}

export const approveUser = async (userId: string): Promise<void> => {
    const users = getFromDB<User>(DB_KEYS.USERS);
    const updatedUsers: User[] = users.map(u => u.id === userId ? { ...u, status: 'approved' } : u);
    saveToDB<User>(DB_KEYS.USERS, updatedUsers);
}

// --- AUTHOR SERVICE ---
export const getAuthors = async (): Promise<Author[]> => getFromDB<Author>(DB_KEYS.AUTHORS);
export const getAuthorById = async (id: string): Promise<Author | User | null> => {
    if (id.startsWith('user-')) {
        return await getUserById(id);
    }
    const authors = await getAuthors();
    return authors.find(a => a.id === id) || null;
}


// --- POST SERVICE ---
const populatePostAuthors = async (posts: Post[]): Promise<Post[]> => {
    const staffAuthors = await getAuthors();
    const users = await getAllUsers();
    const authorMap = new Map<string, Author | User>();
    staffAuthors.forEach(a => authorMap.set(a.id, a));
    users.forEach(u => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = u;
        authorMap.set(u.id, userWithoutPassword)
    });

    return posts.map(p => ({ ...p, author: authorMap.get(p.authorId) }));
}

export const getPosts = async (filter: { status?: Post['status'] } = {}): Promise<Post[]> => {
    let posts = getFromDB<Post>(DB_KEYS.POSTS);
    if (filter.status) {
        posts = posts.filter(p => p.status === filter.status);
    } else {
        posts = posts.filter(p => p.status === 'published');
    }
    const populated = await populatePostAuthors(posts);
    return populated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostById = async (id: string): Promise<Post | null> => {
    const posts = getFromDB<Post>(DB_KEYS.POSTS);
    const post = posts.find(p => p.id === id) || null;
    if (post) {
        const [populated] = await populatePostAuthors([post]);
        return populated;
    }
    return null;
}

export const getPostsByIds = async (ids: string[]): Promise<Post[]> => {
    const posts = await getPosts({ status: 'published' });
    const postMap = new Map(posts.map(p => [p.id, p]));
    return ids.map(id => postMap.get(id)).filter((p): p is Post => !!p);
};

export const getPostsByAuthorId = async (authorId: string): Promise<Post[]> => {
    const posts = await getPosts({ status: 'published' });
    return posts.filter(p => p.authorId === authorId);
}

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
    const posts = await getPosts({ status: 'published' });
    return posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export const getAllCategories = async (): Promise<string[]> => {
    const posts = await getPosts({ status: 'published' });
    const allPostCategories = getFromDB<Post>(DB_KEYS.POSTS).map(p => p.category);
    return Array.from(new Set([...allPostCategories, ...posts.map(p => p.category)])).sort();
}

export const submitPost = async (postData: Omit<Post, 'id' | 'date' | 'status' | 'imageUrl' | 'author'>): Promise<Post> => {
    const posts = getFromDB<Post>(DB_KEYS.POSTS);
    const newPost: Post = {
        ...postData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`,
        status: 'pending',
        content: (postData.content[0] || '').split('\n'),
    };
    saveToDB<Post>(DB_KEYS.POSTS, [...posts, newPost]);
    return newPost;
}

export const approvePost = async (postId: string): Promise<void> => {
    const posts = getFromDB<Post>(DB_KEYS.POSTS);
    const updatedPosts: Post[] = posts.map(p => p.id === postId ? { ...p, status: 'published' } : p);
    saveToDB<Post>(DB_KEYS.POSTS, updatedPosts);
}

export const rejectPost = async (postId: string): Promise<void> => {
    const posts = getFromDB<Post>(DB_KEYS.POSTS);
    const updatedPosts = posts.filter(p => p.id !== postId); 
    saveToDB<Post>(DB_KEYS.POSTS, updatedPosts);
}

// --- COMMENT SERVICE ---
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
    const allComments = getFromDB<Comment>(DB_KEYS.COMMENTS);
    const postComments = allComments.filter(c => c.postId === postId && c.status === 'published');
    return postComments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPendingComments = async(): Promise<Comment[]> => {
    const allComments = getFromDB<Comment>(DB_KEYS.COMMENTS);
    return allComments.filter(c => c.status === 'pending');
}

export const submitComment = async (commentData: Omit<Comment, 'id' | 'date' | 'status'>): Promise<Comment> => {
    const comments = getFromDB<Comment>(DB_KEYS.COMMENTS);
    const newComment: Comment = {
        ...commentData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'pending',
    };
    saveToDB<Comment>(DB_KEYS.COMMENTS, [...comments, newComment]);
    return newComment;
}

export const approveComment = async (commentId: string): Promise<void> => {
    const comments = getFromDB<Comment>(DB_KEYS.COMMENTS);
    const updated: Comment[] = comments.map(c => c.id === commentId ? { ...c, status: 'published' } : c);
    saveToDB<Comment>(DB_KEYS.COMMENTS, updated);
}

export const rejectComment = async (commentId: string): Promise<void> => {
    const comments = getFromDB<Comment>(DB_KEYS.COMMENTS);
    const updated = comments.filter(c => c.id !== commentId);
    saveToDB<Comment>(DB_KEYS.COMMENTS, updated);
}

// --- SUBSCRIPTION SERVICE ---
export const getSubscriptions = async(): Promise<Subscription[]> => {
    return getFromDB<Subscription>(DB_KEYS.SUBSCRIPTIONS);
}

export const addSubscription = async(subData: Omit<Subscription, 'id' | 'date'>): Promise<Subscription> => {
    const subscriptions = getFromDB<Subscription>(DB_KEYS.SUBSCRIPTIONS);
    if (subscriptions.some(s => s.email === subData.email)) {
        throw new Error("This email is already subscribed.");
    }
    const newSub: Subscription = {
        ...subData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
    };
    saveToDB<Subscription>(DB_KEYS.SUBSCRIPTIONS, [...subscriptions, newSub]);
    return newSub;
}