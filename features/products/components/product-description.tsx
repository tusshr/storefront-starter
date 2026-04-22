type Props = {
  html: string;
};

export function ProductDescription({ html }: Props) {
  return (
    <section aria-labelledby="product-description-heading" className="max-w-2xl">
      <h2
        id="product-description-heading"
        className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase"
      >
        About this product
      </h2>
      <div
        className="prose prose-sm prose-neutral max-w-none dark:prose-invert prose-headings:mt-6 prose-headings:mb-2 prose-headings:text-sm prose-headings:font-semibold prose-headings:tracking-wide prose-headings:uppercase prose-headings:text-muted-foreground prose-p:leading-relaxed prose-li:marker:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
