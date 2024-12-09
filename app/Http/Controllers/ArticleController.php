<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Menampilkan daftar artikel.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $articles = Article::with('user', 'category')->get(); 
        // dd($articles);
        // Mengambil artikel dengan relasi user dan category
        return Inertia::render('Articles/Index', compact('articles'));

    }

    public function show(Article $article)
    {
        $article->load('user', 'category');

        return Inertia::render('Articles/Show', compact('article'));
    }

    /**
     * Menampilkan form untuk membuat artikel baru.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Articles/Create', compact('categories'));
    }

    /**
     * Menyimpan artikel baru ke database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);
        // dd(Auth::id());
        Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'user_id' => Auth::id(),
            'description' => $request->description ?? '',
        ]);

        return redirect()->route('articles.index');
    }

    /**
     * Menampilkan form untuk mengedit artikel.
     *
     * @param \App\Models\Article $article
     * @return \Inertia\Response
     */
    public function edit(Article $article)
    {
        $categories = Category::all(); 
        return Inertia::render('Articles/Edit', compact('article', 'categories'));
    }

    /**
     * Mengupdate artikel yang sudah ada.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Update artikel
        $article->update([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'description' => $request->description ?? '',
        ]);

        return redirect()->route('articles.index');
    }

    /**
     * Menghapus artikel.
     *
     * @param \App\Models\Article $article
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.index');
    }
}
