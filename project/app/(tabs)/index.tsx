import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Upload, 
  FileText, 
  File, 
  Download, 
  Zap, 
  RefreshCw,
  Layers,
  Scissors,
  Lock,
  Cloud,
  X,
} from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import DocumentPickerComponent from '@/components/DocumentPicker';
import ConversionProcessor from '@/components/ConversionProcessor';
import DocumentEditor from '@/components/DocumentEditor';
import FileManager from '@/components/FileManager';

const ConversionCard = ({ title, description, icon: Icon, color, onPress, isPremium = false }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <LinearGradient
      colors={[color, color + '80']}
      style={styles.cardGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Icon size={24} color="white" />
          {isPremium && <Zap size={16} color="#FFD700" />}
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function ConvertScreen() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [conversionType, setConversionType] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [convertedDocument, setConvertedDocument] = useState<any>(null);
  const [showFilePicker, setShowFilePicker] = useState(false);
  
  const fileManagerRef = useRef<any>(null);

  const handleFileSelection = (result: DocumentPicker.DocumentPickerResult) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setSelectedFile({
        ...file,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      });
      setShowFilePicker(false);
    }
  };

  const startConversion = (type: string) => {
    if (!selectedFile) {
      setConversionType(type);
      setShowFilePicker(true);
      return;
    }
    
    setConversionType(type);
    setIsProcessing(true);
  };

  const handleConversionComplete = async (result: any) => {
    setIsProcessing(false);
    setConvertedDocument(result);
    
    // Add to file manager
    if (fileManagerRef.current) {
      await fileManagerRef.current.addFile(result);
    }
    
    Alert.alert(
      'Conversion Complete!',
      `Your document has been successfully converted to ${result.convertedFile.name}`,
      [
        { text: 'View Files', onPress: () => {} },
        { text: 'Edit Document', onPress: () => setShowEditor(true) },
        { text: 'OK' },
      ]
    );
  };

  const handleConversionError = (error: string) => {
    setIsProcessing(false);
    Alert.alert('Conversion Failed', error);
  };

  const handleDocumentSave = (editedDocument: any) => {
    // Save document logic
    console.log('Document saved:', editedDocument);
  };

  const handleDocumentDownload = (document: any) => {
    Alert.alert(
      'Download Started',
      `Downloading ${document.name} to your device...`,
      [{ text: 'OK' }]
    );
  };

  const conversions = [
    {
      title: 'Word to PDF',
      description: 'Convert DOC, DOCX to PDF with perfect formatting',
      icon: FileText,
      color: '#007AFF',
      onPress: () => startConversion('word-to-pdf'),
    },
    {
      title: 'PDF to Word',
      description: 'Convert PDF to editable Word documents',
      icon: File,
      color: '#34C759',
      onPress: () => startConversion('pdf-to-word'),
    },
    {
      title: 'Batch Convert',
      description: 'Convert multiple files at once',
      icon: Layers,
      color: '#FF9500',
      onPress: () => startConversion('batch'),
      isPremium: true,
    },
    {
      title: 'OCR Convert',
      description: 'Convert scanned PDFs to editable text',
      icon: RefreshCw,
      color: '#AF52DE',
      onPress: () => startConversion('ocr'),
      isPremium: true,
    },
    {
      title: 'Split PDF',
      description: 'Split PDF into multiple files',
      icon: Scissors,
      color: '#FF3B30',
      onPress: () => startConversion('split'),
    },
    {
      title: 'Secure PDF',
      description: 'Add password protection and encryption',
      icon: Lock,
      color: '#8E8E93',
      onPress: () => startConversion('secure'),
      isPremium: true,
    },
  ];

  if (showEditor && convertedDocument) {
    return (
      <DocumentEditor
        document={convertedDocument}
        onSave={handleDocumentSave}
        onDownload={handleDocumentDownload}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#007AFF', '#5AC8FA']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Document Converter</Text>
        <Text style={styles.headerSubtitle}>
          Convert, edit, and manage your documents
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedFile && (
          <View style={styles.selectedFileContainer}>
            <Text style={styles.selectedFileTitle}>Selected File:</Text>
            <View style={styles.selectedFileInfo}>
              <FileText size={20} color="#007AFF" />
              <Text style={styles.selectedFileName}>{selectedFile.name}</Text>
              <TouchableOpacity
                onPress={() => setSelectedFile(null)}
                style={styles.removeFileButton}
              >
                <X size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => setShowFilePicker(true)}
          >
            <View style={styles.quickActionIcon}>
              <Upload size={24} color="#007AFF" />
            </View>
            <Text style={styles.quickActionText}>Upload Files</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Cloud size={24} color="#34C759" />
            </View>
            <Text style={styles.quickActionText}>Cloud Import</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Download size={24} color="#FF9500" />
            </View>
            <Text style={styles.quickActionText}>Recent Files</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conversion Tools</Text>
          <View style={styles.cardsContainer}>
            {conversions.map((conversion, index) => (
              <ConversionCard
                key={index}
                {...conversion}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* File Picker Modal */}
      <Modal
        visible={showFilePicker}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Document</Text>
            <TouchableOpacity
              onPress={() => setShowFilePicker(false)}
              style={styles.closeButton}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <DocumentPickerComponent
            onDocumentSelected={handleFileSelection}
            acceptedTypes={
              conversionType === 'word-to-pdf' 
                ? ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                : conversionType === 'pdf-to-word'
                ? ['application/pdf']
                : undefined
            }
          />
        </View>
      </Modal>

      {/* Processing Modal */}
      <Modal
        visible={isProcessing}
        animationType="fade"
        transparent
      >
        <View style={styles.processingOverlay}>
          <ConversionProcessor
            inputFile={selectedFile}
            conversionType={conversionType}
            onComplete={handleConversionComplete}
            onError={handleConversionError}
          />
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectedFileContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedFileTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  selectedFileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  removeFileButton: {
    padding: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -15,
    marginBottom: 30,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 20,
    minHeight: 120,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  processingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});