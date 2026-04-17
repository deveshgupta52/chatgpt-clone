import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, chatTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </div>
                        <h2 className="text-base font-semibold text-white">Delete Chat</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 mb-6">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-red-200">Warning: Permanent Action</p>
                            <p className="text-xs text-red-300/70 leading-relaxed">
                                This will permanently delete the chat <span className="text-red-300 font-bold">"{chatTitle}"</span> and all its messages. This action cannot be undone.
                            </p>
                        </div>
                    </div>
                    
                    <p className="text-sm text-neutral-400 text-center px-4">
                        Are you sure you want to proceed with this deletion?
                    </p>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-4 bg-black/20">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-neutral-300 hover:bg-white/5 hover:text-white transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-500/20"
                    >
                        Delete Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
