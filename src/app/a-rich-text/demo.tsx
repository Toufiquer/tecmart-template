/*
|-----------------------------------------
| setting up Demo for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/

'use client';
import RichTextEditor from './rich-text-editor';
import { useState } from 'react';
import { ViewRichText } from './view-rich-text/ViewRichText';

export default function DemoRichText() {
  const [post, setPost] = useState('');

  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <RichTextEditor content={post} onChange={onChange} />
      <ViewRichText data={post} />
    </div>
  );
}
