import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, MessageCircle, Image, Mic, Edit, Trash2 } from 'lucide-react-native';
import { useGlitchCore } from '@/hooks/useGlitchCore';

interface Message {
  id: string;
  type: 'message' | 'image' | 'voice' | 'edit' | 'delete';
  content: string;
  author: string;
  channel: string;
  server: string;
  timestamp: string;
}

export default function FeedScreen() {
  const { isGlitchActive } = useGlitchCore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({
    totalMessages: 0,
    images: 0,
    voice: 0,
    edits: 0,
    deletes: 0,
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        type: 'message',
        content: 'Anyone up for some late night coding?',
        author: 'CyberDev',
        channel: 'general',
        server: 'Tech Hub',
        timestamp: '2025-01-07T23:45:00Z',
      },
      {
        id: '2',
        type: 'image',
        content: 'Screenshot of my latest project',
        author: 'CodeMaster',
        channel: 'showcase',
        server: 'Tech Hub',
        timestamp: '2025-01-07T23:42:00Z',
      },
      {
        id: '3',
        type: 'voice',
        content: 'Voice message about the new API',
        author: 'API_Guru',
        channel: 'development',
        server: 'Tech Hub',
        timestamp: '2025-01-07T23:40:00Z',
      },
      {
        id: '4',
        type: 'edit',
        content: 'Updated: Fixed the bug in the authentication system',
        author: 'BugHunter',
        channel: 'bugs',
        server: 'Tech Hub',
        timestamp: '2025-01-07T23:38:00Z',
      },
      {
        id: '5',
        type: 'delete',
        content: 'Message deleted by user',
        author: 'Anonymous',
        channel: 'general',
        server: 'Tech Hub',
        timestamp: '2025-01-07T23:35:00Z',
      },
    ];

    setMessages(mockMessages);
    setStats({
      totalMessages: mockMessages.length,
      images: mockMessages.filter(m => m.type === 'image').length,
      voice: mockMessages.filter(m => m.type === 'voice').length,
      edits: mockMessages.filter(m => m.type === 'edit').length,
      deletes: mockMessages.filter(m => m.type === 'delete').length,
    });
  }, []);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={16} color="#00FFF7" />;
      case 'voice':
        return <Mic size={16} color="#FF2EC0" />;
      case 'edit':
        return <Edit size={16} color="#FFD700" />;
      case 'delete':
        return <Trash2 size={16} color="#FF4444" />;
      default:
        return <MessageCircle size={16} color="#FFFFFF" />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'image':
        return '#00FFF7';
      case 'voice':
        return '#FF2EC0';
      case 'edit':
        return '#FFD700';
      case 'delete':
        return '#FF4444';
      default:
        return '#FFFFFF';
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <View style={styles.messageHeader}>
        <View style={styles.messageIcon}>
          {getMessageIcon(item.type)}
        </View>
        <View style={styles.messageInfo}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.channel}>#{item.channel}</Text>
        </View>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
      <Text style={[styles.content, { color: getMessageColor(item.type) }]}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0C0C0C', '#1E1E1E', '#0C0C0C']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Eye size={24} color="#00FFF7" />
          <Text style={styles.headerTitle}>SURVEILLANCE FEED</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: '#00FF00' }]} />
          <Text style={styles.statusText}>ACTIVE</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.totalMessages}</Text>
          <Text style={styles.statLabel}>TOTAL</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.images}</Text>
          <Text style={styles.statLabel}>IMAGES</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.voice}</Text>
          <Text style={styles.statLabel}>VOICE</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.edits}</Text>
          <Text style={styles.statLabel}>EDITS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.deletes}</Text>
          <Text style={styles.statLabel}>DELETES</Text>
        </View>
      </View>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        <Text style={styles.sectionTitle}>LIVE FEED</Text>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Glitch indicator */}
      {isGlitchActive && (
        <View style={styles.glitchIndicator}>
          <Text style={styles.glitchText}>🔥 GLITCHCORE ACTIVE</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#00FFF7',
    marginLeft: 10,
    letterSpacing: 1,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#00FF00',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 24,
    color: '#00FFF7',
  },
  statLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
    marginTop: 5,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FF2EC0',
    marginBottom: 15,
    letterSpacing: 1,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#333333',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageIcon: {
    marginRight: 10,
  },
  messageInfo: {
    flex: 1,
  },
  author: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  channel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
  },
  timestamp: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
  },
  content: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  glitchIndicator: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF2EC0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  glitchText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});