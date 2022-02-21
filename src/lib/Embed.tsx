import React, { useEffect, useState } from 'react';
import { addScript, removeScript } from './util';

export interface HyvorEmbedProps {
  websiteId: number;
  url?: string;
  id: any;
  title: string;
  loadMode: string;
  language?: string;
  sso?: object;
  palette?: object;
}

const HyvorEmbed: React.FC<HyvorEmbedProps> = ({ websiteId, url, id, title, loadMode, language, sso, palette }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (window as any).HYVOR_TALK_WEBSITE = websiteId;
    (window as any).HYVOR_TALK_CONFIG = {
      url: url || false,
      id: id || false,
      title: title || document.title,
      loadMode: loadMode || 'default',
      language: language || null,
      sso: sso || null,
      palette: palette || null,
    };

    if (document.getElementById('ht-embed-script')) {
      removeScript('ht-embed-script');
    }

    addScript('//talk.hyvor.com/web-api/embed', 'ht-embed-script');

    setMounted(true);
  }, [websiteId, url, id, title, loadMode, language, sso, palette]);

  if (!mounted) {
    return null;
  }

  return <div id="hyvor-talk-view" />;
};

export default HyvorEmbed;
