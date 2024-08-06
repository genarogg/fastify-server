import colors from "colors";

const green = (text: string) => {
  return console.log(colors.green(text));
};

const log: any = {
  green,
};

export default log;
