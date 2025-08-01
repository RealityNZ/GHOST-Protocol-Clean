import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Download, Trash2, AlertCircle, CheckCircle, Clock } from 'lucide-react-native';

interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
}

export default function ActivityScreen() {
  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      action: 'DISCORD CONNECTION',
      details: 'Successfully connected to Tech Hub server',
      timestamp: '2025-01-07T23:45:00Z',
      status: 'success',
    },
    {
      id: '2',
      action: 'MESSAGE CAPTURED',
      details: 'Captured 15 new messages from #general',
      timestamp: '2025-01-07T23:42:00Z',
      status: 'success',
    },
    {
      id: '3',
      action: 'AI RESPONSE GENERATED',
      details: 'Generated response using OpenAI GPT-4',
      timestamp: '2025-01-07T23:40:00Z',
      status: 'success',
    },
    {
      id: '4',
      action: 'RATE LIMIT WARNING',
      details: 'Approaching Discord API rate limit',
      timestamp: '2025-01-07T23:38:00Z',
      status: 'warning',
    },
    {
      id: '5',
      action: 'CONNECTION ERROR',
      details: 'Failed to connect to Gaming Community server',
      timestamp: '2025-01-07T23:35:00Z',
      status: 'error',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} color="#00FF00" />;
      case 'error':
        return <AlertCircle size={16} color="#FF4444" />;
      case 'warning':
        return <Clock size={16} color="#FFD700" />;
      default:
        return <Activity size={16} color="#666666" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#00FF00';
      case 'error':
        return '#FF4444';
      case 'warning':
        return '#FFD700';
      default:
        return '#666666';
    }
  };

  const exportLogs = () => {
    // Mock export functionality
    console.log('Exporting logs...');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const renderLog = ({ item }: { item: ActivityLog }) => (
    <View style={styles.logContainer}>
      <View style={styles.logHeader}>
        <View style={styles.logIcon}>
          {getStatusIcon(item.status)}
        </View>
        <View style={styles.logInfo}>
          <Text style={styles.logAction}>{item.action}</Text>
          <Text style={styles.logDetails}>{item.details}</Text>
        </View>
        <Text style={styles.logTimestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
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
          <Activity size={24} color="#00FFF7" />
          <Text style={styles.headerTitle}>SYSTEM LOGS</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={exportLogs}>
            <Download size={16} color="#00FFF7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={clearLogs}>
            <Trash2 size={16} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{logs.length}</Text>
          <Text style={styles.statLabel}>TOTAL LOGS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {logs.filter(log => log.status === 'success').length}
          </Text>
          <Text style={styles.statLabel}>SUCCESS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {logs.filter(log => log.status === 'error').length}
          </Text>
          <Text style={styles.statLabel}>ERRORS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {logs.filter(log => log.status === 'warning').length}
          </Text>
          <Text style={styles.statLabel}>WARNINGS</Text>
        </View>
      </View>

      {/* Logs */}
      <View style={styles.logsContainer}>
        <Text style={styles.sectionTitle}>ACTIVITY LOG</Text>
        <FlatList
          data={logs}
          renderItem={renderLog}
          keyExtractor={(item) => item.id}
          style={styles.logsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
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
    fontSize: 20,
    color: '#00FFF7',
  },
  statLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
    marginTop: 5,
  },
  logsContainer: {
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
  logsList: {
    flex: 1,
  },
  logContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#333333',
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logIcon: {
    marginRight: 10,
  },
  logInfo: {
    flex: 1,
  },
  logAction: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  logDetails: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: '#CCCCCC',
  },
  logTimestamp: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
  },
});