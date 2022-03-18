export type Renderable<Props> = Props & {
  Component: React.FC<Props>;
};
