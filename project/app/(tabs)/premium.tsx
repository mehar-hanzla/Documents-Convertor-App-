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
import { 
  Zap, 
  Check, 
  Crown, 
  Layers,
  Lock,
  Cloud,
  RefreshCw,
  Users,
  Infinity,
  Star,
  Shield,
  Palette
} from 'lucide-react-native';

const PlanCard = ({ title, price, period, features, isPopular, color, onSelect }) => (
  <TouchableOpacity style={[styles.planCard, isPopular && styles.popularCard]} onPress={onSelect}>
    {isPopular && (
      <View style={styles.popularBadge}>
        <Text style={styles.popularText}>MOST POPULAR</Text>
      </View>
    )}
    <LinearGradient
      colors={color}
      style={styles.planGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.period}>/{period}</Text>
        </View>
      </View>
    </LinearGradient>
    <View style={styles.featuresContainer}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Check size={16} color="#34C759" />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>
);

const FeatureCard = ({ icon: Icon, title, description, isPremium }) => (
  <View style={styles.featureCard}>
    <View style={styles.featureIcon}>
      <Icon size={24} color={isPremium ? '#FFD700' : '#007AFF'} />
    </View>
    <View style={styles.featureContent}>
      <View style={styles.featureHeader}>
        <Text style={styles.featureTitle}>{title}</Text>
        {isPremium && <Crown size={16} color="#FFD700" />}
      </View>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      title: 'Basic',
      price: '9.99',
      period: 'month',
      features: [
        '50 conversions per month',
        'Basic editing tools',
        'Standard templates',
        'Email support',
        '1GB cloud storage'
      ],
      color: ['#8E8E93', '#A8A8A8'],
      isPopular: false,
    },
    {
      title: 'Pro',
      price: '19.99',
      period: 'month',
      features: [
        'Unlimited conversions',
        'Advanced editing suite',
        'OCR technology',
        'Batch processing',
        'Premium templates',
        'Priority support',
        '10GB cloud storage',
        'Collaboration tools'
      ],
      color: ['#007AFF', '#5AC8FA'],
      isPopular: true,
    },
    {
      title: 'Enterprise',
      price: '49.99',
      period: 'month',
      features: [
        'Everything in Pro',
        'Team management',
        'Advanced security',
        'Custom integrations',
        'Dedicated support',
        'Unlimited cloud storage',
        'API access',
        'Custom branding'
      ],
      color: ['#AF52DE', '#DA70D6'],
      isPopular: false,
    },
  ];

  const premiumFeatures = [
    {
      icon: Layers,
      title: 'Batch Processing',
      description: 'Convert multiple documents simultaneously',
      isPremium: true,
    },
    {
      icon: RefreshCw,
      title: 'OCR Technology',
      description: 'Convert scanned documents to editable text',
      isPremium: true,
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share and collaborate on documents in real-time',
      isPremium: true,
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Secure cloud storage for all your documents',
      isPremium: true,
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Password protection and encryption',
      isPremium: true,
    },
    {
      icon: Palette,
      title: 'Premium Templates',
      description: 'Access to professional document templates',
      isPremium: true,
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.title.toLowerCase());
    Alert.alert(
      'Upgrade to ' + plan.title,
      `Are you sure you want to upgrade to ${plan.title} for $${plan.price}/${plan.period}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => console.log('Upgrade to', plan.title) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF9500', '#FF6B35']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Zap size={32} color="white" />
          <Text style={styles.headerTitle}>Upgrade to Premium</Text>
          <Text style={styles.headerSubtitle}>
            Unlock powerful features and unlimited conversions
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansContainer}>
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                {...plan}
                onSelect={() => handlePlanSelect(plan)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          <View style={styles.featuresGrid}>
            {premiumFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.guaranteeCard}>
            <Star size={24} color="#FFD700" />
            <Text style={styles.guaranteeTitle}>30-Day Money Back Guarantee</Text>
            <Text style={styles.guaranteeText}>
              Try premium risk-free. If you're not satisfied, we'll refund your money.
            </Text>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.ctaButton}>
            <LinearGradient
              colors={['#007AFF', '#5AC8FA']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.ctaText}>Start Free Trial</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>
            7-day free trial • Cancel anytime
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
    marginTop: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
  },
  plansContainer: {
    gap: 15,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  popularCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    zIndex: 1,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
  },
  planGradient: {
    padding: 20,
  },
  planHeader: {
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
  },
  period: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  featuresContainer: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  guaranteeCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  guaranteeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaButton: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  ctaSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});