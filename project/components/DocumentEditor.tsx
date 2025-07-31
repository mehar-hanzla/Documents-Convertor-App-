import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Type,
  Palette,
  Save,
  Download,
} from 'lucide-react-native';

interface DocumentEditorProps {
  document: any;
  onSave: (editedDocument: any) => void;
  onDownload: (document: any) => void;
}

export default function DocumentEditor({
  document,
  onSave,
  onDownload,
}: DocumentEditorProps) {
  const [content, setContent] = useState(
    `Document: ${document.name}\n\nThis is the editable content of your document. You can modify text, apply formatting, and make changes as needed.\n\nKey Features:\n• Rich text editing\n• Format preservation\n• Real-time preview\n• Auto-save functionality\n\nYour document has been successfully converted and is ready for editing.`
  );
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [fontSize, setFontSize] = useState(16);

  const formatButtons = [
    {
      icon: Bold,
      active: isBold,
      onPress: () => setIsBold(!isBold),
      color: '#333',
    },
    {
      icon: Italic,
      active: isItalic,
      onPress: () => setIsItalic(!isItalic),
      color: '#333',
    },
    {
      icon: Underline,
      active: isUnderline,
      onPress: () => setIsUnderline(!isUnderline),
      color: '#333',
    },
    {
      icon: AlignLeft,
      active: alignment === 'left',
      onPress: () => setAlignment('left'),
      color: '#007AFF',
    },
    {
      icon: AlignCenter,
      active: alignment === 'center',
      onPress: () => setAlignment('center'),
      color: '#007AFF',
    },
    {
      icon: AlignRight,
      active: alignment === 'right',
      onPress: () => setAlignment('right'),
      color: '#007AFF',
    },
  ];

  const handleSave = () => {
    const editedDocument = {
      ...document,
      content,
      lastModified: new Date().toISOString(),
      formatting: {
        bold: isBold,
        italic: isItalic,
        underline: isUnderline,
        alignment,
        fontSize,
      },
    };
    
    onSave(editedDocument);
    Alert.alert('Success', 'Document saved successfully!');
  };

  const handleDownload = () => {
    const documentToDownload = {
      ...document,
      content,
      formatting: {
        bold: isBold,
        italic: isItalic,
        underline: isUnderline,
        alignment,
        fontSize,
      },
    };
    
    onDownload(documentToDownload);
  };

  const getTextStyle = () => {
    return {
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecorationLine: isUnderline ? 'underline' : 'none',
      textAlign: alignment,
      fontSize,
    };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#34C759', '#32D74B']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Document Editor</Text>
        <Text style={styles.headerSubtitle}>{document.name}</Text>
      </LinearGradient>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.toolbarSection}>
            {formatButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.toolbarButton,
                  button.active && styles.activeToolbarButton,
                ]}
                onPress={button.onPress}
              >
                <button.icon
                  size={20}
                  color={button.active ? 'white' : button.color}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.separator} />

          <View style={styles.toolbarSection}>
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={() => setFontSize(Math.max(12, fontSize - 2))}
            >
              <Text style={styles.fontSizeText}>A-</Text>
            </TouchableOpacity>
            
            <View style={styles.fontSizeContainer}>
              <Text style={styles.fontSizeLabel}>{fontSize}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={() => setFontSize(Math.min(24, fontSize + 2))}
            >
              <Text style={styles.fontSizeText}>A+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <View style={styles.toolbarSection}>
            <TouchableOpacity style={styles.toolbarButton}>
              <List size={20} color="#FF9500" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton}>
              <Palette size={20} color="#AF52DE" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Editor */}
      <ScrollView style={styles.editorContainer}>
        <View style={styles.editorWrapper}>
          <TextInput
            style={[styles.editor, getTextStyle()]}
            value={content}
            onChangeText={setContent}
            multiline
            placeholder="Start typing your document content..."
            placeholderTextColor="#8E8E93"
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Save size={20} color="white" />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Download size={20} color="white" />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  toolbar: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 10,
  },
  toolbarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  toolbarButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  activeToolbarButton: {
    backgroundColor: '#007AFF',
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 10,
  },
  fontSizeContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  fontSizeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  fontSizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  editorContainer: {
    flex: 1,
    padding: 20,
  },
  editorWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editor: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 360,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  downloadButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});