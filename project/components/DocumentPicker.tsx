import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Upload, File, FileText } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';

interface DocumentPickerProps {
  onDocumentSelected: (document: DocumentPicker.DocumentPickerResult) => void;
  acceptedTypes?: string[];
  multiple?: boolean;
}

export default function DocumentPickerComponent({
  onDocumentSelected,
  acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  multiple = false,
}: DocumentPickerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const pickDocument = async () => {
    try {
      setIsLoading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedTypes,
        multiple,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        onDocumentSelected(result);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
      console.error('Document picker error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = () => {
    if (acceptedTypes.includes('application/pdf')) {
      return <File size={32} color="#FF3B30" />;
    }
    return <FileText size={32} color="#007AFF" />;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isLoading && styles.loading]}
      onPress={pickDocument}
      disabled={isLoading}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
        <Upload size={20} color="#8E8E93" style={styles.uploadIcon} />
      </View>
      <Text style={styles.title}>
        {isLoading ? 'Loading...' : 'Select Document'}
      </Text>
      <Text style={styles.subtitle}>
        Tap to choose files from your device
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  loading: {
    opacity: 0.6,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  uploadIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});