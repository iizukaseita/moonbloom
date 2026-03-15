// 気分の5段階
export type MoodLevel = 'great' | 'good' | 'okay' | 'meh' | 'bad';

// よるまるの表情
export type YorumaruExpression = MoodLevel | 'sleepy' | 'wave' | 'love';

// 気分エントリー（1日分の記録）
export interface MoodEntry {
  id: string; // UUID
  date: string; // YYYY-MM-DD
  mood: MoodLevel;
  memo?: string; // 1行メモ（最大60文字）
  createdAt: string; // ISO 8601
}

// 花の状態
export type FlowerStage = 'seed' | 'sprout' | 'bud' | 'bloom';

export interface Flower {
  id: string;
  type: FlowerType;
  stage: FlowerStage;
  plantedAt: string; // ISO 8601
  bloomedAt?: string;
  daysWatered: number; // 記録した日数（=水やり回数）
}

// 花の種類（v1は3種、Proで追加）
export type FlowerType = 'moonflower' | 'starbell' | 'nightrose';

// 庭の状態
export interface GardenState {
  flowers: Flower[];
  currentStreak: number; // 連続記録日数
  totalEntries: number; // 総記録数
  longestStreak: number; // 最長連続記録
}

// アプリの設定
export interface AppSettings {
  notificationTime: string; // HH:mm format (default: "21:00")
  notificationEnabled: boolean;
  language: 'ja' | 'en';
  isPro: boolean;
}
