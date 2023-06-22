export type DialogConfig = {
  id: number;
  title: string;
  message: string;
  titleEmphasis?: string;
  buttonAlign?: string;
  numberOfButtons?: number;
  firstButton?: {
    text?: string;
    color?: string;
    onClick?: () => void;
  };
  secondButton?: {
    text?: string;
    color?: string;
    onClick?: () => void;
  };
  afterClose?: () => void;
};
