'use client';

import React, { useState, useCallback } from 'react';
import Modal from './ui/modal';
import NewSnippetForm from './new-snippet-form';

interface SnippetModalWrapperProps {
  children: React.ReactNode;
}

interface ToastMessage {
  title: string;
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

// Create a context to expose the openModal function
export const ModalContext = React.createContext<{
  openModal: () => void;
}>({
  openModal: () => {},
});

const SnippetModalWrapper: React.FC<SnippetModalWrapperProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'error') => {
    setToast({ title, message, type, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const handleSubmitSnippet = async (data: { description: string; code: string; language: string }) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create snippet');
      }
      
      showToast('Success!', 'Your snippet has been created.', 'success');
      closeModal();
      return result;
    } catch (error) {
      console.error('Error creating snippet:', error);
      showToast('Error', error instanceof Error ? error.message : 'Failed to create snippet', 'error');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent clicks on the modal from propagating to the document
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div onClick={handleModalClick}>
          <NewSnippetForm 
            onSubmit={handleSubmitSnippet} 
            onCancel={closeModal} 
            isLoading={isSubmitting}
          />
        </div>
      </Modal>
      
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{toast.title}</h4>
              <p className="text-sm opacity-90">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="ml-4 text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default SnippetModalWrapper; 