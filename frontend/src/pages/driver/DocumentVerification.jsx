import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle, Trash2, Camera } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import DriverOnboardingProgress from '../../components/driver/DriverOnboardingProgress';

const DOCUMENTS = [
  { id: 'aadhaar', name: 'Aadhaar Card', type: 'Identity' },
  { id: 'pan', name: 'PAN Card', type: 'Identity' },
  { id: 'drivingLicense', name: 'Driving License', type: 'Driver' },
  { id: 'rcBook', name: 'RC Book', type: 'Vehicle' },
  { id: 'insurance', name: 'Insurance', type: 'Vehicle' },
  { id: 'permit', name: 'Vehicle Permit', type: 'Vehicle' },
  { id: 'pollution', name: 'Pollution Certificate', type: 'Vehicle' },
];

export default function DocumentVerification() {
  const navigate = useNavigate();
  const { driver, setDriverDocuments, setDriverDocumentsCompleted } = useAppStore();
  const [documents, setDocuments] = useState(driver.documents || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (docId, file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const newDocs = {
        ...documents,
        [docId]: {
          file: fileURL,
          name: file.name,
          status: 'UPLOADED',
          uploadedAt: Date.now(),
        },
      };
      setDocuments(newDocs);
    }
  };

  const handleRemoveFile = (docId) => {
    const newDocs = { ...documents };
    delete newDocs[docId];
    setDocuments(newDocs);
  };

  const handleSubmit = async () => {
    const allUploaded = DOCUMENTS.every((doc) => documents[doc.id]?.status === 'UPLOADED');
    if (!allUploaded) {
      alert('Please upload all required documents.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setDriverDocuments(documents);
    setDriverDocumentsCompleted(true);
    setIsSubmitting(false);
    navigate('/driver/dashboard');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">Document Verification</h1>
      </div>

      {/* Progress */}
      <DriverOnboardingProgress />

      {/* Documents Grid */}
      <div className="px-4 py-6 space-y-6">
        {DOCUMENTS.map((doc) => {
          const uploadedDoc = documents[doc.id];
          return (
            <div key={doc.id} className="bg-surface border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">{doc.name}</h3>
                  <p className="text-xs text-text-secondary">{doc.type}</p>
                </div>
                {uploadedDoc ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-success" />
                    <span className="text-sm font-medium text-success">Uploaded</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Required</span>
                  </div>
                )}
              </div>

              {uploadedDoc ? (
                <div className="relative bg-elevated rounded-xl p-4 flex items-center gap-4">
                  <div className="w-20 h-20 bg-surface rounded-lg flex items-center justify-center overflow-hidden">
                    {uploadedDoc.file.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                      <img
                        src={uploadedDoc.file}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{uploadedDoc.name}</p>
                    <p className="text-xs text-text-secondary">
                      {new Date(uploadedDoc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(doc.id)}
                    className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <div className="bg-elevated rounded-xl p-6 border-2 border-dashed border-border hover:border-primary/50 transition-all cursor-pointer">
                  <label className="flex flex-col items-center justify-center gap-3 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Upload size={24} className="text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-text">Upload {doc.name}</p>
                      <p className="text-xs text-text-secondary">Click to browse or drag & drop</p>
                      <p className="text-xs text-text-secondary mt-1">JPG, PNG, PDF up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                    />
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border z-50">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-primary text-background font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-spin">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          ) : (
            <span>Complete Verification</span>
          )}
        </button>
      </div>
    </div>
  );
}
