'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockConversations } from '@/data/mockMessages';

/**
 * Interface de messagerie — Client Component pour la sélection de conversation.
 * Entièrement statique : aucune donnée n'est envoyée ou persistée, l'API
 * backend ne supportant pas la messagerie (voir data/mockMessages.ts).
 */
export default function MessagesView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = mockConversations.find((c) => c.id === selectedId);

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row md:h-190">
      {/* Liste des conversations — masquée sur mobile quand une conversation est ouverte */}
      <div
        className={`w-full md:w-96 md:shrink-0 md:border-r border-gray-200 overflow-y-auto ${
          selected ? 'hidden md:block' : 'block'
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold mt-4">Messages</h1>
        </div>

        <ul>
          {mockConversations.map((conversation) => (
            <li key={conversation.id}>
              <button
                type="button"
                onClick={() => setSelectedId(conversation.id)}
                className={`w-full flex items-center gap-3 p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  conversation.id === selectedId ? 'bg-kasa-bg' : ''
                }`}
              >
                <div className="h-10 w-10 rounded-lg bg-gray-200 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{conversation.hostName}</p>
                  <p className="text-xs text-kasa-text-secondary truncate">
                    {conversation.preview}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-kasa-text-secondary">{conversation.timestamp}</span>
                  {conversation.unread && (
                    <span
                      className="h-2 w-2 rounded-full bg-kasa-primary"
                      aria-label="Message non lu"
                    />
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Détail de la conversation — visible seulement si sélectionnée sur mobile */}
      <div className={`flex-1 flex flex-col ${selected ? 'flex' : 'hidden md:flex'}`}>
        {selected ? (
          <>
            <div className="p-4 border-b border-gray-200 md:hidden">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm"
              >
                ← Retour
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {selected.messages.map((message) => (
                <div key={message.id}>
                  {message.date && (
                    <div className="text-center text-xs text-kasa-text-secondary my-4">
                      {message.date}
                    </div>
                  )}
                  <div
                    className={`flex items-end gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'host' && (
                      <div className="h-8 w-8 rounded-lg bg-gray-200 shrink-0" aria-hidden="true" />
                    )}
                    <div>
                      <p className="text-xs text-kasa-text-secondary mb-1">
                        {selected.hostName} • {message.timestamp}
                      </p>
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm max-w-xs ${
                          message.sender === 'user' ? 'bg-kasa-primary text-white' : 'bg-kasa-bg'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-lg bg-gray-200 shrink-0" aria-hidden="true" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
              <label htmlFor="messageInput" className="sr-only">
                Envoyer un message
              </label>
              <input
                id="messageInput"
                type="text"
                placeholder="Envoyer un message"
                disabled
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
              />
              <button
                type="button"
                disabled
                aria-label="Envoyer"
                className="rounded-lg bg-kasa-primary px-4 text-white opacity-50 cursor-not-allowed"
              >
                ↑
              </button>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-sm text-kasa-text-secondary">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  );
}
