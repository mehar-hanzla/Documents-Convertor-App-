import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, FileText, Download, Share as ShareIcon, Trash2, CreditCard as Edit3, Star, Clock } from 'lucide-react-native';

interface FileManagerProps {
  onFileSelect: (file: any) => void;
  onFileEdit: (file: any) => void;
}

export default function FileManager({ onFileSelect, onFileEdit }: FileManagerProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const storedFiles = await AsyncStorage.getItem('convertedFiles');
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFiles = async (updatedFiles: any[]) => {
    try {
      await AsyncStorage.setItem('convertedFiles', JSON.stringify(updatedFiles));
      setFiles(updatedFiles);
    } catch (error) {
      console.error('Error saving files:', error);
    }
  };

  const addFile = async (file: any) => {
    const newFiles = [file, ...files];
    await saveFiles(newFiles);
  };

  const deleteFile = async (fileId: string) => {
    Alert.alert(
      'Delete File',
      'Are you sure you want to delete this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedFiles = files.filter(file => file.id !== fileId);
            await saveFiles(updatedFiles);
          },
        },
      ]
    );
  };

  const shareFile = async (file: any) => {
    try {
      await Share.share({
        message: `Check out this document: ${file.name}`,
        title: file.name,
      });
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const toggleStar = async (fileId: string) => {
    const updatedFiles = files.map(file =>
      file.id === fileId ? { ...file, starred: !file.starred } : file
    );
    await saveFiles(updatedFiles);
  };

  const downloadFile = (file: any) => {
    // Simulate download
    Alert.alert(
      'Download Started',
      `Downloading ${file.name} to your device...`,
      [{ text: 'OK' }]
    );
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <File size={24} color="#FF3B30" />;
    }
    return <FileText size={24} color="#007AFF" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const renderFileItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => onFileSelect(item)}
    >
      <View style={styles.fileIcon}>
        {getFileIcon(item.type)}
      </View>
      
      <View style={styles.fileInfo}>
        <View style={styles.fileHeader}>
          <Text style={styles.fileName} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => toggleStar(item.id)}
            style={styles.starButton}
          >
            <Star
              size={16}
              color={item.starred ? '#FFD700' : '#8E8E93'}
              fill={item.starred ? '#FFD700' : 'none'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.fileDetails}>
          <Clock size={12} color="#8E8E93" />
          <Text style={styles.fileDate}>
            {formatDate(item.timestamp)}
          </Text>
          <Text style={styles.fileSize}>
            • {formatFileSize(item.size)}
          </Text>
        </View>
      </View>
      
      <View style={styles.fileActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onFileEdit(item)}
        >
          <Edit3 size={18} color="#007AFF" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => downloadFile(item)}
        >
          <Download size={18} color="#34C759" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => shareFile(item)}
        >
          <ShareIcon size={18} color="#FF9500" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteFile(item.id)}
        >
          <Trash2 size={18} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Expose addFile method for parent components
  React.useImperativeHandle(React.createRef(), () => ({
    addFile,
  }));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading files...</Text>
      </View>
    );
  }

  if (files.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FileText size={64} color="#8E8E93" />
        <Text style={styles.emptyTitle}>No Documents Yet</Text>
        <Text style={styles.emptySubtitle}>
          Convert your first document to get started
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        renderItem={renderFileItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  starButton: {
    padding: 4,
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  fileSize: {
    fontSize: 12,
    color: '#8E8E93',
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});