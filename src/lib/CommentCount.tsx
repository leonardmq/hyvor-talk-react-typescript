import React, { useEffect, useState } from 'react';
import { addScript, removeScript } from './util';

export interface HyvorCommentCountProps {
  id: string;
  websiteId: number;
  mode?: string;
}

const HyvorCommentCount: React.FC<HyvorCommentCountProps> = ({ id, websiteId, mode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (websiteId) {
      (window as any).HYVOR_TALK_WEBSITE = websiteId;
    }

    const scriptId = 'ht-comment-count-script';
    if (document.getElementById(scriptId)) {
      removeScript(scriptId);
    }
    addScript('//talk.hyvor.com/web-api/count/', scriptId);

    setMounted(true);
  }, [websiteId]);

  if (!mounted) {
    return null;
  }

  const props = {
    'data-talk-id': id,
    mode: mode || 'default',
  };

  return <span {...props} />;
};

export default HyvorCommentCount;
