import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';

import { Colors } from '../src/constants/colors';
import type { GardenState, Flower, FlowerStage } from '../src/types';
import { getGardenState } from '../src/stores/moodStore';
import YorumaruBig from '../src/components/YorumaruBig';
import FlowerAnimated from '../src/components/FlowerAnimated';
import StarField from '../src/components/StarField';

const MAX_SLOTS = 8;

function getStageLabel(stage: FlowerStage): string {
  switch (stage) {
    case 'bloom':
      return 'まんかい \u{1F338}';
    case 'bud':
      return 'つぼみ \u{1F331}';
    case 'sprout':
      return 'ふたば \u{1F33F}';
    case 'seed':
      return 'たね \u30FB';
  }
}

export default function GardenScreen(): React.JSX.Element {
  const [garden, setGarden] = useState<GardenState>({
    flowers: [],
    currentStreak: 0,
    totalEntries: 0,
    longestStreak: 0,
  });

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const load = async (): Promise<void> => {
        const state = await getGardenState();
        if (!cancelled) {
          setGarden(state);
        }
      };

      void load();

      return () => {
        cancelled = true;
      };
    }, []),
  );

  const flowers = garden.flowers;
  const emptySlots = Math.max(0, MAX_SLOTS - flowers.length);

  return (
    <LinearGradient
      colors={[Colors.bgTop, Colors.bgBottom]}
      style={styles.gradient}
    >
      <StarField />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>
            {'\u{1F338}'} よるまるの庭
          </Text>

          {/* Streak stats */}
          <View style={styles.statsRow}>
            <Text style={styles.statText}>
              {'\u{1F31F}'} {garden.currentStreak}日れんぞく
            </Text>
            <Text style={styles.statText}>
              {'\u{1F4DD}'} {garden.totalEntries}回きろく
            </Text>
          </View>

          {/* Flower grid container */}
          <View style={styles.gardenContainer}>
            {/* Ground gradient */}
            <LinearGradient
              colors={['transparent', 'rgba(107,142,90,0.08)']}
              style={styles.ground}
            />

            {/* Flower grid */}
            <View style={styles.flowerGrid}>
              {flowers.map((flower: Flower) => (
                <View key={flower.id} style={styles.flowerCell}>
                  <FlowerAnimated
                    stage={flower.stage}
                    type={flower.type}
                    size={44}
                    animating={flower.stage === 'bloom'}
                  />
                  <Text style={styles.stageLabel}>
                    {getStageLabel(flower.stage)}
                  </Text>
                </View>
              ))}

              {Array.from({ length: emptySlots }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.emptyCell}>
                  <Text style={styles.emptyText}>?</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom character */}
          <View style={styles.bottomSection}>
            <YorumaruBig expression="good" size={72} />
            <Text style={styles.encourageText}>
              きろくを続けるとお花が咲くまる〜{'\u{1F338}'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  gardenContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  flowerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  flowerCell: {
    width: 62,
    height: 78,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  emptyCell: {
    width: 62,
    height: 78,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.15)',
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 28,
    gap: 12,
  },
  encourageText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
