import type { StoryDefault, Story, ArgTypes } from "@ladle/react";
import { Button, Props } from "./Button";
import colorPalette from "../../data/color";
import { HTMLAttributes } from "react";

type ButtonStory = Story<Props>;
type ButtonArgs = ButtonStory["args"];
type ButtonArgTypes = ButtonStory["argTypes"];

const argTypes: ButtonArgTypes = {
  color: {
    options: colorPalette.map(({ string }) => string),
    control: { type: "inline-radio" },
    defaultValue: "red",
  },
};

export const Regular: ButtonStory = args => <Button type="button" {...args} />;
Regular.args = {
  value: "Click Me!",
  onClick: () => alert("Clicked!"),
};
Regular.argTypes = argTypes;

export const Submit: ButtonStory = ({ ...args }) => (
  <form
    method="get"
    onSubmit={e => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      alert(JSON.stringify(data));
    }}
  >
    <div>
      <label htmlFor="name">이름: </label>
      <input type="text" name="name" id="name" defaultValue="asdf" required />
    </div>
    <div>
      <label htmlFor="email">이메일: </label>
      <input
        type="email"
        name="email"
        id="email"
        defaultValue="foo@bar.com"
        required
      />
    </div>
    <Button {...args} type="submit" value="제출" />
  </form>
);
Submit.argTypes = argTypes;
