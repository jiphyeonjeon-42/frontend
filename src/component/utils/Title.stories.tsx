import type { Story } from "@ladle/react";
import { Title, Props } from "./Title";

export const Default: Story<Props> = args => (
  <div style={{ backgroundColor: "black" }}>
    <Title {...args} />
  </div>
);

Default.args = {
  titleKorean: "안녕 세상!",
  titleEng: "Hello World!",
};
