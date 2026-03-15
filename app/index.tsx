import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '../src/constants/colors';
import { MOODS, YORUMARU_REACTIONS } from '../src/constants/moods';
import type {
  MoodLevel,
  YorumaruExpression,
  MoodEntry,
  GardenState,
  FlowerStage,
} from '../src/types';
import {
  saveMoodEntry,
  getTodayEntry,
  getGardenState,
  updateGardenState,
} from '../src/stores/moodStore';
import { waterGarden } from '../src/utils/gardenLogic';
import YorumaruBig from '../src/components/YorumaruBig';
import YorumaruMini from '../src/components/YorumaruMini';
import FlowerAnimated from '../src/components/FlowerAnimated';
import StarField from '../src/components/StarField';
import Sparkle from '../src/components/Sparkle';

const ONBOARDING_KEY = '@moonbloom/onboarded';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Phase =
  | 'loading'
  | 'onboarding'
  | 'splash'
  | 'select'
  | 'memo'
  | 'reaction'
  | 'done';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const { t } = useTranslation();

  const [phase, setPhase] = useState<Phase>('loading');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [memo, setMemo] = useState('');
  const [gardenState, setGardenState] = useState<GardenState | null>(null);
  const [todayEntry, setTodayEntry] = useState<MoodEntry | null>(null);
  const [showFlowerAnimation, setShowFlowerAnimation] = useState(false);

  // Initialize: check onboarding + today's entry
  useEffect(() => {
    (async () => {
      try {
        const onboarded = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (!onboarded) {
          setPhase('onboarding');
          return;
        }

        const entry = await getTodayEntry();
        if (entry) {
          setTodayEntry(entry);
          const garden = await getGardenState();
          setGardenState(garden);
          setPhase('done');
          return;
        }

        const garden = await getGardenState();
        setGardenState(garden);
        setPhase('splash');
      } catch {
        setPhase('splash');
      }
    })();
  }, []);

  // --- Handlers ---

  const handleOnboardingNext = useCallback(async () => {
    if (onboardingStep < 2) {
      setOnboardingStep((s) => s + 1);
    } else {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      const garden = await getGardenState();
      setGardenState(garden);
      setPhase('splash');
    }
  }, [onboardingStep]);

  const handleMoodSelect = useCallback(async (mood: MoodLevel) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedMood(mood);
    setPhase('memo');
  }, []);

  const handleRecord = useCallback(async () => {
    if (!selectedMood) return;

    const now = new Date();
    const entry: MoodEntry = {
      id: generateId(),
      date: now.toISOString().split('T')[0],
      mood: selectedMood,
      memo: memo.trim() || undefined,
      createdAt: now.toISOString(),
    };

    await saveMoodEntry(entry);

    const currentGarden = await getGardenState();
    const updatedGarden = waterGarden(currentGarden);
    await updateGardenState(updatedGarden);
    setGardenState(updatedGarden);

    setPhase('reaction');
  }, [selectedMood, memo]);

  const handleGoodnightPress = useCallback(() => {
    setShowFlowerAnimation(true);
    setTimeout(() => {
      router.navigate('/garden');
    }, 2000);
  }, [router]);

  // --- Render helpers ---

  const renderLoading = (): React.JSX.Element => (
    <View style={styles.centered}>
      <ActivityIndicator color={Colors.accent} size="large" />
    </View>
  );

  const renderDotIndicators = (): React.JSX.Element => (
    <View style={styles.dotRow}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor:
                i === onboardingStep
                  ? Colors.accent
                  : 'rgba(255,255,255,0.15)',
            },
          ]}
        />
      ))}
    </View>
  );

  const renderOnboardingButton = (): React.JSX.Element => (
    <TouchableOpacity
      style={styles.onboardingButton}
      onPress={handleOnboardingNext}
    >
      <Text style={styles.onboardingButtonText}>
        {onboardingStep < 2 ? 'つぎへ →' : 'はじめる！ 🌙'}
      </Text>
    </TouchableOpacity>
  );

  const renderOnboarding = (): React.JSX.Element => {
    if (onboardingStep === 0) {
      return (
        <View style={styles.centered}>
          <YorumaruBig expression="good" size={140} />
          <Text style={styles.onboardingTitle}>はじめまして！</Text>
          <Text style={styles.onboardingBody}>
            ぼく、<Text style={styles.accentBold}>よるまる</Text>まる🌙
          </Text>
          <Text style={styles.onboardingBody}>
            まいにちの気分をいっしょに きろくするまる！
          </Text>
          <View style={styles.onboardingBottom}>
            {renderDotIndicators()}
            {renderOnboardingButton()}
          </View>
        </View>
      );
    }

    if (onboardingStep === 1) {
      const stages: FlowerStage[] = ['seed', 'sprout', 'bud', 'bloom'];
      return (
        <View style={styles.centered}>
          <View style={styles.flowerRow}>
            {stages.map((stage) => (
              <FlowerAnimated key={stage} stage={stage} size={52} />
            ))}
          </View>
          <Text style={styles.onboardingSubtitle}>
            きろくするとおはなが育つまる🌸
          </Text>
          <Text style={styles.onboardingBody}>
            まいにちの気分をえらぶだけ。{'\n'}いい日もわるい日も、
            <Text style={{ color: '#FFB4C8' }}>ぜんぶお花になるまる！</Text>
          </Text>
          <View style={styles.onboardingBottom}>
            {renderDotIndicators()}
            {renderOnboardingButton()}
          </View>
        </View>
      );
    }

    // Step 2
    return (
      <View style={styles.centered}>
        <YorumaruBig expression="sleepy" size={120} />
        <Text style={styles.onboardingSubtitle}>
          よるになったら会いにくるまる🌙
        </Text>
        <View style={styles.timeCard}>
          <Text style={styles.timeText}>🕘 21:00</Text>
        </View>
        <Text style={[styles.onboardingCaption, { marginTop: 8 }]}>
          あとから変えられるまる
        </Text>
        <View style={styles.onboardingBottom}>
          {renderDotIndicators()}
          {renderOnboardingButton()}
        </View>
      </View>
    );
  };

  const renderSplash = (): React.JSX.Element => (
    <Pressable style={styles.centered} onPress={() => setPhase('select')}>
      <Sparkle x="15%" y="18%" size={10} color={Colors.accent} />
      <Sparkle x="80%" y="12%" size={8} />
      <Sparkle x="70%" y="75%" size={6} color="#FFD700" />

      <YorumaruBig expression="good" size={170} />

      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>今日はどんな一日だった〜まる？</Text>
      </View>

      <Text style={styles.tapHint}>タップしてつづける</Text>
    </Pressable>
  );

  const renderSelect = (): React.JSX.Element => {
    const topMoods = MOODS.slice(0, 3);
    const bottomMoods = MOODS.slice(3, 5);

    return (
      <View style={styles.centered}>
        <Text style={styles.selectTitle}>今日の気分をえらんでね</Text>

        <View style={styles.moodTopRow}>
          {topMoods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[styles.moodButton, { flex: 1 }]}
              onPress={() => handleMoodSelect(mood.id)}
            >
              <YorumaruMini expression={mood.id} size={56} />
              <Text style={[styles.moodLabel, { color: mood.color }]}>
                {mood.labelJa}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.moodBottomRow}>
          {bottomMoods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[styles.moodButton, { flex: 1 }]}
              onPress={() => handleMoodSelect(mood.id)}
            >
              <YorumaruMini expression={mood.id} size={56} />
              <Text style={[styles.moodLabel, { color: mood.color }]}>
                {mood.labelJa}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {gardenState && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>
              {gardenState.currentStreak}日 れんぞく 🌟
            </Text>
            <Text style={styles.streakText}>
              {gardenState.totalEntries}回 きろく 📝
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderMemo = (): React.JSX.Element => {
    const moodDef = MOODS.find((m) => m.id === selectedMood);
    return (
      <View style={styles.centered}>
        <YorumaruMini
          expression={selectedMood as YorumaruExpression}
          size={72}
        />
        {moodDef && (
          <Text style={[styles.moodSelectedLabel, { color: moodDef.color }]}>
            {moodDef.labelJa}
          </Text>
        )}

        <Text style={styles.memoPrompt}>
          📝 ひとことメモ（かかなくてもOK）
        </Text>

        <TextInput
          style={styles.memoInput}
          placeholder="今日あったことをひとことで..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          maxLength={60}
          value={memo}
          onChangeText={setMemo}
        />
        <Text style={styles.charCount}>{memo.length}/60</Text>

        <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
          <Text style={styles.recordButtonText}>きろくする 🌙</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRecord}>
          <Text style={styles.skipText}>スキップ</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReaction = (): React.JSX.Element => {
    const reaction = selectedMood
      ? YORUMARU_REACTIONS[selectedMood]
      : null;

    return (
      <View style={styles.centered}>
        <Sparkle x="10%" y="15%" size={10} color={Colors.accent} />
        <Sparkle x="85%" y="20%" size={8} />

        <YorumaruBig
          expression={selectedMood as YorumaruExpression}
          size={160}
        />

        {reaction && (
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{reaction.ja}</Text>
          </View>
        )}

        {memo.trim() ? (
          <Text style={styles.memoDisplay}>📝 {memo.trim()}</Text>
        ) : null}

        {!showFlowerAnimation ? (
          <TouchableOpacity
            style={styles.goodnightButton}
            onPress={handleGoodnightPress}
          >
            <Text style={styles.goodnightButtonText}>おやすみまる 🌙</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.flowerAnimationContainer}>
            <FlowerAnimated
              stage="sprout"
              type="moonflower"
              size={64}
              animating
            />
            <Text style={styles.flowerGrowText}>
              おはなが育ったまる…！ 🌱
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderDone = (): React.JSX.Element => {
    const moodDef = todayEntry ? MOODS.find((m) => m.id === todayEntry.mood) : null;
    const flowers = gardenState?.flowers ?? [];
    const previewFlowers = flowers.slice(-4);

    return (
      <View style={styles.centered}>
        <YorumaruBig
          expression={todayEntry?.mood ?? 'good'}
          size={120}
        />
        <Text style={styles.doneText}>今日はもうきろくしたまる〜🌙</Text>

        {/* Today's mood */}
        {todayEntry && moodDef && (
          <View style={styles.doneMoodCard}>
            <YorumaruMini expression={todayEntry.mood} size={40} />
            <Text style={[styles.doneMoodLabel, { color: moodDef.color }]}>
              {moodDef.labelJa}
            </Text>
          </View>
        )}

        {/* Memo */}
        {todayEntry?.memo ? (
          <Text style={styles.doneMemo}>📝 {todayEntry.memo}</Text>
        ) : null}

        {/* Streak */}
        {gardenState && (
          <View style={styles.doneStreakRow}>
            <Text style={styles.doneStreakText}>
              {gardenState.currentStreak}日 れんぞく 🌟
            </Text>
            <Text style={styles.doneStreakText}>
              {gardenState.totalEntries}回 きろく 📝
            </Text>
          </View>
        )}

        {/* Garden mini preview */}
        {previewFlowers.length > 0 && (
          <View style={styles.doneGardenPreview}>
            {previewFlowers.map((f) => (
              <FlowerAnimated
                key={f.id}
                stage={f.stage}
                type={f.type}
                size={36}
                animating={f.stage === 'bloom'}
              />
            ))}
          </View>
        )}

        {/* Go to garden */}
        <TouchableOpacity
          style={styles.doneGardenButton}
          onPress={() => router.navigate('/garden')}
        >
          <Text style={styles.doneGardenButtonText}>
            にわを見にいく 🌸
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPhase = (): React.JSX.Element => {
    switch (phase) {
      case 'loading':
        return renderLoading();
      case 'onboarding':
        return renderOnboarding();
      case 'splash':
        return renderSplash();
      case 'select':
        return renderSelect();
      case 'memo':
        return renderMemo();
      case 'reaction':
        return renderReaction();
      case 'done':
        return renderDone();
    }
  };

  return (
    <LinearGradient
      colors={[Colors.bgTop, Colors.bgBottom]}
      style={styles.container}
    >
      <StarField />
      {renderPhase()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // --- Onboarding ---
  onboardingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  onboardingSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  onboardingBody: {
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  onboardingCaption: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  accentBold: {
    color: Colors.accent,
    fontWeight: 'bold',
  },
  flowerRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  timeCard: {
    backgroundColor: Colors.cardBg,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 12,
  },
  timeText: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  onboardingBottom: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onboardingButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 24,
  },
  onboardingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- Splash ---
  speechBubble: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 22,
    marginTop: 20,
    maxWidth: SCREEN_WIDTH * 0.8,
  },
  speechText: {
    fontSize: 15,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
  },
  tapHint: {
    fontSize: 12,
    color: Colors.textPrimary,
    opacity: 0.5,
    letterSpacing: 2,
    marginTop: 24,
  },

  // --- Select ---
  selectTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  moodTopRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginBottom: 8,
  },
  moodBottomRow: {
    flexDirection: 'row',
    gap: 8,
    width: '70%',
  },
  moodButton: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  streakContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  streakText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // --- Memo ---
  moodSelectedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 20,
  },
  memoPrompt: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  memoInput: {
    width: '100%',
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  charCount: {
    fontSize: 11,
    color: Colors.textSecondary,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  // --- Reaction ---
  memoDisplay: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 12,
  },
  goodnightButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 24,
    marginTop: 28,
  },
  goodnightButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flowerAnimationContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  flowerGrowText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 12,
  },

  // --- Done ---
  doneText: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  doneMoodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  doneMoodLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  doneMemo: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  doneStreakRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  doneStreakText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  doneGardenPreview: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  doneGardenButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 24,
  },
  doneGardenButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
