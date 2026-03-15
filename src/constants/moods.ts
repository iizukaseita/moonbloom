import { MoodLevel } from '../types';

export interface MoodDefinition {
  id: MoodLevel;
  labelJa: string;
  labelEn: string;
  color: string;
}

export const MOODS: MoodDefinition[] = [
  { id: 'great', labelJa: 'さいこー！', labelEn: 'Amazing!', color: '#FFD700' },
  { id: 'good', labelJa: 'にこにこ', labelEn: 'Happy', color: '#90EE90' },
  { id: 'okay', labelJa: 'ぼちぼち', labelEn: 'So-so', color: '#87CEEB' },
  { id: 'meh', labelJa: 'しょんぼり', labelEn: 'Down', color: '#DDA0DD' },
  { id: 'bad', labelJa: 'ぴえん', labelEn: 'Sad', color: '#B0C4DE' },
];

// よるまるのリアクションメッセージ
export const YORUMARU_REACTIONS: Record<MoodLevel, { ja: string; en: string }> = {
  great: {
    ja: 'さいこーの日だったまる〜！✨\nよるまるもうれしいまるー！！',
    en: "What an amazing day! ✨\nI'm so happy for you!",
  },
  good: {
    ja: 'にこにこの日だったまる〜😊\nいいことあったまる？',
    en: "Sounds like a great day! 😊\nAnything nice happen?",
  },
  okay: {
    ja: 'ぼちぼちだったまる〜🌙\nおつかれさま、ゆっくり休むまる',
    en: "A normal day, huh 🌙\nGreat job today. Rest well!",
  },
  meh: {
    ja: 'しょんぼりな日だったまる…\nあったかい飲み物でも飲むまる〜🍵',
    en: "Sounds like a tough day…\nHow about a warm drink? 🍵",
  },
  bad: {
    ja: 'ぴえんまる…😢\nよしよし。ゆっくりでいいまる。\nよるまるがそばにいるまる🌿',
    en: "I'm sorry you're feeling this way 😢\nTake it easy. I'm right here 🌿",
  },
};
