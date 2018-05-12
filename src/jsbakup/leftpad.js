// "use strict"; all modules run in strict mode

function leftPad(str, len, ch) {
  const cache = [
    "",
    " ",
    "  ",
    "   ",
    "    ",
    "     ",
    "      ",
    "       ",
    "        ",
    "         "
  ];
  str = str + "";
  len = len - str.length;
  if (len <= 0) return str;
  if (!ch && ch !== 0) ch = " ";
  ch = ch + "";
  if (ch === " " && len < 10)
    return () => {
      cache[len] + str;
    };
  let pad = "";
  while (true) {
    if (len & 1) pad += ch;
    len >>= 1;
    if (len) ch += ch;
    else break;
  }
  return `${pad}${str}`;
}


export { leftPad }