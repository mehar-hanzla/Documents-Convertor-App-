import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Crown, FileText, Download, Clock, Star, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Zap, Cloud, ChartBar as BarChart3, Award } from 'lucide-react-native';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <View style={[styles.statCard, { borderTopColor: color }]}>
    <View style={styles.statIcon}>
      <Icon size={20} color={color} />
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  </View>
);

const MenuSection = ({ title, items }) => (
  <View style={styles.menuSection}>
    <Text style={styles.menuSectionTitle}>{title}</Text>
    <View style={styles.menuItems}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            index === items.length - 1 && styles.lastMenuItem
          ]}
          onPress={item.onPress}
        >
          <View style={styles.menuItemLeft}>
            <View style={[styles.menuItemIcon, { backgroundColor: item.color + '20' }]}>
              <item.icon size={20} color={item.color} />
            </View>
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default function ProfileScreen() {
  const [isPremium, setIsPremium] = useState(false);

  const stats = [
    { title: 'Documents', value: '47', icon: FileText, color: '#007AFF' },
    { title: 'Conversions', value: '128', icon: Download, color: '#34C759' },
    { title: 'Storage Used', value: '2.3GB', icon: Cloud, color: '#FF9500' },
    { title: 'Premium Days', value: '23', icon: Crown, color: '#FFD700' },
  ];

  const accountItems = [
    {
      title: 'Upgrade to Premium',
      icon: Crown,
      color: '#FFD700',
      onPress: () => console.log('Upgrade to Premium'),
    },
    {
      title: 'Account Settings',
      icon: Settings,
      color: '#8E8E93',
      onPress: () => console.log('Account Settings'),
    },
    {
      title: 'Usage Analytics',
      icon: BarChart3,
      color: '#AF52DE',
      onPress: () => console.log('Usage Analytics'),
    },
    {
      title: 'Achievements',
      icon: Award,
      color: '#FF3B30',
      onPress: () => console.log('Achievements'),
    },
  ];

  const supportItems = [
    {
      title: 'Help Center',
      icon: HelpCircle,
      color: '#007AFF',
      onPress: () => console.log('Help Center'),
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      color: '#34C759',
      onPress: () => console.log('Privacy & Security'),
    },
    {
      title: 'Rate the App',
      icon: Star,
      color: '#FF9500',
      onPress: () => console.log('Rate the App'),
    },
    {
      title: 'Sign Out',
      icon: LogOut,
      color: '#FF3B30',
      onPress: () => Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: () => console.log('Sign Out') }
      ]),
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#AF52DE', '#DA70D6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <User size={32} color="white" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <View style={styles.statusBadge}>
            <Zap size={12} color="#FFD700" />
            <Text style={styles.statusText}>
              {isPremium ? 'Premium User' : 'Free User'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>

        <MenuSection title="Account" items={accountItems} />
        <MenuSection title="Support" items={supportItems} />

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>
            © 2024 Document Converter. All rights reserved.
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
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -15,
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderTopWidth: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statContent: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    marginBottom: 30,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  menuItems: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});