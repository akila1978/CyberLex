import Link from "next/link";
import { Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ArticleRowActions } from "@/components/admin/ArticleRowActions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    include: {
      topic: { select: { name: true, slug: true } },
      country: { select: { name: true, code: true, flagEmoji: true } },
      citations: { select: { id: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-(--foreground) font-heading">
            Articles & Legal Guides
          </h1>
          <p className="text-xs text-(--muted-foreground)">
            Manage knowledge base articles, verified citations, and editorial statuses in MySQL.
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-(--border-color) bg-(--card-bg) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-(--bg-surface) border-b border-(--border-color) text-(--muted-foreground) font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Title & Topic</th>
                <th className="py-3.5 px-4">Jurisdiction</th>
                <th className="py-3.5 px-4">Editorial Status</th>
                <th className="py-3.5 px-4">Citations</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-(--muted-foreground)">
                    No articles found in MySQL. Click &quot;New Article&quot; above to create one.
                  </td>
                </tr>
              ) : (
                articles.map((art) => (
                  <tr key={art.id} className="hover:bg-(--bg-surface)/50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-bold text-(--foreground) text-sm mb-0.5 max-w-md line-clamp-1">
                        {art.title}
                      </p>
                      <span className="text-[11px] text-(--primary) font-semibold">
                        {art.topic?.name || "General"}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-(--foreground)">
                      {art.country ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span>{art.country.flagEmoji}</span>
                          <span>{art.country.name}</span>
                        </span>
                      ) : (
                        <span className="text-(--muted-foreground)">Global</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          art.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : art.status === "UNDER_REVIEW"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {art.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{art.citations.length} verified</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-(--muted-foreground)">
                      {new Date(art.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <ArticleRowActions id={art.id} slug={art.slug} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
