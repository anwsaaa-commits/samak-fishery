import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps, ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type IconName = ComponentProps<typeof MaterialIcons>["name"];

export const palette = {
  navy: "#123047",
  teal: "#0F9D9A",
  tealDark: "#087B7A",
  ink: "#172A38",
  muted: "#71818D",
  paper: "#F7F9FA",
  white: "#FFFFFF",
  line: "#E6ECEF",
  green: "#278B64",
  amber: "#C77725",
  red: "#C65B54",
};

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Pressable onPress={onAction}><Text style={styles.sectionAction}>{action}</Text></Pressable> : null}
    </View>
  );
}

export function IconBadge({ icon, color = palette.teal, background = "#DDF5F1", size = 42 }: { icon: IconName; color?: string; background?: string; size?: number }) {
  return <View style={[styles.iconBadge, { width: size, height: size, borderRadius: size / 3, backgroundColor: background }]}><MaterialIcons name={icon} size={size * 0.52} color={color} /></View>;
}

export function StatCard({ label, value, suffix, icon, color, bg }: { label: string; value: string; suffix: string; icon: IconName; color: string; bg: string }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}><IconBadge icon={icon} color={color} background={bg} size={36} /><Text style={styles.statLabel}>{label}</Text></View>
      <View style={styles.statValueRow}><Text style={styles.statValue}>{value}</Text><Text style={styles.statSuffix}>{suffix}</Text></View>
    </View>
  );
}

export function ActionTile({ icon, title, subtitle, color, onPress }: { icon: IconName; title: string; subtitle: string; color: string; onPress?: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.actionTile, pressed && styles.pressed]}><IconBadge icon={icon} color={color} background={`${color}18`} size={40} /><View style={styles.flex}><Text style={styles.actionTitle}>{title}</Text><Text style={styles.actionSubtitle}>{subtitle}</Text></View><MaterialIcons name="chevron-left" size={21} color={palette.muted} /></Pressable>;
}

export function PageTitle({ eyebrow, title, description, right }: { eyebrow?: string; title: string; description?: string; right?: ReactNode }) {
  return <View style={styles.pageTitle}><View style={styles.flex}>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}<Text style={styles.pageHeading}>{title}</Text>{description ? <Text style={styles.pageDescription}>{description}</Text> : null}</View>{right}</View>;
}

export function EmptyState({ icon, title, description, action }: { icon: IconName; title: string; description: string; action: string }) {
  return <View style={styles.emptyState}><IconBadge icon={icon} size={58} /><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyDescription}>{description}</Text><Pressable style={styles.primaryButton}><MaterialIcons name="add" size={19} color={palette.white} /><Text style={styles.primaryButtonText}>{action}</Text></Pressable></View>;
}

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  pageTitle: { flexDirection: "row-reverse", alignItems: "flex-start", gap: 12, marginBottom: 20 },
  eyebrow: { color: palette.tealDark, fontSize: 13, fontWeight: "700", textAlign: "right", marginBottom: 5 },
  pageHeading: { color: palette.ink, fontSize: 26, fontWeight: "800", textAlign: "right", letterSpacing: -0.4 },
  pageDescription: { color: palette.muted, fontSize: 14, lineHeight: 21, textAlign: "right", marginTop: 5 },
  sectionHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginBottom: 12, marginTop: 22 },
  sectionTitle: { color: palette.ink, fontSize: 17, fontWeight: "800", textAlign: "right" },
  sectionAction: { color: palette.tealDark, fontSize: 13, fontWeight: "700" },
  statCard: { width: 157, minHeight: 112, padding: 14, borderRadius: 18, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, justifyContent: "space-between" },
  statTop: { alignItems: "flex-end", gap: 8 },
  statLabel: { color: palette.muted, fontSize: 12, fontWeight: "600", textAlign: "right" },
  statValueRow: { flexDirection: "row-reverse", alignItems: "baseline", gap: 5, marginTop: 10 },
  statValue: { color: palette.ink, fontSize: 22, fontWeight: "800" },
  statSuffix: { color: palette.muted, fontSize: 11, fontWeight: "600" },
  iconBadge: { alignItems: "center", justifyContent: "center" },
  actionTile: { flexDirection: "row-reverse", alignItems: "center", gap: 12, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, padding: 13, borderRadius: 17, marginBottom: 9 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  actionTitle: { color: palette.ink, fontSize: 14, fontWeight: "800", textAlign: "right" },
  actionSubtitle: { color: palette.muted, fontSize: 12, marginTop: 3, textAlign: "right" },
  emptyState: { alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingVertical: 48, backgroundColor: palette.white, borderRadius: 20, borderWidth: 1, borderColor: palette.line },
  emptyTitle: { color: palette.ink, fontSize: 18, fontWeight: "800", marginTop: 16, textAlign: "center" },
  emptyDescription: { color: palette.muted, fontSize: 13, lineHeight: 20, textAlign: "center", marginTop: 7, maxWidth: 280 },
  primaryButton: { flexDirection: "row-reverse", alignItems: "center", gap: 7, backgroundColor: palette.teal, borderRadius: 13, paddingHorizontal: 18, paddingVertical: 12, marginTop: 20 },
  primaryButtonText: { color: palette.white, fontSize: 13, fontWeight: "800" },
});
