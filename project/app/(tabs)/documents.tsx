// src/components/DocumentEditor.tsx (or wherever your DocumentEditor is located)

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Save, Download, X } from 'lucide-react-native'; // Assuming you use Lucide icons here too

// Define the type for the document object
interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  date: string;
  isStarred: boolean;
  isPremium: boolean;
  content: string; // The editable content
}

// Define the props for DocumentEditor
interface DocumentEditorProps {
  document: Document | null; // Can be null if no document is selected yet
  onSave: (editedDoc: Document) => void;
  onDownload: (docToDownload: Document) => void;
  onClose: () => void; // Added this prop
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ document, onSave, onDownload, onClose }) => {
  const [editableContent, setEditableContent] = useState<string>(document?.content || '');
  const [editableTitle, setEditableTitle] = useState<string>(document?.title || '');

  // Update content when document changes
  useEffect(() => {
    setEditableContent(document?.content || '');
    setEditableTitle(document?.title || '');
  }, [document]);

  if (!document) {
    return (
      <View style={styles.editorContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.noDocumentText}>No document selected for editing.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (document) {
      const updatedDoc: Document = {
        ...document,
        title: editableTitle,
        content: editableContent,
        date: new Date().toLocaleDateString() + ' (Edited)', // Update date on save
      };
      onSave(updatedDoc);
    }
  };

  const handleDownload = () => {
    if (document) {
      const docToDownload: Document = {
        ...document,
        title: editableTitle,
        content: editableContent,
      };
      onDownload(docToDownload);
      // In a real app, you'd trigger native download here based on content/type
      Alert.alert('Download Started', `Downloading "${docToDownload.title}"`);
    }
  };

  return (
    <View style={styles.editorContainer}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Edit Document</Text>
        </View>

        <TextInput
            style={styles.titleInput}
            value={editableTitle}
            onChangeText={setEditableTitle}
            placeholder="Document Title"
            placeholderTextColor="#8E8E93"
        />

        <ScrollView style={styles.contentScroll}>
            <TextInput
                style={styles.contentInput}
                value={editableContent}
                onChangeText={setEditableContent}
                multiline
                textAlignVertical="top"
                placeholder="Document content..."
                placeholderTextColor="#8E8E93"
            />
        </ScrollView>

        <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                <Save size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
                <Download size={20} color="#34C759" />
                <Text style={styles.actionButtonText}>Download</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8F9',
    paddingTop: 50, // To avoid status bar overlap
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the title
    marginBottom: 20,
    position: 'relative', // To position close button absolutely
  },
  closeButton: {
    position: 'absolute',
    left: 0, // Position on the left
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  contentScroll: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  contentInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 200, // Ensure enough height for editing
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10, // Add some bottom margin
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noDocumentText: {
    fontSize: 18,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default DocumentEditor;