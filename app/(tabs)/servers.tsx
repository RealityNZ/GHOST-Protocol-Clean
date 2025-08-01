import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Server, Plus, Settings, Eye, EyeOff } from 'lucide-react-native';

interface DiscordServer {
  id: string;
  name: string;
  channels: Channel[];
  connected: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  monitored: boolean;
}

export default function ServersScreen() {
  const [servers, setServers] = useState<DiscordServer[]>([
    {
      id: '1',
      name: 'Tech Hub',
      connected: true,
      channels: [
        { id: '1', name: 'general', type: 'text', monitored: true },
        { id: '2', name: 'development', type: 'text', monitored: true },
        { id: '3', name: 'showcase', type: 'text', monitored: false },
        { id: '4', name: 'voice-chat', type: 'voice', monitored: true },
      ],
    },
    {
      id: '2',
      name: 'Gaming Community',
      connected: false,
      channels: [
        { id: '5', name: 'general', type: 'text', monitored: false },
        { id: '6', name: 'voice', type: 'voice', monitored: false },
      ],
    },
  ]);

  const [showAddServer, setShowAddServer] = useState(false);
  const [newServerToken, setNewServerToken] = useState('');

  const toggleChannelMonitoring = (serverId: string, channelId: string) => {
    setServers(prev => prev.map(server => {
      if (server.id === serverId) {
        return {
          ...server,
          channels: server.channels.map(channel => {
            if (channel.id === channelId) {
              return { ...channel, monitored: !channel.monitored };
            }
            return channel;
          }),
        };
      }
      return server;
    }));
  };

  const addServer = () => {
    if (newServerToken.trim()) {
      const newServer: DiscordServer = {
        id: Date.now().toString(),
        name: 'New Server',
        connected: false,
        channels: [],
      };
      setServers(prev => [...prev, newServer]);
      setNewServerToken('');
      setShowAddServer(false);
    }
  };

  return (
    <LinearGradient
      colors={['#0C0C0C', '#1E1E1E', '#0C0C0C']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Server size={24} color="#00FFF7" />
          <Text style={styles.headerTitle}>SERVER MATRIX</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddServer(true)}
        >
          <Plus size={20} color="#00FFF7" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {servers.map((server) => (
          <View key={server.id} style={styles.serverContainer}>
            <View style={styles.serverHeader}>
              <View style={styles.serverInfo}>
                <Text style={styles.serverName}>{server.name}</Text>
                <View style={styles.serverStatus}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: server.connected ? '#00FF00' : '#FF4444' },
                    ]}
                  />
                  <Text style={styles.statusText}>
                    {server.connected ? 'CONNECTED' : 'DISCONNECTED'}
                  </Text>
                </View>
              </View>
              <Settings size={16} color="#666666" />
            </View>

            <View style={styles.channelsContainer}>
              <Text style={styles.channelsTitle}>CHANNELS</Text>
              {server.channels.map((channel) => (
                <View key={channel.id} style={styles.channelItem}>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>#{channel.name}</Text>
                    <Text style={styles.channelType}>{channel.type.toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleChannelMonitoring(server.id, channel.id)}
                    style={[
                      styles.monitorButton,
                      channel.monitored && styles.monitorButtonActive,
                    ]}
                  >
                    {channel.monitored ? (
                      <Eye size={16} color="#00FFF7" />
                    ) : (
                      <EyeOff size={16} color="#666666" />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Server Modal */}
      {showAddServer && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>ADD SERVER</Text>
            <TextInput
              style={styles.input}
              placeholder="Discord Bot Token"
              placeholderTextColor="#666666"
              value={newServerToken}
              onChangeText={setNewServerToken}
              secureTextEntry
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddServer(false)}
              >
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addServerButton} onPress={addServer}>
                <Text style={styles.addServerButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  addButton: {
    backgroundColor: '#FF2EC0',
    padding: 10,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serverContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  serverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  serverInfo: {
    flex: 1,
  },
  serverName: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  serverStatus: {
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
    color: '#666666',
  },
  channelsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 15,
  },
  channelsTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FF2EC0',
    marginBottom: 10,
    letterSpacing: 1,
  },
  channelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  channelType: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  monitorButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
  },
  monitorButtonActive: {
    backgroundColor: '#00FFF7',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#00FFF7',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#0C0C0C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 15,
    color: '#FFFFFF',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  addServerButton: {
    backgroundColor: '#FF2EC0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  addServerButtonText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});