import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings, 
  Bell, 
  Shield, 
  Download,
  Moon,
  Globe,
  Palette,
  HardDrive,
  Wifi,
  Smartphone,
  Lock,
  Eye,
  Trash2,
  ChevronRight,
  Info
} from 'lucide-react-native';

const SettingToggle = ({ title, description, icon: Icon, color, value, onValueChange }) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}>
        <Icon size={20} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#f0f0f0', true: color + '40' }}
      thumbColor={value ? color : '#f4f3f4'}
    />
  </View>
);

const SettingItem = ({ title, description, icon: Icon, color, onPress, showChevron = true }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}>
        <Icon size={20} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
    </View>
    {showChevron && <ChevronRight size={20} color="#8E8E93" />}
  </TouchableOpacity>
);

const SettingsSection = ({ title, children }) => (
  <View style={styles.settingsSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [faceId, setFaceId] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8E8E93', '#A8A8A8']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Settings size={28} color="white" />
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Customize your document converter experience
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsSection title="Notifications">
          <SettingToggle
            title="Push Notifications"
            description="Receive alerts for completed conversions"
            icon={Bell}
            color="#FF9500"
            value={notifications}
            onValueChange={setNotifications}
          />
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SettingToggle
            title="Dark Mode"
            description="Use dark theme for better viewing at night"
            icon={Moon}
            color="#5856D6"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingItem
            title="Theme Selection"
            description="Choose from multiple color themes"
            icon={Palette}
            color="#AF52DE"
            onPress={() => showAlert('Theme Selection', 'Coming in future updates')}
          />
          <SettingItem
            title="Language"
            description="English (US)"
            icon={Globe}
            color="#007AFF"
            onPress={() => showAlert('Language', 'Multiple languages coming soon')}
          />
        </SettingsSection>

        <SettingsSection title="Security & Privacy">
          <SettingToggle
            title="Face ID / Touch ID"
            description="Use biometric authentication to secure app"
            icon={Lock}
            color="#34C759"
            value={faceId}
            onValueChange={setFaceId}
          />
          <SettingItem
            title="Privacy Settings"
            description="Control what data is collected"
            icon={Eye}
            color="#007AFF"
            onPress={() => showAlert('Privacy Settings', 'Manage your privacy preferences')}
          />
          <SettingItem
            title="Data Encryption"
            description="All documents are encrypted end-to-end"
            icon={Shield}
            color="#FF3B30"
            onPress={() => showAlert('Data Encryption', 'Your documents are secure with AES-256 encryption')}
          />
        </SettingsSection>

        <SettingsSection title="Storage & Sync">
          <SettingToggle
            title="Auto Sync"
            description="Automatically sync documents to cloud"
            icon={Wifi}
            color="#5AC8FA"
            value={autoSync}
            onValueChange={setAutoSync}
          />
          <SettingItem
            title="Storage Management"
            description="Manage local and cloud storage"
            icon={HardDrive}
            color="#FF9500"
            onPress={() => showAlert('Storage Management', 'View and manage your storage usage')}
          />
          <SettingItem
            title="Download Quality"
            description="High quality (recommended)"
            icon={Download}
            color="#34C759"
            onPress={() => showAlert('Download Quality', 'Choose between high, medium, and low quality')}
          />
        </SettingsSection>

        <SettingsSection title="Advanced">
          <SettingItem
            title="Device Info"
            description="View device and app information"
            icon={Smartphone}
            color="#8E8E93"
            onPress={() => showAlert('Device Info', 'iOS 17.0\nApp Version 1.0.0\nDevice: iPhone 15 Pro')}
          />
          <SettingToggle
            title="Usage Analytics"
            description="Help improve the app with usage data"
            icon={Info}
            color="#AF52DE"
            value={analytics}
            onValueChange={setAnalytics}
          />
          <SettingItem
            title="Clear Cache"
            description="Free up storage space"
            icon={Trash2}
            color="#FF3B30"
            onPress={() => Alert.alert(
              'Clear Cache',
              'This will remove temporary files and free up storage space. Continue?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', onPress: () => showAlert('Cache Cleared', 'Temporary files have been removed') }
              ]
            )}
          />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Document Converter Pro v1.0.0
          </Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for productivity
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginTop: 8,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingsSection: {
    marginBottom: 30,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#8E8E93',
  },
});