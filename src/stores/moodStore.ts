import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MoodEntry, GardenState, AppSettings, Flower, FlowerStage } from '../types';

const KEYS = {
  entries: '@moonbloom/entries',
  garden: '@moonbloom/garden',
  settings: '@moonbloom/settings',
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  notificationTime: '21:00',
  notificationEnabled: true,
  language: 'ja',
  isPro: false,
};

const DEFAULT_GARDEN: GardenState = {
  flowers: [],
  currentStreak: 0,
  totalEntries: 0,
  longestStreak: 0,
};

// 気分エントリーを保存
export async function saveMoodEntry(entry: MoodEntry): Promise<void> {
  const entries = await getAllEntries();
  // 同じ日のエントリーがあれば上書き
  const index = entries.findIndex((e) => e.date === entry.date);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }
  await AsyncStorage.setItem(KEYS.entries, JSON.stringify(entries));
}

// 期間指定でエントリーを取得
export async function getMoodEntries(
  startDate: string,
  endDate: string,
): Promise<MoodEntry[]> {
  const entries = await getAllEntries();
  return entries.filter((e) => e.date >= startDate && e.date <= endDate);
}

// 今日のエントリーを取得
export async function getTodayEntry(): Promise<MoodEntry | null> {
  const today = new Date().toISOString().split('T')[0];
  const entries = await getAllEntries();
  return entries.find((e) => e.date === today) ?? null;
}

// 庭の状態を取得（旧データの自動修復付き）
export async function getGardenState(): Promise<GardenState> {
  const raw = await AsyncStorage.getItem(KEYS.garden);
  if (!raw) return DEFAULT_GARDEN;
  const state = JSON.parse(raw) as GardenState;

  // マイグレーション: 記録はあるのに花がない場合、花を再生成
  if (state.totalEntries > 0 && state.flowers.length === 0) {
    const STAGE_ORDER: FlowerStage[] = ['seed', 'sprout', 'bud', 'bloom'];
    const flowers: Flower[] = [];
    let remaining = state.totalEntries;

    while (remaining > 0) {
      const growing = flowers.find((f) => f.stage !== 'bloom');
      if (growing) {
        const idx = STAGE_ORDER.indexOf(growing.stage);
        if (idx < STAGE_ORDER.length - 1) {
          growing.stage = STAGE_ORDER[idx + 1];
          if (growing.stage === 'bloom') {
            growing.bloomedAt = new Date().toISOString();
          }
        }
        growing.daysWatered += 1;
      } else {
        flowers.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type: 'moonflower',
          stage: 'seed',
          plantedAt: new Date().toISOString(),
          daysWatered: 0,
        });
      }
      remaining--;
    }

    state.flowers = flowers;
    await AsyncStorage.setItem(KEYS.garden, JSON.stringify(state));
  }

  return state;
}

// 庭の状態を更新
export async function updateGardenState(state: GardenState): Promise<void> {
  await AsyncStorage.setItem(KEYS.garden, JSON.stringify(state));
}

// 設定を取得
export async function getSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem(KEYS.settings);
  if (!raw) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AppSettings>) };
}

// 設定を更新
export async function updateSettings(
  settings: Partial<AppSettings>,
): Promise<void> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await AsyncStorage.setItem(KEYS.settings, JSON.stringify(updated));
}

// 内部ヘルパー: 全エントリーを取得
async function getAllEntries(): Promise<MoodEntry[]> {
  const raw = await AsyncStorage.getItem(KEYS.entries);
  if (!raw) return [];
  return JSON.parse(raw) as MoodEntry[];
}
