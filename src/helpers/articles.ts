export const getArticleImage = (image: string) => {
  return `/assets/images/articles/${image}`;
};

export const getArticleUrl = (slug: string) => {
  return `/articles/${slug}`;
};
