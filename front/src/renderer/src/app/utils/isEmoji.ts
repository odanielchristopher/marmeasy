export function isEmoji(value: string) {
  const singleEmojiRegex = /^(\p{Extended_Pictographic}(\u200D\p{Extended_Pictographic})*|\p{Emoji}\uFE0F)$/u;
  return singleEmojiRegex.test(value);
}
