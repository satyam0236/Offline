import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radius, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  delivered: boolean;
}

// Local in-memory placeholder — this will be replaced by messages
// coming through the encrypted BLE channel once it's wired in.
const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hey, you nearby?', fromMe: false, time: '10:02', delivered: true },
  { id: '2', text: 'Yeah just connected', fromMe: true, time: '10:02', delivered: true },
];

export default function ChatScreen() {
  const { goBack, params } = useNavigation();
  const nickname = (params?.nickname as string) ?? 'Unknown';
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: draft.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      delivered: false,
    };
    setMessages(prev => [msg, ...prev]);
    setDraft('');
  };

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="back" />
        </TouchableOpacity>
        <Avatar nickname={nickname} online size={36} />
        <View style={styles.headerText}>
          <Text style={typography.body}>{nickname}</Text>
          <Text style={[typography.caption, { color: colors.accentBLE }]}>
            Bluetooth • Encrypted
          </Text>
        </View>
        <Icon name="info" color={colors.textSecondary} />
      </View>

      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="lock" size={28} color={colors.textSecondary} />
          <Text style={[typography.caption, styles.emptyText]}>
            Encrypted. Never stored on any server.
          </Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          inverted
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.fromMe ? styles.bubbleMine : styles.bubbleTheirs,
              ]}
            >
              <Text style={item.fromMe ? styles.bubbleTextMine : styles.bubbleTextTheirs}>
                {item.text}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.time}>{item.time}</Text>
                {item.fromMe && (
                  <Text style={[styles.tick, item.delivered && { color: colors.accentBLE }]}>
                    {item.delivered ? '✓✓' : '✓'}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputBar}>
          <TouchableOpacity>
            <Icon name="attach" color={colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Send encrypted message..."
            placeholderTextColor={colors.textSecondary}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <TouchableOpacity onPress={send}>
            <Icon name="send" color={colors.accentBLE} size={22} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  list: {
    padding: spacing.md,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginVertical: spacing.xs / 2,
  },
  bubbleMine: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accentBLE,
  },
  bubbleTheirs: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceElevated,
  },
  bubbleTextMine: {
    color: colors.background,
    fontFamily: typography.body.fontFamily,
  },
  bubbleTextTheirs: {
    color: colors.textPrimary,
    fontFamily: typography.body.fontFamily,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  time: {
    fontSize: 10,
    color: colors.textSecondary,
    marginRight: 4,
  },
  tick: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    marginHorizontal: spacing.sm,
    maxHeight: 100,
    fontFamily: typography.body.fontFamily,
  },
});
