import React, { useState, useEffect } from 'react';

const Preview: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const listener = (_event: any, text: string) => {
      setContent(text);
    };

    window.ipcRenderer.on('preview:content', listener);
    return () => {
      window.ipcRenderer.off('preview:content', listener);
    };
  }, []);

  if (!content) return null;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-xl text-white border border-white/10">
      <div className="flex-1 overflow-hidden">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300 selection:bg-sky-500/30 line-clamp-[18]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Preview;
