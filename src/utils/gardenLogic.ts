import type { GardenState, Flower, FlowerStage, FlowerType } from '../types';

const FLOWER_TYPES: FlowerType[] = ['moonflower', 'starbell', 'nightrose'];

// v1: 1回記録するごとに1段階進む
// seed → sprout → bud → bloom
const STAGE_ORDER: FlowerStage[] = ['seed', 'sprout', 'bud', 'bloom'];

// 記録時に庭を更新
export function waterGarden(gardenState: GardenState): GardenState {
  const updated = { ...gardenState };
  updated.currentStreak += 1;
  updated.totalEntries += 1;
  if (updated.currentStreak > updated.longestStreak) {
    updated.longestStreak = updated.currentStreak;
  }

  // 現在育て中の花（bloomしていない最初の花）を探す
  const growingIndex = updated.flowers.findIndex((f) => f.stage !== 'bloom');

  if (growingIndex >= 0) {
    // 育て中の花を1段階進める
    const flower = { ...updated.flowers[growingIndex] };
    flower.daysWatered += 1;
    const currentIdx = STAGE_ORDER.indexOf(flower.stage);
    if (currentIdx < STAGE_ORDER.length - 1) {
      flower.stage = STAGE_ORDER[currentIdx + 1];
      if (flower.stage === 'bloom') {
        flower.bloomedAt = new Date().toISOString();
      }
    }
    updated.flowers = [...updated.flowers];
    updated.flowers[growingIndex] = flower;
  } else {
    // 全ての花がbloom or 花がない → 新しい花をseedで追加
    const newFlower = createNewFlower(updated);
    if (newFlower) {
      updated.flowers = [...updated.flowers, newFlower];
    }
  }

  return updated;
}

// 0〜1の成長率を返す
export function getFlowerProgress(flower: Flower): number {
  return STAGE_ORDER.indexOf(flower.stage) / (STAGE_ORDER.length - 1);
}

// 新しい花を作成
function createNewFlower(gardenState: GardenState): Flower | null {
  // 利用可能な花の種類を決定（30日連続で新種解放）
  const availableTypes = FLOWER_TYPES.slice(
    0,
    Math.min(
      1 + Math.floor(gardenState.longestStreak / 30),
      FLOWER_TYPES.length,
    ),
  );
  const flowerType =
    availableTypes[Math.floor(Math.random() * availableTypes.length)];

  return {
    id: generateId(),
    type: flowerType,
    stage: 'seed',
    plantedAt: new Date().toISOString(),
    daysWatered: 0,
  };
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
