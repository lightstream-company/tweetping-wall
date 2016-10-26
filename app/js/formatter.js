'use strict';

export default function formatTweetText(post) {
  const hashtags = post.tags || [];
  var text = hashtags.reduce((text, hashtag) =>
      text.replace(new RegExp(`(#${hashtag})`, 'i'), '<span class="hashtag">$1</span>')
    , post.text);

  const userMentions = post.mentions || [];
  text = userMentions.reduce((text, mention) =>
      text.replace(new RegExp(`(@${mention})`, 'i'), `<span class="hashtag">$1</span>`)
    , text);

  const urls = post.urls || [];
  text = urls.reduce((text, url) =>
      text.replace(url, `<span class="hashtag"><a href="${url}" target="_blank">${url}</a></span>`)
    , text);

  text = text.replace(/^RT/, '<i class="fa fa-retweet" aria-hidden="true"></i>');

  return text;
}