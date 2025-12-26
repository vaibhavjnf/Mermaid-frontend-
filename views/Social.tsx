import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Share, BadgeCheck, MoreHorizontal, Image as ImageIcon, Search, Send } from 'lucide-react';
import { SocialPost } from '../types';
import { generateTweet } from '../services/geminiService';
import { MOCK_USER } from '../constants';

const Social: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [activeTab, setActiveTab] = useState<'FOR_YOU' | 'FOLLOWING'>('FOR_YOU');
  const [tweetInput, setTweetInput] = useState('');

  useEffect(() => {
    // Generate mock tweets
    const loadPosts = async () => {
      const newPosts: SocialPost[] = [];
      for (let i = 0; i < 8; i++) {
        const content = await generateTweet();
        const hasImage = Math.random() > 0.7; // 30% chance of image
        newPosts.push({
          id: `post-${i}`,
          authorAlias: `NetRunner_${Math.floor(Math.random() * 900) + 100}`,
          authorHandle: `@runner${i}`,
          avatarUrl: `https://picsum.photos/seed/${i + 999}/200/200`,
          content: content,
          imageUrl: hasImage ? `https://picsum.photos/seed/${i + 555}/600/350` : undefined,
          likes: Math.floor(Math.random() * 5000),
          reposts: Math.floor(Math.random() * 1000),
          replies: Math.floor(Math.random() * 500),
          timestamp: `${Math.floor(Math.random() * 24) + 1}h`,
          isVerified: Math.random() > 0.5,
          tags: [],
        });
      }
      setPosts(newPosts);
    };
    loadPosts();
  }, []);

  const handlePost = () => {
    if (!tweetInput) return;
    const newPost: SocialPost = {
      id: Date.now().toString(),
      authorAlias: MOCK_USER.alias,
      authorHandle: '@cipher_siren',
      avatarUrl: MOCK_USER.avatarUrl,
      content: tweetInput,
      likes: 0,
      reposts: 0,
      replies: 0,
      timestamp: 'Just now',
      isVerified: true,
      tags: [],
    };
    setPosts([newPost, ...posts]);
    setTweetInput('');
  };

  const TrendingItem = ({ category, title, posts }: any) => (
    <div className="p-4 border-b-2 border-black hover:bg-neo-accent hover:text-black cursor-pointer transition-colors group">
      <div className="flex justify-between items-start text-xs font-mono mb-1 text-black opacity-60 group-hover:opacity-100 group-hover:text-black transition-all">
        <span>{category}</span>
        <MoreHorizontal size={14} />
      </div>
      <div className="font-bold text-base leading-tight">{title}</div>
      <div className="text-xs mt-1 font-mono text-black opacity-70 group-hover:opacity-100">{posts} posts</div>
    </div>
  );

  return (
    <div className="h-full flex overflow-hidden bg-white">
      {/* Feed Column */}
      <div className="flex-1 max-w-3xl border-r-2 border-black overflow-y-auto">
        {/* Header Tabs */}
        <div className="sticky top-0 bg-white border-b-2 border-black z-20 flex">
          <button 
            onClick={() => setActiveTab('FOR_YOU')}
            className={`flex-1 py-4 font-bold text-lg uppercase transition-all ${activeTab === 'FOR_YOU' ? 'bg-neo-primary text-white border-r-2 border-black' : 'hover:bg-gray-100 text-black'}`}
          >
            For you
          </button>
          <button 
            onClick={() => setActiveTab('FOLLOWING')}
            className={`flex-1 py-4 font-bold text-lg uppercase transition-all ${activeTab === 'FOLLOWING' ? 'bg-neo-secondary text-white border-l-2 border-black' : 'hover:bg-gray-100 text-black'}`}
          >
             Following
          </button>
        </div>

        {/* Compose Box */}
        <div className="p-6 border-b-2 border-black bg-gray-50 hidden md:block">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg border-2 border-black overflow-hidden shadow-neo-sm">
               <img src={MOCK_USER.avatarUrl} alt="me" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <textarea 
                value={tweetInput}
                onChange={(e) => setTweetInput(e.target.value)}
                placeholder="Broadcast to the stream..."
                className="w-full bg-white border-2 border-black p-4 outline-none text-lg resize-none shadow-neo-sm focus:shadow-neo transition-all rounded-md placeholder:text-black placeholder:opacity-40 text-black"
                rows={2}
              />
              <div className="flex justify-between items-center mt-3">
                 <button className="p-2 border-2 border-transparent hover:border-black rounded-md hover:bg-gray-200 transition-all text-neo-primary">
                    <ImageIcon size={24} />
                 </button>
                 <button 
                  onClick={handlePost}
                  disabled={!tweetInput}
                  className="bg-black text-white font-bold px-6 py-2 rounded-md border-2 border-black shadow-neo-sm hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                   SEND <Send size={16} />
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="">
          {posts.length === 0 ? (
            <div className="text-center py-20 font-mono text-black">
               <div className="animate-spin inline-block w-8 h-8 border-4 border-black border-t-transparent rounded-full mb-4"></div>
               <div>INITIALIZING STREAM...</div>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="p-6 border-b-2 border-black hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full border-2 border-black overflow-hidden bg-white">
                      <img src={post.avatarUrl} alt={post.authorAlias} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-black text-black text-base">{post.authorAlias}</span>
                      {post.isVerified && <BadgeCheck size={16} className="text-neo-primary fill-white" />}
                      <span className="text-black opacity-60 text-sm font-mono border-2 border-transparent hover:border-black hover:bg-gray-200 px-1 rounded cursor-pointer transition-all hover:opacity-100">{post.authorHandle}</span>
                      <span className="text-black opacity-40 text-xs">• {post.timestamp}</span>
                    </div>
                    
                    <div className="text-base text-black font-medium leading-relaxed mb-4 whitespace-pre-wrap">
                      {post.content}
                    </div>

                    {post.imageUrl && (
                      <div className="mb-4 rounded-lg overflow-hidden border-2 border-black shadow-neo-sm">
                        <img src={post.imageUrl} alt="post media" className="w-full h-auto max-h-96 object-cover" />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between max-w-md pt-2">
                      <button className="flex items-center gap-2 group text-black opacity-60 hover:text-neo-primary hover:opacity-100 transition-all">
                        <div className="p-2 border-2 border-transparent group-hover:border-black group-hover:bg-white rounded-full transition-all">
                          <MessageCircle size={20} />
                        </div>
                        <span className="font-mono text-sm font-bold">{post.replies}</span>
                      </button>
                      <button className="flex items-center gap-2 group text-black opacity-60 hover:text-neo-success hover:opacity-100 transition-all">
                        <div className="p-2 border-2 border-transparent group-hover:border-black group-hover:bg-white rounded-full transition-all">
                          <Repeat2 size={20} />
                        </div>
                        <span className="font-mono text-sm font-bold">{post.reposts}</span>
                      </button>
                      <button className="flex items-center gap-2 group text-black opacity-60 hover:text-neo-secondary hover:opacity-100 transition-all">
                        <div className="p-2 border-2 border-transparent group-hover:border-black group-hover:bg-white rounded-full transition-all">
                          <Heart size={20} />
                        </div>
                        <span className="font-mono text-sm font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 group text-black opacity-60 hover:text-black hover:opacity-100 transition-all">
                        <div className="p-2 border-2 border-transparent group-hover:border-black group-hover:bg-white rounded-full transition-all">
                          <Share size={20} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar (Trending) */}
      <div className="hidden lg:block w-80 bg-gray-50 border-l-2 border-black">
        <div className="sticky top-0 p-4">
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="SEARCH..." 
              className="w-full bg-white border-2 border-black rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:shadow-neo transition-all placeholder:text-black placeholder:opacity-40 text-black font-bold" 
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" size={16} />
          </div>

          <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-neo mb-6">
            <h3 className="font-black text-lg px-4 py-3 bg-neo-primary text-white border-b-2 border-black uppercase">Trending</h3>
            <TrendingItem category="Tech" title="#Decentralized" posts="45.2K" />
            <TrendingItem category="Politics" title="Cyber Act 2077" posts="12.5K" />
            <TrendingItem category="Finance" title="$OCEAN" posts="156K" />
            <div className="px-4 py-3 text-neo-primary font-bold text-sm cursor-pointer hover:underline hover:bg-gray-50">View All</div>
          </div>

          <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-neo">
            <h3 className="font-black text-lg px-4 py-3 bg-neo-secondary text-white border-b-2 border-black uppercase">Connect</h3>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b-2 border-black last:border-0 hover:bg-gray-50">
                <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden">
                   <img src={`https://picsum.photos/seed/user${i}/100`} className="h-full w-full" alt="user" />
                </div>
                <div className="flex-1 overflow-hidden">
                   <div className="font-bold text-sm truncate text-black">AnonUser_{i}</div>
                   <div className="text-xs text-black opacity-60 font-mono">@anon_{i}</div>
                </div>
                <button className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-neo-primary hover:text-white transition-colors">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;