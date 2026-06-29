"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2, Move, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ShowcaseListClient({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const supabase = createClient();

  const handleDragStart = (id: string) => setDraggedId(id);
  
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === id) return;
    
    const draggedIndex = items.findIndex(i => i.id === draggedId);
    const overIndex = items.findIndex(i => i.id === id);
    
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(overIndex, 0, draggedItem);
    
    setItems(newItems);
  };

  const handleDragEnd = async () => {
    setDraggedId(null);
    // Optimistically updated UI, now save to DB
    const updates = items.map((item, index) => ({
      id: item.id,
      display_order: index
    }));

    // In a real app we'd bulk update, but Supabase standard JS client needs multiple or a custom RPC.
    // For simplicity, update individually.
    for (const update of updates) {
      await supabase.from("homepage_showcase").update({ display_order: update.display_order }).eq("id", update.id);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setItems(items.map(i => i.id === id ? { ...i, is_active: newStatus } : i));
    await supabase.from("homepage_showcase").update({ is_active: newStatus }).eq("id", id);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    setItems(items.filter(i => i.id !== id));
    await supabase.from("homepage_showcase").delete().eq("id", id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Showcase</h1>
          <p className="text-gray-500 mt-1">Manage the dynamic product collections displayed on the homepage.</p>
        </div>
        <Link 
          href="/admin/content/showcase/new" 
          className="bg-[#D42B2B] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#b82323] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Collection
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1"></div>
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Collection</div>
          <div className="col-span-3">Button Link</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No showcase collections found. Click "Add Collection" to create one.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div 
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors ${draggedId === item.id ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'}`}
              >
                <div className="col-span-1 flex justify-center cursor-grab active:cursor-grabbing text-gray-400">
                  <Move className="w-5 h-5" />
                </div>
                <div className="col-span-1">
                  <div className="relative w-12 h-12 bg-gray-100 rounded border border-gray-200 overflow-hidden flex items-center justify-center">
                    <Image src={item.desktop_image} alt={item.title} fill className="object-contain p-1 mix-blend-multiply" />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="font-bold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{item.description || "No description"}</div>
                </div>
                <div className="col-span-3 text-sm text-gray-500 truncate">
                  {item.button_url}
                </div>
                <div className="col-span-2 flex justify-center">
                  <button 
                    onClick={() => toggleStatus(item.id, item.is_active)}
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                      item.is_active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {item.is_active ? <><Eye className="w-3 h-3" /> Active</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Link 
                    href={`/admin/content/showcase/${item.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
