import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCw, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

interface ConversionProcessorProps {
  inputFile: any;
  conversionType: 'word-to-pdf' | 'pdf-to-word' | 'ocr' | 'compress';
  onComplete: (result: any) => void;
  onError: (error: string) => void;
}

export default function ConversionProcessor({
  inputFile,
  conversionType,
  onComplete,
  onError,
}: ConversionProcessorProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'complete' | 'error'>('processing');
  const [currentStep, setCurrentStep] = useState('Uploading file...');
  
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Start rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );

    // Start processing simulation
    processDocument();
  }, []);

  const processDocument = async () => {
    const steps = [
      { message: 'Uploading file...', duration: 1000 },
      { message: 'Analyzing document...', duration: 1500 },
      { message: 'Converting format...', duration: 2000 },
      { message: 'Optimizing output...', duration: 1000 },
      { message: 'Finalizing...', duration: 500 },
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i].message);
        setProgress((i + 1) / steps.length * 100);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      }

      // Simulate successful conversion
      setStatus('complete');
      setCurrentStep('Conversion complete!');
      
      // Scale animation for success
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );

      // Create mock result
      const result = {
        originalFile: inputFile,
        convertedFile: {
          name: getConvertedFileName(inputFile.name, conversionType),
          size: Math.floor(inputFile.size * 0.8), // Simulate compression
          type: getOutputMimeType(conversionType),
          uri: `converted_${Date.now()}.${getOutputExtension(conversionType)}`,
        },
        conversionType,
        timestamp: new Date().toISOString(),
      };

      setTimeout(() => onComplete(result), 1000);
    } catch (error) {
      setStatus('error');
      setCurrentStep('Conversion failed');
      onError('Failed to convert document. Please try again.');
    }
  };

  const getConvertedFileName = (originalName: string, type: string) => {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    switch (type) {
      case 'word-to-pdf':
        return `${nameWithoutExt}.pdf`;
      case 'pdf-to-word':
        return `${nameWithoutExt}.docx`;
      case 'ocr':
        return `${nameWithoutExt}_ocr.pdf`;
      case 'compress':
        return `${nameWithoutExt}_compressed.pdf`;
      default:
        return `${nameWithoutExt}_converted.pdf`;
    }
  };

  const getOutputMimeType = (type: string) => {
    switch (type) {
      case 'word-to-pdf':
      case 'ocr':
      case 'compress':
        return 'application/pdf';
      case 'pdf-to-word':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return 'application/pdf';
    }
  };

  const getOutputExtension = (type: string) => {
    switch (type) {
      case 'word-to-pdf':
      case 'ocr':
      case 'compress':
        return 'pdf';
      case 'pdf-to-word':
        return 'docx';
      default:
        return 'pdf';
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return (
          <Animated.View style={animatedStyle}>
            <RefreshCw size={32} color="white" />
          </Animated.View>
        );
      case 'complete':
        return <CheckCircle size={32} color="white" />;
      case 'error':
        return <XCircle size={32} color="white" />;
    }
  };

  const getGradientColors = () => {
    switch (status) {
      case 'processing':
        return ['#007AFF', '#5AC8FA'];
      case 'complete':
        return ['#34C759', '#32D74B'];
      case 'error':
        return ['#FF3B30', '#FF6B6B'];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          {getStatusIcon()}
        </View>
        
        <Text style={styles.title}>{currentStep}</Text>
        
        {status === 'processing' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
        )}
        
        <Text style={styles.fileName}>{inputFile.name}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  card: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  fileName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});