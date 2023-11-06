export type DialogConfig = {
  id: number;
  key: string;
  title: string;
  message: string;
  titleEmphasis?: string;
  buttonAlign?: string;
  numberOfButtons?: number;
  firstButton?: ButtonConfig;
  secondButton?: ButtonConfig;
  afterClose?: () => void;
};

type ButtonConfig = {
  text?: string;
  color?: string;
  onClick?: () => void;
}
