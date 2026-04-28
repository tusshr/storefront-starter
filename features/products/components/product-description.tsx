type Props = {
  html: string;
};

export function ProductDescription({ html }: Props) {
  return (
    <section aria-labelledby="product-description-heading" className="min-w-0">
      <h2
        id="product-description-heading"
        className="text-foreground mb-4 text-base font-semibold tracking-tight"
      >
        Product description
      </h2>
      {/* TODO: when MDX/blocknote is wired, replace the `html` prop + dangerouslySetInnerHTML with `children` (React nodes from the compiler). The prose container stays. */}
      <div
        className="prose prose-sm prose-neutral dark:prose-invert prose-headings:mt-6 prose-headings:mb-2 prose-headings:text-base prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-p:leading-7 prose-li:leading-7 prose-li:marker:text-muted-foreground max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
