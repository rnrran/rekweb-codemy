<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
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
        $articles = Redis::get('articles');

        if (!$articles) {
            $articles = Article::with('user', 'category')->get();
            Redis::set('articles', $articles->toJson()); 
        } else {
            $articles = json_decode($articles);
        }

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

        // Menyimpan artikel baru
        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'user_id' => Auth::id(),
            'description' => $request->description ?? '',
        ]);
        // update redis
        Redis::del('articles'); 
        Redis::set('articles', Article::with('user', 'category')->get()->toJson()); // Menyimpan artikel yang baru

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
        // update redis
        Redis::del('articles'); 
        Redis::set('articles', Article::with('user', 'category')->get()->toJson()); 

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
        Redis::del('articles'); 
        Redis::set('articles', Article::with('user', 'category')->get()->toJson()); 

        return redirect()->route('articles.index');
    }
}
