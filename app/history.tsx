import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { Colors } from '../src/constants/colors';
import { MOODS } from '../src/constants/moods';
import type { MoodEntry, MoodLevel, GardenState } from '../src/types';
import { getMoodEntries, getGardenState } from '../src/stores/moodStore';
import YorumaruMini from '../src/components/YorumaruMini';
import StarField from '../src/components/StarField';

type TabKey = 'week' | 'month' | 'calendar';

const DAY_LABELS = ['月', '火', '水', '木', '金', '土', '日'] as const;

// ── Helper functions ──

function getWeekDates(): { date: string; dayLabel: string }[] {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return { date: `${yyyy}-${mm}-${dd}`, dayLabel: label };
  });
}

function getMonthDates(): string[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates: string[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    dates.push(`${year}-${mm}-${dd}`);
  }
  return dates;
}

function findMoodForDate(
  entries: MoodEntry[],
  date: string,
): MoodEntry | undefined {
  return entries.find((e) => e.date === date);
}

function getMoodDef(mood: MoodLevel) {
  return MOODS.find((m) => m.id === mood);
}

function moodBarHeight(mood: MoodLevel | null): number {
  switch (mood) {
    case 'great':
      return 50;
    case 'good':
      return 40;
    case 'okay':
      return 30;
    case 'meh':
      return 20;
    case 'bad':
      return 10;
    default:
      return 5;
  }
}

function moodColor(mood: MoodLevel | null): string {
  if (!mood) return 'rgba(255,255,255,0.15)';
  return getMoodDef(mood)?.color ?? 'rgba(255,255,255,0.15)';
}

// ── Component ──

export default function HistoryScreen() {
  const [tab, setTab] = useState<TabKey>('week');
  const [weekEntries, setWeekEntries] = useState<MoodEntry[]>([]);
  const [monthEntries, setMonthEntries] = useState<MoodEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [garden, setGarden] = useState<GardenState>({
    flowers: [],
    currentStreak: 0,
    totalEntries: 0,
    longestStreak: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const weekDates = getWeekDates();
        const weekStart = weekDates[0].date;
        const weekEnd = weekDates[6].date;
        const wEntries = await getMoodEntries(weekStart, weekEnd);
        setWeekEntries(wEntries);

        const monthDates = getMonthDates();
        const mStart = monthDates[0];
        const mEnd = monthDates[monthDates.length - 1];
        const mEntries = await getMoodEntries(mStart, mEnd);
        setMonthEntries(mEntries);

        const g = await getGardenState();
        setGarden(g);
      };
      load();
    }, []),
  );

  const weekDates = getWeekDates();
  const monthDates = getMonthDates();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Month view stats
  const moodCounts: Record<MoodLevel, number> = {
    great: 0,
    good: 0,
    okay: 0,
    meh: 0,
    bad: 0,
  };
  for (const entry of monthEntries) {
    moodCounts[entry.mood]++;
  }

  const mostFrequentMood = (
    Object.entries(moodCounts) as [MoodLevel, number][]
  ).reduce(
    (best, [mood, count]) => (count > best.count ? { mood, count } : best),
    { mood: 'okay' as MoodLevel, count: 0 },
  );

  // Calendar view: first day offset (Monday=0)
  const firstDayOfMonth = new Date(currentYear, now.getMonth(), 1).getDay();
  // Convert Sunday=0 to Monday-based offset
  const calendarOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'week', label: 'こんしゅう' },
    { key: 'month', label: 'こんげつ' },
    { key: 'calendar', label: 'カレンダー' },
  ];

  const renderLegend = () => (
    <View style={styles.legend}>
      {MOODS.map((m) => (
        <View key={m.id} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: m.color }]} />
          <Text style={styles.legendLabel}>{m.labelJa}</Text>
        </View>
      ))}
    </View>
  );

  const renderWeekView = () => (
    <View>
      {/* Day rows */}
      {weekDates.map((wd, i) => {
        const entry = findMoodForDate(weekEntries, wd.date);
        const def = entry ? getMoodDef(entry.mood) : null;
        const altBg = i % 2 === 1;
        return (
          <View
            key={wd.date}
            style={[styles.weekRow, altBg && styles.weekRowAlt]}
          >
            <Text style={styles.weekDayLabel}>{wd.dayLabel}</Text>
            {entry && def ? (
              <>
                <YorumaruMini expression={entry.mood} size={30} />
                <Text style={[styles.weekMoodLabel, { color: def.color }]}>
                  {def.labelJa}
                </Text>
                {entry.memo ? (
                  <Text style={styles.weekMemo} numberOfLines={1}>
                    {entry.memo}
                  </Text>
                ) : null}
              </>
            ) : (
              <Text style={styles.weekNoEntry}>{'— きろくなし'}</Text>
            )}
          </View>
        );
      })}

      {/* Bar chart */}
      <Text style={styles.sectionTitle}>{'📊 こんしゅうのまとめ'}</Text>
      <View style={styles.barChartContainer}>
        {weekDates.map((wd) => {
          const entry = findMoodForDate(weekEntries, wd.date);
          const mood = entry ? entry.mood : null;
          const h = moodBarHeight(mood);
          const c = moodColor(mood);
          return (
            <View key={wd.date} style={styles.barColumn}>
              <View style={styles.barSpace}>
                <View
                  style={[styles.bar, { height: h, backgroundColor: c }]}
                />
              </View>
              <Text style={styles.barDayLabel}>{wd.dayLabel}</Text>
            </View>
          );
        })}
      </View>

      {renderLegend()}
    </View>
  );

  const renderMonthView = () => (
    <View>
      <Text style={styles.sectionTitle}>{`${currentMonth}月のきぶん`}</Text>

      {/* Mood count cards */}
      <View style={styles.moodCardsRow}>
        {MOODS.map((m) => (
          <View key={m.id} style={styles.moodCard}>
            <YorumaruMini expression={m.id} size={28} />
            <Text style={[styles.moodCardCount, { color: m.color }]}>
              {moodCounts[m.id]}
            </Text>
            <Text style={styles.moodCardLabel}>{m.labelJa}</Text>
          </View>
        ))}
      </View>

      {/* Streak */}
      <View style={styles.streakCard}>
        <Text style={styles.streakText}>
          {`🌟 さいちょうれんぞく: ${garden.longestStreak}日`}
        </Text>
        {garden.currentStreak > 0 && (
          <Text style={styles.streakSub}>{'いまもけいぞくちゅうまる！'}</Text>
        )}
      </View>

      {/* Most frequent mood */}
      {mostFrequentMood.count > 0 && (
        <View style={styles.mostFrequentCard}>
          <Text style={styles.mostFrequentTitle}>
            {'いちばんおおかった気分'}
          </Text>
          <View style={styles.mostFrequentRow}>
            <YorumaruMini expression={mostFrequentMood.mood} size={36} />
            <Text
              style={[
                styles.mostFrequentLabel,
                { color: getMoodDef(mostFrequentMood.mood)?.color },
              ]}
            >
              {getMoodDef(mostFrequentMood.mood)?.labelJa}
            </Text>
            <Text style={styles.mostFrequentCount}>
              {`${mostFrequentMood.count}回`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderCalendarView = () => {
    const totalCells = calendarOffset + monthDates.length;
    const rows = Math.ceil(totalCells / 7);
    const cells: (string | null)[] = [];

    for (let i = 0; i < calendarOffset; i++) {
      cells.push(null);
    }
    for (const d of monthDates) {
      cells.push(d);
    }
    // Pad to fill last row
    while (cells.length < rows * 7) {
      cells.push(null);
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>
          {`${currentMonth}月 ${currentYear}`}
        </Text>

        {/* Day headers */}
        <View style={styles.calendarHeaderRow}>
          {DAY_LABELS.map((label) => (
            <View key={label} style={styles.calendarHeaderCell}>
              <Text style={styles.calendarHeaderText}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Grid */}
        {Array.from({ length: rows }, (_, rowIdx) => (
          <View key={rowIdx} style={styles.calendarRow}>
            {cells
              .slice(rowIdx * 7, rowIdx * 7 + 7)
              .map((dateStr, colIdx) => {
                if (!dateStr) {
                  return (
                    <View
                      key={`empty-${rowIdx}-${colIdx}`}
                      style={styles.calendarCell}
                    >
                      <View style={styles.calendarCellEmpty} />
                    </View>
                  );
                }
                const entry = findMoodForDate(monthEntries, dateStr);
                const dayNum = parseInt(dateStr.split('-')[2], 10);
                const bgColor = entry
                  ? moodColor(entry.mood)
                  : 'rgba(255,255,255,0.04)';
                const cellContent = (
                  <View
                    style={[
                      styles.calendarCellFilled,
                      {
                        backgroundColor: bgColor,
                        opacity: entry ? 0.75 : 1,
                      },
                    ]}
                  >
                    <Text style={styles.calendarDayNum}>{dayNum}</Text>
                  </View>
                );
                return entry ? (
                  <TouchableOpacity
                    key={dateStr}
                    style={styles.calendarCell}
                    onPress={() => {
                      setSelectedEntry(entry);
                      setSelectedDate(dateStr);
                    }}
                    activeOpacity={0.7}
                  >
                    {cellContent}
                  </TouchableOpacity>
                ) : (
                  <View key={dateStr} style={styles.calendarCell}>
                    {cellContent}
                  </View>
                );
              })}
          </View>
        ))}

        {renderLegend()}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.bgTop, Colors.bgBottom]}
      style={styles.gradient}
    >
      <StarField />
      <SafeAreaView style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>{'📋 きろく'}</Text>

          {/* Tab switcher */}
          <View style={styles.tabContainer}>
            {tabs.map((t) => {
              const selected = tab === t.key;
              return (
                <Text
                  key={t.key}
                  style={[
                    styles.tabButton,
                    selected && styles.tabButtonSelected,
                  ]}
                  onPress={() => setTab(t.key)}
                >
                  {t.label}
                </Text>
              );
            })}
          </View>

          {/* Tab content */}
          <View style={styles.content}>
            {tab === 'week' && renderWeekView()}
            {tab === 'month' && renderMonthView()}
            {tab === 'calendar' && renderCalendarView()}
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* Entry detail modal */}
      <Modal
        visible={selectedEntry !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedEntry(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedEntry(null)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedEntry(null)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            {selectedEntry && selectedDate && (() => {
              const def = getMoodDef(selectedEntry.mood);
              const parts = selectedDate.split('-');
              const dateLabel = `${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
              return (
                <>
                  <Text style={styles.modalDate}>{dateLabel}</Text>
                  <YorumaruMini expression={selectedEntry.mood} size={64} />
                  {def && (
                    <Text
                      style={[styles.modalMoodLabel, { color: def.color }]}
                    >
                      {def.labelJa}
                    </Text>
                  )}
                  {selectedEntry.memo ? (
                    <Text style={styles.modalMemo}>
                      📝 {selectedEntry.memo}
                    </Text>
                  ) : null}
                </>
              );
            })()}
          </Pressable>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
}

// ── Styles ──

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 14,
  },

  // Tab switcher
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 3,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: 18,
  },
  tabButton: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabButtonSelected: {
    backgroundColor: Colors.accent,
    color: '#1a1a2e',
  },

  content: {
    flex: 1,
  },

  // ── Week View ──
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    gap: 8,
  },
  weekRowAlt: {
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  weekDayLabel: {
    width: 22,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  weekMoodLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  weekMemo: {
    flex: 1,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  weekNoEntry: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },

  // Bar chart
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 70,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barSpace: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 18,
    borderRadius: 6,
  },
  barDayLabel: {
    fontSize: 8,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  // Legend
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },

  // ── Month View ──
  moodCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moodCard: {
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
    flex: 1,
    marginHorizontal: 2,
  },
  moodCardCount: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  moodCardLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  streakCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  streakSub: {
    fontSize: 11,
    color: Colors.accent,
    marginTop: 4,
  },
  mostFrequentCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  mostFrequentTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  mostFrequentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mostFrequentLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  mostFrequentCount: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // ── Calendar View ──
  calendarHeaderRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  calendarHeaderCell: {
    flex: 1,
    alignItems: 'center',
  },
  calendarHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  calendarRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  calendarCell: {
    flex: 1,
    aspectRatio: 1,
    padding: 2,
  },
  calendarCellEmpty: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  calendarCellFilled: {
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayNum: {
    fontSize: 8,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // ── Entry Detail Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a3e',
    borderRadius: 20,
    padding: 28,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  modalCloseText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  modalDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  modalMoodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  },
  modalMemo: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});
