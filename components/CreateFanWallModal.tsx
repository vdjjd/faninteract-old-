'use client';

import { useState } from 'react';
import Modal from './Modal';
import { createEvent, getEventsByHost } from '@/lib/actions/events';

interface CreateFanWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostId: string;
  refreshEvents: () => Promise<void>;
}

export default function CreateFanWallModal({
  isOpen,
  onClose,
  hostId,
  refreshEvents,
}: CreateFanWallModalProps) {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    if (!title.trim()) return;
    setSaving(true);
    await createEvent(hostId, { title });
    await refreshEvents();
    setSaving(false);
    setTitle('');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-center mb-4">🎤 New Fan Zone Wall</h2>

      <input
        type="text"
        placeholder="Enter private wall name..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-black text-sm mb-4"
      />

      <div className="flex justify-center gap-3">
        <button
          onClick={handleCreate}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
        >
          {saving ? 'Creating...' : '✅ Create'}
        </button>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          ✖ Cancel
        </button>
      </div>
    </Modal>
  );
}
