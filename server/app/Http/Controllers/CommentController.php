<?php

namespace App\Http\Controllers;

use App\User;
use App\Comment;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = Comment::paginate(2);
        foreach ($comments as $comment) {
            $comment->user;
        }

        // $comments = $comments->DB::table('products')->paginate(4);
        return response()->json(['comments' => $comments]);

        // return response()->json($comments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate=Validator::make($request->all(),
        [
            'api_token'=>'required|exists:users,api_token',
            'content'=>'required',
        ],
        [
        ]);

        if($validate->fails()) {
            return response()->json(['errors'=>$validate->errors()], 201);
        }
        // $comment = Comment::create($request->all());
        $user=User::where( 'api_token', $request->api_token)->first();
        $comment = Comment::create([
            'content'=>$request->content,
            'user_id'=>$user->id,
        ]);
        return response()->json(['comment'=>$comment,'user'=> $user], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    // public function show(Comment $comment)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    // public function edit(Comment $comment)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        $comment -> update($request->all());
        return $comment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Comment::destroy($id);
    }
}
