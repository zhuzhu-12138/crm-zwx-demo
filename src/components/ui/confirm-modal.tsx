
"use client";

import { Fragment } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, children }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="fixed inset-0 bg-slate-900/70 transition-opacity" onClick={onClose}></div>

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">{title}</h3>
              <div className="mt-2">
                <p className="text-sm text-slate-500">{children}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button 
            type="button" 
            onClick={onConfirm} 
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            确定
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
