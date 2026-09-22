"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit3, ExternalLink, Trash2 } from "lucide-react";

export function ArticleRowActions({ id, slug }: { id: string; slug: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this article from MySQL?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete article");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link
        href={`/admin/articles/${id}/edit`}
        className="p-1.5 rounded-lg text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 transition-colors"
        title="Edit Article"
      >
        <Edit3 className="w-3.5 h-3.5" />
      </Link>
      <Link
        href={`/articles/${slug}`}
        target="_blank"
        className="p-1.5 rounded-lg text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--border-color)/40 transition-colors"
        title="View Public Article"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors disabled:opacity-50 cursor-pointer"
        title="Delete Article"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
